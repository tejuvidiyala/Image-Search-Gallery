const ACCESS_KEY = "Dry2BKjgQJ2a0DAc8viA3yUOEly11JjO6A2pMfnVu3o";

const input = document.getElementById("searchInput");
const container = document.getElementById("imageContainer");
const skeleton = document.getElementById("skeleton");
const errorMsg = document.getElementById("error");
const historyDiv = document.getElementById("history");
const themeToggle = document.getElementById("themeToggle");
const orientationSelect = document.getElementById("orientation");
const colorSelect = document.getElementById("color");

const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeModal = document.getElementById("closeModal");

let page = 1;
let query = "";
let loading = false;

/* THEME */
themeToggle.onclick = () => {
  document.body.classList.toggle("dark");
};

/* SEARCH */
input.addEventListener("keydown", e => {
  if (e.key === "Enter") startSearch();
});

function startSearch() {
  query = input.value.trim();
  if (!query) return;

  page = 1;
  container.innerHTML = "";
  errorMsg.textContent = "";
  saveHistory(query);
  fetchImages();
}

/* FETCH IMAGES */
function fetchImages() {
  if (loading) return;
  loading = true;
  showSkeleton();

  let url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
    query
  )}&page=${page}&per_page=12`;

  if (orientationSelect.value) url += `&orientation=${orientationSelect.value}`;
  if (colorSelect.value) url += `&color=${colorSelect.value}`;

  fetch(url, {
    headers: { Authorization: `Client-ID ${ACCESS_KEY}` }
  })
    .then(res => res.json())
    .then(data => {
      hideSkeleton();
      loading = false;

      data.results.forEach(photo => {
        const card = document.createElement("div");
        card.className = "card";

        const img = document.createElement("img");
        img.src = photo.urls.small;
        img.alt = "Unsplash image";
        img.onclick = () => openModal(photo.urls.full);

        card.appendChild(img);
        container.appendChild(card);
      });
    })
    .catch(() => {
      hideSkeleton();
      loading = false;
      errorMsg.textContent = "Error fetching images";
    });
}

/* INFINITE SCROLL */
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    page++;
    fetchImages();
  }
});

/* MODAL */
function openModal(src) {
  const img = new Image();
  img.src = src;

  img.onload = () => {
    modalImg.src = src;
    modal.classList.remove("hidden");
    document.body.classList.add("modal-open");
  };
}

function closeModalFn() {
  modal.classList.add("hidden");
  modalImg.src = "";
  document.body.classList.remove("modal-open");
}

closeModal.onclick = closeModalFn;

modal.onclick = e => {
  if (e.target === modal) closeModalFn();
};

document.addEventListener("keydown", e => {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModalFn();
  }
});

/* HISTORY */
function saveHistory(term) {
  let h = JSON.parse(localStorage.getItem("history")) || [];
  if (!h.includes(term)) h.unshift(term);
  localStorage.setItem("history", JSON.stringify(h.slice(0, 5)));
  showHistory();
}

function showHistory() {
  historyDiv.innerHTML = "";
  let h = JSON.parse(localStorage.getItem("history")) || [];
  h.forEach(t => {
    const s = document.createElement("span");
    s.textContent = t;
    s.onclick = () => {
      input.value = t;
      startSearch();
    };
    historyDiv.appendChild(s);
  });
}

showHistory();

/* SKELETON */
function showSkeleton() {
  skeleton.innerHTML = "";
  skeleton.classList.remove("hidden");
  for (let i = 0; i < 12; i++) {
    const d = document.createElement("div");
    d.className = "skel";
    skeleton.appendChild(d);
  }
}

function hideSkeleton() {
  skeleton.classList.add("hidden");
}
