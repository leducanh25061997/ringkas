import Grid from '@mui/material/Grid';
import EditableValue from 'app/components/AssessmentDetails/components/EditableValue';
import { formatCurrency } from 'app/components/CustomTextField';
import { ControlledDropdownInput } from 'app/components/DropdownInput';
import { translations } from 'locales/translations';
import * as React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface RowProps {
  requestedPlafondDefault: number;
}

const KprAmount = ({ requestedPlafondDefault }: RowProps) => {
  const { control, setValue } = useFormContext();
  const { t } = useTranslation();

  React.useEffect(() => {
    setValue('kprAmount.approvedPlafond', requestedPlafondDefault);
  }, [setValue]);

  return (
    <Grid
      sx={{ px: 4, py: 2, margin: '0', width: '100%' }}
      container
      spacing={2}
    >
      <Grid xs={5} md={3}>
        <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mt-[10px]">
          KPR Amount *
        </p>
      </Grid>
      <Grid xs={7} md={9} className="flex w-full">
        <div className="flex-col border border-[#D7E2EE] rounded-lg w-2/5 mr-4">
          <div className="p-4">
            <p className="mb-4 text-[#6B7A99] text-[16px] leading-[20px] font-medium">
              Requested Plafond
            </p>
            <p className="text-[#223250] text-[16px] leading-[20px] font-medium">
              Rp {formatCurrency(requestedPlafondDefault)}
            </p>
          </div>
          <div className="p-4 ">
            <p className="mb-4 text-[#6B7A99] text-[16px] leading-[20px] font-medium">
              Tenor
            </p>
            <p>15 years</p>
          </div>
        </div>
        <div className="flex-col border border-[#D7E2EE] rounded-lg w-3/5">
          <div className="p-4 ">
            <p className="text-[#6B7A99] text-[16px] leading-[20px] font-medium mb-4">
              Approved Plafond
            </p>
            <EditableValue
              parameter="kprAmount.approvedPlafond"
              value={requestedPlafondDefault}
              className="justify-between"
            />
          </div>
          <div className="p-4">
            <p className="mb-4 text-[#6B7A99] text-[16px] leading-[20px] font-medium">
              Tenor
            </p>
            <ControlledDropdownInput
              control={control}
              name="loanProgram.tenor"
              rules={{
                required: t(translations.formValidate.required) as string,
              }}
              label={t(translations.createCustomer.tenorLabel)}
              placeholder={t(translations.createCustomer.tenorLabel)}
              options={[
                {
                  label: `1 ${t(translations.createCustomer.year)}`,
                  value: '1',
                },
                {
                  label: `5 ${t(translations.createCustomer.years)}`,
                  value: '5',
                },
                {
                  label: `10 ${t(translations.createCustomer.years)}`,
                  value: '10',
                },
                {
                  label: `15 ${t(translations.createCustomer.years)}`,
                  value: '15',
                },
                {
                  label: `20 ${t(translations.createCustomer.years)}`,
                  value: '20',
                },
                {
                  label: `25 ${t(translations.createCustomer.years)}`,
                  value: '25',
                },
                {
                  label: `30 ${t(translations.createCustomer.years)}`,
                  value: '30',
                },
              ]}
              className="mt-6"
            />
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default KprAmount;
