/* ------------------------------
   PulseMart Front-End Script
   Shared logic used on all pages:
   - Product data
   - Theme switching
   - Navigation interactions
   - Product rendering and filters
   - Cart state and calculations
   - Carousel and animations
-------------------------------- */

const STORE_KEY = "pulsemart-cart";
const THEME_KEY = "pulsemart-theme";

/* Demo catalog with 12 products across requested categories. */
const products = [
  {
    id: 1,
    name: "Quantum Noise-Canceling Pods",
    shortDescription: "Immersive wireless audio with adaptive silence.",
    fullDescription: "Premium earbuds with spatial sound, adaptive noise cancellation, and crystal-clear call quality for work and travel.",
    price: 129,
    category: "Electronics",
    tags: ["New", "Featured"],
    images: [
      "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 2,
    name: "AeroFlex City Jacket",
    shortDescription: "Weather-ready urban shell with sleek silhouette.",
    fullDescription: "Lightweight technical jacket designed for city commutes with breathable lining and water-repellent finish.",
    price: 119,
    category: "Apparel",
    tags: ["Popular"],
    images: [
      "https://images.unsplash.com/photo-1548883354-94bcfe321cbb?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 3,
    name: "Orbit MagSafe Wallet",
    shortDescription: "Minimal magnetic wallet with RFID protection.",
    fullDescription: "Ultra-slim accessory that snaps to compatible phones and keeps cards secure with durable stitched leather.",
    price: 39,
    category: "Accessories",
    tags: ["New"],
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1601597111158-2fceff292cdc?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1511381939415-e44015466834?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 4,
    name: "Halo Glow Ambient Lamp",
    shortDescription: "Smart bedside light with mood scenes.",
    fullDescription: "A compact ambient lamp with app-controlled colors, sunrise mode, and warm dimming for restful evenings.",
    price: 74,
    category: "Home gadgets",
    tags: ["Popular"],
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519710884006-9ee04f4e7f1e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 5,
    name: "Nova Arc Smartwatch",
    shortDescription: "Performance tracking in a luxury metal frame.",
    fullDescription: "A premium smartwatch with health sensors, GPS workouts, and a bright always-on display wrapped in aerospace aluminum.",
    price: 249,
    category: "Electronics",
    tags: ["Featured", "Popular"],
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1617043786394-f977fa12eddf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 6,
    name: "Gridline Essential Tee",
    shortDescription: "Ultra-soft cotton blend for daily wear.",
    fullDescription: "Clean-cut premium tee with breathable fabric and structured drape, made for effortless layering.",
    price: 34,
    category: "Apparel",
    tags: ["New"],
    images: [
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 7,
    name: "PulseGrip Utility Backpack",
    shortDescription: "Modular compartments for laptop and gear.",
    fullDescription: "Streamlined backpack with anti-theft zips, water-resistant shell, and padded 16-inch laptop compartment.",
    price: 89,
    category: "Accessories",
    tags: ["Popular"],
    images: [
      "https://images.unsplash.com/photo-1491637639811-60e2756cc1c7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 8,
    name: "ThermaBrew Pro Kettle",
    shortDescription: "Precision-pour kettle with exact temp control.",
    fullDescription: "Variable-temperature electric kettle ideal for specialty coffee and tea, with hold mode and fast boil.",
    price: 99,
    category: "Home gadgets",
    tags: ["New"],
    images: [
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 9,
    name: "Luma UltraWide Monitor",
    shortDescription: "Cinematic curved display for creators.",
    fullDescription: "34-inch ultra-wide monitor with vivid color accuracy, smooth refresh rate, and ergonomic height adjustment.",
    price: 399,
    category: "Electronics",
    tags: ["Featured"],
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4b2e17d1f60?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 10,
    name: "StrideX Knit Sneakers",
    shortDescription: "Lightweight comfort with responsive cushioning.",
    fullDescription: "Breathable knit sneakers built for all-day movement, blending modern design and athletic comfort.",
    price: 79,
    category: "Apparel",
    tags: ["Popular"],
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 11,
    name: "EchoFrame Blue-Light Glasses",
    shortDescription: "Screen-ready frames for visual comfort.",
    fullDescription: "Blue-light filtering glasses with lightweight frame and anti-glare coating for focused productivity.",
    price: 45,
    category: "Accessories",
    tags: ["New", "Popular"],
    images: [
      "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1516726817505-f5ed825624d8?auto=format&fit=crop&w=900&q=80"
    ]
  },
  {
    id: 12,
    name: "BreezePure Air Hub",
    shortDescription: "Compact purifier for cleaner indoor air.",
    fullDescription: "Quiet smart air purifier with multi-stage filtration, auto mode, and app-based monitoring.",
    price: 159,
    category: "Home gadgets",
    tags: ["Featured"],
    images: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1489171078254-c3365d6e359f?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80"
    ]
  }
];

const featuredIds = [1, 5, 9];

function formatPrice(value) {
  return `$${value.toFixed(2)}`;
}

function getCart() {
  const raw = localStorage.getItem(STORE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveCart(cart) {
  localStorage.setItem(STORE_KEY, JSON.stringify(cart));
}

function addToCart(productId, quantity = 1) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ id: productId, quantity });
  }

  saveCart(cart);
  updateCartCount();
}

function removeFromCart(productId) {
  const cart = getCart().filter((item) => item.id !== productId);
  saveCart(cart);
  updateCartCount();
}

function updateQuantity(productId, quantity) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === productId);
  if (!existing) return;

  existing.quantity = Math.max(1, quantity);
  saveCart(cart);
  updateCartCount();
}

