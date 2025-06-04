// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    function setActiveLink() {
        let index = sections.length;

        while (--index && window.scrollY +200< sections[index].offsetTop) {}

        navLinks.forEach((link) => link.classList.remove('active'));
        navLinks[index].classList.add('active');
    }

    window.addEventListener('scroll', setActiveLink);
    setActiveLink(); // Initialize the active link on page load
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.section-to-animate').forEach(section => {
  observer.observe(section);
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navContent = document.querySelector('.nav-content');

    if (hamburgerMenu && navContent) {
        hamburgerMenu.addEventListener('click', function() {
            navContent.classList.toggle('active');
        });
    }

    // Optional: Close mobile menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navContent.classList.contains('active')) {
                navContent.classList.remove('active');
            }
        });
    });

    // AOS Initialization
    AOS.init();
});

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll(".flip-card-inner");
    let currentIndex = 0;
    let autoFlipInterval;
    let userInteractionTimeout;

    // Function to flip the next card automatically
    function flipNextCard() {
        // Reset all cards to the front side
        resetAllCards();

        // Flip the current card
        cards[currentIndex].classList.add('flipped');

        // Move to the next card, or loop back to the first one
        currentIndex = (currentIndex + 1) % cards.length;
    }

    // Function to reset all cards to the front side
    function resetAllCards() {
        cards.forEach(card => card.classList.remove('flipped'));
    }

    // Function to start the automatic flipping process
    function startAutoFlipping() {
        autoFlipInterval = setInterval(flipNextCard, 2000); // Adjust time as needed
    }

    // Function to stop the automatic flipping process
    function stopAutoFlipping() {
        clearInterval(autoFlipInterval);
    }

    // Function to restart the auto-flipping after user interaction
    function restartAutoFlippingAfterDelay() {
        stopAutoFlipping(); // Stop any ongoing auto-flipping
        clearTimeout(userInteractionTimeout); // Clear any existing timeout
        userInteractionTimeout = setTimeout(startAutoFlipping, 2000); // Restart after 2 seconds
    }

    // Set event listeners on each card for user interaction
    cards.forEach(card => {
        // Stop auto-flipping and reset all cards when the user clicks a card
        card.addEventListener('click', function() {
            // Reset all cards to front side
            resetAllCards();

            // Toggle the flip state of the clicked card
            card.classList.toggle('flipped');
            
            // Stop and restart auto-flipping
            stopAutoFlipping();
            restartAutoFlippingAfterDelay();
        });

        // Stop auto-flipping when the user hovers over a card
        card.addEventListener('mouseenter', function() {
            stopAutoFlipping(); // Stop auto-flipping on hover
            resetAllCards();
            clearTimeout(userInteractionTimeout); // Clear any pending restart
        });

        // Restart auto-flipping after the user stops hovering
        card.addEventListener('mouseleave', function() {
            restartAutoFlippingAfterDelay(); // Restart after hover ends
        });
    });

    // Start the automatic flipping process with a delay (e.g., 3 seconds)
    setTimeout(function() {
        startAutoFlipping();
    }, 0); // Initial delay before auto-flipping starts
});

