// ====================================================
// GUNS N' ROSES - JS UNIFICADO PARA TODO EL SITIO
// Incluye: nav, dropdowns, sliders, modales, filtros, tickets, contacto, tienda, galería discografía, suscripción footer
// ====================================================

document.addEventListener("DOMContentLoaded", function () {

  // --- RUTA RELATIVA DINÁMICA SEGÚN LA CARPETA DEL HTML ---
  function getRelativePrefix() {
    // Obtiene el path sin el archivo final
    let path = window.location.pathname;
    // Ejemplo: /biografia/biografia.html -> ["", "biografia", "biografia.html"]
    let parts = path.split("/");
    // Si termina en / (ej: /store/), remueve el último elemento vacío
    if (parts[parts.length - 1] === "") parts.pop();
    // Si está en index.html (en raíz): ["", "index.html"] => ningún ../
    // Si está en /biografia/biografia.html: ["", "biografia", "biografia.html"] => 1 nivel: ../
    // Si está en /discografia/discografia-videos.html: ["", "discografia", "discografia-videos.html"] => 1 nivel: ../
    // Si está en /store/store.html: ["", "store", "store.html"] => 1 nivel: ../
    // Si pusieras más niveles, suma más ../
    let depth = parts.length - 2; // -2: una para "" root y una para el archivo
    if (depth <= 0) return "";
    return "../".repeat(depth);
  }
  const rel = getRelativePrefix();

  // -- Menú Hamburguesa y Navbar (general) --
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("nav-menu");
  function handleNavDisplay() {
    if (window.innerWidth < 920) {
      if (burger) burger.style.display = "block";
      if (navMenu) {
        navMenu.classList.remove("show");
        navMenu.style.display = "none";
      }
    } else {
      if (burger) burger.style.display = "none";
      if (navMenu) {
        navMenu.classList.add("show");
        navMenu.style.display = "flex";
      }
    }
  }
  handleNavDisplay();
  window.addEventListener("resize", handleNavDisplay);

  if (burger && navMenu) {
    burger.addEventListener("click", function () {
      navMenu.classList.toggle("show");
      if (window.innerWidth < 920) {
        navMenu.style.display = navMenu.classList.contains("show") ? "block" : "none";
      }
    });
    navMenu.querySelectorAll('.dropdown').forEach(function (dropdown) {
      dropdown.addEventListener('click', function (e) {
        if (window.innerWidth < 920) {
          dropdown.classList.toggle('open');
        }
      });
    });
  }
  document.querySelectorAll('.dropdown .dropbtn').forEach(function (btn) {
    let closeTimeout;
    const dropdown = btn.parentElement;
    btn.addEventListener('click', function (e) {
      if (window.innerWidth >= 920) {
        e.preventDefault();
        document.querySelectorAll('.dropdown').forEach(d => {
          if (d !== dropdown) d.classList.remove('open');
        });
        dropdown.classList.toggle('open');
      }
    });
    dropdown.addEventListener('mouseenter', function () {
      if (window.innerWidth >= 920) {
        clearTimeout(closeTimeout);
        dropdown.classList.add('open');
      }
    });
    dropdown.addEventListener('mouseleave', function () {
      if (window.innerWidth >= 920) {
        closeTimeout = setTimeout(() => {
          dropdown.classList.remove('open');
        }, 400);
      }
    });
  });
  document.addEventListener('click', function (e) {
    if (window.innerWidth >= 920) {
      document.querySelectorAll('.dropdown').forEach(function (drop) {
        if (!drop.contains(e.target)) drop.classList.remove('open');
      });
    }
  });

  // INDEX.HTML: GALERÍA DE IMÁGENES PRINCIPAL
  // Ahora funciona desde cualquier carpeta
  const galleryImages = [
    rel + "discografia/img/new_orleans_2019/New_Orleans_2019.jpg",
    rel + "discografia/img/new_orleans_2019/New_Orleans_2_2019.jpg",
    rel + "discografia/img/new_orleans_2019/New_Orleans_3_2019.jpg",
    rel + "discografia/img/new_orleans_2019/New_Orleans_4_2019.jpg",
    rel + "discografia/img/salt_lake_2019/Salt_Lake_1_2019.jpg",
    rel + "discografia/img/salt_lake_2019/Salt_Lake_2_2019.jpg",
    rel + "discografia/img/salt_lake_2019/Salt_Lake_3_2019.jpg",
    rel + "discografia/img/salt_lake_2019/Salt_Lake_4_2019.jpg",
  ];
  let galleryIndex = 0;
  const galleryImage = document.getElementById("galleryImage");
  const prevGalleryBtn = document.getElementById("prevGalleryBtn");
  const nextGalleryBtn = document.getElementById("nextGalleryBtn");
  function updateGallery() {
    if (galleryImage) galleryImage.src = galleryImages[galleryIndex];
  }
  if (prevGalleryBtn && nextGalleryBtn && galleryImage) {
    prevGalleryBtn.addEventListener("click", function () {
      galleryIndex = (galleryIndex - 1 + galleryImages.length) % galleryImages.length;
      updateGallery();
    });
    nextGalleryBtn.addEventListener("click", function () {
      galleryIndex = (galleryIndex + 1) % galleryImages.length;
      updateGallery();
    });
  }
  updateGallery();

  // INDEX.HTML: SLIDERS DE PRODUCTOS (ropa, música, extras)
  const productData = {
    clothing: [
      { name: "Pantalón Use Your Illusion", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens-sweatpants.png" },
      { name: "Buzo Tie Dye Cruz", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_buzo_blanco.png" },
      { name: "Buzo White Rose", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_buzo_negro.png" },
      { name: "Buzo Clásico Logo Bordó", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_buzo_rojo.png" },
      { name: "Campera Varsity", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_campera_negra.png" },
      { name: "Remera Slash Cards", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_card_remera.png" },
      { name: "Boxer Estampado Cruz", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_GNR_boxer.png" },
      { name: "Buzo 1991-1993 Tour Fechas", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_gnr_buzo_negro.png" },
      { name: "Camisa de Franela Azul", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_gnr_camisa.png" },
      { name: "Campera Matelaseada Cruz", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_gnr_campera.png" },
      { name: "Buzo con Cierre Mano Roja", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_gnr_hoodie_front_new.png" },
      { name: "Remera Love Her", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_gnr_loveher_remera.png" },
      { name: "Chomba Logo Clásico", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_gnr_polo_negro.png" },
      { name: "Remera Radiate", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_gnr_remera_blanca.png" },
      { name: "Shorts Black White Rose", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_gnr_shorts_negro.png" },
      { name: "Pantalón GN'R 1987 Black Tie Dye", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_gnr_sweatpants_negro.png" },
      { name: "Remera Halloween Guns N' Roses", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_halloween_remera.png" },
      { name: "Buzo Blanco Skull Sweatshirt", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_hoodie_blanco.png" },
      { name: "Chomba Logo Calavera", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_polo_black_front.png" },
      { name: "Remera Appetite for Destruction", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_remera_cuchillos.png" },
      { name: "Shorts Appetite Patch", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_shorts.png" },
      { name: "Shorts Calavera Negros", price: "$25,000.00", image: rel + "store/img/ropa/hombres/mens_shorts_calavera.png" }
    ],
    music: [
      { name: "Appetite for Destruction", price: "$120,000.00", image: rel + "store/img/musica/boxsets/GNR_BOX_Appetite_For_Destruction.jpg" },
      { name: "USE YOUR ILLUSION 7CD", price: "$312,000.00", image: rel + "store/img/musica/boxsets/GNR_BOX_USE_YOUR_ILLUSION_I_&_II_Super_Deluxe.jpg" },
      { name: "USE YOUR ILLUSION 12LP", price: "$600,000.00", image: rel + "store/img/musica/boxsets/GNR_BOX_USE_YOUR_ILLUSION_I_&_II.jpg" },
      { name: "Appetite For Destruction", price: "$22,800.00", image: rel + "store/img/musica/cds/Appetite_For_Destruction.jpg" },
      { name: "Greatest Hits", price: "$16,800.00", image: rel + "store/img/musica/cds/GreatestHits.jpg" },
      { name: "Lies CD", price: "$20,400.00", image: rel + "store/img/musica/cds/LiesCd.jpg" },
      { name: "The Spaghetti Incident", price: "$10,800.00", image: rel + "store/img/musica/cds/The_Spaghetti_Incident.jpg" }
    ],
    extras: [
      { name: "Logo Tote Bag", price: "$30,000.00", image: rel + "store/img/accesorios/gnr_bag_front.jpg" },
      { name: "Logo Pool Float", price: "$54,000.00", image: rel + "store/img/accesorios/GNRBulletLogoPoolFloat.jpg" },
      { name: "Hands Snapback Hat", price: "$36,000.00", image: rel + "store/img/accesorios/la_hat_front.jpg" },
      { name: "Logo Flip Flops", price: "$36,000.00", image: rel + "store/img/accesorios/PRODUCT_GNR_FDAY_25_CC_DESIGNNAME_FLIPFLOPS-2.jpg" }
    ]
  };

  function createSlider(category, products) {
    const slider = document.querySelector(`.product-slider[data-category="${category}"]`);
    if (!slider) return;
    const track = slider.querySelector('.slider-track');
    if (!track) return;
    track.innerHTML = '';
    products.forEach(product => {
      const item = document.createElement('div');
      item.className = 'slider-item';
      item.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="item-name">${product.name}</div>
        <div class="item-price">${product.price}</div>
      `;
      track.appendChild(item);
    });

    // --- Comportamiento dependiente del tamaño de pantalla ---
    if (window.innerWidth >= 920) {
      setupDesktopSlider(slider, track, products.length);
    } else {
      setupMobileSlider(track);
    }
  }

  function setupDesktopSlider(slider, track, itemCount) {
    let scrollPos = 0;
    let autoScroll;
    const item = track.querySelector('.slider-item');
    if (!item) return;
    const itemWidth = item.offsetWidth + parseFloat(getComputedStyle(track).gap || 0);
    const visibleCount = 4;

    const btnLeft = slider.querySelector('.slider-btn-left');
    const btnRight = slider.querySelector('.slider-btn-right');

    function scrollByItems(n) {
      scrollPos += n * itemWidth;
      if (scrollPos < 0) scrollPos = 0;
      if (scrollPos > (itemCount - visibleCount) * itemWidth) scrollPos = (itemCount - visibleCount) * itemWidth;
      track.scrollTo({ left: scrollPos, behavior: 'smooth' });
    }

    if (btnLeft) {
      btnLeft.onclick = e => {
        e.preventDefault();
        scrollByItems(-1);
      };
    }
    if (btnRight) {
      btnRight.onclick = e => {
        e.preventDefault();
        scrollByItems(1);
      };
    }

    function startAutoScroll() {
      stopAutoScroll();
      autoScroll = setInterval(() => {
        if (scrollPos < (itemCount - visibleCount) * itemWidth) {
          scrollPos += 0.5;
          track.scrollLeft = scrollPos;
        } else {
          scrollPos = 0;
          track.scrollLeft = 0;
        }
      }, 16);
    }
    function stopAutoScroll() {
      if (autoScroll) clearInterval(autoScroll);
    }

    track.addEventListener('mouseenter', stopAutoScroll);
    track.addEventListener('mouseleave', startAutoScroll);
    [btnLeft, btnRight].forEach(btn => btn && btn.addEventListener('click', () => {
      stopAutoScroll();
      setTimeout(startAutoScroll, 3000);
    }));

    scrollPos = 0;
    track.scrollLeft = 0;
    startAutoScroll();
    window.addEventListener('resize', () => {
      stopAutoScroll();
      setTimeout(() => createSlider(slider.dataset.category, productData[slider.dataset.category]), 100);
    });
  }

  function setupMobileSlider(track) {
    track.scrollLeft = 0;
  }

  // Renderizar sliders al cargar o al cambiar tamaño
  Object.entries(productData).forEach(([category, products]) => createSlider(category, products));
  window.addEventListener('resize', () => {
    Object.entries(productData).forEach(([category, products]) => createSlider(category, products));
  });

  // INDEX.HTML: MODAL DE TOURS
  const toursModal = document.getElementById('tours-modal');
  const closeBtn = document.getElementById('close-tours-modal');
  if (toursModal) toursModal.style.display = 'flex';
  if (closeBtn && toursModal) {
    closeBtn.addEventListener('click', function () {
      toursModal.style.display = 'none';
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === "Escape" && toursModal && toursModal.style.display !== 'none') {
      toursModal.style.display = 'none';
    }
  });

  // INTEGRANTES.HTML: FILTRO POR AÑO DE INTEGRANTES
  const yearRange = document.getElementById('yearRange');
  const selectedYearSpan = document.getElementById('selectedYear');
  const members = document.querySelectorAll('.integrantes-member-info, .member-info');
  if (yearRange && selectedYearSpan && members.length > 0) {
    function parseYears(text) {
      const ranges = text.toLowerCase().replace(/\s+/g, '').split(',');
      return ranges.map(range => {
        let [start, end] = range.split('-');
        start = parseInt(start) || 0;
        if (end === 'presente') end = new Date().getFullYear();
        else end = parseInt(end) || start;
        return { start, end };
      });
    }
    function isYearInRanges(year, ranges) {
      return ranges.some(({ start, end }) => year >= start && year <= end);
    }
    function filterMembers(year) {
      members.forEach(member => {
        const activeText = member.querySelector('p').textContent;
        const yearsString = activeText.replace('Activo:', '').trim();
        const yearRanges = parseYears(yearsString);
        member.style.display = isYearInRanges(year, yearRanges) ? '' : 'none';
      });
    }
    yearRange.addEventListener('input', e => {
      const year = parseInt(e.target.value);
      selectedYearSpan.textContent = year;
      filterMembers(year);
    });
    filterMembers(parseInt(yearRange.value));
  }

  // TOUR.HTML/INDEX.HTML: BOTONES DE COMPRA DE TICKETS
  document.querySelectorAll('.tours-tickets-button, .tickets-button').forEach(button => {
    button.addEventListener('click', function (event) {
      if (this.classList.contains('disabled') || !this.href || this.getAttribute('href') === "#" || this.dataset.url === "") {
        event.preventDefault();
        alert('Tickets aún no disponibles o URL no configurada para este evento.');
      } else if (this.dataset.url) {
        window.location.href = this.dataset.url;
      }
    });
  });

  // FOOTER/CONTACTOS (TODAS LAS PÁGINAS): FORMULARIO DE CONTACTO
  const form = document.getElementById('contactForm');
  const successMsg = document.getElementById('formSuccess');
  if (form && successMsg) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      successMsg.textContent = "¡Mensaje enviado! Gracias por contactarte 🤘";
      form.reset();
      setTimeout(() => { successMsg.textContent = ""; }, 3500);
    });
  }

  // FOOTER: FORMULARIO DE SUBSCRIPCIÓN
  const footerSubscribeForm = document.getElementById('footerSubscribeForm');
  const footerSubscribeSuccess = document.getElementById('footerSubscribeSuccess');
  if (footerSubscribeForm && footerSubscribeSuccess) {
    footerSubscribeForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const email = footerSubscribeForm.elements['footerEmail'].value.trim();
      if (!email) {
        footerSubscribeSuccess.textContent = "Por favor, ingresa un email válido.";
        return;
      }
      footerSubscribeSuccess.textContent = "¡Gracias por subscribirte!";
      footerSubscribeForm.reset();
      setTimeout(() => { footerSubscribeSuccess.textContent = ""; }, 3500);
    });
  }

  // STORE.HTML: FILTRO DE PRODUCTOS DE TIENDA
  const productGrid = document.getElementById('product-grid');
  if (productGrid) {
    const products = Array.from(productGrid.querySelectorAll('.product-item'));
    document.querySelectorAll('nav .dropdown-content a, nav > ul > li > a[data-filter], nav > ul > li > button[data-filter]').forEach(link => {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        const filter = this.dataset.filter;
        const subtitle = document.getElementById('subtitle');
        if (subtitle) subtitle.textContent = this.textContent;
        filterProducts(filter);
      });
    });
    function filterProducts(filter) {
      products.forEach(prod => {
        if (!filter || filter === 'all') {
          prod.style.display = '';
        } else if (filter === 'clothes') {
          prod.style.display = (prod.classList.contains('mens') || prod.classList.contains('womens') || prod.classList.contains('kids')) ? '' : 'none';
        } else if (filter === 'music') {
          prod.style.display = (prod.classList.contains('cds') || prod.classList.contains('vinyls') || prod.classList.contains('boxsets')) ? '' : 'none';
        } else {
          prod.style.display = prod.classList.contains(filter) ? '' : 'none';
        }
      });
    }
  }

  // DISCOGRAFIA: GALERÍA DE FOTOS Y VIDEOS CON VISOR Y SLIDER
  // (Soporta: discografia.html, discografia-fotos.html, discografia-videos.html)
  function setupGallery(items, modalId, modalTitleId, modalMediaId) {
    const modal = document.getElementById(modalId);
    const modalTitle = document.getElementById(modalTitleId);
    const modalMedia = document.getElementById(modalMediaId);
    const closeBtn = modal.querySelector(".media-lightbox-close");
    const prevBtn = modal.querySelector(".media-lightbox-prev");
    const nextBtn = modal.querySelector(".media-lightbox-next");

    if (!items.length || !modal) return;

    let currentIndex = -1;

    function openModal(index) {
      currentIndex = index;
      showMedia();
      modal.hidden = false;
      document.body.style.overflow = "hidden"; // Prevent background scroll
      modal.focus(); // For keyboard nav
    }

    function closeModal() {
      modal.hidden = true;
      modalMedia.innerHTML = "";
      document.body.style.overflow = "";
    }

    function showMedia() {
      const item = items[currentIndex];
      if (!item) return;

      const type = item.dataset.type;
      const src = item.dataset.src;
      const title = item.dataset.title || "";

      modalTitle.textContent = title;
      modalMedia.innerHTML = ""; // Clear previous

      if (type === "image") {
        const img = document.createElement("img");
        img.src = src;
        img.alt = title;
        img.style.maxWidth = "90vw";
        img.style.maxHeight = "70vh";
        modalMedia.appendChild(img);
      } else if (type === "video") {
        // Assume YouTube embed
        const iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.width = "900";
        iframe.height = "505";
        iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        iframe.allowFullscreen = true;
        iframe.frameBorder = "0";
        iframe.style.maxWidth = "90vw";
        iframe.style.maxHeight = "70vh";
        modalMedia.appendChild(iframe);
      }
    }

    function prevMedia() {
      if (items.length === 0) return;
      currentIndex = (currentIndex - 1 + items.length) % items.length;
      showMedia();
    }

    function nextMedia() {
      if (items.length === 0) return;
      currentIndex = (currentIndex + 1) % items.length;
      showMedia();
    }

    // Event listeners
    items.forEach((item, idx) => {
      item.addEventListener("click", () => openModal(idx));
      item.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          openModal(idx);
        }
      });
    });

    closeBtn.addEventListener("click", closeModal);
    prevBtn.addEventListener("click", prevMedia);
    nextBtn.addEventListener("click", nextMedia);

    // Keyboard navigation
    modal.addEventListener("keydown", (e) => {
      if (modal.hidden) return;
      if (e.key === "ArrowLeft") prevMedia();
      if (e.key === "ArrowRight") nextMedia();
      if (e.key === "Escape") closeModal();
    });

    // Trap focus inside modal for accessibility
    modal.addEventListener("focusin", function (e) {
      if (modal.hidden) return;
      const focusable = modal.querySelectorAll("button, [tabindex]:not([tabindex='-1'])");
      if (focusable.length === 0) return;
      if (!modal.contains(document.activeElement)) {
        focusable[0].focus();
      }
    });

    // Close modal when clicking outside the media area
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }

  // For discografia-fotos.html
  ["pictures-gallery-saltlake", "pictures-gallery-neworleans"].forEach(galleryId => {
    const gallery = document.getElementById(galleryId);
    if (gallery) {
      const items = Array.from(gallery.querySelectorAll(".media-thumb"));
      setupGallery(items, "pictures-lightbox", "pictures-lightbox-title", "pictures-lightbox-media");
    }
  });

  // For discografia-videos.html
  const videosGallery = document.getElementById("videos-gallery");
  if (videosGallery) {
    const items = Array.from(videosGallery.querySelectorAll(".media-thumb"));
    setupGallery(items, "videos-lightbox", "videos-lightbox-title", "videos-lightbox-media");
  }

  // For discografia.html - unified modal for both
  const imagesGallery = document.getElementById("discografia-images-gallery");
  const videosGallery2 = document.getElementById("discografia-videos-gallery");
  const mediaLightbox = document.getElementById("media-lightbox");
  if (imagesGallery && videosGallery2 && mediaLightbox) {
    // Merge node lists for unified navigation
    const items = [
      ...Array.from(imagesGallery.querySelectorAll(".media-thumb")),
      ...Array.from(videosGallery2.querySelectorAll(".media-thumb"))
    ];
    setupGallery(items, "media-lightbox", "media-lightbox-title", "media-lightbox-media");
  }
});