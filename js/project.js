document.addEventListener("DOMContentLoaded", async () => {
    try {
        // 📌 JSON 파일 불러오기
        const response = await fetch("../../json/project.json");
        const jsonData = await response.json();

        // 📌 현재 HTML 문서의 제목 가져오기 (앞부분 10글자 제외)
        const pageTitle = document.title.trim().substring(10);

        // 📌 JSON에서 현재 페이지 제목과 일치하는 프로젝트 찾기
        const project = jsonData["12.0projects"].find(p => p.name === pageTitle);
        if (!project) {
            console.warn("⚠️ 일치하는 프로젝트를 찾을 수 없습니다.");
            return;
        }

        // 📌 HTML 요소 선택
        const elements = {
            title: document.querySelector(".flowerNightExplanation h2"),
            descriptionParagraphs: document.querySelectorAll(".flowerNightText p"),
            worksList: document.querySelector(".worksList")
        };

        // 📌 프로젝트 데이터 삽입
        if (elements.title) elements.title.textContent = project.name;

        if (elements.descriptionParagraphs.length > 0) {
            // description을 첫 번째 p에 넣고, 그 다음 p에 작업 기간과 결과물 형태 추가
            elements.descriptionParagraphs[0].textContent = project.description;
            if (elements.descriptionParagraphs[1]) elements.descriptionParagraphs[1].textContent = `작업 기간: ${project.duration}`;
            if (elements.descriptionParagraphs[2]) elements.descriptionParagraphs[2].textContent = `결과물 형태: ${project.output}`;
        }

        // 📌 works 데이터 추가
        if (elements.worksList) {
            elements.worksList.innerHTML = ""; // 기존 내용 초기화

            project.works.forEach(work => {
                const workDiv = document.createElement("div");
                workDiv.classList.add("work");

                // title이 있을 때만 대괄호와 함께 출력
                const workTitle = work.title ? `[${work.title}] ` : '';
                const workDescription = workTitle + work.description;

                workDiv.innerHTML = `
                    <img style="border: 1px solid" class="workImg border" src="https://drive.google.com/thumbnail?id=${work.image}&sz=w1000" alt="">
                    <h3>${work.creator}</h3>
                    <p>${workDescription}</p>
                `;
                elements.worksList.appendChild(workDiv);
            });
        }

    } catch (error) {
        console.error("❌ 데이터를 불러오는 중 오류 발생:", error);
    }
});
