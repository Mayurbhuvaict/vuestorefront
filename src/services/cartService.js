import { addProductToCart } from '@shopware-pwa/api-client'

export const addToCart = async (productId, quantity = 1) => {
  try {
    const result = await addProductToCart({
      id: productId,
      quantity: quantity,
    })
    console.log(result);
  } catch (error) {
    console.error('Error adding product to cart:', error)
    throw error
  }
}
