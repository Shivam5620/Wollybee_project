import { useState } from 'react';


const AddMediaButton = ({
  setFiles,
}: {
  setFiles: (files: any) => void;
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleAttachFileUploadClicked = async (e: any) => {
    const files = [...e.target.files];
    setFiles(files);
  };

  return (
    <label
      className={`cursor-pointer rounded-full bg-media-button-gray border text-primary-black hover:bg-primary-color
        w-full py-2 px-4 text-center lg:text-lg flex items-center justify-center`}
    >
      <span className="text-white">
        {isUploading ? 'Uploading..' : 'Add Media'}
      </span>
      <input
        onChange={handleAttachFileUploadClicked}
        multiple
        type="file"
        name="select-file"
        className="hidden"
      />
    </label>
  );
};

export default AddMediaButton;
