import React, { useRef, useState } from 'react';
import infoIcon from 'assets/icons/info.svg';
import defaultAvatar from 'assets/images/default-avatar.jpg';
import { ClickAwayListener, Popper, styled } from '@mui/material';
import { FileProps } from 'app/pages/Register/slice/types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {
  data?: string[];
}

const Title = styled('div')({
  color: '#6B7A99',
  fontWeight: 600,
});

function TypeTooltip(props: Props) {
  const { data } = props;
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
            <div className="rounded-2xl w-[420px] bg-white leading-5 shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)] relative z-50">
              <div className="bottom-[100%] left-[50%] translate-x-[-50%] w-[30px] h-[30px] absolute overflow-hidden z-40">
                <div className="absolute w-full h-full bg-white skew-x-[30deg] skew-y-[18deg] rotate-[52deg] translate-y-[30px] shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)]"></div>
              </div>
              <div className="border-b border-b-[#D7E2EE] h-[200px]">
                <div className="p-4 flex border-b border-b-[#D7E2EE]">
                  <div className="font-[18px] w-full font-semibold text-center">
                    {t(translations.common.type).toUpperCase()}
                  </div>
                </div>
                {data &&
                  data.map((item: string, index: number) => (
                    <div className="p-3 flex">
                      <div className="ml-6 w-[50%] font-[16px] text-[#6B7A99] font-[500]">
                        {`${t(translations.projectManagement.houseType)} ${
                          index + 1
                        }`}
                      </div>
                      <div className="ml-6 w-[50%] font-[16px] text-[#202A42] font-[500]">
                        {item}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </Popper>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(TypeTooltip);
