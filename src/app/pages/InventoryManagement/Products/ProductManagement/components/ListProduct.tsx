import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import { VerificationStatus } from 'types/enums';
import NoPermission from 'app/components/NoPermission';

import React, { useState } from 'react';
import Table from 'app/components/Table';
import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import { Typography, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FilterListParams } from 'types/FilterParams';
import { useNavigate } from 'react-router';

import { useProductManagementSlice } from '../slice';
import { selectProductManagement } from '../slice/selectors';
import ProjectTooltip from 'app/components/ProjectTooltip';
import ProductTooltip from 'app/components/ProductTooltip';
import path from 'app/routes/path';
import { formatCurrency } from 'app/components/CustomTextField';

import { SearchKeyType } from '../slice/types';
import { capitalize } from 'lodash';

import FilterBar from './FilterBar';

const initialFilter = {
  page: 0,
  size: 20,
  searchKey: '',
  status: [],
  orders: '',
  searchKeyTypes: [],
};

function ListProduct() {
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const allowInteraction =
    userInformation?.verificationStatus === VerificationStatus.VERIFIED;

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterListParams>(initialFilter);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const [searchBy, setSearchBy] = useState<any>();
  const { actions } = useProductManagementSlice();
  const { products, isLoading, productsByOwner } = useSelector(
    selectProductManagement,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns: GridColDef[] = React.useMemo(
    () => [
      {
        field: 'projectName',
        headerName: 'Project',
        sortable: true,
        flex: 1,
        minWidth: 350,
        renderCell: params => (
          <div>
            {params?.value ? (
              <div className="flex items-center">
                <Tooltip title={params?.row?.projectName}>
                  <Typography
                    sx={{ color: '#223250', fontWeight: 500, fontSize: '16px' }}
                  >
                    {params?.row?.projectName}
                  </Typography>
                </Tooltip>
                <ProjectTooltip data={params?.row} />
              </div>
            ) : (
              '-'
            )}
          </div>
        ),
      },
      {
        field: 'product',
        headerName: 'Product',
        sortable: false,
        width: 250,
        heigth: 60,
        renderCell: params => {
          return (
            <div className="flex items-center">
              <Typography
                sx={{
                  color: '#005FC5',
                  textDecoration: 'underline',
                  fontWeight: 500,
                  fontSize: '16px',
                  cursor: 'pointer',
                }}
                onClick={() => navigate(`${path.product}/${params.row.id}`)}
              >
                {params.row.type} / {params.row.unit}
              </Typography>
              <ProductTooltip data={params?.row} />
            </div>
          );
        },
      },
      {
        field: 'housePrice',
        headerName: 'House Price',
        sortable: false,
        width: 200,
        renderCell: params => (
          <Typography
            sx={{ color: '#223250', fontWeight: 500, fontSize: '16px' }}
          >
            Rp{' '}
            {params?.row?.pricing?.housePrice
              ? formatCurrency(String(params?.row?.pricing?.housePrice))
              : 0}
          </Typography>
        ),
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 200,
        renderCell: params => (
          <div className="rounded-3xl bg-[#FFDFB7] h-[30px] !w-fit font-semibold flex items-center px-3 py-2">
            {capitalize(params?.row.propertyCustomerStatus)}
          </div>
        ),
        sortable: true,
      },
      {
        field: 'customerName',
        headerName: 'Customer Name',
        width: 250,
        sortable: true,
        renderCell: (params: any) => {
          return (
            <Typography
              sx={{ color: '#223250', fontWeight: 500, fontSize: '16px' }}
            >
              -
            </Typography>
          );
        },
      },
      {
        field: 'kprAmount',
        headerName: 'KPR Amount',
        sortable: false,
        width: 250,
        renderCell: params => (
          <Typography
            sx={{ color: '#223250', fontWeight: 500, fontSize: '16px' }}
          >
            -
          </Typography>
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
        actions.fetchProductsByOwner({
          size: params.size,
          page: params.page,
          orders: params.orders,
          searchKey: params.searchKey,
          searchKeyTypes: params.searchKeyTypes,
          statusList: getStatus(params.status || []),
        }),
      );
      setFilter({
        ...params,
      });
    }
  };

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

  const handleSearchInputChange = (keyword: string) => {
    const newFilterParams = {
      ...filter,
      searchKey: keyword,
    };
    fetchDataForPage(newFilterParams);
    setFilter(newFilterParams);
  };

  const handleSearchByChange = (searchKeyType: SearchKeyType) => {
    const _searchKeyTypes: string[] = [];
    _searchKeyTypes.push(searchKeyType);
    const newFilterParams = {
      ...filter,
      searchKeyTypes: _searchKeyTypes,
    };
    fetchDataForPage(newFilterParams);
    setFilter(newFilterParams);
    setSearchBy(searchKeyType);
  };

  return (
    <>
      <FilterBar
        searchBy={searchBy}
        onChangeSearchBy={handleSearchByChange}
        onChangeSearchInput={handleSearchInputChange}
        allowInteraction={allowInteraction}
      />
      <Table
        rows={productsByOwner?.data || []}
        columns={columns}
        rowCount={productsByOwner?.total || 0}
        page={page}
        onPageChange={handleOnChangePage}
        pageSize={pageSize}
        onPageSizeChange={handleOnChangeSize}
        isLoading={isLoading}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        onRowClick={params => navigate(`${path.product}/${params.id}`)}
      />
      {!allowInteraction && <NoPermission />}
    </>
  );
}

export default React.memo(ListProduct);
