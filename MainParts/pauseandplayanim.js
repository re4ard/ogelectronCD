const pauseCon = document.querySelector('.pausecon');
const pause = document.querySelector('.pause');
const play = document.querySelector('.play');
const playCon = document.querySelector('.playcon');
const pausecircle = document.querySelector('.pausecircle');
const playcircle = document.querySelector('.playcircle');

let isMouseDown = false;

pauseCon.addEventListener('mousedown', function() {
    isMouseDown = true;
    pausecircle.style.opacity = '1'; // Make circle visible on mousedown
    console.log('pauseCon mousedown: opacity set to 1');
});

pauseCon.addEventListener('mouseup', function() {
    isMouseDown = false;
    play.style.display = 'block';
    pause.style.display = 'none';
    pausecircle.style.opacity = '0'; // Make circle invisible on mouseup
    console.log('pauseCon mouseup: opacity set to 0, play visible, pause hidden');
});

pauseCon.addEventListener('mouseleave', function() {
    if (isMouseDown) {
        pausecircle.style.opacity = '0'; // Make circle invisible if mouse leaves while holding
        isMouseDown = false;
        console.log('pauseCon mouseleave: opacity set to 0');
    }
});

playCon.addEventListener('mousedown', function() {
    isMouseDown = true;
    playcircle.style.opacity = '1'; // Make circle visible on mousedown
    console.log('playCon mousedown: opacity set to 1');
});

playCon.addEventListener('mouseup', function() {
    isMouseDown = false;
    play.style.display = 'none';
    pause.style.display = 'block';
    playcircle.style.opacity = '0'; // Make circle invisible on mouseup
    console.log('playCon mouseup: opacity set to 0, play hidden, pause visible');
});

playCon.addEventListener('mouseleave', function() {
    if (isMouseDown) {
        playcircle.style.opacity = '0'; // Make circle invisible if mouse leaves while holding
        isMouseDown = false;
        console.log('playCon mouseleave: opacity set to 0');
    }
});
