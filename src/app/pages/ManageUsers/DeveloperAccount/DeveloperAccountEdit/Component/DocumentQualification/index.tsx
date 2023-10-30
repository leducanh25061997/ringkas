import { Container, Grid, styled } from '@mui/material';
import { Key, KV, Row } from 'app/components/DataDisplay';
import ViewAndDownImage from 'app/components/ViewAndDownImage';
import React from 'react';
import { set } from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';
import { GeneralImageDetail } from 'app/components/GeneralImageDetail';

interface Props {
  images?: any;
  setImages: (value: any) => void;
}

export const RootStyle = styled('div')({
  '& .MuiOutlinedInput-root': {
    borderRadius: '8px',
    background: '#F6F8FC!important',
  },
  marginBottom: '3rem',
  marginRight: '5rem',
});

const DocumentQualification = (props: Props) => {
  const { images, setImages } = props;
  const {
    control,
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext();

  const onDrop = (file: any, path?: string) => {
    const newData = { ...images };
    set(newData, `${path}.url`, file.url);
    set(newData, `${path}.file`, file.file);
    set(newData, `${path}.name`, path);
    set(newData, `${path}.nameFile`, file.nameFile);
    setImages(newData);
  };

  const onRemove = (field?: any, path?: string) => {
    const newData = { ...images };
    set(newData, `${path}.url`, '');
    set(newData, `${path}.file`, null);
    set(newData, `${path}.name`, '');
    set(newData, `${path}.nameFile`, '');
    field.onChange(null);
    setImages(newData);
  };

  return (
    <Container sx={{ marginTop: '0', minHeight: '600px' }}>
      <RootStyle>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'Photo of ID Card*'}</Key>
              {images?.fileKtpDirector.url ? (
                <Controller
                  control={control}
                  name="fileKtpDirector"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        image={images?.fileKtpDirector.url}
                        onRemove={onRemove}
                        accept="image/*"
                        onDrop={onDrop}
                        maxFile={1}
                        path="fileKtpDirector"
                        edit={true}
                        remove={true}
                        field={field}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileKtpDirector"
                  path="fileKtpDirector"
                  label={'Photo of ID Card*'}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'NPWP*'}</Key>
              {images?.fileNpwp.url ? (
                <Controller
                  control={control}
                  name="fileNpwp"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        accept="image/*"
                        onRemove={onRemove}
                        onDrop={onDrop}
                        maxFile={1}
                        path="fileNpwp"
                        image={images?.fileNpwp.url}
                        edit={true}
                        field={field}
                        remove={true}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileNpwp"
                  path="fileNpwp"
                  label={'NPWP*'}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'TDP*'}</Key>
              {images?.fileTdp.url ? (
                <Controller
                  control={control}
                  name="fileTdp"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        accept="image/*"
                        field={field}
                        onDrop={onDrop}
                        onRemove={onRemove}
                        maxFile={1}
                        path="fileTdp"
                        image={images?.fileTdp.url}
                        edit={true}
                        remove={true}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileTdp"
                  path="fileTdp"
                  label={'TDP*'}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'SIUP*'}</Key>
              {images?.fileSiup.url ? (
                <Controller
                  control={control}
                  name="fileSiup"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        image={images?.fileSiup.url}
                        field={field}
                        onRemove={onRemove}
                        accept="image/*"
                        onDrop={onDrop}
                        maxFile={1}
                        path="fileSiup"
                        edit={true}
                        remove={true}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileSiup"
                  path="fileSiup"
                  label={'SIUP*'}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
        <Grid item md={12}>
          <KV>
            <Row>
              <Key>{'SPPKP*'}</Key>
              {images?.fileSppkp.url ? (
                <Controller
                  control={control}
                  name="fileSppkp"
                  render={({ field }) => {
                    return (
                      <ViewAndDownImage
                        image={images?.fileSppkp.url}
                        field={field}
                        onRemove={onRemove}
                        accept="image/*"
                        onDrop={onDrop}
                        maxFile={1}
                        path="fileSppkp"
                        edit={true}
                        remove={true}
                      />
                    );
                  }}
                />
              ) : (
                <GeneralImageDetail
                  images={images}
                  setImages={setImages}
                  grid={2}
                  name="fileSppkp"
                  path="fileSppkp"
                  label={'SPPKP*'}
                  isUploadDevelop
                />
              )}
            </Row>
          </KV>
        </Grid>
      </RootStyle>
    </Container>
  );
};

export default DocumentQualification;
