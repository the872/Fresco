'use client';

import { type ColumnDef } from '@tanstack/react-table';
import type { Protocol } from '@prisma/client';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '~/components/ui/Button';
import { ActionsDropdown } from '~/components/DataTable/ActionsDropdown';
import { Checkbox } from '~/components/ui/checkbox';

export const ProtocolColumns: ColumnDef<Protocol>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Protocol ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'schemaVersion',
    header: 'Schema Version',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: 'importedAt',
    header: 'Imported At',
    cell: ({ row }) => {
      const date = new Date(row.original.importedAt);
      return date.toLocaleString();
    },
  },
  {
    accessorKey: 'lastModified',
    header: 'Last Modified',
    cell: ({ row }) => {
      const date = new Date(row.original.lastModified);
      return date.toLocaleString();
    },
  },
  {
    id: 'actions',
    cell: () => {
      return <ActionsDropdown menuItems={['Edit', 'Delete']} />;
    },
  },
];
