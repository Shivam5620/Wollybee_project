'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Input } from '../../../../../components/ui/input';
import { Button } from '../../../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select';
import { useRouter } from 'next/navigation';
import Loader from '../../../components/common/Loader';
import { IRole, IUserClient } from '@repo/ui/types';
import { createUser } from '../user.actions';
import { dashboardRoutes, permissions } from '@repo/ui/lib';
import PermissionCheck from '../../../../lib/PermissionCheck';

interface ICreateUserProps {
  roles: IRole[];
}

const initialState: IUserClient = {
  name: '',
  email: '',
  password: '',
  roleId: -1,
  mobile: '',
};

export default function CreateUserContainer({ roles }: ICreateUserProps) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<IUserClient>(initialState);
  const [role, setRole] = useState<IRole | null>(null);

  const handleSubmit = async () => {
    if (
      !formValues.name ||
      !formValues.email ||
      !formValues.password ||
      !formValues.mobile
    ) {
      toast('Please fill all the fields!');
      return;
    }

    if (formValues.mobile.length != 10) {
      toast('Please enter a valid mobile number!');
      return;
    }

    if (role == null) {
      toast('Please Select Role!');
      return;
    }

    setLoading(true);

    const data = await createUser({
      ...formValues,
      roleId: role?.id,
    });

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
    return <Loader text="Creating User..." />;
  }

  return (
    <PermissionCheck permission={permissions.user.create}>
      <div className="flex gap-3">
        <div className="flex flex-col w-full">
          <h1 className="py-2">Create User</h1>
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
              className="my-2"
              type="email"
              onChange={(e) => {
                setFormValues({ ...formValues, email: e.target.value });
              }}
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
              Create
            </Button>
          </div>
        </div>
      </div>
    </PermissionCheck>
  );
}
