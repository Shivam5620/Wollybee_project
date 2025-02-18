'use client';
import { useEffect, useState } from 'react';
import RolesContainer, {
  IRoleMetadata,
  IRolesFormValues,
} from '../../RolesContainer';
import { ICreateRoleRequestBody, IRole } from '@repo/ui/types';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { editRole } from '../../role.action';
import { createPermissionsData } from '../../role.utils';
import { dashboardRoutes } from '@repo/ui/lib';
import { permissions as permissionsConstants } from '@repo/ui/lib/constants';
import PermissionCheck from '../../../../../lib/PermissionCheck';

const EditRoleContainer = ({
  permissions,
  role,
}: {
  permissions: IRolesFormValues[];
  role: IRole;
}) => {
  const router = useRouter();
  const [formValues, setFormValues] = useState<IRolesFormValues[]>([]);
  const [metadata, setMetadata] = useState<IRoleMetadata>({
    title: role.name,
    description: role.description,
  });

  useEffect(() => {
    setFormValues(createPermissionsData(permissions, role));
  }, [permissions, role]);

  const handleSubmit = async (payload: ICreateRoleRequestBody) => {
    const data = await editRole({ id: role.id, payload });
    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
      router.push(dashboardRoutes.roles);
    }
  }

  return (
    <PermissionCheck permission={permissionsConstants.role.update}>
      <RolesContainer
        type="edit"
        initialValues={metadata}
        onSubmit={handleSubmit}
        setMetadata={setMetadata}
        formValues={formValues}
        setFormValues={setFormValues}
      />
    </PermissionCheck>
  );
};

export default EditRoleContainer;
