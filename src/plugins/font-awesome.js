import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faSearch, faShoppingCart, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';

// Add icons to the library
library.add(faFacebook, faTwitter, faLinkedin, faSearch, faShoppingCart, faHeart, faUser);

export { FontAwesomeIcon };
