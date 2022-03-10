(() => {
  const carouselUl = document.querySelector(".carousel-list");
  const imageInput = document.querySelector("#image-upload-input");
  const prevButton = document.querySelector(".prev-btn");
  const nextButton = document.querySelector(".next-btn");

  function changeTransform() {
    const items = document.querySelectorAll(".carousel-item");

    items.forEach((e, i) => {
      let degree = 360 / items.length;

      if (items.length > 1) {
        if (i == 0) {
          e.style.transform = `rotateY(0deg) translateZ(250px)`;
        } else {
          e.style.transform = `rotateY(${
            degree * i
          }deg) translateZ(250px) rotateY(-${degree * i}deg)`;
        }
      }

      if (items.length >= 5) {
        if (i == 0) {
          e.style.transform = `rotateY(0deg) translateZ(250px)`;
        } else if (i == 1) {
          e.style.transform =
            "rotateY(72deg) translateZ(250px) rotateY(-72deg)";
        } else if (i == 2) {
          e.style.transform =
            "rotateY(144deg) translateZ(250px) rotateY(-144deg) translateX(400px)";
        } else if (i == items.length - 2) {
          e.style.transform =
            "rotateY(216deg) translateZ(250px) rotateY(-216deg) translateX(-400px)";
        } else if (i == items.length - 1) {
          e.style.transform =
            "rotateY(288deg) translateZ(250px) rotateY(-288deg)";
        } else {
          e.style.transform = `rotateY(${
            degree * i
          }deg) translateZ(250px) rotateY(-${degree * i}deg)`;
        }
      }
    });
  }

  function moveNext() {
    const items = document.querySelectorAll(".carousel-item");

    if (items.length > 0) {
      const currentItem = document.querySelector(".now");
      const nextItem = currentItem.nextElementSibling;
      carouselUl.appendChild(currentItem);
      currentItem.classList.remove("now");
      nextItem.classList.add("now");
    }
    changeTransform();
  }

  function movePrev() {
    const items = document.querySelectorAll(".carousel-item");

    if (items.length > 0) {
      const currentItem = document.querySelector(".now");
      const lastItem = carouselUl.lastElementChild;

      carouselUl.insertBefore(lastItem, items[0]);
      currentItem.classList.remove("now");
      lastItem.classList.add("now");
    }
    changeTransform();
  }

  function createTag(url) {
    const list = document.createElement("li");
    const img = document.createElement("img");
    list.classList.add("carousel-item");
    img.src = url;
    list.appendChild(img);

    const items = document.querySelectorAll(".carousel-item");
    items.forEach((item) => {
      item.classList.remove("now");
    });
    list.classList.add("now");

    return list;
  }

  function uploadImg(value) {
    const items = document.querySelectorAll(".carousel-item");

    if (value.files) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const imgUrl = e.target.result;
        carouselUl.insertBefore(createTag(imgUrl), items[0]);
        changeTransform();
      };
      reader.readAsDataURL(value.files[0]);
    }
  }

  imageInput.addEventListener("change", (e) => {
    uploadImg(e.target);
  });
  nextButton.addEventListener("click", moveNext);
  prevButton.addEventListener("click", movePrev);

  window.onload = () => {
    changeTransform();
  };
})();
