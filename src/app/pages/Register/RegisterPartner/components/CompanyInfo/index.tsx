/**
 *
 * CompanyInfo
 *
 */
import { FormControl, Grid } from '@mui/material';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import { ControlledTextarea } from 'app/components/TextArea';
import classNames from 'classnames';
import { translations } from 'locales/translations';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { EMAIL_REGEX } from 'utils/helpers/regex';

interface Props {
  form: any;
  show?: boolean;
}

export const CompanyInfo = memo(({ show = false, form }: Props) => {
  const { t } = useTranslation();
  const { control } = form;

  return (
    <form
      className={classNames('w-full', {
        hidden: !show,
      })}
    >
      <Grid
        sx={{
          background: '#FFFFFF',
          borderRadius: 2,
        }}
      >
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledTextField
            className="field"
            label={t(translations.registerNewClient.companyName)}
            name="company.name"
            required
            control={control}
            rules={{
              required: t(
                translations.required.companyNameIsRequired,
              ) as string,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledTextField
            className="field"
            label={t(translations.registerNewClient.companyEmail)}
            name="company.email"
            required
            control={control}
            rules={{
              required: t(
                translations.required.companyEmailIsRequired,
              ) as string,
              pattern: {
                value: EMAIL_REGEX,
                message: t(translations.required.invalidEmail),
              },
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledTextarea
            name="company.address"
            control={control}
            required
            rules={{
              required: t(
                translations.required.companyAddressIsRequired,
              ) as string,
            }}
            label={t(translations.developerInformation.companyAddress)}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledTextField
            className="field"
            label={t(translations.registerNewClient.companyPhoneNumber)}
            name="company.phone"
            type="tel"
            required
            control={control}
            rules={{
              required: t(
                translations.required.companyPhoneNumberIsRequired,
              ) as string,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledTextField
            className="field"
            label={t(translations.registerNewClient.companySppkpNumber)}
            name="company.sppkpNumber"
            required
            control={control}
            rules={{
              required: t(
                translations.required.companySppkpNumberIsRequired,
              ) as string,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledTextField
            className="field"
            label={t(translations.registerNewClient.companyNpwpNumber)}
            name="company.npwpNumber"
            type="tel"
            required
            control={control}
            rules={{
              required: t(
                translations.required.companyNpwpNumberIsRequired,
              ) as string,
            }}
          />
        </FormControl>
        <FormControl fullWidth sx={{ mt: 2 }}>
          <ControlledImageUpload
            label={t(translations.registerNewClient.companyLogo)}
            control={control}
            validationMessage={t(
              translations.imageUploadComponent.maxFileSizeAndRadio11,
            )}
            rules={{
              required: t(
                translations.required.companyLogoIsRequired,
              ) as string,
            }}
            name="company.fileLogo"
          />
        </FormControl>
      </Grid>
    </form>
  );
});
