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


})