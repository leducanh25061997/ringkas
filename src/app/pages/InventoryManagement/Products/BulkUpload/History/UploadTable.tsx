import React from 'react';
import Table from 'app/components/Table';
import { GridColDef } from '@mui/x-data-grid';

interface Props {
  className?: string;
}

function UploadTable({ className }: Props) {
  const columns: GridColDef[] = [
    {
      field: 'date',
      headerName: 'Tanggal',
      renderCell: params => <p className="font-medium">{params.value}</p>,
      width: 300,
      sortable: false,
    },
    {
      field: 'documentName',
      headerName: 'Nama Dokumen',
      renderCell: params => <p className="font-medium">{params.value}</p>,
      width: 500,
      sortable: false,
    },
    {
      field: 'userName',
      headerName: 'User Name',
      renderCell: params => <p className="font-medium">{params.value}</p>,
      width: 300,
      sortable: false,
    },
  ];

  const rows = [
    {
      date: '12-02-2021',
      id: 1,
      documentName: 'bulk_update_product_template_metland_a.xlsx',
      userName: 'Hung',
    },
    {
      date: '12-02-2021',
      id: 2,
      documentName: 'bulk_update_product_template_metland_a.xlsx',
      userName: 'Hung',
    },
    {
      date: '12-02-2021',
      id: 3,
      documentName: 'bulk_update_product_template_metland_a.xlsx',
      userName: 'Hung',
    },
    {
      date: '12-02-2021',
      id: 4,
      documentName: 'bulk_update_product_template_metland_a.xlsx',
      userName: 'Hung',
    },
    {
      date: '12-02-2021',
      id: 5,
      documentName: 'bulk_update_product_template_metland_a.xlsx',
      userName: 'Hung',
    },
  ];

  return (
    <Table
      className={className}
      rows={rows}
      columns={columns}
      rowCount={5}
      page={0}
      pageSize={5}
      onPageChange={() => {}}
      onPageSizeChange={() => {}}
    />
  );
}

export default React.memo(UploadTable);
