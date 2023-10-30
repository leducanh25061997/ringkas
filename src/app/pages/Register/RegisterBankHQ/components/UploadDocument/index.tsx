/**
 *
 * UploadDocument
 *
 */
import { Box, Checkbox, FormControl, Grid, Stack } from '@mui/material';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import classNames from 'classnames';
import { translations } from 'locales/translations';
import { memo } from 'react';
import { Controller } from 'react-hook-form';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  form: any;
  show?: boolean;
}

export const UploadDocument = memo(({ show = false, form }: Props) => {
  const { t } = useTranslation();
  const { control } = form;
  return (
    <form
      className={classNames('w-full', {
        hidden: !show,
      })}
    >
      <Box
        sx={{
          background: '#FFFFFF',
          borderRadius: 2,
        }}
      >
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledImageUpload
            label={t(translations.registerNewClient.kptDirector)}
            control={control}
            name="document.kptDirector"
            rules={{
              required: t(
                translations.required.kptDirectorIsRequired,
              ) as string,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledImageUpload
            label={t(translations.registerNewClient.deedOfCompany)}
            control={control}
            name="document.deedOfCompany"
            rules={{
              required: t(
                translations.required.deedOfCompanyIsRequired,
              ) as string,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledImageUpload
            label={t(translations.registerNewClient.companyNPWP)}
            control={control}
            name="document.companyNPWP"
            rules={{
              required: t(
                translations.required.companyNPWPIsRequired,
              ) as string,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledImageUpload
            label={t(translations.registerNewClient.nib)}
            control={control}
            name="document.nib"
            rules={{
              required: t(translations.required.nibIsRequired) as string,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledImageUpload
            label={t(translations.registerNewClient.companyDecree)}
            control={control}
            name="document.companyDecree"
            rules={{
              required: t(
                translations.required.companyDecreeRequired,
              ) as string,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledImageUpload
            multiple
            label={t(translations.registerNewClient.supportingDocument)}
            control={control}
            name="document.supportingDocument"
          />
        </FormControl>
        <Grid item xs={12} md={12} mt={2}>
          <Stack sx={{ width: '600px' }}>
            <Controller
              control={control}
              name="checkbox"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <div className="flex w-full field items-center">
                  <Checkbox
                    onChange={e => {
                      onChange(e.target.checked);
                    }}
                    checked={value || false}
                    sx={{ padding: '3px' }}
                  />
                  <p className="text-[#223250] text-[14px] leading-[21px] ml-[19px] font-semibold">
                    <Trans
                      i18nKey="registerNewClient.agreeToRingkasTnc" // optional -> fallbacks to defaults if not provided
                      components={{
                        tnc: (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://ringkas.co.id/terms"
                            style={{
                              color: '#005FC5',
                              textDecoration: 'underline',
                            }}
                          >
                            {' '}
                          </a>
                        ),
                        pp: (
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://ringkas.co.id/privacy"
                            style={{
                              color: '#005FC5',
                              textDecoration: 'underline',
                            }}
                          >
                            {' '}
                          </a>
                        ),
                      }}
                    />
                  </p>
                </div>
              )}
            />
          </Stack>
        </Grid>
      </Box>
    </form>
  );
});
