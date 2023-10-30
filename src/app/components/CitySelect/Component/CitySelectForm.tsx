import React, { useEffect, useState } from 'react';
import DropdownData from './DropdownData';
import { Popper, PopperProps } from '@mui/material';
import Search from 'assets/icons/search.svg';
import ArrowBack from 'assets/icons/arrow-right.svg';
import { axiosClient } from 'services/api/axios';
import { Address } from './type';
import useUpdateEffect from 'app/hooks/useUpdateEffect';
import classNames from 'classnames';

type Props = {
  onChange?: (address: Address) => void;
  value?: Address;
  dropdownPosition?: 'TOP' | 'BOTTOM';
  onClose: () => void;
} & Omit<PopperProps, 'onChange' | 'ref'>;

const CitySelectForm = React.forwardRef(
  (
    {
      onChange,
      value,
      dropdownPosition,
      onClose,
      // ref: popperRef,
      anchorEl,
      ...rest
    }: Props,
    ref: React.LegacyRef<HTMLDivElement>,
  ) => {
    const [keyword, setKeyword] = useState<string>('');
    const [step, setStep] = useState<number>(1);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<string[]>([]);
    const [address, setAddress] = useState<Address>({
      province: value ? value.province : undefined,
      city: value ? value.city : undefined,
    });

    const fetchData = (url: string) => {
      setIsLoading(true);
      axiosClient
        .get(url)
        .then(res => {
          setData(res.data);
        })
        .finally(() => setIsLoading(false));
    };

    useEffect(() => {
      if (step === 1) {
        const url = '/provinces';
        fetchData(url);
      }
      if (step === 2) {
        const url = `/province/${address?.province}/cities`;
        fetchData(url);
      }
    }, [step]);

    useUpdateEffect(() => {
      if (!address) return;
      if (address.province) {
        setKeyword('');
        setStep(2);
      }

      if (address.city) {
        setStep(3);
      }

      if (
        Object.values(address).filter(item => item !== undefined).length === 2
      ) {
        onChange && onChange(address);
        onClose();
      }
    }, [address]);

    const handleValue = () => {
      if (!address) return;
      if (step === 1) return address.province;
      if (step === 2) return address.city;
    };

    const handleChange = (item: string) => {
      if (!item) return;
      if (step === 1) {
        setAddress({
          ...address,
          province: item,
          city: undefined,
        });
      }
      if (step === 2) {
        setAddress({
          ...address,
          city: item,
        });
      }
    };

    const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
      setKeyword(event.target.value);
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
          className={classNames(
            'w-[582px] absolute z-[10000] bg-[#fff] p-4 rounded-[15px] shadow-2xl',
            {
              'bottom-[-8px] translate-y-[100%]': dropdownPosition === 'BOTTOM',
            },
            {
              'top-[-8px] translate-y-[-100%]': dropdownPosition === 'TOP',
            },
          )}
          ref={ref}
        >
          <div className="relative">
            <p className="text-center font-semibold text-[16px] leading-[24px] mb-6">
              {step === 1 && 'Select province'}
              {step === 2 && 'Select city'}
            </p>
            {step !== 1 && (
              <img
                className="absolute top-0 left-[16px] rotate-180 cursor-pointer"
                src={ArrowBack}
                width={36}
                height={36}
                alt="search"
                onClick={() => {
                  if (step > 1) {
                    setStep(step - 1);
                  }
                }}
              />
            )}
          </div>

          {step === 1 && (
            <div className="flex items-center relative rounded-lg border border-[#000] focus-within:border-[#005FC5] overflow-hidden">
              <input
                className="placeholder-slate-400 grow block rounded-md sm:text-sm px-4 py-[10px] text-[#005FC5] text-[16px] font-semibold truncate"
                type="text"
                placeholder="Search city"
                onChange={onSearch}
                value={keyword}
              />
              <img
                className="shrink-0 mr-2"
                src={Search}
                width={24}
                height={24}
                alt="search"
              />
            </div>
          )}

          {step !== 1 && (
            <div className="px-4 py-[10px] border border-[#005fc5] bg-[#f6f8fc] rounded-lg w-full text-[#005FC5] text-[16px] font-semibold truncate">
              {address &&
                Object.values(address)
                  .filter(item => item !== undefined)
                  .join(' > ')}
            </div>
          )}

          <DropdownData
            data={
              keyword === ''
                ? data
                : [...data].filter(item =>
                    item.toLowerCase().includes(keyword.toLowerCase()),
                  )
            }
            isLoading={isLoading}
            onChange={handleChange}
            value={handleValue()}
          />
        </div>
      </Popper>
    );
  },
);

export default CitySelectForm;
