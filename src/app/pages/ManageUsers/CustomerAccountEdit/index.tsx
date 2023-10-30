import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import BreadCrumbs from 'app/components/BreadCrumbs';
import path from 'app/routes/path';
import DialogAction from 'app/components/DialogAction';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import styled from 'styled-components';
import { FormProvider, useForm } from 'react-hook-form';
import {
  CustomerAccountForm,
  CustomerKprParams,
} from 'types/CustomerManagement';

import { useCustomerInformationSlice } from './slice';
import { selectCustomerInformation } from './slice/selectors';
import { Footer } from './components/Footer';
import { CustomerInputForm } from './components/CustomerInputForm';
import { Images, ImagesOfKyc } from './slice/types';

import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 16px;
  padding: 16px 24px 0px 24px;
  .parent-label {
    color: #005fc5;
  }
`;

interface Props {}

const CustomerAccountEdit = React.memo((props: Props) => {
  const { actions } = useCustomerInformationSlice();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const { id } = params;
  const {
    customerInformation,
    customerKycInformation,
    customerKprInformation,
    isLoading,
  } = useSelector(selectCustomerInformation);
  const [stepCustomer, setStepCustomer] = useState<number>(0);
  const [formKYC, setFormKYC] = useState<CustomerAccountForm>();
  const [formKPR, setFormKPR] = useState<CustomerKprParams>();
  const [imagesOfKyc, setImagesOfKyc] = useState<ImagesOfKyc>({
    fileNik: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileSignature: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
  });
  const [images, setImages] = useState<Images>({
    fileIdCard: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileAttachments: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
    fileSignatureDigital: {
      file: '',
      url: '',
      name: '',
      nameFile: '',
      s3Key: '',
      originalName: '',
    },
  });

  const links = React.useMemo(
    () => [
      { title: t(translations.common.manageUsers), path: path.manageUsers },
      { title: 'Customer Account', path: path.customerAccountList },
      { title: 'Update Customer Information' },
    ],
    [customerInformation, t],
  );

  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(actions.fetchCustomerInformation(id));
    dispatch(actions.fetchCustomerKycInformation(id));
    dispatch(actions.fetchCustomerKprInformation(id));
  }, []);

  React.useEffect(() => {
    if (customerKycInformation) {
      setImagesOfKyc({
        ...imagesOfKyc,
        fileNik: {
          file: '',
          url: customerKycInformation?.fileNik?.url,
          name: 'fileNik',
          nameFile: '',
          s3Key: customerKycInformation?.fileNik?.s3Key,
          originalName: customerKycInformation?.fileNik?.originalName,
        },
        fileSignature: {
          file: '',
          url: customerKycInformation?.fileSignature?.url,
          name: 'fileSignature',
          nameFile: '',
          s3Key: customerKycInformation?.fileSignature?.s3Key,
          originalName: customerKycInformation?.fileSignature?.originalName,
        },
      });
      setImages({
        ...images,
        fileIdCard: {
          file: '',
          url: customerKprInformation?.dataSet?.personal?.fileIdCard?.url || '',
          name: '',
          nameFile: '',
          s3Key:
            customerKprInformation?.dataSet?.personal?.fileIdCard?.s3Key || '',
          originalName:
            customerKprInformation?.dataSet?.personal?.fileIdCard
              ?.originalName || '',
        },
        fileSignatureDigital: {
          file: '',
          url:
            customerKprInformation?.dataSet?.others?.fileSignatureDigital
              ?.url || '',
          name: '',
          nameFile: '',
          s3Key:
            customerKprInformation?.dataSet?.others?.fileSignatureDigital
              ?.s3Key || '',
          originalName:
            customerKprInformation?.dataSet?.others?.fileSignatureDigital
              ?.originalName || '',
        },
        fileAttachments: {
          file: '',
          url:
            (customerKprInformation?.dataSet?.assetIncome?.warrantorIncome
              ?.fileAttachments &&
              customerKprInformation?.dataSet?.assetIncome?.warrantorIncome
                ?.fileAttachments[0]?.url) ||
            '',
          name: '',
          nameFile: '',
          s3Key:
            (customerKprInformation?.dataSet?.assetIncome?.warrantorIncome
              ?.fileAttachments &&
              customerKprInformation?.dataSet?.assetIncome?.warrantorIncome
                ?.fileAttachments[0]?.s3Key) ||
            '',
          originalName:
            (customerKprInformation?.dataSet?.assetIncome?.warrantorIncome
              ?.fileAttachments &&
              customerKprInformation?.dataSet?.assetIncome?.warrantorIncome
                ?.fileAttachments[0]?.originalName) ||
            '',
        },
      });
    }
  }, [customerKycInformation, customerKprInformation]);

  const handleClick = () => {
    setOpenDialog(true);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const onSubmit = (inputData: any) => {
    if (stepCustomer === 1) {
      const formData = {
        fullName: inputData.fullNameOfKyc,
        phone: inputData.phoneOfKyc,
        dob: inputData.dobOfKyc,
        nik: inputData.nikOfKyc,
      };
      setFormKYC(formData);
    } else if (stepCustomer >= 4 && stepCustomer <= 10) {
      setFormKPR({
        ...formKPR,
        dataSet: inputData.dataSet,
      });
    }
  };

  useEffect(() => {
    if (formKYC) {
      const newFileNames: string[] = [];
      if (imagesOfKyc.fileNik.nameFile) {
        newFileNames.push(imagesOfKyc.fileNik.nameFile);
      }
      if (imagesOfKyc.fileSignature.nameFile) {
        newFileNames.push(imagesOfKyc.fileSignature.nameFile);
      }
      formKYC.userUuid = customerKycInformation?.userUuid;
      dispatch(
        actions.updateCustomerKYCRequest({
          files: {
            fileName: newFileNames,
          },
          formData: formKYC,
          images: imagesOfKyc,
          navigate,
        }),
      );
    }
  }, [formKYC]);

  useEffect(() => {
    if (formKPR) {
      const newFileNames: string[] = [];
      if (images.fileIdCard.nameFile) {
        newFileNames.push(images.fileIdCard.nameFile);
      }
      if (images.fileAttachments.nameFile) {
        newFileNames.push(images.fileAttachments.nameFile);
      }
      if (images.fileSignatureDigital.nameFile) {
        newFileNames.push(images.fileSignatureDigital.nameFile);
      }
      formKPR.userUuid = customerKycInformation?.userUuid;
      dispatch(
        actions.updateCustomerKPRRequest({
          files: {
            fileName: newFileNames,
          },
          formData: formKPR,
          images,
          navigate,
        }),
      );
    }
  }, [formKPR]);

  const handleBack = () => {
    navigate(path.customerAccountList);
  };

  const validateForm = yup.object().shape({});
  const methods = useForm<CustomerAccountForm>({
    resolver: yupResolver(validateForm),
  });

  return (
    <RootContainer>
      <Header>
        <BreadCrumbs links={links} />
      </Header>
      <FormProvider {...methods}>
        <form
          style={{ width: '100%' }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <CustomerInputForm
            stepCustomer={stepCustomer}
            setStepCustomer={setStepCustomer}
            setImages={setImages}
            images={images}
            setImagesOfKyc={setImagesOfKyc}
            imagesOfKyc={imagesOfKyc}
          />
          <Footer
            handleSubmit={methods.handleSubmit(onSubmit)}
            handleBack={handleBack}
            isLoading={isLoading}
            stepCustomer={stepCustomer}
          />
        </form>
      </FormProvider>
      <DialogAction
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
        title={'Inactive Account'}
        description={
          'Are you sure you want to deactivate this account? The account will no longer be able to use our services.'
        }
        onConfirm={onCloseDialog}
        titleButtonConfirm={'Update'}
        maxWidth={'md'}
      />
    </RootContainer>
  );
});

export default CustomerAccountEdit;
