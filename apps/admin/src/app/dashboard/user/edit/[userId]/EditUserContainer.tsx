'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../../../../../../components/ui/input';
import { Button } from '../../../../../../components/ui/button';
import { useRouter } from 'next/navigation';
import Loader from '../../../../components/common/Loader';
import { dashboardRoutes, permissions } from '@repo/ui/lib';
import { updateUser } from '../../user.actions';
import PermissionCheck from '../../../../../lib/PermissionCheck';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../components/ui/select';
import { IRole, IUser } from '@repo/ui/types';

interface IEditUserProps {
  userDetail: IUser;
  roles: IRole[];
}

export default function EditUserContainer({
  userDetail,
  roles = [],
}: IEditUserProps) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState({
    ...userDetail,
    password: '',
  });
  const [role, setRole] = useState<IRole | null>(userDetail.role);

  const handleSubmit = async () => {
    if (!formValues.name) {
      toast('Please fill all the fields!');
      return;
    }

    setLoading(true);

    const payload = formValues.password
      ? { ...formValues }
      : {
          name: formValues.name,
          email: formValues.email,
          roleId: role?.id,
        };

    const data = await updateUser(userDetail.id, payload);
    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
      router.push(`${dashboardRoutes.user}`);
    }

    setLoading(false);
  };

  if (loading) {
    return <Loader text="Editing User..." />;
  }

  return (
    <PermissionCheck permission={permissions.user.update}>
      <div className="flex gap-3">
        <div className="flex flex-col w-full">
          <h1 className="py-2">Edit User</h1>
          <div className="gap-3 mr-3">
            <Input
              label="Enter Name"
              required
              value={formValues.name}
              className="my-2"
              onChange={(e) => {
                setFormValues({ ...formValues, name: e.target.value });
              }}
              placeholder="Enter Name"
            />

            <Input
              label="Enter Email"
              required
              value={formValues.email}
              disabled
              className="my-2"
              placeholder="Enter Email"
            />

            <Input
              label="Enter Password"
              required
              type="password"
              value={formValues.password}
              className="my-2"
              onChange={(e) => {
                setFormValues({ ...formValues, password: e.target.value });
              }}
              placeholder="Enter Password"
            />

            <Input
              label="Enter Mobile Number"
              required
              type="number"
              value={formValues.mobile}
              className="my-2"
              onChange={(e) => {
                setFormValues({
                  ...formValues,
                  mobile: e.target.value,
                });
              }}
              placeholder="Enter Mobile Number"
            />

            <Select
              value={role?.name}
              onValueChange={(value) => {
                const selectedRole = roles.find((a) => a.name == value);
                if (selectedRole) {
                  setRole(selectedRole);
                }
              }}
            >
              <SelectTrigger className="w-full my-2">
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((a: IRole) => (
                  <SelectItem key={a.id} value={a.name}>
                    <span>{a.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-3"></div>

          <div className="flex gap-3 px-3 mt-5 justify-end">
            <Button
              disabled={loading}
              className="bg-secondary-color"
              onClick={handleSubmit}
            >
              Edit
            </Button>
          </div>
        </div>
      </div>
    </PermissionCheck>
  );
}
