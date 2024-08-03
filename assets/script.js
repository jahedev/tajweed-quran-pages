"use strict";

document.addEventListener("DOMContentLoaded", () => {
    let displaySinglePage = false;
    const leftPageTag = `<img id="left-page" class="page-image" src="" />`;
    let pageStep = 2;
    let leftPageNum = 2;
    let rightPageNum = 1;
    const totalPages = 604;

    const singlePage = document.getElementById("single-page");
    const surahSelect = document.getElementById('surah-select');
    const pageNumber = document.getElementById("page-number");

    const renderPage = (pageNum, imgElement) => {
        const pageIndex = String(pageNum).padStart(3, "0");
        imgElement.src = `./${mushaf}/tajweed-${pageIndex}.jpg`;
    };

    const queueRenderPage = () => {
        if (displaySinglePage) {
            document.getElementById("left-page")?.remove();
            const rightImage = document.getElementById("right-page");
            if (rightPageNum > 0 && rightPageNum <= totalPages) {
                renderPage(rightPageNum, rightImage);
            }
            return;
        }

        if (!document.getElementById("left-page")) {
            const imageContainer = document.getElementById("image-container");
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
    };

    const onPrevPage = () => {
        const minPage = displaySinglePage ? 1 : 2;
        if (rightPageNum <= minPage) return;

        leftPageNum -= pageStep;
        rightPageNum -= pageStep;
        pageNumber.value = rightPageNum;
        queueRenderPage();
    };

    const onNextPage = () => {
        if ((!displaySinglePage && leftPageNum >= totalPages) || rightPageNum >= totalPages) return;

        leftPageNum += pageStep;
        rightPageNum += pageStep;
        pageNumber.value = rightPageNum;
        queueRenderPage();
    };

    const pageChanged = (e) => {
        let page = parseInt(e.target.value, 10);
        if (isNaN(page) || page < 1) page = 1;
        if (page > 604) page = 604;

        setTimeout(() => {
            e.target.value = page;
            if (page % 2 === 0) --page;
            leftPageNum = page + 1;
            rightPageNum = page;
            queueRenderPage();
        }, 0);
    };

    const hideKeyboard = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            event.target.blur();
        }
    };

    const handleInputFocus = (e) => {
        e.preventDefault();
        pageNumber.focus();
        pageNumber.select();
    };

    const toggleSinglePage = () => {
        displaySinglePage = !displaySinglePage;
        if (displaySinglePage) {
            pageStep = 1;
            if (pageNumber.value % 2 === 0) --pageNumber.value;
        } else {
            pageStep = 2;
            if (rightPageNum % 2 === 0) {
                rightPageNum--;
                leftPageNum--;
            }
        }
        queueRenderPage();
    };

    const surahSelectListener = () => {
        const selectedOption = surahSelect.options[surahSelect.selectedIndex];
        const pageNumberValue = selectedOption.getAttribute('data-page-number');
        pageNumber.value = pageNumberValue;
        pageNumber.dispatchEvent(new Event("change"));
    };

    document.getElementById("prev-page").addEventListener("click", onPrevPage);
    document.getElementById("next-page").addEventListener("click", onNextPage);
    pageNumber.addEventListener("change", pageChanged);
    pageNumber.addEventListener("keydown", hideKeyboard);
    pageNumber.addEventListener("focus", handleInputFocus);
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
});
