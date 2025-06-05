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

  const container = document.createElement('div');
  container.className = 'pedal-container';
  container.style.position = 'absolute';
  container.style.left = `${e.offsetX - 50}px`;
  container.style.top = `${e.offsetY - 25}px`;

  const newPedal = document.createElement('div');
  newPedal.className = 'pedal draggable';
  newPedal.textContent = pedalName;
  newPedal.style.transform = 'rotate(0deg)';
  newPedal.dataset.rotation = 0;

  const rotateBtn = document.createElement('button');
  rotateBtn.textContent = '↻';
  rotateBtn.className = 'rotate-btn';
  rotateBtn.addEventListener('click', () => {
    let angle = parseInt(newPedal.dataset.rotation || 0, 10);
    angle = (angle + 90) % 360;
    newPedal.dataset.rotation = angle;
    newPedal.style.transform = `rotate(${angle}deg)`;
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '✖';
  deleteBtn.className = 'delete-btn';
  deleteBtn.addEventListener('click', () => {
    board.removeChild(container);
  });

  container.appendChild(newPedal);
  container.appendChild(rotateBtn);
  container.appendChild(deleteBtn);
  board.appendChild(container);

  makeDraggable(container, newPedal);
});

// Drag the container (pedal + buttons)
function makeDraggable(container, pedal) {
  let offsetX, offsetY;

  pedal.addEventListener('mousedown', (e) => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    function onMouseMove(e) {
      container.style.left = `${e.pageX - board.offsetLeft - offsetX}px`;
      container.style.top = `${e.pageY - board.offsetTop - offsetY}px`;
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
}