function updateCartCount() {
  const countElement = document.getElementById("cartCount");
  if (!countElement) return;

  const totalItems = getCart().reduce((sum, item) => sum + item.quantity, 0);
  countElement.textContent = String(totalItems);
}

function renderProductCard(product) {
  const tagMarkup = product.tags
    .map((tag) => `<span class="tag ${tag.toLowerCase()}">${tag}</span>`)
    .join("");

  return `
    <article class="product-card reveal">
      <img src="${product.images[0]}" alt="${product.name}" loading="lazy" />
      <div class="product-content">
        <div class="tags">${tagMarkup}</div>
        <h3>${product.name}</h3>
        <p>${product.shortDescription}</p>
        <p class="price">${formatPrice(product.price)}</p>
        <div class="product-actions">
          <a class="btn btn-ghost" href="product-details.html?id=${product.id}">View Details</a>
          <button class="btn btn-primary add-cart-btn" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function initNavigation() {
  const toggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    mobileMenu.classList.toggle("open");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      mobileMenu.classList.remove("open");
    });
  });
}

function initThemeToggle() {
  const toggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme) {
    document.documentElement.setAttribute("data-theme", savedTheme);
  }

  if (!toggle) return;

  toggle.textContent = document.documentElement.getAttribute("data-theme") === "light" ? "Dark" : "Light";

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    const next = current === "light" ? "dark" : "light";

    if (next === "dark") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
    }

    localStorage.setItem(THEME_KEY, next);
    toggle.textContent = next === "light" ? "Dark" : "Light";
  });
}

function initRevealAnimation() {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  elements.forEach((el) => observer.observe(el));
}

function bindAddToCartButtons() {
  document.querySelectorAll(".add-cart-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const id = Number(button.getAttribute("data-id"));
      addToCart(id, 1);
      button.textContent = "Added";
      setTimeout(() => {
        button.textContent = "Add to Cart";
      }, 700);
    });
  });
}

function initHomePage() {
  const featuredGrid = document.getElementById("featuredGrid");
  const carouselTrack = document.getElementById("carouselTrack");
  const carouselDots = document.getElementById("carouselDots");

  if (!featuredGrid || !carouselTrack || !carouselDots) return;

  const featuredProducts = products.filter((p) => featuredIds.includes(p.id));
  featuredGrid.innerHTML = featuredProducts.map(renderProductCard).join("");

  carouselTrack.innerHTML = featuredProducts
    .map(
      (product) => `
      <article class="slide" aria-label="${product.name}">
        <img src="${product.images[0]}" alt="${product.name}" />
        <div class="slide-content">
          <div class="tags"><span class="tag featured">Featured</span></div>
          <h3>${product.name}</h3>
          <p>${product.shortDescription}</p>
          <div class="product-actions">
            <a class="btn btn-primary" href="products.html">Shop Now</a>
            <a class="btn btn-ghost" href="product-details.html?id=${product.id}">View Details</a>
          </div>
        </div>
      </article>
    `
    )
    .join("");

  let current = 0;

  carouselDots.innerHTML = featuredProducts
    .map((_, index) => `<button aria-label="Go to slide ${index + 1}" data-slide="${index}"></button>`)
    .join("");

  function updateSlide(index) {
    current = (index + featuredProducts.length) % featuredProducts.length;
    carouselTrack.style.transform = `translateX(-${current * 100}%)`;

    carouselDots.querySelectorAll("button").forEach((dot, i) => {
      dot.classList.toggle("active", i === current);
    });
  }

  document.getElementById("carouselPrev")?.addEventListener("click", () => updateSlide(current - 1));
  document.getElementById("carouselNext")?.addEventListener("click", () => updateSlide(current + 1));

  carouselDots.querySelectorAll("button").forEach((dot) => {
    dot.addEventListener("click", () => {
      updateSlide(Number(dot.getAttribute("data-slide")));
    });
  });

  /* Basic swipe gestures for touch devices. */
  const carousel = document.getElementById("heroCarousel");
  let touchStartX = 0;

  carousel?.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  carousel?.addEventListener("touchend", (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    const diff = touchEndX - touchStartX;

    if (Math.abs(diff) > 45) {
      if (diff < 0) updateSlide(current + 1);
      if (diff > 0) updateSlide(current - 1);
    }
  });

  /* Auto-play keeps hero visually active. */
  setInterval(() => updateSlide(current + 1), 5000);
  updateSlide(0);
  bindAddToCartButtons();
}

function initProductsPage() {
  const grid = document.getElementById("productGrid");
  const categorySelect = document.getElementById("filterCategory");
  const priceSelect = document.getElementById("filterPrice");
  const tagSelect = document.getElementById("filterTag");

  if (!grid || !categorySelect || !priceSelect || !tagSelect) return;

  const categories = [...new Set(products.map((product) => product.category))];
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });

  function passPrice(price, selectedRange) {
    if (selectedRange === "all") return true;
    if (selectedRange === "0-49") return price <= 49;
    if (selectedRange === "50-99") return price >= 50 && price <= 99;
    if (selectedRange === "100-199") return price >= 100 && price <= 199;
    if (selectedRange === "200-plus") return price >= 200;
    return true;
  }

  function applyFilters() {
    const selectedCategory = categorySelect.value;
    const selectedPrice = priceSelect.value;
    const selectedTag = tagSelect.value;

    const filtered = products.filter((product) => {
      const categoryOk = selectedCategory === "all" || product.category === selectedCategory;
      const priceOk = passPrice(product.price, selectedPrice);
      const tagOk = selectedTag === "all" || product.tags.includes(selectedTag);

      return categoryOk && priceOk && tagOk;
    });

    grid.innerHTML = filtered.map(renderProductCard).join("");

    if (!filtered.length) {
      grid.innerHTML = `<article class="panel"><h3>No products found</h3><p>Try adjusting filters for more results.</p></article>`;
    }

    bindAddToCartButtons();
    initRevealAnimation();
  }

  [categorySelect, priceSelect, tagSelect].forEach((control) => {
    control.addEventListener("change", applyFilters);
  });

  applyFilters();
}

function initProductDetailsPage() {
  const detailsContainer = document.getElementById("productDetails");
  const relatedGrid = document.getElementById("relatedGrid");
  if (!detailsContainer || !relatedGrid) return;

  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get("id"));
  const product = products.find((item) => item.id === id) || products[0];

  detailsContainer.innerHTML = `
    <div class="details-media">
      <img id="mainProductImage" class="details-main-image" src="${product.images[0]}" alt="${product.name}" />
      <div class="thumb-row" id="thumbRow"></div>
    </div>

    <div class="details-content">
      <div class="tags">${product.tags.map((tag) => `<span class="tag ${tag.toLowerCase()}">${tag}</span>`).join("")}</div>
      <h1>${product.name}</h1>
      <p>${product.fullDescription}</p>
      <p class="price">${formatPrice(product.price)}</p>
      <div class="qty-wrap">
        <label for="productQty">Qty</label>
        <input class="qty-input" type="number" min="1" max="10" value="1" id="productQty" />
      </div>
      <div class="product-actions">
        <button class="btn btn-primary" id="addDetailsCart">Add to Cart</button>
        <button class="btn btn-ghost" id="contactSeller">Contact seller</button>
      </div>
    </div>
  `;

  const thumbRow = document.getElementById("thumbRow");
  const mainImage = document.getElementById("mainProductImage");

  product.images.forEach((image, index) => {
    const thumb = document.createElement("img");
    thumb.src = image;
    thumb.alt = `${product.name} gallery ${index + 1}`;
    if (index === 0) thumb.classList.add("active");

    thumb.addEventListener("click", () => {
      mainImage.src = image;
      thumbRow.querySelectorAll("img").forEach((node) => node.classList.remove("active"));
      thumb.classList.add("active");
    });

    thumbRow.appendChild(thumb);
  });

  document.getElementById("addDetailsCart")?.addEventListener("click", () => {
    const qty = Number(document.getElementById("productQty")?.value || 1);
    addToCart(product.id, qty);
    alert("Added to cart.");
  });

  document.getElementById("contactSeller")?.addEventListener("click", () => {
    alert("Seller contact request sent. Our team will reach you shortly.");
  });

  const related = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 3);

  relatedGrid.innerHTML = related.map(renderProductCard).join("");
  bindAddToCartButtons();
}

function initCartPage() {
  const cartItemsContainer = document.getElementById("cartItems");
  const subtotalEl = document.getElementById("subtotal");
  const shippingEl = document.getElementById("shipping");
  const totalEl = document.getElementById("total");

  if (!cartItemsContainer || !subtotalEl || !shippingEl || !totalEl) return;

  let promoDiscount = 0;

  function renderCart() {
    const cart = getCart();

    if (!cart.length) {
      cartItemsContainer.innerHTML = `<article class="panel"><h3>Your cart is empty</h3><p>Browse products and add items to continue.</p><a class="btn btn-primary" href="products.html">Go to Shop</a></article>`;
      subtotalEl.textContent = "$0.00";
      shippingEl.textContent = "$0.00";
      totalEl.textContent = "$0.00";
      return;
    }

    cartItemsContainer.innerHTML = cart
      .map((item) => {
        const product = products.find((prod) => prod.id === item.id);
        if (!product) return "";

        return `
          <article class="cart-item">
            <img src="${product.images[0]}" alt="${product.name}" />
            <div>
              <h3>${product.name}</h3>
              <p>${formatPrice(product.price)}</p>
              <label>Qty
                <input class="qty-input cart-qty" type="number" min="1" value="${item.quantity}" data-id="${product.id}" />
              </label>
              <button class="btn btn-ghost remove-item" data-id="${product.id}">Remove</button>
            </div>
          </article>
        `;
      })
      .join("");

    const subtotal = cart.reduce((sum, item) => {
      const product = products.find((prod) => prod.id === item.id);
      return sum + (product ? product.price * item.quantity : 0);
    }, 0);

    const shipping = subtotal > 200 ? 0 : 12;
    const discountAmount = subtotal * promoDiscount;
    const total = Math.max(0, subtotal + shipping - discountAmount);

    subtotalEl.textContent = formatPrice(subtotal);
    shippingEl.textContent = formatPrice(shipping);
    totalEl.textContent = formatPrice(total);

    cartItemsContainer.querySelectorAll(".cart-qty").forEach((input) => {
      input.addEventListener("change", () => {
        const id = Number(input.getAttribute("data-id"));
        const quantity = Number(input.value);
        updateQuantity(id, quantity);
        renderCart();
      });
    });

    cartItemsContainer.querySelectorAll(".remove-item").forEach((button) => {
      button.addEventListener("click", () => {
        const id = Number(button.getAttribute("data-id"));
        removeFromCart(id);
        renderCart();
      });
    });
  }

  document.getElementById("applyPromo")?.addEventListener("click", () => {
    const code = String(document.getElementById("promoCode")?.value || "").trim().toUpperCase();

    if (code === "SAVE10") {
      promoDiscount = 0.1;
      alert("Promo applied: 10% off subtotal.");
    } else {
      promoDiscount = 0;
      alert("Invalid promo code. Try SAVE10.");
    }

    renderCart();
  });

  document.getElementById("checkoutBtn")?.addEventListener("click", () => {
    const cart = getCart();
    if (!cart.length) {
      alert("Your cart is empty.");
      return;
    }

    alert("Checkout complete (frontend demo). Thank you for shopping with PulseMart.");
    saveCart([]);
    promoDiscount = 0;
    renderCart();
    updateCartCount();
  });

  renderCart();
}

function initForms() {
  document.getElementById("contactForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Message sent successfully. We will get back to you soon.");
    event.target.reset();
  });

  document.getElementById("profileForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Profile updated (frontend demo).");
  });
}

function initFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());
}

function initPage() {
  initNavigation();
  initThemeToggle();
  initForms();
  initFooterYear();
  updateCartCount();

  const page = document.body.dataset.page;
  if (page === "home") initHomePage();
  if (page === "products") initProductsPage();
  if (page === "details") initProductDetailsPage();
  if (page === "cart") initCartPage();

  initRevealAnimation();
}

document.addEventListener("DOMContentLoaded", initPage);
