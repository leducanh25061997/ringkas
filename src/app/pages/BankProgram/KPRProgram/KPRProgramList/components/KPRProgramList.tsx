import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import { VerificationStatus } from 'types/enums';
import NoPermission from 'app/components/NoPermission';

import React, { useEffect, useMemo, useState } from 'react';
import Table from 'app/components/Table';
import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import { debounce, FormControlLabel } from '@mui/material';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { FilterListParams } from 'types/FilterParams';
import styled from 'styled-components';
import moment from 'moment';
import path from 'app/routes/path';
import { useNavigate } from 'react-router';

import FilterBar from './FilterBar';
import { CustomStatus } from 'app/components/CustomSwitch';
import UserTooltip from './UserTooltip';
import { selectKprProgramList } from '../slice/selectors';
import { useKprProgramManagementSlice } from '../slice';
import { BankLoanForm, ChangeKprProgramStatus } from 'types/BankLoanManagement';
import Notifier from 'app/pages/Notifier';

const MarginLeft = styled('div')({
  marginLeft: '-15px',
  color: '#6B7A99',
  fontSize: '16px',
});

const DisplayFlex = styled('div')({
  display: 'flex',
});

const initialFilter = {
  page: 0,
  size: 20,
  searchKey: '',
  status: [],
  orders: '',
  searchKeyTypes: [],
  uuid: '',
};

interface ValueFilter {
  status: string[];
  createdDate: string[];
  searchKeyTypes: string[];
  orders: string;
}
const formatCurrency = (n: string) => {
  const thousands = /\B(?=(\d{3})+(?!\d))/g;
  return `Rp ${n.replace(thousands, '.')}`;
};

