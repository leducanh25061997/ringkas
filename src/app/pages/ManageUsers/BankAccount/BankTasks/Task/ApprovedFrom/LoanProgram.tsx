import Grid from '@mui/material/Grid';
import { Controller, useFormContext } from 'react-hook-form';
import * as React from 'react';
import classNames from 'classnames';
import DropDownInput from 'app/components/DropdownInput';
import { BankLoanForm } from 'types/BankLoanManagement';
import EditableValue from 'app/components/AssessmentDetails/components/EditableValue';

interface RowProps {
  title: string;
  description: any;
  className?: string;
}

const Row = ({ title, description, className }: RowProps) => {
  return (
    <div className={classNames('flex items-center', className)}>
      <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium flex-1">
        {title}
      </p>
      <p className="text-[#223250] text-[16px] leading-[20px] font-medium flex-1">
        {description}
      </p>
    </div>
  );
};

interface Props {
  listBankLoan: any;
}

const LoanProgram = ({ listBankLoan }: Props) => {
  const { control, watch, setValue } = useFormContext();
  const [selectBankLoan, setSelectBankLoan] = React.useState<BankLoanForm>();

  React.useEffect(() => {
    const subscription = watch(value => {
      if (!value.loanProgram) return;
      const item = listBankLoan.filter(
        (item: any) => item.id === value.loanProgram.value,
      );
      setSelectBankLoan(item[0]);
    });
    return () => subscription.unsubscribe();
  }, [watch, listBankLoan]);

  React.useEffect(() => {
    setValue('loanProgram.adminFee', 2.0);
    setValue('loanProgram.provisionFee', 2.8);
    setValue('loanProgram.fixedYear', selectBankLoan?.fixedYear);
    setValue('loanProgram.fixedRate', selectBankLoan?.fixedRate);
    setValue('loanProgram.floatRate', selectBankLoan?.floatRate);
  }, [selectBankLoan, setValue]);

  return (
    <Grid
      sx={{ px: 4, py: 2, margin: '0', width: '100%' }}
      container
      spacing={2}
    >
      <Grid xs={5} md={3}>
        <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mt-[10px]">
          Loan Program Name *
        </p>
      </Grid>
      <Grid xs={7} md={9}>
        <Controller
          name="loanProgram"
          rules={{
            required: 'Please fill this field',
          }}
          control={control}
          render={({ field, fieldState }) => {
            return (
              <>
                <DropDownInput
                  value={field.value}
                  options={listBankLoan.map((item: any) => ({
                    label: item.programName,
                    value: item.id,
                  }))}
                  onChange={field.onChange}
                  label="Select options"
                  className="bg-[#fff]"
                />
                {fieldState.error && (
                  <p className="mt-2 text-[#FF0000]">
                    {fieldState.error.message}
                  </p>
                )}
              </>
            );
          }}
        />
        <div className="flex">
          <div className="w-2/5 mr-4 min-h-[324px] border border-[#D7E2EE] rounded-lg  mt-4 divide-y">
            <div className="p-4 rounded-bl-none rounded-br-none border-b-[#D7E2EE]">
              <p className="mb-4 text-[#6B7A99] text-[16px] leading-[20px] font-medium">
                Interest Rate Requested
              </p>
              <Row
                title="Fixed"
                description={
                  selectBankLoan?.fixedYear
                    ? `${selectBankLoan?.fixedYear} years`
                    : '-'
                }
                className="mb-4"
              />
              <Row
                title=""
                description={
                  selectBankLoan?.fixedRate
                    ? `${selectBankLoan?.fixedRate}%`
                    : '-'
                }
                className="mb-4"
              />
              <Row
                title="Float"
                description={
                  selectBankLoan?.floatRate
                    ? `${selectBankLoan?.floatRate}%`
                    : '-'
                }
                className=""
              />
            </div>
            <div className="p-4 rounded-tl-none rounded-tr-none border-t-0">
              <Row title="Admin Fee" description="2.0%" className="my-4" />
              <Row title="Provision Fee" description="2.8%" className="my-4" />
            </div>
          </div>
          <div className="w-3/5 min-h-[324px] border border-[#D7E2EE] rounded-lg mt-4 divide-y">
            <div className="p-4">
              <p className="mb-4 text-[#6B7A99] text-[16px] leading-[20px] font-medium">
                Approved Interest Rate
              </p>

              <Row
                title="Fixed"
                description={
                  <EditableValue
                    value={selectBankLoan?.fixedYear}
                    parameter={'loanProgram.fixedYear'}
                    className="justify-between"
                  />
                }
                className="mb-4"
              />
              <Row
                title=""
                description={
                  <EditableValue
                    value={selectBankLoan?.fixedRate}
                    parameter={'loanProgram.fixedRate'}
                    className="justify-between"
                  />
                }
                className="mb-4"
              />
              <Row
                title="Float"
                description={
                  <EditableValue
                    value={selectBankLoan?.floatRate}
                    parameter={'loanProgram.floatRate'}
                    className="justify-between"
                  />
                }
                className=""
              />
            </div>
            <div className="p-4 rounded-tl-none rounded-tr-none border-t-0">
              <Row
                title="Admin Fee"
                description={
                  <EditableValue
                    value={selectBankLoan?.adminFee}
                    parameter={'loanProgram.adminFee'}
                    className="justify-between"
                  />
                }
                className="my-4"
              />
              <Row
                title="Provision Fee"
                description={
                  <EditableValue
                    value={selectBankLoan?.provisionFee}
                    parameter={'loanProgram.provisionFee'}
                    className="justify-between"
                  />
                }
                className="my-4"
              />
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default LoanProgram;
