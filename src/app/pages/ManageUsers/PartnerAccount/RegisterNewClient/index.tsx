import { LoadingButton } from '@mui/lab';
import Button from 'app/components/common/Button';
import { formatCurrency } from 'app/components/CustomTextField';
import PageHeader from 'app/components/PageHeader';
import Stepper3 from 'app/components/Stepper/Stepper3';
import Notifier from 'app/pages/Notifier';
import path from 'app/routes/path';
import backIcon from 'assets/icons/back-blue.svg';
import { translations } from 'locales/translations';
import { get, isEmpty } from 'lodash';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { FileUpload } from 'types';
import { CompanyInfo } from './components/CompanyInfo';
import { PicInfo } from './components/PicInfo';
import { UploadDocument } from './components/UploadDocument';
import { useRegisterNewClientSlice } from './slice';

const getS3Keys = (form: any, key: string) =>
  get(form, key)?.map((file: FileUpload) => file.s3Key) || [];

const getS3Key = (form: any, key: string) => [get(form, key)?.s3Key] || [];

export function RegisterNewClient() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { actions } = useRegisterNewClientSlice();

  const [activeStep, setActiveStep] = useState(0);
  const [isSubmittingClient, setIsSubmittingClient] = useState(false);

  const formMethod1 = useForm({ mode: 'onChange' });
  const formMethod2 = useForm({
    mode: 'onChange',
  });
  const formMethod3 = useForm({ mode: 'onChange' });

  const project: any = formMethod1.watch('project');
  const projectType = formMethod1.watch('projectType');
  const property = formMethod1.watch('unit');
  const housePrice = formMethod1.watch('housePrice');

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

  const handleBack = () => {
    if (activeStep === 0) navigate(path.customerAccountList);
    setActiveStep(prev => prev - 1);
  };

  const handleBackToCustomerList = () => navigate(path.customerAccountList);
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
      actions.createClient(data, (error?: any) => {
        setIsSubmittingClient(false);
        if (!error) {
          Notifier.addNotifySuccess({
            message: t(translations.registerNewClient.partnerRegisteredSuccess),
          });
          navigate(path.partnerAccountList);
        }
      }),
    );
  };

  return (
    <div className="flex flex-col min-h-[calc(100vh-85px)] pt-4">
      <div className="mb-6 flex items-center px-6">
        <div
          className="py-[10px] px-6 text-[#005FC5] leading-7 cursor-pointer bg-white rounded-lg flex items-center mr-6"
          onClick={handleBackToCustomerList}
        >
          <img src={backIcon} width={16} height={16} className="mr-2" alt="" />
          <p className="font-semibold">{t(translations.common.back)}</p>
        </div>
        <PageHeader
          title={t(translations.registerNewClient.title)}
          parentItems={[
            {
              label: t(translations.dataVerification.manageUser),
              link: path.customerAccountList,
            },
            {
              label: t(translations.sidebar.partnerAccount),
              link: path.partnerAccountList,
            },
          ]}
        />
      </div>
      <div className="flex items-center justify-center h-[107px] bg-white rounded-2xl shadow-[inset_0px_-1px_0px_#E3E8EE] mx-6 px-[55px]">
        <Stepper3 steps={steps} activeStep={activeStep} />
      </div>
      <div className="flex justify-center mx-6">
        <PicInfo form={formMethod1} show={activeStep === 0} />
        <CompanyInfo form={formMethod2} show={activeStep === 1} />
        <UploadDocument form={formMethod3} show={activeStep === 2} />
      </div>
      <div className="flex bg-white h-[89px] shadow-[inset_0px_-1px_0px_#E3E8EE] leading-7 items-center mt-auto px-[55px] sticky bottom-0 left-0 right-0">
        <div className="mr-8">
          {property && (
            <p className="text-[#4F566B] leading-5 mb-2">
              {project.name + ' / ' + project.developerName}
            </p>
          )}
          {(housePrice || property) && (
            <p className="text-[#3C4257] leading-6 font-semibold">
              Rp {formatCurrency(housePrice || property.price)}
            </p>
          )}
        </div>
        {property && (
          <div className="mr-8">
            <p className="text-[#4F566B] leading-5 mb-2">
              {t(translations.createCustomer.type)}
            </p>
            <p className="text-[#3C4257] leading-6 font-semibold">
              {projectType?.value}
            </p>
          </div>
        )}
        {property && (
          <div className="mr-8">
            <p className="text-[#4F566B] leading-5 mb-2">
              {t(translations.createCustomer.unit)}
            </p>
            <p className="text-[#3C4257] leading-6 font-semibold">
              {property.label}
            </p>
          </div>
        )}
        <Button
          color="secondary"
          className="ml-auto"
          onClick={handleBack}
          disabled={isSubmittingClient}
        >
          {activeStep === 0
            ? t(translations.common.cancel)
            : t(translations.common.previous)}
        </Button>
        <LoadingButton
          color="primary"
          sx={{ ml: 4 }}
          variant="contained"
          size="large"
          onClick={handleGotoNextStep}
          disabled={getSubmitButtonStatus()}
          loading={isSubmittingClient}
        >
          {activeStep === 2
            ? t(translations.common.submit)
            : t(translations.common.next)}
        </LoadingButton>
      </div>
    </div>
  );
}
