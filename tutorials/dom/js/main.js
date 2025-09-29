
console.log("hello hello");


let pageTitle = document.querySelector("#page-title")

// Javascript Timeout changes h1 tilte after 3 seconds
setTimeout(function(){
    pageTitle.style.color = "pink";
    // console.log("timeout worked!");
},3000);

// Click event on header changes background color
document.querySelector("header").onclick = function() {
    // console.log("clicked header");
    document.querySelector("body").style.backgroundColor = "black";
}


