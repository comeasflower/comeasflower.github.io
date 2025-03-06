document.addEventListener("DOMContentLoaded", async () => {
    try {
        // JSON 파일 불러오기
        const response = await fetch("../js/project.json"); // JSON 파일 경로
        const jsonData = await response.json();

        // 현재 HTML 문서의 제목 가져오기
        const pageTitle = document.title.trim().substring(10);

        // projects에서 현재 페이지 제목과 같은 name을 가진 프로젝트 찾기
        const project = jsonData["12.0projects"].find(p => p.name === pageTitle);

        if (!project) {
            console.warn("일치하는 프로젝트를 찾을 수 없습니다.");
            return;
        }

        // works 데이터 가져와서 .worksList에 추가
        const worksList = document.querySelector(".worksList");
        project.works.forEach(work => {
            const workDiv = document.createElement("div");
            workDiv.classList.add("work");

            workDiv.innerHTML = `
                <img class="workImg border" src="https://drive.google.com/thumbnail?id=${work.image}&sz=w1000" alt="">
                <h3>${work.creator}</h3>
                <p>[${work.title}] ${work.description}</p>
            `;

            worksList.appendChild(workDiv);
        });

    } catch (error) {
        console.error("데이터를 불러오는 중 오류 발생:", error);
    }
});