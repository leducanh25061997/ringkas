import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { DeveloperAccountForm } from 'types/DeveloperAccountManagement';
import { useNavigate } from 'react-router';
import Notifier from 'app/pages/Notifier';
import BreadCrumbs from 'app/components/BreadCrumbs';
import { numberRegex } from 'utils/helpers/regex';
import moment from 'moment';

import { DeveloperInputForm } from './components/DeveloperInputForm';
import { Footer } from './components/Footer';
import { useCreateDeveloperSlice } from './slice';
import { selectDeveloperAccountCreate } from './slice/selectors';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: whitesmoke;
`;

const Header = styled.div`
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 16px;
  padding: 16px 31px 0px 31px;
  .parent-label {
    color: #005fc5;
  }
`;

export default function DeveloperAccountCreate() {
  const dispatch = useDispatch();
  const { actions } = useCreateDeveloperSlice();
  const { isLoading } = useSelector(selectDeveloperAccountCreate);
  const [stepDeveloper, setStepDeveloper] = useState<number>(0);
  const [formData, setFormData] = useState<DeveloperAccountForm>();
  const [images, setImages] = useState({
    fileKtp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileKtpDirector: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileNpwp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileTdp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileSiup: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
    fileSppkp: {
      file: null,
      url: '',
      name: '',
      nameFile: '',
    },
  });
  const { t } = useTranslation();
  const navigate = useNavigate();
  const links = React.useMemo(
    () => [
      {
        title: t(translations.common.manageUsers),
        path: path.manageUsers,
      },
      {
        title: t(translations.common.developerAccount),
        path: path.developerAccountList,
      },
      {
        title: t(translations.developerInformation.registerNewDeveloper),
      },
    ],
    [t],
  );
  let validateForm = yup.object().shape({});

  switch (stepDeveloper) {
    case 0:
      validateForm = yup.object().shape({
        email: yup
          .string()
          .email(t(translations.required.incorrectEmail))
          .required(t(translations.required.emailIsRequired)),
        kyc: yup.object().shape({
          fullName: yup
            .string()
            .required(t(translations.required.fullNameIsRequired)),
          phone: yup
            .string()
            .matches(numberRegex, t(translations.required.numberError))
            .required(t(translations.required.phoneIsRequired)),
          nik: yup.string().required(t(translations.required.nikIsRequired)),
          dob: yup.string().required(t(translations.required.dobIsRequired)),
        }),
        fileKtp: yup.lazy(value =>
          typeof value === 'string'
            ? yup
                .string()
                .required(t(translations.required.fileKtpIsRequired))
                .nullable()
            : yup
                .array()
                .required(t(translations.required.fileKtpIsRequired))
                .nullable(),
        ),
      });
      break;
    case 1:
      validateForm = yup.object().shape({
        company: yup.object().shape({
          name: yup
            .string()
            .required(t(translations.required.companyNameIsRequired)),
          email: yup
            .string()
            .email(t(translations.required.incorrectEmail))
            .required(t(translations.required.companyEmailIsRequired)),
          address: yup
            .string()
            .required(t(translations.required.companyAddressIsRequired)),
          phone: yup
            .string()
            .matches(numberRegex, t(translations.required.numberError))
            .required(t(translations.required.companyPhoneNumberIsRequired)),
          sppkpNumber: yup
            .string()
            .required(t(translations.required.companySppkpNumberIsRequired)),
          npwpNumber: yup
            .string()
            .matches(numberRegex, t(translations.required.numberError))
            .required(t(translations.required.companyNpwpNumberIsRequired)),
        }),
      });
      break;
    case 2:
      validateForm = yup.object().shape({
        fileKtpDirector: yup.lazy(value =>
          typeof value === 'string'
            ? yup
                .string()
                .required(t(translations.required.fileKtpDirectorIsRequired))
                .nullable()
            : yup
                .array()
                .required(t(translations.required.fileKtpDirectorIsRequired))
                .nullable(),
        ),
        fileNpwp: yup.lazy(value =>
          typeof value === 'string'
            ? yup
                .string()
                .required(t(translations.required.fileNpwpIsRequired))
                .nullable()
            : yup
                .array()
                .required(t(translations.required.fileNpwpIsRequired))
                .nullable(),
        ),
        fileTdp: yup.lazy(value =>
          typeof value === 'string'
            ? yup
                .string()
                .required(t(translations.required.fileTdpIsRequired))
                .nullable()
            : yup
                .array()
                .required(t(translations.required.fileTdpIsRequired))
                .nullable(),
        ),
        fileSiup: yup.lazy(value =>
          typeof value === 'string'
            ? yup
                .string()
                .required(t(translations.required.fileSiupIsRequired))
                .nullable()
            : yup
                .array()
                .required(t(translations.required.fileSiupIsRequired))
                .nullable(),
        ),
        fileSppkp: yup.lazy(value =>
          typeof value === 'string'
            ? yup
                .string()
                .required(t(translations.required.fileSppkpIsRequired))
                .nullable()
            : yup
                .array()
                .required(t(translations.required.fileSppkpIsRequired))
                .nullable(),
        ),
        fileSignature: yup.lazy(value =>
          typeof value === 'string'
            ? yup
                .string()
                .required(t(translations.required.signatureIsRequired))
                .nullable()
            : yup
                .object()
                .required(t(translations.required.signatureIsRequired))
                .nullable(),
        ),
      });
      break;

    default:
      break;
  }

  const methods = useForm<DeveloperAccountForm>({
    resolver: yupResolver(validateForm),
  });

  const onSubmit = (inputData: DeveloperAccountForm) => {
    if (stepDeveloper === 2) {
      setFormData(inputData);
    } else {
      setStepDeveloper(stepDeveloper + 1);
    }
  };

  useEffect(() => {
    if (formData) {
      const newFileNames: string[] = [];
      if (images.fileKtp.nameFile) {
        newFileNames.push(images.fileKtp.nameFile);
      }
      if (images.fileKtpDirector.nameFile) {
        newFileNames.push(images.fileKtpDirector.nameFile);
      }
      if (images.fileNpwp.nameFile) {
        newFileNames.push(images.fileNpwp.nameFile);
      }
      if (images.fileSiup.nameFile) {
        newFileNames.push(images.fileSiup.nameFile);
      }
      if (images.fileSppkp.nameFile) {
        newFileNames.push(images.fileSppkp.nameFile);
      }
      if (images.fileTdp.nameFile) {
        newFileNames.push(images.fileTdp.nameFile);
      }
      formData.kyc.fileSignature = [formData.fileSignature];
      formData.kyc.dob = formData.kyc.dob
        ? moment(formData.kyc.dob).format('yyyy-MM-DD')
        : '';

      dispatch(
        actions.createDeveloperRequest({
          files: {
            fileName: newFileNames,
          },
          images,
          formData,
          navigate,
        }),
      );
    }
  }, [formData]);

  const handleBack = () => {
    if (stepDeveloper === 0) {
      navigate(path.developerAccountList);
    } else {
      setStepDeveloper(stepDeveloper - 1);
    }
  };

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
          <DeveloperInputForm
            stepDeveloper={stepDeveloper}
            setImages={setImages}
            images={images}
          />
          <Footer
            handleSubmit={methods.handleSubmit(onSubmit)}
            handleBack={handleBack}
            stepDeveloper={stepDeveloper}
            isLoading={isLoading}
          />
        </form>
      </FormProvider>
    </RootContainer>
  );
}
