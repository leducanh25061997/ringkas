import { GridColDef, GridSortModel } from '@mui/x-data-grid';
import Table from 'app/components/Table';
import useRoles from 'app/hooks/useRoles';
import { useSafeState } from 'app/hooks/useSafeState';
import path from 'app/routes/path';
import classNames from 'classnames';
import { translations } from 'locales/translations';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useManageCustomerSlice } from '../slice';
import { selectManageCustomer } from '../slice/selectors';
import FilterBar from './FilterBar';
import FollowUpDialog from './FollowUpDialog';
import LeadsTooltip from './LeadsTooltip';
import PropertyDialog from './PropertyDialog';

import {
  ApplicationStatus,
  CustomerList,
  DeveloperAssigneeInformation,
  LeadInformation,
  PicInformation,
  PropertyInformation,
  SearchKeyType,
} from './types';
import UserTooltip from './UserTooltip';

interface Props {
  allowInteraction: boolean;
}

function ListCustomer(props: Props) {
  const {
    customersData: { data, total },
  } = useSelector(selectManageCustomer, shallowEqual);
  const { allowInteraction } = props;

  const { t } = useTranslation();
  const [page, setPage] = useSafeState(0);
  const [pageSize, setPageSize] = useSafeState<number>(20);
  const [isLoading, setIsLoading] = useSafeState(true);
  const [searchBy, setSearchBy] = useSafeState<SearchKeyType>();
  const [searchKey, setSearchKey] = useSafeState('');
  const [sortModel, setSortModel] = useSafeState<GridSortModel>([]);

  const role = useRoles();

  const dispatch = useDispatch();

  const { actions } = useManageCustomerSlice();

  const navigate = useNavigate();

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = (newFilter?: Record<string, any>, callback?: Function) => {
    if (!role) return;
    if (!allowInteraction) {
      setIsLoading(false);
      callback && callback();
      return;
    }
    const filterData = {
      page,
      size: pageSize,
      searchKey,
      searchKeyType: searchBy,
    };
    dispatch(
      actions.getListCustomer(
        {
          params: { ...filterData, ...newFilter },
        },
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

  const handleSearchByChange = (searchKeyType: SearchKeyType) => {
    getData({ searchKeyType, page: 0 }, () => {
      setSearchBy(searchKeyType);
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

  const handleClickRegister = () => {
    navigate(path.createCustomerAccount);
  };

  const isFollowUp = (rowData: CustomerList) => {
    const { applicationStatus } = rowData;
    switch (role) {
      case 'developer':
        if (
          applicationStatus === 'ONBOARDING' ||
          applicationStatus === 'KYC_RETURNED' ||
          applicationStatus === 'APPROVED' ||
          applicationStatus === 'DECLINED'
        )
          return true;
        return false;

      case 'bank':
        if (
          applicationStatus === 'ONBOARDING' ||
          applicationStatus === 'KYC_RETURNED' ||
          applicationStatus === 'APPROVED' ||
          applicationStatus === 'DECLINED'
        )
          return true;
        return false;
      case 'client':
        if (
          applicationStatus === 'ONBOARDING' ||
          applicationStatus === 'KYC_RETURNED' ||
          applicationStatus === 'APPROVED' ||
          applicationStatus === 'DECLINED' ||
          applicationStatus === 'PRE_SCORING_READY'
        )
          return true;
        return false;
      default:
        return false;
    }
  };

  const isNoTask = (rowData: CustomerList) => {
    switch (role) {
      case 'admin':
        if (
          rowData.applicationStatus === 'PRE_SCORING_READY' &&
          rowData.ringkasRecommendation !== 'RECOMMENDED'
        )
          return false;
        if (rowData.applicationStatus === 'DATA_READY') return false;
        return true;
      default:
        if (
          rowData.applicationStatus === 'SYSTEM_WIP' ||
          rowData.applicationStatus === 'DATA_READY'
        )
          return true;
        return false;
    }
  };

  const columns: GridColDef[] = useMemo(
    () => {
      const _columns: GridColDef[] = [];

      _columns.push({
        field: 'customerName',
        headerName: t(translations.customerList.customer),
        flex: 1,
        renderCell: params => (
          <div className="flex items-center">
            <Link
              to={`${path.customerAccountList}/${params.row.id}`}
              className="overflow-hidden text-ellipsis"
            >
              <p className="leading-[22px] text-[#005FC5] font-medium underline mr-2">
                {(params.value as any).fullName}
              </p>
            </Link>
            <UserTooltip data={params.value as any} />
          </div>
        ),
        sortable: false,
      });

      if (role === 'admin')
        _columns.push(
          {
            field: 'leads',
            headerName: t(translations.customerList.leads),
            flex: 1,
            renderCell: params => {
              const data = params.value as LeadInformation;
              return (
                <div className="flex items-center">
                  <p className="leading-[22px] font-medium mr-2 text-[#223250]">
                    {data?.company?.name || 'Ringkas'}
                  </p>
                  <LeadsTooltip data={data} />
                </div>
              );
            },
            sortable: false,
          },
          {
            field: 'pic',
            headerName: t(translations.customerList.pic),
            flex: 1,
            renderCell: params => {
              const picData = params.value as PicInformation;
              return (
                <div className="flex items-center">
                  <p className="leading-[22px] font-medium mr-2 text-[#223250]">
                    {/* {picData.fullName || '-'} */}
                    Ringkas
                  </p>
                  {/* <UserTooltip data={picData} showActiveStatus={false} /> */}
                </div>
              );
            },
            sortable: false,
          },
        );

      if (role !== 'admin')
        _columns.push(
          {
            field: 'property',
            headerName: t(translations.customerList.property),
            flex: 1,
            renderCell: params => {
              const data = params.value as PropertyInformation & {
                logo?: string;
              };
              return (
                <div className="flex items-center">
                  <p className="leading-[22px] font-medium mr-2">
                    {data?.projectName || '-'}
                  </p>
                  <PropertyDialog data={params.value as any} />
                </div>
              );
            },
            sortable: false,
          },
          {
            field: 'assignee',
            headerName: t(translations.customerList.assignee),
            flex: 1,
            renderCell: params => {
              const data = params.value as DeveloperAssigneeInformation;
              return (
                <div className="flex items-center">
                  <p className="leading-[22px] font-medium mr-2 text-[16px] text-[#223250]">
                    {data?.kyc?.fullName || '-'}
                  </p>
                  <UserTooltip
                    showActiveStatus={false}
                    data={{
                      fullName: data?.kyc?.fullName,
                      email: data?.kyc?.email,
                      phone: data?.kyc?.phone,
                    }}
                  />
                </div>
              );
            },
            sortable: false,
          },
        );

      _columns.push(
        {
          field: 'status',
          headerName: t(translations.customerList.status),
          flex: 1,
          renderCell: params => (
            <p className="rounded-3xl bg-[#FFDFB7] h-[30px] !w-fit font-semibold flex items-center px-3 py-2">
              {t(
                ApplicationStatus[
                  params.value as keyof typeof ApplicationStatus
                ],
              )}
            </p>
          ),
          sortable: false,
        },
        {
          field: 'task',
          headerName: t(translations.customerList.task),
          sortable: false,
          flex: 1,
          renderCell: params => {
            const value = params.value as {
              applicationId: number;
              ringkasRecommendation?: string;
              applicationStatus: keyof typeof ApplicationStatus;
            };
            switch (role) {
              case 'admin':
                return <AdminTask {...value} />;
              case 'bank':
                return <BankTask {...value} />;
              case 'developer':
                return <DeveloperTask {...value} />;
              case 'client':
                return <ClientTask {...value} />;
            }
          },
        },
        {
          field: 'timeStamp',
          headerName: t(translations.customerList.timeStamp),
          flex: 1,
          renderCell: params => {
            const rowData = params.value as CustomerList;
            const value = rowData.slaDate;
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
                <span className="font-semibold text-[#005FC5]">
                  {`${moment(value).format('DD/MM/YYYY')}`}
                </span>
                {!isNoTask(rowData) && !isFollowUp(rowData) && (
                  <>
                    <span className="font-semibold text-[#005FC5]">
                      {` | `}
                    </span>
                    <span
                      className={classNames(
                        'font-semibold',
                        { 'text-[#1DB135]': diff / 60 < 20 },
                        {
                          'text-[#D6950E]': 20 <= diff / 60 && diff / 60 <= 40,
                        },
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
          sortable: false,
        },
      );
      return _columns;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [t, role],
  );

  const rows = useMemo(() => {
    return data
      ? data.map(item => ({
          id: item.applicationId,
          timeStamp: item,
          property: {
            applicationId: item.applicationId,
            ...item.property,
            logo: item.developerAssignee?.company?.fileLogo
              ? item.developerAssignee.company.fileLogo
              : undefined,
          },
          assignee: item.developerAssignee,
          customerName: item.customerContact,
          status: item.applicationStatus,
          task: {
            applicationStatus: item.applicationStatus,
            applicationId: item.applicationId,
            ringkasRecommendation: item.ringkasRecommendation,
          },
          leads: item.leads,
          pic: item.pic,
        }))
      : [];
  }, [data]);

  return (
    <>
      <FilterBar
        onClickRegister={handleClickRegister}
        searchBy={searchBy}
        onChangeSearchBy={handleSearchByChange}
        onChangeSearchInput={handleSearchInputChange}
        allowInteraction={allowInteraction}
      />

      <Table
        rows={rows}
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

export default React.memo(ListCustomer);

interface TaskProps {
  applicationStatus: keyof typeof ApplicationStatus;
  ringkasRecommendation?: string;
  applicationId: number;
}

const AdminTask = ({
  applicationStatus,
  ringkasRecommendation,
  applicationId,
}: TaskProps) => {
  const { t } = useTranslation();

  switch (applicationStatus) {
    case 'DATA_READY':
      return (
        <Link
          to={`/manage-users/customer/kyc-verification/${applicationId}`}
          className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer"
        >
          {t(translations.customerList.verify)}
        </Link>
      );
    case 'PRE_SCORING_READY':
      if (ringkasRecommendation === 'RECOMMENDED')
        return (
          <p className="leading-[22px] text-[#223250] font-semibold">
            {t(translations.customerList.noTask)}
          </p>
        );
      return (
        <Link
          to={`/manage-users/customer/scoring-verification/${applicationId}`}
          className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer"
        >
          {t(translations.customerList.assess)}
        </Link>
      );
    default:
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold">
          {t(translations.customerList.noTask)}
        </p>
      );
  }
};

const DeveloperTask = ({
  applicationStatus,
  ringkasRecommendation,
  applicationId,
}: TaskProps) => {
  const { t } = useTranslation();
  const [openContact, setOpenContact] = useState(false);
  switch (applicationStatus) {
    case 'SYSTEM_WIP':
      return (
        <p className="leading-[22px] text-[#223250] font-semibold">
          {t(translations.customerList.noTask)}
        </p>
      );
    case 'DATA_READY':
      return (
        <p className="leading-[22px] text-[#223250] font-semibold">
          {t(translations.customerList.noTask)}
        </p>
      );
    case 'PRE_SCORING_READY':
      return (
        <Link
          to={`/manage-user/developer/workspace/${applicationId}`}
          className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer"
        >
          {t(translations.customerList.viewTask)}
        </Link>
      );
    default:
      return (
        <>
          <p
            className="leading-[22px] text-[#005FC5] font-semibold underline cursor-pointer"
            onClick={() => setOpenContact(true)}
          >
            {t(translations.customerList.followUp)}
          </p>
          <FollowUpDialog
            open={openContact}
            onClose={() => setOpenContact(false)}
          />
        </>
      );
  }
};

const BankTask = ({
  applicationStatus,
  ringkasRecommendation,
  applicationId,
}: TaskProps) => {
  const { t } = useTranslation();
  const [openContact, setOpenContact] = useState(false);

  switch (applicationStatus) {
    case 'SYSTEM_WIP':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold">
          {t(translations.customerList.noTask)}
        </p>
      );
    case 'DATA_READY':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold">
          {t(translations.customerList.noTask)}
        </p>
      );
    case 'PRE_SCORING_READY':
      return (
        <Link
          to={`/manage-users/bank/workspace/${applicationId}`}
          className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer"
        >
          {t(translations.customerList.viewTask)}
        </Link>
      );
    default:
      return (
        <>
          <p
            className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer"
            onClick={() => setOpenContact(true)}
          >
            {t(translations.customerList.followUp)}
          </p>
          <FollowUpDialog
            open={openContact}
            onClose={() => setOpenContact(false)}
          />
        </>
      );
  }
};

const ClientTask = ({
  applicationStatus,
  ringkasRecommendation,
  applicationId,
}: TaskProps) => {
  const [openContact, setOpenContact] = useState(false);
  const { t } = useTranslation();
  switch (applicationStatus) {
    case 'SYSTEM_WIP':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold">
          {t(translations.customerList.noTask)}
        </p>
      );
    case 'DATA_READY':
      return (
        <p className="leading-[22px] !text-[#223250] font-semibold">
          {t(translations.customerList.noTask)}
        </p>
      );
    default:
      return (
        <>
          <p
            className="leading-[22px] !text-[#005FC5] font-semibold underline cursor-pointer"
            onClick={() => setOpenContact(true)}
          >
            <FollowUpDialog
              open={openContact}
              onClose={() => setOpenContact(false)}
            />

            {t(translations.customerList.followUp)}
          </p>
        </>
      );
  }
};
