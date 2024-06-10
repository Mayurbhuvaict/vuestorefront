import { setup,createInstance } from '@shopware-pwa/api-client';

const defaultInstance = {
  endpoint: 'https://shopware-6-demo.shop-studio.io',
  accessToken: 'SWSCV3UXRXPAR3BOQ0FNZUJYVA',
};

setup(defaultInstance);
createInstance(defaultInstance)