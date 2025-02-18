'use client';
import { TableComponent } from '../../components/common/TableComponent';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../../../components/ui/button';
import { IConfigurationResponse } from '@repo/ui/types/configuration';

import { ConfigurationType } from '@repo/ui/enums/configuration';
import { useState } from 'react';
import CustomDialog from '../../components/common/CustomDialog';
import UpdateConfiguration from './UpdateConfiguration';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';

const ConfigurationContainer = ({
  data,
}: {
  data: IConfigurationResponse[];
}) => {

  const [selectedItem, setSelectedItem] =
    useState<IConfigurationResponse | null>(null);

  const columns: ColumnDef<IConfigurationResponse>[] = [
    {
      accessorKey: 'key',
      header: 'Key',
    },
    {
      accessorKey: 'type',
      header: 'Type',
    },
    {
      accessorKey: 'description',
      header: 'Description',
    },
    {
      accessorKey: 'value',
      header: 'Value',
    },
    {
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => {
        return (
          <PermissionCheck permission={permissions.configuration.update}>
            <Button
              className="rounded-full h-10 w-10 text-xl hover:bg-primary-color hover:text-black"
              onClick={() => {
                setSelectedItem(row.original);
              }}
            >
              ✎
            </Button>
          </PermissionCheck>
        );
      },
    },
  ];

  return (
    <PermissionCheck permission={permissions.configuration.read}>
      <div>
        {selectedItem && (
          <CustomDialog
            className="max-w-[95vh] max-h-[95vh] overflow-scroll"
            open={selectedItem != null}
            Component={
              <UpdateConfiguration
                id={selectedItem?.id}
                keyName={selectedItem?.key as ConfigurationType}
                type={selectedItem?.type}
                description={selectedItem?.description}
                value={selectedItem?.value}
                onCancel={() => {
                  setSelectedItem(null);
                }}
              />
            }
          />
        )}
        <TableComponent
          tableHeading="Configuration"
          columns={columns}
          data={data}
          filterable={true}
          filterColumnName="key"
          tableActions={[]}
        />
      </div>
    </PermissionCheck>
  );
};

export default ConfigurationContainer;
