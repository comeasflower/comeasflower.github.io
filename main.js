window.onresize = function(){
    document.location.reload();
};

document.addEventListener("DOMContentLoaded", function() {
    const listItems = document.querySelectorAll('.listMenu li');
    const sections = Array.from(document.querySelectorAll('main > section'));
    const offset = 150;  // 스크롤 오프셋 값

    // 리스트 메뉴 클릭 시 해당 섹션으로 이동
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            listItems.forEach(el => el.classList.replace('selectedList', 'unselectedList'));

            item.classList.replace('unselectedList', 'selectedList');

            const year = item.textContent.trim();
            const targetSection = document.getElementById(year);

            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 스크롤에 따라 현재 보이는 섹션에 맞춰 리스트 메뉴 항목 강조
    window.addEventListener("scroll", function() {
        let scrollPosition = window.scrollY;

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop - offset && scrollPosition < sectionTop + sectionHeight - offset) {
                const sectionYear = section.id;
                
                listItems.forEach(item => {
                    if (item.textContent.trim() === sectionYear) {
                        item.classList.replace('unselectedList', 'selectedList');
                    } else {
                        item.classList.replace('selectedList', 'unselectedList');
                    }
                });
            }
        });
    });
});

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



window.onload = function () {
    const images = document.querySelectorAll(".border"); // 모든 이미지 선택

    images.forEach(img => {
        if (img.complete) {
            applyBorder(img); // 이미 로드된 이미지 처리
        } else {
            img.onload = function () {
                applyBorder(img); // 이미지 로드 후 처리
            };
        }
    });
};

function applyBorder(img) {
    const avgColor = getAverageColor(img);
    img.style.border = `1px solid ${avgColor}`; // 테두리 적용
    console.log(`Border applied: ${avgColor}`);
}

function getAverageColor(imgElement) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = imgElement.naturalWidth;
    canvas.height = imgElement.naturalHeight;
    ctx.drawImage(imgElement, 0, 0);

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    let r = 0, g = 0, b = 0, count = 0;
    
    for (let i = 0; i < pixels.length; i += 4) {
        r += pixels[i];     // Red
        g += pixels[i + 1]; // Green
        b += pixels[i + 2]; // Blue
        count++;
    }

    r = Math.floor(r / count);
    g = Math.floor(g / count);
    b = Math.floor(b / count);

    return `rgb(${r}, ${g}, ${b})`;
}
