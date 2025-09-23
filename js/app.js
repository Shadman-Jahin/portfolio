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
})