const cursor = document.querySelector('.cursor-ring')

document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px'
  cursor.style.top = e.clientY + 'px'
})

document.addEventListener('mousemove', e => {
  const star = document.createElement('div')
  star.className = 'star'
  star.style.left = e.pageX + 'px'
  star.style.top = e.pageY + 'px'
  document.body.appendChild(star)
  setTimeout(() => star.remove(), 1000)
})

const canvas = document.querySelector('canvas.snow')
const ctx = canvas.getContext('2d')
let width, height, particles = []

function initCanvas() {
  width = canvas.width = window.innerWidth
  height = canvas.height = window.innerHeight
  particles = []
  for (let i = 0; i < 200; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 2 + 1,
      d: Math.random() * 200
    })
  }
}

function drawSnow() {
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = 'rgba(255,255,255,0.8)'
  ctx.beginPath()
  for (let p of particles) {
    ctx.moveTo(p.x, p.y)
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true)
  }
  ctx.fill()
  updateSnow()
}

let angle = 0
function updateSnow() {
  angle += 0.01
  for (let p of particles) {
    p.y += Math.cos(angle + p.d) + 1 + p.r / 2
    p.x += Math.sin(angle) * 2
    if (p.x > width + 5 || p.x < -5 || p.y > height) {
      p.x = Math.random() * width
      p.y = -10
    }
  }
}

window.addEventListener('resize', initCanvas)

function animateSnow() {
  drawSnow()
  requestAnimationFrame(animateSnow)
}

initCanvas()
animateSnow()
