async function api(path, method='GET') {
  const r = await fetch(path, {method});
  return r.json();
}

async function takeToken() {
  const res = await api('/api/token/new', 'POST');
  const n = res.number;
  localStorage.setItem('recentToken', n);
  show(n);
}

function show(n) {
  document.getElementById('yourToken').innerText = n;
}

async function updateInfo() {
  const s = await api('/api/token/status');
  document.getElementById('info').innerText =
    `Last issued: ${s.lastIssued || 0} • Now serving: ${s.nowServing || 0}`;

  const saved = localStorage.getItem('recentToken');
  if (saved) show(saved);
}

document.getElementById('takeBtn').onclick = takeToken;
setInterval(updateInfo, 2000);
window.onload = updateInfo;
