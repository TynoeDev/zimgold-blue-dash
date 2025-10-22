// Copy contract address functionality
function copyContract() {
  const contractInput = document.getElementById("contractAddress")
  const copyBtn = document.getElementById("copyBtn")
  const toast = document.getElementById("toast")

  // Select and copy the text
  contractInput.select()
  contractInput.setSelectionRange(0, 99999) // For mobile devices

  try {
    // Try using the modern clipboard API
    navigator.clipboard
      .writeText(contractInput.value)
      .then(() => {
        showToast()
      })
      .catch(() => {
        // Fallback to execCommand
        document.execCommand("copy")
        showToast()
      })
  } catch (err) {
    // Fallback for older browsers
    document.execCommand("copy")
    showToast()
  }

  // Update button text temporarily
  const originalText = copyBtn.innerHTML
  copyBtn.innerHTML = `
        <svg class="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20,6 9,17 4,12"></polyline>
        </svg>
        Copied!
    `

  setTimeout(() => {
    copyBtn.innerHTML = originalText
  }, 2000)
}

// Show toast notification
function showToast() {
  const toast = document.getElementById("toast")
  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 3000)
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 70 // Account for fixed nav

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }
    })
  })
})

// Add scroll effect to navigation
window.addEventListener("scroll", () => {
  const nav = document.querySelector(".nav")

  if (window.scrollY > 50) {
    nav.style.background = "rgba(0, 0, 0, 0.98)"
    nav.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.3)"
  } else {
    nav.style.background = "rgba(0, 0, 0, 0.95)"
    nav.style.boxShadow = "none"
  }
})

// Add intersection observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

const enhancedObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"

      // Animate counters for stat cards
      if (entry.target.classList.contains("stat-card")) {
        const numberElement = entry.target.querySelector(".stat-number")
        const text = numberElement.textContent
        const number = Number.parseInt(text.replace(/[^\d]/g, ""))

        if (number) {
          numberElement.textContent = "0"
          setTimeout(() => {
            animateCounter(numberElement, number)
          }, 300)
        }
      }

      // Animate tokenomics percentages
      if (entry.target.classList.contains("tokenomics-card")) {
        const percentElement = entry.target.querySelector(".tokenomics-percentage")
        const percent = Number.parseInt(percentElement.textContent)

        if (percent) {
          percentElement.textContent = "0%"
          setTimeout(() => {
            animateCounter(percentElement, percent)
            // Add % back after animation
            const originalTimer = setInterval(() => {
              if (!percentElement.textContent.includes("%")) {
                percentElement.textContent += "%"
                clearInterval(originalTimer)
              }
            }, 100)
          }, 200)
        }
      }
    }
  })
}, observerOptions)

// Add particle effect (optional enhancement)
function createParticle() {
  const particle = document.createElement("div")
  particle.style.position = "fixed"
  particle.style.width = "4px"
  particle.style.height = "4px"
  particle.style.background = "#FFD700"
  particle.style.borderRadius = "50%"
  particle.style.pointerEvents = "none"
  particle.style.opacity = "0.7"
  particle.style.zIndex = "1"

  const startX = Math.random() * window.innerWidth
  const startY = window.innerHeight + 10

  particle.style.left = startX + "px"
  particle.style.top = startY + "px"

  document.body.appendChild(particle)

  const animation = particle.animate(
    [
      { transform: "translateY(0px) translateX(0px)", opacity: 0.7 },
      {
        transform: `translateY(-${window.innerHeight + 100}px) translateX(${(Math.random() - 0.5) * 100}px)`,
        opacity: 0,
      },
    ],
    {
      duration: 3000 + Math.random() * 2000,
      easing: "linear",
    },
  )

  animation.onfinish = () => {
    particle.remove()
  }
}

let mouseX = 0
let mouseY = 0

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX
  mouseY = e.clientY
})

