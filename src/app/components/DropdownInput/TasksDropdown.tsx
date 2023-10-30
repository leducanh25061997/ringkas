import { ClickAwayListener, Popper } from '@mui/material';
import React, { useRef, useState } from 'react';
import arrowDownIcon from 'assets/icons/arrow-down-v2.svg';
import classNames from 'classnames';
import { DropdownItem } from 'app/pages/ManageUsers/CustomerAccount/PreKprVerification/types';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';

interface Props {
  value: DropdownItem;
  onChange: (newValue: DropdownItem) => void;
  disabled?: boolean;
}

function TasksDropdown({
  value = { label: 'No Action Needed', value: 'NO_ACTION_NEEDED' },
  onChange,
  disabled,
}: Props) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const dropdownBtnRef = useRef<HTMLDivElement>(null);

  const { t } = useTranslation();

  const dropdownOptions: DropdownItem[] = [
    {
      label: t(translations.dataVerification.noActionNeeded),
      value: 'NO_ACTION_NEEDED',
    },
    {
      label: t(translations.dataVerification.editByAdmin),
      value: 'EDITED_BY_ADMIN',
    },
    {
      label: t(translations.dataVerification.requestRevision),
      value: 'REQUEST_REVISION',
    },
  ];

  const handleChangeDropdownValue = (newValue: DropdownItem) => {
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
          <p className="text-[14px] font-semibold text-[#202A42]">
            {value.label}
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
                        'bg-stone-100': item.value === value.value,
                      },
                    )}
                    key={item.value}
                  >
                    {item.label}
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
