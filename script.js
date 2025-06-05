const pedals = document.querySelectorAll('.pedal');
const board = document.getElementById('board');

pedals.forEach(pedal => {
  pedal.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', pedal.dataset.pedal);
  });
});

board.addEventListener('dragover', (e) => {
  e.preventDefault(); // Allow drop
});

board.addEventListener('drop', (e) => {
  e.preventDefault();
  const pedalName = e.dataTransfer.getData('text/plain');

  const newPedal = document.createElement('div');
  newPedal.className = 'pedal';
  newPedal.textContent = pedalName;
  newPedal.style.position = 'absolute';
  newPedal.style.left = `${e.offsetX - 50}px`;
  newPedal.style.top = `${e.offsetY - 25}px`;

  board.appendChild(newPedal);
});
