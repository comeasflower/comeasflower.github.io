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
        });
    });
});