document.addEventListener("DOMContentLoaded", async () => {
  const elements = {
    title: document.querySelector(".flowerNightExplanation h2"),
    descriptionParagraphs: document.querySelectorAll(".flowerNightText p"),
    worksList: document.querySelector(".worksList"),
  };

  if (
    !elements.title ||
    elements.descriptionParagraphs.length === 0 ||
    !elements.worksList
  ) {
    return;
  }

  try {
    const response = await fetch("../../json/project.json");
    const jsonData = await response.json();

    const projects = Array.isArray(jsonData["12.0projects"])
      ? jsonData["12.0projects"]
      : [];

    const projectId = getProjectId();
    const project = findProject(projects, projectId);

    if (!project) {
      console.warn("일치하는 프로젝트를 찾을 수 없습니다.", { projectId });
      renderEmptyState(elements);
      return;
    }

    renderProject(elements, project);
  } catch (error) {
    console.error("프로젝트 데이터를 불러오는 중 오류 발생:", error);
    renderErrorState(elements);
  }
});

function getProjectId() {
  const bodyId = document.body.dataset.projectId;
  if (bodyId) return bodyId;

  const fileName = window.location.pathname.split("/").pop() || "";
  const idFromPath = fileName.replace(".html", "");
  if (idFromPath) return idFromPath;

  return "";
}

function findProject(projects, projectId) {
  if (!projectId) return null;

  return (
    projects.find((project) => project.id === projectId) ||
    projects.find((project) => project.slug === projectId) ||
    null
  );
}

function renderProject(elements, project) {
  elements.title.textContent = project.name || "";

  const [descriptionEl, durationEl, outputEl] = elements.descriptionParagraphs;

  if (descriptionEl) {
    descriptionEl.textContent = project.description || "";
  }

  if (durationEl) {
    durationEl.textContent = project.duration
      ? `작업 기간: ${project.duration}`
      : "";
  }

  if (outputEl) {
    outputEl.textContent = project.output
      ? `결과물 형태: ${project.output}`
      : "";
  }

  renderWorks(elements.worksList, project.works || []);
}

function renderWorks(container, works) {
  container.innerHTML = "";

  works.forEach((work) => {
    const workDiv = document.createElement("div");
    workDiv.className = "work";

    const workTitle = work.title ? `[${work.title}] ` : "";
    const workDescription = `${workTitle}${work.description || ""}`;
    const imageUrl = work.image
      ? `https://drive.google.com/thumbnail?id=${work.image}&sz=w1000`
      : "";

    workDiv.innerHTML = `
      ${
        imageUrl
          ? `<img class="workImg border" src="${imageUrl}" alt="${work.creator || project.name || "작업 이미지"}">`
          : ""
      }
      <h3>${work.creator || ""}</h3>
      <p>${workDescription}</p>
    `;

    container.appendChild(workDiv);
  });
}

function renderEmptyState(elements) {
  elements.title.textContent = "프로젝트를 찾을 수 없습니다.";

  const [descriptionEl, durationEl, outputEl] = elements.descriptionParagraphs;

  if (descriptionEl)
    descriptionEl.textContent = "프로젝트 정보가 아직 연결되지 않았습니다.";
  if (durationEl) durationEl.textContent = "";
  if (outputEl) outputEl.textContent = "";

  if (elements.worksList) {
    elements.worksList.innerHTML = "";
  }
}

function renderErrorState(elements) {
  elements.title.textContent = "프로젝트를 불러오지 못했습니다.";

  const [descriptionEl, durationEl, outputEl] = elements.descriptionParagraphs;

  if (descriptionEl) descriptionEl.textContent = "잠시 후 다시 시도해 주세요.";
  if (durationEl) durationEl.textContent = "";
  if (outputEl) outputEl.textContent = "";

  if (elements.worksList) {
    elements.worksList.innerHTML = "";
  }
}
