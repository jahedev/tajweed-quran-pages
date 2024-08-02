let leftPageNum = 2;
let rightPageNum = 1;
const totalPages = 604;

const leftImage = document.getElementById('left-page');
const rightImage = document.getElementById('right-page');

function renderPage(pageNum, imgElement) {
    const pageIndex = String(pageNum).padStart(3, '0');
    imgElement.src = `./pages/tajweed-${pageIndex}.jpg`;
}

function queueRenderPage() {
    if (leftPageNum > 0 && leftPageNum <= totalPages) {
        renderPage(leftPageNum, leftImage);
    }
    if (rightPageNum > 0 && rightPageNum <= totalPages) {
        renderPage(rightPageNum, rightImage);
    }
}

function onPrevPage() {
    if (rightPageNum <= 2) {
        return;
    }
    leftPageNum -= 2;
    rightPageNum -= 2;
    queueRenderPage();
}

function onNextPage() {
    if (leftPageNum >= totalPages || rightPageNum >= totalPages) {
        return;
    }
    leftPageNum += 2;
    rightPageNum += 2;
    queueRenderPage();
}

document.getElementById('prev-page').addEventListener('click', onPrevPage);
document.getElementById('next-page').addEventListener('click', onNextPage);

document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {
        onPrevPage();
    } else if (event.key === 'ArrowRight') {
        onNextPage();
    }
});

window.addEventListener('resize', queueRenderPage);

// Initial render
queueRenderPage();
