import data from "./data.js";

function renderDomElm(data) {
  const masonryElm = document.querySelector(".masonry");
  for (let el of data) {
    const masonryItemElm = `
    <div class="masonry-item">
      <img
        src=${el.img}
        alt="${el.auth}"
        class="masonry-content"
      />
      <a class="title" href="${el.link}">${el.title.toUpperCase()}</a>
      <div class="masonry-info">
        <a class="auth" target='_blank' href="${
          el.authGithub
        }"><i class="fab fa-github"></i> ${el.auth.toLowerCase()}</a>
        ${el.tech.map((el) => `<span class="${el}">${el}</span>`)}
      </div>
  </div>
    `;
    masonryElm.insertAdjacentHTML("afterbegin", masonryItemElm);
  }
}

function resizeMasonryItem(item) {
  const grid = document.getElementsByClassName("masonry")[0];
  const rowGap = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
  );
  const rowHeight = parseInt(
    window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
  );
  const rowSpan = Math.ceil(
    (item.querySelector(".masonry-content").getBoundingClientRect().height +
      rowGap) /
      (rowHeight + rowGap)
  );
  item.style.gridRowEnd = "span " + rowSpan;
  item.querySelector(".masonry-content").style.height = rowSpan * 10 + "px";
}
(function waitForImages(data) {
  renderDomElm(data);
  const allItems = document.getElementsByClassName("masonry-item");

  for (let i = 0; i < allItems.length; i++) {
    imagesLoaded(allItems[i], function (instance) {
      const item = instance.elements[0];
      resizeMasonryItem(item);
    });
  }
})(data);

function resizeAllMasonryItems() {
  const allItems = document.getElementsByClassName("masonry-item");

  for (let i = 0; i > allItems.length; i++) {
    resizeMasonryItem(allItems[i]);
  }
}

const masonryEvents = ["load", "resize"];
masonryEvents.forEach(function (event) {
  window.addEventListener(event, resizeAllMasonryItems);
});
