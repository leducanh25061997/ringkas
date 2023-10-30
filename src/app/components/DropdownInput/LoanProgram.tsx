import { FormControl, MenuItem } from '@mui/material';
import { useEffect, useState, useCallback } from 'react';
import { Control, Controller, RegisterOptions } from 'react-hook-form';
import { axiosClient } from 'services/api/axios';
import { DropdownItem } from './type';
import ArrowDownV2 from 'assets/icons/arrow-down-v2.svg';
import dropdownIcon from 'assets/icons/dropdown.svg';

interface Props {
  className?: string;
  name?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  value?: DropdownItem;
  onChange?: (newValue?: DropdownItem) => void;
  onBlur?: (currentValue?: DropdownItem) => void;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  bankUuid?: string;
}

type FormValues = Record<string, DropdownItem>;

interface FieldProps extends Props {
  control: Control<FormValues>;
  rules?: RegisterOptions;
  name: string;
}

export const ControlledLoanProgramDropdown = (props: FieldProps & Props) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    control,
    name,
    rules,
    // value,
    onChange,
    // errorText,
    // error,
    // options,
    bankUuid,
    ...rest
  } = props;

  const [options, setOptions] = useState<any[]>([]);
  const [destinationOptionIndex, setDestinationOptionIndex] =
    useState<number>(3);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  useEffect(() => {
    if (!bankUuid) return;
    setOptions([]);
    axiosClient
      .get(`/console/bank/${bankUuid}/loans?statusList=ACTIVE`)
      .then(res => {
        if (!res.data.data) {
          setOptions([]);
        } else {
          setOptions(res.data.data);
        }
      })
      .finally(() => {});
  }, [bankUuid]);

  const handleClick = () => {
    if (options.length > 0) {
      setIsOpen(!isOpen);
    }
  };

  const getHeader = () => {
    return (
      <div className="flex w-full cursor-pointer items-center justify-between p-1 border-2 border-[rgb(198 215 224)] rounded-[8px] h-[64px]">
        {selected ? (
          <div className="flex flex-col">
            <div className="w-full text-[#005FC5] font-normal text-[12px] normal-case p-1">
              Loan Program
            </div>
            <div className="w-full text-[#223250] font-normal text-[16px] normal-case p-1">
              {selected.programName}
            </div>
          </div>
        ) : (
          <div className="w-full text-[#9098A7] font-normal text-[16px] normal-case p-1">
            Choose Loan Program
          </div>
        )}
        <img
          src={ArrowDownV2}
          alt=""
          className="arrow-down-icon"
          style={{
            width: '24px',
            height: '24px',
            transition: 'all 0.3s linear',
          }}
        />
      </div>
    );
  };

  const getContent = (field: any) => {
    return options.slice(0, destinationOptionIndex).map((item, index) => {
      return (
        <MenuItem
          value={index}
          key={index}
          onClick={() => {
            setSelected(item);
            setIsOpen(!isOpen);
            field.onChange(item);
          }}
          sx={{
            border: 1.5,
            borderColor: '#005FC5',
            borderRadius: '10px',
            mb: 2,
            '&:hover': {
              background: '#F6F8FC',
            },
          }}
        >
          <div className="flex w-full flex-col">
            <div className="w-full text-[#005FC5] font-normal text-[12px] normal-case p-1">
              Loan Program
            </div>
            <div className="w-full text-[#223250] font-normal text-[16px] normal-case p-1">
              {item.programName}
            </div>
            <div className="flex w-full flex-row">
              <div className="w-2/5 text-[#6B7A99] font-medium text-[16px] normal-case p-1">
                Interest Rate
              </div>
              <div className="w-1/4 items-center">Fixed</div>
              <div className="w-1/4 items-center">
                {item.fixedYear} years {item.fixedRate} %
              </div>
            </div>
            <div className="flex w-full flex-row">
              <div className="w-2/5 items-center"></div>
              <div className="w-1/4 items-center">Float</div>
              <div className="w-1/4 items-center">{item.floatRate}%</div>
            </div>
          </div>
        </MenuItem>
      );
    });
  };

  const handleShowMore = useCallback(() => {
    setDestinationOptionIndex(options.length);
  }, [options.length]);

  return (
    <Controller
      name={name}
      rules={rules}
      control={control}
      render={({ field, fieldState }) => {
        return (
          <FormControl sx={{ m: 1, width: '40%' }} size="small">
            <div
              onClick={handleClick}
              style={{
                display: isOpen ? 'none' : 'block',
              }}
            >
              {getHeader()}
            </div>
            <div
              style={{
                display: !isOpen ? 'none' : 'block',
                maxHeight: 420,
                overflow: 'auto',
              }}
            >
              {getContent(field)}
              {options.length > 3 &&
              destinationOptionIndex < options.length - 1 ? (
                <div className="flex items-center justify-center">
                  <span
                    className="text-[#005FC5] text-center cursor-pointer mr-2"
                    onClick={handleShowMore}
                  >
                    Show More
                  </span>
                  <img
                    src={dropdownIcon}
                    alt=""
                    className="arrow-down-icon"
                    style={{
                      width: '12px',
                      height: '7px',
                      transition: 'all 0.3s linear',
                    }}
                  />
                </div>
              ) : null}
            </div>
          </FormControl>
        );
      }}
    />
  );
};
