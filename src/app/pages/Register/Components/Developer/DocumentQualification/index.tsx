import React from 'react';
import {
  Box,
  styled,
  Tab,
  Grid,
  Checkbox,
  Typography,
  FormHelperText,
} from '@mui/material';
import Button, { ButtonProps } from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { get, set } from 'lodash';
import { LoadingButton } from '@mui/lab';

import UploadFileDocumentQualification from './Component/UploadFileDocumentQualification';
import DescriptionSppkp from './Component/DescriptionSppkp';
import { useFormContext } from 'react-hook-form';
import { ControlledSignature } from 'app/components/Signature/Signature1';
import { ControlledImageUpload } from 'app/components/ImageUpload';
import classNames from 'classnames';

interface Props {
  images: any;
  setImages: (value: any) => void;
}

const CustomTab = styled('div')(({ theme }) => ({
  '& .tab_list': {
    '& .MuiButtonBase-root': {
      color: '#005FC5 !important',
      borderBottom: '6px solid #005FC5',
    },
    '& .MuiButtonBase-root.Mui-selected': {
      color: 'rgb(255, 204, 4) !important',
      borderBottom: '6px solid #C6D7E0',
    },
    '& .MuiButtonBase-root.Mui-disabled': {
      color: '#C6D7E0 !important',
      borderBottom: '6px solid #C6D7E0',
    },
    '&.active': {
      color: 'rgb(255, 204, 4)!important',
      '& .MuiButtonBase-root.Mui-disabled': {
        color: 'rgb(255, 204, 4)!important',
      },
    },
  },
  '& .MuiTabs-indicator': {
    color: 'rgb(255, 204, 4)',
    background: 'rgb(255, 204, 4)',
    height: '6px',
  },
}));

const CustomCheckboxRegister = styled('div')(({ theme }) => ({
  '& .MuiCheckbox-root.Mui-checked': {
    color: '#005FC5 !important',
  },
}));

const ColorButtonDisable = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#223250',
  boxShadow: 'none',
  padding: '12px 0',
  '& .Mui-disabled': {
    backgroundColor: '#EAECEF !important',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 204, 4, 1)',
    boxShadow: 'none',
  },
}));

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: '#223250',
  boxShadow: 'none',
  padding: '12px 0',
  backgroundColor: 'rgba(255, 204, 4, 1) !important',
  '&:hover': {
    backgroundColor: 'rgba(255, 204, 4, 1)',
    boxShadow: 'none',
  },
}));

