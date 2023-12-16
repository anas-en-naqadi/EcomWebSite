function setupScrolling(containerId) {
  const container = document.querySelector(`#${containerId}`);
  const UlList = container.querySelector("ul");
  const Right_Arrow = container.querySelector(".right-arrow svg");
  const Left_Arrow = container.querySelector(".left-arrow");

  const manageIcons = () => {
    const maxScrollLength = UlList.scrollWidth - UlList.clientWidth - 20;
    Left_Arrow.classList.toggle("active", UlList.scrollLeft >= 120);
    Right_Arrow.classList.toggle("active", UlList.scrollLeft < maxScrollLength);
  };

  Right_Arrow.addEventListener("click", () => {
    UlList.scrollLeft += 630;
    manageIcons();
  });

  Left_Arrow.addEventListener("click", () => {
    UlList.scrollLeft -= 630;
    manageIcons();
  });
}

setupScrolling("container1");
setupScrolling("container2");
setupScrolling("container3");
setupScrolling("container4");

function ChangeButtonBG(button){
  const bn = document.querySelectorAll(".ScrollingBotton");
  bn.forEach(buttons => {
    buttons.classList.remove("ActiveScrollingBotton");
  }
  );
  button.classList.add("ActiveScrollingBotton");
}
