const palettePedals = document.querySelectorAll('.pedal');
const board = document.getElementById('board');

// Allow drag from palette
palettePedals.forEach(pedal => {
  pedal.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', pedal.dataset.pedal);
  });
});

board.addEventListener('dragover', (e) => {
  e.preventDefault();
});

board.addEventListener('drop', (e) => {
  e.preventDefault();
  const pedalName = e.dataTransfer.getData('text/plain');

  const newPedal = document.createElement('div');
  newPedal.className = 'pedal draggable';
  newPedal.textContent = pedalName;

  newPedal.style.position = 'absolute';
  newPedal.style.left = `${e.offsetX - 50}px`;
  newPedal.style.top = `${e.offsetY - 25}px`;
  newPedal.style.transform = 'rotate(0deg)';
  newPedal.dataset.rotation = 0;

  board.appendChild(newPedal);

  makeDraggable(newPedal);
});

// Enable drag + rotate on all pedals
function makeDraggable(el) {
  let offsetX, offsetY;

  el.addEventListener('mousedown', (e) => {
    if (e.button === 2) return; // Ignore right-click
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    function onMouseMove(e) {
      el.style.left = `${e.pageX - board.offsetLeft - offsetX}px`;
      el.style.top = `${e.pageY - board.offsetTop - offsetY}px`;
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  // Right-click to rotate 90 degrees
  el.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    let angle = parseInt(el.dataset.rotation || 0, 10);
    angle = (angle + 90) % 360;
    el.dataset.rotation = angle;
    el.style.transform = `rotate(${angle}deg)`;
  });
}
