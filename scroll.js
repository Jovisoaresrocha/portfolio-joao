const container = document.querySelector('.baus');

container.addEventListener('wheel', (e)=> {
    e.preventDefault();
    container.scrollLeft += e.deltaY;
})