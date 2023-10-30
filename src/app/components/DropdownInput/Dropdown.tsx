import { Popper, PopperProps } from '@mui/material';
import classNames from 'classnames';
import React, { useState } from 'react';
import { DropdownItem } from './type';

type Props = {
  onChange?: (newValue?: DropdownItem) => void;
  value?: DropdownItem;
  options: DropdownItem[];
  open: boolean;
  onClose: () => void;
  isFreeInput?: boolean;
} & Omit<PopperProps, 'onChange' | 'ref'>;

export default React.forwardRef(
  (props: Props, ref: React.LegacyRef<HTMLDivElement>) => {
    const {
      onChange,
      value,
      onClose,
      anchorEl,
      // ref: popperRef,
      options,
      isFreeInput = false,
      ...rest
    } = props;

    const [valueText, setValueText] = useState<string>('');

    const handleChange = (newValue: DropdownItem) => {
      onChange && onChange(newValue);
      onClose();
    };

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      setValueText(e.target.value);
    };

    const onEnterValue = (e: any) => {
      if (e.charCode === 13) {
        onChange &&
          onChange({
            value: valueText,
            label: valueText,
          });
        setValueText('');
        onClose();
      }
    };

    return (
      <Popper
        {...rest}
        anchorEl={anchorEl}
        sx={{
          width: (anchorEl as HTMLDivElement)?.getBoundingClientRect()?.width,
          zIndex: 10000,
          paddingBlock: '8px',
        }}
      >
        <div
          className="w-full py-2 bg-white overflow-hidden rounded-lg shadow"
          ref={ref}
        >
          <div className="w-full max-h-[232px] overflow-y-auto scrollbar">
            {options.length ? (
              options.map((item, index) => (
                <div
                  key={index}
                  className={classNames(
                    'min-h-[36px] hover:font-semibold hover:bg-[#005FC5] hover:text-white px-4 flex items-center cursor-pointer shrink-0 py-2',
                    {
                      'bg-[#005FC5] text-white font-semibold':
                        value?.value === item.value,
                    },
                  )}
                  onClick={() => handleChange(item)}
                >
                  {item.renderItem || item.label}
                </div>
              ))
            ) : (
              <div className="min-h-[36px] px-4 flex items-center shrink-0 py-2">
                No options
              </div>
            )}
          </div>
          {isFreeInput && (
            <div className="px-4 my-3">
              <input
                className="rounded-xl w-full border border-[#C6D7E0] py-[10px] px-5"
                placeholder="Input Text"
                onChange={handleChangeInput}
                onKeyPress={onEnterValue}
                value={valueText}
              />
            </div>
          )}
        </div>
      </Popper>
    );
  },
);
