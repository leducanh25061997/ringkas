import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Stepper3 from 'app/components/Stepper/Stepper3';
import Notifier from 'app/pages/Notifier';
import SubmitButton from 'app/pages/Register/RegisterBank/Headquarter/components/SubmitButton';
import { useSignUpCreateSlice } from 'app/pages/Register/slice';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import { get } from 'lodash';
import moment from 'moment';
import { memo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FileUpload } from 'types';
import { CompanyInfo } from '../CompanyInfo';
import { PicInfo } from '../PicInfo';
import { UploadDocument } from '../UploadDocument';
interface Props {
  onSubmitFormSuccess: () => void;
}

const getS3Keys = (form: any, key: string) =>
  get(form, key)?.map((file: FileUpload) => file.s3Key) || [];

const getS3Key = (form: any, key: string) => [get(form, key)?.s3Key] || [];

const RegisterPartnerForm = memo((props: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useSignUpCreateSlice();

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmittingClient, setIsSubmittingClient] = useState(false);

  const formMethod1 = useForm({ mode: 'onChange' });
  const formMethod2 = useForm({
    mode: 'onChange',
  });
  const formMethod3 = useForm({ mode: 'onChange' });

  const steps = [
    {
      title: t(translations.registerNewClient.kyc),
      description: t(translations.registerNewClient.kycStepDescription),
    },
    {
      title: t(translations.registerNewClient.kyb),
      description: t(translations.registerNewClient.kybStepDescription),
    },
    {
      title: t(translations.registerNewClient.document),
      description: t(translations.registerNewClient.documentStepDescription),
    },
  ];

  const handleGotoNextStep = () => {
    switch (activeStep) {
      case 0:
        formMethod1.handleSubmit(() => {
          setActiveStep(1);
        })();
        break;
      case 1:
        formMethod2.handleSubmit(() => {
          setActiveStep(2);
        })();
        break;
      case 2:
      default:
        formMethod2.handleSubmit(() => {
          handleCreateCustomer();
        })();
        break;
    }
  };

  const handleBack = (e: any, selected: number) => {
    if (selected < activeStep) {
      setActiveStep(selected);
    }
  };

  const getSubmitButtonStatus = () => {
    if (activeStep === 0) return !formMethod1.formState.isValid;
    if (activeStep === 1) return !formMethod2.formState.isValid;
    if (activeStep === 2) return !formMethod3.formState.isValid;
    return true;
  };

  const handleCreateCustomer = () => {
    if (isSubmittingClient) return;
    setIsSubmittingClient(true);

    const formValue1 = formMethod1.getValues();
    const formValue2 = formMethod2.getValues();
    const formValue3 = formMethod3.getValues();

    const data: any = {
      password: get(formValue1, 'password'),
      email: get(formValue1, 'kyc.email'),
      kyc: {
        ...get(formValue1, 'kyc'),
        dob: moment(get(formMethod1, 'kyc.dob')).format('YYYY-MM-DD'),
        birthPlace: get(formValue1, 'kyc.birthPlace.value'),
      },
      company: {
        ...get(formValue2, 'company'),
        fileLogo: getS3Key(formValue2, 'company.fileLogo'),
      },
      document: {
        fileKtpDirector: getS3Key(formValue3, 'document.kptDirector'),
        fileDeedOfCompany: getS3Key(formValue3, 'document.deedOfCompany'),
        fileCompanyNpwp: getS3Key(formValue3, 'document.companyNPWP'),
        fileNib: getS3Key(formValue3, 'document.nib'),
        fileCompanyDecree: getS3Key(formValue3, 'document.companyDecree'),
        fileSupportingDocument: getS3Keys(
          formValue3,
          'document.supportingDocument',
        ),
      },
    };

    dispatch(
      actions.signUpHeadquarter(
        data,
        (error?: any) => {
          setIsSubmittingClient(false);
          if (!error) {
            Notifier.addNotifySuccess({
              message: t(
                translations.registerNewClient.partnerRegisteredSuccess,
              ),
            });
            navigate(path.partnerAccountList);
          } else {
            Notifier.addNotifyError({
              message: t(
                translations.registerNewClient.partnerRegisteredSuccess,
              ),
            });
          }
        },
        code => {
          setIsSubmittingClient(false);
        },
      ),
    );
  };

  return (
    <Box>
      <div className="flex items-center justify-center">
        <Stepper3 steps={steps} activeStep={activeStep} onClick={handleBack} />
      </div>
      <Grid item xs={12} md={12} className="flex items-center justify-center">
        <Stack sx={{ width: '600px' }}>
          <PicInfo form={formMethod1} show={activeStep === 0} />
          <CompanyInfo form={formMethod2} show={activeStep === 1} />
          <UploadDocument form={formMethod3} show={activeStep === 2} />
        </Stack>
      </Grid>
      <Grid
        item
        xs={12}
        md={12}
        sx={{ mt: 4 }}
        className="flex items-center justify-center"
      >
        <Stack sx={{ width: '600px' }}>
          <SubmitButton
            color="primary"
            onClick={handleGotoNextStep}
            disabled={getSubmitButtonStatus()}
          >
            {activeStep === 2
              ? t(translations.common.submit)
              : t(translations.common.continue)}
          </SubmitButton>
        </Stack>
      </Grid>
    </Box>
  );
});
export default RegisterPartnerForm;
