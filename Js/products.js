/**
 * Dynamic Product Rendering
 * Load and render products from ProductStorage into your HTML
 */

// Wait for DOM to be ready and storage to be initialized
document.addEventListener('DOMContentLoaded', () => {
  // Give localStorage a moment to initialize
  setTimeout(() => {
    renderProductsToPage();
    updateCartCount();
  }, 100);
});

/**
 * Render products from storage to the page
 */
function renderProductsToPage() {
  const products = ProductStorage.getAll();
  
  if (!products) {
    console.warn('No products found in storage');
    return;
  }

  console.log('🖼️ Products loaded:', products.map(p => `${p.name} (${p.image})`));

  // Update products grid if it exists
  const productGrid = document.querySelector('.products-grid');
  if (productGrid) {
    renderProductCards(products, productGrid);
  }

  // Update shop products section if it exists
  const shopProducts = document.getElementById('products');
  if (shopProducts) {
    renderProductCards(products, shopProducts);
  }
}

/**
 * Render product cards to a container
 */
function renderProductCards(products, container) {
  const html = products.map(product => createProductCard(product)).join('');
  container.innerHTML = html;
  
  // Attach event listeners to "Add to Cart" buttons
  document.querySelectorAll('.product-add').forEach((btn, index) => {
    btn.addEventListener('click', () => {
      const product = products[index];
      addToCart(product);
    });
  });

  console.log(`✓ Rendered ${products.length} product cards`);
}

/**
 * Create HTML for a single product card
 */
function createProductCard(product) {
  const badge = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
  const priceHtml = product.originalPrice
    ? `<s>$${product.originalPrice.toFixed(2)}</s> $${product.price.toFixed(2)}`
    : `$${product.price.toFixed(2)}`;

  // Check if image is a file path or emoji
  const isImageFile = product.image && (product.image.includes('.') || product.image.includes('/'));
  const imageContent = isImageFile
    ? `<img src="${product.image}" alt="${product.name}" class="product-img" style="width:100%;height:100%;object-fit:cover;display:block;">`
    : `<div class="product-placeholder">${product.image}</div>`;

  return `
    <a href="product-details.html?id=${product.id}" style="text-decoration: none; color: inherit;">
      <div class="product-card" data-product-id="${product.id}">
        <div class="product-img-wrap">
          ${badge}
          ${imageContent}
        </div>
        <div class="product-info">
          <div class="product-cat">${product.category}</div>
          <div class="product-name">${product.name}</div>
          <div class="product-price">${priceHtml}</div>
        </div>
      </div>
    </a>
  `;
}

/**
 * Filter and display products by category
 */
function filterByCategory(category) {
  const products = ProductStorage.getByCategory(category);
  const container = document.querySelector('.products-grid');
  
  if (container) {
    renderProductCards(products, container);
  }
}

/**
 * Show all new products
 */
function showNewProducts() {
  const products = ProductStorage.getByBadge('New');
  const container = document.querySelector('.products-grid');
  
  if (container) {
    renderProductCards(products, container);
  }
}

/**
 * Show all products on sale
 */
function showSaleProducts() {
  const products = ProductStorage.getByBadge('Sale');
  const container = document.querySelector('.products-grid');
  
  if (container) {
    renderProductCards(products, container);
  }
}

/**
 * Search products and display results
 */
function searchProducts(query) {
  const results = ProductStorage.search(query);
  const container = document.querySelector('.products-grid');
  
  if (container) {
    if (results.length === 0) {
      container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">No products found</p>';
    } else {
      renderProductCards(results, container);
    }
  }
}

/**
 * Sort products by price
 */
function sortByPrice(ascending = true) {
  const products = ProductStorage.sortByPrice(ascending);
  const container = document.querySelector('.products-grid');
  
  if (container) {
    renderProductCards(products, container);
  }
}

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
 * Add product to cart
 */
function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem('papierco_cart')) || [];
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: product.id, quantity: 1 });
  }

  localStorage.setItem('papierco_cart', JSON.stringify(cart));
  showCartToast('Added to Cart', `${product.name} has been added to your cart.`);
  updateCartCount();
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
  });
}

/**
 * Populate category filter buttons
 */
function setupCategoryFilters() {
  const categories = ProductStorage.getCategories();
  const filterGroup = document.querySelector('.filter-group');
  
  if (!filterGroup) return;

  // Create filter buttons
  const html = `
    <button class="filter-btn" onclick="renderProductsToPage()">All Categories</button>
    ${categories.map(cat => 
      `<button class="filter-btn" onclick="filterByCategory('${cat}')">${cat}</button>`
    ).join('')}
  `;
  
  filterGroup.innerHTML = html;
  console.log('✓ Category filters populated');
}

/**
 * Setup product statistics display
 */
function displayStats() {
  const stats = ProductStorage.getStats();
  
  console.log('📊 Product Statistics:');
  console.log(`   Total Products: ${stats.totalProducts}`);
  console.log(`   Categories: ${stats.categories.join(', ')}`);
  console.log(`   Price Range: $${stats.priceRange.min} - $${stats.priceRange.max}`);
  console.log(`   On Sale: ${stats.onSale}`);
  console.log(`   New Products: ${stats.newProducts}`);
  
  return stats;
}

/**
 * Example: Update product images with real URLs
 */
function updateProductImages(imageUrlMap) {
  ProductStorage.updateImages(imageUrlMap);
  renderProductsToPage();
  console.log('✓ Product images updated');
}

/**
 * Example: Update product prices
 */
function updateProductPrice(productId, newPrice, originalPrice = null) {
  ProductStorage.update(productId, {
    price: newPrice,
    originalPrice: originalPrice,
    badge: originalPrice ? 'Sale' : null
  });
  renderProductsToPage();
  console.log(`✓ Price updated for product ${productId}`);
}

/**
 * Initialize all dynamic features on page load
 */
function initProductSystem() {
  setupCategoryFilters();
  renderProductsToPage();
  displayStats();
  setupMobileMenu();
  setupCartButtonNavigation();
  console.log('✓ Product system initialized');
}

/**
 * Setup mobile menu toggle
 */
function setupMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  const navBackdrop = document.getElementById('navBackdrop');
  const navClose = document.getElementById('navClose');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.add('open');
    });

    navBackdrop?.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });

    navClose?.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });

    document.querySelectorAll('.mobile-nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
      });
    });
  }
}

/**
 * Setup cart button navigation
 */
function setupCartButtonNavigation() {
  document.querySelectorAll('.nav-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const currentPage = window.location.pathname;
      if (!currentPage.includes('cart.html')) {
        window.location.href = 'cart.html';
      }
    });
  });
}

// Auto-initialize when script loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initProductSystem);
} else {
  initProductSystem();
}
