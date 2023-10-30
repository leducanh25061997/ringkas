import { Box, Dialog, Stack, Typography } from '@mui/material';
import React from 'react';
import styled from 'styled-components';
import Carousel from '../Carousel';

interface Props {
  imgNumber: number;
  images: any;
  setDataImages: (data: ImageType[]) => void;
  dataImages: ImageType[];
  openDialog: boolean;
  setOpenDialog: (data: boolean) => void;
}

interface ImageType {
  s3Key?: string;
  url: string;
  originalName?: string;
}

const TableProductImage = styled.div`
  padding: 9px 0;
  .product-image {
    display: flex;
    height: 40px;
    .product-image__item {
      width: 67px;
      border-radius: 10px;
      overflow: hidden;
    }
    & .product-image__item:nth-child(2) {
      margin-left: 10px;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.5);
      overflow: hidden;
      position: relative;
      & .number-product-image {
        position: absolute;
        top: 0px;
        left: 24px;
      }
      &:hover {
        cursor: pointer;
      }
    }
  }
`;

const Img = styled.img`
  width: 70px;
  height: 70px;
  object-fit: contain;
  border: 1px solid #c6d7e0;
  border-radius: 8px;
`;

const ButtonMore = styled.div`
  position: relative;
  background: rgba(0, 0, 0, 0.5);
  height: 70px;
  border-radius: 8px;
  margin-right: 10px;
  cursor: pointer;
  margin-top: 8px;
`;

const ShowMoreImage = React.memo((props: Props) => {
  const {
    images,
    imgNumber,
    setDataImages,
    dataImages,
    setOpenDialog,
    openDialog,
  } = props;

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const showMoreImage = (data: ImageType[]) => {
    setDataImages(data);
    setOpenDialog(true);
  };

  return (
    <Stack flexDirection="row" flexWrap="wrap" width="160px">
      {images.map(
        (image: ImageType, index: number) =>
          index < 4 && (
            <>
              {index === 3 ? (
                <ButtonMore onClick={() => showMoreImage(images)}>
                  <Box>
                    <Img src={image.url || ''} style={{ opacity: 0.5 }}></Img>
                  </Box>
                  <div
                    style={{
                      position: 'absolute',
                      top: '20px',
                      left: '24px',
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: '600',
                        color: '#FFFFFF',
                        fontSize: '20px',
                      }}
                    >
                      {`${images.length - 4} +`}
                    </Typography>
                  </div>
                </ButtonMore>
              ) : (
                <Box
                  sx={index > 1 ? { width: '50%', mt: 1 } : { width: '50%' }}
                >
                  <Img src={image.url || ''}></Img>
                </Box>
              )}
            </>
          ),
      )}
      {dataImages && dataImages.length > 0 && (
        <Dialog onClose={handleCloseDialog} open={openDialog}>
          <Carousel dataImages={dataImages} />
        </Dialog>
      )}
    </Stack>
  );
});

export default ShowMoreImage;
