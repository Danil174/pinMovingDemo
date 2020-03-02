const map = document.querySelector('.map');
const pin = document.querySelector('.pin');

function init () {
    let top = (map.offsetHeight - pin.offsetHeight) / 2;
    let left = (map.offsetWidth - pin.offsetWidth) / 2;

    pin.style.top = top + 'px'; 
    pin.style.left = left + 'px';
}

init();

pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
        x: evt.clientX - pin.offsetLeft,
        y: evt.clientY - pin.offsetTop
    };

    var shift = {
        x: 0,
        y: 0
    };

    var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        if (moveEvt.clientX - startCoords.x < 0) {
            shift.x = 0;
        } else if (moveEvt.clientX - startCoords.x + pin.offsetWidth > map.clientWidth) {
            shift.x = map.clientWidth - pin.offsetWidth;
        } else {
            shift.x = moveEvt.clientX - startCoords.x;
        }
        
        if (moveEvt.clientY - startCoords.y < 0) {
            shift.y = 0;
        } else if (moveEvt.clientY - startCoords.y + pin.offsetHeight > map.clientHeight) {
            shift.y = map.clientHeight - pin.offsetHeight;
        } else {
            shift.y = moveEvt.clientY - startCoords.y;
        }
    
        pin.style.top = shift.y + 'px'; 
        pin.style.left = shift.x + 'px';
    } 
    
    var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});