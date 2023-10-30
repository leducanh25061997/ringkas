import { ClickAwayListener, Popper } from '@mui/material';
import React, { useRef, useState } from 'react';
import arrowDownIcon from 'assets/icons/arrow-down-v2.svg';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { DropdownBank } from '../slice/types';

interface Props {
  value: string;
  onChange: (newValue: string) => void;
  disabled?: boolean;
}
function TasksDropdown({ value, onChange, disabled }: Props) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownBtnRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const dropdownOptions: string[] = [
    'Bank Negara Indonesia',
    'Bank Central Asia',
  ];

  const handleChangeDropdownValue = (newValue: string) => {
    onChange(newValue);
    setOpenDropdown(false);
  };

  const handleClickSelect = () => {
    if (disabled) return;
    setOpenDropdown(prev => !prev);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpenDropdown(false)}>
      <div className="w-full relative">
        <div
          onClick={handleClickSelect}
          ref={dropdownBtnRef}
          className="cursor-pointer relative flex justify-between px-4 py-[10px] items-center border border-[#D7E2EE] rounded-lg"
        >
          <p className="text-[16px] font-[500] text-[#202A42]">
            {value || t(translations.common.selectBank)}
          </p>
          <img
            src={arrowDownIcon}
            alt=""
            width={20}
            height={20}
            className={classNames({ 'rotate-180': openDropdown })}
          />
        </div>
        {openDropdown && (
          <Popper
            anchorEl={dropdownBtnRef.current}
            open={true}
            sx={{
              zIndex: 9999,
              paddingBlock: '8px',
              width: dropdownBtnRef.current?.clientWidth || 500,
            }}
          >
            <div className="bg-white py-4 rounded-lg shadow-xl border border-[#D7E2EE]">
              <div>
                {dropdownOptions.map(item => (
                  <div
                    onClick={() => handleChangeDropdownValue(item)}
                    className={classNames(
                      'cursor-pointer hover:bg-stone-100 px-4 py-2',
                      {
                        'bg-stone-100': item === value,
                      },
                    )}
                    key={item}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </Popper>
        )}
      </div>
    </ClickAwayListener>
  );
}

export default TasksDropdown;
