document.addEventListener("DOMContentLoaded", function () {
    fetch("../json/members.json")
        .then(response => response.json()) 
        .then(data => {
            generateMembersSection(data.active, "활동 중인 사람들", ".activeMembers");
            generateMembersSection(data.past, "함께한 사람들", ".pastMembers");
        })
        .catch(error => console.error("JSON 로드 오류:", error));
});

function generateMembersSection(members, title, targetSelector) {
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
