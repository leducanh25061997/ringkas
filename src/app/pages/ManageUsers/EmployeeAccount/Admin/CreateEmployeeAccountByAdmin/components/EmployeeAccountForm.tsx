import { Box, Stack, Typography } from '@mui/material';
import { ControlledTextField } from 'app/components/CustomTextField';
import { translations } from 'locales/translations';
import { memo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledDropdownInput } from 'app/components/DropdownInput';
import { EMAIL_REGEX } from 'utils/helpers/regex';
import { RoleName } from 'types/EmployeeAccountManagement';

interface Props {}

export const EmployeeAccountForm = memo((props: Props) => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext();

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: 'background.paper',
        margin: '0px 24px 24px 24px',
        borderRadius: '12px',
        paddingTop: '1rem',
        paddingLeft: '3rem',
        paddingRight: '4rem',
        minHeight: '650px',
      }}
    >
      <div className="w-[582px] ml-4 py-6">
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '18px', color: '#202A42' }}
        >
          {t(translations.employManagement.employeeInfo)}
        </Typography>
        <Typography sx={{ color: '#9098a7', mt: 2 }}>
          {t(translations.employManagement.completeEmployeeInfo)}
        </Typography>
        <Stack mt={4}>
          <ControlledTextField
            isBg
            className="field"
            label={`${t(translations.common.email)}`}
            name="email"
            control={control}
            rules={{
              required: t(translations.formValidate.required) as string,
              pattern: {
                value: EMAIL_REGEX,
                message: t(translations.formValidate.incorrectEmailFormat),
              },
            }}
            required
          />
        </Stack>
        <Stack mt={2}>
          <ControlledTextField
            isBg
            className="field"
            label={`${t(translations.common.fullName)}`}
            name="fullName"
            control={control}
            rules={{
              required: t(translations.formValidate.required) as string,
            }}
            required
          />
        </Stack>
        <Stack mt={2}>
          <ControlledTextField
            isBg
            className="field"
            label={`${t(translations.developerInformation.phoneNumber)}`}
            name="phone"
            type="tel"
            control={control}
            rules={{
              required: t(translations.formValidate.required) as string,
            }}
            required
          />
        </Stack>
        <Stack mt={2}>
          <ControlledDropdownInput
            control={control}
            name="roleNameData"
            label={t(translations.employManagement.roleName)}
            placeholder={t(translations.employManagement.roleName)}
            options={[
              {
                label: t(translations.roles.creditOfficer),
                value: RoleName.CREDIT_OFFICER_RINGKAS,
              },
              {
                label: t(translations.roles.adminRingkas),
                value: RoleName.ADMIN_RINGKAS,
              },
            ]}
          />
        </Stack>
      </div>
    </Box>
  );
});
