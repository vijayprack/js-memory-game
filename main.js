let cardsArray = [
    { "name": "CSS", "img": "https://img.freepik.com/free-icon/css_318-698167.jpg?w=2000", },
    { "name": "HTML", "img": "https://www.w3.org/html/logo/downloads/HTML5_Logo_512.png", },
    { "name": "jQuery", "img": "https://avatars.githubusercontent.com/u/70142?s=280&v=4", },
    { "name": "JS", "img": "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/javascript/javascript.png", },
    { "name": "Node", "img": "https://play-lh.googleusercontent.com/cThCAe5WTqco7-lriZ8nEgcL1El-BCv13g5CMV_PUMLkPXYkEaQ4o6hTfwyseyB9jRM", },
    { "name": "Photo Shop", "img": "https://cdn-icons-png.flaticon.com/512/1/1781.png", },
    { "name": "PHP", "img": "https://ih1.redbubble.net/image.2557448047.7938/mo,small,flatlay,product_square,600x600.jpg", },
    { "name": "Python", "img": "https://learnbatta.com/assets/images/python/python-logo.png", },
    { "name": "Ruby", "img": "https://logoisus.com/wp-content/uploads/2021/01/ruby_ib1il.jpg", },
    { "name": "Sass", "img": "https://sass-lang.com/assets/img/styleguide/seal-color-aef0354c.png", },
    { "name": "Sublime", "img": "https://www.pngitem.com/pimgs/m/422-4223360_transparent-sublime-text-icon-hd-png-download.png", },
    { "name": "Wordpress", "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Wordpress_Blue_logo.png/1200px-Wordpress_Blue_logo.png", },
];

let gameGrid = cardsArray.concat(cardsArray);
gameGrid.sort(() => 0.5 - Math.random());

let game = document.getElementById('game-board');
let grid = document.createElement('section');

grid.setAttribute('class', 'grid');
game.appendChild(grid);

for (let i = 0; i < gameGrid.length; i++) {

    let card = document.createElement('div');
    card.classList.add('card');

    card.dataset.name = gameGrid[i].name;

    let front = document.createElement('div');
    front.classList.add('front');

    let back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${gameGrid[i].img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
};

let firstGuess = '';
let secondGuess = '';

let count = 0;
let previousTarget = null;
let delay = 1500;

let match = () => {
    let selected = document.querySelectorAll('.selected');
    for (let i = 0; i < selected.length; i++) {
        selected[i].classList.add('match');
    };
};

let resetGuesses = () => {
    firstGuess = '';
    secondGuess = '';
    count = 0;
    previousTarget = null;

    let selected = document.querySelectorAll('.selected');
    for (let i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
    };
};

grid.addEventListener('click', event => {
    let clicked = event.target;

    if (
        clicked.nodeName === 'SECTION' || 
        clicked === previousTarget || 
        clicked.parentNode.classList.contains('match') || 
        clicked.parentNode.classList.contains('selected')
    ) {
        return;
    };

    if (count < 2) {
        count++

        if (count === 1) {
            firstGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        } else {
            secondGuess = clicked.parentNode.dataset.name;
            clicked.parentNode.classList.add('selected');
        };
    
        if (firstGuess !== '' && secondGuess !== '') {
            if (firstGuess === secondGuess) {
                setTimeout(match, delay);
                setTimeout(resetGuesses, delay);
            } else {
                setTimeout(resetGuesses, delay);
            }
        };
        previousTarget = clicked;
    };
});