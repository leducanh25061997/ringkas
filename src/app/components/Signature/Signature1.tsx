/* eslint-disable no-nested-ternary */
import { Dialog, Typography } from '@mui/material';
import signatureIcon from 'assets/icons/signature-white.svg';
import spinner from 'assets/loader/spinner.svg';
import React, { useRef, useState } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import SignaturePad from 'react-signature-canvas';
import { fileService } from 'services';
import styled from 'styled-components';
import { dataUrlToFile } from 'utils/commonFunction';
import uploadIcon from 'assets/images/signature.svg';

import Spinner from '../Spinner';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

interface FileUpload {
  originalName?: string;
  url?: string;
  s3Key: string;
  file?: File;
}
interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  value?: FileUpload;
  onChange?: (value: FileUpload | undefined) => void;
  description?: string;
  isExtend?: boolean;
}

const Error = styled.span`
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
  color: #ff0000;
`;

const RootStyle = styled('div')({
  height: '140px',
  objectFit: 'cover',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

const DisplayFlex = styled('div')({
  textAlign: 'center',
  display: 'flex',
  marginLeft: '4rem',
});

const SignatureText = styled('span')({
  color: '#005FC5',
});

export default function Signature(props: Props) {
  const { className, error, errorText, onChange, value, isExtend } = props;
  const { t } = useTranslation();
  const [openSwipeSignature, setOpenSwipeSignature] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const signatureRef = useRef<any>();

  const getBorderColor = () => {
    if (error) return '#FF0000';
    return '#C6D7E0';
  };

  const handleClickSwipe = () => {
    setOpenSwipeSignature(true);
  };

  const onReset = () => {
    if (signatureRef) {
      signatureRef.current.clear();
    }
  };

  const onSave = async () => {
    if (signatureRef) {
      const image = signatureRef.current.toDataURL('image/svg+xml', 0.5);
      const file = await dataUrlToFile(image, 'signature');
      const fileName = [file.name];
      setIsLoading(true);
      fileService.fetchUrlImages({ fileName }).then(res => {
        fileService
          .getUrlImageData([{ url: res[0].url as string, files: file }])
          .then(() => {
            setIsLoading(false);
            onChange && onChange({ ...res[0], file });
          })
          .catch(error => setIsLoading(false));
      });
      setOpenSwipeSignature(false);
    }
  };

  const renderContent = () => {
    if (isLoading)
      return (
        <div className="w-full h-full flex items-center justify-center min-h-[147px]">
          <Spinner />
        </div>
      );
    if (!value)
      return isExtend ? (
        <RootStyle onClick={handleClickSwipe}>
          <DisplayFlex>
            <img src={uploadIcon} alt={'Signature'} />
            <Typography
              sx={{
                fontSize: '16px',
                color: '#223250',
                alignSelf: 'center',
                width: '200px',
                textAlign: 'left',
                marginLeft: '1rem',
              }}
            >
              {t(translations.customerAccountManagement.signatureText)}
              <SignatureText>
                {' '}
                {t(translations.customerAccountManagement.signature)}
              </SignatureText>
            </Typography>
          </DisplayFlex>
        </RootStyle>
      ) : (
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={handleClickSwipe}
        >
          <img
            src={signatureIcon}
            alt=""
            width={56}
            height={56}
            className="mt-[13px] w-[56px] h-[56px]"
          />
          <p className="w-[251px] text-[#9098A7] leading-5 text-center mt-6 mb-[13px]">
            Swipe on the Dialog Box to Add Your Signature
          </p>
        </div>
      );
    return (
      <div className="flex h-[147px] w-full">
        <img
          src={value.file ? URL.createObjectURL(value.file) : undefined}
          alt=""
          className="w-full h-full object-cover cursor-pointer bg-white"
          onClick={handleClickSwipe}
        />
      </div>
    );
  };

  return (
    <div className={className}>
      <div
        className="rounded-lg border border-solid bg-[#F6F8FC] overflow-hidden"
        style={{ borderColor: getBorderColor() }}
      >
        {renderContent()}
      </div>

      {error && <Error>{errorText}</Error>}
      <Dialog
        open={openSwipeSignature}
        onClose={() => {
          setOpenSwipeSignature(false);
        }}
        maxWidth="md"
      >
        <div className="w-[700px] h-[200px] bg-white">
          <SignaturePad
            ref={signatureRef}
            canvasProps={{
              style: {
                width: '100%',
                height: '100%',
              },
            }}
          />
        </div>
        <div className="flex px-[100px] h-[50px] bg-slate-500 justify-between items-center">
          <button onClick={onReset} className="px-4 py-1 rounded bg-white">
            Reset
          </button>
          <button onClick={onSave} className="px-4 py-1 rounded bg-white">
            Save
          </button>
        </div>
      </Dialog>
    </div>
  );
}

type FormValues = Record<string, FileUpload>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: string;
  rules?: RegisterOptions;
}
export const ControlledSignature = (props: FieldProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { control, name, value, rules, onChange, isExtend, ...rest } = props;

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <Signature
            {...rest}
            value={field.value}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            onChange={(newFile?: FileUpload) => {
              field.onChange(newFile);
              onChange && onChange(newFile);
            }}
            isExtend={isExtend}
          />
        );
      }}
    />
  );
};
