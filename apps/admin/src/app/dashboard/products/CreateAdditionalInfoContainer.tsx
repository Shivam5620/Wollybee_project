import { useEffect, useState } from 'react';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { toast } from 'sonner';
import { IProductAdditionalInfoTab } from '@repo/ui/types';
import CreateAdditionalInfoTabContainer from './CreateAdditionalInfoTabContainer';
import { IFile } from '@repo/ui/types/file';
import Image from 'next/image';
import { ICONS } from '@repo/ui/lib';
import { Product } from '@repo/ui/enums';
import { IAdditionalInfoClient } from './AdditionalInfoContainer';

export interface ICreateAdditionalInfoContainerProps {
  id: number;
  additionalInfoList: IAdditionalInfoClient[];
  setAdditionalInfoList: (values: IAdditionalInfoClient[]) => void;
  initialListItemValues: IAdditionalInfoClient;
  onDelete: (additionalInfoId: number) => void;
  type: Product;
  images: IFile[];
}

export interface IAdditionalInfoTabClient extends IProductAdditionalInfoTab {
  id: number;
}

export default function CreateAdditionalInfoContainer({
  id,
  additionalInfoList,
  setAdditionalInfoList,
  initialListItemValues,
  onDelete,
  images,
  type = Product.READ,
}: ICreateAdditionalInfoContainerProps) {
  const [title, setTitle] = useState<string>(initialListItemValues.title ?? '');
  const [color, setColor] = useState<string>(initialListItemValues.color ?? '');
  const [tabs, setTabs] = useState<IAdditionalInfoTabClient[]>(
    initialListItemValues.tabs?.map(
      (a: IProductAdditionalInfoTab, index: number) => {
        return { ...a, id: index };
      },
    ) ?? [],
  );

  useEffect(() => {
    handleSync();
  }, [title, color, tabs]);

  const handleSync = () => {
    const additionalInfoListCopy: IAdditionalInfoClient[] = [
      ...additionalInfoList,
    ];
    const index: number = additionalInfoListCopy.findIndex((a) => a.id == id);
    if (index != -1) {
      additionalInfoListCopy[index] = {
        ...additionalInfoListCopy[index],
        title,
        color,
        tabs,
      };
      setAdditionalInfoList(additionalInfoListCopy);
    }
  };

  const addCreateTab = () => {
    setTabs([
      ...tabs,
      {
        id: tabs.length == 0 ? 0 : tabs[tabs.length - 1].id + 1,
        title: '',
        color: '',
        description: '',
        images: [],
      },
    ]);
  };

  return (
    <div className="relative flex flex-col border shadow-md border-secondary-color rounded-md py-2 px-5 mt-2">
      {type != Product.READ && (
        <Image
          className="bg-green-50 absolute -right-2 -top-2 cursor-pointer"
          src={ICONS.admin.deleteIcon}
          alt="delete"
          onClick={() => onDelete(id)}
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

        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Input
              disabled={type == Product.READ}
              label="Color"
              value={color}
              className="my-2"
              onChange={(e) => {
                setColor(e.target.value);
              }}
              placeholder="Additional Info Hex Code"
            />
            <span
              style={{
                backgroundColor: color,
              }}
              className={`border-none h-5 w-5 `}
            ></span>
          </div>
        </div>
      </div>

      {tabs.map((a) => (
        <CreateAdditionalInfoTabContainer
          key={a.id}
          id={a.id}
          type={type}
          images={images}
          initialTabsData={a}
          tabs={tabs}
          setTabs={setTabs}
          onDelete={(tabId) => {
            setTabs(tabs.filter((b) => b.id != tabId));
          }}
        />
      ))}

      <Button
        disabled={type == Product.READ}
        className="bg-tertiary-green"
        onClick={addCreateTab}
      >
        Create Tab
      </Button>
    </div>
  );
}
