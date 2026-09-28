// ==========================================
// FOR HIS GLORY CONSTRUCTION & REPAIRS
// WEBSITE PHOTO GALLERY
// ==========================================

const photoFiles = [
  {
    file: "Herringbone_Floor_Detail.jpg",
    category: "Flooring",
    title: "Herringbone Floor Detail"
  },
  {
    file: "Riverside_Hatch_Worksite.png",
    category: "Exterior & Sitework",
    title: "Riverside Worksite"
  },
  {
    file: "Riverside_Worksite.jpg",
    category: "Exterior & Sitework",
    title: "Riverside Worksite"
  },
  {
    file: "Riverside_Worksite_2.jpg",
    category: "Exterior & Sitework",
    title: "Riverside Worksite"
  },
  {
    file: "Shed_Exterior.jpg",
    category: "Sheds & Outbuildings",
    title: "Shed Exterior"
  },
  {
    file: "Shed_Interior.jpg",
    category: "Sheds & Outbuildings",
    title: "Shed Interior"
  },
  {
    file: "Shower_Wall_Repair.jpg",
    category: "Bathroom & Interior Repairs",
    title: "Shower Wall Repair"
  },
  {
    file: "Siding_and_Window_Exterior.jpg",
    category: "Siding & Windows",
    title: "Siding and Window Exterior"
  },
  {
    file: "Window_Screen_Before_After.png",
    category: "Siding & Windows",
    title: "Window Screen Before & After"
  }
];

const gallery = document.getElementById("gallery");

if (gallery) {

  gallery.innerHTML = "";

  const filterContainer = document.createElement("div");

  filterContainer.className = "gallery-filters";

  const categories = [
    "All",
    ...new Set(photoFiles.map(photo => photo.category))
  ];

  categories.forEach(category => {

    const button = document.createElement("button");

    button.type = "button";
    button.className = "gallery-filter";
    button.textContent = category;

    if (category === "All") {
      button.classList.add("active");
    }

    button.addEventListener("click", () => {

      document
        .querySelectorAll(".gallery-filter")
        .forEach(btn => btn.classList.remove("active"));

      button.classList.add("active");

      displayPhotos(category);
    });

    filterContainer.appendChild(button);
  });

  gallery.parentNode.insertBefore(
    filterContainer,
    gallery
  );

  displayPhotos("All");
}


// ==========================================
// DISPLAY PHOTOS
// ==========================================

function displayPhotos(category) {

  if (!gallery) return;

  gallery.innerHTML = "";

  const photosToDisplay =
    category === "All"
      ? photoFiles
      : photoFiles.filter(
          photo => photo.category === category
        );

  photosToDisplay.forEach(photo => {

    const item = document.createElement("button");

    item.className = "gallery-item";
    item.type = "button";

    item.setAttribute(
      "aria-label",
      `Open ${photo.title}`
    );

    const img = document.createElement("img");

    // PHOTOS ARE IN THE MAIN WEBSITE FOLDER
    img.src = photo.file;

    img.alt =
      `For His Glory Construction & Repairs - ${photo.title}`;

    img.loading = "lazy";

    const caption = document.createElement("span");

    caption.className = "gallery-caption";
    caption.textContent = photo.title;

    item.appendChild(img);
    item.appendChild(caption);

    item.addEventListener("click", () => {
      openLightbox(photo);
    });

    gallery.appendChild(item);
  });
}


// ==========================================
// LIGHTBOX
// ==========================================

function openLightbox(photo) {

  let lightbox =
    document.getElementById("photo-lightbox");

  if (!lightbox) {

    lightbox = document.createElement("div");

    lightbox.id = "photo-lightbox";
    lightbox.className = "photo-lightbox";

    lightbox.innerHTML = `
      <button
        class="lightbox-close"
        type="button"
        aria-label="Close photo"
      >
        &times;
      </button>

      <div class="lightbox-content">

        <img
          class="lightbox-image"
          src=""
          alt=""
        >

        <div class="lightbox-title"></div>

      </div>
    `;

    document.body.appendChild(lightbox);

    lightbox
      .querySelector(".lightbox-close")
      .addEventListener(
        "click",
        closeLightbox
      );

    lightbox.addEventListener(
      "click",
      event => {

        if (event.target === lightbox) {
          closeLightbox();
        }

      }
    );
  }

  const image =
    lightbox.querySelector(".lightbox-image");

  const title =
    lightbox.querySelector(".lightbox-title");

  // PHOTOS ARE IN THE MAIN WEBSITE FOLDER
  image.src = photo.file;

  image.alt =
    `For His Glory Construction & Repairs - ${photo.title}`;

  title.textContent = photo.title;

  lightbox.classList.add("open");

  document.body.style.overflow = "hidden";
}


// ==========================================
// CLOSE LIGHTBOX
// ==========================================

function closeLightbox() {

  const lightbox =
    document.getElementById("photo-lightbox");

  if (!lightbox) return;

  lightbox.classList.remove("open");

  document.body.style.overflow = "";
}


// ==========================================
// ESCAPE KEY
// ==========================================

document.addEventListener(
  "keydown",
  event => {

    if (event.key === "Escape") {
      closeLightbox();
    }

  }
);


// ==========================================
// GALLERY STYLES
// ==========================================

const galleryStyle =
  document.createElement("style");

galleryStyle.textContent = `

.gallery-filters {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin: 25px 0;
}

.gallery-filter {
  border: 1px solid #ccc;
  background: #111;
  color: #fff;
  padding: 10px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 15px;
}

.gallery-filter:hover,
.gallery-filter.active {
  background: #fff;
  color: #111;
}

.gallery-item {
  position: relative;
  border: 0;
  padding: 0;
  margin: 0;
  background: transparent;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
}

.gallery-item img {
  display: block;
  width: 100%;
  height: auto;
  transition: transform 0.3s ease;
}

.gallery-item:hover img {
  transform: scale(1.04);
}

.gallery-caption {
  display: block;
  padding: 8px;
  background: rgba(0,0,0,0.8);
  color: white;
  font-size: 14px;
}

.photo-lightbox {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.92);
  display: none;
  align-items: center;
  justify-content: center;
  padding: 25px;
  z-index: 9999;
}

.photo-lightbox.open {
  display: flex;
}

.lightbox-content {
  max-width: 95vw;
  max-height: 90vh;
  text-align: center;
}

.lightbox-image {
  max-width: 95vw;
  max-height: 80vh;
  object-fit: contain;
  border-radius: 6px;
}

.lightbox-title {
  color: white;
  margin-top: 12px;
  font-size: 18px;
}

.lightbox-close {
  position: absolute;
  top: 15px;
  right: 25px;
  border: 0;
  background: transparent;
  color: white;
  font-size: 42px;
  cursor: pointer;
}

`;

document.head.appendChild(galleryStyle);
