let maincolor = localStorage.getItem("color-option");
if (maincolor !== null) {
  document.documentElement.style.setProperty("--main-color", maincolor);
  document.querySelectorAll(".colors-list li").forEach((ele2) => {
    ele2.classList.remove("active");
    if (ele2.dataset.color === maincolor) {
      ele2.classList.add("active");
    }
  });
}

//let settinggear = document.querySelector(".settings-box");
//let thegear = document.querySelector(".fa-gear");
//settinggear.onclick = function () {
//settinggear.classList.toggle("open");
//thegear.classList.toggle("fa-spin");
//};
let backgroundoption = true;
let theinterval;

let backgroundlocalitem = localStorage.getItem("background-option");
if (backgroundlocalitem !== null) {
  if (backgroundlocalitem == "true") {
    backgroundoption = true;
  } else {
    backgroundoption = false;
  }
  document.querySelectorAll(".random-background span").forEach((ele4) => {
    ele4.classList.remove("active");
  });
  if (backgroundlocalitem === "true") {
    document.querySelector(".random-background .yes").classList.add("active");
  } else {
    document.querySelector(".random-background .no").classList.add("active");
  }
}

document.querySelector(".settings-gear .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

const colorsli = document.querySelectorAll(".colors-list li");

colorsli.forEach((li) => {
  li.addEventListener("click", (e) => {
    // console.log(e.target.dataset.color);
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color-option", e.target.dataset.color);
    handleactive(e);
  });
});

const randombge = document.querySelectorAll(".random-background span");

randombge.forEach((span) => {
  span.addEventListener("click", (s) => {
    handleactive(s);
    if (s.target.dataset.background === "yes") {
      backgroundoption = true;
      randoming();
      localStorage.setItem("background-option", true);
    } else {
      backgroundoption = false;
      clearInterval(theinterval);
      localStorage.setItem("background-option", false);
    }
  });
});

let page = document.querySelector(".landing-page");

let imgarray = ["img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg"];

function randoming() {
  if (backgroundoption === true) {
    // Set background immediately on function call
    let randomnumber = Math.floor(Math.random() * imgarray.length);
    page.style.backgroundImage = 'url("image/' + imgarray[randomnumber] + '")';

    theinterval = setInterval(() => {
      let randomnumber = Math.floor(Math.random() * imgarray.length);
      page.style.backgroundImage =
        'url("image/' + imgarray[randomnumber] + '")';
    }, 5000);
  }
}

randoming();

let ourskills = document.querySelector(".skills");
window.onscroll = function () {
  /// let skillsoffsetTop = ourskills.offsetTop;
  //let skillsouterHeight = ourskills.offsetHeight;
  //let windowheight = this.innerHeight;
  //let windowscrolltop = this.pageYOffset;
  //if (windowscrolltop > skillsoffsetTop + skillsouterHeight - windowheight) {
  // let allskills = document.querySelectorAll(
  //   ".skill-box .skill-progress span"
  //);
  // allskills.forEach((skill) => {
  // skill.style.width = skill.dataset.progress;
  //});
  // }
  if (window.scrollY >= 800) {
    let allskills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );

    allskills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

let ourgallery = document.querySelectorAll(".gallery img");
ourgallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupbox = document.createElement("div");
    popupbox.className = "popup-box";
    if (img.alt !== null) {
      let imgheading = document.createElement("h3");
      let imgtext = document.createTextNode(img.alt);
      imgheading.appendChild(imgtext);
      popupbox.appendChild(imgheading);
    }
    let popupimage = document.createElement("img");
    popupimage.src = img.src;
    popupbox.appendChild(popupimage);
    document.body.appendChild(popupbox);
    let closebutton = document.createElement("span");
    let closebuttontext = document.createTextNode("X");
    closebutton.appendChild(closebuttontext);
    closebutton.className = "close-button";
    popupbox.appendChild(closebutton);
  });
});
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});

const allbullets = document.querySelectorAll(".nav-bullets .bullet");
const alllinks = document.querySelectorAll(".links a");

function scrolltothis(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrolltothis(allbullets);
scrolltothis(alllinks);

function handleactive(ev) {
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

let bulletsspan = document.querySelectorAll(".bullets-option span");
let navbullets = document.querySelector(".nav-bullets");
let bulletlocalitem = localStorage.getItem("bullets-option");
if (bulletlocalitem !== null) {
  bulletsspan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletlocalitem === "show") {
    navbullets.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    navbullets.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

bulletsspan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      navbullets.style.display = "block";
      localStorage.setItem("bullets-option", "show");
    } else {
      navbullets.style.display = "none";
      localStorage.setItem("bullets-option", "hide");
    }
    handleactive(e);
  });
});

document.querySelector(".reset-options").onclick = function () {
  //localStorage.clear()
  localStorage.removeItem("bullets-option");
  localStorage.removeItem("color-option");
  localStorage.removeItem("background-option");
  window.location.reload();
};
let togglebtn = document.querySelector(".toggle-minu");
let tlinks = document.querySelector(".links");
togglebtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("minu-active");
  tlinks.classList.toggle("open");
};
document.addEventListener("click", (e) => {
  if (e.target !== togglebtn && e.target !== tlinks) {
    if (tlinks.classList.contains("open")) {
      togglebtn.classList.toggle("minu-active");
      tlinks.classList.toggle("open");
    }
  }
});
tlinks.onclick = function (e) {
  e.stopPropagation();
};
