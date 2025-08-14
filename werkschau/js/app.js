const MIN_SPEED = 1.5    /* тут ничего не измененно */
const MAX_SPEED = 2.5

function randomNumber(min, max) {
  return Math.random() * (max - min) + min
}

class Blob {
  constructor(el) {
    this.el = el
    const boundingRect = this.el.getBoundingClientRect()
    this.size = boundingRect.width
    this.initialX = randomNumber(0, window.innerWidth - this.size)
    this.initialY = randomNumber(0, window.innerHeight - this.size)
    this.el.style.top = `${this.initialY}px`
    this.el.style.left = `${this.initialX}px`
    this.vx =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
    this.vy =
      randomNumber(MIN_SPEED, MAX_SPEED) * (Math.random() > 0.5 ? 1 : -1)
    this.x = this.initialX
    this.y = this.initialY
  }

  update() {
    this.x += this.vx
    this.y += this.vy
    if (this.x >= window.innerWidth - this.size) {
      this.x = window.innerWidth - this.size
      this.vx *= -1
    }
    if (this.y >= window.innerHeight - this.size) {
      this.y = window.innerHeight - this.size
      this.vy *= -1
    }
    if (this.x <= 0) {
      this.x = 0
      this.vx *= -1
    }
    if (this.y <= 0) {
      this.y = 0
      this.vy *= -1
    }
  }

  move() {
    this.el.style.transform = `translate(${this.x - this.initialX}px, ${
      this.y - this.initialY
    }px)`
  }
}

function initBlobs() {
  const blobEls = document.querySelectorAll('.bouncing-blob')
  const blobs = Array.from(blobEls).map((blobEl) => new Blob(blobEl))

  function update() {
    requestAnimationFrame(update)
    blobs.forEach((blob) => {
      blob.update()
      blob.move()
    })
  }

  requestAnimationFrame(update)
}

initBlobs()


/***********************************
 Cursor
 ************************************/

let curs = document.querySelector(".cursor");

document.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;
  curs.style.left = x - 15 + "px";
  curs.style.top = y - 15 + "px";
});

let menuEls = document.querySelectorAll(".nav-title a, #logo-codepen");
menuEls.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    setTimeout(() => {
      curs.classList.add("cursor-fade");
    }, 300);
  });

  el.addEventListener("mouseleave", () => {
    curs.classList.remove("cursor-fade");
  });
});


/***********************************
 Timer
 ************************************/

window.onload = function() {
  var h = document.getElementById('h'),
    m = document.getElementById('m'),
    s = document.getElementById('s'),
    textProp = h.textContent !== undefined ? 'textContent' : 'innerText';

  function tick() {
    var date = new Date(),
      hours = date.getHours(),
      mins = date.getMinutes(),
      secs = date.getSeconds();
    h[textProp] = hours < 10 ? '0'+hours : hours;
    m[textProp] = mins < 10 ? '0'+mins : mins;
    s[textProp] = secs < 10 ? '0'+secs : secs;
  }
  tick();
  setInterval(tick, 1000);
}


