import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FileUploadWithProgress } from 'types/FileUpload';

import DeleteMediaIcon from '../../../../../assets/icons/delete-media.svg';

const ImageInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  .img-name {
    font-weight: 500;
    font-size: 18px;
    line-height: 28px;
    color: #223250;
  }

  .img-size {
    font-weight: 400;
    font-size: 18px;
    line-height: 28px;
    color: #abb4c1;
    margin-left: 16px;
  }
`;

const ImagePreview = styled.div`
  display: flex;
  align-items: center;
  margin-top: 24px;
  position: relative;
`;

const ProgressBar = styled.div`
  background: #c6d7e0;
  border-radius: 8px;
  height: 20px;
`;

interface Props {
  item: FileUploadWithProgress;
  onDeleteImage?: () => void;
}

const ImageAndVideoItem = (props: Props) => {
  const { item, onDeleteImage } = props;

  const src = useMemo(() => {
    return item.image;
  }, [item]);

  return (
    <ImagePreview>
      <img
        src={src}
        alt=""
        className="image-default"
        style={{
          width: '88px',
          height: '88px',
          borderRadius: '8px',
          objectFit: 'cover',
        }}
      />
      <div style={{ flex: 1, marginLeft: '32px' }}>
        <ImageInfo>
          <p className="img-name">{item.name && item.name.substring(0, 50)}</p>
          <p className="img-size">
            {item.size && (item.size / 1024 / 1024).toFixed(2)}MB
          </p>
        </ImageInfo>
        <ProgressBar>
          <div
            role="progressbar"
            aria-valuenow={item.progress}
            aria-valuemin={0}
            aria-valuemax={100}
            style={{
              width: item.progress + '%',
              height: '100%',
              background: '#009CE0',
              borderRadius: '8px',
              transition: 'all 0.3s linear',
            }}
          />
        </ProgressBar>
      </div>
      <img
        src={DeleteMediaIcon}
        alt=""
        className="image-default"
        style={{
          position: 'absolute',
          top: '0',
          right: '0',
          cursor: 'pointer',
        }}
        onClick={onDeleteImage}
      />
    </ImagePreview>
  );
};

export default ImageAndVideoItem;
