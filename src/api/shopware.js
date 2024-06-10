import { defaultInstance } from '@shopware-pwa/api-client'

export async function getCustomerAddresses(addressId, contextInstance = defaultInstance) {
  const resp = await contextInstance.invoke.get(`/store-api/account/address/${addressId}`);
  return resp.data.data;
}
