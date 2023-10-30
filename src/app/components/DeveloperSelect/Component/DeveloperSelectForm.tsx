import React, { useEffect, useState } from 'react';
import DropdownData from './DropdownData';
import { Popper, PopperProps } from '@mui/material';
import Search from 'assets/icons/search.svg';
import ArrowBack from 'assets/icons/arrow-right.svg';
import { axiosClient } from 'services/api/axios';
import { Address } from './type';
import useUpdateEffect from 'app/hooks/useUpdateEffect';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { translations } from 'locales/translations';
import { DeveloperAccountList } from 'types/DeveloperAccountManagement';

type Props = {
  onChange?: (value: Developer[]) => void;
  value?: Developer[];
  dropdownPosition?: 'TOP' | 'BOTTOM';
  onClose: () => void;
} & Omit<PopperProps, 'onChange' | 'ref'>;

interface Developer {
  name: string;
  id: string;
}

const DeveloperSelectForm = React.forwardRef(
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
    const { t } = useTranslation();
    const [keyword, setKeyword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [data, setData] = useState<DeveloperAccountList[]>([]);

    const fetchData = (url: string) => {
      setIsLoading(true);
      axiosClient
        .get(url)
        .then(res => {
          setData(res.data.data);
        })
        .finally(() => setIsLoading(false));
    };

    useEffect(() => {
      const url = `/console/partners?size=50&page=0&orders=createdDate%20desc&searchKey=${keyword}`;
      fetchData(url);
    }, [keyword]);

    const handleChange = (item: DeveloperAccountList) => {
      const newData = value || [];
      const convertDeveloperData: string[] = [];
      value?.map(data => {
        data?.id && convertDeveloperData.push(data?.id);
      });
      const getItem: Developer = {
        name: item.kyc.fullName,
        id: item.userUuid || '',
      };
      if (item.userUuid && convertDeveloperData.includes(item?.userUuid)) {
        const newValue: Developer[] = [];
        value?.map(data => {
          if (item?.userUuid !== data.id) {
            newValue.push(data);
          }
        });
        onChange && onChange(newValue);
      } else {
        newData.push(getItem);
        onChange && onChange(newData);
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
        placement="bottom"
      >
        <div
          className={classNames(
            'w-full absolute z-[10000] bg-[#fff] p-4 rounded-[15px] shadow-2xl',
            {
              'bottom-[-8px] translate-y-[100%]': dropdownPosition === 'BOTTOM',
            },
            {
              'top-[-8px] translate-y-[-100%]': dropdownPosition === 'TOP',
            },
          )}
          ref={ref}
        >
          <div className="flex items-center relative rounded-lg border border-[#000] focus-within:border-[#005FC5] overflow-hidden">
            <input
              className="placeholder-slate-400 grow block rounded-md sm:text-sm px-4 py-[10px] text-[#005FC5] text-[16px] font-semibold truncate"
              type="text"
              placeholder={t(translations.kprProgram.searchDeveloper)}
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
          <DropdownData
            data={
              keyword === ''
                ? data
                : [...data].filter(
                    item =>
                      item?.kyc.fullName &&
                      item?.kyc.fullName
                        .toLowerCase()
                        .includes(keyword.toLowerCase()),
                  )
            }
            isLoading={isLoading}
            onChange={handleChange}
            value={value}
          />
        </div>
      </Popper>
    );
  },
);

export default DeveloperSelectForm;
