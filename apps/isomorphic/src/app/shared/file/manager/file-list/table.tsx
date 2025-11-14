'use client';

import { Box } from 'rizzui';
import { allFilesData } from '@/data/all-files';
import Table from '@core/components/table';
import { useTanStackTable } from '@core/components/table/custom/use-TanStack-Table';
import TableFooter from '@core/components/table/footer';
import TablePagination from '@core/components/table/pagination';
import { allFilesColumns } from './columns';
import FileTableFilters from '../file-table-filters';

export type FileListTableDataType = {
  id: number;
  doc_filename: string;
  doc_owner: string;
  doc_last_modified: string;
  doc_originalname: string;
};

export default function FileListTable({ className, documents }: { className?: string, documents: FileListTableDataType[] }) {
  const { table, setData } = useTanStackTable<FileListTableDataType>({
    tableData: documents,
    columnConfig: allFilesColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 10,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
          table.resetRowSelection();
        },
        handleMultipleDelete: (rows) => {
          setData((prev) => prev.filter((r) => !rows.includes(r)));
          table.resetRowSelection();
        },
      },
      enableColumnResizing: false,
    },
  });
  return (
    <Box className={className}>
      <FileTableFilters table={table} />
      <Table table={table} variant="modern" />
      <TableFooter table={table} />
      <TablePagination table={table} className="py-4" />
    </Box>
  );
}
