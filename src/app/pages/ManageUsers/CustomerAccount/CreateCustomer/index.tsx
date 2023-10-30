// Just by-pass for this time :(
// @ts-nocheck
import Button from 'app/components/common/Button';
import { formatCurrency } from 'app/components/CustomTextField';
import PageHeader from 'app/components/PageHeader';
import Stepper3 from 'app/components/Stepper/Stepper3';
import Notifier from 'app/pages/Notifier';
import { FileProps } from 'app/pages/Register/slice/types';
import path from 'app/routes/path';
import backIcon from 'assets/icons/back-blue.svg';
import { translations } from 'locales/translations';
import moment from 'moment';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { CreateCustomerData } from '../ListCustomer/types';
import { useManageCustomerSlice } from '../slice';
import { ProjectType } from '../slice/types';
import BankPreference from './BankPreference';
import Credit from './Credit';
import Kyc from './KycInformation';
import NoticeDialog from './NoticeDialog';
import Property from './Property';

export default function CreateCustomer() {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [activeStep, setActiveStep] = useState(0);
  const [openNoticeDialog, setOpenNoticeDialog] = useState(false);
  const [isCreatingCustomer, setIsCreatingCustomer] = useState(false);

  const dispatch = useDispatch();

  const { actions } = useManageCustomerSlice();

  const formMethod1 = useForm({ mode: 'onChange' });
  const formMethod2 = useForm({
    mode: 'onChange',
    defaultValues: {
      bankPreferences: [{ id: 0 }],
    },
  });
  const formMethod3 = useForm({ mode: 'onChange' });

  const project: ProjectType = formMethod1.watch('project');
  const projectType = formMethod1.watch('projectType');
  const projectName = formMethod1.watch('projectName');
  const product = formMethod1.watch('product');
  const property = formMethod1.watch('unit');
  const housePrice = formMethod1.watch('housePrice');
  const developer = formMethod1.watch('developer');

  const steps = [
    {
      title: t(translations.createCustomer.propertyPreference),
      description: t(translations.createCustomer.propertyPreferenceHint),
    },
    {
      title: t(translations.createCustomer.creditPreference),
      description: t(translations.createCustomer.creditPreferenceHint),
    },
    {
      title: t(translations.createCustomer.kyc),
      description: t(translations.createCustomer.kycHint),
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
          setOpenNoticeDialog(true);
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
    if (activeStep === 1) {
      const bankPreferences = formMethod2.watch('bankPreferences');
      return (
        !formMethod2.formState.isValid ||
        bankPreferences.some(bp => !bp.bank?.value)
      );
    }
    if (activeStep === 2) return !formMethod3.formState.isValid;
    return true;
  };

  const handleCreateCustomer = () => {
    if (isCreatingCustomer) return;
    setIsCreatingCustomer(true);

    const formValue1 = formMethod1.getValues();
    const formValue2 = formMethod2.getValues();
    const formValue3 = formMethod3.getValues();

    const getFile = (fileObject: FileProps & { file?: File }) => {
      return { ...fileObject, file: undefined };
    };

    const data: CreateCustomerData = {
      email: formValue3.requesterEmail,
      kyc: {
        phone: formValue3.requesterPhone,
        gender: formValue3.requesterGender,
        nik: formValue3.requesterNik,
        npwp: formValue3.requesterNpwp,
        fullName: formValue3.requesterFullName,
        dob: moment(formValue3.requesterDob).format('YYYY-MM-DD'),
        birthPlace: formValue3.requesterBirthPlace?.value,
        fileKtp: [getFile(formValue3.requesterKtpPhoto)],
        fileNpwp: [getFile(formValue3.requesterNpwpPhoto)],
        filePhoto: [getFile(formValue3.requesterSelfiePhoto)],
        location: formValue3.requesterLocation,
      },
      guarantor: {
        phone: formValue3.warrantorPhone,
        gender: formValue3.warrantorGender,
        nik: formValue3.warrantorNik,
        npwp: formValue3.warrantorNpwp,
        fullName: formValue3.warrantorFullName,
        dob: moment(formValue3.warrantorDob).format('YYYY-MM-DD'),
        birthPlace: formValue3.warrantorBirthPlace?.value,
        fileKtp: [getFile(formValue3.warrantorKtpPhoto)],
        fileNpwp: [getFile(formValue3.warrantorNpwpPhoto)],
        filePhoto: [getFile(formValue3.warrantorSelfiePhoto)],
        location: formValue3.warrantorLocation,
      },
      preferences: {
        property: {
          housePriceProduct: formValue1.housePrice
            ? Number(formValue1.housePrice.split('.').join(''))
            : formValue1.unit?.price,
          location: { city: formValue1.city?.value },
          propertyId: formValue1.unit?.value || formValue1.propertyId,
          developerUuid: formValue1.developer?.value,
        },
        credit: {
          takeHomePayMonthly: Number(
            formValue2.takeHomePayMonthly.split('.').join(''),
          ),
          totalObligationMonthly: Number(
            formValue2.totalObligationMonthly.split('.').join(''),
          ),
          downPaymentPreference: Number(
            formValue2.downPaymentPreference.split('.').join(''),
          ),
          installmentPreferenceMonthly: Number(
            formValue2.installmentPreferenceMonthly.split('.').join(''),
          ),
          employeeType: formValue2.employeeType?.value,
          typeOfLoan:
            formValue2.typeOfLoan === 'true' ? 'SHARIA' : 'CONVENTIONAL',
          jointIncome: formValue2.joinIncome === 'true',
          tenorPreference: Number(formValue2.tenor?.value),
        },
        bank: formValue2.bankPreferences.map(bp => ({
          bankUuid: bp.bank?.value,
          loanProgramId: bp.loan?.id,
        })),
      },
      consentApproval: 'VIA_EMAIL',
    };

    dispatch(
      actions.createCustomer(
        data,
        () => {
          setIsCreatingCustomer(false);
          Notifier.addNotifySuccess({
            message: t(translations.createCustomer.createCustomerSuccess),
          });
          navigate(path.customerAccountList);
        },
        (message: string) => {
          setIsCreatingCustomer(false);
          switch (message) {
            case 'KEYCLOAK_USER_CONFLICT':
              Notifier.addNotifyError({
                messageId: 'error.emailExisted',
              });
              break;
            case 'INVALID_EMAIL':
              Notifier.addNotifyError({
                messageId: 'error.invalidEmail',
              });
              break;
            default:
              Notifier.addNotifyError({
                messageId: 'error.anErrorOccurred',
              });
              break;
          }
        },
      ),
    );
  };

  return (
    <div className="h-[calc(100vh-109px)] pt-4 relative">
      <div className="flex flex-col min-h-[calc(100%-65px)]">
        <div className="mb-6 flex items-center px-6">
          <div
            className="py-[10px] px-6 text-[#005FC5] leading-7 cursor-pointer bg-white rounded-lg flex items-center mr-6"
            onClick={handleBackToCustomerList}
          >
            <img
              src={backIcon}
              width={16}
              height={16}
              className="mr-2"
              alt=""
            />
            <p className="font-semibold">{t(translations.common.back)}</p>
          </div>
          <PageHeader
            title={t(translations.createCustomer.headerTitle)}
            parentItems={[
              {
                label: t(translations.dataVerification.manageUser),
                link: path.manageUsers,
              },
              {
                label: t(translations.sidebar.customerPipeline),
                link: path.customerAccountList,
              },
            ]}
          />
        </div>
        <div className="flex items-center justify-center h-[107px] bg-white rounded-2xl shadow-[inset_0px_-1px_0px_#E3E8EE] mx-6 px-[55px]">
          <Stepper3 steps={steps} activeStep={activeStep} />
        </div>
        <div className="flex justify-center mx-6">
          <Property
            formMethod={formMethod1}
            show={activeStep === 0}
            setActiveStep={setActiveStep}
            activeStep={activeStep}
          />
          <Credit formMethod={formMethod2} show={activeStep === 1} />
          <Kyc
            formMethod={formMethod3}
            show={activeStep === 2}
            joinIncome={formMethod2.watch('joinIncome')}
          />
        </div>
        <div className="justify-center mx-6">
          <BankPreference formMethod={formMethod2} show={activeStep === 1} />
        </div>
      </div>

      <div className="flex bg-white h-[89px] shadow-[1px_-2px_4px_rgba(0,0,0,0.05)] leading-7 items-center px-[55px] sticky bottom-0 left-0 right-0">
        <div className="mr-8">
          {(housePrice || property || product) && (
            <p className="text-[#4F566B] leading-5 mb-2">
              {(project?.name ?? projectName ?? '-') +
                ' / ' +
                (project?.developerName ?? developer?.label ?? '-')}
            </p>
          )}
          {(housePrice || property || product) && (
            <p className="text-[#3C4257] leading-6 font-semibold">
              Rp {formatCurrency(housePrice || property?.price)}
            </p>
          )}
        </div>
        {(housePrice || property || product) && (
          <div className="mr-8">
            <p className="text-[#4F566B] leading-5 mb-2">
              {t(translations.createCustomer.type)}
            </p>
            <p className="text-[#3C4257] leading-6 font-semibold">
              {projectType?.value || product?.type || '-'}
            </p>
          </div>
        )}
        {(housePrice || property || product) && (
          <div className="mr-8">
            <p className="text-[#4F566B] leading-5 mb-2">
              {t(translations.createCustomer.unit)}
            </p>
            <p className="text-[#3C4257] leading-6 font-semibold">
              {property?.label || product?.unit || '-'}
            </p>
          </div>
        )}
        <Button color="secondary" className="ml-auto" onClick={handleBack}>
          {activeStep === 0
            ? t(translations.common.cancel)
            : t(translations.common.previous)}
        </Button>
        <Button
          color="primary"
          className="ml-6"
          onClick={handleGotoNextStep}
          disabled={getSubmitButtonStatus()}
        >
          {activeStep === 2
            ? t(translations.common.submit)
            : t(translations.common.next)}
        </Button>
      </div>
      <NoticeDialog
        open={openNoticeDialog}
        onClose={() => setOpenNoticeDialog(false)}
        onSubmit={handleCreateCustomer}
      />
    </div>
  );
}
