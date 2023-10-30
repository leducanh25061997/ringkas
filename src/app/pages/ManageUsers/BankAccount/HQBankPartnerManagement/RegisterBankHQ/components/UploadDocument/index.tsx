/**
 *
 * UploadDocument
 *
 */
import { Box, FormControl, Typography } from '@mui/material';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import classNames from 'classnames';
import { translations } from 'locales/translations';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

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
          paddingY: 4,
          paddingX: '27%',
          background: '#FFFFFF',
          borderRadius: 2,
          marginY: 3,
        }}
      >
        <Typography sx={{ fontWeight: 600 }}>
          {t(translations.registerNewClient.uploadDocument)}
        </Typography>
        <Typography sx={{ color: '#9098a7' }}>
          {t(translations.registerNewClient.completeDocumentInformation)}
        </Typography>
        <FormControl fullWidth sx={{ mt: 3 }}>
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
            rules={{
              required: t(
                translations.required.supportingDocumentRequired,
              ) as string,
            }}
          />
        </FormControl>
      </Box>
    </form>
  );
});
