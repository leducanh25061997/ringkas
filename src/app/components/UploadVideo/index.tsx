import React, { useRef, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import s3Service from 'services/api/fileService';
import { FileUpload } from 'types/FileUpload';
import UploadMediaIcon from '../../../assets/icons/upload.svg';
import { Typography } from '@mui/material';
import styled from 'styled-components';
import GroupButtonAction from '../GroupButtonAction';
import Spinner from '../Spinner';

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  value?: FileUpload;
  onChange?: (value: FileUpload | undefined) => void;
  title: string;
  description?: string;
  disabled?: boolean;
}

const UploadMediaStyle = styled.div`
  width: 100%;
  height: 150px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  background: #f6f8fc;
  border: 1px solid #c6d7e0;
  border-radius: 10px;

  .upload-icon {
    width: 60px;
    height: 60px;
    background-color: #005fc5;
    border-radius: 50%;

    align-items: center;
    justify-content: center;
    display: flex;

    margin-right: 24px;
  }
`;

const Error = styled.div`
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
  color: #ff0000;
`;

export default function UploadVideo(props: Props) {
  const {
    title,
    description,
    onChange,
    value,
    error,
    errorText,
    className,
    disabled,
  } = props;
  const [errorVideo, setErrorVideo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef<HTMLDivElement>(null);

  const handleClickUpload = () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.type = 'file';
    input.setAttribute('hidden', '');
    input.setAttribute('accept', '.mov,.mp4');
    input.click();

    input.onchange = e => {
      const elm = e.target as HTMLInputElement;
      if (!elm.files) return;
      const file = elm.files[0];
      const fileName = [file.name];

      document.body.removeChild(input);
      input.remove();

      if (file.size / 1024 / 1024 > 50) {
        setErrorVideo(true);
        return;
      }

      setIsLoading(true);

      s3Service
        .fetchUrlImages({ fileName })
        .then(res => {
          s3Service
            .getUrlImageData([{ url: res[0].url as string, files: file }])
            .then(() => {
              onChange && onChange({ ...res[0], file });
              setIsLoading(false);
            })
            .catch(err => {
              setIsLoading(false);
            });
        })
        .catch(err => {
          setIsLoading(false);
        });
      setErrorVideo(false);
    };
  };
  const handleDeleteImage = () => {
    onChange && onChange(undefined);
  };

  return (
    <div className={className}>
      <UploadMediaStyle ref={ref}>
        {isLoading ? (
          <div className="spinner">
            <Spinner />
          </div>
        ) : (
          <div
            className="flex items-center justify-center h-full w-full"
            onClick={handleClickUpload}
          >
            {!value || !value.s3Key ? (
              <>
                <div className="upload-icon">
                  <img
                    src={UploadMediaIcon}
                    alt=""
                    className="upload-icon"
                    style={{ width: '30px', height: '30px', margin: 'auto' }}
                  />
                </div>
                <div className="max-w-[190px] text-center">
                  <Typography sx={{ fontSize: '12px', lineHeight: '18px' }}>
                    {title}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: '10px',
                      lineHeight: '15px',
                      color: '#979797',
                      marginTop: '6px',
                    }}
                  >
                    {description}
                  </Typography>
                </div>
              </>
            ) : (
              <video
                controls
                className="w-full h-full object-cover rounded-[8px]"
              >
                <source
                  src={
                    value.file ? URL.createObjectURL(value.file) : value?.url
                  }
                />
              </video>
            )}
          </div>
        )}
      </UploadMediaStyle>

      {errorVideo ? (
        <p className="text-[12px] leading-[18px] mt-2 text-[#FF0000]">
          Maximum size is 5MB
        </p>
      ) : null}

      {!disabled && (
        <>
          {value ? (
            <GroupButtonAction
              buttonGroup={[
                {
                  title: 'View',
                  onClick: () =>
                    window.open(
                      value?.file
                        ? URL.createObjectURL(value.file)
                        : value?.url,
                    ),
                },
                {
                  title: 'Edit',
                  onClick: () => handleClickUpload(),
                },
                {
                  title: 'Delete',
                  onClick: () => handleDeleteImage(),
                },
              ]}
            />
          ) : null}
        </>
      )}

      {error && !errorVideo ? <Error>{errorText}</Error> : null}
    </div>
  );
}

type FormValues = Record<string, FileUpload>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: keyof FormValues;
  rules?: RegisterOptions;
}

export const ControllerUploadVideo = (props: FieldProps) => {
  const { control, name, value, rules, onChange, ...rest } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <UploadVideo
            {...rest}
            value={field.value || ''}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            onChange={(newFile: FileUpload | undefined) => {
              field.onChange(newFile);
              onChange && onChange(newFile);
            }}
          />
        );
      }}
    />
  );
};
