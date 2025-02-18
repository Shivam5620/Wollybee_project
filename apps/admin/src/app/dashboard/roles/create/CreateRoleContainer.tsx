'use client';
import React, { useState } from 'react';
import RolesContainer, {
  IRoleMetadata,
  IRolesFormValues,
} from '../RolesContainer';
import { useRouter } from 'next/navigation';
import { ICreateRoleRequestBody } from '@repo/ui/types';
import { toast } from 'sonner';
import { createRole } from '../role.action';
import { dashboardRoutes } from '@repo/ui/lib';
import {permissions as permissionsConstants} from '@repo/ui/lib/constants';
import PermissionCheck from '../../../../lib/PermissionCheck';

const CreateRoleContainer = ({
  permissions,
}: {
  permissions: IRolesFormValues[];
}) => {
  const router = useRouter();

  const [formValues, setFormValues] = useState<IRolesFormValues[]>(permissions);
  const [metadata, setMetadata] = useState<IRoleMetadata>({
    title: '',
    description: '',
  });

  const handleSubmit = async (payload: ICreateRoleRequestBody) => {
    const data = await createRole(payload);
    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
      router.push(dashboardRoutes.roles);
    }
  }

  return (
    <PermissionCheck permission={permissionsConstants.role.create}>
      <RolesContainer
        type="create"
        initialValues={metadata}
        setMetadata={setMetadata}
        formValues={formValues}
        setFormValues={setFormValues}
        onSubmit={handleSubmit}
      />
    </PermissionCheck>
  );
};

export default CreateRoleContainer;
