const map = document.querySelector('.map');
const pin = document.querySelector('.pin');

const checkNumberInInterval = function (number, lowerLimit, upperLimit) {
    if (number >= lowerLimit && number <= upperLimit) {
      return number;
    } else {
      let limit = (number < lowerLimit) ? lowerLimit : upperLimit;
      return limit;
    }
};

const init = function () {
    pin.style.top = map.clientWidth / 2 - pin.offsetWidth / 2 + 'px'; 
    pin.style.left =  map.clientHeight / 2 - pin.offsetHeight / 2 +  'px';
}

init();

pin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    let startCoords = {
        x: evt.clientX - pin.offsetLeft,
        y: evt.clientY - pin.offsetTop
    };

    let shift = {
        x: 0,
        y: 0
    };

    let onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let itemPositionX = moveEvt.clientX - startCoords.x;
        let itemPositionY = moveEvt.clientY - startCoords.y;
        let leftBorder = 0;
        let rightBorder = map.clientWidth - pin.offsetWidth;
        let topBorder = 0;
        let bottomBorder = map.clientHeight - pin.offsetHeight;

        shift.x = checkNumberInInterval(itemPositionX, leftBorder, rightBorder);
        shift.y = checkNumberInInterval(itemPositionY, topBorder, bottomBorder);
    
        pin.style.top = shift.y + 'px'; 
        pin.style.left = shift.x + 'px';
    } 
    
    let onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});