const DocumentQualification = (props: Props) => {
  const { images, setImages } = props;
  const [valueTab, setValueTab] = React.useState<string>('1');
  const [checked, setChecked] = React.useState<boolean>(false);

  const [isDisableCheckbox, setIsDisableCheckbox] =
    React.useState<boolean>(true);
  const [isDisableBtn, setIsDisableBtn] = React.useState(true);
  const [formData, setFormData] = React.useState({
    fileKtpDirector: '',
    fileNpwp: '',
    fileTdp: '',
    fileSiup: '',
    fileSppkp: '',
  });
  const {
    control,
    clearErrors,
    setError,
    getValues,
    formState: { errors },
  } = useFormContext();

  React.useEffect(() => {
    if (!images.documentSppkp.url) {
      setChecked(false);
      setIsDisableCheckbox(true);
    } else {
      setIsDisableCheckbox(false);
    }
  }, [images]);

  const onDrop = (file: any, path?: string) => {
    const newData = { ...images };
    if (file.file.size <= 5120000) {
      set(newData, `${path}.url`, file.url);
      set(newData, `${path}.file`, file.file);
      set(newData, `${path}.name`, path);
      set(newData, `${path}.nameFile`, file.nameFile);
      set(newData, `${path}.isDisable`, false);
      if (path === 'documentSppkp') {
        setIsDisableCheckbox(false);
      }
      setImages(newData);
      clearErrors(path);
    } else {
      setError(path || '', {
        message: 'Incorrect document format',
      });
    }
  };

  const handleChangeSign = () => {
    const values = getValues();
    if (
      Object.values(values).filter(item => {
        if (item === undefined) return false;
        return true;
      }).length >= 11
    )
      setIsDisableBtn(false);
  };

  const handleChangeCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const values = getValues();
    if (
      Object.values(values).filter(item => {
        if (item === undefined) return false;
        return true;
      }).length >= 11
    )
      setIsDisableBtn(false);
    setChecked(event.target.checked);
  };

  const handeChangeTab = (value: string) => {
    const _value = parseInt(value) + 1;
    switch (_value) {
      case 2:
        setImages({
          ...images,
          documentNpWp: {
            ...images.documentNpWp,
            isDisable: false,
          },
        });
        break;
      case 3:
        setImages({
          ...images,
          documentTdp: {
            ...images.documentTdp,
            isDisable: false,
          },
        });
        break;
      case 4:
        setImages({
          ...images,
          documentSiup: {
            ...images.documentSiup,
            isDisable: false,
          },
        });
        break;
      case 5:
        setImages({
          ...images,
          documentSppkp: {
            ...images.documentSppkp,
            isDisable: false,
          },
        });
        break;
      default:
        break;
    }
    setValueTab(_value.toString());
  };

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };

  return (
    <Box sx={{ margin: '0 178px' }}>
      <CustomTab>
        <TabContext value={valueTab}>
          <Box sx={{}}>
            <TabList
              aria-label="lab API tabs example"
              variant="fullWidth"
              className={'tab_list'}
              onChange={handleChange}
            >
              <Tab
                label="KTP"
                disabled={!getValues('fileKtpDirector')}
                value="1"
                sx={{ color: '#FFCC04' }}
                className={classNames('tab_list', { active: valueTab === '1' })}
              />
              <Tab
                label="NPWP"
                disabled={!getValues('fileNpwp')}
                value="2"
                className={'tab'}
              />
              <Tab
                label="TDP"
                disabled={!getValues('fileTdp')}
                value="3"
                className={'tab'}
              />
              <Tab
                label="SIUP"
                disabled={!getValues('fileSiup')}
                value="4"
                className={'tab'}
              />
              <Tab
                label="SPPKP"
                disabled={!getValues('fileSppkp')}
                value="5"
                className={'tab'}
              />
            </TabList>
          </Box>
          <TabPanel value="1" sx={{ padding: '2rem 0 1rem 0' }}>
            <ControlledImageUpload
              name="fileKtpDirector"
              control={control}
              label="File KTP"
              onChange={e => {
                setFormData({
                  ...formData,
                  fileKtpDirector: 'photoKyp.png',
                });
              }}
              className="field"
              rules={{
                required: 'Required',
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {getValues('fileKtpDirector') ? (
                <ColorButton
                  onClick={() => handeChangeTab(valueTab)}
                  variant="contained"
                  disabled={false}
                  fullWidth
                >
                  Continue
                </ColorButton>
              ) : (
                <ColorButtonDisable
                  variant="contained"
                  disabled={true}
                  fullWidth
                >
                  Continue
                </ColorButtonDisable>
              )}
            </Box>
          </TabPanel>
          <TabPanel value="2" sx={{ padding: '2rem 0 1rem 0' }}>
            <ControlledImageUpload
              name="fileNpwp"
              control={control}
              label="File NPWP"
              onChange={e => {
                setFormData({
                  ...formData,
                  fileNpwp: 'photoKyp.png',
                });
              }}
              className="field"
              rules={{
                required: 'Required',
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {getValues('fileNpwp') ? (
                <ColorButton
                  onClick={() => handeChangeTab(valueTab)}
                  variant="contained"
                  disabled={false}
                  fullWidth
                >
                  Continue
                </ColorButton>
              ) : (
                <ColorButtonDisable
                  variant="contained"
                  disabled={true}
                  fullWidth
                >
                  Continue
                </ColorButtonDisable>
              )}
            </Box>
          </TabPanel>
          <TabPanel value="3" sx={{ padding: '2rem 0 1rem 0' }}>
            <ControlledImageUpload
              name="fileTdp"
              control={control}
              label="File TDP"
              onChange={e => {
                setFormData({
                  ...formData,
                  fileTdp: 'photoKyp.png',
                });
              }}
              className="field"
              rules={{
                required: 'Required',
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {getValues('fileTdp') ? (
                <ColorButton
                  onClick={() => handeChangeTab(valueTab)}
                  variant="contained"
                  disabled={false}
                  fullWidth
                >
                  Continue
                </ColorButton>
              ) : (
                <ColorButtonDisable
                  variant="contained"
                  disabled={true}
                  fullWidth
                >
                  Continue
                </ColorButtonDisable>
              )}
            </Box>
          </TabPanel>
          <TabPanel value="4" sx={{ padding: '2rem 0 1rem 0' }}>
            <ControlledImageUpload
              name="fileSiup"
              control={control}
              label="File SIUP"
              onChange={e => {
                setFormData({
                  ...formData,
                  fileSiup: 'photoKyp.png',
                });
              }}
              className="field"
              rules={{
                required: 'Required',
              }}
            />
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              {getValues('fileSiup') ? (
                <ColorButton
                  onClick={() => handeChangeTab(valueTab)}
                  variant="contained"
                  disabled={false}
                  fullWidth
                >
                  Continue
                </ColorButton>
              ) : (
                <ColorButtonDisable
                  variant="contained"
                  disabled={true}
                  fullWidth
                >
                  Continue
                </ColorButtonDisable>
              )}
            </Box>
          </TabPanel>
          <TabPanel value="5" sx={{ padding: '2rem 0 1rem 0' }}>
            <ControlledImageUpload
              name="fileSppkp"
              control={control}
              label="File SPPKP"
              onChange={e => {
                setFormData({
                  ...formData,
                  fileSppkp: 'photoKyp.png',
                });
              }}
              className="field"
              rules={{
                required: 'Required',
              }}
            />
            <Grid
              container
              spacing={0}
              justifyContent="center"
              mt={5}
              sx={{ width: '450px' }}
            >
              <Grid item md={1}>
                <CustomCheckboxRegister>
                  <Checkbox
                    disabled={!getValues('fileSppkp')}
                    style={{ padding: 0 }}
                    checked={checked}
                    onChange={handleChangeCheckbox}
                  />
                </CustomCheckboxRegister>
              </Grid>
              <Grid item md={11}>
                <Typography sx={{ color: '#9098A7', fontWeight: '400' }}>
                  {
                    'Saya memberikan ijin kepada ringkas untuk melakukan pengecekan data di dukcapil dan SLIK '
                  }
                </Typography>
              </Grid>
              <Grid item md={12} mt={5}>
                <ControlledSignature
                  name="fileSignature"
                  className="field"
                  rules={{ required: 'Required' }}
                  control={control}
                  onChange={handleChangeSign}
                />
              </Grid>
            </Grid>
            <Grid sx={{ mt: 5, textAlign: 'end' }}>
              <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                {checked === false || isDisableBtn ? (
                  <ColorButtonDisable
                    variant="contained"
                    disabled={true}
                    fullWidth
                  >
                    Submit
                  </ColorButtonDisable>
                ) : (
                  <ColorButton
                    variant="contained"
                    disabled={false}
                    type="submit"
                    fullWidth
                  >
                    Submit
                  </ColorButton>
                )}
              </Box>
            </Grid>
          </TabPanel>
        </TabContext>
      </CustomTab>
    </Box>
  );
};

export default DocumentQualification;
