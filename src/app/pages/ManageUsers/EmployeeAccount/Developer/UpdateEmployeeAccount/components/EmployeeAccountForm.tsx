import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { ControlledTextField } from 'app/components/CustomTextField';
import { translations } from 'locales/translations';
import { memo, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { ControlledProjectsDropdown } from 'app/components/DropdownInput/Projects';
import { ControlledDropdownInput } from 'app/components/DropdownInput';
import { EMAIL_REGEX } from 'utils/helpers/regex';
import { useSafeState } from 'app/hooks/useSafeState';
import { useSelector, shallowEqual } from 'react-redux';
import { selectEmployeeAccountList } from '../../slice/selectors';
import { EmployeeType, RoleName } from 'types/EmployeeAccountManagement';

interface Props {}

export const EmployeeAccountForm = memo((props: Props) => {
  const { t } = useTranslation();
  const { control, setValue } = useFormContext();
  const [employeeType, setEmployeeType] = useSafeState<string>('PROJECT_LEVEL');
  const { employeeAccountInfo } = useSelector(
    selectEmployeeAccountList,
    shallowEqual,
  );

  useEffect(() => {
    if (employeeAccountInfo?.type === EmployeeType.PROJECT_LEVEL) {
      setEmployeeType('PROJECT_LEVEL');
    } else {
      setEmployeeType('HEAD_QUARTER_LEVEL');
    }
  }, [employeeAccountInfo]);

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
      <div className="w-[582px] mx-auto py-6">
        <Typography
          sx={{ fontWeight: 'bold', fontSize: '18px', color: '#202A42' }}
        >
          {t(translations.employManagement.employeeInfo)}
        </Typography>
        <Typography sx={{ color: '#9098a7', mt: 1 }}>
          {t(translations.employManagement.completeEmployeeInfo)}
        </Typography>
        <Stack mt={4}>
          <ControlledTextField
            isBg
            className="field"
            label={`${t(translations.common.email)}`}
            name="email"
            disabled
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
        <Controller
          control={control}
          name="type"
          defaultValue={employeeType}
          render={({ field, fieldState }) => {
            return (
              <FormControl
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '24px',
                }}
              >
                <FormLabel
                  id="demo-controlled-radio-buttons-group"
                  sx={{ color: '#000000', fontSize: '16px', fontWeight: '500' }}
                >
                  {t(translations.employManagement.selectEmployeeType)}
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={field.value}
                  onChange={e => {
                    setEmployeeType(e.target.value);
                    field.onChange(e);
                    if (e.target.value === 'HEAD_QUARTER_LEVEL') {
                      setValue('roleNameData', {
                        label: t(translations.roles.admin),
                        value: RoleName.ADMIN,
                      });
                    } else {
                      setValue('roleNameData', undefined);
                      setValue('projectName', undefined);
                    }
                  }}
                  row
                >
                  <FormControlLabel
                    value="HEAD_QUARTER_LEVEL"
                    control={<Radio />}
                    sx={{
                      '.MuiFormControlLabel-label': {
                        color: '#6B7A99',
                        fontSize: '16px',
                        fontWeight: '500',
                      },
                    }}
                    label={t(translations.employManagement.headQuarterLevel)}
                  />
                  <FormControlLabel
                    value="PROJECT_LEVEL"
                    control={<Radio />}
                    sx={{
                      '.MuiFormControlLabel-label': {
                        color: '#6B7A99',
                        fontSize: '16px',
                        fontWeight: '500',
                      },
                    }}
                    label={t(translations.employManagement.projectLevel)}
                  />
                </RadioGroup>
              </FormControl>
            );
          }}
        />
        {employeeType === 'PROJECT_LEVEL' && (
          <Stack mt={2}>
            <ControlledProjectsDropdown
              className="mb-4"
              label="Project Name"
              name="projectName"
              control={control}
            />
          </Stack>
        )}
        <Stack mt={employeeType === 'HEAD_QUARTER_LEVEL' ? 2 : 0}>
          <ControlledDropdownInput
            control={control}
            name="roleNameData"
            label={t(translations.employManagement.roleName)}
            placeholder={t(translations.employManagement.roleName)}
            disabled={employeeType === 'HEAD_QUARTER_LEVEL'}
            options={[
              {
                label: t(translations.roles.picProject),
                value: RoleName.PIC_PROJECT,
              },
              {
                label: t(translations.roles.adminProject),
                value: RoleName.ADMIN_PROJECT,
              },
            ]}
          />
        </Stack>
      </div>
    </Box>
  );
});
