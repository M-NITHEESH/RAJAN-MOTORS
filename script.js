// =====================================
// HERO BANNER SLIDER
// =====================================

const hero = document.querySelector(".hero");
const indicators = document.querySelectorAll(".hero-indicators span");

const banners = [
  "images/banners/banner1.jpg",
  "images/banners/banner2.jpg",
  "images/banners/banner3.jpg",
  "images/banners/banner4.jpg",
  "images/banners/banner5.jpg",
];

let currentBanner = 0;
let bannerTimer;

function changeBanner(index) {
  currentBanner = index;

  hero.style.backgroundImage = `url("./${banners[currentBanner]}")`;
  hero.style.backgroundSize = currentBanner === 1 ? "100% 100%" : "cover";
  hero.style.backgroundPosition = "center center";
  hero.style.backgroundRepeat = "no-repeat";

  // Update active banner indicator
  indicators.forEach((indicator, i) => {
    indicator.classList.toggle("active", i === currentBanner);
  });
}
function startBannerSlider() {
  clearInterval(bannerTimer);

  bannerTimer = setInterval(() => {
    const nextBanner = (currentBanner + 1) % banners.length;
    changeBanner(nextBanner);
  }, 5000);
}

// Display the first banner immediately
changeBanner(0);

// Start automatic rotation
startBannerSlider();
function startBannerSlider() {
  clearInterval(bannerTimer);

  bannerTimer = setInterval(() => {
    changeBanner((currentBanner + 1) % banners.length);
  }, 5000);
}

changeBanner(0);
startBannerSlider();

// =====================================
// VEHICLE SHOWCASE
// =====================================

// Vehicle information for each category
const vehicleData = {
  motorcycles: [
    {
      name: "Motorcycle Model 01",
      description: "Discover a motorcycle designed for your everyday journeys.",
      engine: "To be updated",
      performance: "To be updated",
    },
    {
      name: "Motorcycle Model 02",
      description: "Explore a motorcycle built for comfort and adventure.",
      engine: "To be updated",
      performance: "To be updated",
    },
    {
      name: "Motorcycle Model 03",
      description: "Find a ride that matches your individual style.",
      engine: "To be updated",
      performance: "To be updated",
    },
  ],

  scooters: [
    {
      name: "Scooter Model 01",
      description: "Explore practical mobility for your everyday commute.",
      engine: "To be updated",
      performance: "To be updated",
    },
    {
      name: "Scooter Model 02",
      description: "Discover a stylish scooter for everyday journeys.",
      engine: "To be updated",
      performance: "To be updated",
    },
  ],

  ev: [
    {
      name: "Electric Model 01",
      description: "Explore electric mobility for your daily journeys.",
      engine: "Electric",
      performance: "To be updated",
    },
    {
      name: "Electric Model 02",
      description: "Discover a new approach to everyday transportation.",
      engine: "Electric",
      performance: "To be updated",
    },
  ],
};

// Select the HTML elements we need to update
const categoryCards = document.querySelectorAll(".category-card");

const vehicleName = document.querySelector("#vehicle-name");
const vehicleDescription = document.querySelector("#vehicle-description");
const vehicleEngine = document.querySelector("#vehicle-engine");
const vehiclePerformance = document.querySelector("#vehicle-performance");

// Track the currently selected category and vehicle
let currentCategory = "motorcycles";
let currentVehicleIndex = 0;
// Update the vehicle section

function updateVehicleCategory(category) {
  if (!vehicleData[category]) {
    return;
  }

  currentCategory = category;
  currentVehicleIndex = 0;

  categoryCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.category === category);
  });

  displayVehicle();
}

function displayVehicle() {
  const vehicles = vehicleData[currentCategory];
  const vehicle = vehicles[currentVehicleIndex];

  vehicleName.textContent = vehicle.name;
  vehicleDescription.textContent = vehicle.description;
  vehicleEngine.textContent = vehicle.engine;
  vehiclePerformance.textContent = vehicle.performance;

  document.querySelector("#vehicle-counter").textContent =
    `${String(currentVehicleIndex + 1).padStart(2, "0")} / ${String(vehicles.length).padStart(2, "0")}`;
}
// Listen for category clicks
categoryCards.forEach((card) => {
  card.addEventListener("click", () => {
    const selectedCategory = card.dataset.category;

    updateVehicleCategory(selectedCategory);
  });
});

// Previous vehicle
document.querySelector("#vehicle-prev").addEventListener("click", () => {
  const vehicles = vehicleData[currentCategory];

  currentVehicleIndex =
    (currentVehicleIndex - 1 + vehicles.length) % vehicles.length;

  displayVehicle();
});

// Next vehicle
document.querySelector("#vehicle-next").addEventListener("click", () => {
  const vehicles = vehicleData[currentCategory];

  currentVehicleIndex = (currentVehicleIndex + 1) % vehicles.length;

  displayVehicle();
});

// Display the initial vehicle
displayVehicle();

// =====================================
// TECHNOLOGY PANELS
// =====================================

const technologyPanels = document.querySelectorAll(".technology-panel");

technologyPanels.forEach((panel) => {
  const toggle = panel.querySelector(".technology-toggle");

  toggle.addEventListener("click", () => {
    // Check whether the clicked panel is already open
    const isAlreadyOpen = panel.classList.contains("active");

    // Close every panel
    technologyPanels.forEach((item) => {
      item.classList.remove("active");

      item
        .querySelector(".technology-toggle")
        .setAttribute("aria-expanded", "false");
    });

    // Open the clicked panel unless it was already open
    if (!isAlreadyOpen) {
      panel.classList.add("active");

      toggle.setAttribute("aria-expanded", "true");
    }
  });
});

// =====================================
// MOBILE NAVIGATION
// =====================================

const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector("#nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));

  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation menu" : "Open navigation menu",
  );
});

// Close the mobile menu after selecting a link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");

    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});

// =====================================
// VEHICLE CAROUSEL KEYBOARD CONTROLS
// =====================================

document.addEventListener("keydown", (event) => {
  // Ignore keyboard shortcuts while typing in form fields
  const tag = event.target.tagName;

  if (
    tag === "INPUT" ||
    tag === "TEXTAREA" ||
    tag === "SELECT" ||
    event.target.isContentEditable
  ) {
    return;
  }

  // Only navigate when the vehicle section is visible
  const vehicleSection = document.querySelector("#vehicles");
  const sectionRect = vehicleSection.getBoundingClientRect();

  const isVisible =
    sectionRect.bottom > 0 && sectionRect.top < window.innerHeight;

  if (!isVisible) {
    return;
  }

  if (event.key === "ArrowRight") {
    document.querySelector("#vehicle-next").click();
  }

  if (event.key === "ArrowLeft") {
    document.querySelector("#vehicle-prev").click();
  }
});
