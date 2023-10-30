import { Box, Grid, Typography } from '@mui/material';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledDatePicker } from 'app/components/DatePicker';
import { ControlledDeveloperSelect } from 'app/components/DeveloperSelect';
import { clear } from 'console';
import { translations } from 'locales/translations';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {}

export const KPRProgramForm = memo((props: Props) => {
  const { t } = useTranslation();
  const { control, setError, clearErrors, setValue } = useFormContext();

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        margin: '0px 24px 24px 24px',
        borderRadius: '12px',
        paddingTop: '2rem',
        paddingLeft: '3rem',
        paddingRight: '4rem',
        minHeight: '650px',
      }}
    >
      <Typography
        sx={{ fontWeight: 'bold', fontSize: '18px', color: '#202A42' }}
      >
        {t(translations.kprProgram.kprProgramInformation)}
      </Typography>
      <Typography sx={{ color: '#9098a7', mt: 1 }}>
        {t(translations.kprProgram.completeKPR)}
      </Typography>
      <Grid container spacing={6} mt={0} sx={{ mt: '-1rem!important' }}>
        <Grid item md={6}>
          <ControlledTextField
            isBg
            className="field"
            label={`${t(translations.kprProgram.programName)}`}
            name="programName"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
          <Grid mt={2}>
            <ControlledTextField
              isBg
              className="field"
              label={`${t(translations.kprProgram.kprMaxAmount)}`}
              name="maxAmount"
              type="currency"
              startAdornment="Rp"
              control={control}
              rules={{
                required: 'Required',
              }}
              required
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6} mt={2}>
              <ControlledTextField
                isBg
                className="field"
                label={`${t(translations.kprProgram.fixedYear)}`}
                type="int"
                name="fixedYear"
                control={control}
                rules={{
                  required: 'Required',
                }}
                required
              />
            </Grid>
            <Grid item md={6} mt={2}>
              <ControlledTextField
                isBg
                className="field"
                label={`${t(translations.kprProgram.fixRate)}`}
                name="fixedRate"
                startAdornment="%"
                type="float"
                control={control}
                rules={{
                  required: 'Required',
                }}
                required
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6} mt={2}>
              <ControlledTextField
                isBg
                className="field"
                label={`${t(translations.kprProgram.tenor)}`}
                type="int"
                name="tenor"
                control={control}
                rules={{
                  required: 'Required',
                }}
                required
              />
            </Grid>
            <Grid item md={6} mt={2}>
              <ControlledTextField
                isBg
                className="field"
                label={`${t(translations.kprProgram.floatRate)}`}
                name="floatRate"
                startAdornment="%"
                type="float"
                control={control}
                rules={{
                  required: 'Required',
                }}
                required
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '18px',
              color: '#202A42',
              mb: 2,
            }}
          >
            {t(translations.kprProgram.kprProgram)}
          </Typography>
          <ControlledDeveloperSelect
            name="developerList"
            label={t(translations.kprProgram.selectDeveloper)}
            placeholder={t(translations.kprProgram.selectDeveloper)}
            className="mt-4"
            control={control}
          />
          <Typography
            sx={{
              fontWeight: '600',
              fontSize: '18px',
              color: '#202A42',
              mt: 4,
              mb: 2,
            }}
          >
            {t(translations.kprProgram.programDuration)}
          </Typography>
          <Grid container spacing={4}>
            <Grid item md={6}>
              <ControlledDatePicker
                control={control}
                name="programDuration.startDate"
                label={`${t(translations.kprProgram.promoStartDate)}`}
                className="field"
                isBg
                rules={{
                  required: 'Required',
                }}
                onChange={e => {
                  if (e && e.toString() === 'Invalid Date') {
                    setError('programDuration.startDate', {
                      message: t(translations.common.invalidDate),
                    });
                  } else if (e == null) {
                    setError('programDuration.startDate', {
                      message: t(
                        translations.createProductError
                          .pleaseEnterRequiredFields,
                      ),
                    });
                  } else {
                    clearErrors('programDuration.startDate');
                  }
                }}
              />
            </Grid>
            <Grid item md={6}>
              <ControlledDatePicker
                control={control}
                name="programDuration.endDate"
                label={`${t(translations.kprProgram.promoEndDate)}`}
                className="field"
                isBg
                rules={{
                  required: 'Required',
                }}
                onChange={e => {
                  if (e && e.toString() === 'Invalid Date') {
                    setError('programDuration.endDate', {
                      message: t(translations.common.invalidDate),
                    });
                  } else if (e == null) {
                    setError('programDuration.endDate', {
                      message: t(
                        translations.createProductError
                          .pleaseEnterRequiredFields,
                      ),
                    });
                  } else {
                    setValue('programDuration.endDate', e, {
                      shouldValidate: true,
                    });
                  }
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
});
