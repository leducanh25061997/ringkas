import { ControlledBankPreferencesDropdown } from 'app/components/DropdownInput/BankPreference';
import { ControlledLoanProgramDropdown } from 'app/components/DropdownInput/LoanProgram';
import { WorkflowTable } from 'app/components/WorkflowTable';
import trashIcon from 'assets/icons/trash-blue.svg';
import classNames from 'classnames';
import { translations } from 'locales/translations';
import { FieldValues, useFieldArray, UseFormReturn } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  formMethod: UseFormReturn<FieldValues, any>;
  show: boolean;
}

interface HeaderType {
  title: string;
  width: string;
}

interface BankDataType {
  label?: string;
  value?: string;
}

const bankPreferencesKey = 'bankPreferences';

function BankPreference({ formMethod, show }: Props) {
  const { control, watch } = formMethod;

  const { fields, append, remove } = useFieldArray({
    control,
    name: bankPreferencesKey,
  });

  const { t } = useTranslation();

  const header: HeaderType[] = [
    {
      title: t(translations.kprProgram.priority),
      width: '10%',
    },
    {
      title: t(translations.customerAccountManagement.bankName),
      width: '40%',
    },
    {
      title: t(translations.customerAccountManagement.loanProgram),
      width: '40%',
    },
  ];

  const renderItem = (item: any, index?: number) => {
    const currentBank = watch(`${bankPreferencesKey}.${index}.bank`);
    return [
      <div className="ml-6 w-[10%] text-[#6B7A99] text-[14px]" key={index}>
        {`${(index || 0) + 1}`}
      </div>,
      <ControlledBankPreferencesDropdown
        key={index}
        className="mr-4 w-[40%]"
        label={`${t(translations.common.chooseBankPreference)}`}
        name={`${bankPreferencesKey}.${index}.bank`}
        control={control}
      />,
      <ControlledLoanProgramDropdown
        key={index}
        className="mb-4 mr-4 w-[40%]"
        bankUuid={currentBank?.value}
        label={`${t(translations.common.chooseLoanProgram)}`}
        name={`${bankPreferencesKey}.${index}.loan`}
        control={control}
      />,
      <div
        className="flex justify-end cursor-pointer"
        onClick={() => remove(index)}
      >
        {index && index > 0 ? (
          <img key={index} src={trashIcon} width={24} height={24} alt="" />
        ) : null}
      </div>,
    ];
  };

  const handleAddMore = () => {
    append({ bank: undefined, loan: undefined });
  };

  return (
    <form
      className={classNames(
        'flex w-full flex-col py-6 bg-white rounded-2xl mt-2 mb-10 text-[#202A42]',
        {
          hidden: !show,
        },
      )}
    >
      <p className="font-bold text-[18px] leading-6 mb-[2px] px-8">
        {t(translations.developerWorkspace.bankPreference)}
      </p>
      <WorkflowTable
        header={header}
        items={fields}
        renderItem={renderItem}
        isAdded={fields.length < 3}
        onclick={handleAddMore}
      />
    </form>
  );
}

export default BankPreference;
