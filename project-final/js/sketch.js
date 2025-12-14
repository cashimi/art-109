//cookie clicker game by saranomy

let totalCookies = 0
let cookiesPerClick = 1
let clicksPerSecond = 0
let isCookieClicked = false
let isUpgradeClicked = false
let isAutoClicked = false

let upgradeCost = 5
let autoClickerCost = 10
let jump;
let hooray;
let cookieImg;
let cookieJumpImg;

// 🔴 NEW: game starts OFF until window opens
window.cookieGameActive = false;

function preload() {
    jump = loadSound('assets/jump.mp3');
	hooray = loadSound('assets/hooray.mp3');
    cookieImg = loadImage('assets/newb.png');
    cookieJumpImg = loadImage('assets/newbJump.png');
}

// helper: get the current size of the cookie-game box
function getCookieBoxSize() {
  const el = document.getElementById('cookie-game-box')
  if (!el) return { w: 400, h: 400 } // fallback
  const r = el.getBoundingClientRect()
  const minH = 240
  return {
    w: r.width || 400,
    h: Math.max(r.height || minH, minH),
  }
}

function setup() {
  const { w, h } = getCookieBoxSize()
  const canvas = createCanvas(w, h)
  canvas.parent('cookie-game-box')  // mount inside the wide box
}

// keep canvas in sync when layout/browser size changes
function windowResized() {
  const { w, h } = getCookieBoxSize()
  resizeCanvas(w, h)
}

function draw() {
    if (!window.cookieGameActive) return;  // ⛔ do nothing if game is "off"


	if(frameCount % 60 == 0) {
		totalCookies += clicksPerSecond
	}
	
	background(220)
	fill(0)
	textSize(20)
	textAlign(CENTER, CENTER)

	// ---- EASY-TO-TUNE TEXT POSITIONS ----
	// adjust these 3 numbers to move HUD text up/down
	const totalY      = 0.10 * height  // was 0.125 * height (move a bit up)
	const perClickY   = 0.18 * height  // vertical spacing between lines
	const perSecondY  = 0.26 * height

	text('Total: ' + totalCookies,    width/2, totalY)
	text(cookiesPerClick + ' per click', width/2, perClickY)
	text(clicksPerSecond + ' per sec',   width/2, perSecondY)

	// --- image button instead of circle ---
	const cx = width / 2
	const cy = height / 2
	let imgW = 120
	let imgH = 120

	// choose which image to show
	let currentImg = isCookieClicked && cookieJumpImg ? cookieJumpImg : cookieImg

	if (currentImg) {
		const aspect = currentImg.width / currentImg.height || 1
		imgW = 120
		imgH = imgW / aspect
		if (isCookieClicked) {
			imgW *= 1.05
			imgH *= 1.05
		}
		imageMode(CENTER)
		image(currentImg, cx, cy, imgW, imgH)
	} else {
		// fallback: old circle
		if(isCookieClicked) {
			fill(255, 0, 0)
		} else {
			fill(255)
		}
		ellipse(cx, cy, 100)
	}

	// bottom buttons use proportional height (no fixed 300px)
	const controlTop = height * 0.7
	const controlHeight = height - controlTop

	if(isUpgradeClicked) {
		fill(255, 0, 0)
	} else {
		fill(255)
	}
	rect(0, controlTop, width/2, controlHeight)

	if(isAutoClicked) {
		fill(255, 0, 0)
	} else {
		fill(255)
	}
	rect(width/2, controlTop, width/2, controlHeight)

	fill(0)

	// you can also adjust these label heights by changing the 0.5 multiplier
	const buttonLabelY = controlTop + controlHeight * 0.5
	text(upgradeCost + ' upgrade',       0.25*width, buttonLabelY)
	text(autoClickerCost + ' autoclicker', 0.75*width, buttonLabelY)
}

function mousePressed() {
    if (!window.cookieGameActive) return;  // ⛔ ignore clicks when off

	const cx = width / 2
	const cy = height / 2

	let clickedCookie = false

	// use default image bounds for hit-test
	const baseImg = cookieImg
	if (baseImg) {
		const aspect = baseImg.width / baseImg.height || 1
		let imgW = 120
		let imgH = imgW / aspect
		if (
			mouseX >= cx - imgW / 2 &&
			mouseX <= cx + imgW / 2 &&
			mouseY >= cy - imgH / 2 &&
			mouseY <= cy + imgH / 2
		) {
			clickedCookie = true
		}
	} else {
		if (dist(mouseX, mouseY, cx, cy) <= width * 0.125) {
			clickedCookie = true
		}
	}

	// button area (same as in draw)
	const controlTop = height * 0.7
	const controlHeight = height - controlTop
	const controlBottom = controlTop + controlHeight

	// ensure click is inside the canvas button strip
	const insideButtonStrip =
		mouseY >= controlTop &&
		mouseY <= controlBottom &&
		mouseX >= 0 &&
		mouseX <= width

	if(clickedCookie) {
		isCookieClicked = true       // will show newbJump.png
		totalCookies += cookiesPerClick
        if (jump) {
            jump.play()
        }
	}
	// UPGRADE BUTTON: left half, within button strip
	else if(
		insideButtonStrip &&
		mouseX < width/2 &&
		totalCookies >= upgradeCost
	) {
		isUpgradeClicked = true
		cookiesPerClick++
		totalCookies -= upgradeCost
		upgradeCost = parseInt(upgradeCost * 1.3)
		if (hooray) {
            hooray.play()
			hooray.setVolume(0.2)
        }
	}
	// AUTOCLICKER BUTTON: right half, within button strip (now also using insideButtonStrip)
	else if(
		insideButtonStrip &&
		mouseX >= width/2 &&
		totalCookies >= autoClickerCost
	) {
		isAutoClicked = true
		clicksPerSecond++
		totalCookies -= autoClickerCost
		autoClickerCost = parseInt(autoClickerCost * 1.2)
		if (hooray) {
            hooray.play()
			hooray.setVolume(0.2)
        }
	}
}

function mouseReleased() {
    if (!window.cookieGameActive) return;  // ⛔ ignore releases when off

	isCookieClicked = false   // switch back to newb.png
	isUpgradeClicked = false
	isAutoClicked = false
}