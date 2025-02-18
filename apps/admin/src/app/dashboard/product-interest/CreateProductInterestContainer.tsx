import { useEffect, useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { createProductInterest } from './productInterest.action';
import CustomDialog from '../../components/common/CustomDialog';
import MediaContainer from '../media/MediaContainer';
import { IFile } from '@repo/ui/types/file';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';

export interface ICreateProductInterestContainerProps {
  onClose: () => void;
  images : IFile[]
}

export default function CreateProductInterestContainer({
  images,
  onClose,
}: ICreateProductInterestContainerProps) {

  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [fileId, setFileId] = useState<number>(-1);
  const [color, setColor] = useState<string>('');
  const [chooseFile, setChooseFile] = useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = useState<string>('');
 

  const handleSelectImages =  (files: IFile[]) => {
    if (files.length > 1) {
      toast('Please select only single image.');
      return;
    }
    setFileId(files[0].id);
    setPreviewUrl(files[0].url);
    setChooseFile(false);
  }

  const handleSubmit = async () => {
    if(!color){
      toast("Please select Color.")
      return;
    }

    if(fileId == -1){
      toast("Please select file.")
      return;
    }

    setLoading(true);
    const data = await createProductInterest({
        name : name.trim(),
        description : description.trim(),
        color,
        fileId
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
    setFileId(-1);
    setColor('');
    onClose();
  }

  return (
    <PermissionCheck permission={permissions.productInterest.create}>
    <div className="flex flex-col">
      <h1 className="py-2">
        Create Product Interest
      </h1>
      <Input
        value={name}
        className="my-2"
        onChange={(e) => {
            setName(e.target.value);
        }}
        placeholder="Enter product interest name"
      />
      <Input
        value={description}
        className="my-2"
        onChange={(e) => {
          setDescription(e.target.value);
        }}
        placeholder="Enter product interest description"
      />
      <div className='flex gap-3 items-center'>
      <Input
        value={color}
        className="my-2"
        onChange={(e) => {
          setColor(e.target.value);
        }}
        placeholder="Enter Hex code for color"
      />
      <span style={{
        backgroundColor : color
      }} className={`border-none h-5 w-5 rounded-full`}></span>
      </div>

      <Button className='bg-tertiary-green' onClick={() => {
        setChooseFile(true);
      }}>{fileId != -1 ? 'File Selected' : 'Choose File'}</Button>

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
