import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import { VerificationStatus } from 'types/enums';
import NoPermission from 'app/components/NoPermission';

import React, { useMemo, useState } from 'react';
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
import ProjectTooltip from './ProjectTooltip';
import TypeTooltip from './TypeTooltip';
import { CustomStatus } from 'app/components/CustomSwitch';
import UserTooltip from './UserTooltip';
import { selectManageCustomer } from '../../../../ManageUsers/CustomerAccount/slice/selectors';
import { useManageCustomerSlice } from '../../../../ManageUsers/CustomerAccount/slice';

const MarginLeft = styled('div')({
  marginLeft: '-15px',
  color: '#6B7A99',
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
};

interface ValueFilter {
  status: string[];
  createdDate: string[];
  searchKeyTypes: string[];
  orders: string;
}

function ListProject() {
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const allowInteraction =
    userInformation?.verificationStatus === VerificationStatus.VERIFIED;

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterListParams>(initialFilter);
  const [sortModel, setSortModel] = useState<GridSortModel>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { actions } = useManageCustomerSlice();
  const { projectsData, isLoading } = useSelector(selectManageCustomer);
  const handleOnChangeStatus = (id: string) => {};
  const dataDefault = {
    fullName: 'Jennie Brook',
    email: 'jennie@gmail.com',
    phone: '+6289616759677',
    id: '1',
  };
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'projectNameAndCode',
        headerName: t(translations.projectManagement.project),
        width: 250,
        renderCell: params => (
          <div className="flex items-center">
            <p className="leading-[22px] text-[#005FC5] font-medium underline mr-2 cursor-pointer">
              {params?.row?.projectNameAndCode?.name}
            </p>
            <ProjectTooltip data={params.value as any} />
          </div>
        ),
      },
      {
        field: 'pic',
        headerName: 'PIC',
        sortable: false,
        width: 250,
        renderCell: params => (
          <div className="flex items-center">
            <p className="leading-[22px] font-medium mr-2 cursor-pointer">
              {params?.value}
            </p>
            {/* <UserTooltip data={dataDefault} /> */}
          </div>
        ),
      },
      {
        field: 'type',
        headerName: t(translations.common.type),
        width: 200,
        sortable: false,
        renderCell: params => (
          <div className="flex items-center">
            <p className="leading-[22px] text-[#005FC5] font-medium mr-2">
              {params?.row?.houseTypes ? params?.row?.houseTypes.length : 0}
            </p>
            <TypeTooltip data={params?.row?.houseTypes} />
          </div>
        ),
      },
      {
        field: 'inventoryLevel',
        headerName: t(translations.projectManagement.inventoryLevel),
        width: 200,
        renderCell: params => (
          <div className="font-medium">
            {params?.value ? params?.value : '100/1000'}
          </div>
        ),
      },
      {
        field: 'buildYear',
        headerName: t(translations.projectManagement.builtYear),
        width: 200,
        renderCell: params => (
          <div className="font-medium">{params?.value}</div>
        ),
      },
      {
        field: 'status',
        headerName: t(translations.common.status),
        sortable: false,
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
                      handleOnChangeStatus(params?.row?.id);
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
        actions.getListProjectByOwner({
          size: params.size,
          page: params.page,
          searchKey: params.searchKey,
          searchKeyTypes: params.searchKeyTypes,
          statusList: getStatus(params.status || []),
          orders: params.orders,
        }),
      );
      setFilter({
        ...params,
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

  const rows = useMemo(() => {
    return projectsData?.data.map((item, index) => ({
      id: item.projectId,
      pic: `N/A`,
      projectNameAndCode: {
        name: item.name,
        fullAddress: item.fullAddress,
        certificateTypes: item.certificateTypes,
      },
      projectLocation: {
        longitude: item.longitude,
        latitude: item.latitude,
        city: item.cityName,
        province: item.provinceName,
      },
      fullAddress: item.fullAddress,
      buildYear: item.buildYear,
      createdDate: moment(item.createdDate).format('DD/MM/YYYY'),
      status: item.status,
      houseTypes: item.houseTypes,
      inventoryLevel: `${item.unitAvailable ?? 0}/${item.totalUnit ?? 0}`,
    }));
  }, [projectsData?.data]);

  return (
    <>
      <FilterBar
        handleFilterData={handleFilterData}
        onSearch={onSearchProject}
        allowInteraction={allowInteraction}
      />
      <Table
        rows={rows}
        columns={columns}
        rowCount={projectsData?.total || 0}
        page={page}
        onPageChange={handleOnChangePage}
        pageSize={pageSize}
        onPageSizeChange={handleOnChangeSize}
        isLoading={isLoading}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        onRowClick={params => navigate(`${path.project}/${params.id}`)}
      />
      {!allowInteraction && <NoPermission />}
    </>
  );
}

export default React.memo(ListProject);
