// Connect to Socket.IO server
const socket = io();

// DOM Elements
const playersList = document.getElementById('playersList');
const joinBtn = document.querySelector('.btn-primary:first-of-type');
const betBtn = document.querySelector('.bet-input .btn');
const betAmount = document.getElementById('betAmount');

// Initialize
socket.emit('join_game', { username: `Player_${Math.random().toString(36).substr(2, 9)}` });

// Listen for game joined event
socket.on('game_joined', (data) => {
  console.log(data.message);
  updatePlayersList();
});

// Listen for bet placed event
socket.on('bet_placed', (data) => {
  console.log('Bet placed:', data);
});

// Update players list
function updatePlayersList() {
  playersList.innerHTML = '<li>You are connected</li>';
}

// Event Listeners
joinBtn.addEventListener('click', () => {
  socket.emit('join_game', { username: `Player_${Math.random().toString(36).substr(2, 9)}` });
  alert('You have joined the game!');
});

betBtn.addEventListener('click', () => {
  const amount = parseInt(betAmount.value);
  if (amount && amount > 0) {
    socket.emit('place_bet', { amount: amount });
    betAmount.value = '';
    console.log(`Bet placed: ${amount}`);
  } else {
    alert('Please enter a valid bet amount');
  }
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && betAmount.value) {
    betBtn.click();
  }
});

console.log('Poker game script loaded!');
