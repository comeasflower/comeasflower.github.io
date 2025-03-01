document.addEventListener("DOMContentLoaded", function() {
    const listItems = document.querySelectorAll('.listMenu div');

    // 리스트 아이템 클릭 시 클래스 전환 처리
    listItems.forEach(item => {
        item.addEventListener('click', () => {
            listItems.forEach(el => {
                el.classList.remove('selectedList');
                el.classList.add('unselectedList');
            });

            item.classList.remove('unselectedList');
            item.classList.add('selectedList');
        });
    });

    // 슬라이더 부분
    const slider = document.querySelector('.slider');
    const slides = document.querySelectorAll('.exhib');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0;
    let isTransitioning = false;  // 트랜지션 중인지 체크
    const totalSlides = slides.length;

    // 슬라이드 복제: 첫 슬라이드를 마지막 슬라이드 뒤에, 마지막 슬라이드를 첫 슬라이드 앞에 복제
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[totalSlides - 1].cloneNode(true);
    
    slider.appendChild(firstClone);  // 첫 슬라이드 복제본을 끝에 추가
    slider.insertBefore(lastClone, slides[0]);  // 마지막 슬라이드 복제본을 맨 앞에 추가

    const slideWidth = slides[0].clientWidth;  // 슬라이드 너비 측정
    const actualSlidesCount = totalSlides + 2;  // 복제 슬라이드 포함하여 총 슬라이드 수

    slider.style.transform = `translateX(-${slideWidth}px)`;  // 복제된 첫 슬라이드 위치로 초기화

    // 슬라이드 이동 함수
    function updateSlide() {
        if (isTransitioning) return;  // 애니메이션 중일 때는 추가 동작 방지
        isTransitioning = true;

        slider.style.transition = 'transform 0.5s ease-in-out';
        slider.style.transform = `translateX(-${(currentSlide + 1) * slideWidth}px)`;  // 슬라이드 이동

        // 슬라이드 이동 후 처리
        slider.addEventListener('transitionend', () => {
            isTransitioning = false;

            // 첫 번째 슬라이드로 돌아오기
            if (currentSlide === totalSlides) {
                slider.style.transition = 'none';  // 애니메이션 없이 바로 이동
                slider.style.transform = `translateX(-${slideWidth}px)`;  // 복제된 슬라이드가 아닌 실제 첫 슬라이드로 이동
                currentSlide = 0;
            }

            // 마지막 슬라이드로 돌아가기
            if (currentSlide === -1) {
                slider.style.transition = 'none';
                slider.style.transform = `translateX(-${totalSlides * slideWidth}px)`;
                currentSlide = totalSlides - 1;
            }

            updateDots();  // 점(dot) 업데이트
        });
    }

    // 점(dot) 업데이트
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // 다음 슬라이드 버튼
    nextButton.addEventListener('click', () => {
        currentSlide++;
        updateSlide();
    });

    // 이전 슬라이드 버튼
    prevButton.addEventListener('click', () => {
        currentSlide--;
        updateSlide();
    });

    // 점(dot) 클릭 시 해당 슬라이드로 이동
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide();
        });
    });

    // 페이지 로드 시 슬라이드 초기화
    updateSlide();
});
