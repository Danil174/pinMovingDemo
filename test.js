const map = document.querySelector('.map');
const pin = document.querySelector('.pin');

var checkNumberInInterval = function (number, lowerLimit, upperLimit) {
    if (number >= lowerLimit && number <= upperLimit) {
      return number;
    } else {
      var limit = (number < lowerLimit) ? lowerLimit : upperLimit;
      return limit;
    }
};

function init () {
    pin.style.top = map.clientWidth / 2 - pin.offsetWidth / 2 + 'px'; 
    pin.style.left =  map.clientHeight / 2 - pin.offsetHeight / 2 +  'px';
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

        var itemPositionX = moveEvt.clientX - startCoords.x;
        var itemPositionY = moveEvt.clientY - startCoords.y;
        var leftBorder = 0;
        var rightBorder = map.clientWidth - pin.offsetWidth;
        var topBorder = 0;
        var bottomBorder = map.clientHeight - pin.offsetHeight;

        shift.x = checkNumberInInterval(itemPositionX, leftBorder, rightBorder);
        shift.y = checkNumberInInterval(itemPositionY, topBorder, bottomBorder);
    
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