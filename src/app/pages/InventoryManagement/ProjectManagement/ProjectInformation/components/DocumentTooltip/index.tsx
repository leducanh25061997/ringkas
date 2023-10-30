import React, { useRef, useState } from 'react';
import infoIcon from 'assets/icons/info.svg';
import { ClickAwayListener, Popper, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
  title: string;
  content: string;
}

const Title = styled('div')({
  color: 'white',
  fontWeight: 600,
});

function DocumentTooltip(props: Props) {
  const { title, content } = props;
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  const ref = useRef<HTMLImageElement>(null);

  const handleClick = () => {
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
            <div className="rounded-2xl w-[420px] bg-[#005FB6] leading-5 relative z-50">
              <div className="bottom-[100%] left-[50%] translate-x-[-50%] w-[30px] h-[30px] absolute overflow-hidden z-40">
                <div className="absolute w-full h-full bg-[#005FB6] skew-x-[30deg] skew-y-[18deg] rotate-[52deg] translate-y-[30px] shadow-[0px_2px_7px_1px_rgba(0,0,0,0.5)]"></div>
              </div>
              <div className="p-4 border-b border-b-[#D7E2EE]">
                <div className="flex flex-col ml-6">
                  <Title className="font-medium">{title}</Title>
                  <div className="mt-3 text-white">{content}</div>
                </div>
              </div>
            </div>
          </Popper>
        ) : null}
      </div>
    </ClickAwayListener>
  );
}

export default React.memo(DocumentTooltip);
