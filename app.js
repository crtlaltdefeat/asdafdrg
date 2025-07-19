
function showSignup() {
  document.querySelector('.login-container').classList.add('hidden');
  document.querySelector('.signup-container').classList.remove('hidden');
}
function showLogin() {
  document.querySelector('.signup-container').classList.add('hidden');
  document.querySelector('.login-container').classList.remove('hidden');
}

function signup() {
  const user = document.getElementById('newUsername').value;
  const pass = document.getElementById('newPassword').value;
  if (user && pass) {
    localStorage.setItem(user, pass);
    alert('Account created! Please log in.');
    showLogin();
  } else {
    alert('Fill all fields!');
  }
}

function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if (localStorage.getItem(user) === pass) {
    sessionStorage.setItem('currentUser', user);
    window.location.href = 'dashboard.html';
  } else {
    alert('Invalid credentials');
  }
}

function logout() {
  sessionStorage.removeItem('currentUser');
  window.location.href = 'index.html';
}

if (window.location.pathname.includes('dashboard.html')) {
  const user = sessionStorage.getItem('currentUser');
  if (!user) window.location.href = 'index.html';
  document.getElementById('welcomeUser').innerText = 'Hi, ' + user;

  let clicks = parseInt(localStorage.getItem(user + '_clicks')) || 0;
  document.getElementById('clickCount').innerText = clicks;

  window.increaseClicks = function() {
    clicks++;
    document.getElementById('clickCount').innerText = clicks;
    localStorage.setItem(user + '_clicks', clicks);
    updateChart(clicks);
  };

  // Chat
  window.sendMessage = function() {
    const msg = document.getElementById('chatInput').value;
    if (msg.trim() !== '') {
      const chatBox = document.getElementById('chatBox');
      const div = document.createElement('div');
      div.textContent = user + ': ' + msg;
      chatBox.appendChild(div);
      chatBox.scrollTop = chatBox.scrollHeight;
      document.getElementById('chatInput').value = '';
    }
  };

  // Chart.js
  const ctx = document.getElementById('statsChart').getContext('2d');
  window.chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Start'],
      datasets: [{
        label: 'Clicks',
        data: [clicks],
        borderColor: '#007bff',
        fill: false
      }]
    }
  });

  window.updateChart = function(clickValue) {
    chart.data.labels.push('Click');
    chart.data.datasets[0].data.push(clickValue);
    chart.update();
  };
}

function toggleTheme() {
  document.body.classList.toggle('dark');
}
