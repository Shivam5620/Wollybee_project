import { AxiosResponse } from 'axios';
import { endpoints } from '@repo/ui/lib';
import { Suspense } from 'react';
import { IConfigurationResponse } from '@repo/ui/types/configuration';
import ax from '../../lib/axios';
import Loader from '../../components/common/Loader';
import CustomError from '../../components/common/CustomError';
import ConfigurationContainer from './ConfigurationContainer';
import { permissions } from '@repo/ui/lib/constants';
import havePermission from '../../lib/withPermission';

const Configuration = async (): Promise<JSX.Element> => {
  let data: IConfigurationResponse[] = [];
  let error: string = '';

  const haveReadConfigurationPermission = await havePermission(
    permissions.configuration.read,
  );
  if (!haveReadConfigurationPermission) {
    return <CustomError text="You don't have permission to access this page" />;
  }

  try {
    const resData: AxiosResponse<IConfigurationResponse[]> = await ax({
      method: 'get',
      url: `${endpoints.configuration}`,
    });

    data = resData.data;
  } catch (err: unknown) {
    error = 'Error fetching configuration...';
  }

  if (error) {
    return <CustomError text={error} />;
  }

  return (
    <Suspense fallback={<Loader text="Fetching Configurations..." />}>
      <ConfigurationContainer data={data} />
    </Suspense>
  );
};

export default Configuration;
