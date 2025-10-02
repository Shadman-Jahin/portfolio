// * =============
// * LOADER
// * =============

window.addEventListener("load", () => {
    const navEntries = performance.getEntriesByType("navigation");
    const loadTime = navEntries.length
        ? navEntries[0].loadEventEnd - navEntries[0].startTime
        : performance.now();

    const minimumTime = 1000; // 1s 
    const remainingTime = Math.max(0, minimumTime - loadTime);

    setTimeout(() => {
        document.documentElement.style.setProperty("--scrollbar-width", ".5rem");
        document.querySelector(".loader-container")?.remove();

        // Run the animation function ONLY after the loader is gone
        runAfterPageLoad();
    }, remainingTime);
});

// ! RUN-AFTER-PAGE-LOAD FUNCTION START -----------------------------------

const runAfterPageLoad = () => {
    // * ===================================
    // * AOS INITIALIZE
    // * ===================================

    AOS.init({ once: false, duration: 1000, offset: 250, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' });

    // * ===================================
    // * TYPE.JS INITIALIZE
    // * ===================================
    const typed = new Typed('#type-anim', {
        strings: [
            'Shadman Jahin^2500', // 2s delay after first sentence
            'a Front End <br> Web Developer^4000'
        ],
        typeSpeed: 50,
        loop: true
    });
}

// ! RUN-AFTER-PAGE-LOAD FUNCTION END -----------------------------------


document.addEventListener("DOMContentLoaded", () => {
    // * ========================================
    // * LENIS INTIALIZATION
    // * ========================================

    const lenis = new Lenis({
        duration: 1, // Duration of the smooth scroll animation in seconds
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
        direction: 'vertical', // vertical, horizontal
        gestureDirection: 'vertical', // vertical, horizontal, both
        smoothWheel: true, // Enables smooth scrolling for mouse wheel
        wheelMultiplier: 1, // Adjust scroll speed for mouse wheel
        smoothTouch: false, // Disables smooth scrolling for touch devices (often better for mobile performance)
        touchMultiplier: 2, // Adjust scroll speed for touch
        infinite: false, // Enables infinite scroll
        autoRaf: true, // Automatically calls lenis.raf(time) using requestAnimationFrame
    });


    // * ===================================
    // * BOOTSTRAP TOOLTIP INITIALIZE
    // * ===================================

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    tooltipTriggerList.forEach(el => {
        el.addEventListener('shown.bs.tooltip', () => {
            setTimeout(() => {
                bootstrap.Tooltip.getInstance(el).hide();
            }, 2000);
        });
    });

    // // * =====================================
    // // * VIDEO PLAYER
    // // * =====================================
    // const videoContainer = document.querySelector(".video-container");
    // const video = videoContainer.querySelector("video");
    // const playButton = videoContainer.querySelector("#play-button");

    // // Function to toggle play and pause state
    // const togglePlayState = () => {
    //     if (video.paused) {
    //         video.play();
    //         playButton.style.display = "none";
    //         video.controls = true;
    //     } else {
    //         video.pause();
    //         playButton.style.display = "block";
    //     }
    // };

    // // Event listener for the custom play button
    // playButton.addEventListener("click", togglePlayState);

    // // Event listener for when the video ends
    // video.addEventListener("ended", () => {
    //     playButton.style.display = "block";
    //     video.controls = false;
    // });


    //  * ===========================================
    //  * BOX GRADIENT MOVE EFFECT BY MOUSE
    //  * ===========================================


    // Get all the box elements
    const boxes = document.querySelectorAll("#projects .box");

    // Iterate over each box and add a unique event listener
    boxes.forEach((elm, index) => {
        // Select the box-bottom element within the current box
        const boxBottom = elm.querySelector(".box-bottom");

        if (boxBottom) {
            // Construct the unique gradient IDs based on the loop index
            const radialGradientId = `box-bg-${index + 1}-radial`;
            const linearGradientId = `box-bg-${index + 1}-linear`;

            // Select the gradients relative to the current box's SVG
            const gradient = elm.querySelector(`#${radialGradientId}`);
            const strokeGradient = elm.querySelector(`#${linearGradientId}`);

            // Add a mousemove event listener to the individual box-bottom element
            boxBottom.addEventListener('mousemove', (event) => {
                // Get the mouse coordinates relative to the current box
                const rect = boxBottom.getBoundingClientRect();
                const mouseX = event.clientX - rect.left;
                const mouseY = event.clientY - rect.top;

                // Update the gradients for this specific box
                if (gradient) {
                    const newTransform = `translate(${mouseX} ${mouseY}) rotate(135.129) scale(447.501 447.501)`;
                    gradient.setAttribute('gradientTransform', newTransform);
                }

                if (strokeGradient) {
                    strokeGradient.setAttribute("x1", `${mouseX}`);
                    strokeGradient.setAttribute("y1", `${mouseY}`);
                }
            });
        }
    });



    // * ==========================================
    // * PROJECT VIDEO INTERACTION
    // * ==========================================

    // Select all card elements
    const cards = document.querySelectorAll('#projects .box');

    cards.forEach(card => {
        // Find the video element within the current card
        const video = card.querySelector('#projects .project-video');

        // Add event listener for when the mouse enters the card
        card.addEventListener('mouseenter', () => {
            // Check if the video is ready to play
            if (video.readyState >= 2) {
                // Reset video to the beginning for a fresh loop
                video.currentTime = 0;
                video.play().catch(error => {
                    // Handle potential browser restrictions on autoplay
                    console.error("Autoplay prevented:", error);
                });
            } else {
                // If not ready, explicitly load it and then play (for 'preload="none"')
                video.load();
                video.play().catch(error => {
                    console.error("Autoplay prevented after load:", error);
                });
            }
        });

        // Add event listener for when the mouse leaves the card
        card.addEventListener('mouseleave', () => {
            // Pause the video
            video.pause();

            // To be extra clean, set the current time back to 0
            video.currentTime = video.duration;
        });
    });


    // * ==========================================
    // * CUSTOM SCROLL SPY
    // * ==========================================

    const sections = document.querySelectorAll("section");
    const links = document.querySelectorAll("#custom-scroll-spy a");

    // ⭐️ Adjust this value to the actual height of your fixed navigation/header
    const headerHeight = 80;

    const observerOptions = {
        root: null,
        // Top margin: Negative value equal to header height (e.g., -80px)
        // Bottom margin: Large negative percentage (e.g., -80%) to shrink the detection area.
        rootMargin: `-${headerHeight}px 0px -80% 0px`,
        threshold: 0.01 // Only needs to barely cross the line
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Only proceed if the section is intersecting the defined rootMargin area
            if (entry.isIntersecting) {
                let id = entry.target.getAttribute("id");

                // Your custom logic for section ID mapping
                if (id === "hire") { id = "projects"; }

                // Remove 'active' from all links
                links.forEach(anchor => {
                    anchor.classList.remove("active");
                });

                // Add 'active' to the corresponding link
                document.querySelector(`#custom-scroll-spy a[href*='${id}']`)?.classList.add("active");
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });



});