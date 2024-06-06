import { setup } from '@shopware-pwa/api-client';

const shopwareConfig = {
  endpoint: 'https://shopware-6-demo.shop-studio.io',
  accessToken: 'SWSCV3UXRXPAR3BOQ0FNZUJYVA',
  contextToken: 'SWSCV3UXRXPAR3BOQ0FNZUJYVA',
  defaultHeaders: {
    'sw-access-key': 'SWSCZHNXNNNYRMFXUZFSVGNRYG',
  },
};

setup(shopwareConfig);

