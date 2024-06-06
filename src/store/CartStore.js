import { reactive } from 'vue';
import { addProductToCart } from '@shopware-pwa/api-client';


const CartStore = reactive({
  cart: {
    items: [],
    total: 0,
  },

async addToCart(product) {
  try {
    console.log(product);
    const cart = await addProductToCart(product.id, 1); 
    console.log('cart is trying to add',cart);
    console.log('Product added to cart:', cart);
    console.log("Adding to cart:", product);
    const existingProduct = this.cart.items.find(item => item.product.id === product.id);
    if (existingProduct) {
      console.log("Existing product found:", existingProduct);
      existingProduct.quantity++;
    } else {
      console.log("New product added to cart.");
      this.cart.items.push({ product, quantity: 1 });
    }
    this.updateCartTotal();
  } catch (error) {
    console.error('Error adding product to cart:', error);
   
  }
},
updateCartTotal() {
  this.cart.total = this.cart.items.reduce((total, item) => total + item.product.calculatedPrice.unitPrice * item.quantity, 0);

},
getCartItems() {
  return this.cart.items;

},
});

export default CartStore;
