const board = document.getElementById("board");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalTitleEl = document.getElementById("modalTitle");
const modalBodyEl = document.getElementById("modalBody");
const modalClosePrimary = document.getElementById("modalClosePrimary");
const modalCloseSecondary = document.getElementById("modalCloseSecondary");

// new: grab popup image elements
const popupImageContainer = document.getElementById("popupImageContainer");
const popupImageEl = document.getElementById("popupImage");

function openModal(title, message) {
  // default text modal behavior
  modalTitleEl.textContent = title || "Message";
  modalBodyEl.textContent = message || "";
  modalBackdrop.classList.add("visible");
}

function closeModal() {
  modalBackdrop.classList.remove("visible");
}

// helper: show a fixed-position popup image
function showPopupImage(src) {
  if (!popupImageContainer || !popupImageEl) return;
  popupImageEl.src = src;
  popupImageContainer.style.display = "block";
}

// optional helper: hide image (e.g., when closing modal)
// you can call this from elsewhere if you want a way to dismiss the image
function hidePopupImage() {
  if (!popupImageContainer) return;
  popupImageContainer.style.display = "none";
}

modalBackdrop.addEventListener("click", (e) => {
  if (e.target === modalBackdrop) {
    closeModal();
  }
});

modalClosePrimary.addEventListener("click", closeModal);
modalCloseSecondary.addEventListener("click", closeModal);

board.addEventListener("click", (e) => {
  const cell = e.target.closest(".cell");
  if (!cell || cell.classList.contains("revealed")) return;

  const text = cell.getAttribute("data-text") || "";
  const type = cell.getAttribute("data-type") || "clue";

  cell.classList.remove("cell-hidden", "hidden");
  cell.classList.add("cell-revealed", "revealed");

  let content = cell.querySelector(".cell-content");
  if (!content) {
    content = document.createElement("div");
    content.className = "cell-content";
    content.dataset.type = type;
    content.textContent = text;
    cell.appendChild(content);
  }

  if (cell.dataset.popup === "true") {
    const imgSrc = cell.dataset.img; // new: optional image path
    if (imgSrc) {
      // show image and keep it on screen at fixed position
      showPopupImage(imgSrc);
    } else {
      // fallback to existing text modal
      const popupTitle = cell.dataset.popupTitle || "Hidden Message";
      const popupMessage = cell.dataset.popupMessage || "You triggered a popup tile.";
      openModal(popupTitle, popupMessage);
    }
  }
});


