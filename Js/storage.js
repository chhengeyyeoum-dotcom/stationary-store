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
    },
    {
      id: 13,
      name: 'Cream Leather Journal',
      category: 'Journals',
      price: 28.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-polina-kovaleva-5717477.jpg',
      description: 'Premium cream leather bound journal with lined pages',
      size: '6" x 9"',
      material: 'Genuine Leather Cover',
      pages: '256 pages',
      weight: '10 oz'
    },
    {
      id: 14,
      name: 'Softcover Sketchbook',
      category: 'Journals',
      price: 19.00,
      originalPrice: null,
      badge: 'New',
      image: 'img/pexels-polina-kovaleva-5717477.jpg',
      description: 'Perfect for sketching and doodling with quality paper',
      size: '8.5" x 11"',
      material: 'Paper Cover',
      pages: '128 pages',
      weight: '9 oz'
    },
    {
      id: 15,
      name: 'Black Bullet Journal',
      category: 'Journals',
      price: 22.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-polina-kovaleva-5717477.jpg',
      description: 'Dotted pages ideal for bullet journaling and planning',
      size: '5" x 7"',
      material: 'Paper Cover',
      pages: '180 pages',
      weight: '6 oz'
    },
    {
      id: 16,
      name: 'Travel Notebook Set',
      category: 'Journals',
      price: 35.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-polina-kovaleva-5717477.jpg',
      description: 'Three compact notebooks perfect for travel',
      size: '4" x 6"',
      material: 'Kraft Paper',
      quantity: 'Set of 3',
      weight: '7 oz'
    },
    {
      id: 17,
      name: 'Watercolor Journal',
      category: 'Journals',
      price: 38.00,
      originalPrice: 45.00,
      badge: 'Sale',
      image: 'img/pexels-polina-kovaleva-5717477.jpg',
      description: 'Heavy paper perfect for watercolor and mixed media',
      size: '7" x 10"',
      material: 'Cold Press Paper',
      pages: '96 pages',
      weight: '14 oz'
    },
    {
      id: 18,
      name: 'Grid Notebook Pro',
      category: 'Journals',
      price: 16.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-polina-kovaleva-5717477.jpg',
      description: 'Grid paper ideal for technical sketching and designs',
      size: '8" x 10"',
      material: 'Paper Cover',
      pages: '192 pages',
      weight: '8 oz'
    },
    {
      id: 19,
      name: 'Leather Notebook XL',
      category: 'Journals',
      price: 42.00,
      originalPrice: null,
      badge: 'New',
      image: 'img/pexels-polina-kovaleva-5717477.jpg',
      description: 'Premium large leather journal for serious writers',
      size: '8.5" x 11"',
      material: 'Full Grain Leather',
      pages: '320 pages',
      weight: '16 oz'
    },
    {
      id: 20,
      name: 'Rose Gold Pen',
      category: 'Writing',
      price: 38.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-pavel-danilyuk-8441842.jpg',
      description: 'Elegant rose gold finish ballpoint pen',
      size: '5.5" length',
      material: 'Rose Gold Plated',
      ink: 'Blue ink',
      weight: '0.9 oz'
    },
    {
      id: 21,
      name: 'Fountain Pen Set',
      category: 'Writing',
      price: 56.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-pavel-danilyuk-8441842.jpg',
      description: 'Professional fountain pen with ink cartridges',
      size: '5.25" length',
      material: 'Stainless Steel',
      ink: 'Refillable',
      weight: '1.3 oz'
    },
    {
      id: 22,
      name: 'Gel Pen Assortment',
      category: 'Writing',
      price: 12.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-pavel-danilyuk-8441842.jpg',
      description: 'Pack of 10 smooth gel pens in assorted colors',
      size: '5.5" length',
      material: 'Plastic & Metal',
      quantity: 'Set of 10',
      weight: '3 oz'
    },
    {
      id: 23,
      name: 'Calligraphy Set',
      category: 'Writing',
      price: 48.00,
      originalPrice: null,
      badge: 'New',
      image: 'img/pexels-pavel-danilyuk-8441842.jpg',
      description: 'Complete calligraphy set with nibs and ink',
      size: 'Various',
      material: 'Metal & Wood',
      quantity: '6 piece set',
      weight: '8 oz'
    },
    {
      id: 24,
      name: 'Mechanical Pencil Pro',
      category: 'Writing',
      price: 18.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-pavel-danilyuk-8441842.jpg',
      description: 'Precision mechanical pencil with comfort grip',
      size: '5.75" length',
      material: 'Aluminum & Rubber',
      leads: '0.5mm & 0.7mm',
      weight: '0.8 oz'
    },
    {
      id: 25,
      name: 'Colored Pencil Set Deluxe',
      category: 'Writing',
      price: 62.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-pavel-danilyuk-8441842.jpg',
      description: 'Premium set of 48 artist-grade colored pencils',
      size: '7.5" length',
      material: 'FSC Wood',
      quantity: 'Set of 48',
      weight: '20 oz'
    },
    {
      id: 26,
      name: 'Minimal Index Cards',
      category: 'Cards & Notepaper',
      price: 8.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-karola-g-5705966.jpg',
      description: 'Pack of 100 blank index cards for notes and ideas',
      size: '3" x 5"',
      material: 'Paper',
      quantity: '100 cards',
      weight: '2.5 oz'
    },
    {
      id: 27,
      name: 'Embossed Thank You Cards',
      category: 'Cards & Notepaper',
      price: 20.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-karola-g-5705966.jpg',
      description: 'Elegant embossed thank you card set',
      size: '4.25" x 5.5"',
      material: 'Cardstock',
      quantity: 'Set of 10',
      weight: '2 oz'
    },
    {
      id: 28,
      name: 'Folded Notecard Set',
      category: 'Cards & Notepaper',
      price: 15.00,
      originalPrice: null,
      badge: 'Sale',
      image: 'img/pexels-karola-g-5705966.jpg',
      description: 'Premium folded notecards with envelopes',
      size: '5" x 7"',
      material: 'Linen Paper',
      quantity: 'Set of 12',
      weight: '3.5 oz'
    },
    {
      id: 29,
      name: 'Postcard Collection',
      category: 'Cards & Notepaper',
      price: 14.00,
      originalPrice: null,
      badge: 'New',
      image: 'img/pexels-karola-g-5705966.jpg',
      description: 'Beautiful illustrated postcards set',
      size: '4" x 6"',
      material: 'Matte Paper',
      quantity: 'Set of 20',
      weight: '2.8 oz'
    },
    {
      id: 30,
      name: 'Pearl Finish Stationary',
      category: 'Cards & Notepaper',
      price: 26.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-karola-g-5705966.jpg',
      description: 'Luxe pearl finish letter set with matching envelopes',
      size: '8.5" x 11"',
      material: 'Pearl Paper',
      quantity: '50 sheets + 50 envelopes',
      weight: '10 oz'
    },
    {
      id: 31,
      name: 'Kraft Paper Card Pack',
      category: 'Cards & Notepaper',
      price: 11.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-karola-g-5705966.jpg',
      description: 'Eco-friendly kraft paper card pack',
      size: '3.5" x 5"',
      material: 'Recycled Kraft Paper',
      quantity: 'Set of 30',
      weight: '2 oz'
    },
    {
      id: 32,
      name: 'Year Calendar 2026',
      category: 'Planning',
      price: 19.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-n-voitkevich-5554699.jpg',
      description: 'Single page yearly calendar for quick reference',
      size: '11" x 14"',
      material: 'Matte Paper',
      pages: '1 year',
      weight: '2 oz'
    },
    {
      id: 33,
      name: 'Team Planner Board',
      category: 'Planning',
      price: 45.00,
      originalPrice: null,
      badge: 'New',
      image: 'img/pexels-n-voitkevich-5554699.jpg',
      description: 'Wall-mounted team planning board with dry erase',
      size: '18" x 24"',
      material: 'Aluminum & Plastic',
      pages: 'Customizable',
      weight: '15 oz'
    },
    {
      id: 34,
      name: 'Daily Desk Pad',
      category: 'Planning',
      price: 31.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-n-voitkevich-5554699.jpg',
      description: 'Large desk pad with daily planning grid',
      size: '24" x 18"',
      material: 'Paper',
      pages: '365 days',
      weight: '8 oz'
    },
    {
      id: 35,
      name: 'Academic Planner 2026',
      category: 'Planning',
      price: 35.00,
      originalPrice: 40.00,
      badge: 'Sale',
      image: 'img/pexels-n-voitkevich-5554699.jpg',
      description: 'August-July academic planner with subject dividers',
      size: '8.5" x 11"',
      material: 'Paper Cover',
      pages: '300+ pages',
      weight: '14 oz'
    },
    {
      id: 36,
      name: 'Productivity Tracker',
      category: 'Planning',
      price: 17.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-n-voitkevich-5554699.jpg',
      description: 'Track daily habits and goals with this tracker',
      size: '6" x 9"',
      material: 'Paper Cover',
      pages: '52 weeks',
      weight: '5 oz'
    },
    {
      id: 37,
      name: 'Luxury Gift Set Premium',
      category: 'Planning',
      price: 95.00,
      originalPrice: null,
      badge: 'New',
      image: 'img/pexels-cup-of-couple-7657411.jpg',
      description: 'Premium gift set with journal, pen, and accessories',
      size: '12" x 10" x 5"',
      material: 'Luxury Packaging',
      contents: '6 premium items',
      weight: '25 oz'
    },
    {
      id: 38,
      name: 'Canvas Journal Classic',
      category: 'Journals',
      price: 25.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-polina-kovaleva-5717477.jpg',
      description: 'Durable canvas covered journal for daily use',
      size: '5.5" x 8"',
      material: 'Canvas Cover',
      pages: '200 pages',
      weight: '7 oz'
    },
    {
      id: 39,
      name: 'Minimalist Lined Journal',
      category: 'Journals',
      price: 21.00,
      originalPrice: null,
      badge: 'Sale',
      image: 'img/pexels-polina-kovaleva-5717477.jpg',
      description: 'Simple lined journal with minimalist design',
      size: '6" x 8"',
      material: 'Paper Cover',
      pages: '160 pages',
      weight: '5.5 oz'
    },
    {
      id: 40,
      name: 'Premium Ballpoint Pen',
      category: 'Writing',
      price: 29.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-pavel-danilyuk-8441842.jpg',
      description: 'Smooth premium ballpoint with ergonomic grip',
      size: '5.75" length',
      material: 'Metal & Rubber',
      ink: 'Black ink',
      weight: '1 oz'
    },
    {
      id: 41,
      name: 'Executive Desk Pen',
      category: 'Writing',
      price: 45.00,
      originalPrice: null,
      badge: 'New',
      image: 'img/pexels-pavel-danilyuk-8441842.jpg',
      description: 'Executive grade pen with polished finish',
      size: '6" length',
      material: 'Premium Metal',
      ink: 'Refillable',
      weight: '1.4 oz'
    },
    {
      id: 42,
      name: 'Charcoal Sketch Cards',
      category: 'Cards & Notepaper',
      price: 23.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-karola-g-5705966.jpg',
      description: 'Thick charcoal finish cards perfect for sketching',
      size: '5" x 7"',
      material: 'Specialty Paper',
      quantity: 'Set of 15',
      weight: '4 oz'
    },
    {
      id: 43,
      name: 'Celebration Card Bundle',
      category: 'Cards & Notepaper',
      price: 18.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-karola-g-5705966.jpg',
      description: 'Mix of celebration cards for all occasions',
      size: '5" x 7"',
      material: 'Matte Cardstock',
      quantity: 'Set of 24',
      weight: '5 oz'
    },
    {
      id: 44,
      name: 'Monthly Desk Calendar',
      category: 'Planning',
      price: 27.00,
      originalPrice: null,
      badge: null,
      image: 'img/pexels-n-voitkevich-5554699.jpg',
      description: 'Compact monthly calendar for desk organization',
      size: '7" x 9"',
      material: 'Cardstock',
      pages: '12 months',
      weight: '3 oz'
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
