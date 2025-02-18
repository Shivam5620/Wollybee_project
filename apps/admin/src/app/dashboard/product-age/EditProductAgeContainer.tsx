import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import {
  ICreateProductAgeRequestBody,
  IProductAge,
} from '@repo/ui/types';
import { Checkbox } from '../../../../components/ui/checkbox';
import { editProductAge } from './productAge.action';
import CustomDialog from '../../components/common/CustomDialog';
import MediaContainer from '../media/MediaContainer';
import { IFile } from '@repo/ui/types/file';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';

export interface IEditProductAgeContainerProps {
  initialValues: IProductAge;
  onClose: () => void;
  images: IFile[];
}

export default function EditProductAgeContainer({
  initialValues,
  onClose,
  images,
}: IEditProductAgeContainerProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(initialValues.name);
  const [isActive, setIsActive] = useState<boolean>(initialValues.isActive);
  const [isDeleted, setIsDeleted] = useState<boolean>(initialValues.isDeleted);
  const [fileId, setFileId] = useState<number>(initialValues.file.id);
  const [color, setColor] = useState<string>(initialValues.color);
  const [minAge, setMinAge] = useState<number>(initialValues.min);
  const [maxAge, setMaxAge] = useState<number>(initialValues.max);
  const [chooseFile, setChooseFile] = useState<boolean>(false);

  const handleSelectImages = (files: IFile[]) => {
    if (files.length > 1) {
      toast('Please select only single image.');
      return;
    }
    setFileId(files[0].id);
    setChooseFile(false);
  };
  
  const reset = () => {
    setName('');
    setMinAge(0);
    setMaxAge(0);
    setFileId(-1);
    setColor('');
  };

  const handleSubmit = async () => {
    if (isDeleted && isActive) {
      toast('Deleted Product Interest cannot be active!');
      setLoading(false);
      return;
    }

    if(!!name && !color && fileId == -1 && minAge < maxAge && minAge >=0 && maxAge > 0){
      toast('Please fill all fields');
      return;
    }

    setLoading(true);

    const payload: ICreateProductAgeRequestBody = {
      name: name.trim(),
      isActive,
      isDeleted,
      min : minAge,
      max : maxAge,
      color,
      fileId,
    };

    const data = await editProductAge({
      id: initialValues.id,
      payload,
    });

    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
    }
    
    reset();
    onClose();
  };

  return (
    <PermissionCheck permission={permissions.productAge.update}>
    <div className="flex flex-col">
      <h1 className="py-2">Edit Product Age</h1>
      <Input
        value={name}
        className="my-2"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter product Age name"
      />
    
      <div className="my-2 flex gap-2 items-center">
        Active :{' '}
        <Checkbox
          className="rounded-full"
          checked={isActive}
          onCheckedChange={(val: boolean) => {
            setIsActive(val);
          }}
        />
        Deleted :{' '}
        <Checkbox
          className="rounded-full"
          checked={isDeleted}
          onCheckedChange={(val: boolean) => {
            setIsDeleted(val);
          }}
        />
      </div>

      <div className="flex gap-3 items-center">
        <Input
          value={color}
          className="my-2"
          onChange={(e) => {
            setColor(e.target.value);
          }}
          placeholder="Enter Hex code for color"
        />
        <span
          style={{
            backgroundColor: color,
          }}
          className={`border-none h-5 w-5 rounded-full`}
        ></span>
      </div>

      <Input
        value={minAge}
        className="my-2"
        type="number"
        onChange={(e) => {
          setMinAge(Number(e.target.value));
        }}
        placeholder="Enter Minimum Age"
      />

      <Input
        value={maxAge}
        className="my-2"
        type="number"
        onChange={(e) => {
          setMaxAge(Number(e.target.value));
        }}
        placeholder="Enter Maximum Age"
      />


      <Button
        className="bg-tertiary-green"
        onClick={() => {
          setChooseFile(true);
        }}
      >
        {fileId != initialValues.file.id ? 'File Selected' : 'Choose File'}
      </Button>

      <div>
        <CustomDialog
          className="max-w-[95vh] max-h-[95vh] overflow-scroll"
          open={chooseFile}
          Component={
            <MediaContainer
              onClose={() => {
                setChooseFile(false);
              }}
              isModal={true}
              onSelectImages={handleSelectImages}
              images={images}
              multiselect={true}
              showImagePreviewOnClick={false}
            />
          }
        />
      </div>

      <div className="flex gap-3 px-3 mt-5 justify-end">
        <Button
          onClick={() => {
            reset();
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
