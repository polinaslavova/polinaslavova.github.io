//this is the code for opening and close the content
function toggleContainer(containerId, containerName) {
  // Get all containers
  var containers = document.querySelectorAll(".descriptive");

  // Loop through all containers to hide them
  containers.forEach(function (container) {
    if (container.id === containerId) {
      // Show the clicked container and hide others
      container.classList.add("active");
    } else {
      // Ensure others are hidden
      container.classList.remove("active");
    }
  });

  // Get the static part of the path from the data attribute
  var pathDiv = document.getElementById("path");
  var staticPath = pathDiv.getAttribute("data-static-path");

  // Update the path with the static part and the dynamic part (container name)
  pathDiv.innerHTML = `${staticPath}/${containerName}<br>
                        <hr style="border: .5px solid rgb(0, 92, 0); left:0px;">`;
}

let slideIndex = 1;
let slideIndexProcess = 1;

window.onload = function () {
  showSlides(slideIndex); // Ensure first slide shows when page loads
  showSlidesProcess(slideIndexProcess); // Show first process slide
};

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

function plusSlidesProcess(n) {
  showSlidesProcess((slideIndexProcess += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function currentSlideProcess(n) {
  showSlidesProcess((slideIndexProcess = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (slides.length > 0) slides[slideIndex - 1].style.display = "block";
}

function showSlidesProcess(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides-process");
  if (n > slides.length) {
    slideIndexProcess = 1;
  }
  if (n < 1) {
    slideIndexProcess = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  if (slides.length > 0) slides[slideIndexProcess - 1].style.display = "block";
}

// 動態分配 .descriptive 區塊高度，讓所有 section title 都在，只有 active 的內容區有高度
function adjustDescriptiveHeights() {
  // 82vh 可用高度
  const vh = window.innerHeight * 0.82;
  const tags = document.querySelectorAll(".detailcontainer .tags");
  let titlesHeight = 0;
  tags.forEach((tag) => {
    // 只加 title 部分高度（不加內容區）
    const firstDiv = tag.querySelector("div");
    if (firstDiv) {
      // getBoundingClientRect 會包含 padding/border
      titlesHeight += firstDiv.getBoundingClientRect().height;
    }
    // 加上 <hr> 的高度（約 6px，根據 CSS margin）
    titlesHeight += 6;
  });
  // 可用內容高度 = 85vh - 所有 title 區高度
  const contentHeight = Math.max(vh - titlesHeight, 80); // 最小 80px，避免負值
  const descriptives = document.querySelectorAll(".descriptive");
  descriptives.forEach(function (desc) {
    if (desc.classList.contains("active")) {
      desc.style.maxHeight = contentHeight + "px";
      desc.style.height = "auto";
      desc.style.overflow = "auto";
      desc.style.visibility = "visible";
      desc.style.paddingBottom = "5px";
      // 同步調整 slideshow-container 高度
      const slideshow = desc.querySelector(".slideshow-container");
      if (slideshow) {
        slideshow.style.height = contentHeight - 10 + "px";
        slideshow.style.maxHeight = contentHeight - 10 + "px";
        // 修正所有 slide 內容高度
        const slides = slideshow.querySelectorAll(
          ".mySlides, .mySlides-process"
        );
        slides.forEach(function (slide) {
          slide.style.height = "100%";
          slide.style.maxHeight = "100%";
        });
        // 修正圖片高度
        const imgs = slideshow.querySelectorAll("img");
        imgs.forEach(function (img) {
          img.style.maxHeight = "100%";
          img.style.height = "auto";
          img.style.width = "auto";
          img.style.objectFit = "contain";
        });
      }
    } else {
      desc.style.height = "0px";
      desc.style.maxHeight = null;
      desc.style.overflow = "hidden";
      desc.style.visibility = "hidden";
      desc.style.paddingBottom = "0px";
      // 關閉時 slideshow 高度也歸零
      const slideshow = desc.querySelector(".slideshow-container");
      if (slideshow) {
        slideshow.style.height = "0px";
        slideshow.style.maxHeight = null;
        const slides = slideshow.querySelectorAll(
          ".mySlides, .mySlides-process"
        );
        slides.forEach(function (slide) {
          slide.style.height = null;
          slide.style.maxHeight = null;
        });
        const imgs = slideshow.querySelectorAll("img");
        imgs.forEach(function (img) {
          img.style.maxHeight = null;
          img.style.height = null;
          img.style.width = null;
          img.style.objectFit = null;
        });
      }
    }
  });
}

// 監聽 active 切換
function observeActiveDescriptive() {
  const container = document.querySelector(".detailcontainer");
  if (!container) return;
  const observer = new MutationObserver(adjustDescriptiveHeights);
  observer.observe(container, {
    attributes: true,
    subtree: true,
    attributeFilter: ["class"],
  });
}

window.addEventListener("resize", adjustDescriptiveHeights);
document.addEventListener("DOMContentLoaded", function () {
  adjustDescriptiveHeights();
  observeActiveDescriptive();
});
