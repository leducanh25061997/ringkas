import * as React from 'react';
import {
  DataGrid,
  GridColDef,
  GridRowParams,
  GridSortModel,
} from '@mui/x-data-grid';
import styled from 'styled-components';
import { Pagination, Stack, Typography } from '@mui/material';
import PaginationItem from '@mui/material/PaginationItem';
import NotfoundBg from 'assets/images/not-found.svg';
import spinner from 'assets/loader/spinner.svg';
import { translations } from 'locales/translations';
import { useTranslation } from 'react-i18next';

import KeyboardDoubleArrowRightSharpIcon from '@mui/icons-material/KeyboardDoubleArrowRightSharp';
import KeyboardDoubleArrowLeftSharpIcon from '@mui/icons-material/KeyboardDoubleArrowLeftSharp';

import PageSizeControl from './PageSizeControl';

const RootContainer = styled.div`
  .MuiDataGrid-root {
    border: none !important;
  }

  .MuiDataGrid-columnsContainer {
    background: #ffffff !important;
  }

  .MuiDataGrid-columnHeaderWrapper {
    border-top: 1px solid #e4e7eb;
    /* border-bottom: 1px solid #e4e7eb; */
    background-color: transparent;
    color: #223250;
    height: 70px;

    .MuiDataGrid-columnHeaderTitle {
      font-weight: 600;
      font-size: 16px;
      color: #323232;
    }

    .MuiDataGrid-columnHeader[aria-colindex='1'] {
      padding-left: 22px;
    }
  }

  .MuiDataGrid-row:nth-child(odd) {
    background-color: #f8f9fa;
  }

  .MuiDataGrid-row:nth-child(even) {
    background-color: #fff;
  }

  .MuiDataGrid-cell {
    border: none !important;

    :focus {
      outline: none;
    }

    :focus-within {
      outline: none !important;
    }

    div {
      width: 100%;

      p {
        font-size: 16px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

  .MuiDataGrid-cell[aria-colindex='1'] {
    padding-left: 22px;
  }

  .MuiDataGrid-columnHeader:focus {
    outline: none !important;
  }

  .MuiDataGrid-columnHeader:focus-within {
    outline: none !important;
  }

  .MuiDataGrid-columnSeparator {
    display: none !important;
  }

  .MuiDataGrid-columnHeaderTitle {
    /* user-select: none; */
    padding: 0;
  }

  .MuiDataGrid-columnHeaderTitleContainer {
    padding: 0 !important;
  }

  .MuiCircularProgress-root {
    z-index: 10;
  }
`;

const TableFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  border: 0.2px solid rgb(224, 224, 224);
  height: 45px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;

  .pagination {
    margin-right: 25px;
    line-height: normal;
  }
`;

const LoadingScreen = styled.div`
  display: flex;
  width: 100%;
  height: 333px;
  justify-content: center;
  align-items: center;
`;

export interface TableProps {
  className?: string;
  page: number;
  pageSize: number;
  onPageSizeChange: (pageSize: number) => void;
  onPageChange: (page: number) => void;
  sortModel?: GridSortModel;
  onSortModelChange?: (model: GridSortModel) => void;
  rowCount: number;
  rows?: any[];
  columns: GridColDef[];
  isLoading?: boolean;
  rowHeight?: number;
  onRowClick?: (params: GridRowParams) => void;
  hideFooter?: boolean;
}

export default function CDataGrid(props: TableProps) {
  const {
    className,
    page,
    pageSize,
    hideFooter,
    onPageSizeChange,
    onPageChange,
    rowCount,
    rows,
    sortModel,
    onSortModelChange,
    isLoading,
    columns,
    rowHeight = 70,
    onRowClick,
  } = props;

  const { t } = useTranslation();

  const rowPerPageOptions = [20, 50, 100];
  const isFirstLoad = React.useRef(true);

  React.useEffect(() => {
    if (isLoading) isFirstLoad.current = false;
  }, [isLoading]);

  if (isLoading && isFirstLoad.current)
    return (
      <LoadingScreen>
        <img src={spinner} alt="" width={100} height={100} />
      </LoadingScreen>
    );
  if (!isLoading && rowCount === 0)
    return (
      <RootContainer className={className}>
        <Stack
          spacing={3}
          sx={{
            mb: 5,
            alignItems: 'center',
            minHeight: '700px',
          }}
        >
          <img src={NotfoundBg} alt="" width={275} height={275} />
          <Typography
            sx={{
              fontSize: '16px',
              marginTop: '0px!important',
              fontWeight: 'bold',
            }}
            gutterBottom
          >
            {t(translations.common.dataNotFound)}
          </Typography>
          <Typography sx={{ fontSize: '14px', marginTop: '0px' }} gutterBottom>
            {t(translations.common.weCanNotFind)}
          </Typography>
        </Stack>
      </RootContainer>
    );

  return (
    <RootContainer className={className}>
      <DataGrid
        rows={rows!}
        columns={columns}
        loading={isLoading}
        autoHeight
        disableColumnMenu
        page={page}
        pageSize={pageSize}
        getRowId={row => row.userUuid || row.id || row.projectId}
        hideFooter
        rowCount={rowCount}
        onPageChange={onPageChange}
        onPageSizeChange={onPageSizeChange}
        onRowClick={onRowClick}
        disableSelectionOnClick
        // disableVirtualization
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        // sortingOrder={['asc', 'desc']}
        paginationMode="server"
        sortingMode="server"
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        rowHeight={rowHeight}
      />

      {!hideFooter && (
        <TableFooter>
          {rowCount > 0 && (
            <>
              <PageSizeControl
                page={page}
                onPageSizeChange={onPageSizeChange}
                pageSize={pageSize}
                rowsPerPageOptions={rowPerPageOptions}
                rowCount={rowCount}
              />
              <Pagination
                color="secondary"
                variant="outlined"
                showFirstButton
                shape="rounded"
                className="pagination"
                showLastButton
                count={Math.ceil(rowCount / pageSize)}
                page={page + 1}
                onChange={(e, page) => onPageChange(page - 1)}
                renderItem={item => (
                  <PaginationItem
                    components={{
                      first: KeyboardDoubleArrowLeftSharpIcon,
                      last: KeyboardDoubleArrowRightSharpIcon,
                    }}
                    {...item}
                  />
                )}
              />
            </>
          )}
        </TableFooter>
      )}
    </RootContainer>
  );
}
