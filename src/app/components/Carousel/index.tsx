import React from 'react';
import styled from 'styled-components';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import IconButton from '@mui/material/IconButton';

interface ImageType {
  s3key?: string;
  url?: string;
}

const RootCarousel = styled.div`
  padding: 20px;
  & .selected-image {
    width: 100%;
    height: 300px;
    margin-bottom: 8px;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  & .carousel {
    position: relative;
  }

  & .carousel__images {
    display: flex;
    max-width: 100%;
    overflow-x: hidden;
  }

  & .carousel__image-selected {
    border: 3px solid #ffa700 !important;
  }

  & .carousel__image {
    margin-right: 10px;
    height: 150px;
    min-width: 150px;
    border: 3px solid #ffa70000;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
  }

  & .carousel__button {
    background: rgba(0, 0, 0, 0.5);
    color: #ffffff;
    position: absolute;
    top: 40%;
  }

  & .carousel__button-left {
    left: 10px;
  }

  & .carousel__button-right {
    right: 10px;
  }
`;

interface Props {
  dataImages: ImageType[];
}

const Carousel = (props: Props) => {
  const { dataImages } = props;
  const [images, setImages] = React.useState<ImageType[]>();
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);
  const [selectedImage, setSelectedImage] = React.useState<ImageType>();
  const carouselItemsRef = React.useRef<HTMLDivElement[] | null[]>([]);

  React.useEffect(() => {
    if (dataImages && dataImages.length > 0) {
      setImages(dataImages);
    }
  }, [dataImages]);

  React.useEffect(() => {
    if (images && images[0]) {
      carouselItemsRef.current = carouselItemsRef.current.slice(
        0,
        images.length,
      );
      setSelectedImageIndex(0);
      setSelectedImage(images[0]);
    }
  }, [images]);

  const handleSelectedImageChange = (newIdx: number) => {
    if (images && images.length > 0) {
      setSelectedImage(images[newIdx]);
      setSelectedImageIndex(newIdx);
      if (carouselItemsRef?.current[newIdx]) {
        carouselItemsRef?.current[newIdx]?.scrollIntoView({
          inline: 'center',
          behavior: 'smooth',
        });
      }
    }
  };

  const handleRightClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex + 1;
      if (newIdx >= images.length) {
        newIdx = 0;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  const handleLeftClick = () => {
    if (images && images.length > 0) {
      let newIdx = selectedImageIndex - 1;
      if (newIdx < 0) {
        newIdx = images.length - 1;
      }
      handleSelectedImageChange(newIdx);
    }
  };

  return (
    <RootCarousel>
      {images && images.length > 0 && selectedImage && (
        <div className="carousel-container">
          <img
            style={{
              width: '100%',
              height: '100%',
              marginBottom: '1rem',
              borderRadius: '8px',
            }}
            src={selectedImage?.url}
            alt=""
          />
          {/* <div
            className="selected-image"
            style={{ backgroundImage: `url(${selectedImage?.url})` }}
          /> */}
          <div className="carousel">
            <div className="carousel__images">
              {images &&
                images.map((image, idx) => (
                  <img
                    onClick={() => handleSelectedImageChange(idx)}
                    style={{
                      width: '100%',
                      height: '100px',
                      objectFit: 'cover',
                    }}
                    className={`carousel__image ${
                      selectedImageIndex === idx && 'carousel__image-selected'
                    }`}
                    src={image.url}
                    ref={el => (carouselItemsRef.current[idx] = el)}
                    alt=""
                  />
                  // <div
                  //   onClick={() => handleSelectedImageChange(idx)}
                  //   style={{ backgroundImage: `url(${image.url})` }}
                  //   key={idx}
                  //   className={`carousel__image ${
                  //     selectedImageIndex === idx && 'carousel__image-selected'
                  //   }`}
                  //   ref={el => (carouselItemsRef.current[idx] = el)}
                  // />
                ))}
            </div>
            <IconButton
              size="large"
              className="carousel__button carousel__button-left"
              onClick={handleLeftClick}
            >
              <ArrowBackIosNewIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              size="large"
              className="carousel__button carousel__button-right"
              onClick={handleRightClick}
            >
              <ArrowForwardIosIcon fontSize="inherit" />
            </IconButton>
          </div>
        </div>
      )}
    </RootCarousel>
  );
};

export default Carousel;
