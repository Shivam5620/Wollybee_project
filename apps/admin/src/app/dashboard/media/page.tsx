import { IFile } from '@repo/ui/types/file';
import { AxiosResponse } from 'axios';
import ax from '../../lib/axios';
import { endpoints } from '@repo/ui/lib';
import Error from './error';
import { Suspense } from 'react';
import Loader from '../../components/common/Loader';
import MediaContainer from './MediaContainer';

const Media = async (): Promise<JSX.Element> => {
  let data: IFile[] = [];
  let error: string = '';

  try {
    const resData: AxiosResponse<IFile[]> = await ax({
      method: 'get',
      url: `${endpoints.file}`,
    });

    data = resData.data;
  } catch (err: unknown) {
    error = 'Error fetching Assets..';
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      <h1 className="text-md font-bold pb-4">Media Assets</h1>
      <Suspense fallback={<Loader text="Fetching Assets..." />}>
        <MediaContainer
          images={data}
          multiselect={false}
          showImagePreviewOnClick={false}
        />
      </Suspense>
    </>
  );
};

export default Media;
