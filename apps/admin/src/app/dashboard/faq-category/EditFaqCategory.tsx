import { useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import PermissionCheck from '../../../lib/PermissionCheck';
import { permissions } from '@repo/ui/lib';
import { IFaqCategory } from '@repo/ui/types/faq';
import { editFaqCategory } from './faqCategory.action';
import { IFile } from '@repo/ui/types/file';
import CustomDialog from '../../components/common/CustomDialog';
import MediaContainer from '../media/MediaContainer';

export interface IEditFaqCategoryProps {
  images: IFile[];
  initialValues: IFaqCategory;
  onClose: () => void;
}

export default function EditFaqCategory({
  images,
  initialValues,
  onClose,
}: IEditFaqCategoryProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(initialValues.name ?? '');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [imageKey, setImageKey] = useState<string>('');
  const [chooseFile, setChooseFile] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (!name) {
      toast('Please provide category name.');
      return;
    }

    if (imageUrl == '' || imageKey == '') {
      toast('Please provide category image.');
      return;
    }

    setLoading(true);

    const data = await editFaqCategory({
      id: initialValues.id ?? -1,
      name,
      imageUrl,
      imageKey,
    });

    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
    }
    onClose();
  };

  const handleSelectImages = (files: IFile[]) => {
    if (files.length > 1) {
      toast('Please select only single image.');
      return;
    }
    setImageUrl(files[0].url);
    setImageKey(files[0].path);
    setChooseFile(false);
  };

  return (
    <PermissionCheck permission={permissions.faqCategory.update}>
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

        <h1 className="py-2">Edit FAQ Category</h1>
        <Input
          value={name}
          className="my-2"
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Name"
        />

        <Button
          className="bg-tertiary-green my-2"
          onClick={() => {
            setChooseFile(true);
          }}
        >
          {imageUrl != '' ? 'Media Attached' : 'Add Media'}
        </Button>

        <div className="flex gap-3 px-3 mt-5 justify-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            disabled={loading}
            className="bg-secondary-color"
            onClick={handleSubmit}
          >
            Edit Category
          </Button>
        </div>
      </div>
    </PermissionCheck>
  );
}
