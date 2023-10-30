import { Box } from '@mui/material';
import { ControlledCitySelect } from 'app/components/CitySelect';
import { ControlledClusterDropdown } from 'app/components/DropdownInput/Cluster';
import { ControlledHouseTypeDropdown } from 'app/components/DropdownInput/HouseType';
import { ControlledProjectsDropdown } from 'app/components/DropdownInput/Projects';
import { ControlledUnitDropdown } from 'app/components/DropdownInput/unit';
import { useSafeState } from 'app/hooks/useSafeState';
import { translations } from 'locales/translations';
import { memo, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectManageCustomer } from '../../../slice/selectors';

interface Props {}
export const PropertyInfo = memo((props: Props) => {
  const { t } = useTranslation();
  const { bankPreference } = useSelector(selectManageCustomer);
  const { control, watch, resetField } = useFormContext();
  const [projectId, setProjectId] = useSafeState<number>();
  const city = watch('city');
  const projectType = watch('projectType');
  useEffect(() => {
    setProjectId(watch('projectName')?.value);
  }, [watch]);
  return (
    <Box>
      <ControlledCitySelect
        name="city"
        label={t(translations.common.provinceAndCity)}
        placeholder={t(translations.common.provinceAndCity)}
        rules={{ required: 'Required' }}
        control={control}
        disabled
      />
      <ControlledProjectsDropdown
        className="mb-4 mt-4"
        label={`${t(translations.projectManagement.projectName)}`}
        name="projectName"
        control={control}
        rules={{
          required: t(translations.required.fillThisField) as string,
        }}
        onChange={e => {
          e?.value && setProjectId(parseInt(e?.value));
        }}
        disabled={bankPreference?.banks && bankPreference?.banks.length >= 5}
        location={city?.value}
      />
      <ControlledClusterDropdown
        className="mb-4"
        label={`${t(translations.productInformation.cluster)}`}
        placeholder={`${t(translations.common.cluster)}`}
        name="cluster"
        control={control}
        projectId={projectId}
        disabled={bankPreference?.banks && bankPreference?.banks.length >= 5}
      />
      <ControlledHouseTypeDropdown
        className="mb-4"
        label={`${t(translations.common.type)}`}
        placeholder={`${t(translations.common.type)}`}
        name="projectType"
        control={control}
        rules={{
          required: t(translations.required.fillThisField) as string,
        }}
        onChange={() => {
          resetField('unit');
        }}
        projectId={projectId}
        disabled={bankPreference?.banks && bankPreference?.banks.length >= 5}
      />
      <ControlledUnitDropdown
        label={`${t(translations.common.unit)}`}
        projectType={projectType?.value}
        placeholder={`${t(translations.common.unit)}`}
        name="unit"
        control={control}
        projectId={projectId}
        disabled={bankPreference?.banks && bankPreference?.banks.length >= 5}
      />
    </Box>
  );
});
