'use client';

import Favorite from '@/app/shared/file/manager/favorite';
import { MoreActions } from '@core/components/table-utils/more-actions';
import { createColumnHelper } from '@tanstack/react-table';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Checkbox, Flex, Text, Title } from 'rizzui';
import { FileListTableDataType } from './table';

const columnHelper = createColumnHelper<FileListTableDataType>();

export const allFilesColumns = [
  columnHelper.display({
    id: 'checked',
    size: 50,
    header: ({ table }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select all rows"
        checked={table.getIsAllPageRowsSelected()}
        onChange={() => table.toggleAllPageRowsSelected()}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="ps-3.5"
        aria-label="Select row"
        checked={row.getIsSelected()}
        onChange={() => row.toggleSelected()}
      />
    ),
  }),
  columnHelper.accessor('doc_filename', {
    id: 'name',
    size: 320,
    header: 'Name',
    cell: ({ row }) => (
      <Flex align="center">
        <Flex
          align="center"
          justify="center"
          className="size-12 rounded-xl bg-gray-100"
        >
          <Image
            src={row.original.doc_originalname?.split('.').pop() === 'pdf' ? '/images/file-icons/pdf.svg' : '/images/file-icons/file.svg'}
            className="aspect-square"
            width={26}
            height={26}
            alt={row.original.doc_filename || 'Document'}
          />
        </Flex>
        <Title as="h6" className="mb-0.5 !text-sm font-medium">
          {row.original.doc_filename || 'Document'}
        </Title>
      </Flex>
    ),
  }),
  columnHelper.accessor('doc_originalname', {
    id: 'type',
    size: 130,
    header: 'Type',
    enableSorting: false,
    cell: ({ row }) => (
      <span className="capitalize text-gray-500">{row.original.doc_originalname?.split('.').pop() || 'Unknown'}</span>
    ),
  }),
  columnHelper.accessor('doc_last_modified', {
    id: 'modified',
    size: 200,
    header: 'Modified',
    cell: ({ row }) => (
      <Text className="mb-1 text-gray-500">
        {dayjs(row.original.doc_last_modified).format('DD MMM YYYY')}
      </Text>
    ),
  }),
  columnHelper.display({
    id: 'shared',
    size: 200,
    header: '',
    cell: ({ row }) => (
      <div className="flex items-center justify-start">
      </div>
    ),
  }),
  columnHelper.display({
    id: 'action',
    size: 100,
    header: '',
    cell: ({
      row,
      table: {
        options: { meta },
      },
    }) => (
      <Flex align="center" justify="end">
        <Favorite />
        <MoreActions onDelete={() => meta?.handleDeleteRow?.(row.original)} />
      </Flex>
    ),
  }),
];
