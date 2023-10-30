import React, { useRef, useState } from 'react';

import s3Service from 'services/api/fileService';

import { FileUploadWithProgress } from 'types/FileUpload';
import { Typography } from '@mui/material';
import styled from 'styled-components';

import axios from 'axios';

import ImageAndVideoItem from '../../pages/InventoryManagement/ImageAndVideo/component/ImageAndVideoItem';
import ArrowDownV2 from '../../../assets/icons/arrow-down-v2.svg';
import VideoIcon from '../../../assets/images/video-icon.png';
import UploadMediaIcon from '../../../assets/icons/upload.svg';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import Notifier from '../../pages/Notifier';
import { translations } from '../../../locales/translations';
import { useTranslation } from 'react-i18next';

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
    width: 85px;
    height: 85px;
    background-color: #005fc5;
    border-radius: 50%;

    align-items: center;
    justify-content: center;
    display: flex;

    margin-right: 72px;
  }
`;

const ViewAllFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-top: 25px;

  cursor: pointer;

  .title {
    font-size: 16px;
    line-height: 24px;
    color: #9098a7;
    margin-right: 8px;
  }
`;

const Error = styled.div`
  font-size: 12px;
  line-height: 18px;
  margin-top: 8px;
  color: #ff0000;
`;

const UploadButton = styled.button`
  padding: 10px 20px;
  line-height: 28px;
  font-weight: 600;
  background-color: #ffdd00;
  border-radius: 8px;
  margin-left: 16px;
`;

const CancelButton = styled.button`
  padding: 10px 22px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid #000;
`;

interface Props {
  onClose?: () => void;
  fetchData?: () => void;
  isViewAll: boolean;
  setViewAll: (t: boolean) => void;
}

export default function UploadMedia(props: Props) {
  const { onClose, fetchData, setViewAll, isViewAll } = props;
  const [status, setStatus] = useState<'NORMAL' | 'FOCUS'>('NORMAL');
  const [error, setError] = useState(false);
  const [mediaList, setMediaList] = useState<FileUploadWithProgress[]>([]);
  const [isDisabled, setDisabled] = useState<boolean>(false);

  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  useOnClickOutside(ref, () => setStatus('NORMAL'));

  const getBorderColor = () => {
    if (status === 'FOCUS') return '#005FC5';
    return '#C6D7E0';
  };

  const handleClickUpload = () => {
    setStatus('FOCUS');

    const input = document.createElement('input');
    document.body.appendChild(input);
    input.type = 'file';
    input.setAttribute('accept', 'video/*,image/*');
    input.style.display = 'hidden';
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

      // @ts-ignore
      for (let i = 0; i < files.length; i++) {
        if (files[i].size / 1024 / 1024 > 5) {
          setError(true);
          return;
        } else {
          _mediaList.push({
            file: files[i],
            progress: 0,
            cancelTokenSource,
            name: files[i].name,
            mimeType: files[i].type,
            size: files[i].size,
            image:
              files[i].type.split('/')[0] === 'video'
                ? VideoIcon
                : URL.createObjectURL(files[i]),
          });
        }
      }

      setMediaList(_mediaList);
      setError(false);
    };
  };

  const onDeleteImage = (idx: number) => {
    mediaList[idx].cancelTokenSource?.cancel();

    const _mediaList = [
      ...mediaList.slice(0, idx),
      ...mediaList.slice(idx + 1),
    ];

    setMediaList(_mediaList);
  };

  const onViewAllFile = () => {
    setViewAll(!isViewAll);
  };

  const onUploadMedia = () => {
    setDisabled(true);
    const cancelTokenSource = axios.CancelToken.source();
    const _mediaList: FileUploadWithProgress[] = [...mediaList];

    for (let i = 0; i < _mediaList.length; i++) {
      const fileName = [
        {
          name: _mediaList[i]?.name!,
          mimeType: _mediaList[i]?.mimeType!,
          size: _mediaList[i]?.size!,
        },
      ];

      s3Service.createMedia(fileName).then(res => {
        s3Service
          .getUrlImageData(
            [{ url: res[0].location as string, files: _mediaList[i].file }],
            cancelTokenSource,
            event => {
              setMediaList(prev => {
                const mediaListClone = [...prev];
                mediaListClone[i].progress = Math.round(
                  (100 * event.loaded) / event.total,
                );

                return mediaListClone;
              });
            },
          )
          .then(() => {
            const isClose = [...mediaList].every(item => item.progress === 100);
            if (isClose) {
              Notifier.addNotifySuccess({
                messageId: t(translations.success.mediaUploadSuccess),
              });
              onClose && onClose();
              fetchData && fetchData();
              setMediaList([]);
            }
          })
          .catch(e => {
            Notifier.addNotifySuccess({
              messageId: t(translations.error.mediaUploadFailed),
            });
            onClose && onClose();
            setMediaList([]);
          });
      });
    }
  };

  return (
    <>
      <div style={{ padding: '24px 32px' }}>
        <UploadMediaStyle
          style={{ borderColor: getBorderColor() }}
          onClick={handleClickUpload}
          ref={ref}
          onBlur={() => setStatus('NORMAL')}
        >
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
              {'Upload Photo or Video'}
            </Typography>
            <Typography
              sx={{
                fontSize: '12px',
                lineHeight: '15px',
                color: '#979797',
                marginTop: '6px',
              }}
            >
              {'Maximum Size 5MB'}
            </Typography>
          </div>
        </UploadMediaStyle>
        {error && <Error>Your uploaded image exceeds the maximum size</Error>}

        {mediaList &&
          (isViewAll ? mediaList : mediaList.slice(0, 2)).map((item, idx) => (
            <ImageAndVideoItem
              key={idx}
              item={item}
              onDeleteImage={() => onDeleteImage(idx)}
            />
          ))}

        {mediaList.length > 2 && (
          <ViewAllFile onClick={onViewAllFile}>
            <p className="title">All File</p>
            <img
              src={ArrowDownV2}
              alt=""
              className="arrow-down-icon"
              style={{
                width: '24px',
                height: '24px',
                transition: 'all 0.3s linear',
                transform: isViewAll ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </ViewAllFile>
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '24px 32px',
        }}
      >
        <CancelButton onClick={onClose}>Cancel</CancelButton>
        <UploadButton
          style={{
            background:
              mediaList.length === 0 || isDisabled ? '#EFEFEF' : '#ffdd00',
          }}
          disabled={mediaList.length === 0 || isDisabled}
          onClick={onUploadMedia}
        >
          Upload
        </UploadButton>
      </div>
    </>
  );
}
