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

let imgarray = [
  "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80",
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1920&q=80",
];

function randoming() {
  if (backgroundoption === true) {
    // Set background immediately on function call
    let randomnumber = Math.floor(Math.random() * imgarray.length);
    page.style.backgroundImage = 'url("' + imgarray[randomnumber] + '")';

    theinterval = setInterval(() => {
      let randomnumber = Math.floor(Math.random() * imgarray.length);
      page.style.backgroundImage = 'url("' + imgarray[randomnumber] + '")';
    }, 5000);
  }
}

randoming();

let ourskills = document.querySelector(".skills");
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
    rect.bottom >= 0
  );
}
window.addEventListener("scroll", () => {
  if (isElementInViewport(ourskills)) {
    let allskills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allskills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    // Reset progress bars when skills section is not in viewport
    let allskills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allskills.forEach((skill) => {
      skill.style.width = "0%";
    });
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

// Additional cleanup and organization can be done here if needed
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
