/* eslint-disable no-nested-ternary */
import cameraIcon from 'assets/icons/camera.svg';
import trashIcon from 'assets/icons/trash.svg';
import uploadIcon from 'assets/icons/upload-v4.svg';
import React, { useRef, useState } from 'react';
import {
  Control,
  Controller,
  RegisterOptions,
  useFieldArray,
} from 'react-hook-form';
import { fileService } from 'services';
import styled from 'styled-components';
import Dialog from '../Dialog';
import Spinner from '../Spinner';

import Notifier from 'app/pages/Notifier';
import fullscreenIcon from 'assets/icons/fullscreen.svg';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';

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
  label: string;
  validationMessage?: string;
  multiple?: boolean;
}

const Uploaded = styled.div`
  :hover {
    .delete-btn {
      opacity: 1;
    }
  }
`;
const ContentZone = styled.div`
  width: 362px;
  flex-shrink: 0;
`;
const DropArea = styled.div``;

const Error = styled.p`
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
  color: #ff0000;
`;
export default function UploadImage(props: Props) {
  const { t } = useTranslation();
  const {
    label,
    className,
    error,
    errorText,
    onChange,
    value,
    validationMessage,
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [innerError, setInnerError] = useState(false);

  const [showCamera, setShowCamera] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const streamRef = useRef<MediaStream | null>(null);

  const documentUrl = value?.file
    ? URL.createObjectURL(value?.file)
    : value?.url;

  const documentType = (() => {
    if (value?.url) {
      const type = value.url.split('.').slice(-1)[0].split('?')[0];

      if (type === 'pdf') return 'application/pdf';
      return `image/${type}`;
    }
    if (value?.file) return value.file.type;
    return 'image/jpeg';
  })();

  const getBorderColor = () => {
    if (error) return '#FF0000';
    return '#005FC5';
  };

  const handleClickUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.setAttribute('accept', 'application/pdf, image/*');
    input.click();
    input.remove();

    input.onchange = e => {
      const elm = e.target as HTMLInputElement;
      if (!elm.files) return;
      const file = elm.files[0];
      handleUploadFile(file);
    };
  };

  const handleDeleteImage = () => {
    onChange && onChange(undefined);
  };

  const handleUploadFile = (file: File) => {
    if (!file.type.includes('image/') && file.type !== 'application/pdf')
      return;

    if (file.size / 1024 / 1024 > 5) {
      onChange && onChange(undefined);
      setInnerError(true);
      return;
    }

    setIsLoading(true);
    fileService
      .fetchUrlImages({ fileName: [file.name] })
      .then(res => {
        fileService
          .getUrlImageData([{ url: res[0].url as string, files: file }])
          .then(() => {
            onChange && onChange({ ...res[0], file });
            setIsLoading(false);
          })
          .catch(err => {
            setIsLoading(false);
            Notifier.addNotifyError({
              messageId: 'imageUploadComponent.errorOccurred',
            });
          });
      })
      .catch(err => {
        setIsLoading(false);
        Notifier.addNotifyError({
          messageId: 'imageUploadComponent.errorOccurred',
        });
      });
    setInnerError(false);
  };

  const handleStartCamera = async () => {
    try {
      streamRef.current = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false,
      });
      setShowCamera(true);
      if (videoRef.current) {
        videoRef.current.srcObject = streamRef.current;
      }
    } catch (error) {}
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
    if (!streamRef.current) return;
    streamRef.current.getTracks()[0].stop();
  };

  const handleScreenShot = () => {
    if (!canvasRef.current || !videoRef.current) return;

    canvasRef.current
      .getContext('2d')
      ?.drawImage(videoRef.current, 0, 0, 640, 480);

    canvasRef.current.toBlob(blob => {
      if (!blob) return;
      const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
      handleCloseCamera();
      setIsLoading(true);
      fileService
        .fetchUrlImages({ fileName: file.name })
        .then(res => {
          fileService
            .getUrlImageData([{ url: res[0].url as string, files: file }])
            .then(() => {
              onChange && onChange({ ...res[0], file });
              setIsLoading(false);
            })
            .catch(err => {
              setIsLoading(false);
              Notifier.addNotifyError({
                messageId: 'imageUploadComponent.errorOccurred',
              });
            });
        })
        .catch(err => {
          Notifier.addNotifyError({
            messageId: 'imageUploadComponent.errorOccurred',
          });
          setIsLoading(false);
        });
      setInnerError(false);
    }, 'image/jpeg');
  };

  const handleDropFile = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;
    handleUploadFile(file);
  };

  return (
    <div className={classNames(className, 'flex justify-between')}>
      <p className="text-[#6B7A99] font-semibold text-[14px] leading-5 pr-6">
        {label}
      </p>

      <ContentZone>
        <canvas
          width="640"
          height="480"
          className="hidden"
          ref={canvasRef}
        ></canvas>
        {isLoading ? (
          <div className="flex aspect-video items-center justify-center border rounded-lg border-[#C6D7E0]">
            <Spinner />
          </div>
        ) : !value || (value as any)?.length === 0 ? (
          <DropArea
            className="border border-dashed rounded-lg bg-[#F0F4F9] flex flex-col items-center py-6 px-8"
            style={{ borderColor: getBorderColor() }}
            onDrop={handleDropFile}
            onDragOver={e => e.preventDefault()}
          >
            <div className="flex">
              <img
                src={uploadIcon}
                alt=""
                width={16}
                height={16}
                className="mr-2"
              />
              <p className="leading-5 font-medium text-[#6B7A99]">
                {`${t(translations.imageUploadComponent.dragAndDropDocument)} `}
                <span
                  className="text-[#005FC5] font-semibold underline cursor-pointer"
                  onClick={handleClickUpload}
                >
                  {t(translations.imageUploadComponent.browse)}
                </span>
              </p>
            </div>
            <p className="mt-2 text-[14px] leading-6 text-[#9098A7]">
              {validationMessage ||
                t(translations.imageUploadComponent.maxFileSize)}
            </p>
            <div
              className="flex items-center mt-2 cursor-pointer"
              onClick={handleStartCamera}
            >
              <img
                src={cameraIcon}
                width={24}
                height={24}
                alt=""
                className="mr-[10px]"
              />
              <p className="text-[#005FC5] font-semibold underline leading-7">
                {t(translations.imageUploadComponent.takeAPicture)}
              </p>
            </div>
          </DropArea>
        ) : (
          <Uploaded className="w-full relative border rounded-lg overflow-hidden border-[#C6D7E0]">
            <embed
              type={documentType}
              src={documentUrl}
              className="aspect-video w-full object-cover custom-image"
            />
            <div className="rounded-lg p-2 bg-[rgba(0,0,0,0.5)] absolute cursor-pointer right-4 bottom-4">
              <img
                src={fullscreenIcon}
                alt=""
                width={16}
                height={16}
                onClick={() => window.open(documentUrl)}
              />
            </div>
            <div
              className="w-[80px] rounded-full aspect-square bg-[rgba(0,0,0,0.5)] cursor-pointer absolute right-1/2 bottom-1/2 translate-x-1/2 translate-y-1/2 opacity-0 transition-all delete-btn flex items-center justify-center"
              onClick={handleDeleteImage}
            >
              <img src={trashIcon} width={40} height={40} alt="" />
            </div>
          </Uploaded>
        )}
        {innerError && (
          <Error>{t(translations.imageUploadComponent.maxFileSize)}</Error>
        )}

        {error && !innerError && <Error>{errorText}</Error>}
        <Dialog
          title="Camera"
          submitTitle="Capture"
          previousTitle="Cancel"
          open={showCamera}
          onSubmit={handleScreenShot}
          onClose={handleCloseCamera}
          onPrevious={handleCloseCamera}
        >
          <div className="w-[640px] h-[480px]">
            <video
              id="video"
              width="640"
              height="480"
              autoPlay
              muted
              ref={videoRef}
            ></video>
          </div>
        </Dialog>
      </ContentZone>
    </div>
  );
}

