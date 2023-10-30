import { Box, Grid } from '@mui/material';
import { translations } from 'locales/translations';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { selectManageCustomer } from '../../../slice/selectors';
import { Pricing } from './Pricing';
import { PropertyInfo } from './PropertyInfo';
import { useDispatch, useSelector } from 'react-redux';
import { useFormContext } from 'react-hook-form';
import { useManageCustomerSlice } from '../../../slice';
import { useParams } from 'react-router-dom';

interface Props {
  isError: boolean;
}
export const KprSummary = memo((props: Props) => {
  const { isError } = props;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useManageCustomerSlice();
  const params = useParams();
  const { id } = params;
  const { propertyDetail } = useSelector(selectManageCustomer);
  const { setValue, getValues } = useFormContext();
  useEffect(() => {
    if (propertyDetail) {
      setValue('id', propertyDetail.id);
      setValue('propertyId', propertyDetail.property.id);
      setValue('projectName', {
        label: propertyDetail.property.projectName,
        value: propertyDetail.property.projectId,
      });
      propertyDetail.property.cluster &&
        setValue('cluster', {
          label: propertyDetail.property.cluster[0],
          value: propertyDetail.property.cluster[0],
        });
      setValue('projectType', {
        label: propertyDetail.property.type,
        value: propertyDetail.property.type,
      });
      setValue('unit', {
        label: propertyDetail.property.unit,
        value: propertyDetail.property.unit,
      });
      setValue('city', {
        province: propertyDetail?.property?.project?.provinceName || '',
        city: propertyDetail?.property?.project?.cityName || '',
      });
    }
  }, [propertyDetail]);

  useEffect(() => {
    if (!id) {
      return;
    }
    dispatch(actions.fetchPropertyDetail(id));
  }, []);

  return (
    <Box px={4} pt={4}>
      <p className="text-[18px] leading-[25px] font-bold mb-2">
        {t(translations.productInformation.productInformation)}
      </p>
      <p className="text-[14px] leading-8 mb-6">
        {t(translations.productInformation.completeProductInformation)}
      </p>
      <Grid container spacing={6}>
        <Grid item md={5.5}>
          <PropertyInfo />
        </Grid>
        <Grid item md={6.5}>
          <Pricing isError={isError} />
        </Grid>
      </Grid>
    </Box>
  );
});
