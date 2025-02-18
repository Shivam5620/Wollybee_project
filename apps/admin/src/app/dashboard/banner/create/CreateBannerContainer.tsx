'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { createBanner } from '../banner.actions';
import MediaContainer from '../../media/MediaContainer';
import { IFile } from '@repo/ui/types/file';
import { Input } from '../../../../../components/ui/input';
import { Button } from '../../../../../components/ui/button';
import CustomDialog from '../../../components/common/CustomDialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../components/ui/select';
import { BannerType } from '@repo/ui/enums/banner';
import { useRouter } from 'next/navigation';
import { dashboardRoutes, permissions } from '@repo/ui/lib';
import Loader from '../../../components/common/Loader';
import Image from 'next/image';
import PermissionCheck from '../../../../lib/PermissionCheck';

export default function CreateBannerContainer({ images }: { images: IFile[] }) {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [chooseFile, setChooseFile] = useState<boolean>(false);
  const [chooseMobileImage, setChooseMobileImage] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [type, setType] = useState<BannerType | ''>('');
  const [fileId, setFileId] = useState<number>(-1);
  const [mobileFileId, setMobileFileId] = useState<number>(-1);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [clickUrl, setClickUrl] = useState<string>('');
  const bannerTypes = Object.keys(BannerType);

  const resetState = () => {
    setTitle('');
    setDescription('');
    setFileId(-1);
    setType('');
    setPreviewUrl('');
    setMobileFileId(-1);
    setClickUrl('');
  };

  const handleSelectImages = (files: IFile[]) => {
    if (files.length > 1) {
      toast('Please select only single image.');
      return;
    }
    setFileId(files[0].id);
    setPreviewUrl(files[0].url);
    setChooseFile(false);
  };

  const handleMobileBannerSelectImages = (files: IFile[]) => {
    if (files.length > 1) {
      toast('Please select only single image.');
      return;
    }
    setMobileFileId(files[0].id);
    setPreviewUrl(files[0].url);
    setChooseMobileImage(false);
    setChooseFile(false);
  };

  const handleSubmit = async () => {
    if (!type) {
      toast('Please select type');
      return;
    }

    if (fileId === -1 || mobileFileId === -1) {
      toast('Please select image');
      return;
    }

    if (!title || !description) {
      toast('Please fill all the fields.');
      return;
    }
    setLoading(true);
    const data = await createBanner({
      title: title.trim(),
      description: description.trim(),
      type,
      fileId,
      mobileFileId,
      url: clickUrl,
    });

    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
      router.push(`${dashboardRoutes.banner}`);
    }
    setLoading(false);
    resetState();
  };

  if (loading) {
    return <Loader text="Creating Banner..." />;
  }

  return (
    <PermissionCheck permission={permissions.banner.create}>
      <div className="flex gap-3">
        <div className="flex flex-col w-[550px]">
          <h1 className="py-2">Create Banner</h1>
          <div className="gap-3 mr-3">
            <Input
              required
              value={title}
              className="my-2"
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="Enter Title"
            />

            <Input
              required
              value={description}
              className="my-2"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
              placeholder="Enter description"
            />

            <Input
              required
              value={clickUrl}
              className="my-2"
              onChange={(e) => {
                setClickUrl(e.target.value);
              }}
              placeholder="Enter Banner Click URL"
            />

            <Select
              value={type}
              onValueChange={(value: BannerType) => {
                setType(value);
              }}
            >
              <SelectTrigger className="w-full my-2">
                <SelectValue placeholder="Page" />
              </SelectTrigger>
              <SelectContent>
                {bannerTypes.map((a) => (
                  <SelectItem key={a} value={a}>
                    {a}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              className="bg-tertiary-green my-2"
              onClick={() => {
                setChooseFile(true);
              }}
            >
              {fileId != -1 ? 'Media Attached' : 'Add Media'}
            </Button>

            <Button
              className="bg-tertiary-green my-2 mx-2"
              onClick={() => {
                setChooseMobileImage(true);
                setChooseFile(true);
              }}
            >
              {mobileFileId != -1
                ? 'Mobile Media Attached'
                : 'Add Mobile Media'}
            </Button>
          </div>
          <div className="flex gap-3"></div>
          <CustomDialog
            className="max-w-[95vh] max-h-[95vh] overflow-scroll"
            open={chooseFile}
            Component={
              <MediaContainer
                onClose={() => {
                  setChooseFile(false);
                }}
                isModal={true}
                onSelectImages={
                  chooseMobileImage
                    ? handleMobileBannerSelectImages
                    : handleSelectImages
                }
                images={images}
                multiselect={true}
                showImagePreviewOnClick={false}
              />
            }
          />
          <div className="flex gap-3 px-3 mt-5 justify-end">
            <Button onClick={resetState}>Reset</Button>
            <Button
              disabled={
                loading ||
                !(
                  title.trim().length > 0 &&
                  description.trim().length > 0 &&
                  !!type &&
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

        <div className="h-[500px] flex justify-center">
          {previewUrl && (
            <Image
              className="aspect-auto"
              src={previewUrl}
              width={500}
              height={500}
              alt="preview"
            />
          )}
        </div>
      </div>
    </PermissionCheck>
  );
}
