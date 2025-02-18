'use client';
import { ColumnDef } from '@tanstack/react-table';
import { Checkbox } from '../../../../../components/ui/checkbox';
import { TableComponent } from '../../../components/common/TableComponent';
import { permissions as permissionsConstants } from '@repo/ui/lib/constants';
import { IRole } from '@repo/ui/types';
import { IRolesFormValues } from '../RolesContainer';
import { AllowedPermission } from '@repo/ui/enums';
import PermissionCheck from '../../../../lib/PermissionCheck';

function RolesContainerCheckBox({ checked }: { checked: boolean }) {
  return (
    <Checkbox
      checked={checked}
      disabled
      className="h-5 w-5  disabled:opacity-100 border-secondary-color data-[state=checked]:bg-primary-color data-[state=checked]:border-primary-color"
    />
  );
}

const ViewRolesContainer = ({
  options,
  role,
}: {
  options: IRolesFormValues[];
  role: IRole;
}) => {
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
        const isCreatePermissionAvailable = row.original.availablePermissions?.includes(AllowedPermission.CREATE);

        if(!isCreatePermissionAvailable){
          return <></>;
        }

        return (
          <div>
            <RolesContainerCheckBox
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
        const isReadPermissionAvailable = row.original.availablePermissions?.includes(AllowedPermission.READ);

        if(!isReadPermissionAvailable){
          return <></>;
        }
        return (
          <div>
            <RolesContainerCheckBox
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
        const isUpdatePermissionAvailable = row.original.availablePermissions?.includes(AllowedPermission.UPDATE);

        if(!isUpdatePermissionAvailable){
          return <></>;
        }

        return (
          <div>
            <RolesContainerCheckBox
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
        const isDeletePermissionAvailable = row.original.availablePermissions?.includes(AllowedPermission.DELETE);

        if(!isDeletePermissionAvailable){
          return <></>;
        }
        return (
          <div>
            <RolesContainerCheckBox
              checked={
                row.original?.allowedPermissions[AllowedPermission.DELETE]
              }
            />
          </div>
        );
      },
    },
  ];

  return (
    <PermissionCheck permission={permissionsConstants.role.read}>
      <TableComponent
        tableHeading={`View Permissions : ${role.name}`}
        columns={addRolescolumns}
        data={options}
        pageSize={50}
        filterable={true}
        filterColumnName="module"
        filterPlaceholder="Search by module.."
      />
    </PermissionCheck>
  );
};

export default ViewRolesContainer;
