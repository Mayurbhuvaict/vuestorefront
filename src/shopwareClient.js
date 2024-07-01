import { setup,createInstance } from '@shopware-pwa/api-client';

const defaultInstance = {
  endpoint: 'http://vuestorefrontshopware.ictstagingsite.com',
  accessToken: 'SWSCETFSTKHZR2NTNGHUETZIEG',
};

setup(defaultInstance);
createInstance(defaultInstance)