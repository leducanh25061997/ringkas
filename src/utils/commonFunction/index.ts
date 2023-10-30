import Notifier from 'app/pages/Notifier';
import {
  KprParams,
  TextValueFormat,
} from 'app/pages/ManageUsers/CustomerAccount/KprRegister/slice/types';

export function showError(error: any) {
  Notifier.addNotifyError({ message: error.response?.data?.messages[0] });
}

export function showSuccess(message: string) {
  Notifier.addNotifySuccess({ message });
}

export const calculatePercent = (x: number, y: number) => {
  if (!y) return 'N/A';
  return ((x * 100) / y).toFixed(2) + ' %';
};

export async function dataUrlToFile(
  dataUrl: string,
  fileName: string,
): Promise<File> {
  const res: Response = await fetch(dataUrl);
  const blob: Blob = await res.blob();
  return new File([blob], fileName, { type: 'image/svg+xml' });
}

export const downloadImage = (src?: string) => {
  if (!src) return;
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.src = src;
  img.onload = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx && ctx.drawImage(img, 0, 0);
    const a = document.createElement('a');
    a.download = 'download.png';
    a.href = canvas.toDataURL('image/png');
    a.click();
  };
};

export const getAssessmentValueType = (key?: string) => {
  switch (key) {
    case 'Monthly Income':
      return 'rp';
    case 'Monthly Income Requestor':
      return 'rp';
    case 'Monthly Income Guarantor':
      return 'rp';
    case 'Monthly Obligation':
      return 'rp';
    case 'Down Payment Saving':
      return 'rp';
    case 'KPR Amount':
      return 'rp';
    case 'Estimated Monthly Installment':
      return 'rp';
    case 'Total Outstanding Credit':
      return 'rp';

    case 'Interest Rate':
      return 'percent';
    case 'Loan to Value':
      return 'percent';
    // For bank approval
    case 'loanProgram.fixedYear':
      return 'year';
    case 'kprAmount.approvedPlafond':
      return 'rp';
    case 'loanProgram.fixedRate':
    case 'loanProgram.floatRate':
    case 'loanProgram.adminFee':
    case 'loanProgram.provisionFee':
      return 'percent';
    // end bank approval
    case 'DBR':
      return 'percent';
    case 'New Estimated DBR':
      return 'percent';
    case 'Current DBR':
      return 'percent';
    case 'Estimated Tenor':
      return 'year';
    case 'Minimum Age':
      return 'age';
    default:
      return 'other';
  }
};

export const exportFile = (data: any, fileName: string) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
};

type Options =
  | TextValueFormat
  | 'ADDRESS'
  | 'ONLY_TEXT'
  | 'FILE'
  | 'DOMICILE_ADDRESS';

export const convertDataText = (arr: KprParams[], option?: Options) => {
  const dataTextAndFreeText = arr.filter(
    item => item.valueType === 'TEXT' && item.textValueFormat === 'FREE_TEXT',
  );
  const dataFileType = arr.filter(
    item => item.valueType === 'FILE' && item.textValueFormat === 'FREE_TEXT',
  );
  const dataPhoneNumberType = arr.filter(
    item =>
      item.valueType === 'TEXT' && item.textValueFormat === 'PHONE_NUMBER',
  );
  const dataDateType = arr.filter(
    item => item.valueType === 'TEXT' && item.textValueFormat === 'DATE',
  );

  const dataTextAndEnum = arr.filter(
    item => item.valueType === 'TEXT' && item.textValueFormat === 'ENUM',
  );
  const location = dataTextAndEnum.filter(
    item =>
      item.key === 'province' ||
      item.key === 'city' ||
      item.key === 'district' ||
      item.key === 'subDistrict' ||
      item.key === 'postalCode',
  );
  const domicialLocation = dataTextAndEnum.filter(
    item =>
      item.key === 'addressDomicileProvince' ||
      item.key === 'addressDomicileCity' ||
      item.key === 'addressDomicileDistrict' ||
      item.key === 'addressDomicileSubDistrict' ||
      item.key === 'addressDomicilePostalCode',
  );

  if (option === 'ONLY_TEXT') {
    const _arr = [
      ...dataTextAndFreeText,
      ...dataPhoneNumberType,
      ...dataDateType,
    ].map(item => ({
      [item.key]: item.values[0],
    }));
    return Object.assign({}, ..._arr);
  }

  if (option === 'ADDRESS') {
    const _arr = location.map(item => ({
      [item.key]: item.values[0],
    }));
    const obj = Object.assign({}, ..._arr);
    return {
      province: obj.province,
      city: obj.city,
      district: obj.district,
      subDistrict: obj.subDistrict,
      postalCode: obj.postalCode,
    };
  }

  if (option === 'DOMICILE_ADDRESS') {
    if (domicialLocation.length > 0) {
      const _arr = domicialLocation.map(item => ({
        [item.key]: item.values[0],
      }));
      const obj = Object.assign({}, ..._arr);
      return {
        province: obj.addressDomicileProvince,
        city: obj.addressDomicileCity,
        district: obj.addressDomicileDistrict,
        subDistrict: obj.addressDomicileSubDistrict,
        postalCode: obj.addressDomicilePostalCode,
      };
    }
    return undefined;
  }

  if (option === 'ENUM') {
    const _arr = dataTextAndEnum.map(item => ({
      [item.key]: {
        value: item.values[0],
        label: item.values[0],
      },
    }));
    return Object.assign({}, ..._arr);
  }

  if (option === 'FILE') {
    const _arr = dataFileType.map(item => ({
      [item.key]: item.values[0],
    }));
    return Object.assign({}, ..._arr);
  }
};

export const convertS3key = (str: any) => {
  if (str) {
    const _str =
      str && str.split('https://api.stg.ringkas.co.id/storage/s3/file?s3Key=');
    return _str[1];
  }
  return undefined;
};

export const checkEndpointUrl = (str: string) => {
  if (str) {
    const _str = str.split(
      'https://api.stg.ringkas.co.id/storage/s3/file?s3Key=',
    );
    return !(_str[1] === 'null');
  }
};

export const checkVerified = (
  key: string,
  arr: KprParams[],
  category: string,
) => {
  const list = arr.filter(item =>
    category === 'PERSONAL_DATA'
      ? item.category === 'KYC'
      : item.kprCategory === category,
  );
  const item = list.filter(item => item.key === key);
  return item[0]?.status === 'VERIFIED' || item[0]?.category === 'KYC';
};

export const getFileName = (link: string) => {
  const params = new URL(link).searchParams;
  const filePath = params.get('s3Key');
  return filePath?.split('/').pop() ?? filePath ?? link;
};

export const fieldNameTransform = (str: string) => {
  return (
    str
      .replace(/([A-Z])/g, ' $1')
      // uppercase the first character
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
  );
};

export const checkFileType = (str: string) => {
  const _strList = str.split('.');
  const type = _strList[_strList.length - 1];
  if (type === 'doc' || type === 'docx' || type === 'pdf') return 'TEXT';
  return 'IMG';
};
