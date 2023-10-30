import { Button, Typography } from '@mui/material';
import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import ButtonMoreMenu from 'app/components/ButtonMoreMenu';
import { CustomToolTip } from 'app/components/KeyText';
import LightTooltip from 'app/components/LightTooltip';
import Table from 'app/components/Table';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import { get } from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import {
  BankAccountLowerCase,
  BankAccountType,
} from 'types/BankAccountManagement';
import verifiedIcon from 'assets/icons/verified.svg';

import { useManageBankSlice } from '../slice';
import { selectManageBank } from '../slice/selectors';
import { DropItem } from '../slice/types';

import FilterBar from './FilterBar';

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
  &.inactive {
    background: rgba(255, 0, 0, 0.05);
    border: 1px solid #ff0000;
    color: #ff0000;
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
`;

const TableEmail = styled.div`
  font-weight: 600;
  color: #005fc5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding: 0px;
`;

function ListBank() {
  const { data, total } = useSelector(selectManageBank);
  const { t } = useTranslation();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [isLoading, setIsLoading] = useState(true);
  const [searchBy, setSearchBy] = useState<DropItem>();
  const [searchKey, setSearchKey] = useState('');
  const navigate = useNavigate();

  const [sortModel, setSortModel] = useState<GridSortModel>([]);

  const dispatch = useDispatch();

  const { actions } = useManageBankSlice();

  useEffect(() => {
    getData();
  }, []);

  const getData = (newFilter?: Record<string, any>, callback?: Function) => {
    const filterData = {
      page,
      size: pageSize,
      searchKey,
      searchKeyType: [searchBy],
    };
    dispatch(
      actions.getBankAccountList(
        { ...filterData, ...newFilter },
        (loading: boolean) => {
          setIsLoading(loading);
          callback && callback();
        },
      ),
    );
  };

  const handlePageChange = (page: number) => {
    getData({ page }, () => setPage(page));
  };

  const handlePageSizeChange = (pageSize: number) => {
    getData({ size: pageSize }, () => setPageSize(pageSize));
  };

  const handleSearchInputChange = (keyword: string) => {
    getData({ searchKey: keyword, page: 0 }, () => {
      setSearchKey(keyword);
      setPage(0);
    });
  };

  const handleSearchByChange = (searchKey: DropItem) => {
    if (!searchKey) return;
    getData({ searchKeyType: [searchKey.value], page: 0 }, () => {
      setSearchBy(searchKey);
      setPage(0);
    });
  };

  const handleSortModelChange = (sortModel: GridSortModel) => {
    const orders = sortModel[0]
      ? `${sortModel[0].field} ${sortModel[0].sort}`
      : undefined;

    getData({ orders, page: 0 }, () => {
      setSortModel(sortModel);
      setPage(0);
    });
  };

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'email',
        headerName: t(translations.common.email),
        flex: 1,
        minWidth: 350,
        renderCell: params => (
          <CustomToolTip title={params?.value || ''} placement="top-start">
            <TableEmail className="long-text">{params.value}</TableEmail>
          </CustomToolTip>
        ),
        sortable: false,
      },
      {
        field: 'fullName',
        headerName: t(translations.common.fullName),
        renderCell: params => (
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
        width: 200,
      },
      {
        field: 'company',
        headerName: t(translations.developerInformation.companyInformation),
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
        headerName: t(translations.developerInformation.registerDate),
        width: 200,
        sortable: true,
        renderCell: (params: any) => (
          <div>
            {params?.value
              ? moment.unix(params?.value / 1000).format('DD/MM/YYYY')
              : '-'}
          </div>
        ),
      },
      {
        field: 'bankAccountType',
        headerName: t(translations.common.businessOrganization),
        width: 220,
        sortable: false,
        renderCell: (params: any) => (
          <div>{get(BankAccountLowerCase, params?.value) || ''}</div>
        ),
      },
      {
        field: 'status',
        headerName: t(translations.developerInformation.accountStatus),
        sortable: false,
        width: 200,
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
                  if (
                    params?.row.bankAccountType === BankAccountType.HEAD_QUARTER
                  ) {
                    navigate(`${path.hqBankAccountList}/${params.id}`);
                  } else {
                    navigate(`${path.manageUsers}/bank/${params.id}`);
                  }
                },
              },
              {
                name: t(translations.tableDeveloperAccount.updateData),
                itemComponent: Button,
                onClick: () => {
                  if (
                    params?.row.bankAccountType === BankAccountType.HEAD_QUARTER
                  ) {
                    navigate(`${path.hqBankAccountList}/edit/${params.id}`);
                  } else {
                    navigate(`${path.branchBankAccountList}/edit/${params.id}`);
                  }
                },
              },
            ]}
          />
        ),
      },
    ],
    [],
  );

  return (
    <>
      <FilterBar
        searchBy={searchBy}
        onChangeSearchBy={handleSearchByChange}
        onChangeSearchInput={handleSearchInputChange}
      />

      <Table
        rows={data}
        columns={columns}
        rowCount={total || 0}
        page={page}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        isLoading={isLoading}
        onPageSizeChange={handlePageSizeChange}
        sortModel={sortModel}
        onSortModelChange={handleSortModelChange}
      />
    </>
  );
}

export default React.memo(ListBank);
