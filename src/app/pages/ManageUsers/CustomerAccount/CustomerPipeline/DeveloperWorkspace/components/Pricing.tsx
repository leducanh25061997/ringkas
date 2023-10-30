import { Box, Divider, Grid, styled, TextField } from '@mui/material';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { INT_NUMBER } from 'utils/helpers/regex';
import editIcon from 'assets/icons/edit.svg';
import { selectManageCustomer } from '../../../slice/selectors';
import EditableValue from './EditableValue';
import EditableValueByPercent from './EditableValueByPercent';
import { useFormContext } from 'react-hook-form';

const Title = styled('div')({
  color: '#6B7A99',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '30px',
  '&.active': {
    fontWeight: '700!important',
  },
});

const Value = styled('div')({
  fontSize: '16px',
  color: '#202A42',
  lineHeight: '30px',
  fontWeight: 500,
  '&.active': {
    fontWeight: '700!important',
  },
});

const Error = styled('p')({
  fontSize: '14px',
  lineHeight: '20px',
  marginTop: '8px',
  color: '#ff0000',
  marginLeft: '1.2rem',
});

const formatCurrency = (n: string) => {
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return n.replace(thousands, ',');
};
interface IsEdit {
  label: string;
  isEdit: boolean;
}

interface Props {
  isError: boolean;
}
export const Pricing = memo((props: Props) => {
  const { isError } = props;
  const { t } = useTranslation();
  const { control, setValue } = useFormContext();
  const { propertyDetail, bankPreference } = useSelector(selectManageCustomer);
  const [discount, setDiscount] = useState<string>(
    `${propertyDetail?.discount || ''}%`,
  );
  const [housePrice, setHousePrice] = useState<number>();
  const [bookingFee, setBookingFee] = useState<string>('');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('%');
  const [isEdit, setIsEdit] = useState<IsEdit>();
  const [error, setError] = useState<boolean>(true);
  const finalPrice =
    housePrice && discount.split('%').length > 1
      ? formatCurrency(
          (
            (housePrice * (100 - Number(discount.split('%')[0]))) /
            100
          ).toString(),
        )
      : 0;
  const downPaymentRp =
    downPaymentPercent.split('%').length > 1
      ? formatCurrency(
          (
            (parseFloat(finalPrice.toString().replaceAll(',', '')) *
              Number(downPaymentPercent.split('%')[0])) /
            100
          ).toString(),
        )
      : 0;

  useEffect(() => {
    if (propertyDetail) {
      setValue('housePrice', propertyDetail?.housePrice);
      setValue('discount', propertyDetail?.discount);
      setValue('bookingFee', propertyDetail?.bookingFee);
      setValue('downPayment', propertyDetail?.downPayment);
      setHousePrice(propertyDetail?.housePrice);
      setDiscount(`${propertyDetail?.discount || 0}%`);
      setBookingFee(`${propertyDetail?.bookingFee}`);
      setDownPaymentPercent(`${propertyDetail?.downPayment || 0}%`);
    }
  }, [propertyDetail]);

  return (
    <Box
      sx={{
        py: 2,
        px: 2,
        mb: 2,
        border: '1px solid #D7E2EE',
        borderRadius: '8px',
      }}
    >
      <Box sx={{ px: 2, pb: 2 }}>
        <Grid container spacing={2}>
          <Grid item md={4}>
            <Title>{t(translations.developerWorkspace.housePrice)}</Title>
          </Grid>
          <Grid item md={3}></Grid>
          <Grid item md={5}>
            <div className="flex">
              <Value className="mr-6">Rp</Value>
              <EditableValue
                control={control}
                name={'housePrice'}
                value={housePrice && formatCurrency(housePrice.toString())}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                disabled={
                  bankPreference?.banks && bankPreference?.banks.length >= 5
                }
                onChange={e => {
                  const currentValue = e.target.value;
                  const _newValue = currentValue.split(',').join('');
                  setHousePrice(_newValue ? parseInt(_newValue) : 0);
                  setValue('housePrice', _newValue ? parseInt(_newValue) : 0);
                  if (currentValue) {
                    setError(false);
                  } else {
                    setError(true);
                  }
                }}
              />
            </div>
          </Grid>
          {isError && error && (
            <Error>
              {t(translations.createProductError.pleaseEnterRequiredFields)}
            </Error>
          )}
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item md={4}>
            <Title>{`${t(
              translations.developerWorkspace.discount,
            )} (%)`}</Title>
          </Grid>
          <Grid item md={3}>
            <EditableValueByPercent
              name={'discount'}
              value={discount}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
              onChange={e => {
                const currentValue = e.target.value;
                setDiscount(`${currentValue}`);
                currentValue &&
                  setValue(
                    'discount',
                    parseInt(currentValue.replaceAll('%', '')),
                  );
              }}
              disabled={
                bankPreference?.banks && bankPreference?.banks.length >= 5
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item md={4}>
            <Title>{t(translations.developerWorkspace.finalPrice)}</Title>
          </Grid>
          <Grid item md={3}></Grid>
          <Grid item md={5}>
            <div className="flex">
              <Value>Rp</Value>
              <Value className="ml-6">{finalPrice}</Value>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item md={4}>
            <Title>{`${t(
              translations.developerWorkspace.bookingFee,
            )} (Rp)`}</Title>
          </Grid>
          <Grid item md={3}></Grid>
          <Grid item md={5}>
            <div className="flex">
              <Value className="mr-6">Rp</Value>
              <EditableValue
                control={control}
                name={'bookingFee'}
                value={formatCurrency(bookingFee)}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
                onChange={e => {
                  const currentValue = e.target.value;
                  const _newValue = currentValue.split(',').join('');
                  if (INT_NUMBER.test(_newValue)) {
                    setBookingFee(formatCurrency(_newValue));
                    setValue('bookingFee', _newValue);
                  }
                }}
                disabled={
                  bankPreference?.banks && bankPreference?.banks.length >= 5
                }
              />
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item md={4}>
            <Title>{`${t(
              translations.developerWorkspace.downPayment,
            )} (%)`}</Title>
          </Grid>
          <Grid item md={3}>
            <EditableValueByPercent
              name={'downPaymentPercent'}
              value={downPaymentPercent}
              setIsEdit={setIsEdit}
              isEdit={isEdit}
              onChange={e => {
                const currentValue = e.target.value;
                setDownPaymentPercent(currentValue);
                currentValue &&
                  setValue(
                    'downPayment',
                    parseInt(currentValue.replaceAll('%', '')),
                  );
              }}
              disabled={
                bankPreference?.banks && bankPreference?.banks.length >= 5
              }
            />
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item md={4}>
            <Title>{`${t(
              translations.developerWorkspace.downPayment,
            )} (Rp)`}</Title>
          </Grid>
          <Grid item md={3}></Grid>
          <Grid item md={5}>
            <div className="flex">
              <Value className="mr-6">Rp</Value>
              <Value>{downPaymentRp.toString()}</Value>
              {/* <EditableValue
                name={'downPaymentRp'}
                value={downPaymentRp.toString()}
                setIsEdit={setIsEdit}
                isEdit={isEdit}
              /> */}
            </div>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Grid container spacing={2} mt={1} sx={{ px: 2 }}>
        <Grid item md={4}>
          <Title className="active">{`${t(
            translations.developerWorkspace.kprAmount,
          )}`}</Title>
        </Grid>
        <Grid item md={3}></Grid>
        <Grid item md={5}>
          <div className="flex">
            <Value className="active">Rp</Value>
            <Value className="ml-6 active">
              {finalPrice
                ? formatCurrency(
                    (
                      parseFloat(finalPrice.toString().replaceAll(',', '')) -
                      parseFloat(downPaymentRp.toString().replaceAll(',', '')) -
                      parseFloat(bookingFee.toString().replaceAll(',', ''))
                    ).toString(),
                  )
                : '-'}
            </Value>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
});
