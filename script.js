// Плавное появление элементов при прокрутке

const elements = document.querySelectorAll(
    '.product, .feature, .about-text, .about-stat'
);

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    },
    {
        threshold: 0.15
    }
);

elements.forEach((element) => {
    element.classList.add('hidden');
    observer.observe(element);
});