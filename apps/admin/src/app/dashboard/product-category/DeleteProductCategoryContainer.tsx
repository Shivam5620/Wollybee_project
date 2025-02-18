import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { deleteProductCategory } from './productCategory.action';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';

export interface IDeleteProductCategoryContainerProps {
  id: number;
  title: string;
  onClose: () => void;
  onDelete: () => void;
}

export default function DeleteProductCategoryContainer({
  id,
  title,
  onClose,
  onDelete,
}: IDeleteProductCategoryContainerProps) {
  const [value, setValue] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    setLoading(true);
    const data = await deleteProductCategory(id);
    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
    }
    setLoading(false);
    onDelete();
  }

  return (
    <PermissionCheck permission={permissions.productCategory.delete}>
    <div className="flex flex-col">
      <h1 className="py-2">
        Are you sure you want to delete{' '}
        <span className="text-md text-red-500">{title}</span>{' '}
      </h1>
      <Input
        className="my-2"
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={`Please type ${title} to delete.`}
      />
      <div className="flex gap-3 px-3 mt-5 justify-end">
        <Button
          onClick={() => {
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={value !== title || loading}
          className="bg-red-500"
          onClick={handleSubmit}
        >
          Delete
        </Button>
      </div>
    </div>
    </PermissionCheck>
  );
}
