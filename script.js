const portfolioCards = document.querySelectorAll(".portfolio-card");
const modal = document.querySelector(".case-modal");
const modalDialog = document.querySelector(".case-modal__dialog");
const modalImage = document.querySelector(".case-modal__media img");
const modalTitle = document.querySelector("#case-modal-title");
const modalType = document.querySelector(".case-modal__type");
const modalDescription = document.querySelector(".case-modal__description");
const modalWork = document.querySelector(".case-modal__work");
const modalReview = document.querySelector(".case-modal__review");
const modalReviewProject = document.querySelector(".case-modal__review-project");
const modalReviewText = document.querySelector(".case-modal__review p");
const modalReviewFooter = document.querySelector(".case-modal__review footer");
const modalCloseButtons = document.querySelectorAll(".case-modal__close, .case-modal__backdrop");

let lastFocusedElement = null;

function openCaseModal(card) {
  lastFocusedElement = document.activeElement;

  const image = card.querySelector("img");
  const workItems = (card.dataset.caseWork || "")
    .split("|")
    .map((item) => item.trim())
    .filter(Boolean);

  modalImage.src = image.currentSrc || image.src;
  modalImage.alt = image.alt;
  modalTitle.textContent = card.dataset.caseTitle || card.querySelector("strong")?.textContent || "";
  modalType.textContent = card.dataset.caseType || card.querySelector("small")?.textContent || "";
  modalDescription.textContent = card.dataset.caseDescription || "";
  modalWork.replaceChildren(...workItems.map((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    return li;
  }));

  const hasReview = Boolean(card.dataset.reviewText);
  modalReview.hidden = !hasReview;
  if (hasReview) {
    modalReviewProject.textContent = card.dataset.reviewProject || "Отзыв";
    modalReviewText.textContent = card.dataset.reviewText;
    modalReviewFooter.textContent = `${card.dataset.reviewAuthor || "Клиент"} · отзыв с KWORK`;
  }

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  modalDialog.focus();
}

function closeCaseModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  modalImage.removeAttribute("src");

  if (lastFocusedElement) {
    lastFocusedElement.focus();
  }
}

portfolioCards.forEach((card) => {
  card.addEventListener("click", (event) => {
    event.preventDefault();
    openCaseModal(card);
  });
});

modalCloseButtons.forEach((button) => {
  button.addEventListener("click", closeCaseModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("is-open")) {
    closeCaseModal();
  }
});
