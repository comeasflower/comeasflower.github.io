document.addEventListener("DOMContentLoaded", function () {
    const contentLeft = document.querySelector(".allimContainer");
    const contentRight = document.getElementById("content");

    fetch("../js/allim.json")
        .then(response => response.json())
        .then(data => {
            contentLeft.innerHTML = ""; // 기존 목록 비우기

            let firstItemSelected = window.innerWidth > 1200; // 기본 선택 여부 결정

            data.forEach((item, index) => {
                const noticeItem = document.createElement("div");
                noticeItem.classList.add("notice-item");

                if (index === 0 && firstItemSelected) {
                    noticeItem.classList.add("selected");
                    updateContent(item, false); // 초기 상태에선 history.pushState 하지 않음
                }
                noticeItem.innerHTML = `
                    <h3 class="notice-title">${item.title}</h3>
                    <p class="notice-date">${item.date}</p>
                `;

                contentLeft.appendChild(noticeItem);

                noticeItem.addEventListener("click", function () {
                    document.querySelectorAll(".notice-item").forEach(el => el.classList.remove("selected"));
                    this.classList.add("selected");

                    updateContent(item, true); // 클릭 시에는 history.pushState 실행

                    if (window.innerWidth <= 1200) {
                        contentRight.classList.add("show");
                    }
                });
            });
        })
        .catch(error => console.error("JSON 불러오기 실패:", error));

    function updateContent(item, addToHistory) {
            contentRight.innerHTML = `
            <div class="notice-contents">
            <div class="notice-contents-inner">
            <h2>${item.title}</h2>
            ${item.contents.map(para => `<p>${para}</p>`).join("")}
            </div>
            <p class="notice-date-right">${item.date}</p>
            </div>
        `;

        if (addToHistory) {
            history.pushState({ show: true }, null, location.href);
        }

        // 닫기 버튼 이벤트 리스너
        document.getElementById("closeContent").addEventListener("click", function () {
            contentRight.classList.remove("show");

            if (history.state && history.state.show) {
                history.replaceState(null, null, location.href); // 히스토리 수정하여 뒤로가기 방지
            }
        });
    }

    // 뒤로 가기(`popstate` 이벤트) 처리
    window.addEventListener("popstate", function () {
        if (contentRight.classList.contains("show")) {
            contentRight.classList.remove("show");
        }
    });
});