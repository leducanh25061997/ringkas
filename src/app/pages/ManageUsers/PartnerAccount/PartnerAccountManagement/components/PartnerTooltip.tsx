import React, { useRef, useState } from 'react';
import positionIcon from 'assets/icons/position.svg';
import infoIcon from 'assets/icons/info.svg';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import {
  ClickAwayListener,
  FormControlLabel,
  Popper,
  styled,
} from '@mui/material';
import { FileProps } from 'app/pages/Register/slice/types';
import { Link } from 'react-router-dom';
import { PartnerAccountForm } from 'types/PartnerAccountManagement';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
interface Props {
  data: PartnerAccountForm;
}

function PartnerTooltip({ data }: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

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
            <div className="rounded-2xl w-[420px] bg-white leading-5 shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)] relative z-50 w-[max-content]">
              <div className="bottom-[100%] left-[50%] translate-x-[-50%] w-[30px] h-[30px] absolute overflow-hidden z-40">
                <div className="absolute w-full h-full bg-white skew-x-[30deg] skew-y-[18deg] rotate-[52deg] translate-y-[30px] shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)]"></div>
              </div>
              <div className="p-4 flex">
                <div className="w-[112px] h-[112px] rounded-lg overflow-hidden">
                  <img
                    src={
                      (data?.company?.fileLogo &&
                        data?.company?.fileLogo[0]?.url) ||
                      positionIcon
                    }
                    className="w-full h-full rounded-lg"
                    alt=""
                  />
                </div>
                <div className="flex flex-col ml-6">
                  <h1 className="leading-6 mt-2 font-bold text-[18px]">
                    {data?.company?.name}
                  </h1>
                  <p className="mt-3  text-[#6B7A99] text-[14px] max-w-[250px]">
                    {data?.company?.address}
                  </p>
                </div>
              </div>
              <div className="pl-4 pr-4 pb-4 border-b border-b-[#D7E2EE]">
                <div className="leading-6 font-semibold text-[14px]">PIC</div>
                <div className="flex">
                  <div className="w-[200px]">
                    <div className="font-semibold text-[14px] text-[#6B7A99]">
                      {t(translations.developerInformation.phoneNumber)}
                    </div>
                    <div>{data?.kyc?.phone}</div>
                  </div>
                  <div className="w-[55%]">
                    <div className="font-semibold text-[14px] text-[#6B7A99]">
                      {t(translations.common.email)}
                    </div>
                    <div>{data?.email}</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="leading-6 font-semibold text-[14px]">
                  {t(translations.partnerManagement.company)}
                </div>
                <div className="flex">
                  <div className="w-[200px]">
                    <div className="font-semibold text-[14px] text-[#6B7A99]">
                      {t(translations.developerInformation.phoneNumber)}
                    </div>
                    <div>{data?.company?.phone}</div>
                  </div>
                  <div className="w-[55%]">
                    <div className="font-semibold text-[14px] text-[#6B7A99]">
                      {t(translations.common.email)}
                    </div>
                    <div>{data?.company?.email}</div>
                  </div>
                </div>
              </div>
            </div>
          </Popper>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(PartnerTooltip);
