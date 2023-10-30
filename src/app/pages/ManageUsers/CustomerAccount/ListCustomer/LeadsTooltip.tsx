import { ClickAwayListener, Popper } from '@mui/material';
import infoIcon from 'assets/icons/info.svg';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import React, { useRef, useState } from 'react';
import Img from 'app/components/Img';
import { LeadInformation } from './types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {
  data: LeadInformation;
}

function LeadsTooltip({ data }: Props) {
  const [open, setOpen] = useState(false);

  const { t } = useTranslation();

  const ref = useRef<HTMLImageElement>(null);

  const handleClick = () => {
    setOpen(prev => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  if (!data?.company?.name) return null;
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
            <div className="rounded-2xl w-[424px] bg-white leading-5 shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)] relative z-50">
              <div className="bottom-[100%] left-[50%] translate-x-[-50%] w-[30px] h-[30px] absolute overflow-hidden z-40">
                <div className="absolute w-full h-full bg-white skew-x-[30deg] skew-y-[18deg] rotate-[52deg] translate-y-[30px] shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)]"></div>
              </div>
              <div className="p-4 flex">
                <div className="w-[112px] h-[112px] rounded-lg overflow-hidden shrink-0">
                  <Img
                    src={
                      data.company?.fileLogo
                        ? data.company.fileLogo[0].url
                        : defaultAvatar
                    }
                    className="w-full h-full rounded-lg object-cover border"
                    alt=""
                  />
                </div>
                <div className="flex flex-col pl-6 w-[calc(100%-112px)]">
                  <p className="font-bold text-[18px] leading-6 text-[#202A42] overflow-hidden text-ellipsis">
                    {data.company?.name || '-'}
                  </p>
                  <p className="mt-2 text-[#6B7A99] text-[14px] leading-[140%] break-words">
                    {data.company?.address || '-'}
                  </p>
                </div>
              </div>
              <p className="text-[#202A42] text-[14px] font-semibold leading-5 px-6 uppercase">
                {t(translations.customerList.pic)}
              </p>
              <div className="mt-2 px-6 flex pb-[22px] border-b border-b-[#D7E2EE]">
                <div className="w-[40%] shrink-0 pr-6">
                  <p className="text-[#6B7A99] text-[14px] leading-5 font-semibold">
                    {t(translations.customerList.phoneNumber)}
                  </p>
                  <p className="leading-[22px] font-medium mt-2">
                    {data.kyc?.phone || '-'}
                  </p>
                </div>
                <div className="w-[60%]">
                  <p className="text-[#6B7A99] text-[14px] leading-5 font-semibold">
                    {t(translations.customerList.email)}
                  </p>
                  <p className="leading-[22px] font-medium mt-2 break-words">
                    {data.kyc?.email || '-'}
                  </p>
                </div>
              </div>
              <p className="text-[#202A42] text-[14px] font-semibold leading-5 mt-4 px-6 uppercase">
                {t(translations.customerList.company)}
              </p>
              <div className="mt-2 px-6 flex pb-[22px]">
                <div className="w-[40%] shrink-0 pr-6">
                  <p className="text-[#6B7A99] text-[14px] leading-5 font-semibold">
                    {t(translations.customerList.phoneNumber)}
                  </p>
                  <p className="leading-[22px] font-medium mt-2">
                    {data.company?.phone || '-'}
                  </p>
                </div>
                <div className="w-[60%]">
                  <p className="text-[#6B7A99] text-[14px] leading-5 font-semibold">
                    {t(translations.customerList.email)}
                  </p>
                  <p className="leading-[22px] font-medium mt-2 break-words">
                    {data.company?.email || '-'}
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

export default React.memo(LeadsTooltip);
