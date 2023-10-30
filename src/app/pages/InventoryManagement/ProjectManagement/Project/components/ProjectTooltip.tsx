import React, { useRef, useState } from 'react';
import infoIcon from 'assets/icons/info.svg';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import { ClickAwayListener, Popper, styled } from '@mui/material';
import { FileProps } from 'app/pages/Register/slice/types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { FieldInput } from '../../ProjectInformation/slice/types';

interface Props {
  data: {
    name: string;
    certificateTypes: string[];
    fullAddress: string;
  };
}

const Title = styled('div')({
  color: '#6B7A99',
  fontWeight: 600,
  fontSize: '14px',
});

function ProjectTooltip({ data }: Props) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const changeText = (value: string) => {
    switch (value) {
      case 'SHM':
        return FieldInput['SHM'];
      case 'AJB':
        return FieldInput['AJB'];
      case 'HGB':
        return FieldInput['HGB'];
      case 'SHSRS':
        return FieldInput['SHSRS'];
      case 'GIRIK':
        return FieldInput['GIRIK'];
      case 'OTHER':
        return FieldInput['OTHER'];
      default:
        return '-';
    }
  };

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
              <div className="p-4 border-b border-b-[#D7E2EE]">
                <div className="flex flex-col ml-6">
                  <h1 className="leading-6 mt-2 font-bold text-[18px]">
                    {data.name}
                  </h1>
                </div>
                <div className="ml-6 mt-4">
                  <Title className="font-medium">
                    {t(translations.common.address)}
                  </Title>
                  <div className="mt-3 font-medium text-[#202A42]">
                    {data.fullAddress || '-'}
                  </div>
                </div>
                <div className="ml-6 mt-4">
                  <Title>{t(translations.projectManagement.cerType)}</Title>
                  <div className="mt-3 font-medium text-[#202A42]">
                    {data?.certificateTypes && data?.certificateTypes.length > 0
                      ? data?.certificateTypes.map((item: string, index) => (
                          <div className="mt-3 font-medium text-[#202A42]">{`${changeText(
                            item,
                          )}`}</div>
                        ))
                      : '-'}
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

export default React.memo(ProjectTooltip);
