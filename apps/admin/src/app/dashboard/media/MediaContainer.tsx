'use client';
import Image from 'next/image';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';
import { useEffect, useState } from 'react';
import CustomDialog from '../../components/common/CustomDialog';
import { IFile } from '@repo/ui/types/file';
import { FileType } from '@repo/ui/enums/file';
import Link from 'next/link';
import FileUploadComponent from './FileUpload';
import { toast } from 'sonner';
import DeleteAssetContainer from './DeleteAssetContainer';
import ShowImagesContainer from './ShowImagesContainer';

interface IMediaContainerProps {
  hideOptions?: boolean;
  showImagePreviewOnClick?: boolean;
  multiselect?: boolean;
  images: IFile[];
  onSelectImages?: (files: IFile[]) => void;
  onClose?: () => void;
  isModal?: boolean;
}

export interface IFileClient extends IFile {
  isSelected?: boolean;
}

const MediaContainer = ({
  hideOptions = false,
  showImagePreviewOnClick = true,
  multiselect = false,
  images,
  onSelectImages,
  onClose,
  isModal = false,
}: IMediaContainerProps) => {
  const [selectedImages, setSelectedImages] = useState<IFileClient[]>([]);
  const fileTypes = Object.keys(FileType);
  const [selectedType, setSelectedType] = useState<FileType | ''>('');
  const [filteredImages, setFilteredImages] = useState<IFileClient[]>(
    images.map((a) => {
      return { ...a, isSelected: false };
    }),
  );

  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [showUploadModal, setShowUploadModal] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<IFileClient | null>(null);

  const [searchText, setSearchText] = useState<string>('');
  const [showDeleteAssetModal, setShowDeleteAssetModal] =
    useState<boolean>(false);

  useEffect(() => {
    let filterData = [];
    if (selectedType != '' && searchText != '') {
      filterData = images?.filter((a) => {
        return a.type === selectedType && a.name.includes(searchText);
      });
    } else if (selectedType == '' && searchText != '') {
      filterData = images?.filter((a) => {
        return a.name.includes(searchText);
      });
    } else if (selectedType != '' && searchText == '') {
      filterData = images?.filter((a) => {
        return a.type === selectedType;
      });
    } else {
      filterData = [...images];
    }

    setFilteredImages(filterData);
    setSelectedImages([]);
  }, [selectedType, searchText, images]);

  const handleResetButtonClick = () => {
    setSelectedType('');
    setSearchText('');
    setSelectedImages([]);
  };

  const handleImageClick = (image: IFileClient) => {
    if (multiselect) {
      const isSelected = selectedImages.find(
        (selected) => selected.url === image.url,
      );

      if (isSelected) {
        setSelectedImages(
          selectedImages.filter((selected) => selected.url !== image.url),
        );

        setFilteredImages(
          filteredImages.map((img) =>
            img.url === image.url ? { ...img, isSelected: false } : img,
          ),
        );
      } else {
        setSelectedImages([...selectedImages, { ...image, isSelected: true }]);
        setFilteredImages(
          filteredImages.map((img) =>
            img.url === image.url ? { ...img, isSelected: true } : img,
          ),
        );
      }
    } else {
      setSelectedImages([image]);
      setPreviewImage(image);
      setShowPreviewModal(true);
    }
  };

  const onAddClick = () => {
    if (selectedImages.length == 0) {
      toast('Please select image first');
      return;
    }
    if (onSelectImages) {
      onSelectImages(selectedImages);
    }
    setSelectedImages([]);
    setFilteredImages(
      filteredImages.map((a) => {
        return { ...a, isSelected: false };
      }),
    );
  };

  const handleDelete = async () => {
    setShowDeleteAssetModal(true);
  };

  return (
    <div className="relative rounded-md">
      {isModal && (
        <Button
          onClick={() => {
            if (onClose) {
              onClose();
            }
          }}
          className="text-white h-5 w-5 border-none focus:none absolute -right-5 shadow-2xl -top-5 cursor-pointer rounded-full bg-primary-color p-2"
        >
          ✖
        </Button>
      )}

      {selectedImages && selectedImages.length == 1 && (
        <CustomDialog
          Component={
            <DeleteAssetContainer
              id={selectedImages[0].id}
              title={selectedImages[0].name}
              onDelete={() => {
                setShowDeleteAssetModal(false);
                setSelectedImages([]);
              }}
              onClose={() => setShowDeleteAssetModal(false)}
            />
          }
          open={showDeleteAssetModal}
        />
      )}

      {showImagePreviewOnClick && (
        <CustomDialog
          className="max-w-[95vh] max-h-[95vh] overflow-scroll"
          open={showPreviewModal}
          Component={
            <div className="relative">
              <Button
                onClick={() => {
                  setShowPreviewModal(false);
                }}
                className="text-white h-5 w-5 border-none focus:none absolute right-0 shadow-2xl top-0 cursor-pointer rounded-full bg-primary-color p-2"
              >
                ✖
              </Button>
              <Image
                src={selectedImages[0]?.url ?? ''}
                alt="image"
                width={1440}
                height={720}
                className="w-full h-full"
              />
            </div>
          }
        />
      )}

      {showUploadModal && (
        <CustomDialog
          className="max-w-[95vh] max-h-[95vh]"
          open={showUploadModal}
          Component={
            <FileUploadComponent
              onClose={(value: boolean) => setShowUploadModal(value)}
            />
          }
        />
      )}

      <div className="grid grid-cols-12">
        <div className={`${multiselect ? 'col-span-12' : 'col-span-9'}`}>
          {!hideOptions && (
            <div className="flex gap-2 mr-3 my-2">
              <div>
                <Select
                  value={selectedType}
                  onValueChange={(value: FileType) => {
                    setSelectedType(value);
                  }}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {fileTypes.map((a) => (
                      <SelectItem key={a} value={a}>
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Input
                placeholder="Search..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />
              {multiselect && <Button onClick={onAddClick}>Add</Button>}

              <Button
                onClick={() => {
                  setShowUploadModal(true);
                }}
              >
                Upload
              </Button>

              <Button onClick={handleResetButtonClick}>Reset</Button>
            </div>
          )}

          <ShowImagesContainer
            images={filteredImages}
            multiselect={multiselect}
            handleImageClick={handleImageClick}
            selectedImages={selectedImages}
          />
        </div>
        {!multiselect && (
          <div className="col-span-3 border text-left border-l-primary-color p-3 border-t-0 border-b-0 border-r-0">
            <div className="">
              <h1 className="flex items-center justify-between pb-3 text-lg font-bold">
                <p>Details</p>
                {!multiselect && selectedImages.length > 0 && !hideOptions && (
                  <p
                    className="text-sm font-light cursor-pointer text-tertiary-red"
                    onClick={handleDelete}
                  >
                    Delete
                  </p>
                )}
              </h1>
              {previewImage ? (
                <>
                  <div className="p-2 text-sm border-gray-100 shadow-sm border">
                    <p className="font-bold">Image type</p>
                    <p className="text-secondary-color">{previewImage.type}</p>
                  </div>

                  <div className="p-2 text-sm border-gray-100 shadow-sm border">
                    <p className="font-bold">Image name</p>
                    <p className="text-secondary-color">{previewImage.name}</p>
                  </div>

                  <div className="p-2 text-sm border-gray-100 shadow-sm border">
                    <p className="font-bold">Image Path</p>
                    <p className="text-secondary-color">{previewImage.path}</p>
                  </div>

                  <div className="p-2 text-sm border-gray-100 shadow-sm border">
                    <p className="font-bold">URL</p>
                    <Link
                      href={previewImage.url}
                      className="text-secondary-color"
                    >
                      Click
                    </Link>
                  </div>
                </>
              ) : (
                <>Select an image to view details.</>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaContainer;
