<template>
    <footer class="footer">
      <div class="footer-inner">
        <div class="footer-section">
          <h4>About Us</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="footer-section">
          <h4>Helpful Links</h4>
          <ul>
            <li> <a href="https://www.icreativetechnologies.com/about-us/">About</a></li>
            <li> <a href="https://www.icreativetechnologies.com/contact-us/">Contact</a></li>
            <li><a href="#">FAQ</a></li>
            <li> <a href="#">Terms of Service</a></li>
            <li> <a href="#">Privacy Policy</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Connect With Us</h4>
          <div class="social-icons">
            <a href="https://www.facebook.com/icreativetechnologies/"><font-awesome-icon :icon="['fab', 'facebook']" /></a>
            <a href="https://twitter.com/icreativeinc"><font-awesome-icon :icon="['fab', 'twitter']" /></a>
            <a href="https://in.linkedin.com/company/icreative-technologies"><font-awesome-icon :icon="['fab', 'linkedin']" /></a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 Your Ecommerce Store. All rights reserved.</p>
      </div>
    </footer>
</template>
<script>

export default {
  name: 'Footer',
};
</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 40px 20px;
  font-size: 14px;
}

.footer-inner {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1 1 300px;
  margin-bottom: 20px;
}

.footer-section h4 {
  font-size: 18px;
  margin-bottom: 10px;
}

ul {
  list-style-type: none;
  padding: 0;
}

ul li {
  margin-bottom: 8px;
}

.social-icons {
  display: flex;
}

.social-icons a {
  color: #fff;
  text-decoration: none;
  margin-right: 10px;
  transition: color 0.3s ease;
}

.social-icons a:hover {
  color: #ccc;
}

.footer-bottom {
  margin-top: 20px;
  text-align: center;
  font-size: 12px;
}
</style>