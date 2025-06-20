// Cursor Effects
const initCursor = () => {
  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  document.addEventListener('mousemove', e => {
    cursor.style.left = e.pageX + 'px';
    cursor.style.top = e.pageY + 'px';
  });

  document.addEventListener('mousedown', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
    cursor.style.backgroundColor = 'var(--light-color)';
  });

  document.addEventListener('mouseup', () => {
    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
    cursor.style.backgroundColor = 'transparent';
  });
};

// Menu Toggle Functionality
const initMenu = () => {
  const toggleMenu = () => {
    const navMenu = document.getElementById("navMenu");
    navMenu.classList.toggle("show");
    
    // Close all dropdowns when toggling main menu
    if (!navMenu.classList.contains("show")) {
      closeAllDropdowns();
    }
  };

  const closeAllDropdowns = () => {
    document.querySelectorAll('.dropdown-content, .dropdown-subcontent').forEach(el => {
      el.classList.remove("show");
    });
  };

  // Hamburger menu toggle
  const hamburger = document.querySelector('.hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleMenu();
    });
  }

  // Mobile dropdown toggle for submenus
  const dropdownLinks = document.querySelectorAll(".dropdown > a, .dropdown-sub > a");
  
  dropdownLinks.forEach(link => {
    link.addEventListener("click", function(e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        e.stopPropagation();
        const dropdownContent = this.nextElementSibling;
        
        // Close other open dropdowns
        document.querySelectorAll('.dropdown-content, .dropdown-subcontent').forEach(el => {
          if (el !== dropdownContent) el.classList.remove("show");
        });
        
        dropdownContent.classList.toggle("show");
      }
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener('click', function() {
    if (window.innerWidth <= 768) {
      closeAllDropdowns();
      document.getElementById("navMenu").classList.remove("show");
    }
  });

  // Desktop hover functionality
  if (window.innerWidth > 768) {
    document.querySelectorAll('.dropdown, .dropdown-sub').forEach(item => {
      item.addEventListener('mouseenter', () => {
        const content = item.querySelector('.dropdown-content, .dropdown-subcontent');
        if (content) content.classList.add('show');
      });
      
      item.addEventListener('mouseleave', () => {
        const content = item.querySelector('.dropdown-content, .dropdown-subcontent');
        if (content) content.classList.remove('show');
      });
    });
  }
};

// Entrance Animation
const initAnimations = () => {
  window.addEventListener('load', () => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add('show');
      }, index * 200);
    });
  });
};

// Initialize everything
document.addEventListener("DOMContentLoaded", function() {
  initCursor();
  initMenu();
  initAnimations();
});
// In your initMenu() function
const handleDesktopHover = () => {
  document.querySelectorAll('.dropdown, .dropdown-sub').forEach(item => {
    item.addEventListener('mouseenter', () => {
      if (window.innerWidth > 768) {
        const content = item.querySelector('.dropdown-content, .dropdown-subcontent');
        if (content) content.classList.add('show');
      }
    });
    
    item.addEventListener('mouseleave', () => {
      if (window.innerWidth > 768) {
        const content = item.querySelector('.dropdown-content, .dropdown-subcontent');
        if (content) content.classList.remove('show');
      }
    });
  });
};

// Call this in your initMenu() function
handleDesktopHover();

// For infinite seamless horizontal scrolling
const ticker = document.querySelector(".latest-updates-list");
let pos = 0;
const speed = 1;
let isTickerPaused = false;

// Duplicate content for seamless loop
ticker.innerHTML += ticker.innerHTML;

function animateTicker() {
  if (!isTickerPaused) {
    pos -= speed;
    ticker.style.transform = `translateX(${pos}px)`;

    // Reset position to loop seamlessly
    if (Math.abs(pos) >= ticker.scrollWidth / 2) {
      pos = 0;
    }
  }
  requestAnimationFrame(animateTicker);
}
animateTicker();

// Pause/resume on hover
ticker.parentElement.addEventListener("mouseenter", () => isTickerPaused = true);
ticker.parentElement.addEventListener("mouseleave", () => isTickerPaused = false);

// Events Carousel
let isCarouselPaused = false;

