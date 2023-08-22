'use client';

import { type ColumnDef } from '@tanstack/react-table';
import type { Interview } from '@prisma/client';
import { ArrowUpDown } from 'lucide-react';
import { Button } from '~/components/ui/Button';
import { ActionsDropdown } from '~/components/DataTable/ActionsDropdown';
import { Checkbox } from '~/components/ui/checkbox';

export const InterviewColumns: ColumnDef<Interview>[] = [
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
          Interview ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: 'startTime',
    header: 'Start Time',
    cell: ({ row }) => {
      const date = new Date(row.original.startTime);
      const isoString = date.toISOString().replace('T', ' ').replace('Z', '');
      return isoString + ' UTC';
    },
  },
  {
    accessorKey: 'finishTime',
    header: 'Finish Time',
    cell: ({ row }) => {
      // finishTime is optional
      if (!row.original.finishTime) {
        return 'Not completed';
      }
      const date = new Date(row.original.finishTime);
      const isoString = date.toISOString().replace('T', ' ').replace('Z', '');
      return isoString + ' UTC';
    },
  },
  {
    accessorKey: 'exportTime',
    header: 'Export Time',
    cell: ({ row }) => {
      // exportTime is optional
      if (!row.original.exportTime) {
        return 'Not yet exported';
      }
      const date = new Date(row.original.exportTime);
      const isoString = date.toISOString().replace('T', ' ').replace('Z', '');
      return isoString + ' UTC';
    },
  },
  {
    accessorKey: 'lastUpdated',
    header: 'Last Updated',
    cell: ({ row }) => {
      const date = new Date(row.original.lastUpdated);
      const isoString = date.toISOString().replace('T', ' ').replace('Z', '');
      return isoString + ' UTC';
    },
  },
  {
    accessorKey: 'userId',
    header: 'User ID',
  },
  {
    accessorKey: 'protocolId',
    header: 'Protocol ID',
  },
  {
    accessorKey: 'currentStep',
    header: 'Current Step',
  },
  {
    id: 'actions',
    cell: () => {
      return <ActionsDropdown menuItems={['Edit', 'Resume', 'Delete']} />;
    },
  },
];
