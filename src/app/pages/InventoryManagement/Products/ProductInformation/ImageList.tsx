import React, { useState } from 'react';
import classNames from 'classnames';
// @ts-ignore
import Slider from 'react-slick';
import { Modal } from '@mui/material';
import closeV2 from 'assets/icons/close-v2.svg';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import previousIcon from 'assets/icons/previous-icon.svg';
import nextIcon from 'assets/icons/next-icon.svg';
import playVideoIcon from 'assets/icons/play-video.svg';

interface FileUpload {
  s3Key?: string;
  url?: string;
}

interface Props {
  imageList?: any;
  videoList?: any;
}

const RootContainer = styled.div`
  height: 548px;

  .slick-slider {
    height: 100% !important;

    .slick-list {
      height: 100% !important;
    }
  }
`;

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <img
      className="absolute z-10 right-0 top-1/2 -translate-y-1/2 cursor-pointer"
      src={nextIcon}
      alt="previous icon"
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <img
      className="absolute z-10 left-0 top-1/2 -translate-y-1/2 cursor-pointer"
      src={previousIcon}
      alt="next icon"
      onClick={onClick}
    />
  );
};

const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  prevArrow: <PrevArrow />,
  nextArrow: <NextArrow />,
};

const ImageList = (props: Props) => {
  const { imageList, videoList } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <div className="cursor-pointer" onClick={() => setOpen(true)}>
        {imageList && !videoList && imageList.length === 1 && (
          <div>
            <img
              className="rounded-[8px] h-[260px] object-cover"
              src={imageList[0].url}
              alt={imageList[0].url}
            />
          </div>
        )}
        {imageList &&
          videoList &&
          imageList.length === 1 &&
          videoList.length > 0 && (
            <div>
              <img
                className="rounded-[8px] h-[260px] object-cover"
                src={imageList[0].url}
                alt={imageList[0].url}
              />
              <div className="flex justify-start mt-2">
                {videoList && videoList.length > 0 && (
                  <div className="w-[102px] h-[80px] rounded-[8px] relative mr-2 relative">
                    <video className="h-full w-full rounded-[8px]">
                      <source src={videoList[0].url} />
                    </video>
                    <img
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      src={playVideoIcon}
                      alt="play video"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        {imageList && imageList.length > 1 && (
          <div>
            <img
              className="rounded-[8px] w-full h-[260px] object-cover"
              src={imageList[0].url}
              alt={imageList[0].url}
            />
            <div className="flex justify-start mt-2">
              {videoList && videoList.length > 0 && (
                <div className="w-[102px] h-[80px] rounded-[8px] relative mr-2 relative">
                  <video className="h-full w-full rounded-[8px]">
                    <source src={videoList[0].url} />
                  </video>
                  <img
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    src={playVideoIcon}
                    alt="play video"
                  />
                </div>
              )}
              {(videoList && videoList.length > 0
                ? imageList.slice(1, 3)
                : imageList.slice(1, 4)
              ).map((item: FileUpload, index: number) => (
                <div
                  key={index}
                  className={classNames(
                    'w-[102px] h-[80px] rounded-[8px] relative',
                    { relative: index === 2 },
                    { 'mr-2': index !== 2 },
                  )}
                >
                  <img
                    className="object-cover w-full h-full rounded-[8px]"
                    key={index}
                    src={item.url}
                    alt={item.url}
                  />

                  {videoList && videoList.length > 0 ? (
                    <>
                      {index === 1 && imageList.length - 3 > 0 && (
                        <div className="absolute w-full h-full bg-[#000] opacity-50 z-10 rounded-[8px] text-[#fff] text-[20px] font-bold top-0 flex items-center justify-center">
                          +{imageList.length - 3}
                        </div>
                      )}
                    </>
                  ) : (
                    <>
                      {index === 2 && imageList.length - 4 > 0 && (
                        <div className="absolute w-full h-full bg-[#000] opacity-50 z-10 rounded-[8px] text-[#fff] text-[20px] font-bold top-0 flex items-center justify-center">
                          +{imageList.length - 4}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <div className="p-6 bg-[#fff] w-[960px] h-[648px] m-auto rounded-2xl absolute top-[50%] left-[50%] -translate-y-2/4 -translate-x-2/4">
          <div className="flex justify-end mb-4">
            <img
              src={closeV2}
              alt={'closeV2'}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <RootContainer>
            <Slider {...settings}>
              {imageList &&
                imageList.map((item: FileUpload, idx: number) => (
                  <div key={idx}>
                    <img
                      className="rounded-[8px] w-full h-[532px] object-contain"
                      src={item.url}
                      alt={item.url}
                    />
                  </div>
                ))}
              {videoList &&
                videoList.map((item: FileUpload, idx: number) => (
                  <div key={idx}>
                    <video className="h-[532px] w-full" controls>
                      <source src={item.url} type="video/mp4" />
                    </video>
                  </div>
                ))}
            </Slider>
          </RootContainer>
        </div>
      </Modal>
    </>
  );
};

export default React.memo(ImageList);
