import React, { useState } from 'react';
import styled from 'styled-components';

import { Typography } from '@mui/material';

import deleteIcon from '../../../../../assets/icons/delete.svg';
import UploadMedia from '../../../../components/UploadMedia';

const WrapperStyle = styled.div`
  width: 892px;
  background-color: #fff;
  border-radius: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  border-radius: 8px 8px 0 0;
  background: #ffdd00;
  height: 64px;

  padding: 18px 32px;
`;

interface Props {
  onClose?: () => void;
  fetchData?: () => void;
}

const UploadImageAndVideo = (props: Props) => {
  const { onClose, fetchData } = props;
  const [isViewAll, setViewAll] = useState<boolean>(false);

  return (
    <WrapperStyle style={{ overflowY: isViewAll ? 'auto' : 'hidden' }}>
      <Header>
        <Typography
          sx={{
            color: '#223250',
            fontSize: '18px',
            fontWeight: '600',
            lineHeight: '28px',
          }}
        >
          Upload Photo & Video
        </Typography>
        <img
          src={deleteIcon}
          width={24}
          height={24}
          alt=""
          style={{ cursor: 'pointer' }}
          onClick={onClose}
        />
      </Header>
      <UploadMedia
        onClose={onClose}
        fetchData={fetchData}
        setViewAll={setViewAll}
        isViewAll={isViewAll}
      />
    </WrapperStyle>
  );
};

export default UploadImageAndVideo;
