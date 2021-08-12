const slider = function() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const maxSlide = slides.length;
    const btnLeft = document.querySelector('.slider__btn--left');
    const btnRight = document.querySelector('.slider__btn--right');
    const dotContainer = document.querySelector('.dots');

    const createDots = function () {
        slides.forEach(function (_, i) {
            dotContainer.insertAdjacentHTML('beforeend',
             `<button class="dots__dot" data-slide="${i}"></button>`)
        });
    };



    const activateDot = function(slide) {
        document.querySelectorAll('.dots__dot')
        .forEach(dot => dot.classList.remove('dots__dot--active'));
        document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
    };

    const goToSlide = function (slide) {
        slides.forEach(
            (s, i) => (s.style.transform = `translateX(${100 * (i - slide) }%)`)
        );
    };



    const nextSlide = function () {
        if (currentSlide === maxSlide - 1) {
            currentSlide = 0;
        } else {
            currentSlide++;
        }

        slides.forEach((slide, i) =>
            (slide.style.transform = `translateX(${100 * (i - currentSlide)}%)`));
        goToSlide(currentSlide);
        activateDot(currentSlide);
    }

    const prevSlide = function () {
        if (currentSlide === 0) {
            currentSlide = maxSlide - 1;
        } else {
            currentSlide--;
        }

        goToSlide(currentSlide);
        activateDot(currentSlide);
    }

    const init = function (){
        goToSlide(0);
        createDots();
        activateDot(0);
    }
    init();

    btnRight.addEventListener('click', nextSlide);
    btnLeft.addEventListener('click', prevSlide);

    document.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();

    });

    dotContainer.addEventListener('click', function(e){
        if(e.target.classList.contains('dots__dot')){
            const { slide } = e.target.dataset;
            goToSlide(slide);
            activateDot(slide);
        }
    });
};

slider();