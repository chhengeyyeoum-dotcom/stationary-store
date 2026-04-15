/**
 * Product Storage Management System
 * Handles storing, updating, and retrieving product data with images
 */

const ProductStorage = {
  STORAGE_KEY: 'papierco_products',

  /**
   * Initialize products with default data
   */
  defaultProducts: [
    {
      id: 1,
      name: 'Linen Hardbound Journal',
      category: 'Journals',
      price: 15.00,
      originalPrice: null,
      badge: 'New',
      image: 'img/pexels-polina-kovaleva-5717477.jpg',
      description: 'Premium quality linen hardbound journal with cream pages',
      size: '5.5" x 8.5"',
      material: 'Linen Cover & Cream Paper',
      pages: '240 pages',
      weight: '8 oz'
    },
    {
      id: 2,
      name: 'Brass Roller Pen',
      category: 'Writing',
      price: 52.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-pavel-danilyuk-8441842.jpg',
      description: 'Elegant brass roller pen with smooth writing experience',
      size: '5.75" length',
      material: 'Solid Brass',
      ink: 'Refillable gel ink',
      weight: '1.2 oz'
    },
    {
      id: 3,
      name: 'Pressed Flower Set',
      category: 'Notecards',
      price: 18.00,
      originalPrice: 24.00,
      badge: 'Sale',
      image: 'img/pexels-karola-g-5705966.jpg',
      description: 'Beautiful pressed flower notecards, set of 12',
      size: '4.5" x 6"',
      material: 'Recycled Paper',
      quantity: 'Set of 12 cards',
      weight: '3 oz'
    },
    {
      id: 4,
      name: 'Weekly Desk Planner',
      category: 'Planning',
      price: 29.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-karola-g-5208294.jpg',
      description: 'Organize your week with our elegant desk planner',
      size: '8.5" x 11"',
      material: 'Kraft Paper Cover',
      pages: '52 weeks',
      weight: '12 oz'
    },
    {
      id: 5,
      name: 'Letterpress Greeting Cards',
      category: 'Cards & Notepaper',
      price: 16.00,
      originalPrice: null,
      badge: 'New',
      image: 'img/pexels-karola-g-8947763.jpg',
      description: 'Handcrafted letterpress greeting cards',
      size: '4.25" x 5.5"',
      material: 'Cotton Paper',
      quantity: 'Set of 8 cards',
      weight: '2.5 oz'
    },
    {
      id: 6,
      name: 'Monthly Wall Calendar',
      category: 'Planning',
      price: 22.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-n-voitkevich-5554699.jpg',
      description: 'Beautiful wall calendar with minimalist design',
      size: '11" x 14"',
      material: 'Matte Paper',
      pages: '12 months',
      weight: '4 oz'
    },
    {
      id: 7,
      name: 'Wooden Pencil Set',
      category: 'Writing',
      price: 24.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-eyupcancaglar-17248408.jpg',
      description: 'Set of 12 premium wooden pencils with eraser',
      size: '7.5" length',
      material: 'FSC Certified Wood',
      quantity: 'Set of 12',
      weight: '6 oz'
    },
    {
      id: 8,
      name: 'Washi Tape Collection',
      category: 'Accessories',
      price: 9.00,
      originalPrice: 12.00,
      badge: 'Sale',
      image: 'img/pexels-ds-stories-8099387.jpg',
      description: 'Colorful washi tape collection, 10 different patterns',
      size: '0.6" x 33 ft per roll',
      material: 'Rice Paper',
      quantity: '10 different designs',
      weight: '2 oz'
    },
    {
      id: 9,
      name: 'Brass Paper Clips',
      category: 'Accessories',
      price: 14.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-eyupcancaglar-17248408.jpg',
      description: 'Premium brass paper clips in elegant packaging',
      size: '1.25" length',
      material: 'Solid Brass',
      quantity: 'Set of 20',
      weight: '1.5 oz'
    },
    {
      id: 10,
      name: 'Enamel Pins Set',
      category: 'Accessories',
      price: 18.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-eyupcancaglar-17248408.jpg',
      description: 'Cute enamel pins set featuring stationery designs',
      size: '0.5" - 1" diameter',
      material: 'Tin & Enamel',
      quantity: 'Set of 5 designs',
      weight: '1 oz'
    },
    {
      id: 11,
      name: 'Essentials Gift Box',
      category: 'Gift Sets',
      price: 68.00,
      originalPrice: null,
      badge: 'New',
      image: 'img/pexels-cup-of-couple-7657411.jpg',
      description: 'Complete gift box with assorted premium stationery',
      size: '10" x 8" x 4"',
      material: 'Recycled Cardboard',
      contents: '5 premium items',
      weight: '20 oz'
    },
    {
      id: 12,
      name: 'Letterhead & Envelopes',
      category: 'Stationery',
      price: 32.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-ds-stories-8099387.jpg',
      description: 'Custom letterhead with matching envelope set',
      size: '8.5" x 11"',
      material: 'Premium Cotton Paper',
      quantity: '100 sheets + 50 envelopes',
      weight: '18 oz'
    }
  ],

  /**
   * Initialize storage with default products, always update with latest
   */
  init() {
    // Always update to latest defaultProducts to ensure image paths are current
    this.setAll(this.defaultProducts);
    console.log('✓ Product storage initialized with latest products');
  },

  /**
   * Get all products from storage
   */
  getAll() {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  },

  /**
   * Set all products in storage
   */
  setAll(products) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
    console.log(`✓ Storage updated with ${products.length} products`);
  },

  /**
   * Get a single product by ID
   */
  getById(id) {
    const products = this.getAll();
    return products ? products.find(p => p.id === id) : null;
  },

  /**
   * Add a new product
   */
  add(product) {
    const products = this.getAll() || [];
    const newProduct = {
      id: Math.max(...products.map(p => p.id), 0) + 1,
      ...product
    };
    products.push(newProduct);
    this.setAll(products);
    console.log(`✓ Product added: ${newProduct.name}`);
    return newProduct;
  },

  /**
   * Update an existing product
   */
  update(id, updates) {
    const products = this.getAll();
    if (!products) return null;

    const product = products.find(p => p.id === id);
    if (!product) {
      console.warn(`Product with ID ${id} not found`);
      return null;
    }

    Object.assign(product, updates);
    this.setAll(products);
    console.log(`✓ Product updated: ${product.name}`);
    return product;
  },

  /**
   * Update product image
   */
  updateImage(id, image) {
    return this.update(id, { image });
  },

  /**
   * Update multiple product images at once
   */
  updateImages(imageMap) {
    const products = this.getAll();
    if (!products) return;

    Object.entries(imageMap).forEach(([id, image]) => {
      const product = products.find(p => p.id === parseInt(id));
      if (product) {
        product.image = image;
      }
    });

    this.setAll(products);
    console.log(`✓ ${Object.keys(imageMap).length} images updated`);
  },

  /**
   * Delete a product by ID
   */
  delete(id) {
    const products = this.getAll();
    if (!products) return false;

    const index = products.findIndex(p => p.id === id);
    if (index === -1) {
      console.warn(`Product with ID ${id} not found`);
      return false;
    }

    const deleted = products.splice(index, 1);
    this.setAll(products);
    console.log(`✓ Product deleted: ${deleted[0].name}`);
    return true;
  },

  /**
   * Get products by category
   */
  getByCategory(category) {
    const products = this.getAll();
    return products ? products.filter(p => p.category === category) : [];
  },

  /**
   * Get all categories
   */
  getCategories() {
    const products = this.getAll();
    if (!products) return [];
    return [...new Set(products.map(p => p.category))];
  },

  /**
   * Get products with a specific badge
   */
  getByBadge(badge) {
    const products = this.getAll();
    return products ? products.filter(p => p.badge === badge) : [];
  },

  /**
   * Search products by name
   */
  search(query) {
    const products = this.getAll();
    return products ? products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase())
    ) : [];
  },

  /**
   * Get products sorted by price
   */
  sortByPrice(ascending = true) {
    const products = this.getAll();
    if (!products) return [];
    return [...products].sort((a, b) =>
      ascending ? a.price - b.price : b.price - a.price
    );
  },

  /**
   * Clear all data from storage
   */
  clear() {
    localStorage.removeItem(this.STORAGE_KEY);
    console.log('✓ Product storage cleared');
  },

  /**
   * Reset to default products
   */
  reset() {
    this.setAll(this.defaultProducts);
    console.log('✓ Product storage reset to defaults');
  },

  /**
   * Export all products as JSON
   */
  export() {
    const products = this.getAll();
    return JSON.stringify(products, null, 2);
  },

  /**
   * Import products from JSON
   */
  import(jsonString) {
    try {
      const products = JSON.parse(jsonString);
      this.setAll(products);
      console.log(`✓ ${products.length} products imported`);
      return true;
    } catch (error) {
      console.error('✗ Import failed:', error.message);
      return false;
    }
  },

  /**
   * Get storage statistics
   */
  getStats() {
    const products = this.getAll() || [];
    return {
      totalProducts: products.length,
      categories: this.getCategories(),
      priceRange: {
        min: Math.min(...products.map(p => p.price)),
        max: Math.max(...products.map(p => p.price))
      },
      onSale: products.filter(p => p.originalPrice !== null).length,
      newProducts: products.filter(p => p.badge === 'New').length
    };
  }
};

// Initialize storage when script loads
document.addEventListener('DOMContentLoaded', () => {
  ProductStorage.init();
});
