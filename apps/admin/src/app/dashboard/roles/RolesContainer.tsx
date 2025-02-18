'use client';
import React, { useEffect, useState } from 'react';
import { Checkbox } from '../../../../components/ui/checkbox';
import { ColumnDef } from '@tanstack/react-table';
import { TableComponent } from '../../components/common/TableComponent';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { AllowedPermission } from '@repo/ui/enums';
import { ICreateRoleRequestBody } from '@repo/ui/types';

interface IRolesContainerCheckBox {
  checked: boolean;
  setValue: (value: boolean) => void;
}

export interface IRoleMetadata {
  title: string;
  description: string;
}

interface IRolesContainer {
  type: 'create' | 'edit';
  initialValues: {
    title: string;
    description: string;
  };
  formValues: IRolesFormValues[];
  setFormValues: (value: IRolesFormValues[]) => void;
  onSubmit: any;
  setMetadata: (value: IRoleMetadata) => void;
}

export interface IRolesFormValues {
  id: number;
  feature: string;
  module: string;
  availablePermissions?: AllowedPermission[];
  allowedPermissions: {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  };
}

function RolesContainerCheckBox({
  checked,
  setValue,
}: IRolesContainerCheckBox) {
  return (
    <Checkbox
      checked={checked}
      onCheckedChange={(val: boolean) => {
        setValue(val);
      }}
      className="h-5 w-5 border-secondary-color data-[state=checked]:bg-primary-color data-[state=checked]:border-primary-color"
    />
  );
}

const RolesContainer = ({
  type = 'create',
  initialValues,
  formValues,
  setFormValues,
  onSubmit,
  setMetadata,
}: IRolesContainer) => {
  const [loading, setLoading] = useState<boolean>(false);
  const handleCheckboxClick = (
    val: boolean,
    id: number,
    action: AllowedPermission,
  ) => {
    const newFormValues: IRolesFormValues[] = [...formValues];
    const index: number = newFormValues.findIndex((a) => a.id == id);
    if (index == -1) {
      return;
    }
    const updatedData: IRolesFormValues = { ...newFormValues[index] };
    updatedData.allowedPermissions[`${action}`] = val;
    newFormValues[index] = updatedData;
    setFormValues(newFormValues);
  };

  const handleSubmit = async () => {
    const payload: ICreateRoleRequestBody = {
      name: initialValues.title,
      description: initialValues.description,
      permissions: formValues
        .map((a) => {
          const allowedPermissions = [];
          if (a.allowedPermissions.create) {
            allowedPermissions.push(AllowedPermission.CREATE);
          }
          if (a.allowedPermissions.read) {
            allowedPermissions.push(AllowedPermission.READ);
          }
          if (a.allowedPermissions.update) {
            allowedPermissions.push(AllowedPermission.UPDATE);
          }
          if (a.allowedPermissions.delete) {
            allowedPermissions.push(AllowedPermission.DELETE);
          }

          return {
            permissionId: a.id,
            allowedPermissions,
          };
        })
        ?.filter((a) => {
          return a.allowedPermissions.length > 0;
        }),
    };
    setLoading(true);
    await onSubmit(payload);
    setLoading(false);
  };

  const addRolescolumns: ColumnDef<IRolesFormValues>[] = [
    {
      accessorKey: 'module',
      header: 'Module',
    },
    {
      accessorKey: 'feature',
      header: 'Feature',
    },
    {
      id: 'create',
      header: 'Create',
      cell: ({ row }) => {
        const isCreatePermissionAvailable =
          row.original.availablePermissions?.includes(AllowedPermission.CREATE);

        if (!isCreatePermissionAvailable && type != 'edit') {
          return <></>;
        }
        return (
          <div>
            <RolesContainerCheckBox
              setValue={(val: boolean) => {
                handleCheckboxClick(
                  val,
                  row.original.id,
                  AllowedPermission.CREATE,
                );
              }}
              checked={
                row.original.allowedPermissions[AllowedPermission.CREATE]
              }
            />
          </div>
        );
      },
    },
    {
      id: 'Read',
      header: 'Read',
      cell: ({ row }) => {
        const isReadPermissionAvailable =
          row.original.availablePermissions?.includes(AllowedPermission.READ);

        if (!isReadPermissionAvailable && type != 'edit') {
          return <></>;
        }
        return (
          <div>
            <RolesContainerCheckBox
              setValue={(val) => {
                handleCheckboxClick(
                  val,
                  row.original.id,
                  AllowedPermission.READ,
                );
              }}
              checked={row.original.allowedPermissions[AllowedPermission.READ]}
            />
          </div>
        );
      },
    },
    {
      id: 'update',
      header: 'Update',
      cell: ({ row }) => {
        const isUpdatePermissionAvailable =
          row.original.availablePermissions?.includes(AllowedPermission.UPDATE);

        if (!isUpdatePermissionAvailable && type != 'edit') {
          return <></>;
        }
        return (
          <div>
            <RolesContainerCheckBox
              setValue={(val) => {
                handleCheckboxClick(
                  val,
                  row.original.id,
                  AllowedPermission.UPDATE,
                );
              }}
              checked={
                row.original.allowedPermissions[AllowedPermission.UPDATE]
              }
            />
          </div>
        );
      },
    },
    {
      id: 'delete',
      header: 'Delete',
      cell: ({ row }) => {
        const isDeletePermissionAvailable =
          row.original.availablePermissions?.includes(AllowedPermission.DELETE);

        if (!isDeletePermissionAvailable && type != 'edit') {
          return <></>;
        }
        return (
          <div>
            <RolesContainerCheckBox
              setValue={(val) => {
                handleCheckboxClick(
                  val,
                  row.original.id,
                  AllowedPermission.DELETE,
                );
              }}
              checked={
                row.original.allowedPermissions[AllowedPermission.DELETE]
              }
            />
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold">
          {type == AllowedPermission.CREATE ? 'Create Role' : 'Edit Role'}
        </h1>
        <Button disabled={loading} onClick={handleSubmit}>
          {type == AllowedPermission.CREATE ? 'Create Role' : 'Edit Role'}
        </Button>
      </div>
      <div className="flex gap-3">
        <Input
          className="my-1"
          type="text"
          value={initialValues.title}
          placeholder="Enter title"
          onChange={(e) => {
            setMetadata({
              description: initialValues.description,
              title: e.target.value,
            });
          }}
        />

        <Input
          className="my-1"
          type="text"
          value={initialValues.description}
          placeholder="Enter Description"
          onChange={(e) => {
            setMetadata({
              description: e.target.value,
              title: initialValues.title,
            });
          }}
        />
      </div>

      <TableComponent
        tableHeading="Set Permissions"
        columns={addRolescolumns}
        data={formValues}
        filterable={true}
        filterColumnName="module"
        filterPlaceholder="Search by module.."
        pageSize={50}
        hidePagination={true}
      />
    </div>
  );
};

export default RolesContainer;
