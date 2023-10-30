import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import Table from 'app/components/Table';
import path from 'app/routes/path';
import { translations } from 'locales/translations';
import { get } from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { useManageBankSlice } from '../slice';
import { selectPartnerManagement } from '../slice/selectors';
import { DropItem } from '../slice/types';

import classNames from 'classnames';
import { VerificationStatus } from 'types/enums';
import FilterBar from './FilterBar';
import PartnerTooltip from './PartnerTooltip';
import UserTooltip from './UserTooltip';

interface TaskProps {
  verificationStatus: VerificationStatus;
  onClick?: () => void;
}

const isNoTask = (currentVerificationStatus: VerificationStatus) => {
  const noTaskStatuses = [
    VerificationStatus.DATA_RETURNED,
    VerificationStatus.ONBOARDING,
    VerificationStatus.SYSTEM_WIP,
    VerificationStatus.VERIFIED,
  ];
  return noTaskStatuses.includes(currentVerificationStatus);
};

const Task = ({ verificationStatus, onClick }: TaskProps) => {
  const { t } = useTranslation();
  const tasks = {
    ONBOARDING: {
      label: translations.task.noTask,
      type: 'normal',
    },
    SYSTEM_WIP: {
      label: translations.task.noTask,
      type: 'normal',
    },
    DATA_READY: {
      label: translations.task.verify,
      path: 'partner/verification',
      type: 'link',
    },
    DATA_RETURNED: {
      label: translations.task.noTask,
      type: 'normal',
    },
    VERIFIED: {
      label: translations.task.noTask,
      type: 'normal',
    },
  };

  return (
    <div
      onClick={event => {
        event.stopPropagation();
        if (tasks[verificationStatus].type === 'link') {
          onClick?.call(null);
        }
      }}
      className={`leading-[22px] text-[${
        tasks[verificationStatus].type === 'link' ? '#005FC5' : 'black'
      }] font-medium ${
        tasks[verificationStatus].type === 'link'
          ? 'underline cursor-pointer'
          : ''
      } mr-2`}
    >
      {t(tasks[verificationStatus].label)}
    </div>
  );
};

function ListBank() {
  const { data, total } = useSelector(selectPartnerManagement);
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
      actions.getPartnerAccountList(
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
    getData({ size: pageSize, page: 0 }, () => {
      setPageSize(pageSize);
      setPage(0);
    });
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

  const goToDetail = React.useCallback(
    item => {
      navigate(`${path.partnerAccountList}/${item?.userUuid}`);
    },
    [navigate],
  );

  const handleRowClick = React.useCallback(
    item => {
      if (isNoTask(item.row?.verificationStatus)) {
        navigate(`${path.partnerAccountList}/${item?.userUuid}`);
      } else {
        navigate(`${path.partnerAccountList}/verification/${item?.userUuid}`);
      }
    },
    [navigate],
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'picIdentifier',
        headerName: t(translations.partnerManagement.picIdentifier),
        flex: 1,
        minWidth: 250,
        renderCell: params => (
          <div className="flex items-center">
            <p
              className="leading-[22px] text-[#005FC5] font-medium underline mr-2 cursor-pointer"
              onClick={event => {
                event.stopPropagation();
                goToDetail(params.row);
              }}
            >
              {params?.row?.kyc?.fullName}
            </p>
            <UserTooltip
              data={params?.row as any}
              hideViewAllButton
              hideStatusToggle
              isActive={_ => params?.row?.verificationStatus === 'VERIFIED'}
            />
          </div>
        ),
        sortable: false,
      },
      {
        field: 'partner',
        headerName: t(translations.partnerManagement.partner),
        flex: 1,
        minWidth: 200,
        renderCell: params => (
          <div className="flex items-center">
            <p className="leading-[22px] text-[#223250] font-medium mr-2">
              {params?.row?.company?.name}
            </p>
            <PartnerTooltip data={params?.row as any} />
          </div>
        ),
        width: 200,
      },
      {
        field: 'typeOfRoles',
        headerName: t(translations.partnerManagement.typeOfRoles),
        sortable: false,
        width: 200,
        renderCell: (params: any) => (
          <div className="text-[#223250] font-medium">PIC Main</div>
        ),
      },
      {
        field: 'verificationStatus',
        headerName: t(translations.common.status),
        sortable: false,
        width: 200,
        renderCell: params => (
          <div className="rounded-3xl bg-[#FFDFB7] h-[30px] !w-fit font-semibold flex items-center px-3 py-2">
            {params?.row.verificationStatus &&
              t(
                get(
                  translations.verificationStatus,
                  params?.row.verificationStatus,
                ),
              )}
          </div>
        ),
      },
      {
        field: 'task',
        headerName: t(translations.common.task),
        width: 200,
        sortable: true,
        renderCell: (params: any) =>
          params?.row?.verificationStatus && (
            <Task
              verificationStatus={params.row.verificationStatus}
              onClick={() => handleRowClick(params.row)}
            />
          ),
      },
      {
        field: 'createdDate',
        headerName: t(translations.common.timestamp),
        sortable: true,
        width: 200,
        renderCell: params => {
          const value = params.value as number;
          const diff = Math.floor((new Date().getTime() - value) / 1000);
          const hours = Math.floor(diff / 3600);
          const minutes = Math.floor((diff - hours * 3600) / 60);

          let houseStr = hours.toString();
          let minuteStr = minutes.toString();

          if (hours < 10) {
            houseStr = '0' + hours;
          }
          if (minutes < 10) {
            minuteStr = '0' + minutes;
          }

          return (
            <div className="flex whitespace-pre">
              <span className="font-semibold text-[#223250]">
                {moment(value).format('DD/MM/YYYY')}
              </span>
              {!isNoTask(params.row?.verificationStatus) && (
                <>
                  <span> | </span>
                  <span
                    className={classNames(
                      'font-semibold',
                      { 'text-[#1DB135]': diff / 60 < 20 },
                      { 'text-[#D6950E]': 20 <= diff / 60 && diff / 60 <= 40 },
                      { 'text-[#FF0000]': diff / 60 > 40 },
                    )}
                  >
                    {`${houseStr}:${minuteStr}`}
                  </span>
                </>
              )}
            </div>
          );
        },
      },
    ],
    [goToDetail, handleRowClick, t],
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
