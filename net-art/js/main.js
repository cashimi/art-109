// document.querySelector("#image-0").addEventListener("click", function(){
//     document.querySelector("#image-1").style.visibility = "visible";
//     alert("bark bark bark");
// })
// document.querySelector("#image-1").addEventListener("click", function(){
//     document.querySelector("#image-2").style.visibility = "visible";
// })
// document.querySelector("#image-2").addEventListener("click", function(){
//     document.querySelector("#image-3").style.visibility = "visible";
// })
// document.querySelector("#image-3").addEventListener("click", function(){
//     document.querySelector("#image-4").style.visibility = "visible";
// })
// document.querySelector("#image-4").addEventListener("click", function(){
//     document.querySelector("#image-5").style.visibility = "visible";
// })
// document.querySelector("#image-5").addEventListener("click", function(){
//     document.querySelector("#image-6").style.visibility = "visible";
// })
// document.querySelector("#image-6").addEventListener("click", function(){
// })





//------------------------------------------------------------------- part one of JS tut
// console.log("hello hello");


// let pageTitle = document.querySelector("#page-title")

// // Javascript Timeout changes h1 tilte after 3 seconds
// setTimeout(function(){
    // pageTitle.style.color = "pink";
    // // console.log("timeout worked!");
// },3000);

// // Click event on header changes background color
// document.querySelector("header").onclick = function() {
    // // console.log("clicked header");
    // document.querySelector("body").style.backgroundColor = "black";
// }

document.addEventListener("DOMContentLoaded", () => {
    const trigger = document.getElementById("personality-trigger");
    const popup = document.getElementById("popup-square");

    trigger.addEventListener("click", () => {
        // Toggle the visibility of the popup square
        if (popup.style.display === "none" || popup.style.display === "") {
            popup.style.display = "block";
        }
    });
});


document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("job-trigger");
  const popup = document.getElementById("popup-square2");

  trigger.addEventListener("click", () => {
      // Toggle the visibility of the popup square
      if (popup.style.display === "none" || popup.style.display === "") {
          popup.style.display = "block";
      }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("ad-trigger");
  const popup = document.getElementById("popup-square3");

  trigger.addEventListener("click", () => {
      // Toggle the visibility of the popup square
      if (popup.style.display === "none" || popup.style.display === "") {
          popup.style.display = "block";
      }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("xd-trigger");
  const popup = document.getElementById("popup-square4");

  trigger.addEventListener("click", () => {
      // Toggle the visibility of the popup square
      if (popup.style.display === "none" || popup.style.display === "") {
          popup.style.display = "block";
      }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("explode-trigger");
  const popup = document.getElementById("popup-square5");

  trigger.addEventListener("click", () => {
      // Toggle the visibility of the popup square
      if (popup.style.display === "none" || popup.style.display === "") {
          popup.style.display = "block";
      }
  });
});