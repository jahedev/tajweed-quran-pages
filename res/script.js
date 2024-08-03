"use strict";

let displaySinglePage = false;
let leftPageTag = `<img id="left-page" class="page-image" src="" />`;

let pageStep = 2;
let leftPageNum = 2;
let rightPageNum = 1;
const totalPages = 604;

const singlePage = document.getElementById("single-page");
const surahSelect = document.getElementById('surah-select')
const pageNumber = document.getElementById("page-number");

function renderPage(pageNum, imgElement) {
  const pageIndex = String(pageNum).padStart(3, "0");
  imgElement.src = `./pages/tajweed-${pageIndex}.jpg`;
}

function queueRenderPage() {
  // console.log({"leftpage": leftPageNum, "rightpage": rightPageNum})
  if (displaySinglePage) {
    // remove left page, leaving single right page
    document.getElementById("left-page")?.remove();

    const rightImage = document.getElementById("right-page");

    if (rightPageNum > 0 && rightPageNum <= totalPages) {
      renderPage(rightPageNum, rightImage);
    }

    return;
  }

  // restore left page if it does not exist
  if (!document.getElementById("left-page")) {
    let imageContainer = document.getElementById("image-container");
    imageContainer.innerHTML = leftPageTag + imageContainer.innerHTML;
  }

  const leftImage = document.getElementById("left-page");
  const rightImage = document.getElementById("right-page");

  if (leftPageNum > 0 && leftPageNum <= totalPages) {
    renderPage(leftPageNum, leftImage);
  }

  if (rightPageNum > 0 && rightPageNum <= totalPages) {
    renderPage(rightPageNum, rightImage);
  }
}

function onPrevPage() {
  const minPage = displaySinglePage ? 1 : 2;
  if (rightPageNum <= minPage) {
    return;
  }
  leftPageNum -= pageStep;
  rightPageNum -= pageStep;
  pageNumber.value = rightPageNum;
  queueRenderPage();
}

function onNextPage() {
  if (
    (!displaySinglePage && leftPageNum >= totalPages) ||
    rightPageNum >= totalPages
  ) {
    return;
  }
  leftPageNum += pageStep;
  rightPageNum += pageStep;
  pageNumber.value = rightPageNum;
  queueRenderPage();
}

function pageChanged(e) {
  let page = Number(e.target.value) || 1;
  if (page > 604) {
    if (displaySinglePage) page = 603;
    else page = 604;
  } else if (page < 1) page = 1;

  setTimeout(() => {
    e.target.value = page;
    if (page % 2 === 0) --page; // make it an odd number
    leftPageNum = page + 1;
    rightPageNum = page;
    queueRenderPage();
  }, 0);
}

function hideKeyboard(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    this.blur();
  }
}

function handleInputFocus(e) {
  e.preventDefault();
  pageNumber.focus();
  pageNumber.select();
}

function toggleSinglePage(event) {
  displaySinglePage = !displaySinglePage;
  if (displaySinglePage) {
    pageStep = 1;
    // left page will be hidden, so update the input box value to reflect the right page number
    if (pageNumber.value % 2 === 0) --pageNumber.value;
  } else {
    pageStep = 2;
    // rightPage should be an odd number when Mushaf is double-sided again
    if (rightPageNum % 2 === 0) {
      rightPageNum--;
      leftPageNum--;
    }
  }
  queueRenderPage();
}

function surahSelectListener() {
  var selectedOption = this.options[this.selectedIndex];
  var pageNumberValue = selectedOption.getAttribute('data-page-number');
  pageNumber.value = pageNumberValue;
  pageNumber.dispatchEvent(new Event("change"))
}

document.getElementById("prev-page").addEventListener("click", onPrevPage);
document.getElementById("next-page").addEventListener("click", onNextPage);
pageNumber.addEventListener("change", pageChanged);
pageNumber.addEventListener("keydown", hideKeyboard);
pageNumber.addEventListener(`focus`, handleInputFocus);
pageNumber.addEventListener("touchend", handleInputFocus, { passive: false });


singlePage.addEventListener("click", toggleSinglePage);
surahSelect.addEventListener("change", surahSelectListener);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    onPrevPage();
  } else if (event.key === "ArrowRight") {
    onNextPage();
  }
});

window.addEventListener("resize", queueRenderPage);

// Initial render
queueRenderPage();
