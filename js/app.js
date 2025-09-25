document.addEventListener("DOMContentLoaded", () => {
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

    // * =====================================
    // * VIDEO PLAYER
    // * =====================================
    const videoContainer = document.querySelector(".video-container");
    const video = videoContainer.querySelector("video");
    const playButton = videoContainer.querySelector("#play-button");

    // Function to toggle play and pause state
    const togglePlayState = () => {
        if (video.paused) {
            video.play();
            playButton.style.display = "none";
            video.controls = true;
        } else {
            video.pause();
            playButton.style.display = "block";
        }
    };

    // Event listener for the custom play button
    playButton.addEventListener("click", togglePlayState);

    // Event listener for when the video ends
    video.addEventListener("ended", () => {
        playButton.style.display = "block";
        video.controls = false;
    });


    //  * ===========================================
    //  * BOX GRADIENT MOVE EFFECT BY MOUSE
    //  * ===========================================

    // Get the SVG element and the radial gradient
    const boxBottom = document.querySelector(".box .box-bottom");
    const gradient = boxBottom.querySelector('#box-bg #paint0_radial_77_231');

    boxBottom.addEventListener('mousemove', (event) => {
        // Get the mouse coordinates relative to the SVG element
        const rect = boxBottom.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Update the gradient's transform attribute
        // The translate values are now based on the direct pixel position of the mouse
        const newTransform = `translate(${mouseX} ${mouseY}) rotate(135.129) scale(447.501 447.501)`;
        gradient.setAttribute('gradientTransform', newTransform);
    });


})