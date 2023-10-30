import React, { useRef, useState } from 'react';
import infoIcon from 'assets/icons/info.svg';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import { ClickAwayListener, Popper } from '@mui/material';
import { FileProps } from 'app/pages/Register/slice/types';
import { Link } from 'react-router-dom';
import Img from 'app/components/Img';

interface Props {
  data: {
    fullName: string;
    email: string;
    phone: string;
    filePhoto?: FileProps;
    id: string;
  };
}

function UserTooltip({ data }: Props) {
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
            <div className="rounded-2xl w-[420px] bg-white leading-5 shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)] relative z-50">
              <div className="bottom-[100%] left-[50%] translate-x-[-50%] w-[30px] h-[30px] absolute overflow-hidden z-40">
                <div className="absolute w-full h-full bg-white skew-x-[30deg] skew-y-[18deg] rotate-[52deg] translate-y-[30px] shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)]"></div>
              </div>
              <div className="p-4 flex">
                <div className="w-[112px] h-[112px] rounded-lg overflow-hidden">
                  <Img
                    src={data.filePhoto?.url || defaultAvatar}
                    className="w-full h-full rounded-lg object-cover"
                    alt=""
                  />
                </div>
                <div className="flex flex-col ml-6">
                  <h1 className="leading-6 mt-2 font-bold text-[18px]">
                    {data.fullName}
                  </h1>
                  <p className="mt-3 font-medium">{data.email}</p>
                  <p className="mt-3 font-medium">{data.phone}</p>
                </div>
              </div>
            </div>
          </Popper>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(UserTooltip);
