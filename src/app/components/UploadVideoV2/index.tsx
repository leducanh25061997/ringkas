import React, { useRef, useState } from 'react';
import { FileUploadWithProgress } from 'types/FileUpload';
import UploadMediaIcon from '../../../assets/icons/upload.svg';
import { Tooltip, Typography } from '@mui/material';
import styled from 'styled-components';
import file from 'assets/icons/file.svg';
import axios from 'axios';
import deleteMediaV2 from '../../../assets/icons/delete-media-v2.svg';
import {
  Control,
  Controller,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import classNames from 'classnames';

interface Props {
  className?: string;
  name?: string;
  errorState?: boolean;
  errorText?: string;
  value?: any | undefined;
  onChange?: (value: any) => void;
  onDelete?: () => void;
  title?: string;
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

  margin-top: 16px;

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

export default function UploadVideoV2(props: Props) {
  const { onChange, errorText, errorState, value } = props;
  const [error, setError] = useState<string | boolean>();
  const [mediaList, setMediaList] = useState<FileUploadWithProgress[]>([]);
  const { formState } = useFormContext();

  const ref = useRef<HTMLDivElement>(null);

  const handleClickUpload = () => {
    const input = document.createElement('input');
    document.body.appendChild(input);
    input.type = 'file';
    input.setAttribute('accept', '.mov, .mp4');
    input.setAttribute('hidden', '');
    input.setAttribute('multiple', '');
    input.click();

    input.onchange = e => {
      const elm = e.target as HTMLInputElement;
      if (!elm.files) return;
      const { files } = elm;

      document.body.removeChild(input);
      input.remove();

      const cancelTokenSource = axios.CancelToken.source();

      const _mediaList: FileUploadWithProgress[] = [...mediaList];

      if (files.length + _mediaList.length > 10) {
        setError('Maximum is 10 video');
        return;
      }

      // @ts-ignore
      for (let i = 0; i < files.length; i++) {
        if (files[i].size / 1024 / 1024 > 50) {
          setError('Maximum size is 50MB');
          return;
        } else {
          _mediaList.push({
            file: files[i],
            progress: 0,
            cancelTokenSource,
          });
        }
      }

      setMediaList(_mediaList);
      onChange && onChange(_mediaList);
      setError(undefined);
    };
  };

  const onDeleteImage = (idx: number) => {
    mediaList[idx].cancelTokenSource?.cancel();

    const _mediaList = [
      ...mediaList.slice(0, idx),
      ...mediaList.slice(idx + 1),
    ];

    setMediaList(_mediaList);
    onChange && onChange(_mediaList);
    setError(undefined);
  };

  React.useEffect(() => {
    if (!value) return;
    setMediaList(value);
  }, [value]);

  React.useEffect(() => {
    if (formState.isSubmitting) {
      setError(undefined);
    }
  }, [formState]);

  return (
    <>
      {mediaList && mediaList.length > 0 && (
        <div className="p-6 border border-[#D7E2EE] rounded-[8px] mt-4">
          {mediaList.map((item, idx) => (
            <div
              key={idx}
              className={classNames('flex items-center justify-between', {
                'mb-[18px]': idx !== mediaList.length - 1,
              })}
            >
              <div className="flex items-center">
                <img alt="file" src={file} />
                <Tooltip
                  // @ts-ignore
                  title={item?.file?.name}
                  placement="bottom-start"
                >
                  <Typography
                    sx={{
                      maxWidth: 250,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: '#223250',
                      fontSize: '16px',
                      fontWeight: 600,
                      marginLeft: '8px',
                    }}
                  >
                    {item && item?.file?.name
                      ? item?.file?.name
                      : item?.s3Key?.split('/')[
                          item?.s3Key?.split('/').length - 1
                        ]}
                  </Typography>
                </Tooltip>
              </div>

              <img
                alt="delete media"
                src={deleteMediaV2}
                className="cursor-pointer"
                onClick={() => onDeleteImage(idx)}
              />

              {/*{*/}
              {/*  item.progress === 100 || item?.s3Key ? (*/}
              {/*    <img*/}
              {/*      alt="delete media"*/}
              {/*      src={deleteMediaV2}*/}
              {/*      className="cursor-pointer"*/}
              {/*      onClick={() => onDeleteImage(idx)}*/}
              {/*    />*/}
              {/*  ) : (*/}
              {/*    <div className="w-[32px] h-[32px]">*/}
              {/*      <CircularProgressbarWithChildren*/}
              {/*        value={item.progress || 0}*/}
              {/*        strokeWidth={10}*/}
              {/*        styles={buildStyles({*/}
              {/*          pathColor: '#39C24F',*/}
              {/*          pathTransitionDuration: 0.8*/}
              {/*        })}*/}
              {/*      >*/}
              {/*        <div*/}
              {/*          className="flex items-center justify-center h-[32px] w-[32px] rounded-full text-[14px] text-[#202A42] font-semibold">*/}
              {/*          {item.progress}*/}
              {/*        </div>*/}
              {/*      </CircularProgressbarWithChildren>*/}
              {/*    </div>*/}
              {/*  )*/}
              {/*}*/}
            </div>
          ))}
        </div>
      )}

      <UploadMediaStyle onClick={handleClickUpload} ref={ref}>
        <div className="upload-icon">
          <img
            src={UploadMediaIcon}
            alt=""
            className="upload-icon"
            style={{ width: '30px', height: '30px', margin: 'auto' }}
          />
        </div>
        <div className="flex flex-col text-center max-w-[190px]">
          <Typography sx={{ fontSize: '14px', lineHeight: '18px' }}>
            {'Upload Video (Optional)'}
          </Typography>
          <Typography
            sx={{
              fontSize: '12px',
              lineHeight: '15px',
              color: '#979797',
              marginTop: '6px',
            }}
          >
            {'Maximum Size 50MB'}
          </Typography>
        </div>
      </UploadMediaStyle>
      {error && <Error>{error}</Error>}
      {errorState && <Error>{errorText}</Error>}
    </>
  );
}

type FormValues = Record<string, any>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: keyof FormValues;
  rules?: RegisterOptions;
}

export const ControllerUploadVideoV2 = (props: FieldProps) => {
  const { control, name, value, rules, onChange, ...rest } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <UploadVideoV2
            {...rest}
            value={field.value || ''}
            errorState={!!fieldState.error}
            errorText={fieldState.error?.message}
            onChange={(newFile: any | undefined) => {
              field.onChange(newFile);
              onChange && onChange(newFile);
            }}
          />
        );
      }}
    />
  );
};