type FormValues = Record<string, FileUpload>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  name: string;
  rules?: RegisterOptions;
}
export const ControlledImageUpload = (props: FieldProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { multiple, label, control, name, value, onChange, rules, ...rest } =
    props;

  if (!multiple)
    return (
      <Controller
        name={name}
        rules={rules}
        control={control}
        render={({ field, fieldState }) => (
          <UploadImage
            {...rest}
            label={label}
            value={field.value}
            error={!!fieldState.error}
            errorText={fieldState.error?.message}
            onChange={newFile => {
              field.onChange(newFile || null);
              onChange && onChange(newFile);
            }}
          />
        )}
      />
    );

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { fields, append, remove } = useFieldArray({
    name: name as never,
    control,
  });

  return (
    <>
      {fields.map((item, index) => (
        <Controller
          key={item.id}
          name={`${name}.${index}`}
          rules={rules}
          control={control}
          render={({ field, fieldState }) => (
            <UploadImage
              {...rest}
              className={classNames(props.className, 'mb-2')}
              label={index !== 0 ? '' : label}
              value={field.value}
              error={!!fieldState.error}
              errorText={fieldState.error?.message}
              onChange={() => remove(index)}
            />
          )}
        />
      ))}

      <UploadImage
        {...rest}
        label={fields.length !== 0 ? '' : label}
        onChange={(newFile: any) => append(newFile)}
      />
    </>
  );
};
