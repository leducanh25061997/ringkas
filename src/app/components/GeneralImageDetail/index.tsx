/**
 *
 * Photos
 *
 */
import { memo, useEffect } from 'react';
import {
  Grid,
  Typography,
  Card,
  TextField,
  CardContent,
  Box,
  styled,
} from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

import { ImageCard } from './ImageCard';
interface Props {
  grid: number;
  images: any;
  setImages: (value: any) => void;
  label: string;
  path: string;
  name: string;
  isUploadDevelop?: boolean;
}

export const RootStyle = styled('div')({
  '& .MuiPaper-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
    border: '1px solid #C6D7E0',
  },
});

export const GeneralImageDetail = memo((props: Props) => {
  const { images, setImages, grid, label, path, name, isUploadDevelop } = props;
  const { t } = useTranslation();
  const {
    control,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  return grid === 1 ? (
    <Box
      mt={isUploadDevelop ? 0 : 3}
      sx={{ marginTop: isUploadDevelop ? 0 : '1rem', width: '100%' }}
    >
      <RootStyle>
        <Card sx={{ padding: '1rem' }}>
          <ImageCard
            setError={setError}
            clearErrors={clearErrors}
            errors={errors}
            images={images}
            setImages={setImages}
            name={name}
            path={path}
            control={control}
            label={label}
            extra={
              <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Typography
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {`${t(translations.developerInformation.maxSize)}`}
                </Typography>
              </CardContent>
            }
          />
        </Card>
      </RootStyle>
    </Box>
  ) : (
    <Box
      mt={isUploadDevelop ? 0 : 3}
      sx={{ marginTop: isUploadDevelop ? 0 : '1rem', width: '100%' }}
    >
      <RootStyle>
        <Card sx={{ padding: '1rem' }}>
          <ImageCard
            setError={setError}
            clearErrors={clearErrors}
            isFlex
            errors={errors}
            images={images}
            setImages={setImages}
            name={name}
            path={path}
            control={control}
            label={label}
            extra={
              <CardContent sx={{ paddingLeft: 0, paddingRight: 0 }}>
                <Typography
                  gutterBottom
                  sx={{
                    fontWeight: 'bold',
                  }}
                >
                  {`${t(translations.developerInformation.maxSize)}`}
                </Typography>
              </CardContent>
            }
          />
        </Card>
      </RootStyle>
    </Box>
  );
});
