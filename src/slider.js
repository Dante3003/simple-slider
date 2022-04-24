const defaultOptions = {
  slidesToShow: 1,
  slidesToScroll: 1,
  selector: ".slider-container",
  buttons: true,
  infinite: true,
};

export default function Slider(options = defaultOptions) {
  let position = 0;
  const { slidesToShow, slidesToScroll } = options;
  let isEnd = false;
  let isStart = true;
  let itemWidth = null;
  let movePosition = null;
  let items = [];

  const container = document.querySelector(options?.selector);
  const track = document.createElement("div");
  track.classList.add("slider-track");
  init(container, container.children, track, options);

  function init(container, slides, track, options) {
    Array.from(slides).forEach((slide) => {
      container.removeChild(slide);
      items.push(slide);
      slide.classList.add("slider-item");
      track.appendChild(slide);
    });

    container.appendChild(track);

    if (options?.buttons) {
      const buttonPrev = document.createElement("button");
      buttonPrev.setAttribute("class", "slider-prev-btn");
      buttonPrev.textContent = "prev";

      const buttonNext = document.createElement("button");
      buttonNext.setAttribute("class", "slider-next-btn");
      buttonNext.textContent = "next";
      container.appendChild(buttonPrev);
      buttonPrev.addEventListener("click", toPrev);
      container.appendChild(buttonNext);
      buttonNext.addEventListener("click", toNext);
    }

    itemWidth = container.offsetWidth / slidesToShow;
    movePosition = slidesToScroll * itemWidth;

    for (let i = 0; i < track.children.length; i++) {
      track.children[i].style.minWidth = itemWidth + "px";
    }
  }

  function toPrev() {
    const itemsLeft = Math.abs(position) / itemWidth;
    position +=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    track.style.transform = `translateX(${position}px)`;
    checkState();
  }

  function toNext() {
    const itemsLeft =
      items.length -
      (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -=
      itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;
    track.style.transform = `translateX(${position}px)`;
    checkState();
  }

  function checkState() {
    isStart = isEnd = false;
    if (position === 0) isStart = true;
    if (position <= -(items.length - slidesToShow) * itemWidth) isEnd = true;
  }

  return {
    toPrev,
    toNext,
    isStart,
    isEnd,
  };
}
