const CONFIG = {
  eventDate: '2026-10-17T16:00:00',
  lat: 14.611268043518066,
  lng: -90.60832977294922,
  whatsappNumber: '50259749967',
  whatsappMessage: '¡Hola! 🤠✨ Confirmo mi asistencia a la despedida mixta de Deya & Pedro el 17 de octubre.'
};

function updateCountdown(){
  const distance = new Date(CONFIG.eventDate).getTime() - Date.now();
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds')
  };
  if(distance <= 0){
    els.days.textContent = els.hours.textContent = els.minutes.textContent = els.seconds.textContent = '00';
    return;
  }
  const pad = n => String(n).padStart(2,'0');
  els.days.textContent = pad(Math.floor(distance / 86400000));
  els.hours.textContent = pad(Math.floor(distance % 86400000 / 3600000));
  els.minutes.textContent = pad(Math.floor(distance % 3600000 / 60000));
  els.seconds.textContent = pad(Math.floor(distance % 60000 / 1000));
}

function openInMaps(e){
  e.preventDefault();
  const {lat, lng} = CONFIG;
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const isAndroid = /Android/.test(navigator.userAgent);
  if(isAndroid){
    window.location.href = `geo:${lat},${lng}?q=${lat},${lng}`;
  }else if(isIOS){
    window.location.href = `maps://?q=${lat},${lng}`;
  }else{
    window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
  }
}

function openInWaze(e){
  e.preventDefault();
  const {lat, lng} = CONFIG;
  window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
}

function setRsvpLink(){
  const rsvp = document.getElementById('rsvpBtn');
  const text = encodeURIComponent(CONFIG.whatsappMessage);
  rsvp.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${text}`;
}

function spawnSparkles(){
  const layer = document.querySelector('.sparkle-layer');
  const glyphs = ['✦','✧','★'];
  for(let i = 0; i < 20; i++){
    const s = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    s.style.left = `${Math.random() * 100}%`;
    s.style.top = `${Math.random() * 100}%`;
    s.style.animationDelay = `${Math.random() * 2.6}s`;
    s.style.fontSize = `${.5 + Math.random() * .7}rem`;
    layer.appendChild(s);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  setRsvpLink();
  spawnSparkles();
  document.getElementById('btnMaps').addEventListener('click', openInMaps);
  document.getElementById('btnWaze').addEventListener('click', openInWaze);
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
