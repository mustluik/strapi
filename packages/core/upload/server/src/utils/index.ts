import * as upload from '../services/upload';
import * as imageManipulation from '../services/image-manipulation';

type Services = {
  upload: typeof upload;
  ['image-manipulation']: typeof imageManipulation;
  extensions: any;
  metrics: any;
  weeklyMetrics: any;
  file: any;
  folder: any;
  provider: any;
};

export const getService = <TName extends keyof Services>(
  name: TName
): ReturnType<Services[TName]> => {
  return strapi.plugin('upload').service(name);
};
