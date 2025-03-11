let timeout; // 타이머 변수
const idleTime = 300000; // 30초 (밀리초 단위)

function resetTimer() {
    clearTimeout(timeout); // 기존 타이머 삭제
    timeout = setTimeout(() => {
        window.location.href = '../../index.html'; // 이동할 페이지 설정
    }, idleTime);
}

// 마우스가 움직이면 타이머 리셋
document.addEventListener('mousemove', resetTimer);
document.addEventListener('keydown', resetTimer); // 키 입력도 감지 (선택 사항)

// 초기에 타이머 시작
resetTimer();

function goBack()   {
    if (document.referrer) {
        sessionStorage.setItem("scrollPosition", window.scrollY); // 현재 스크롤 위치 저장
        history.back();
    } else {
        window.location.href = '/index.html';
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const offset = 150;
    const listItems = document.querySelectorAll('.listMenu li');
    const sections = Array.from(document.querySelectorAll('main > section'));

    function scrollToSection(targetId) {
        const target = document.getElementById(targetId);
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        }
    }

    // 라디오 버튼 클릭 시 섹션 이동 처리
    document.querySelectorAll(".radioButton a").forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").split("#")[1];
            if (window.location.pathname.includes("archive.html")) {
                scrollToSection(targetId);
            } else {
                window.location.href = link;
            }
        });
    });

    // 페이지 로드 시 URL 해시 값이 있으면 해당 섹션으로 이동
    if (window.location.hash) {
        setTimeout(() => {
            scrollToSection(window.location.hash.substring(1));
        }, 100);
    }

    // 리스트 메뉴 클릭 시 섹션 이동
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            listItems.forEach(el => el.classList.remove('selected'));
            item.classList.add('selected');
            scrollToSection(item.textContent.trim());
        });
    });

    // 스크롤에 따라 현재 보이는 섹션에 맞춰 리스트 메뉴 항목 강조
    window.addEventListener("scroll", function () {
        let scrollPosition = window.scrollY;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop - offset && scrollPosition < sectionTop + sectionHeight - offset) {
                const sectionYear = section.id;
                listItems.forEach(item => {
                    item.classList.toggle('selected', item.textContent.trim() === sectionYear);
                });
            }
        });
    });

    // 뒤로가기 시 스크롤 위치 저장 및 복원
    window.addEventListener("load", function () {
        const scrollPosition = sessionStorage.getItem("scrollPosition");
        if (scrollPosition !== null) {
            window.scrollTo(0, parseInt(scrollPosition, 10));
            sessionStorage.removeItem("scrollPosition");
        }
    });

    window.addEventListener("beforeunload", function () {
        sessionStorage.setItem("scrollPosition", window.scrollY);
    });

    // 모바일 메뉴 토글
    const menuButton = document.querySelector(".hambugerMenu");
    const closeButton = document.querySelector(".close");
    const mobileMenu = document.querySelector(".mobilePageMenu");

    menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
    });

    window.addEventListener("popstate", () => {
        if (mobileMenu.classList.contains("active")) {
            mobileMenu.classList.remove("active");
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 1200) {
            mobileMenu.classList.remove("active");
        }
    });

    // 수평 스크롤 기능
    const worksList = document.querySelector(".worksList");
    let scrollAmount = 0;
    let isScrolling = false;

    worksList.addEventListener("wheel", (event) => {
        event.preventDefault();
        scrollAmount += event.deltaY * 0.5;
        if (!isScrolling) {
            isScrolling = true;
            smoothScroll();
        }
    });

    function smoothScroll() {
        if (Math.abs(scrollAmount) > 1) {
            worksList.scrollLeft += scrollAmount * 0.1;
            scrollAmount *= 0.9;
            requestAnimationFrame(smoothScroll);
        } else {
            isScrolling = false;
        }
    }

    // 슬라이더 기능
    const slider = document.querySelector('.slider');
    let slides = document.querySelectorAll('.exhib');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let isTransitioning = false;
    const totalSlides = slides.length;

    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    slides = document.querySelectorAll('.exhib');
    slider.style.transform = `translateX(-100%)`;

    let autoSlideInterval = setInterval(() => moveSlide(1), 3000);

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
        dots.forEach((dot, index) => dot.classList.toggle('active', index === currentSlide));
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        setTimeout(() => (autoSlideInterval = setInterval(() => moveSlide(1), 3000)), 5000);
    }

    nextButton.addEventListener('click', () => { moveSlide(1); resetAutoSlide(); });
    prevButton.addEventListener('click', () => { moveSlide(-1); resetAutoSlide(); });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => { currentSlide = index; moveSlide(0); resetAutoSlide(); });
    });

    // 이미지 테두리 색상 설정
    const images = document.querySelectorAll(".border");
    images.forEach(img => {
        if (img.complete) applyBorder(img);
        else img.onload = () => applyBorder(img);
    });

    function applyBorder(img) {
        const avgColor = getAverageColor(img);
        img.style.border = `1px solid ${avgColor}`;
    }

    function getAverageColor(imgElement) {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = imgElement.naturalWidth;
        canvas.height = imgElement.naturalHeight;
        ctx.drawImage(imgElement, 0, 0);
        const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
        let r = 0, g = 0, b = 0, count = 0;
        for (let i = 0; i < pixels.length; i += 4) {
            r += pixels[i]; g += pixels[i + 1]; b += pixels[i + 2]; count++;
        }
        return `rgb(${Math.floor(r / count)}, ${Math.floor(g / count)}, ${Math.floor(b / count)})`;
    }
});
