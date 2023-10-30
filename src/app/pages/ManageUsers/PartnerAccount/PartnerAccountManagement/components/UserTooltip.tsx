import React, { useRef, useState } from 'react';
import infoIcon from 'assets/icons/info.svg';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import {
  ClickAwayListener,
  FormControlLabel,
  Popper,
  styled,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { PartnerAccountForm } from 'types/PartnerAccountManagement';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { CustomStatus } from 'app/components/CustomSwitch';

interface Props {
  data: PartnerAccountForm;
  hideViewAllButton?: boolean;
  hideStatusToggle?: boolean;
  isActive?: (formData: PartnerAccountForm) => boolean;
}

const MarginLeft = styled('div')({
  marginLeft: '-15px',
  color: '#6B7A99',
  alignSelf: 'center',
});

const DisplayFlex = styled('div')({
  display: 'flex',
  alignItems: 'center',
});

function UserTooltip({
  data,
  hideViewAllButton = false,
  hideStatusToggle = false,
  isActive,
}: Props): JSX.Element {
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

  const handleOnChangeStatus = (id: string) => {};
  const contentIsActive = isActive
    ? isActive(data)
    : data.status?.toLowerCase() === 'active';
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
                <div className="w-[112px] h-[112px] rounded-lg overflow-hidden">
                  <img
                    src={data.filePhoto?.url || defaultAvatar}
                    className="w-full h-full rounded-lg object-contain"
                    alt=""
                  />
                </div>
                <div className="flex flex-col ml-6">
                  <h1 className="leading-6 mt-2 font-bold text-[18px]">
                    {data.kyc.fullName}
                  </h1>
                  <p className="mt-3 font-medium">{data.email}</p>
                  <p className="mt-3 font-medium">{data.kyc.phone}</p>
                  <div className="text-[14px] text-[#6B7A99] font-semibold mt-4">
                    {t(translations.developerInformation.accountStatus)}
                  </div>
                  <DisplayFlex>
                    {hideStatusToggle ? (
                      <div
                        style={{
                          backgroundColor: contentIsActive
                            ? '#39C24F'
                            : '#6B7A99',
                        }}
                        className={`w-[12px] h-[12px] rounded-full mr-[24px]`}
                      />
                    ) : (
                      <FormControlLabel
                        style={{ marginTop: '-10px' }}
                        control={
                          <CustomStatus
                            sx={{ m: 1, mt: 2 }}
                            checked={contentIsActive}
                            onChange={e => {
                              handleOnChangeStatus(data.userUuid || '');
                            }}
                            onClick={e => {
                              e.stopPropagation();
                            }}
                          />
                        }
                        label={''}
                      />
                    )}
                    <MarginLeft>
                      {contentIsActive
                        ? t(translations.common.active)
                        : t(translations.common.inactive)}
                    </MarginLeft>
                  </DisplayFlex>
                </div>
              </div>
              {!hideViewAllButton && (
                <div className="h-[52px] w-full flex items-center justify-center text-[#1872E7]">
                  <Link to={'#'} className="cursor-pointer font-semibold">
                    {t(translations.common.viewAll)}
                  </Link>
                </div>
              )}
            </div>
          </Popper>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(UserTooltip);
