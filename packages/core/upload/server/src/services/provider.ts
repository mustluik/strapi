import { isFunction } from 'lodash/fp';
import { file as fileUtils } from '@strapi/utils';

import type { Strapi } from '@strapi/types';

export default ({ strapi }: { strapi: Strapi }) => ({
  async checkFileSize(file) {
    const { sizeLimit } = strapi.config.get('plugin::upload', {});
    await strapi.plugin('upload').provider.checkFileSize(file, { sizeLimit });
  },
  async upload(file) {
    if (isFunction(strapi.plugin('upload').provider.uploadStream)) {
      file.stream = file.getStream();
      await strapi.plugin('upload').provider.uploadStream(file);
      delete file.stream;
    } else {
      file.buffer = await fileUtils.streamToBuffer(file.getStream());
      await strapi.plugin('upload').provider.upload(file);
      delete file.buffer;
    }
  },
});
