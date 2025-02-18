import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { editProductCategory } from './productCategory.action';
import { IProductCategory } from '@repo/ui/types';
import { Checkbox } from '../../../../components/ui/checkbox';
import { permissions } from '@repo/ui/lib';
import PermissionCheck from '../../../lib/PermissionCheck';

export interface IEditProductCategoryContainerProps {
    initialValues : IProductCategory;
    onClose: () => void;
}

export default function EditProductCategoryContainer({
  initialValues,
  onClose,
}: IEditProductCategoryContainerProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(initialValues.name);
  const [description, setDescription] = useState<string>(initialValues.description);
  const [isActive, setIsActive] = useState<boolean>(initialValues.isActive);
  const [isDeleted, setIsDeleted] = useState<boolean>(initialValues.isDeleted);

  const handleSubmit = async () => {
    setLoading(true);
    if(isDeleted && isActive){
      toast("Deleted Product cannot be active!");
      setLoading(false);
      return;
    }


    const data = await editProductCategory({
        id : initialValues.id,
        payload : {
        name : name.trim(),
        description : description.trim(),
        isActive,
        isDeleted
        }
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
    <PermissionCheck permission={permissions.productCategory.update}>
    <div className="flex flex-col">
      <h1 className="py-2">
        Edit Product Category
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
        className="my-2"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Enter product category description"
      />
      <div className='my-2 flex gap-2 items-center'>
        Active : <Checkbox className='rounded-full' checked={isActive} onCheckedChange={(val : boolean) => {
          setIsActive(val)
        }} /> 
        Deleted : <Checkbox className='rounded-full' checked={isDeleted} onCheckedChange={(val : boolean) => {
          setIsDeleted(val)
        }}/>
      </div>
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
          disabled={loading}
          className="bg-secondary-color"
          onClick={handleSubmit}
        >
          Edit
        </Button>
      </div>
    </div>
    </PermissionCheck>
  );
}
