//Slect Elements
// Setting Box
let settingToggle = document.querySelector(".setting_box .toggle_Settings > i");
// Colors Option
let color_options = document.querySelectorAll(".setting_box .colors_option ul li");
let mainColor = localStorage.getItem("main_color");
//Background OPtions
let backgroundOptions = document.querySelectorAll(".setting_box .random_background .options > span")
let mainBackground = localStorage.getItem("main_background");
let randomBackground = true;
let backgroundInterval;
// Bullets Navigations
let bullets = document.querySelectorAll(".nav_bullets > .bullet");
let navBullets = document.querySelector(".nav_bullets");
let bulletOptions = document.querySelectorAll(".setting_container > .bullets_control > .options > span")
let bulletOption = localStorage.getItem("bullet_option");
//links Navigation
let links = document.querySelectorAll(".header > .links > li > a");
//links Toggle
let toggleLinks = document.querySelector(".header > .links");
let toggleIcon = document.querySelector(".landing_section  .header .icon")
// Landing Section
let landingSection = document.querySelector(".landing_section");
//Skill Section
let skilSection = document.querySelector(".skills")
let progress = document.querySelectorAll(".skills  .skil_box .progress .prog")
let progressLabel = document.querySelectorAll(".skills  .skil_box .progress .label")
// Gallery Section
let galleryImgs = document.querySelectorAll(".gallery_box img")
//logic
//Check For main Color
if (mainColor !== null)
{
  document.documentElement.style.setProperty("--main-color", localStorage.getItem("main_color"));
  color_options.forEach((li) =>
  {
    li.classList.remove("active")
    if (li.dataset.color === mainColor)
    {
      li.classList.add("active");
    }
  })
}
//Check For main background
if (mainBackground!== null)
{

  backgroundOptions.forEach((span) =>
  {
    span.classList.remove("active")
  })
  if (mainBackground == "true")
  {
    randomBackground = true;
    document.querySelector(" .random_background .options .yes").classList.add("active")
  } else
  {
    randomBackground = false;
    document.querySelector(" .random_background .options .no").classList.add("active")
  }
}
//Check For Bullets Navigations
if (bulletOption!== null)
{

  bulletOptions.forEach((span) =>
  {
    span.classList.remove("active")
  })
  if (bulletOption == "block")
  {
    document.querySelector(" .bullets_control .options .yes").classList.add("active");
    navBullets.style.display = bulletOption;
  } else
  {
    document.querySelector(" .bullets_control .options .no").classList.add("active")
    navBullets.style.display = bulletOption;
  }
}
// Toggele Settings Box
settingToggle.onclick = () =>
{
  settingToggle.classList.toggle("spin")
  document.querySelector(".setting_box").classList.toggle("open")
}
// colors OPtion
color_options.forEach((li) =>
{

  li.addEventListener("click", (e) =>
  {
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    localStorage.setItem("main_color", e.target.dataset.color);
    //   e.target.parentElement.querySelectorAll(".active").forEach((li) =>
    //   {
    //     li.classList.remove("active")
    //   })
    //   e.target.classList.add("active")
    // })
  deleteActive (e)
  });
})
// Background OPtion
backgroundOptions.forEach((span) =>
{
  span.addEventListener("click", (event) =>
  {
    deleteActive(event)
    event.target.classList.add("active")
    if (event.target.dataset.background ==="yes")
    {
      randomBackground = true
      randomBackgrounds()
      localStorage.setItem("main_background",randomBackground)
    } else
    {
      randomBackground = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("main_background",randomBackground)
    }
  })
})
// Bullets Navigations OPtion
bulletOptions.forEach((span) =>
{
  span.addEventListener("click", (event) =>
  {
    deleteActive(event)
    event.target.classList.add("active")
    if (event.target.dataset.option == "yes")
    {
      navBullets.style.display = "block"
      localStorage.setItem("bullet_option", "block");
    } else
    {
      navBullets.style.display = "none"
      localStorage.setItem("bullet_option", "none");
    }
  })
})
// Bullets Navigation
sectionsScrolling(bullets)
// links Navigation
sectionsScrolling (links)
/* bullets.forEach((bullet) =>
  {
  bullet.addEventListener("click", (e) =>
  {

    document.querySelector(e.target.dataset.nav).scrollIntoView({
      behavior: "smooth"
    })

  })
  bullet.scrollIntoView()
  })*/
document.querySelector("button.rest_options").onclick = () =>
{
  localStorage.removeItem("main_color");
  localStorage.removeItem("main_background");
  localStorage.removeItem("bullet_option");
  window.location.reload()
}
//Toggle Links
toggleIcon.onclick = (e) =>
{
  e.stopPropagation()
  toggleLinks.classList.toggle("open");
  toggleIcon.classList.toggle("active");
}

window.onclick = (e) =>
{
    if (e.target !==toggleIcon && e.target !==toggleLinks )
  {
    toggleLinks.classList.remove("open");
    toggleIcon.classList.remove("active");
  }
}
toggleLinks.addEventListener("click", (e) =>
{
  e.stopPropagation()
})
//Skills Progress
console.log()
window.onscroll = ()=>{
  if (skilSection.offsetTop - 400 <= scrollY)
{
    progress.forEach((span) =>
    {
      span.style.width = span.dataset.width
    })
      progressLabel.forEach((element) =>
    {
        element.style.left = element.innerHTML
    })
}
}
//Create Gallery PopUp
galleryImgs.forEach((img) =>
{
  img.addEventListener("click", (e) =>
  {
    let popupOverlay = document.createElement("div");
    popupOverlay.className = "popup_overlay";
    document.body.appendChild(popupOverlay);
    let imgBox = document.createElement("div");
    imgBox.className = "img_box";
    let popupImg = document.createElement("img")
    popupImg.src = e.target.src
    imgBox.appendChild(popupImg);
    document.body.appendChild(imgBox)
    let closeSpan = document.createElement("span");
    closeSpan.appendChild(document.createTextNode("X"));
    closeSpan.className = "close_button"
    imgBox.appendChild(closeSpan)
    popupOverlay.appendChild(imgBox);
  })
})
//Close PopUp
document.addEventListener("click", (e) =>
{
  if (e.target.className == "close_button" || e.target.className == "popup_overlay")
  {
    document.querySelector(".popup_overlay").remove()
  }
})

//functions
/* Background Function*/
function randomBackgrounds ()
{
  if (randomBackground === true)
  {
    backgroundInterval=setInterval(() =>
  {
    let random = Math.floor(Math.random() * 8);
    landingSection.style.background = `url(../imgs/Landing_0${random}.jpg)`;
  }, 10000);
    }
}
randomBackgrounds()
/* Active Class Function*/
function deleteActive (event)
{
        event.target.parentElement.querySelectorAll(".active").forEach((li) =>
      {
        li.classList.remove("active")
      })
      event.target.classList.add("active")
    }
// Sections Navigation
function sectionsScrolling (elements)
{
  elements.forEach((element) =>
  {
    element.addEventListener("click", (e) =>
    {
      document.querySelector(e.target.dataset.nav).scrollIntoView({
      behavior: "smooth"
    })
    })
  })
}
