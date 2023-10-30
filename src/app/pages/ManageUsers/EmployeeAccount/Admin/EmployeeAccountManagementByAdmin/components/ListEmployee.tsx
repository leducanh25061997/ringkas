import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import Table from 'app/components/Table';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import moment from 'moment';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import UserTooltip from './UserTooltip';
import { debounce, FormControlLabel } from '@mui/material';
import { CustomStatus } from 'app/components/CustomSwitch';
import ButtonContactUs from 'app/components/ButtonContactUs';
import UpdateStatusDialog from 'app/components/UpdateStatusDialog';
import { useEmployeeAccountManagementSlice } from '../../slice';
import { FilterListParams } from 'types/FilterParams';
import { useSafeState } from 'app/hooks/useSafeState';

import FilterBar from './FilterBar';
import { selectEmployeeAccountList } from '../../slice/selectors';
import { ChangeStatus } from 'types/DeveloperAccountManagement';
import Notifier from 'app/pages/Notifier';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import { RoleNameText } from 'types/EmployeeAccountManagement';

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
  searchKeyType: [],
};

interface ValueFilter {
  status: string[];
  createdDate: string[];
  searchKeyType: string[];
  orders: string;
}

interface Props {
  allowInteraction: boolean;
}

function ListEmployee(props: Props) {
  const { allowInteraction } = props;
  const { employeeAccountManagement, isLoading } = useSelector(
    selectEmployeeAccountList,
    shallowEqual,
  );
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [filter, setFilter] = useSafeState<FilterListParams>(initialFilter);
  const [status, setStatus] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [employeeId, setEmployeeId] = useState<string>('');
  const navigate = useNavigate();

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const dispatch = useDispatch();

  const { actions } = useEmployeeAccountManagementSlice();

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
        actions.fetchEmployeeAccountList({
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
    }
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

  const handleOnChangeStatus = () => {
    const newParams: ChangeStatus = {
      userUuid: employeeId,
      status: status ? 'INACTIVE' : 'ACTIVE',
    };
    dispatch(
      actions.updateStatusAccount(newParams, (changeStatus?: ChangeStatus) => {
        setOpenDialog(false);
        if (changeStatus) {
          fetchDataForPage(filter);
          setStatus(!status);
          Notifier.addNotifySuccess({
            messageId: 'success.updateStatusSuccess',
          });
        } else {
          Notifier.addNotifyError({
            messageId: 'error.anErrorOccurred',
          });
        }
      }),
    );
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'employee',
        headerName: t(translations.employManagement.employee),
        flex: 1,
        minWidth: 200,
        renderCell: params => (
          <div className="flex items-center">
            <p className="leading-[22px] text-[#005FC5] font-medium underline mr-2 cursor-pointer">
              {params?.row?.fullName}
            </p>
            <UserTooltip data={params?.row as any} />
          </div>
        ),
        sortable: false,
      },
      {
        field: 'role',
        flex: 1,
        headerName: t(translations.partnerManagement.typeOfRoles),
        sortable: false,
        width: 200,
        renderCell: (params: any) => (
          <div className="text-[#223250] font-medium">
            {params?.value
              ? t(RoleNameText[params?.value as keyof typeof RoleNameText])
              : '-'}
          </div>
        ),
      },
      {
        field: 'status',
        headerName: t(translations.common.status),
        width: 200,
        flex: 1,
        sortable: false,
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
                      if (params?.value === 'ACTIVE') {
                        setStatus(true);
                      } else {
                        setStatus(false);
                      }
                      setOpenDialog(true);
                      setEmployeeId(params?.row?.userUuid);
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
        field: 'createdDate',
        headerName: t(translations.developerInformation.registerDate),
        width: 200,
        flex: 1,
        sortable: false,
        renderCell: params => (
          <div className="font-medium text-[16px]">
            {params?.row?.createdDate
              ? moment
                  .unix(params?.row?.createdDate / 1000)
                  .format('DD/MM/YYYY')
              : '-'}
          </div>
        ),
      },
    ],
    [t],
  );

  return (
    <>
      <FilterBar
        handleFilterData={handleFilterData}
        onSearch={onSearchDeveloperAccount}
        allowInteraction={allowInteraction}
      />

      <Table
        rows={employeeAccountManagement?.data}
        columns={columns}
        rowCount={employeeAccountManagement?.total || 0}
        page={page}
        onPageChange={handleOnChangePage}
        pageSize={pageSize}
        isLoading={isLoading}
        onPageSizeChange={handleOnChangeSize}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
        onRowClick={params => {
          navigate(`${path.employeeAccountListByAdmin}/${params?.id}`);
        }}
      />
      <UpdateStatusDialog
        openDialog={openDialog}
        onCloseDialog={onCloseDialog}
        title={t(translations.common.caution)}
        description={t(translations.common.areYouSureActive, {
          active: status
            ? t(translations.common.inactive)
            : t(translations.common.active),
        })}
        onConfirm={handleOnChangeStatus}
        titleButtonConfirm={t(translations.common.update)}
        maxWidth={'xs'}
        cancelText={t(translations.common.no)}
        confirmText={t(translations.common.yes)}
      />
    </>
  );
}

export default React.memo(ListEmployee);
