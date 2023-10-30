import {
  Container,
  FormControl,
  FormHelperText,
  Grid,
  styled,
  TextField,
  Typography,
} from '@mui/material';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';
import { ControlledSignature } from 'app/components/Signature/Signature1';
import { translations } from 'locales/translations';
import { memo, useEffect, useState } from 'react';
import { Controller, get, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  images: any;
  setImages: (value: any) => void;
}

export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
  '& textarea': {
    height: '90px!important',
  },
  marginRight: '5rem',
});

export const DocumentQualification = memo((props: Props) => {
  const { images, setImages } = props;
  const { t } = useTranslation();
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const handleChangeSign = () => {};

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container sx={{ marginTop: '0', mb: 3, paddingRight: '5rem!important' }}>
      <Typography sx={{ fontWeight: 600 }}>
        {t(translations.developerInformation.developerDocumentQualification)}
      </Typography>
      <Typography sx={{ color: '#9098a7' }}>
        {t(
          translations.developerInformation
            .completeDeveloperDocumentQualification,
        )}
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <GeneralImageDetail
            images={images}
            setImages={setImages}
            grid={2}
            name="fileKtpDirector"
            path="fileKtpDirector"
            label={t(translations.developerInformation.uploadIdCardDirector)}
          />
        </Grid>
        <Grid item md={6}>
          <GeneralImageDetail
            images={images}
            setImages={setImages}
            grid={2}
            name="fileNpwp"
            path="fileNpwp"
            label={t(translations.developerInformation.uploadNPWP)}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={6}>
          <GeneralImageDetail
            images={images}
            setImages={setImages}
            grid={2}
            name="fileTdp"
            path="fileTdp"
            label={t(translations.developerInformation.uploadTDP)}
          />
        </Grid>
        <Grid item md={6}>
          <GeneralImageDetail
            images={images}
            setImages={setImages}
            grid={2}
            name="fileSiup"
            path="fileSiup"
            label={t(translations.developerInformation.uploadSIUP)}
          />
        </Grid>
      </Grid>
      <GeneralImageDetail
        images={images}
        setImages={setImages}
        grid={1}
        name="fileSppkp"
        path="fileSppkp"
        label={t(translations.developerInformation.uploadSPPKP)}
      />
      <Grid item md={12} mt={3}>
        <ControlledSignature
          name="fileSignature"
          className="field"
          rules={{ required: 'Required' }}
          control={control}
          onChange={handleChangeSign}
          isExtend
        />
      </Grid>
    </Container>
  );
});
