document.addEventListener("DOMContentLoaded", function() {
    const listItems = document.querySelectorAll('.listMenu div');

    listItems.forEach(item => {
        item.addEventListener('click', () => {
            listItems.forEach(el => {
                el.classList.remove('selectedList');
                el.classList.add('unselectedList');
            });

            item.classList.remove('unselectedList');
            item.classList.add('selectedList');

            const year = item.textContent.trim();
            const targetSection = document.getElementById(year);

            if (targetSection) {
                const targetPosition = targetSection.getBoundingClientRect().top + window.scrollY;
                const offset = 160;

                window.scrollTo({
                    top: targetPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });
});
