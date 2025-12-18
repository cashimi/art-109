

let song = document.querySelector("#song");
let playBtn = document.querySelector("#play-button");
let pauseBtn = document.querySelector("#pause-button");
let volumeBtn = document.querySelector("#volume-button");


playBtn.addEventListener("click", function () {
    song.play();
})

pauseBtn.addEventListener("click", function () {
    song.pause();
})

volumeBtn.addEventListener("click", function () {
    song.volume = .1;
})
