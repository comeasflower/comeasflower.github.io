document.addEventListener("DOMContentLoaded", function () {
    fetch("../json/members.json")
        .then(response => response.json()) 
        .then(data => {
            generateActiveMembers(data.active, "활동 중인 사람들", ".activeMembers");
            generateActiveMembers(data.past, "함께한 사람들", ".pastMembers");
        })
        .catch(error => console.error("JSON 로드 오류:", error));
});

// 활동 중인 사람들 - @ 추가하여 표시
function generateActiveMembers(members, title, targetSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    let html = `<div class="articleText">
                    <h1>${title}</h1>
                    <div class="articleTextInner">`;

    Object.keys(members).forEach(batch => {
        html += `<div class="innerText">
                    <h3>${batch}</h3>
                    <div>`;
        
        members[batch].forEach(person => {
            html += `<div class="nameList">
                        <p>${person.name}</p>`;
            if (person.contact) {
                let contact = person.contact.startsWith("@") ? person.contact : `@${person.contact}`;
                html += `<p>${contact}</p>`;
            }
            html += `</div>`;
        });

        html += `</div></div>`;
    });

    html += `</div></div>`;
    target.innerHTML = html;
}

// 함께한 사람들 - 3명씩 묶어서 표시 (인스타그램 아이디 제외)
function generatePastMembers(members, title, targetSelector) {
    const target = document.querySelector(targetSelector);
    if (!target) return;

    let html = `<div class="articleText">
                    <h1>${title}</h1>
                    <div class="articleTextInner">`;

    Object.keys(members).forEach(batch => {
        html += `<div class="innerText">
                    <h3>${batch}</h3>
                    <div>`;
        
        let groupedMembers = [];
        for (let i = 0; i < members[batch].length; i += 3) {
            groupedMembers.push(members[batch].slice(i, i + 3));
        }

        groupedMembers.forEach(group => {
            html += `<div class="nameList">`;
            group.forEach(person => {
                html += `<p>${person.name}</p>`;
            });
            html += `</div>`;
        });

        html += `</div></div>`;
    });

    html += `</div></div>`;
    target.innerHTML = html;
}
