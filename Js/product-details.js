/**
 * Display a styled toast notification
 */
function showCartToast(title, message) {
  // Create container if it doesn't exist
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast success';
  toast.innerHTML = `
    <div class="toast-icon">✓</div>
    <div class="toast-content">
      <p class="toast-title">${title}</p>
      <p class="toast-message">${message}</p>
    </div>
    <button class="toast-close" aria-label="Close notification">&times;</button>
  `;

  container.appendChild(toast);

  // Handle close button
  const closeBtn = toast.querySelector('.toast-close');
  closeBtn.addEventListener('click', () => {
    removeToast(toast);
  });

  // Auto-remove after 4 seconds
  const timeout = setTimeout(() => {
    removeToast(toast);
  }, 4000);

  // Remove timeout if manually closed
  toast.addEventListener('animationend', () => {
    if (toast.classList.contains('removing')) {
      clearTimeout(timeout);
      toast.remove();
    }
  });
}

/**
 * Remove toast with animation
 */
function removeToast(toast) {
  toast.classList.add('removing');
}

/**
 * Get product ID from URL query parameter
 */
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id'), 10);
}

/**
 * Render product details page
 */
function renderProductDetails() {
  const productId = getProductIdFromUrl();
  const product = ProductStorage.getById(productId);
  const contentDiv = document.getElementById('product-details-content');

  if (!product) {
    contentDiv.innerHTML = `
      <div class="error">
        <strong>Product not found.</strong> The product you're looking for doesn't exist or has been removed.
        <a href="shop.html" style="display: block; margin-top: 1rem;">← Return to Shop</a>
      </div>
    `;
    return;
  }

  // Prepare price HTML
  const priceHtml = product.originalPrice
    ? `<s>$${product.originalPrice.toFixed(2)}</s> $${product.price.toFixed(2)}`
    : `$${product.price.toFixed(2)}`;

  // Prepare image content
  const isImageFile = product.image && (product.image.includes('.') || product.image.includes('/'));
  const imageContent = isImageFile
    ? `<img src="${product.image}" alt="${product.name}">`
    : `<div class="product-placeholder">${product.image}</div>`;

  // Render product details
  contentDiv.innerHTML = `
    <div class="product-details-container">
      <div class="product-image-container">
        ${imageContent}
      </div>

      <div class="product-details-info">
        <div class="product-details-category">${product.category}</div>
        <h1 class="product-details-name">${product.name}</h1>
        <div class="product-details-price">${priceHtml}</div>

        <p class="product-details-description">${product.description}</p>

        <div class="product-details-meta">
          ${product.size ? `<div class="meta-item"><h4>Size</h4><p>${product.size}</p></div>` : ''}
          ${product.material ? `<div class="meta-item"><h4>Material</h4><p>${product.material}</p></div>` : ''}
          ${product.pages ? `<div class="meta-item"><h4>Pages</h4><p>${product.pages}</p></div>` : ''}
          ${product.quantity ? `<div class="meta-item"><h4>Quantity</h4><p>${product.quantity}</p></div>` : ''}
          ${product.ink ? `<div class="meta-item"><h4>Ink</h4><p>${product.ink}</p></div>` : ''}
          ${product.contents ? `<div class="meta-item"><h4>Contents</h4><p>${product.contents}</p></div>` : ''}
          ${product.weight ? `<div class="meta-item"><h4>Weight</h4><p>${product.weight}</p></div>` : ''}
        </div>
      </div>
    </div>
  `;



  // Update page title
  document.title = `${product.name} | Papier & Co`;
}

/**
 * Add product to cart and show confirmation
 */
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('papierco_cart')) || [];
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('papierco_cart', JSON.stringify(cart));
  updateCartCount();
  showCartToast('Added to Cart', `${product.name} has been added to your cart.`);
}

/**
 * Update cart count in navigation
 */
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('papierco_cart')) || [];
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.querySelectorAll('.nav-cart').forEach(btn => {
    // Remove existing badge if present
    const existingBadge = btn.querySelector('.cart-badge');
    if (existingBadge) {
      existingBadge.remove();
    }
    
    // Add new badge with count if items exist
    if (cartCount > 0) {
      const badge = document.createElement('span');
      badge.className = 'cart-badge';
      badge.textContent = cartCount;
      btn.appendChild(badge);
    }
    
    // Add click event to navigate to cart page
    btn.addEventListener('click', () => {
      window.location.href = 'cart.html';
    });
  });
}

/**
 * Mobile nav toggle
 */
function setupMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const navClose = document.getElementById('navClose');

  hamburger.addEventListener('click', () => {
    mobileNav.classList.add('open');
  });

  navClose.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });

  navBackdrop.addEventListener('click', () => {
    mobileNav.classList.remove('open');
  });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    renderProductDetails();
    updateCartCount();
    setupMobileNav();
  }, 100);
});
