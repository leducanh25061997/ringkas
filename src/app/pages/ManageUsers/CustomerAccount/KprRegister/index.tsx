import path from 'app/routes/path';
import blueArrowLeft from 'assets/icons/blue-arrow-left.svg';
import { translations } from 'locales/translations';
import PageHeader from 'app/components/PageHeader';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CustomRow from 'app/components/CustomRow';
import Tabs from 'app/components/Tabs';
import { FormProvider, useForm } from 'react-hook-form';
import PersonalData from './PersonalData';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import styled from 'styled-components';
import EmploymentData from './EmploymentData';
import Guarantor from './Guarantor';
import IncomeData from './IncomeData';
import BankRelation from './BankRelation';
import { useManageCustomerSlice } from '../slice';
import { selectManageCustomer } from '../slice/selectors';
import moment from 'moment';
import { useKprSlice } from './slice';
import {
  Action,
  Category,
  KprCategory,
  TextValueFormat,
  ValueType,
  KprParams,
  KprTab,
} from './slice/types';
import { selectKprReady } from './slice/selectors';
import Notifier from '../../../Notifier';
import Spinner from 'app/components/Spinner';
import {
  convertDataText,
  convertS3key,
  checkEndpointUrl,
} from 'utils/commonFunction';
import { capitalize } from 'lodash';
import { formatCurrency } from 'app/components/CustomTextField';

const ActionButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;

  background: #fff;
  padding: 12px 32px;
  position: sticky;
  bottom: 0;
`;

const ConfirmButton = styled.button`
  padding: 10px 20px;
  line-height: 28px;
  font-weight: 600;
  background: ${props => (props.disabled ? '#f3f3f3' : '#005FC5')};
  border-radius: 8px;
  color: #fff;
  width: 128px;
`;

const CancelButton = styled.div`
  width: 128px;
  padding: 10px 22px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
  color: #005fc5;
  background: #f6f7ff;
  margin-right: 32px;
  text-align: center;
  cursor: pointer;
