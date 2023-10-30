import React, { useRef, useState } from 'react';
import infoIcon from 'assets/icons/info.svg';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import {
  ClickAwayListener,
  FormControlLabel,
  Popper,
  styled,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { CustomStatus } from 'app/components/CustomSwitch';
import {
  EmployeeAccountData,
  RoleNameText,
} from 'types/EmployeeAccountManagement';
import Img from 'app/components/Img';

interface Props {
  data: EmployeeAccountData;
}

const MarginLeft = styled('div')({
  marginLeft: '-15px',
  color: '#6B7A99',
  alignSelf: 'center',
});

const DisplayFlex = styled('div')({
  display: 'flex',
});

function UserTooltip({ data }: Props) {
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
            <div className="rounded-2xl max-w-max bg-white leading-5 shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)] relative z-50">
              <div className="bottom-[100%] left-[50%] translate-x-[-50%] w-[30px] h-[30px] absolute overflow-hidden z-40">
                <div className="absolute w-full h-full bg-white skew-x-[30deg] skew-y-[18deg] rotate-[52deg] translate-y-[30px] shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)]"></div>
              </div>
              <div className="p-4 flex border-b border-b-[#D7E2EE]">
                <div className="w-[112px] h-[112px] rounded-lg overflow-hidden">
                  <Img
                    src={defaultAvatar}
                    className="w-full h-full rounded-lg object-cover border"
                    alt=""
                  />
                </div>
                <div className="flex flex-col ml-6">
                  <h1 className="leading-6 mt-2 font-bold text-[18px] text-[#202A42]">
                    {data?.fullName}
                  </h1>
                  <p className="mt-2 font-medium text-[#223250]">
                    {t(RoleNameText[data.role as keyof typeof RoleNameText])}
                  </p>
                  <p className="mt-2 font-[400] text-[#6B7A99]">{data.email}</p>
                  <p className="mt-2 font-[400] text-[#6B7A99]">
                    {data?.phone}
                  </p>
                  <div className="text-[14px] text-[#6B7A99] font-semibold mt-4">
                    {t(translations.developerInformation.accountStatus)}
                  </div>
                  <DisplayFlex>
                    <FormControlLabel
                      style={{ marginTop: '-10px' }}
                      control={
                        <CustomStatus
                          sx={{ m: 1, mt: 2 }}
                          checked={
                            String(data.status).toLowerCase() === 'active'
                          }
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
                    <MarginLeft>
                      {String(data.status).toLowerCase() === 'active'
                        ? 'Active'
                        : 'Inactive'}
                    </MarginLeft>
                  </DisplayFlex>
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
