import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';
import { createFaqCategory } from './faqCategory.action';
import CustomDialog from '../../components/common/CustomDialog';
import MediaContainer from '../media/MediaContainer';
import { IFile } from '@repo/ui/types/file';

export interface ICreateFaqCategoryProps {
  onClose: () => void;
  images: IFile[];
}

export default function CreateFaqCategory({
  images,
  onClose,
}: ICreateFaqCategoryProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [chooseFile, setChooseFile] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [file, setFile] = useState<IFile>({} as IFile);

  const handleSubmit = async () => {
    if (!name) {
      toast('Please provide category name.');
      return;
    }

    if (!file.url || !file.path) {
      toast('Please select file');
      return;
    }

    const payload = {
      name,
      imageUrl: file.url,
      imageKey: file.path,
    };

    setLoading(true);
    const data = await createFaqCategory(payload);
    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
    }
    setLoading(false);
    onClose();
  };

  const handleSelectImages = (files: IFile[]) => {
    if (files.length > 1) {
      toast('Please select only single image.');
      return;
    }
    setFile(files[0]);
    setChooseFile(false);
  };

  return (
    <PermissionCheck permission={permissions.faqCategory.create}>
      <div className="flex flex-col">
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

        <h1 className="py-2">Create FAQ Category</h1>
        <Input
          value={name}
          className="my-2"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Category Name"
        />

        <Button
          className="bg-tertiary-green my-2"
          onClick={() => {
            setChooseFile(true);
          }}
        >
          {file.url ? 'Media Attached' : 'Add Media'}
        </Button>

        <div className="flex gap-3 px-3 mt-5 justify-end">
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            disabled={loading || !name}
            className="bg-secondary-color"
            onClick={handleSubmit}
          >
            Create Category
          </Button>
        </div>
      </div>
    </PermissionCheck>
  );
}
