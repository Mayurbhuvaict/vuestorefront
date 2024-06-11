import { setup } from '@shopware-pwa/api-client';

const shopwareConfig = {
  // endpoint: 'https://shopware-6-demo.shop-studio.io',
  // endpoint: 'https://shopware6demo.webkul.in/shopware-auction-27-109-11-50-demo/',
  endpoint: 'http://localhost/sw6-5-8-6/public',
  // accessToken: 'SWSCV3UXRXPAR3BOQ0FNZUJYVA',
  // accessToken: 'SWSCJ-UMESR6Y_N-VQHH2EQAHA',
  accessToken: 'SWSCRHAXAFHLQ0Z0Z2PVAUXNTW',
  // contextToken: 'SWSCV3UXRXPAR3BOQ0FNZUJYVA',
  // contextToken: 'SWSCJ-UMESR6Y_N-VQHH2EQAHA',
  contextToken: 'SWSCRHAXAFHLQ0Z0Z2PVAUXNTW',
  defaultHeaders: {
    'sw-access-key': 'SWSCRHAXAFHLQ0Z0Z2PVAUXNTW',
  },
};

setup(shopwareConfig);

