let background = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];
let landing = document.querySelector(".landing");
let gear = document.querySelector(".gear");
let setting = document.querySelector(".setting");
let color = document.querySelectorAll(".colors-list li");
let random = document.querySelectorAll(".back span");
let mainColors = localStorage.getItem("color_option");
let randomizeBackground = localStorage.getItem("randomize");
let backOption = true;
let backInterval;
let ourSkills = document.querySelector(".skills");
let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
let ourGallery = document.querySelectorAll(".gallery img");
let send = document.getElementById("send");
let toggleIcon = document.querySelector(".icon");
let mobileLinks = document.querySelector(".mobile-links");
let mGear = document.querySelector(".m-gear");
let mobileLi = document.querySelectorAll(".mobile-ul-links li");
function randomBackground() {
  if (backOption === true) {
    backInterval = setInterval(() => {
      let randomNumber = Math.floor(Math.random() * background.length);
      landing.style.backgroundImage =
        'url("images/' + background[randomNumber] + '")';
    }, 10000);
  }
}
gear.addEventListener("click", () => {
  setting.classList.toggle("active");
  gear.classList.toggle("active");
});
mGear.addEventListener("click", () => {
  setting.classList.toggle("active");
  mGear.classList.toggle("active");
});
color.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty("--red", e.target.dataset.color);
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});
random.forEach((span) => {
  span.addEventListener("click", (e) => {
    handleActive(e);
    localStorage.setItem("randomize", e.target.dataset.background);
    if (e.target.dataset.background === "yes") {
      backOption = true;
      randomBackground();
    } else {
      backOption = false;
      clearInterval(backInterval);
    }
  });
});
if (mainColors != null) {
  color.forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
  document.documentElement.style.setProperty(
    "--red",
    localStorage.getItem("color_option")
  );
}
if (randomizeBackground != null) {
  random.forEach((element) => {
    element.classList.remove("active");
    if (element.dataset.background === randomizeBackground) {
      element.classList.add("active");
      if (randomizeBackground === "yes") {
        backOption = true;
      } else {
        backOption = false;
        clearInterval(backInterval);
      }
    }
  });
}
randomBackground();

window.onscroll = function () {
  let skillsOffsetTop = ourSkills.offsetTop;
  let skillsOuterHeight = ourSkills.offsetHeight;
  let windowHeight = this.innerHeight;
  let windowScrollTop = this.pageYOffset;
  if (windowScrollTop >= skillsOffsetTop + skillsOuterHeight - windowHeight) {
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  } else {
    allSkills.forEach((skill) => {
      skill.style.width = skill.style.background;
    });
  }
};
ourGallery.forEach((image) => {
  image.addEventListener("click", (e) => {
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";
    document.body.appendChild(popupBox);
    if (image.alt !== null) {
      let imageHeading = document.createElement("h3");
      let imageText = document.createTextNode(image.alt);
      imageHeading.appendChild(imageText);
      popupBox.appendChild(imageHeading);
    }
    popupimage = document.createElement("img");
    popupimage.src = image.src;
    popupBox.appendChild(popupimage);
    let closeButton = document.createElement("span");
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

document.addEventListener("click", (e) => {
  if (e.target.className === "close-button") {
    e.target.parentNode.remove();
    document.querySelector(".popup-overlay").remove();
  }
});
document.addEventListener("click", (e) => {
  if (e.target.className === "setting-close-button") {
    e.target.parentElement.classList.toggle("active");
    gear.classList.toggle("active");
  }
});

function handleActive(e) {
  e.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  e.target.classList.add("active");
}
let reset = document.querySelector(".reset");
reset.onclick = function () {
  localStorage.removeItem("color_option");
  localStorage.removeItem("randomize");
  window.location.reload();
};
function sendEmail() {
  let usernameval = document.getElementById("name").value;
  let emailval = document.getElementById("email").value;
  let subjectval = document.getElementById("subject").value;
  let messageval = document.getElementById("message").value;

  const serviceID = "kaaiioos";
  const templateID = "template_n5ubpj6";
  const emailParams = {
    from_name: usernameval,
    to_name: "omar",
    from_email: emailval,
    subject: subjectval,
    message: messageval,
  };
  emailjs.send(serviceID, templateID, emailParams).then(
    (response) => {
      console.log("SUCCESS!", response.status, response.text);
      let alert = document.querySelector(".alert");
      let alertContent = document.createTextNode(
         "✨ 👏 Message Sent ;)"
      );
      alert.appendChild(alertContent);
      alert.classList.toggle("active");
      alertInterval = setInterval(() => {
        alert.classList.remove("active");
        clearInterval(alertInterval);
        alertContent.nodeValue = "";
      }, 2000);
    },
    (error) => {
      console.log("FAILED...", error);
    }
  );
}
const sendBtn = document.getElementById("send");
sendBtn.addEventListener("click", function () {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const nameRegex = /^.{3,}\s*$/u;
  const subjectRegex = /^\S+$/;
  const messageRegex = /^.{20,}\s*$/u;
  if (
    document.getElementById("email").value.match(emailRegex) &&
    document.getElementById("name").value.match(nameRegex) &&
    document.getElementById("subject").value.match(subjectRegex) &&
    document.getElementById("message").value.match(messageRegex)
  ) {
    sendEmail();
  } else {
    let alert = document.querySelector(".alert");
    let alertContent = document.createTextNode(
      ";( Message didn't Sent,Check Your Input Fields"
    );
    alert.appendChild(alertContent);
    alert.classList.toggle("active");
    alertInterval = setInterval(() => {
      alert.classList.remove("active");
      clearInterval(alertInterval);
      alertContent.nodeValue = "";
    }, 3000);
  }
});
toggleIcon.addEventListener("click", () => {
  toggleIcon.classList.toggle("active");
  mobileLinks.classList.toggle("active");
  mGear.classList.toggle("hide");
  document.body.classList.toggle("over-flow");
});

mobileLi.forEach((ml) => {
  ml.onclick = function () {
    toggleIcon.classList.toggle("active");
    mobileLinks.classList.toggle("active");
    mGear.classList.toggle("hide");
    document.body.classList.toggle("over-flow");
  };
});