function KPRProgramList() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterListParams>(initialFilter);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [data, setData] = useState<BankLoanForm[]>([]);
  const [isChange, setIsChange] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actions } = useKprProgramManagementSlice();
  const { kprProgramManagement, isLoading } = useSelector(selectKprProgramList);
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const allowInteraction =
    userInformation?.verificationStatus === VerificationStatus.VERIFIED;

  const handleOnChangeStatus = (id: string, status: string) => {
    const kprProgramId = id;
    const newParams: ChangeKprProgramStatus = {
      kprProgramId,
      status: status === 'INACTIVE' ? 'ACTIVE' : 'INACTIVE',
    };
    dispatch(
      actions.updateKprProgramStatus(
        newParams,
        (changeStatus?: ChangeKprProgramStatus) => {
          if (changeStatus) {
            dispatch(
              actions.fetchKprProgramList({
                ...filter,
                uuid: userInformation?.userUuid,
              }),
            );
            Notifier.addNotifySuccess({
              messageId: 'success.updateSuccessfully',
            });
          } else {
            Notifier.addNotifyError({
              messageId: 'error.anErrorOccurred',
            });
          }
        },
      ),
    );
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'priority',
        headerName: t(translations.kprProgram.priority),
        width: 100,
        sortable: false,
        renderCell: params => (
          <div className="flex items-center">
            <p className="leading-[22px] font-medium mr-2 cursor-pointer text-[16px]">
              {params?.value}
            </p>
          </div>
        ),
      },
      {
        field: 'programName',
        headerName: t(translations.kprProgram.programName),
        width: 250,
        sortable: false,
        renderCell: params => (
          <div className="flex items-center">
            <p className="leading-[22px] font-medium mr-2 text-[16px]">
              {params?.value}
            </p>
          </div>
        ),
      },
      {
        field: 'maxAmount',
        headerName: t(translations.kprProgram.kprMax),
        sortable: false,
        width: 250,
        renderCell: params => (
          <div className="flex items-center">
            <p className="leading-[22px] font-medium mr-2 cursor-pointer text-[16px]">
              {params?.value
                ? formatCurrency(params?.value.toString())
                : 'Rp 0'}
            </p>
          </div>
        ),
      },
      {
        field: 'rateAndTenor',
        headerName: t(translations.kprProgram.rateAndTenor),
        width: 200,
        sortable: false,
        renderCell: params => (
          <div className="items-center">
            <p className="leading-[22px] font-medium mr-2 text-[16px]">
              {`Fix ${params?.row?.fixedYear}Y @${params?.row?.floatRate}%`}
            </p>
            <p className="leading-[22px] font-medium mr-2 text-[16px]">
              {`Tenor ${params?.row?.tenor} Years`}
            </p>
          </div>
        ),
      },
      {
        field: 'status',
        headerName: t(translations.common.status),
        width: 200,
        renderCell: params =>
          params.value ? (
            <DisplayFlex>
              <FormControlLabel
                style={{ marginTop: '-10px' }}
                control={
                  <CustomStatus
                    sx={{ m: 1, mt: 2 }}
                    checked={String(params.value).toLowerCase() === 'active'}
                    onChange={e => {
                      handleOnChangeStatus(
                        params?.row?.id,
                        String(params.value),
                      );
                    }}
                    onClick={e => {
                      e.stopPropagation();
                    }}
                  />
                }
                label={''}
              />
              <MarginLeft>
                {String(params.value).toLowerCase() === 'active'
                  ? 'Active'
                  : 'Inactive'}
              </MarginLeft>
            </DisplayFlex>
          ) : (
            '-'
          ),
      },
      {
        field: 'programDuration.startDate',
        headerName: t(translations.kprProgram.startDate),
        width: 200,
        sortable: false,
        renderCell: params => (
          <div className="font-medium text-[16px]">
            {params?.row?.programDuration.startDate
              ? moment
                  .unix(params?.row?.programDuration.startDate)
                  .format('DD/MM/YYYY')
              : '-'}
          </div>
        ),
      },
      {
        field: 'programDuration.endDate',
        sortable: false,
        headerName: t(translations.kprProgram.endDate),
        width: 200,
        renderCell: params => (
          <div className="font-medium text-[16px]">
            {params?.row?.programDuration.startDate
              ? moment
                  .unix(params?.row?.programDuration.endDate)
                  .format('DD/MM/YYYY')
              : '-'}
          </div>
        ),
      },
    ],
    [],
  );

  const getStatus = (status: string[]) => {
    const newStatus: string[] = [];
    status.map(item => {
      if (item === '') return [];
      else {
        newStatus.push(item);
      }
    });
    return newStatus;
  };

  const fetchDataForPage = (params: FilterListParams) => {
    if (allowInteraction) {
      dispatch(
        actions.fetchKprProgramList({
          size: params.size,
          page: params.page,
          searchKey: params.searchKey,
          searchKeyTypes: params.searchKeyTypes,
          statusList: getStatus(params.status || []),
          orders: params.orders,
          uuid: userInformation?.userUuid,
        }),
      );
      setFilter({
        ...params,
        uuid: userInformation?.userUuid,
      });
    }
  };

  const handleFilterData = (value: ValueFilter) => {
    const newFilter = {
      ...filter,
      status: value?.status,
      createdDate: value?.createdDate,
      searchKeyTypes: value?.searchKeyTypes,
    };
    fetchDataForPage(newFilter);
    setFilter(newFilter);
  };

  const onSearchProject = debounce((value: string) => {
    const newFilterParams = {
      ...filter,
      searchKey: value,
    };
    fetchDataForPage(newFilterParams);
    setFilter(newFilterParams);
  }, 500);

  const handleOnChangePage = (page: number) => {
    const newFilterParams = {
      ...filter,
      page,
    };
    fetchDataForPage(newFilterParams);
    setFilter(newFilterParams);
    setPage(page);
  };

  const handleOnChangeSize = (size: number) => {
    const newFilterParams = {
      ...filter,
      size,
      page: 0,
    };
    fetchDataForPage(newFilterParams);
    setFilter(newFilterParams);
    setPageSize(size);
    setPage(0);
  };

  const handleSortModelChange = (sortModel: GridSortModel) => {
    const orders = sortModel[0]
      ? `${sortModel[0].field} ${sortModel[0].sort}`
      : '';
    const newFilter = {
      ...filter,
      orders,
    };
    fetchDataForPage(newFilter);
    setSortModel(sortModel);
    setPage(0);
  };

  useEffect(() => {
    if (kprProgramManagement) {
      const newData: BankLoanForm[] = [];
      kprProgramManagement.data.map((item: BankLoanForm, index: number) => {
        const newItem = { ...item };
        newItem.priority = index + page * pageSize + 1;
        newData.push(newItem);
      });
      setData(newData);
      setIsChange(!isChange);
    }
  }, [kprProgramManagement]);

  return (
    <>
      <FilterBar
        handleFilterData={handleFilterData}
        onSearch={onSearchProject}
        allowInteraction={allowInteraction}
      />
      <Table
        rows={data}
        columns={columns}
        rowCount={kprProgramManagement?.total || 0}
        page={page}
        onPageChange={handleOnChangePage}
        pageSize={pageSize}
        onPageSizeChange={handleOnChangeSize}
        isLoading={isLoading}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
      />
      {!allowInteraction && <NoPermission />}
    </>
  );
}

export default React.memo(KPRProgramList);
