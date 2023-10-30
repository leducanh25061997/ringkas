import { ClickAwayListener, Popper } from '@mui/material';
import infoIcon from 'assets/icons/info.svg';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import React, { useRef, useState } from 'react';
// import { Link } from 'react-router-dom';
import Img from 'app/components/Img';
// import { useTranslation } from 'react-i18next';
// import { translations } from 'locales/translations';

interface Props {
  /**
   * @default true
   */
  showActiveStatus?: boolean;
  data: {
    fullName: string;
    email: string;
    phone: string;
    userUuid?: string;
  };
}

// TO DO: support multi language

function UserTooltip({ data, showActiveStatus = true }: Props) {
  const [open, setOpen] = useState(false);

  // const { t } = useTranslation();

  const ref = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };
  if (!data.fullName) return null;
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
              <div className="p-4 flex border-b border-b-[#D7E2EE]">
                <div className="w-[112px] h-[112px] rounded-lg overflow-hidden shrink-0">
                  <Img
                    src={defaultAvatar}
                    className="w-full h-full rounded-lg object-cover border"
                    alt=""
                  />
                </div>
                <div className="flex flex-col pl-6 w-[calc(100%-112px)]">
                  <h1 className="leading-6 mt-2 font-bold text-[18px] break-all">
                    {data.fullName || '-'}
                  </h1>
                  <p className="mt-3 font-medium text-[#6B7A99] break-all">
                    {data.email || '-'}
                  </p>
                  <p className="mt-3 font-medium text-[#6B7A99]">
                    {data.phone || '-'}
                  </p>
                  {showActiveStatus && (
                    <>
                      <p className="mt-6 text-[14px] font-semibold text-[#6B7A99]">
                        Account Status
                      </p>
                      <div className="mt-2 flex items-center">
                        <div className="w-3 h-3 rounded-full bg-[#39C24F] mr-2"></div>
                        <p className="text-[#6B7A99]">Active</p>
                      </div>
                    </>
                  )}
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
