import Provinces from 'app/components/DropdownInput/Provinces';
import { DropdownItem } from 'app/components/DropdownInput/type';
import classNames from 'classnames';
import React, { useState } from 'react';

interface Props {
  onContinue: (value?: DropdownItem) => void;
  className?: string;
}
function Create({ onContinue, className }: Props) {
  const [value, setValue] = useState<DropdownItem>();

  const handleContinue = () => onContinue(value);
  return (
    <div className={classNames('flex flex-col', className)}>
      <h2 className="text-[18px] leading-[22px] font-semibold">
        Upload Document
      </h2>
      <p className="text-[14px] leading-[32px] mt-2">Project Name</p>
      <Provinces
        className="w-[324px]"
        label="Project Name"
        placeholder="Select Project Name"
        size="SMALL"
        value={value}
        onChange={setValue}
      />
      <button
        onClick={handleContinue}
        disabled={!value}
        className={classNames(
          'bg-[#005FC5] rounded-lg text-white leading-7 font-semibold w-[135px] h-[48px] mt-6',
          {
            '!bg-[#D7E2EE]': !value,
          },
        )}
      >
        Continue
      </button>
    </div>
  );
}

export default Create;
