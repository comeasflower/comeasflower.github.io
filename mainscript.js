document.addEventListener("DOMContentLoaded", function() {
  const div2 = document.querySelector(".div2");
  const div3 = document.querySelector(".div3");

  const originalTextDiv2 = div2.innerHTML; // innerHTML로 변경
  const originalTextDiv3 = div3.innerHTML; // innerHTML로 변경

  div2.addEventListener("mouseenter", function() {
      div2.innerHTML = "꽃 소식"; // 텍스트 변경
  });

  div2.addEventListener("mouseleave", function() {
      div2.innerHTML = originalTextDiv2; // 원래 텍스트로 복원
  });

  div3.addEventListener("mouseenter", function() {
      div3.innerHTML = "꽃 프로젝트<br>아카이빙"; // 텍스트 변경
  });

  div3.addEventListener("mouseleave", function() {
      div3.innerHTML = originalTextDiv3; // 원래 텍스트로 복원
  });
});
