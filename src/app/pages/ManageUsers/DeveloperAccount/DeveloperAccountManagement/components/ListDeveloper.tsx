import React from 'react';
import Table from 'app/components/Table';
import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import ButtonMoreMenu from 'app/components/ButtonMoreMenu';
import { Button, debounce, Typography } from '@mui/material';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';
import { FilterListParams } from 'types/FilterParams';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import moment from 'moment';
import path from 'app/routes/path';
import { useNavigate } from 'react-router';
import { CustomToolTip } from 'app/components/KeyText';
import verifiedIcon from 'assets/icons/verified.svg';

import { useDeveloperAccountManagementSlice } from '../slice';
import { selectDeveloperAccountList } from '../slice/selectors';

import FilterBar from './FilterBar';
import { useSafeState } from 'app/hooks/useSafeState';

const TableEmail = styled.div`
  font-weight: 600;
  color: #005fc5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
`;

const TableStatus = styled.div`
  padding: 0px 16px;
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 22px;
  font-weight: 500;
  border-radius: 40px;
  height: 30px;
  text-transform: capitalize;
  max-width: max-content;
  &.active {
    background: rgba(57, 194, 79, 0.05);
    border: 1px solid #39c24f;
    color: #39c24f;
  }
  &.verified {
    background: rgba(57, 194, 79, 0.05);
    border: 1px solid #39c24f;
    color: #39c24f;
  }
  &.submitted {
    background: rgba(57, 194, 79, 0.05);
    border: 1px solid #39c24f;
    color: #39c24f;
  }
  &.inactive {
    background: rgba(255, 0, 0, 0.05);
    border: 1px solid #ff0000;
    color: #ff0000;
  }
`;

const initialFilter = {
  page: 0,
  size: 20,
  searchKey: '',
  status: [],
  orders: '',
  searchKeyType: [],
};

interface ValueFilter {
  status: string[];
  createdDate: string[];
  searchKeyType: string[];
  orders: string;
}

function ListDeveloper() {
  const [page, setPage] = useSafeState(0);
  const [pageSize, setPageSize] = useSafeState(20);
  const { t } = useTranslation();
  const [filter, setFilter] = useSafeState<FilterListParams>(initialFilter);
  const [sortModel, setSortModel] = useSafeState<GridSortModel>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actions } = useDeveloperAccountManagementSlice();
  const { developerAccountManagement, isLoading } = useSelector(
    selectDeveloperAccountList,
    shallowEqual,
  );

  const columns: GridColDef[] = [
    {
      field: 'email',
      headerName: 'Email',
      sortable: true,
      flex: 1,
      minWidth: 350,
      renderCell: params => (
        <CustomToolTip title={params?.value || ''} placement="top-start">
          <TableEmail className="long-text">{params.value}</TableEmail>
        </CustomToolTip>
      ),
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 250,
      renderCell: (params: any) => (
        <div>
          {params?.row?.kyc?.fullName ? (
            <div>
              <CustomToolTip
                title={params?.row?.kyc?.fullName}
                placement="top-start"
              >
                <Typography className="long-text">
                  {params?.row?.kyc?.fullName}
                </Typography>
              </CustomToolTip>
              <CustomToolTip
                title={params?.row?.kyc?.nik}
                placement="top-start"
              >
                <Typography sx={{ color: '#8d96b0' }}>
                  {params?.row?.kyc?.nik}
                </Typography>
              </CustomToolTip>
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      ),
    },
    {
      field: 'company',
      headerName: 'Company Information',
      sortable: false,
      width: 250,
      renderCell: (params: any) => (
        <div>
          {params?.row?.company?.name ? (
            <div className="long-text" style={{ display: 'block' }}>
              <CustomToolTip
                title={params?.row?.company?.name}
                placement="top-start"
              >
                <Typography className="long-text">
                  {params?.row?.company?.name}
                </Typography>
              </CustomToolTip>
              <CustomToolTip
                title={params?.row?.company?.address}
                placement="top-start"
              >
                <Typography className="long-text" sx={{ color: '#8d96b0' }}>
                  {params?.row?.company?.address}
                </Typography>
              </CustomToolTip>
            </div>
          ) : (
            <div>-</div>
          )}
        </div>
      ),
    },
    {
      field: 'createdDate',
      headerName: 'Register Date',
      width: 160,
      renderCell: (params: any) => (
        <div>
          {params?.value
            ? moment.unix(params?.value / 1000).format('DD/MM/YYYY')
            : '-'}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Account Status',
      width: 160,
      sortable: false,
      renderCell: params => (
        <TableStatus className={String(params.value).toLowerCase()}>
          {String(params.value).toLowerCase()}
        </TableStatus>
      ),
    },
    {
      field: 'verificationStatus',
      headerName: 'Application Status',
      sortable: false,
      width: 200,
      renderCell: params =>
        params?.value ? (
          <TableStatus className={String(params?.value).toLowerCase()}>
            <img
              src={verifiedIcon}
              alt="warning"
              style={{ marginRight: '5px' }}
            />
            {String(params?.value).toLowerCase()}
          </TableStatus>
        ) : (
          '-'
        ),
    },
    {
      field: 'userUuid',
      headerName: 'Action',
      width: 100,
      sortable: false,
      renderCell: params => (
        <ButtonMoreMenu
          items={[
            {
              name: t(translations.tableDeveloperAccount.seeDetail),
              itemComponent: Button,
              onClick: () => {
                navigate(`${path.developerAccountList}/${params.value}`);
              },
            },
            {
              name: t(translations.tableDeveloperAccount.updateData),
              itemComponent: Button,
              onClick: () => {
                navigate(`${path.developerAccountList}/edit/${params.value}`);
              },
            },
          ]}
        />
      ),
    },
  ];

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
    dispatch(
      actions.fetchDeveloperAccountList({
        size: params.size,
        page: params.page,
        searchKey: params.searchKey,
        searchKeyType: params.searchKeyType,
        status: getStatus(params.status || []),
        orders: params.orders,
      }),
    );
    setFilter({
      ...params,
    });
  };

  const handleFilterData = (value: ValueFilter) => {
    const newFilter = {
      ...filter,
      status: value?.status,
      createdDate: value?.createdDate,
      searchKeyType: value?.searchKeyType,
    };
    fetchDataForPage(newFilter);
    setFilter(newFilter);
  };

  const onSearchDeveloperAccount = debounce((value: string) => {
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
    };
    fetchDataForPage(newFilterParams);
    setFilter(newFilterParams);
    setPageSize(size);
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

  return (
    <>
      <FilterBar
        handleFilterData={handleFilterData}
        onSearch={onSearchDeveloperAccount}
      />
      <Table
        rows={developerAccountManagement?.data || []}
        columns={columns}
        rowCount={developerAccountManagement?.total || 0}
        page={page}
        onPageChange={handleOnChangePage}
        pageSize={pageSize}
        onPageSizeChange={handleOnChangeSize}
        isLoading={isLoading}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
      />
    </>
  );
}

export default React.memo(ListDeveloper);
