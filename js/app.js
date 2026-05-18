(function () {
  const galleryEl = document.getElementById("gallery");
  const videoListEl = document.getElementById("video-list");
  const photosEmpty = document.getElementById("photos-empty");
  const videosEmpty = document.getElementById("videos-empty");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  let photoPaths = [];
  let lightboxIndex = 0;

  function encodePath(path) {
    return path
      .split("/")
      .map((part) => encodeURIComponent(part))
      .join("/");
  }

  function setupTabs() {
    document.querySelectorAll(".tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        const panelId = tab.dataset.panel;
        document.querySelectorAll(".tab").forEach((t) => t.classList.remove("active"));
        document.querySelectorAll(".panel").forEach((p) => {
          p.classList.remove("active");
          p.hidden = true;
        });
        tab.classList.add("active");
        const panel = document.getElementById("panel-" + panelId);
        panel.classList.add("active");
        panel.hidden = false;
      });
    });
  }

  function renderPhotos(paths) {
    galleryEl.innerHTML = "";
    if (!paths.length) {
      photosEmpty.classList.remove("hidden");
      return;
    }
    photosEmpty.classList.add("hidden");
    paths.forEach((path, index) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "gallery-item";
      btn.setAttribute("role", "listitem");
      btn.setAttribute("aria-label", "View photo " + (index + 1));
      const img = document.createElement("img");
      img.src = encodePath(path);
      img.alt = "Mural work " + (index + 1);
      img.loading = index < 6 ? "eager" : "lazy";
      btn.appendChild(img);
      btn.addEventListener("click", () => openLightbox(index));
      galleryEl.appendChild(btn);
    });
  }

  function openLightbox(index) {
    lightboxIndex = index;
    lightboxImg.src = encodePath(photoPaths[index]);
    lightboxImg.alt = "Mural work " + (index + 1);
    lightbox.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function stepLightbox(delta) {
    lightboxIndex = (lightboxIndex + delta + photoPaths.length) % photoPaths.length;
    lightboxImg.src = encodePath(photoPaths[lightboxIndex]);
  }

  function setupLightbox() {
    lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => stepLightbox(-1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => stepLightbox(1));
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("hidden")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
    });
  }

  function normalizeInstaUrl(url) {
    try {
      const u = new URL(url);
      if (!u.hostname.includes("instagram.com")) return null;
      let path = u.pathname.replace(/\/$/, "");
      if (!path.startsWith("/")) path = "/" + path;
      return "https://www.instagram.com" + path + "/";
    } catch {
      return null;
    }
  }

  function renderVideos(videos) {
    videoListEl.innerHTML = "";
    const valid = videos.filter((v) => v.url && !v.url.includes("REPLACE_ME"));
    if (!valid.length) {
      videosEmpty.classList.remove("hidden");
      return;
    }
    videosEmpty.classList.add("hidden");
    valid.forEach((item) => {
      const card = document.createElement("article");
      card.className = "video-card";
      const title = document.createElement("h3");
      title.textContent = item.title || "Watch on Instagram";
      card.appendChild(title);

      const instaUrl = normalizeInstaUrl(item.url);
      if (!instaUrl) return;

      const watch = document.createElement("a");
      watch.className = "watch";
      watch.href = instaUrl;
      watch.target = "_blank";
      watch.rel = "noopener noreferrer";
      watch.textContent = "Open on Instagram →";
      card.appendChild(watch);

      const embedWrap = document.createElement("div");
      embedWrap.className = "video-embed";
      const permalink = instaUrl.replace(/\/$/, "") + "/";
      embedWrap.innerHTML =
        '<blockquote class="instagram-media" data-instgrm-permalink="' +
        permalink +
        '" data-instgrm-version="14" style="max-width:100%;min-width:0;width:100%;"></blockquote>';
      card.appendChild(embedWrap);
      videoListEl.appendChild(card);
    });

    if (window.instgrm && window.instgrm.Embeds) {
      window.instgrm.Embeds.process();
    }
  }

  function applyConfig(config) {
    if (config.artistName) {
      document.getElementById("artist-name").textContent = config.artistName;
      document.title = config.artistName + " | Murals";
    }
    if (config.tagline) document.getElementById("tagline").textContent = config.tagline;
    if (config.bio) document.getElementById("bio").textContent = config.bio;

    const linksEl = document.getElementById("social-links");
    linksEl.innerHTML = "";

    if (config.instagram) {
      const a = document.createElement("a");
      a.className = "link-btn primary";
      a.href = config.instagram;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "Instagram";
      linksEl.appendChild(a);
      const footer = document.getElementById("footer-insta");
      footer.href = config.instagram;
      const handle = config.instagram.replace(/\/$/, "").split("/").pop();
      footer.textContent = handle ? "Follow @" + handle : "Follow on Instagram";
    }

    if (config.whatsapp) {
      const a = document.createElement("a");
      a.className = "link-btn";
      a.href = config.whatsapp;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = "WhatsApp";
      linksEl.appendChild(a);
    }

    if (config.email) {
      const a = document.createElement("a");
      a.className = "link-btn";
      a.href = "mailto:" + config.email;
      a.textContent = "Email";
      linksEl.appendChild(a);
    }
  }

  async function init() {
    setupTabs();
    setupLightbox();

    try {
      const [config, gallery, videos] = await Promise.all([
        fetch("config.json").then((r) => r.json()),
        fetch("gallery.json").then((r) => r.json()),
        fetch("videos.json").then((r) => r.json()),
      ]);
      applyConfig(config);
      photoPaths = gallery;
      renderPhotos(photoPaths);
      renderVideos(Array.isArray(videos) ? videos : []);
    } catch (err) {
      console.error(err);
      photosEmpty.classList.remove("hidden");
    }
  }

  init();
})();
