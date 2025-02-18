'use client';
import React, { useState } from 'react';
import { Button } from '../../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../components/ui/select';
import { FileType } from '@repo/ui/enums/file';
import Loader from '../../components/common/Loader';
import { uploadFile } from './media.action';
import { toast } from 'sonner';

const FileUploadComponent: React.FC<{ onClose: (value : boolean) => void }> = ({ onClose }) => {
  const [uploadFileType, setUploadFileType] = useState<string>('');
  const [files, setFiles] = useState<FileList | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const fileTypes = Object.keys(FileType);

  const handleAttachFileUploadClicked = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (e.target.files) {
      setFiles(e.target.files);
    }
  };

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!files || files.length === 0) {
      toast('Please select a file.');
      return;
    }

    if (uploadFileType == '') {
        toast('Please select file type.');
        return;
      }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('type', uploadFileType);
    formData.append('file', files[0]);
    const data = await uploadFile(formData);
    if ('error' in data) {
      toast(data.error.message);
    }
    if ('success' in data) {
      toast(data.message);
    }
    setIsUploading(false);
    onClose(false);
  };

  if (isUploading) {
    return <Loader text="Uploading..." />;
  }

  return (
    <form onSubmit={handleUpload}>
      <div className="relative w-full flex flex-col justify-between gap-4">
        <Button
                onClick={() => {
                  onClose(false);
                }}
                className="text-white h-5 w-5 border-none focus:none absolute -right-8 shadow-2xl -top-8 cursor-pointer rounded-full bg-primary-color p-2"
              >
                ✖
              </Button>

        <div className='flex gap-2 justify-between'>
        <Select
          onValueChange={(value: FileType) => {
            setUploadFileType(value);
          }}
        >
          <SelectTrigger className="w-[300px]">
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

        <label
          className={`${isUploading ? 'text-gray-400' : ''} items-center text-black rounded-lg cursor-pointer pt-2`}
        >
          <span className='bg-primary-color rounded-lg px-2 py-2'>{(files && files.length > 0) ? "File Attached" : "Attach Files"}</span>
         
          <input
            onChange={handleAttachFileUploadClicked}
            type="file"
            className="hidden"
          />
        </label>
        </div>

        <Button type="submit" disabled={isUploading}>
          Upload
        </Button>
      </div>
    </form>
  );
};

export default FileUploadComponent;
