document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.slider');
    let slides = document.querySelectorAll('.exhib');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    let isTransitioning = false;
    const totalSlides = slides.length;

    // 첫 번째 및 마지막 슬라이드 복제
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    // 다시 요소 가져오기
    slides = document.querySelectorAll('.exhib');
    const actualSlidesCount = slides.length;

    // 초기 위치 설정 (첫 번째 복제본이 보이도록)
    slider.style.transform = `translateX(-100%)`;

    let autoSlideInterval;

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(() => {
            moveSlide(1);
        }, 3000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    function moveSlide(direction) {
        if (isTransitioning) return;
        isTransitioning = true;

        currentSlide += direction;
        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(-${(currentSlide + 1) * 100}%)`;

        slider.addEventListener('transitionend', () => {
            isTransitioning = false;

            if (currentSlide === totalSlides) {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-100%)`;
                currentSlide = 0;
            }

            if (currentSlide === -1) {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-${totalSlides * 100}%)`;
                currentSlide = totalSlides - 1;
            }

            updateDots();
        }, { once: true });
    }

    function updateDots() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function resetAutoSlide() {
        stopAutoSlide();
        setTimeout(startAutoSlide, 5000); // 5초 후 자동 슬라이드 재개
    }

    nextButton.addEventListener('click', () => {
        moveSlide(1);
        resetAutoSlide();
    });

    prevButton.addEventListener('click', () => {
        moveSlide(-1);
        resetAutoSlide();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            moveSlide(0);
            resetAutoSlide();
        });
    });

    startAutoSlide();
});