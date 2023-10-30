import { useDispatch, shallowEqual, useSelector } from 'react-redux';
import { selectAuth } from 'app/pages/Login/slice/selectors';
import { VerificationStatus } from 'types/enums';
import NoPermission from 'app/components/NoPermission';

import { GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react';
import { Button, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

import Dialog from '@mui/material/Dialog';

import ButtonMoreMenu from 'app/components/ButtonMoreMenu';
import { translations } from 'locales/translations';

import Table from 'app/components/Table';

import UploadImageAndVideo from './UploadImageAndVideo';

import { selectMediaCreate } from '../slice/selectors';

import { useMediaManagementSlice } from '../slice';

import copy from 'copy-to-clipboard';
import fileService from '../../../../../services/api/fileService';
import Notifier from '../../../Notifier';

const RootContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  color: #223250;
  margin: 32px 0 20px 0;
`;

const UploadButton = styled.button`
  padding: 10px 22px;
  line-height: 28px;
  font-weight: 600;
  border-radius: 8px;
`;

const ListImageAndVideo = () => {
  const { userInformation } = useSelector(selectAuth, shallowEqual);
  const allowInteraction =
    userInformation?.verificationStatus === VerificationStatus.VERIFIED;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { actions } = useMediaManagementSlice();
  const { mediaFetchList, isLoading } = useSelector(selectMediaCreate);

  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'imageOrVideo',
        headerName: 'Image or Video Name',
        flex: 1,
        minWidth: 350,
        renderCell: params => (
          <div>
            {params?.row?.name ? (
              <Tooltip title={params?.row?.name} placement="bottom-start">
                <Typography sx={{ color: '#005FC5', fontWeight: 500 }}>
                  {params?.row?.name}
                </Typography>
              </Tooltip>
            ) : (
              '-'
            )}
          </div>
        ),
      },
      {
        field: 'format',
        headerName: 'Format',
        sortable: false,
        width: 250,
        renderCell: params => {
          return (
            <div>
              {params?.row?.name ? (
                <Typography>{`.${params?.row?.name
                  .split('.')
                  [
                    params?.row?.name.split('.').length - 1
                  ].toUpperCase()}`}</Typography>
              ) : (
                '-'
              )}
            </div>
          );
        },
      },
      {
        field: 'size',
        headerName: 'Size',
        width: 250,
        sortable: false,
        renderCell: params => (
          <>
            {params?.row?.size ? (
              <Typography>
                {(params?.row?.size / 1024 / 1024).toFixed(2)} MB
              </Typography>
            ) : (
              '-'
            )}
          </>
        ),
      },
      {
        field: 'hostUrl',
        headerName: 'Host URL',
        width: 400,
        renderCell: params => (
          <>
            {params?.row?.location ? (
              <Tooltip title={params?.row?.location} placement="bottom-start">
                <Typography
                  sx={{
                    color: '#005FC5',
                    fontWeight: 400,
                    fontSize: '12px',
                    pr: '32px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {params?.row?.location}
                </Typography>
              </Tooltip>
            ) : (
              <Typography>{'-'}</Typography>
            )}
          </>
        ),
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 150,
        sortable: false,
        renderCell: params => (
          <ButtonMoreMenu
            items={[
              {
                name: t(translations.imageAndVideo.copyUrl),
                itemComponent: Button,
                onClick: () => {
                  copy(params?.row?.location);
                },
              },
              {
                name: t(translations.imageAndVideo.delete),
                itemComponent: Button,
                onClick: () => {
                  fileService
                    .deleteMedia(params?.row?.id)
                    .then(() => {
                      Notifier.addNotifySuccess({
                        messageId: t(translations.success.mediaDeleteSuccess),
                      });
                      getData({ page, pageSize });
                    })
                    .catch(e => {
                      Notifier.addNotifySuccess({
                        messageId: t(translations.error.mediaDeleteFailed),
                      });
                    });
                },
              },
            ]}
          />
        ),
      },
    ],
    [page, pageSize],
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = (newFilter?: Record<string, any>, callback?: Function) => {
    const filterData = {
      page,
      size: pageSize,
      orders: [],
    };
    if (allowInteraction) {
      dispatch(actions.fetchMedia({ ...filterData, ...newFilter }));
    }
    // callback && callback();
  };

  const handleOnChangePage = (page: number) => {
    setPage(page);
    getData({ page });
  };

  const handleOnChangeSize = (size: number) => {
    setPageSize(size);
    getData({ size });
  };

  const onClose = () => {
    setOpenModal(prev => !prev);
  };

  const onOpen = () => {
    if (allowInteraction) {
      setOpenModal(prev => !prev);
    }
  };

  return (
    <React.Fragment>
      <RootContainer>
        <UploadButton
          style={{ backgroundColor: allowInteraction ? '#ffdd00' : '#8D96B0' }}
          onClick={onOpen}
        >
          Upload Image or Video
        </UploadButton>
      </RootContainer>

      <Table
        rows={mediaFetchList && mediaFetchList.data}
        columns={columns}
        rowCount={mediaFetchList?.total || 0}
        page={page}
        pageSize={pageSize}
        onPageChange={handleOnChangePage}
        onPageSizeChange={handleOnChangeSize}
        rowHeight={70}
        isLoading={isLoading}
        // sortModel={sortModel}
        // onSortModelChange={handleSortModelChange}
      />

      <Dialog maxWidth="lg" open={isOpenModal} onClose={onClose}>
        <UploadImageAndVideo onClose={onClose} fetchData={getData} />
      </Dialog>
      {!allowInteraction && <NoPermission />}
    </React.Fragment>
  );
};

export default ListImageAndVideo;