`;

const convertValue = (
  values: any,
  category: Category,
  key: string,
  kprCategory: KprCategory,
  valueType: ValueType,
  textValueFormat: TextValueFormat,
  action: Action,
) => {
  return {
    category,
    kprCategory,
    key,
    values: [values],
    valueType,
    textValueFormat,
    action,
  };
};

const KprRegister = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const methods = useForm();
  const [tabSelect, setTabSelect] = useState<KprTab>(KprTab.PERSONAL_DATA);
  const tabList = [
    KprTab.PERSONAL_DATA,
    KprTab.EMPLOYMENT_DATA,
    KprTab.GUARANTOR,
    KprTab.INCOME_DATA,
    KprTab.BANK_RELATION,
  ];

  const dispatch = useDispatch();
  const kprActions = useKprSlice().actions;
  const manageCustomerActions = useManageCustomerSlice().actions;
  const params = useParams();
  const { id } = params;

  const { customerDetails } = useSelector(selectManageCustomer);
  const { isGetKprSuccess, kpr, isGetKprLoading, isUpdateKprLoading } =
    useSelector(selectKprReady);

  const personalData =
    kpr &&
    kpr.filter(
      item => item.kprCategory === 'PERSONAL_DATA' || item.category === 'KYC',
    );
  const personalOnlyText =
    personalData && convertDataText(personalData, 'ONLY_TEXT');
  const personalEnum = personalData && convertDataText(personalData, 'ENUM');
  const personalFiles = personalData && convertDataText(personalData, 'FILE');
  const address = personalData && convertDataText(personalData, 'ADDRESS');
  const domicialAddress =
    personalData && convertDataText(personalData, 'DOMICILE_ADDRESS');

  const employmentData =
    kpr && kpr.filter(item => item.kprCategory === 'EMPLOYMENT_DATA');
  const employmentOnlyText =
    employmentData && convertDataText(employmentData, 'ONLY_TEXT');
  const employmentEnum =
    employmentData && convertDataText(employmentData, 'ENUM');
  const employmentFiles =
    employmentData && convertDataText(employmentData, 'FILE');

  const guarantorData =
    kpr && kpr.filter(item => item.kprCategory === 'GUARANTOR');
  const guarantorOnlyText =
    guarantorData && convertDataText(guarantorData, 'ONLY_TEXT');
  const guarantorEnum = guarantorData && convertDataText(guarantorData, 'ENUM');
  const guarantorFiles =
    guarantorData && convertDataText(guarantorData, 'FILE');

  const incomeData =
    kpr && kpr.filter(item => item.kprCategory === 'INCOME_DATA');
  const incomeOnlyText = incomeData && convertDataText(incomeData, 'ONLY_TEXT');
  const incomeFiles = incomeData && convertDataText(incomeData, 'FILE');

  const bankData =
    kpr && kpr.filter(item => item.kprCategory === 'BANK_RELATION');
  const bankOnlyText = bankData && convertDataText(bankData, 'ONLY_TEXT');
  const bankFiles = bankData && convertDataText(bankData, 'FILE');

  const links = React.useMemo(
    () => [
      {
        label: `${t(translations.common.manageUsers)}`,
        link: path.customerAccountList,
      },
      {
        label: `${t(translations.customerAccountManagement.customerAccount)}`,
        link: path.customerAccountList,
      },
    ],
    [t],
  );

  useEffect(() => {
    if (!id) return;
    dispatch(manageCustomerActions.getCustomerDetails(id));
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const params = {
      id,
      categories: 'KPR',
      page: 0,
      size: 9999999,
    };
    // @ts-ignore
    dispatch(kprActions.getKpr(params));
  }, [id]);

  useEffect(() => {
    methods.reset({
      // ********** personal data
      fullName: personalOnlyText?.fullName,
      gender: personalOnlyText?.gender,
      birthPlace: {
        label: capitalize(personalEnum?.birthPlace?.value),
        value: capitalize(personalEnum?.birthPlace?.value),
      },
      dob:
        (personalOnlyText?.dob && moment(personalOnlyText?.dob).toDate()) ||
        undefined,
      maritalStatus: {
        label: capitalize(personalEnum?.maritalStatus?.label),
        value: personalEnum?.maritalStatus?.value,
      },
      nik: personalOnlyText?.nik,
      npwp: personalOnlyText?.npwp,
      phone: personalOnlyText?.phone,
      location: address,
      addressDetail: personalOnlyText?.addressDetail,
      isDomicile: personalOnlyText?.isDomicile === 'true',
      addressDomicile: domicialAddress || undefined,
      addressDetailDomicile: personalOnlyText?.addressDetailDomicile,
      kartuKeluarga: checkEndpointUrl(personalFiles?.kartuKeluarga)
        ? {
            url: personalFiles?.kartuKeluarga,
          }
        : undefined,
      kartuBpjsKesehatan: checkEndpointUrl(personalFiles?.kartuBpjsKesehatan)
        ? {
            url: personalFiles?.kartuBpjsKesehatan,
          }
        : undefined,

      // *********** employment data
      employmentType: employmentEnum?.employmentType || undefined,
      companyName: employmentOnlyText?.companyName,
      businessType: employmentEnum?.businessType || undefined,
      officeAddress: employmentOnlyText?.officeAddress,
      officePhone: employmentOnlyText?.officePhone,
      duration: employmentEnum?.duration || undefined,
      letterOfEmployment: checkEndpointUrl(employmentFiles?.letterOfEmployment)
        ? {
            url: employmentFiles?.letterOfEmployment,
          }
        : undefined,
      experience: employmentOnlyText?.experience,
      employmentCompanyName: employmentOnlyText?.employmentCompanyName,
      companyOfficePhone: employmentOnlyText?.companyOfficePhone,
      companyDuration: employmentEnum?.companyDuration || undefined,

      // ********** guarantor
      guarantorFullName: guarantorOnlyText?.fullName,
      guarantorDob:
        (guarantorOnlyText?.dob && moment(guarantorOnlyText?.dob).toDate()) ||
        undefined,
      guarantorCardNumber: guarantorOnlyText?.nik,
      guarantorEmploymentType:
        guarantorEnum?.guarantorEmploymentType || undefined,
      guarantorCompanyName: guarantorOnlyText?.guarantorCompanyName,
      guarantorBusinessType: guarantorEnum?.guarantorBusinessType,
      guarantorOfficeAddress: guarantorOnlyText?.guarantorOfficeAddress,
      guarantorOfficePhone: guarantorOnlyText?.guarantorOfficePhone,
      guarantorDuration: guarantorEnum?.guarantorDuration,
      guarantorLetterOfEmployment: checkEndpointUrl(
        guarantorFiles?.guarantorLetterOfEmployment,
      )
        ? {
            url: guarantorFiles?.guarantorLetterOfEmployment,
          }
        : undefined,
      suratNikah: checkEndpointUrl(guarantorFiles?.suratNikah)
        ? {
            url: guarantorFiles?.suratNikah,
          }
        : undefined,
      guarantorExperience: guarantorOnlyText?.guarantorExperience,
      guarantorEmploymentCompanyName:
        guarantorOnlyText?.guarantorEmploymentCompanyName,
      guarantorEmploymentCompanyOfficePhone:
        guarantorOnlyText?.guarantorEmploymentCompanyOfficePhone,
      guarantorEmploymentCompanyDuration:
        guarantorEnum?.guarantorEmploymentCompanyDuration,

      // ********** income data
      requesterNetIncome: formatCurrency(incomeOnlyText?.requesterNetIncome),
      requesterSalarySlipUpload: checkEndpointUrl(
        incomeFiles?.requesterSalarySlipUpload,
      )
        ? {
            url: incomeFiles?.requesterSalarySlipUpload,
          }
        : undefined,
      requesterSPT: checkEndpointUrl(incomeFiles?.requesterSPT)
        ? {
            url: incomeFiles?.requesterSPT,
          }
        : undefined,
      guarantorNetIncome: formatCurrency(incomeOnlyText?.guarantorNetIncome),
      guarantorSalarySlipUpload: checkEndpointUrl(
        incomeFiles?.guarantorSalarySlipUpload,
      )
        ? {
            url: incomeFiles?.guarantorSalarySlipUpload,
          }
        : undefined,
      guarantorSPT: checkEndpointUrl(incomeFiles?.guarantorSPT)
        ? {
            url: incomeFiles?.guarantorSPT,
          }
        : undefined,

      // ********** bank relation
      amountOfCreditLimit: formatCurrency(bankOnlyText?.amountOfCreditLimit),
      installmentPerMonth: formatCurrency(bankOnlyText?.installmentPerMonth),
      fileBankStatement: checkEndpointUrl(bankFiles?.fileBankStatement)
        ? {
            url: bankFiles?.fileBankStatement,
          }
        : undefined,
    });
  }, [kpr, t]);

  const updateKpr = (payload: KprParams[]) => {
    if (!id) return;
    dispatch(
      kprActions.updateKpr(
        {
          applicationId: id,
          params: payload,
        },
        () => {
          const params = {
            id,
            categories: 'KPR',
            page: 0,
            size: 9999999,
          };
          // @ts-ignore
          dispatch(kprActions.getKpr(params));
          Notifier.addNotifySuccess({ messageId: 'success.kprUpdateSuccess' });
        },
        () => {
          Notifier.addNotifyError({ messageId: 'error.kprUpdateFailed' });
        },
      ),
    );
  };

  const onSubmit = (data: any) => {
    if (!id) return;
    if (tabSelect === KprTab.PERSONAL_DATA) {
      let payload: KprParams[] = [];
      if (methods.getValues('isDomicile')) {
        payload = [
          convertValue(
            data?.fullName || personalOnlyText?.fullName,
            'KPR',
            'fullName',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.gender || personalOnlyText?.gender,
            'KPR',
            'gender',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.birthPlace.value || personalEnum?.birthPlace,
            'KPR',
            'birthPlace',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data?.dob
              ? moment(data.dob).format('YYYY/MM/DD')
              : moment(personalOnlyText?.dob).toDate(),
            'KPR',
            'dob',
            'PERSONAL_DATA',
            'TEXT',
            'DATE',
            'SUBMITTED',
          ),
          convertValue(
            data?.maritalStatus.value,
            'KPR',
            'maritalStatus',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),

          convertValue(
            data?.nik || personalOnlyText?.nik,
            'KPR',
            'nik',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.npwp || personalOnlyText?.npwp,
            'KPR',
            'npwp',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.phone || personalOnlyText?.phone,
            'KPR',
            'phone',
            'PERSONAL_DATA',
            'TEXT',
            'PHONE_NUMBER',
            'SUBMITTED',
          ),

          convertValue(
            data.location?.province || address?.province,
            'KPR',
            'province',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data.location?.city || address?.city,
            'KPR',
            'city',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data.location?.district || address?.district,
            'KPR',
            'district',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data.location?.subDistrict || address?.subDistrict,
            'KPR',
            'subDistrict',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data.location?.postalCode || address?.postalCode,
            'KPR',
            'postalCode',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),

          convertValue(
            data.addressDetail || personalOnlyText?.addressDetail,
            'KPR',
            'addressDetail',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),

          convertValue(
            String(data.isDomicile),
            'KPR',
            'isDomicile',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),

          convertValue(
            data.addressDomicile?.province || domicialAddress?.province,
            'KPR',
            'addressDomicileProvince',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data.addressDomicile?.city || domicialAddress?.city,
            'KPR',
            'addressDomicileCity',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data.addressDomicile?.district || domicialAddress?.district,
            'KPR',
            'addressDomicileDistrict',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data.addressDomicile?.subDistrict || domicialAddress?.subDistrict,
            'KPR',
            'addressDomicileSubDistrict',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data.addressDomicile?.postalCode || domicialAddress?.postalCode,
            'KPR',
            'addressDomicilePostalCode',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),

          convertValue(
            data?.addressDetailDomicile,
            'KPR',
            'addressDetailDomicile',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.kartuKeluarga?.s3Key ||
              convertS3key(personalFiles?.kartuKeluarga) ||
              undefined,
            'KPR',
            'kartuKeluarga',
            'PERSONAL_DATA',
            'FILE',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.kartuBpjsKesehatan?.s3Key ||
              convertS3key(personalFiles?.kartuBpjsKesehatan) ||
              undefined,
            'KPR',
            'kartuBpjsKesehatan',
            'PERSONAL_DATA',
            'FILE',
            'FREE_TEXT',
            'SUBMITTED',
          ),
        ];
      } else {
        payload = [
          convertValue(
            data?.fullName || personalOnlyText?.fullName,
            'KPR',
            'fullName',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.gender || personalOnlyText?.gender,
            'KPR',
            'gender',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.birthPlace?.value || personalEnum?.birthPlace,
            'KPR',
            'birthPlace',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data?.dob
              ? moment(data.dob).format('YYYY/MM/DD')
              : moment(personalOnlyText?.dob).toDate(),
            'KPR',
            'dob',
            'PERSONAL_DATA',
            'TEXT',
            'DATE',
            'SUBMITTED',
          ),
          convertValue(
            data?.maritalStatus?.value,
            'KPR',
            'maritalStatus',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),

          convertValue(
            data?.nik || personalOnlyText?.nik,
            'KPR',
            'nik',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.npwp || personalOnlyText?.npwp,
            'KPR',
            'npwp',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.phone || personalOnlyText?.phone,
            'KPR',
            'phone',
            'PERSONAL_DATA',
            'TEXT',
            'PHONE_NUMBER',
            'SUBMITTED',
          ),

          convertValue(
            data?.location.province || address?.province,
            'KPR',
            'province',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data?.location.city || address?.city,
            'KPR',
            'city',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data?.location.district || address?.district,
            'KPR',
            'district',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data?.location.subDistrict || address?.subDistrict,
            'KPR',
            'subDistrict',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),
          convertValue(
            data?.location.postalCode || address?.postalCode,
            'KPR',
            'postalCode',
            'PERSONAL_DATA',
            'TEXT',
            'ENUM',
            'SUBMITTED',
          ),

          convertValue(
            data?.addressDetail || personalOnlyText?.addressDetail,
            'KPR',
            'addressDetail',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            String(data?.isDomicile),
            'KPR',
            'isDomicile',
            'PERSONAL_DATA',
            'TEXT',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.kartuKeluarga?.s3Key ||
              convertS3key(personalFiles?.kartuKeluarga) ||
              undefined,
            'KPR',
            'kartuKeluarga',
            'PERSONAL_DATA',
            'FILE',
            'FREE_TEXT',
            'SUBMITTED',
          ),
          convertValue(
            data?.kartuBpjsKesehatan?.s3Key ||
              convertS3key(personalFiles?.kartuBpjsKesehatan) ||
              undefined,
            'KPR',
            'kartuBpjsKesehatan',
            'PERSONAL_DATA',
            'FILE',
            'FREE_TEXT',
            'SUBMITTED',
          ),
        ];
      }

      updateKpr(payload);
    }

    if (tabSelect === KprTab.EMPLOYMENT_DATA) {
      const payload = [
        convertValue(
          (data.employmentType && data.employmentType.value.toUpperCase()) ||
            undefined,
          'KPR',
          'employmentType',
          'EMPLOYMENT_DATA',
          'TEXT',
          'ENUM',
          'SUBMITTED',
        ),
        convertValue(
          data?.companyName,
          'KPR',
          'companyName',
          'EMPLOYMENT_DATA',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          (data.businessType && data.businessType.value) || undefined,
          'KPR',
          'businessType',
          'EMPLOYMENT_DATA',
          'TEXT',
          'ENUM',
          'SUBMITTED',
        ),
        convertValue(
          data?.officeAddress,
          'KPR',
          'officeAddress',
          'EMPLOYMENT_DATA',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.officePhone,
          'KPR',
          'officePhone',
          'EMPLOYMENT_DATA',
          'TEXT',
          'PHONE_NUMBER',
          'SUBMITTED',
        ),
        convertValue(
          (data.duration && data.duration.value) || undefined,
          'KPR',
          'duration',
          'EMPLOYMENT_DATA',
          'TEXT',
          'ENUM',
          'SUBMITTED',
        ),
        convertValue(
          data?.letterOfEmployment?.s3Key ||
            (employmentFiles?.letterOfEmployment &&
              convertS3key(employmentFiles?.letterOfEmployment)) ||
            undefined,
          'KPR',
          'letterOfEmployment',
          'EMPLOYMENT_DATA',
          'FILE',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          String(data?.experience),
          'KPR',
          'experience',
          'EMPLOYMENT_DATA',
          'TEXT',
          'ENUM',
          'SUBMITTED',
        ),
        convertValue(
          data?.employmentCompanyName,
          'KPR',
          'employmentCompanyName',
          'EMPLOYMENT_DATA',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.companyOfficePhone,
          'KPR',
          'companyOfficePhone',
          'EMPLOYMENT_DATA',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          (data.companyDuration && data.companyDuration.value) || undefined,
          'KPR',
          'companyDuration',
          'EMPLOYMENT_DATA',
          'TEXT',
          'ENUM',
          'SUBMITTED',
        ),
      ];

      updateKpr(payload);
    }

    if (tabSelect === KprTab.GUARANTOR) {
      const payload = [
        convertValue(
          data?.guarantorFullName || guarantorOnlyText?.fullName,
          'KPR',
          'fullName',
          'GUARANTOR',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          (data.guarantorDob &&
            moment(data.guarantorDob).format('YYYY/MM/DD')) ||
            (guarantorOnlyText.dob && moment(guarantorOnlyText?.dob).toDate()),
          'KPR',
          'dob',
          'GUARANTOR',
          'TEXT',
          'DATE',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorCardNumber || guarantorOnlyText?.nik,
          'KPR',
          'nik',
          'GUARANTOR',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),

        convertValue(
          data?.suratNikah?.s3Key ||
            (guarantorFiles?.suratNikah &&
              convertS3key(guarantorFiles?.suratNikah)) ||
            undefined,
          'KPR',
          'suratNikah',
          'GUARANTOR',
          'FILE',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data.guarantorEmploymentType && data.guarantorEmploymentType.value,
          'KPR',
          'guarantorEmploymentType',
          'GUARANTOR',
          'TEXT',
          'ENUM',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorCompanyName,
          'KPR',
          'guarantorCompanyName',
          'GUARANTOR',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data.guarantorBusinessType && data.guarantorBusinessType.value,
          'KPR',
          'guarantorBusinessType',
          'GUARANTOR',
          'TEXT',
          'ENUM',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorOfficeAddress,
          'KPR',
          'guarantorOfficeAddress',
          'GUARANTOR',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorOfficePhone,
          'KPR',
          'guarantorOfficePhone',
          'GUARANTOR',
          'TEXT',
          'PHONE_NUMBER',
          'SUBMITTED',
        ),
        convertValue(
          data.guarantorDuration && data.guarantorDuration.value,
          'KPR',
          'guarantorDuration',
          'GUARANTOR',
          'TEXT',
          'ENUM',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorLetterOfEmployment?.s3Key ||
            (guarantorFiles?.guarantorLetterOfEmployment &&
              convertS3key(guarantorFiles?.guarantorLetterOfEmployment)) ||
            undefined,
          'KPR',
          'guarantorLetterOfEmployment',
          'GUARANTOR',
          'FILE',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorExperience,
          'KPR',
          'guarantorExperience',
          'GUARANTOR',
          'TEXT',
          'ENUM',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorEmploymentCompanyName,
          'KPR',
          'guarantorEmploymentCompanyName',
          'GUARANTOR',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorEmploymentCompanyOfficePhone,
          'KPR',
          'guarantorEmploymentCompanyOfficePhone',
          'GUARANTOR',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data.guarantorEmploymentCompanyDuration &&
            data.guarantorEmploymentCompanyDuration.value,
          'KPR',
          'guarantorEmploymentCompanyDuration',
          'GUARANTOR',
          'TEXT',
          'ENUM',
          'SUBMITTED',
        ),
      ];

      updateKpr(payload);
    }

    if (tabSelect === KprTab.INCOME_DATA) {
      const payload = [
        convertValue(
          data?.requesterNetIncome.replaceAll('.', ''),
          'KPR',
          'requesterNetIncome',
          'INCOME_DATA',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.requesterSalarySlipUpload?.s3Key ||
            (incomeFiles?.requesterSalarySlipUpload &&
              convertS3key(incomeFiles?.requesterSalarySlipUpload)) ||
            undefined,
          'KPR',
          'requesterSalarySlipUpload',
          'INCOME_DATA',
          'FILE',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.requesterSPT?.s3Key ||
            (incomeFiles?.requesterSPT &&
              convertS3key(incomeFiles?.requesterSPT)) ||
            undefined,
          'KPR',
          'requesterSPT',
          'INCOME_DATA',
          'FILE',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorNetIncome.replaceAll('.', ''),
          'KPR',
          'guarantorNetIncome',
          'INCOME_DATA',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorSalarySlipUpload?.s3Key ||
            (incomeFiles?.guarantorSalarySlipUpload &&
              convertS3key(incomeFiles?.guarantorSalarySlipUpload)) ||
            undefined,
          'KPR',
          'guarantorSalarySlipUpload',
          'INCOME_DATA',
          'FILE',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.guarantorSPT?.s3Key ||
            (incomeFiles?.guarantorSPT &&
              convertS3key(incomeFiles?.guarantorSPT)) ||
            undefined,
          'KPR',
          'guarantorSPT',
          'INCOME_DATA',
          'FILE',
          'FREE_TEXT',
          'SUBMITTED',
        ),
      ];

      updateKpr(payload);
    }

    if (tabSelect === KprTab.BANK_RELATION) {
      const payload = [
        convertValue(
          data?.amountOfCreditLimit.replaceAll('.', ''),
          'KPR',
          'amountOfCreditLimit',
          'BANK_RELATION',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.installmentPerMonth.replaceAll('.', ''),
          'KPR',
          'installmentPerMonth',
          'BANK_RELATION',
          'TEXT',
          'FREE_TEXT',
          'SUBMITTED',
        ),
        convertValue(
          data?.fileBankStatement == null
            ? undefined
            : data?.fileBankStatement.s3Key ||
                (bankFiles.fileBankStatement &&
                  convertS3key(bankFiles.fileBankStatement)),
          'KPR',
          'fileBankStatement',
          'BANK_RELATION',
          'FILE',
          'FREE_TEXT',
          'SUBMITTED',
        ),
      ];

      updateKpr(payload);
    }
  };

  if (!kpr) return null;

  return (
    <FormProvider {...methods}>
      <form
        className="relative h-screen"
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        <div className="py-4 px-6 min-h-screen">
          <div className="flex items-center mb-4 cursor-pointer">
            <div
              className="flex items-center py-[10px] px-6 bg-[#fff] rounded-[8px] mr-6"
              onClick={() => navigate(path.customerAccountList)}
            >
              <img
                className="h-[16px] w-[16px]"
                src={blueArrowLeft}
                alt="arrow"
              />
              <p className="text-[#005FC5] text-[16px] leading-[28px] font-semibold ml-2">
                {t(translations.common.back)}
              </p>
            </div>
            <PageHeader
              parentItems={links}
              title={t(translations.createCustomer.registerKPR)}
            />
          </div>
          <div className="p-6 bg-[#fff] rounded-2xl">
            <p className="text-[#223250] text-[20px] leading-[24px] font-bold">
              {t(translations.partnerManagement.dataSummary)}
            </p>
            <div className="flex mt-6">
              <CustomRow
                title={t(translations.customerList.fullName)}
                description={
                  customerDetails?.account?.fullName
                    ? `${customerDetails?.account?.fullName}`
                    : '-'
                }
                className="w-1/3"
              />
              <CustomRow
                title={t(translations.customerList.leads)}
                description={
                  customerDetails?.leads &&
                  customerDetails?.leads?.kyc &&
                  customerDetails?.leads?.kyc.fullName
                    ? customerDetails?.leads?.kyc?.fullName
                    : 'Ringkas'
                }
                className="w-1/3"
              />
              <CustomRow
                title={t(translations.dataVerification.picAdminRingkas)}
                description={'-'}
                className="w-1/3"
              />
            </div>
          </div>
          <div className="p-10 bg-[#fff] rounded-2xl mt-6 min-h-screen">
            <p className="text-[#223250] text-[20px] leading-[24px] font-bold text-center">
              {t(translations.createCustomer.kprInformation)}
            </p>
            <p className="text-[#223250] text-[14px] mt-2 text-center">
              Complete partner’s KPR information
            </p>
            <Tabs
              className="my-8 justify-center"
              tabList={tabList.map(item =>
                t(translations.customerAccountManagement[item]),
              )}
              onChange={nextPage => {
                const tab = tabList.filter(
                  item =>
                    nextPage ===
                    t(translations.customerAccountManagement[item]),
                )[0];
                setTabSelect(tab);
              }}
              pageActive={t(translations.customerAccountManagement[tabSelect])}
            />

            {isGetKprLoading || isUpdateKprLoading ? (
              <div className="w-full h-full flex items-center justify-center min-h-[147px]">
                <Spinner />
              </div>
            ) : (
              <>
                {tabSelect === KprTab.PERSONAL_DATA && <PersonalData />}
                {tabSelect === KprTab.EMPLOYMENT_DATA && <EmploymentData />}
                {tabSelect === KprTab.GUARANTOR && <Guarantor />}
                {tabSelect === KprTab.INCOME_DATA && <IncomeData />}
                {tabSelect === KprTab.BANK_RELATION && <BankRelation />}
              </>
            )}
          </div>
        </div>
        <ActionButtonWrap>
          <CancelButton>{t(translations.common.cancel)}</CancelButton>
          <ConfirmButton disabled={false} type="submit">
            {t(translations.common.save)}
          </ConfirmButton>
        </ActionButtonWrap>
      </form>
    </FormProvider>
  );
};

export default KprRegister;
