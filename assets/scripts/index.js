//#region responsive screens
const screenBtns = document.querySelectorAll(
  ".project-2-screen-changer button"
);

removeOtherActiveClass = () => {
  screenBtns.forEach((ele) => {
    //remove active class from other buttons if there
    if (ele.classList.contains("active")) {
      ele.classList.remove("active");
    }
  });
};
//changes the sceen size by providing a id string
function changeScreen(id) {
  removeOtherActiveClass();
  document.getElementById(id).classList.add("active");
  document.querySelector(".project-2-image").setAttribute("id", id);
  setTimeout(() => {
    document.querySelector(".project-2-image").classList.forEach((c)=>{
      if(c.substr(0,5)==="style"){
        document.querySelector(".project-2-image").classList.remove(c)
      }
    })
    document.querySelector(".project-2-image").classList.add("style-"+id)
  }, 600);
}
//it changes the screen size every interval by traversing through arry
function autoplayScreens(interval = 5000) {
  let a = 0;
  screenSizes = ["mobile", "tablet", "laptop"];
  autoplayInterval = setInterval(() => {
    changeScreen(screenSizes[a]);
    a++;
    a %= 3;
  }, interval);
}
screenBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    screenSizeEle = btn;
    if (screenSizeEle.classList.contains("active")) {
      //if already active then abort
      return "";
    }
    changeScreen(screenSizeEle.getAttribute("id"));
    clearInterval(autoplayInterval); //stop the autoplay if manually button is clicked
  });
});
//autoplayScreens(3000); //initialize the autoplay of screen changing
//#endregion

//#region responsive screen plus minus quantity
const minusBtn=document.querySelector("#minus")
const plusBtn=document.querySelector("#plus")
const quantityElement=document.querySelector("#quantity")
plusBtn.addEventListener("click",()=>{
  changeQuantity(1)
})
minusBtn.addEventListener("click",()=>{
  changeQuantity(-1)
})
const changeQuantity=(q)=>{
  if(quantityElement.innerHTML==1 && (q==-1)){
    return;
  }
quantityElement.innerHTML=parseInt(quantityElement.innerHTML)+q
}

//#endregion

//#region cards

card_1 = document.querySelector("#card-1");
card_2 = document.querySelector("#card-2");
card_3 = document.querySelector("#card-3");
card_4 = document.querySelector("#card-4");
card_5 = document.querySelector("#card-5");
const directions = [
  "translateY(calc(-1 *  calc(100% + 50px)))",
  "translateX(calc(100% + 40px))",
  "translateY(calc(100% + 50px))",
  "translateX(calc(-1 * calc(100% + 40px)))",
];
way = [
  { card: "card-5", move: 1 },
  { card: "card-2", move: 2 },
  { card: "card-1", move: 1 },
  { card: "card-4", move: 0 },
  { card: "card-2", move: 3 },
  { card: "card-5", move: 3 },
  { card: "card-3", move: 2 },
  { card: "card-1", move: 1 },
  { card: "card-4", move: 1 },
  { card: "card-2", move: 0 },
  { card: "card-5", move: 3 },
  { card: "card-4", move: 2 },
  { card: "card-1", move: 3 },
  { card: "card-3", move: 0 },
];
card_Duration = 2000;

function moveCard(cardId, direction) {
  const card = document.getElementById(cardId);
  translate = directions[direction];

  card.style.transform = card.style.transform + translate;
}
//animate card based on the cardDirections Array
animateCards = () => {
  way.forEach((e, i) => {
    setTimeout(() => {
      moveCard(e.card, e.move);
    }, card_Duration * i);
  });
};
//changes the ids of cards  between half of animation to reverse the position of card
changeCardId = () => {
  card_1.setAttribute("id", "card-2");
  card_2.setAttribute("id", "card-1");
  card_3.setAttribute("id", "card-3");
  card_4.setAttribute("id", "card-5");
  card_5.setAttribute("id", "card-4");
};
//gives cards their default ids
clearCardId = () => {
  card_1.setAttribute("id", "card-1");
  card_2.setAttribute("id", "card-2");
  card_3.setAttribute("id", "card-3");
  card_4.setAttribute("id", "card-4");
  card_5.setAttribute("id", "card-5");
  //clears the styles tag as it gets cluttered
  card_1.setAttribute("style", "");
  card_2.setAttribute("style", "");
  card_3.setAttribute("style", "");
  card_4.setAttribute("style", "");
  card_5.setAttribute("style", "");
};
function cardAnimation() {
  animateCards();
  setTimeout(() => {
    changeCardId();
    animateCards();
  }, card_Duration * way.length);

  setTimeout(() => {
    clearCardId();
    cardAnimation();
  }, 2 * card_Duration * way.length);
}
//trigger the animation
//cardAnimation();

//#endregion cards

//#region changing the keyword in the main heading
const keywordContainers = document.querySelectorAll(".keyword-container");
let keywordCount = 0;

setInterval(() => {
  if (keywordCount === keywordContainers.length - 1) {
    changeKeyword(keywordContainers[keywordCount], keywordContainers[0]);
    keywordCount = 0;
  } else {
    changeKeyword(
      keywordContainers[keywordCount],
      keywordContainers[keywordCount + 1]
    );
    
  keywordCount++;
  }

}, 2000);

const changeKeyword = (a, b) => {
  a.classList.add("push-down");
  a.classList.remove("current");
  b.classList.add("current");
  setTimeout(() => {
    a.classList.remove("push-down");
  }, 1000);
};

//#endregion changing the keyword in the main heading
