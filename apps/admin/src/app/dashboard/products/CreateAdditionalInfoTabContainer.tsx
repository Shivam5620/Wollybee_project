import { useEffect, useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import CustomDialog from '../../components/common/CustomDialog';
import MediaContainer from '../media/MediaContainer';
import { IFile } from '@repo/ui/types/file';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import { Product } from '@repo/ui/enums';
import { IAdditionalInfoTabClient } from './CreateAdditionalInfoContainer';

export interface ICreateAdditionalInfoTabContainerProps {
  onDelete: (tabId: number) => void;
  images: IFile[];
  type: Product;
  setTabs: any;
  initialTabsData: any;
  tabs: IAdditionalInfoTabClient[];
  id: number;
}

export default function CreateAdditionalInfoTabContainer({
  initialTabsData,
  setTabs,
  tabs,
  type,
  id,
  onDelete,
  images,
}: ICreateAdditionalInfoTabContainerProps) {
  const [title, setTitle] = useState<string>(initialTabsData.title ?? '');
  const [description, setDescription] = useState<string>(
    initialTabsData.description ?? '',
  );
  const [color, setColor] = useState<string>(initialTabsData.color ?? '');
  const [chooseFile, setChooseFile] = useState<boolean>(false);
  const [imagesData, setImagesData] = useState<IFile[]>(
    initialTabsData.images ?? [],
  );

  const handleSelectImages = (files: IFile[]) => {
    setImagesData(files);
    setChooseFile(false);
  };

  useEffect(() => {
    handleSync();
  }, [title, description, color, imagesData]);

  const handleSync = () => {
    const tabsCopy = [...tabs];
    const index = tabsCopy.findIndex((a) => a.id == id);
    if (index != -1) {
      tabsCopy[index] = {
        ...tabsCopy[index],
        title,
        description,
        color,
        images: imagesData,
      };
      setTabs(tabsCopy);
    }
  };

  return (
    <div className="relative flex flex-col p-5 shadow-md rounded-md border border-primary-color my-2 ">
      {type != Product.READ && (
        <Image
          className="absolute -right-2 -top-2 cursor-pointer"
          src={ICONS.admin.deleteIcon}
          alt="delete"
          onClick={() => {
            onDelete(id);
          }}
          width={25}
          height={25}
        />
      )}

      <div className="flex gap-2">
        <Input
          disabled={type == Product.READ}
          label="Title"
          value={title}
          className="my-2"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Enter title"
        />
        <div className="flex gap-3">
          <Input
            label="Color"
            disabled={type == Product.READ}
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
            className={`border-none h-5 w-5 rounded-full  mt-8`}
          ></span>

          <Button
            disabled={type == Product.READ}
            className="bg-tertiary-green mt-6"
            onClick={() => {
              setChooseFile(true);
            }}
          >
            {imagesData.length > 0 ? 'Files Selected' : 'Choose File'}
          </Button>
        </div>
      </div>

      <section className="flex flex-col">
        <label className="text-secondary-color text-xs">Description</label>
        <textarea
          disabled={type == Product.READ}
          rows={5}
          value={description}
          className="my-2 p-3 border border-primary-black rounded-md"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Enter description"
        />
      </section>

      <div className="flex gap-2 flex-wrap">
        {imagesData.map((a) => (
          <Image src={a.url} alt="tabData" height={100} width={100} />
        ))}
      </div>

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
  );
}
