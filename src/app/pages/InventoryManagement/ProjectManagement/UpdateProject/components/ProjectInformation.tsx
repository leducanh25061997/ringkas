import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { ControlledCitySelect } from 'app/components/CitySelect';
import { ControlledTextField } from 'app/components/CustomTextField';
import { ControlledTextarea } from 'app/components/TextArea';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { CustomField } from './CustomField';

export const RootCheckbox = styled('div')({
  '& .MuiCheckbox-root': {
    color: '#C6D7E0',
  },
});

interface DataType {
  data: string;
  isEdit: boolean;
}

const AddMore = styled.div`
  width: 100%;
  height: 3.5rem;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='20' ry='20' stroke='rgb(0, 156, 224)' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='20' stroke-linecap='square'/%3e%3c/svg%3e");
  display: inline-block;
  border-radius: 20px;
  align-self: center;
  line-height: 3.5rem;
  text-align: center;
  cursor: pointer;
  color: #005fb6;
  font-weight: 600;
  margin-bottom: 10px;
  padding-left: 1rem;
`;

interface Props {
  setHouseType: (value: DataType[]) => void;
  houseType: DataType[];
  setCluster: (value: DataType[]) => void;
  cluster: DataType[];
}

export const ProjectInformation = memo((props: Props) => {
  const { setHouseType, houseType, setCluster, cluster } = props;
  const dispatch = useDispatch();
  const [isChange, setIsChange] = useState<boolean>(false);
  const [SHM, setSHM] = useState<boolean>(false);
  const [AJB, setAJB] = useState<boolean>(false);
  const [HGB, setHGB] = useState<boolean>(false);
  const [SHSRS, setSHSRS] = useState<boolean>(false);
  const [GIRIK, setGIRIK] = useState<boolean>(false);
  const [OTHER, setOTHER] = useState<boolean>(false);
  const {
    control,
    setValue,
    getValues,
    watch,
    formState: { errors },
  } = useFormContext();
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const editHouseType = (index: number) => {
    const newHouseType: DataType[] = [];
    houseType.map((item: DataType, i: number) => {
      if (index === i) {
        item.isEdit = true;
      }
      newHouseType.push(item);
    });
    setHouseType(newHouseType);
    setIsChange(!isChange);
  };

  const deleteHouseType = (index: number) => {
    const newHouseType: DataType[] = [];
    houseType.map((item: DataType, i: number) => {
      if (index !== i) {
        newHouseType.push(item);
      }
    });
    setValue(`houseType${index + 1}`, '');
    setHouseType(newHouseType);
    setIsChange(!isChange);
  };

  useEffect(() => {
    if (
      getValues('SHM') ||
      getValues('AJB') ||
      getValues('HGB') ||
      getValues('SHSRS') ||
      getValues('GIRIK') ||
      getValues('OTHER')
    ) {
      setSHM(getValues('SHM'));
      setAJB(getValues('AJB'));
      setHGB(getValues('HGB'));
      setSHSRS(getValues('SHSRS'));
      setGIRIK(getValues('GIRIK'));
      setOTHER(getValues('OTHER'));
      setValue('cerType', 'cerType');
    } else {
      setValue('cerType', '');
    }
  }, [
    watch(['SHM']) && getValues('SHM'),
    watch(['AJB']) && getValues('AJB'),
    watch(['HGB']) && getValues('HGB'),
    watch(['SHSRS']) && getValues('SHSRS'),
    watch(['GIRIK']) && getValues('GIRIK'),
    watch(['OTHER']) && getValues('OTHER'),
  ]);

  const onChangeHouseType = (index: number, value: string) => {
    const newHouseType: DataType[] = [];
    houseType.map((item: DataType, i: number) => {
      const newItem: DataType = item;
      if (index === i) {
        newItem.data = value;
      }
      newHouseType.push(newItem);
    });
    setHouseType(newHouseType);
    setIsChange(!isChange);
  };

  const onChangeCluster = (index: number, value: string) => {
    const newCluster: DataType[] = [];
    cluster.map((item: DataType, i: number) => {
      const newItem: DataType = item;
      if (index === i) {
        newItem.data = value;
      }
      newCluster.push(newItem);
    });
    setCluster(newCluster);
    setIsChange(!isChange);
  };

  const editCluster = (index: number) => {
    const newCluster: DataType[] = [];
    cluster.map((item: DataType, i: number) => {
      if (index === i) {
        item.isEdit = true;
      }
      newCluster.push(item);
    });
    setCluster(newCluster);
    setIsChange(!isChange);
  };

  const deleteCluster = (index: number) => {
    const newCluster: DataType[] = [];
    cluster.map((item: DataType, i: number) => {
      if (index !== i) {
        newCluster.push(item);
      }
    });
    setValue(`cluster${index + 1}`, '');
    setCluster(newCluster);
    setIsChange(!isChange);
  };

  return (
    <Box sx={{ minHeight: '600px', mt: 4, mb: 4, width: '100%' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.projectManagement.projectInfo)}
      </Typography>
      <Typography sx={{ color: '#9098a7', mt: 1 }}>
        {t(translations.projectManagement.completeProjectInformation)}
      </Typography>
      <Grid container spacing={4} mt={0}>
        <Grid item md={6}>
          <ControlledTextField
            isBg
            className="field"
            label={`${t(translations.projectManagement.projectName)}`}
            name="name"
            control={control}
            rules={{
              required: 'Required',
            }}
            required
          />
          <ControlledCitySelect
            name="location"
            label="Province/City"
            placeholder="Province/City"
            className="mt-4"
            rules={{ required: 'Required' }}
            control={control}
            required
          />
          <Grid mt={2}>
            <ControlledTextarea
              isBg
              className="field"
              label={`${t(translations.projectManagement.fullAddress)}`}
              name="fullAddress"
              control={control}
            />
          </Grid>
          <Grid container spacing={2}>
            <Grid item md={6} mt={2}>
              <ControlledTextField
                isBg
                className="field"
                label={`${t(translations.projectManagement.longitude)}`}
                type="num"
                name="longitude"
                control={control}
              />
            </Grid>
            <Grid item md={6} mt={2}>
              <ControlledTextField
                isBg
                className="field"
                label={`${t(translations.projectManagement.latitude)}`}
                name="latitude"
                type="num"
                control={control}
              />
            </Grid>
          </Grid>
          <Grid mt={2}>
            <ControlledTextarea
              isBg
              className="field"
              label={`${t(
                translations.projectManagement.projectAccessibility,
              )}`}
              name="projectAccessibility"
              control={control}
              rules={{
                required: 'Required',
              }}
            />
          </Grid>
          <Grid mt={2}>
            <ControlledTextField
              isBg
              className="field"
              label={`${t(translations.projectManagement.cluster)}`}
              name="cluster"
              control={control}
            />
          </Grid>
          {cluster &&
            cluster.map((value: DataType, index: number) => (
              <Grid mt={2}>
                <ControlledTextField
                  isBg
                  className="field"
                  label={`${t(translations.common.cluster)} ${index + 1}`}
                  name={`cluster${index + 1}`}
                  control={control}
                  onChange={e => {
                    onChangeCluster(index, (e as string) || '');
                  }}
                  value={value.data}
                  isDelete
                  handleDelete={() => deleteCluster(index)}
                />
              </Grid>
            ))}
          <Grid mt={2}>
            <AddMore
              onClick={() => {
                const newCluster = cluster;
                newCluster.push({ data: '', isEdit: false });
                setCluster(newCluster);
                setIsChange(!isChange);
              }}
            >
              {'+'}
              <span
                style={{ textDecoration: 'underline', fontWeight: 600 }}
              >{`${t(translations.projectManagement.addMore)}`}</span>
            </AddMore>
          </Grid>
        </Grid>
        <Grid item md={6}>
          <ControlledTextField
            isBg
            className="field"
            label={`${t(translations.projectManagement.houseType)}`}
            name="houseType"
            control={control}
            required
          />
          {houseType &&
            houseType.map((value: DataType, index: number) => (
              <Grid mt={2}>
                <ControlledTextField
                  isBg
                  className="field"
                  label={`${t(translations.projectManagement.houseType)} ${
                    index + 1
                  }`}
                  name={`houseType${index + 1}`}
                  control={control}
                  value={value.data}
                  onChange={e => {
                    onChangeHouseType(index, (e as string) || '');
                  }}
                  isDelete
                  handleDelete={() => deleteHouseType(index)}
                />
              </Grid>
            ))}
          <Grid mt={2}>
            <AddMore
              onClick={() => {
                const newHouseType = houseType;
                newHouseType.push({ data: '', isEdit: false });
                setHouseType(newHouseType);
                setIsChange(!isChange);
              }}
            >
              {'+'}
              <span
                style={{ textDecoration: 'underline', fontWeight: 600 }}
              >{`${t(translations.projectManagement.addMore)}`}</span>
            </AddMore>
          </Grid>
          <Grid container spacing={2} mt={0}>
            <Grid item md={6}>
              <ControlledTextField
                isBg
                className="field"
                label={`${t(translations.projectManagement.yearBuild)}`}
                name="buildYear"
                control={control}
                type="id"
              />
            </Grid>
            <Grid item md={6}>
              <ControlledTextField
                isBg
                className="field"
                label={`${t(translations.projectManagement.yearCompletion)}`}
                name="completionYear"
                type="id"
                control={control}
              />
            </Grid>
          </Grid>
          <Grid mt={2}>
            <Typography sx={{ mt: 2, fontSize: '16px', fontWeight: 600 }}>
              {`${t(translations.projectManagement.cerType)}`}
            </Typography>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Controller
                  name="SHM"
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        control={
                          <RootCheckbox>
                            <Checkbox
                              value={SHM}
                              checked={SHM}
                              onChange={field.onChange}
                            />
                          </RootCheckbox>
                        }
                        label={'Sertifikat Hk Milik (SHM)'}
                      />
                    );
                  }}
                  control={control}
                />
              </Grid>
              <Grid item md={6}>
                <Controller
                  name="AJB"
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        control={
                          <RootCheckbox>
                            <Checkbox
                              value={AJB}
                              checked={AJB}
                              onChange={field.onChange}
                            />
                          </RootCheckbox>
                        }
                        label={'Akta Jual Beli (AJB)'}
                      />
                    );
                  }}
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Controller
                  name="HGB"
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        control={
                          <RootCheckbox>
                            <Checkbox
                              value={HGB}
                              checked={HGB}
                              onChange={field.onChange}
                            />
                          </RootCheckbox>
                        }
                        label={'Hak Guna Bangun (HGB)'}
                      />
                    );
                  }}
                  control={control}
                />
              </Grid>
              <Grid item md={6}>
                <Controller
                  name="SHSRS"
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        control={
                          <RootCheckbox>
                            <Checkbox
                              value={SHSRS}
                              checked={SHSRS}
                              onChange={field.onChange}
                            />
                          </RootCheckbox>
                        }
                        label={'Sertifikat Hak Satuan Rumah Susun (SHSRS)'}
                      />
                    );
                  }}
                  control={control}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item md={6}>
                <Controller
                  name="GIRIK"
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        control={
                          <RootCheckbox>
                            <Checkbox
                              value={GIRIK}
                              checked={GIRIK}
                              onChange={field.onChange}
                            />
                          </RootCheckbox>
                        }
                        label={'Girik'}
                      />
                    );
                  }}
                  control={control}
                />
              </Grid>
              <Grid item md={6}>
                <Controller
                  name="OTHER"
                  render={({ field }) => {
                    return (
                      <FormControlLabel
                        control={
                          <RootCheckbox>
                            <Checkbox
                              value={OTHER}
                              checked={OTHER}
                              onChange={field.onChange}
                            />
                          </RootCheckbox>
                        }
                        label={'Others Certificate Type'}
                      />
                    );
                  }}
                  control={control}
                />
              </Grid>
            </Grid>
            {get(errors, 'cerType') && (
              <FormHelperText sx={{ color: 'red' }}>
                {`${t(translations.required.cerTypeRequired)}`}
              </FormHelperText>
            )}
          </Grid>
          <Grid mt={2}>
            <ControlledTextarea
              isBg
              className="field"
              label={`${t(translations.projectManagement.projectFacility)}`}
              name="projectFacility"
              control={control}
              rules={{
                required: 'Required',
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
});