window.addEventListener('load', () => {
  const carousel = document.getElementById("carousel");
  const cards = carousel.querySelectorAll(".card");

  let index = 0;
  const cardWidth = cards[0].offsetWidth + 16; // 16px = gap between cards

  // Clone cards for smooth looping
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    carousel.appendChild(clone);
  });

  // Set transition once initially
  carousel.style.transition = "transform 0.5s ease-in-out";

  function scrollNextCard() {
    if (!isCarouselPaused) {
      index++;
      carousel.style.transform = `translateX(-${index * cardWidth}px)`;

      if (index >= cards.length) {
        setTimeout(() => {
          carousel.style.transition = "none";
          index = 0;
          carousel.style.transform = `translateX(0px)`;

          // Re-enable transition
          setTimeout(() => {
            carousel.style.transition = "transform 0.5s ease-in-out";
          }, 20);
        }, 500); // wait for current transition to finish
      }
    }
  }

  setInterval(scrollNextCard, 3000);

  // Pause/resume on hover
  const wrapper = document.querySelector(".event-carousel");
  wrapper.addEventListener("mouseenter", () => isCarouselPaused = true);
  wrapper.addEventListener("mouseleave", () => isCarouselPaused = false);
});

document.querySelectorAll('.announcement-item').forEach(item => {
  const scrollText = item.querySelector('.scroll-text');

  item.addEventListener('click', () => {
    const isOpening = !item.classList.contains('active');

    // Close other items
    document.querySelectorAll('.announcement-item').forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });

    // Toggle current item
    item.classList.toggle('active');

    // Reset all scroll-text animations
    document.querySelectorAll('.scroll-text').forEach(st => {
      st.style.animation = 'scroll-left 10s linear infinite';
      st.style.transform = 'translateX(100%)';
    });

    // If opening this item, stop animation
    if (isOpening) {
      scrollText.style.animation = 'none';
      scrollText.style.transform = 'translateX(0)';
    }
  });
});

const statsSections = document.querySelectorAll('.number-stats');

function handleParallax() {
  statsSections.forEach(section => {
    const img = section.querySelector('.parallax-img');
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    if (rect.top < windowHeight && rect.bottom > 0) {
      const scrollPercent = (windowHeight - rect.top) / (windowHeight + rect.height);
      const translateY = Math.min(scrollPercent, 1) * 300; // You can adjust this 300px for depth
      img.style.transform = `translateY(${translateY}px)`;
    }
  });

  requestAnimationFrame(handleParallax);
}

// Start animation loop
requestAnimationFrame(handleParallax);

function animateCountUp(el, duration = 2000) {
  const target = +el.getAttribute('data-count');
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1); // clamp between 0 and 1
    const currentValue = Math.floor(progress * target);
    el.textContent = `${currentValue}+`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${target}+`; // Ensure final value is exact
    }
  }

  requestAnimationFrame(update);
}

function animateCountUp(el, duration = 2000, suffix = '+') {
  const target = +el.getAttribute('data-count');
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // Ease-out effect (quadratic)
    const easedProgress = 1 - Math.pow(1 - progress, 3); // cubic ease-out

    const currentValue = Math.floor(easedProgress * target);
    el.textContent = `${currentValue}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = `${target}${suffix}`; // Ensure exact final value
    }
  }

  requestAnimationFrame(update);
}

document.addEventListener('DOMContentLoaded', () => {
  const containers = document.querySelectorAll('.number-stats, .achieve-cards');

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;

        target.querySelectorAll('.stats').forEach(el => {
          animateCountUp(el, 2000, '+');
        });

        target.querySelectorAll('.stats-1').forEach(el => {
          animateCountUp(el, 2000, 'th');
        });

        target.querySelectorAll('.stats-2').forEach(el => {
          animateCountUp(el, 2000, 'LPA');
        });

        observer.unobserve(target);
      }
    });
  }, {
    threshold: 0.5
  });

  containers.forEach(container => observer.observe(container));
});
document.addEventListener("DOMContentLoaded", () => {
  const trackInner = document.querySelector('.recruiter-track-inner');
  trackInner.innerHTML += trackInner.innerHTML; // Clone once for infinite feel
});
