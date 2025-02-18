import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { createProductAge } from './productAge.action';
import CustomDialog from '../../components/common/CustomDialog';
import MediaContainer from '../media/MediaContainer';
import { IFile } from '@repo/ui/types/file';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';

export interface ICreateProductAgeContainerProps {
  onClose: () => void;
  images: IFile[];
}

export default function CreateProductAgeContainer({
  images,
  onClose,
}: ICreateProductAgeContainerProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [fileId, setFileId] = useState<number>(-1);
  const [color, setColor] = useState<string>('');
  const [chooseFile, setChooseFile] = useState<boolean>(false);
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(0);

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
    if (!color) {
      toast('Please select Color.');
      return;
    }

    if (minAge < 0 || maxAge < 0 || minAge > maxAge) {
      toast('Please Enter correct values for ages.');
      return;
    }

    if (fileId == -1) {
      toast('Please select a file.');
      return;
    }
    setLoading(true);
    const data = await createProductAge({
      name: name.trim(),
      color,
      fileId,
      min: minAge,
      max: maxAge,
    });
    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
    }
    setLoading(false);
    reset();
    onClose();
  };

  return (
    <PermissionCheck permission={permissions.productAge.create}>
    <div className="flex flex-col">
      <h1 className="py-2">Create Product Age</h1>
      <Input
        value={name}
        className="my-2"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Enter product age name"
      />

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
        {fileId != -1 ? 'File Selected' : 'Choose File'}
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
          disabled={
            loading ||
            !(
              !!name &&
              minAge >= 0 &&
              maxAge > 0 &&
              maxAge <= 100 &&
              !!color &&
              fileId != -1
            )
          }
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