function createInteractiveParticle() {
  const particle = document.createElement("div")
  particle.className = "interactive-particle"
  particle.style.position = "fixed"
  particle.style.width = "6px"
  particle.style.height = "6px"
  particle.style.background = "linear-gradient(45deg, #FFD700, #FFA500)"
  particle.style.borderRadius = "50%"
  particle.style.pointerEvents = "none"
  particle.style.opacity = "0.8"
  particle.style.zIndex = "1"
  particle.style.boxShadow = "0 0 10px rgba(255, 215, 0, 0.5)"

  const startX = Math.random() * window.innerWidth
  const startY = window.innerHeight + 10

  particle.style.left = startX + "px"
  particle.style.top = startY + "px"

  document.body.appendChild(particle)

  // Calculate direction towards mouse
  const directionX = (mouseX - startX) * 0.0001
  const directionY = (mouseY - startY) * 0.0001

  const animation = particle.animate(
    [
      {
        transform: "translateY(0px) translateX(0px) scale(0.5)",
        opacity: 0.8,
      },
      {
        transform: `translateY(-${window.innerHeight + 100}px) translateX(${(Math.random() - 0.5) * 200 + directionX * 1000}px) scale(1)`,
        opacity: 0,
      },
    ],
    {
      duration: 4000 + Math.random() * 3000,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
    },
  )

  animation.onfinish = () => {
    particle.remove()
  }
}

// Create particles periodically
setInterval(createInteractiveParticle, 3000)

function toggleFaq(element) {
  const faqItem = element.parentElement
  const faqAnswer = faqItem.querySelector(".faq-answer")
  const faqIcon = element.querySelector(".faq-icon")

  // Close all other FAQ items
  const allFaqItems = document.querySelectorAll(".faq-item")
  allFaqItems.forEach((item) => {
    if (item !== faqItem && item.classList.contains("active")) {
      item.classList.remove("active")
      const otherAnswer = item.querySelector(".faq-answer")
      const otherIcon = item.querySelector(".faq-icon")
      otherAnswer.style.maxHeight = "0"
      otherIcon.textContent = "+"
    }
  })

  // Toggle current FAQ item
  if (faqItem.classList.contains("active")) {
    faqItem.classList.remove("active")
    faqAnswer.style.maxHeight = "0"
    faqIcon.textContent = "+"
  } else {
    faqItem.classList.add("active")
    faqAnswer.style.maxHeight = faqAnswer.scrollHeight + "px"
    faqIcon.textContent = "−"
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const animateElements = document.querySelectorAll(
    ".feature-card, .tokenomics-card, .stat-card, .roadmap-item, .token-info-item",
  )

  animateElements.forEach((el, index) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(50px)"
    el.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`
    enhancedObserver.observe(el)
  })
})

function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  const timer = setInterval(() => {
    start += increment
    if (start >= target) {
      element.textContent = formatNumber(target)
      clearInterval(timer)
    } else {
      element.textContent = formatNumber(Math.floor(start))
    }
  }, 16)
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K"
  }
  return num.toString()
}

function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.8s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"

    // Add typing effect to hero title after page loads
    setTimeout(() => {
      const heroTitle = document.querySelector(".hero-title")
      if (heroTitle) {
        const titleText = heroTitle.innerHTML
        heroTitle.style.opacity = "0"
        setTimeout(() => {
          heroTitle.style.opacity = "1"
          heroTitle.style.animation = "fadeInUp 1s ease-out"
        }, 500)
      }
    }, 1000)
  }, 100)
})

document.addEventListener("mousemove", (e) => {
  const hero = document.querySelector(".hero")
  const coinContainer = document.querySelector(".coin-container")

  if (hero && coinContainer) {
    const rect = hero.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height

    const moveX = (x - 0.5) * 20
    const moveY = (y - 0.5) * 20

    coinContainer.style.transform = `translate(${moveX}px, ${moveY}px)`
  }
})

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed")
      }
    })
  },
  { threshold: 0.1 },
)

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section")
  sections.forEach((section) => {
    section.style.opacity = "0"
    section.style.transform = "translateY(30px)"
    section.style.transition = "opacity 1s ease, transform 1s ease"
    revealObserver.observe(section)
  })
})

const additionalStyles = document.createElement("style")
additionalStyles.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .interactive-particle {
        animation: sparkle 2s ease-in-out infinite;
    }
    
    @keyframes sparkle {
        0%, 100% {
            filter: brightness(1);
        }
        50% {
            filter: brightness(1.5);
        }
    }
`
document.head.appendChild(additionalStyles)
