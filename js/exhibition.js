document.addEventListener("DOMContentLoaded", function () {
    const params = new URLSearchParams(window.location.search);
    const eventName = params.get("name"); // URL에서 `name` 값 가져오기

    if (!eventName) {
        console.error("전시 이름이 없습니다.");
        return;
    }

    fetch("../../json/exhibitions.json") // JSON 데이터 불러오기
        .then(response => response.json())
        .then(data => {
            const event = data.exhibitions.find(item => item.name === eventName);

            if (!event) {
                console.error("해당 전시를 찾을 수 없습니다.");
                return;
            }

            document.title = `꽃밤 - ${event.name}`;
            document.querySelector(".flowerNight img").src = event.image;
            document.querySelector(".flowerNight h2").textContent = event.name;

            // 설명이 있을 경우 추가
            const descriptionElement = document.querySelector(".flowerNightText p:first-child");
            if (event.description) {
                descriptionElement.innerHTML = event.description.join("<br><br>");
            } else {
                descriptionElement.style.display = "none"; // 설명 없으면 숨김
            }

            document.querySelector(".flowerNightText p:nth-child(2)").innerHTML = 
                `기간: ${event.duration}<br>장소: ${event.place}`;

            // 참여자 정보가 있는 경우 추가
            const participantsElement = document.querySelector(".flowerNightText p:nth-child(3)");
            if (event.participant) {
                participantsElement.innerHTML = `참여자:<br>${event.participant.replace(/\s+/g, "<br>")}`;
            } else {
                participantsElement.style.display = "none"; // 참여자 정보 없으면 숨김
            }
        })
        .catch(error => console.error("데이터 로드 실패:", error));
});
