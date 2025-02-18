import { IProduct, IProductAdditionalInfo } from '@repo/ui/types';
import { useEffect, useState } from 'react';
import CreateAdditionalInfoContainer from './CreateAdditionalInfoContainer';
import { IFile } from '@repo/ui/types/file';
import { Button } from '../../../../components/ui/button';
import { Product } from '@repo/ui/enums';

export interface IAdditionalInfoClient extends IProductAdditionalInfo {
  id: number;
}

interface AdditionalInfoContainerProps {
  images: IFile[];
  initialValues: IProduct;
  type: Product;
  setFormValues: (values: IProduct) => void;
}

const AdditionalInfoContainer = ({
  images,
  initialValues,
  type,
  setFormValues,
}: AdditionalInfoContainerProps) => {
  const [addtionalInfoList, setAdditionalInfoList] = useState(
    initialValues?.additionalInfo?.map((a, index) => {
      return { id: index, ...a };
    }) ?? [],
  );

  const addAdditionalInfoContainer = () => {
    setAdditionalInfoList([
      ...addtionalInfoList,
      {
        id:
          addtionalInfoList.length == 0
            ? 0
            : addtionalInfoList[addtionalInfoList.length - 1].id + 1,
        title: '',
        color: '',
        tabs: [],
      },
    ]);
  };

  useEffect(() => {
    handleSave();
  }, [addtionalInfoList]);

  const handleSave = () => {
    setFormValues({ ...initialValues, additionalInfo: addtionalInfoList });
  };

  return (
    <div className="flex flex-col shadow-lg p-5">
      <div className="w-full flex justify-between">
        <label className="col-span-12 text-sm text-primary-black font-bold">
          Product Additional Info
        </label>
      </div>
      {addtionalInfoList.map((a) => (
        <CreateAdditionalInfoContainer
          key={a.id}
          type={type}
          images={images}
          id={a.id}
          initialListItemValues={a}
          additionalInfoList={addtionalInfoList}
          setAdditionalInfoList={setAdditionalInfoList}
          onDelete={(additionalInfoId: number) => {
            setAdditionalInfoList(
              addtionalInfoList.filter((b) => b.id != additionalInfoId),
            );
          }}
        />
      ))}

      <Button
        disabled={type == Product.READ}
        className="bg-tertiary-green my-2"
        onClick={addAdditionalInfoContainer}
      >
        {addtionalInfoList.length > 0
          ? 'Add Additional Info'
          : 'Create Additional Info'}
      </Button>
    </div>
  );
};

export default AdditionalInfoContainer;
