import React, { useRef, useState } from 'react';
import infoIcon from 'assets/icons/info.svg';
import { ClickAwayListener, Popper, Typography } from '@mui/material';
import defaultDocument from '/assets/images/defaultDocument.png';

interface Props {
  data: any;
}

function Index({ data }: Props) {
  const [open, setOpen] = useState(false);

  const ref = useRef<HTMLImageElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    e.stopPropagation();
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  return (
    <ClickAwayListener
      mouseEvent="onMouseDown"
      touchEvent="onTouchStart"
      onClickAway={handleClickAway}
    >
      <div className="relative inline-block !w-[30px] h-[30px] shrink-0">
        <img
          src={infoIcon}
          width={30}
          height={30}
          alt=""
          ref={ref}
          onClick={handleClick}
          className="cursor-pointer"
        />
        {open ? (
          <Popper
            anchorEl={ref.current}
            open={true}
            modifiers={[
              {
                name: 'flip',
                enabled: false,
                options: {
                  altBoundary: false,
                  rootBoundary: 'viewport',
                },
              },
            ]}
            sx={{ zIndex: 1000, paddingTop: '16px' }}
          >
            <div className="p-6 bg-[#fff] rounded-[16px] w-[424px] shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)] relative">
              <div className="bottom-[100%] left-[50%] translate-x-[-50%] w-[30px] h-[30px] absolute overflow-hidden z-40">
                <div className="absolute w-full h-full bg-white skew-x-[30deg] skew-y-[18deg] rotate-[52deg] translate-y-[30px] shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)]"></div>
              </div>
              <div className="flex">
                <div className="max-w-[112px] max-h-[112px] rounded-[8px] mr-4">
                  {data?.images && data?.images.length > 0 && (
                    <img
                      className="object-cover w-full h-full"
                      src={data?.images[0].url}
                      alt="product name"
                    />
                  )}
                </div>
                <div className="w-full">
                  <Typography
                    sx={{
                      fontSize: '18px',
                      color: '#202A42',
                      fontWeight: '700',
                      marginBottom: '8px',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {data?.projectName}
                  </Typography>
                  <p className="text-[#6B7A99] text-[16px] mb-2">
                    {data.type} / {data.unit}
                  </p>
                  <p className="text-[#6B7A99] text-[14px]">
                    {data?.projectAddress ? data.projectAddress : '-'}
                  </p>
                </div>
              </div>
              <div className="flex mt-6 w-[263px]">
                <div className="w-[66px]">
                  <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mb-2">
                    Bedroom
                  </p>
                  <p className="text-[#202A42] text-[16px] font-medium leading-[20px]">
                    {data?.facility?.numberOfRoom
                      ? data?.facility?.numberOfRoom
                      : '-'}
                  </p>
                </div>
                <div className="ml-[100px]">
                  <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mb-2">
                    Bathroom
                  </p>
                  <p className="text-[#202A42] text-[16px] font-medium leading-[20px]">
                    {data?.facility?.numberOfBathroom
                      ? data?.facility?.numberOfBathroom
                      : '-'}
                  </p>
                </div>
              </div>
              <div className="flex mt-6 w-[263px]">
                <div className="w-[66px]">
                  <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mb-2">
                    Land
                  </p>
                  <p className="text-[#202A42] text-[16px] font-medium leading-[20px]">
                    {data?.landArea} m2
                  </p>
                </div>
                <div className="ml-[100px]">
                  <p className="text-[#6B7A99] text-[14px] font-semibold leading-[20px] mb-2">
                    Building
                  </p>
                  <p className="text-[#202A42] text-[16px] font-medium leading-[20px]">
                    {data?.buildingArea} m2
                  </p>
                </div>
              </div>
            </div>
          </Popper>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(Index);
