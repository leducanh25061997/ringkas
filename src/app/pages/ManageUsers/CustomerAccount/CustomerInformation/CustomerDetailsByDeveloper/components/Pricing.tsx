import { Box, Divider, Grid, styled, TextField } from '@mui/material';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { INT_NUMBER } from 'utils/helpers/regex';
import { selectManageCustomer } from '../../../slice/selectors';

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

const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: 'white!important',
    height: '35px',
    width: 'max-content',
  },
  '& .MuiInputBase-root': {
    borderBottomColor: 'unset',
    borderRadius: '8px',
    border: '1px solid #C3CAD9',
    padding: '0 1rem',
  },
  '& .MuiInputBase-root:before': {
    right: 'unset',
    content: '""',
    border: 'unset',
    '&.focus': {
      border: 'unset',
    },
  },
  '& .MuiInput-root:after': {
    border: 'unset!important',
  },
  '& .MuiInput-root:before': {
    border: 'unset!important',
  },
});

const formatCurrency = (n: string) => {
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return n.replace(thousands, ',');
};

interface Props {}
export const Pricing = memo((props: Props) => {
  const { t } = useTranslation();
  const { housePriceData } = useSelector(selectManageCustomer);
  const housePrice = housePriceData?.housePrice || 0;
  const [discount, setDiscount] = useState<string>(
    `${housePriceData?.discount || 0}%`,
  );
  const [bookingFee, setBookingFee] = useState<string>('0');
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>('0%');
  const finalPrice =
    discount.split('%').length > 1
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
    if (housePriceData) {
      setDiscount(`${housePriceData?.discount || 0}%`);
      setBookingFee(`${housePriceData?.bookingFee || 0}`);
      setDownPaymentPercent(`${housePriceData?.downPayment || 0}%`);
    }
  }, [housePriceData]);

  return (
    <Box>
      <Box sx={{ py: 4, px: 6 }}>
        <Grid container spacing={2}>
          <Grid item md={2}>
            <Title>{t(translations.developerWorkspace.housePrice)}</Title>
          </Grid>
          <Grid item md={2.5}></Grid>
          <Grid item md={7}>
            <div className="flex">
              <Value>Rp</Value>
              <Value className="ml-6">
                {formatCurrency(housePrice.toString())}
              </Value>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item md={2}>
            <Title>{`${t(
              translations.developerWorkspace.discount,
            )} (%)`}</Title>
          </Grid>
          <Grid item md={2}>
            <RootStyle>
              <TextField
                aria-describedby="my-helper-text"
                fullWidth
                name={`discount`}
                value={discount}
                onChange={e => {
                  setDiscount(`${e.target.value}`);
                }}
                disabled
              />
            </RootStyle>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item md={2}>
            <Title>{t(translations.developerWorkspace.finalPrice)}</Title>
          </Grid>
          <Grid item md={2.5}></Grid>
          <Grid item md={7}>
            <div className="flex">
              <Value>Rp</Value>
              <Value className="ml-6">{finalPrice}</Value>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item md={2}>
            <Title>{`${t(
              translations.developerWorkspace.bookingFee,
            )} (Rp)`}</Title>
          </Grid>
          <Grid item md={2.5}></Grid>
          <Grid item md={2}>
            <div className="flex">
              <Value className="mr-6">Rp</Value>
              <RootStyle>
                <TextField
                  aria-describedby="my-helper-text"
                  fullWidth
                  className="ml-6"
                  name={`bookingFee`}
                  value={formatCurrency(bookingFee)}
                  onChange={e => {
                    const currentValue = e.target.value;
                    const _newValue = currentValue.split('.').join('');
                    if (INT_NUMBER.test(_newValue))
                      setBookingFee(formatCurrency(_newValue));
                  }}
                  disabled
                  // error={!!errors?.defaultCategory}
                  // helperText={errors?.defaultCategory?.message}
                />
              </RootStyle>
            </div>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item md={2}>
            <Title>{`${t(
              translations.developerWorkspace.downPayment,
            )} (%)`}</Title>
          </Grid>
          <Grid item md={2}>
            <RootStyle>
              <TextField
                aria-describedby="my-helper-text"
                fullWidth
                name={`downPaymentPercent`}
                value={downPaymentPercent}
                onChange={e => {
                  setDownPaymentPercent(e.target.value);
                }}
                disabled
                // error={!!errors?.defaultCategory}
                // helperText={errors?.defaultCategory?.message}
              />
            </RootStyle>
          </Grid>
        </Grid>
        <Grid container spacing={2} mt={1}>
          <Grid item md={2}>
            <Title>{`${t(
              translations.developerWorkspace.downPayment,
            )} (Rp)`}</Title>
          </Grid>
          <Grid item md={2.5}></Grid>
          <Grid item md={7}>
            <div className="flex">
              <Value>Rp</Value>
              <Value className="ml-6">{downPaymentRp}</Value>
            </div>
          </Grid>
        </Grid>
      </Box>
      <Divider />
      <Grid container spacing={2} mt={1} sx={{ mb: 2, px: 6 }}>
        <Grid item md={2}>
          <Title className="active">{`${t(
            translations.developerWorkspace.kprAmount,
          )}`}</Title>
        </Grid>
        <Grid item md={2.5}></Grid>
        <Grid item md={7}>
          <div className="flex">
            <Value className="active">Rp</Value>
            <Value className="ml-6 active">
              {formatCurrency(
                (
                  parseFloat(finalPrice.toString().replaceAll(',', '')) -
                  parseFloat(downPaymentRp.toString().replaceAll(',', '')) -
                  parseFloat(bookingFee.toString().replaceAll(',', ''))
                ).toString(),
              )}
            </Value>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
});
