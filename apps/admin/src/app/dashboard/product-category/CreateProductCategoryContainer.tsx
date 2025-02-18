import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { createProductCategory } from './productCategory.action';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';

export interface ICreateProductCategoryContainerProps {
  onClose: () => void;
}

export default function CreateProductCategoryContainer({
  onClose,
}: ICreateProductCategoryContainerProps) {

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async () => {
    setLoading(true);
    const data = await createProductCategory({
        name : name.trim(),
        description : description.trim()
    });
    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
    }
    setLoading(false);
    setName('');
    setDescription('');
    onClose();
  }

  return (
    <PermissionCheck permission={permissions.productCategory.create}>
    <div className="flex flex-col">
      <h1 className="py-2">
        Create Product Category
      </h1>
      <Input
        value={name}
        className="my-2"
        onChange={(e) => {
            setName(e.target.value);
        }}
        placeholder="Enter product category name"
      />
      <Input
        value={description}
        className="my-2"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Enter product category description"
      />
      <div className="flex gap-3 px-3 mt-5 justify-end">
        <Button
          onClick={() => {
            setName('');
            setDescription('');
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          disabled={loading || !(name.trim().length > 0 && description.trim().length > 0)}
          className="bg-secondary-color"
          onClick={handleSubmit}
        >
          Create
        </Button>
      </div>
    </div>
    </PermissionCheck>
  );
}
