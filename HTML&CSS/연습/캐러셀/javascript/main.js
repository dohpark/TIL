(() => {
  const carouselUI = document.querySelector(".carousel-list");
  const imageInput = document.querySelector("#image-upload-input");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");

  nextButton.addEventListener("click", moveNext);
  prevButton.addEventListener("click", movePrev);
})();
