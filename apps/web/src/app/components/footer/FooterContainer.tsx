import React from 'react';
import Footer from './Footer';
import { IConfigurationResponse } from '@repo/ui/types/configuration';
import { AxiosResponse } from 'axios';
import ax from '../../lib/axios';
import { CONFIGURATIONS, endpoints } from '@repo/ui/lib';

const FooterContainer = async () => {
  let configurations: IConfigurationResponse[] = [];

  try {
    const resConfigurations: AxiosResponse<IConfigurationResponse[]> = await ax(
      {
        method: 'get',
        url: endpoints.configuration,
      },
    );
    configurations = resConfigurations.data;
  } catch (error) {
    error = JSON.stringify(error);
  }

  const configurationOptions = configurations.filter(
    (a) => a.key === CONFIGURATIONS.YOUTUBE_LINK,
  );

  return <Footer youtubeLink={configurationOptions?.[0]?.value || ''} />;
};

export default FooterContainer;
