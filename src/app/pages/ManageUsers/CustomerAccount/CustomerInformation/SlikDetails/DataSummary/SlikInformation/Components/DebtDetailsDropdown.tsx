import Dropdown from 'app/components/DropdownInput/Dropdown';
import { DropdownItem } from 'app/components/DropdownInput/type';
import useOnClickOutside from 'app/hooks/useOnClickOutside';
import React, { useRef, useState } from 'react';

import arrowDownIcon from 'assets/icons/arrow-down-v2.svg';
import classNames from 'classnames';

interface Props {
  value?: DropdownItem;
  options?: DropdownItem[];
  onChange: (newValue?: DropdownItem) => void;
}

function DebtDetailsDropdown({ value, options, onChange }: Props) {
  const [openDropdown, setOpenDropdown] = useState(false);
  const rootContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(
    rootContainerRef,
    () => setOpenDropdown(false),
    dropdownRef,
  );

  const handleChangeValue = (newValue?: DropdownItem) => {
    setOpenDropdown(false);
    onChange(newValue);
  };

  return (
    <>
      <div
        className="mb-6 w-full h-[56px] flex items-center px-6 bg-[#F8F9FA] rounded-2xl justify-between cursor-pointer"
        onClick={() => {
          setOpenDropdown(prev => !prev);
        }}
        ref={rootContainerRef}
      >
        <p className="font-bold text-ellipsis overflow-hidden whitespace-nowrap">
          Debt Details: {value?.label}
        </p>
        <img
          src={arrowDownIcon}
          width={30}
          height={30}
          alt=""
          className={classNames({ 'rotate-180': openDropdown })}
        />
      </div>
      {options && (
        <Dropdown
          ref={dropdownRef}
          keepMounted
          options={options}
          open={openDropdown}
          onClose={() => setOpenDropdown(false)}
          value={value}
          onChange={handleChangeValue}
          anchorEl={rootContainerRef.current}
          placement="bottom"
        />
      )}
    </>
  );
}

export default DebtDetailsDropdown;
