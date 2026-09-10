// ═══════════════════════════════════════════════════════
//  VTTArmada — lógica principal
// ═══════════════════════════════════════════════════════


// Alias para compatibilidade com funções do VTTArmada original
function mostrarToast(msg, tipo) { toast(msg); }
// ──── Estado P2P ────
let peer = null, myName = '', myRole = '', roomId = '', roomTitle = '', amIHost = false;
let chatVisibility = 'global'; // 'global' | 'togm' | 'blind' | 'personal'
let contextShapeId = null;
let connections = {}, masterConn = null, players = {}, myPeerId = '';
let localFichaUpdateData = null;
const tokenImageCache = {};

// ──── Estado das Cenas ────
let SCENES = [];
let ACTIVE_SCENE_ID = '';
let PLAYERS_SCENE_ID = '';
let giphyApiKey = localStorage.getItem('giphy_api_key') || 'TlBoc67SNv0OTVPkfjUofJzuaiQ04MQ2';

const STORAGE_KEY = 't20_combat_app_v1';
let t20ThreatImagesCache = {};
let isBoardInitialized = false;

function reloadThreatImagesCache() {
  try {
    t20ThreatImagesCache = JSON.parse(localStorage.getItem('t20_threat_images')) || {};
  } catch (e) {
    t20ThreatImagesCache = {};
  }
  if (isBoardInitialized && typeof boardRender === 'function') {
    boardRender();
  }
}
window.addEventListener('focus', reloadThreatImagesCache);
window.addEventListener('DOMContentLoaded', reloadThreatImagesCache);
reloadThreatImagesCache();


// ──── Estado Encontros ────
let encDiasSemEncontro = 0;
let encPatamarAjuste = 0;
let encCurrentThreats = [];

// ──── Estado Combate ────
let currentThreatData = null;

// ══════════════════════════════════════════════════════
//  UTILITÁRIOS
// ══════════════════════════════════════════════════════
function toast(msg, dur = 2500) {
  const t = document.getElementById('toast');
  t.textContent = msg; t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), dur);
}
function formatTime() {
  const d = new Date();
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
}
function escHTML(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}
function gerarRoomId() {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; let id = '';
  for (let i = 0; i < 8; i++) id += c[Math.floor(Math.random() * c.length)];
  return id;
}

function loadImageWithCORSFallback(url, onload, onerror) {
  const img = new Image();
  let triedCors = true;
  img.onload = () => { if (onload) onload(img); };
  img.onerror = () => {
    if (triedCors) {
      triedCors = false;
      img.removeAttribute('crossOrigin');
      img.src = url;
    } else {
      if (onerror) onerror();
    }
  };
  img.crossOrigin = 'anonymous';
  img.src = url;
}

// ══════════════════════════════════════════════════════
//  TABS DO PAINEL MESTRE
// ══════════════════════════════════════════════════════
// ══════════════════════════════════════════════════════
//  CHAT
// ══════════════════════════════════════════════════════
function formatChatText(s) {
  let escaped = escHTML(s);
  escaped = escaped.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  escaped = escaped.replace(/_(.*?)_/g, '<em>$1</em>');
  escaped = escaped.replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" style="max-width:100%;border-radius:4px;" loading="lazy">');
  escaped = escaped.replace(/\n/g, '<br>');
  return escaped;
}

function descComImagem(desc, img) {
  var text = desc || '';
  if (img) {
    if (text) text += '\n';
    text += '![Imagem](' + img + ')';
  }
  return text;
}

function addMsg(data) {
  if (myRole === 'cego') return;
  const c = document.getElementById('chat-messages');
  const div = document.createElement('div');
  const vis = data.visibility || 'global';
  const visIcons = { global: '🌍', tog: '🕵️', togm: '🕵️', blind: '🙈', personal: '👤' };
  const visBadge = vis !== 'global' ? `<span class="msg-vis-badge">${visIcons[vis] || ''}</span>` : '';
  const isMaster = myRole === 'mestre' || amIHost;
  const canReveal = vis !== 'global' && vis !== 'personal' && (isMaster || vis === 'togm');
  const revealBtn = canReveal
    ? `<button class="msg-reveal-btn" onclick="revelarMensagem(this)" title="Revelar a todos">👁️</button>`
    : '';
  const msgJson = JSON.stringify(data);

  if (data.type === 'system') {
    div.className = 'msg-system'; div.textContent = '— ' + data.text + ' —';
  } else if (data.type === 'roll') {
    div.className = 'msg msg-roll';
    div.innerHTML = `<div class="msg-header">${visBadge}<span class="msg-author ${data.role === 'jogador' ? 'jogador' : ''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span>${revealBtn}</div><div class="msg-text">🎲 ${formatChatText(data.text)}</div>`;
  } else if (data.type === 'combat-sync-notify') {
    div.className = 'msg msg-combat';
    div.innerHTML = `<div class="msg-text">⚔ ${formatChatText(data.text)}</div>`;
  } else if (data.type === 'ability') {
    div.className = 'msg msg-ability';
    div.innerHTML = `<div class="msg-header"><span class="msg-author ${data.role === 'jogador' ? 'jogador' : ''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span></div><div class="msg-text">✨ ${formatChatText(data.text)}</div>`;
  } else if (data.type === 'gif') {
    div.className = 'msg msg-gif';
    div.innerHTML = `<div class="msg-header">${visBadge}<span class="msg-author ${data.role === 'jogador' ? 'jogador' : ''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span>${revealBtn}</div><div class="msg-text"><img src="${escHTML(data.gifUrl)}" alt="GIF"></div>`;
  } else if (data.type === 'spell') {
    div.className = 'msg msg-spell';
    div.innerHTML = `<div class="msg-header">${visBadge}<span class="msg-author ${data.role === 'jogador' ? 'jogador' : ''}">🪄 ${escHTML(data.name)}</span><span class="msg-time">${data.time}</span>${revealBtn}</div><div class="msg-text">${formatChatText(data.text)}</div>`;
  } else if (data.type === 'damage') {
    div.className = 'msg msg-damage';
    var dmgBtns = '';
    if (data.targetIds && data.targetIds.length > 0) {
      var targetId = data.targetIds[0];
      var dmgVal = parseInt(data.dmgTotal) || 0;
      dmgBtns = `<div class="dmg-btns"><button class="dmg-btn dmg-minus" onclick="_tokenDmgDelta('${escHTML(targetId)}',-${dmgVal})" title="Aplicar dano">−${dmgVal}</button><button class="dmg-btn dmg-plus" onclick="_tokenDmgDelta('${escHTML(targetId)}',${dmgVal})" title="Curar">+${dmgVal}</button></div>`;
    }
    div.innerHTML = `<div class="msg-header">${visBadge}<span class="msg-author ${data.role === 'jogador' ? 'jogador' : ''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span>${revealBtn}</div>${dmgBtns}<div class="msg-text">${formatChatText(data.text)}</div>`;
  } else {
    div.className = 'msg';
    div.innerHTML = `<div class="msg-header">${visBadge}<span class="msg-author ${data.role === 'jogador' ? 'jogador' : ''}">${escHTML(data.name)}</span><span class="msg-time">${data.time}</span>${revealBtn}</div><div class="msg-text">${formatChatText(data.text)}</div>`;
  }
  if (canReveal) div.dataset.msgData = msgJson;
  c.appendChild(div); c.scrollTop = c.scrollHeight;
}
// ──── Histórico de Comandos do Chat ────
let commandHistory = [];
let historyIndex = -1;
let currentDraft = '';

function adicionarAoHistorico(cmd) {
  const text = cmd.trim(); if (!text) return;
  if (commandHistory.length === 0 || commandHistory[commandHistory.length - 1] !== text) {
    commandHistory.push(text);
    if (commandHistory.length > 50) commandHistory.shift();
  }
  historyIndex = -1;
  currentDraft = '';
}

function navegarHistorico(dir) {
  if (commandHistory.length === 0) return;
  const inp = document.getElementById('chat-input');
  if (!inp) return;

  // Se não começou a navegar, salva o rascunho atual
  if (historyIndex === -1) {
    currentDraft = inp.value;
    historyIndex = commandHistory.length;
  }

  if (dir === -1) { // Para cima (anterior)
    if (historyIndex > 0) {
      historyIndex--;
      inp.value = commandHistory[historyIndex];
    }
  } else if (dir === 1) { // Para baixo (próximo)
    if (historyIndex < commandHistory.length - 1) {
      historyIndex++;
      inp.value = commandHistory[historyIndex];
    } else if (historyIndex === commandHistory.length - 1) {
      historyIndex = -1; // Volta ao draft
      inp.value = currentDraft;
    }
  }
}

function setChatVisibility(mode) {
  chatVisibility = mode;
  document.querySelectorAll('.vis-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.vis === mode);
  });
}
function revelarMensagem(el) {
  if (!confirm('Tem certeza que deseja revelar esta mensagem a todos?')) return;
  const div = el.closest('.msg, .msg-roll, .msg-gif');
  if (!div || !div.dataset.msgData) return;
  const msgData = JSON.parse(div.dataset.msgData);
  msgData.visibility = 'global';
  if (msgData.type === 'gif') msgData.text = '📢 GIF revelado';
  else msgData.text = '📢 ' + (msgData.text || 'mensagem');
  msgData.time = formatTime();
  if (myRole === 'mestre' || amIHost) {
    broadcast(msgData, null);
    addMsg(msgData);
  } else if (masterConn) {
    try { masterConn.send({ type: 'msg-reveal', msgData }); } catch (e) { }
  }
}
function handleChatKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    enviarMsg();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    navegarHistorico(-1);
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    navegarHistorico(1);
  }
}

function rotearMensagem(msgData) {
  const vis = msgData.visibility || 'global';
  const isMaster = myRole === 'mestre' || amIHost;
  if (vis === 'personal') { addMsg(msgData); return; }
  if (vis === 'togm') {
    addMsg(msgData);
    if (isMaster) { /* só o mestre vê */ }
    else if (masterConn) try { masterConn.send(msgData); } catch (e) { }
    return;
  }
  if (vis === 'blind') {
    if (isMaster) { addMsg(msgData); }
    else if (masterConn) try { masterConn.send(msgData); } catch (e) { }
    return;
  }
  addMsg(msgData);
  if (isMaster) broadcast(msgData, null);
  else if (masterConn) try { masterConn.send(msgData); } catch (e) { }
}

function enviarMsg() {
  if (myRole === 'expectador') { toast('Expectadores não podem enviar mensagens.'); return; }
  if (myRole === 'cego') return;
  const inp = document.getElementById('chat-input');
  const text = inp.value.trim(); if (!text) return; inp.value = '';

  adicionarAoHistorico(text);

  const vis = chatVisibility;
  let msgData;
  if (text.toLowerCase().startsWith('/r ')) {
    const res = processarRolagem(text, vis !== 'global');
    if (res) msgData = { type: 'roll', name: myName, role: myRole, text: res, time: formatTime(), visibility: vis };
    else {
      if (vis !== 'blind') addMsg({ type: 'system', text: 'Sintaxe: /r 2d6 ou /r d20+3' });
      return;
    }
  } else {
    msgData = { type: 'chat', name: myName, role: myRole, text, time: formatTime(), visibility: vis };
  }
  rotearMensagem(msgData);

  // ── Detect initiative rolls from chat command ──
  if (msgData.type === 'roll') detectarERolarIniciativa(msgData.text);
}
function parseRoll(cmd) {
  const m = cmd.match(/^\/r\s+(?:(.*?)(?::|-)\s*)?(\d*)d(\d+)([+-]\d+)?$/i); if (!m) return null;
  const label = m[1] ? m[1].trim() + ': ' : '';
  const qtd = parseInt(m[2] || '1'), faces = parseInt(m[3]), mod = parseInt(m[4] || '0');
  if (qtd < 1 || qtd > 20 || faces < 2 || faces > 100) return null;
  let rolls = [], total = 0;
  for (let i = 0; i < qtd; i++) { const r = Math.floor(Math.random() * faces) + 1; rolls.push(r); total += r; }
  total += mod;
  const ms = mod !== 0 ? (mod > 0 ? '+' + mod : mod) : '';
  const det = qtd > 1 ? ` [${rolls.join(', ')}]` : '';
  return `${label}${qtd}d${faces}${ms} → **${total}**${det}`;
}

// ─────────── Dados 3D ───────────
function processarRolagem(text, skip3d) {
  const m = text.toLowerCase().match(/^\/r\s+(?:(.*?)(?::|-)\s*)?(\d*)d(\d+)((?:[+-]\s*\d+)*)$/i);
  if (!m) return null;
  const label = m[1] ? m[1].trim() : '';
  const qtd = parseInt(m[2] || '1'), faces = parseInt(m[3]);
  let mod = 0;
  if (m[4]) {
    const mods = m[4].replace(/\s+/g, '').match(/[+-]\d+/g) || [];
    mod = mods.reduce((sum, val) => sum + parseInt(val), 0);
  }
  if (qtd < 1 || qtd > 20 || faces < 2 || faces > 100) return null;
  return efetuarRolagem(faces, qtd, mod, label, 0, skip3d);
}

// Histórico de rolagens do usuário (para repetir)
let rollHistory = [];

function efetuarRolagem(faces, qtd, mod, label, vantagem, skip3d) {
  let rolls = [], total = 0;
  for (let i = 0; i < qtd; i++) {
    let r;
    if (vantagem !== 0) {
      const r1 = Math.floor(Math.random() * faces) + 1, r2 = Math.floor(Math.random() * faces) + 1;
      r = vantagem === 1 ? Math.max(r1, r2) : Math.min(r1, r2);
    } else r = Math.floor(Math.random() * faces) + 1;
    rolls.push(r); total += r;
  }
  total += mod;
  const modStr = mod !== 0 ? (mod > 0 ? '+' + mod : mod) : '';
  const det = qtd > 1 ? ` [${rolls.join(', ')}]` : '';
  const lb = label ? label + ': ' : '';
  const adv = vantagem === 1 ? ' (vantagem)' : vantagem === -1 ? ' (desvantagem)' : '';
  const textRes = `${lb}${qtd}d${faces}${modStr}${adv} → **${total}**${det}`;
  try {
    rollHistory.push({ qtd, faces, mod, label: label || '', vantagem: vantagem || 0, res: textRes, time: formatTime() });
    if (rollHistory.length > 30) rollHistory.shift();
    const rv = document.getElementById('chatRollsView');
    if (rv && rv.style.display !== 'none') renderRollHistory();
  } catch (e) {}
  if (!skip3d) rolarDados3d(faces, qtd, rolls, total, mod, lb);
  return textRes;
}

// ═══════════════════════════════════════════════════════
//  DADOS 3D FACETADOS & ANIMAÇÃO ÉPICA (PADRÃO APP DADOS)
// ═══════════════════════════════════════════════════════

let vttAudioCtx = null;
let vttAudioEnabled = false;

function initVttAudio() {
  if (vttAudioEnabled && vttAudioCtx) return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      vttAudioCtx = new AudioCtx();
      vttAudioEnabled = true;
    }
  } catch (e) {}
}

function playVttDiceTick() {
  if (!vttAudioCtx) return;
  try {
    if (vttAudioCtx.state === 'suspended') vttAudioCtx.resume();
    const ctx = vttAudioCtx;
    const now = ctx.currentTime;
    // Transient click
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(700 + Math.random() * 500, now);
    clickGain.gain.setValueAtTime(0.08, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.012);
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.015);

    // Resonant body thud
    const resOsc = ctx.createOscillator();
    const resGain = ctx.createGain();
    resOsc.type = 'sine';
    resOsc.frequency.setValueAtTime(140 + Math.random() * 100, now);
    resOsc.frequency.exponentialRampToValueAtTime(55, now + 0.07);
    resGain.gain.setValueAtTime(0.15, now);
    resGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    resOsc.connect(resGain);
    resGain.connect(ctx.destination);
    resOsc.start(now);
    resOsc.stop(now + 0.09);
  } catch (e) {}
}

function playVttDiceCrit() {
  if (!vttAudioCtx) return;
  try {
    if (vttAudioCtx.state === 'suspended') vttAudioCtx.resume();
    const ctx = vttAudioCtx;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
    notes.forEach((f, i) => {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = 'sine';
      const t = ctx.currentTime + i * 0.06;
      osc.frequency.setValueAtTime(f, t);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(0.14, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.35);
      osc.connect(g); g.connect(ctx.destination); osc.start(t); osc.stop(t + 0.4);
    });
  } catch (e) {}
}

function playVttDiceFumble() {
  if (!vttAudioCtx) return;
  try {
    if (vttAudioCtx.state === 'suspended') vttAudioCtx.resume();
    const ctx = vttAudioCtx;
    const freqs = [78, 82, 120];
    freqs.forEach((f, i) => {
      const osc = ctx.createOscillator(), g = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f, ctx.currentTime);
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(220, ctx.currentTime);
      filter.frequency.linearRampToValueAtTime(70, ctx.currentTime + 0.65);
      g.gain.setValueAtTime(0.18 - (i * 0.03), ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
      osc.connect(filter); filter.connect(g); g.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + 0.85);
    });
  } catch (e) {}
}

// ── Partículas & Efeitos de Tela ──
function spawnVttDiceParticles(cx, cy, isCrit) {
  const container = document.getElementById('dice-particles-container');
  if (!container) return;
  const colors = ['#e8bc60', '#c9933a', '#fffbe0', '#d4a843', '#ffffff', '#ffd700'];
  const count = isCrit ? 36 : 16;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'dice-particle';
    const sz = isCrit ? 3 + Math.random() * 8 : 2 + Math.random() * 5;
    const ang = Math.random() * Math.PI * 2;
    const spd = isCrit ? 90 + Math.random() * 180 : 50 + Math.random() * 100;
    const dur = 0.5 + Math.random() * 0.5;
    p.style.cssText = `left:${cx}px;top:${cy}px;width:${sz}px;height:${sz}px;
      background:${colors[Math.floor(Math.random() * colors.length)]};
      border-radius:${Math.random() > 0.4 ? '50%' : '2px'};transform:translate(-50%,-50%);
      transition:transform ${dur}s ease-out,opacity ${dur}s ease-out; z-index:999;`;
    container.appendChild(p);
    requestAnimationFrame(() => {
      p.style.transform = `translate(calc(-50% + ${Math.cos(ang) * spd}px),calc(-50% + ${Math.sin(ang) * spd - (isCrit ? 110 : 60)}px))`;
      p.style.opacity = '0';
    });
    setTimeout(() => p.remove(), (dur + 0.1) * 1000);
  }
}

function triggerVttScreenFlash(type) {
  const overlay = document.getElementById('screen-effect-overlay');
  if (!overlay) return;
  overlay.className = '';
  void overlay.offsetWidth;
  overlay.classList.add(type === 'success' ? 'flash-success' : 'flash-fumble');
  document.body.classList.remove('shake-screen');
  void document.body.offsetWidth;
  document.body.classList.add('shake-screen');
  setTimeout(() => document.body.classList.remove('shake-screen'), 450);
}

// ── Drifting Stars / Embers Canvas ──
let vttStarsInitialized = false;
function initVttStarsCanvas() {
  if (vttStarsInitialized) return;
  const canvas = document.getElementById('dice-stars-canvas');
  if (!canvas) return;
  vttStarsInitialized = true;
  const ctx = canvas.getContext('2d');
  let stars = [];
  function createStars() {
    stars = [];
    for (let i = 0; i < 60; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.4 + 0.3,
        alpha: Math.random() * 0.75 + 0.1,
        speed: Math.random() * 0.04 + 0.012,
        vx: (Math.random() - 0.5) * 0.16,
        vy: -Math.random() * 0.22 - 0.06
      });
    }
  }
  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createStars();
  }
  function animate() {
    const overlay = document.getElementById('diceOverlay');
    if (overlay && overlay.style.display !== 'none') {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.y += s.vy; s.x += s.vx;
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
        if (s.x < 0 || s.x > canvas.width) { s.x = Math.random() * canvas.width; }
        s.alpha += s.speed;
        if (s.alpha > 0.85 || s.alpha < 0.08) s.speed = -s.speed;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${Math.max(0, s.alpha)})`;
        ctx.fill();
      });
    }
    requestAnimationFrame(animate);
  }
  window.addEventListener('resize', resize);
  resize();
  animate();
}

// ── Modelos Facetados SVG dos Dados ──
function getDieFacetedSvgHtml(faces) {
  switch (faces) {
    case 4:
      return `<polygon points="100,15 15,165 100,115" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>
              <polygon points="100,15 185,165 100,115" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>
              <polygon points="15,165 185,165 100,115" fill="url(#vttFacGrad1)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>`;
    case 6:
      return `<polygon points="40,40 65,15 185,15 160,40" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>
              <polygon points="160,40 185,15 185,135 160,160" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>
              <rect x="40" y="40" width="120" height="120" rx="8" fill="url(#vttFacGrad1)" stroke="url(#vttEdgeGrad)" stroke-width="2"/>`;
    case 8:
      return `<polygon points="100,15 15,100 100,100" fill="url(#vttFacGrad1)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>
              <polygon points="100,15 185,100 100,100" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>
              <polygon points="100,185 15,100 100,100" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>
              <polygon points="100,185 185,100 100,100" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>`;
    case 10:
      return `<polygon points="100,15 20,85 100,105" fill="url(#vttFacGrad1)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="100,15 180,85 100,105" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="20,85 45,145 100,105" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="180,85 155,145 100,105" fill="url(#vttFacGrad1)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="45,145 100,185 100,105" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="155,145 100,185 100,105" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>`;
    case 12:
      return `<polygon points="57,86 100,55 138,47 100,15 62,47" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="100,55 143,86 162,120 181,74 138,47" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="143,86 126,136 100,165 150,169 162,120" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="126,136 74,136 38,120 50,169 100,165" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="74,136 57,86 62,47 19,74 38,120" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="100,55 143,86 126,136 74,136 57,86" fill="url(#vttFacGrad1)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>`;
    case 100:
      return `<polygon points="100,15 150,31 138,47 100,35" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="150,31 181,74 162,80 138,47" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="181,74 181,126 162,120 162,80" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="181,126 150,169 138,153 162,120" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="150,169 100,185 100,165 138,153" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="100,185 50,169 62,153 100,165" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="50,169 19,126 38,120 62,153" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="19,126 19,74 38,80 38,120" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="19,74 50,31 62,47 38,80" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="50,31 100,15 100,35 62,47" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="100,35 138,47 162,80 162,120 138,153 100,165 62,153 38,120 38,80 62,47" fill="url(#vttFacGrad1)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>`;
    case 20:
    default:
      return `<polygon points="100,10 100,60 22,55" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="100,10 178,55 100,60" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="178,55 143,135 100,60" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="178,55 178,145 143,135" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="178,145 100,190 143,135" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="100,190 57,135 143,135" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="100,190 22,145 57,135" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="22,145 22,55 57,135" fill="url(#vttFacGrad3)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="22,55 100,60 57,135" fill="url(#vttFacGrad2)" stroke="url(#vttEdgeGrad)" stroke-width="1.2"/>
              <polygon points="100,60 143,135 57,135" fill="url(#vttFacGrad1)" stroke="url(#vttEdgeGrad)" stroke-width="1.5"/>`;
  }
}

function getDieConfig(faces) {
  switch (faces) {
    case 4: return { numY: 118, labelY: 158, fs: 50 };
    case 6: return { numY: 100, labelY: 158, fs: 62 };
    case 8: return { numY: 100, labelY: 158, fs: 60 };
    case 10: return { numY: 108, labelY: 162, fs: 56 };
    case 12: return { numY: 105, labelY: 160, fs: 56 };
    case 100: return { numY: 100, labelY: 155, fs: 42 };
    case 20:
    default: return { numY: 112, labelY: 150, fs: 52 };
  }
}

// ── Rolagem 3D Principal ──
let vttDiceRollTimeout = null;

function rolarDados3d(faces, qtd, rolls, total, mod, label) {
  initVttAudio();
  initVttStarsCanvas();

  const overlay = document.getElementById('diceOverlay');
  const heroWrapper = document.getElementById('die-svg-wrapper');
  const heroSvg = document.getElementById('die-svg');
  const heroShapes = document.getElementById('vtt-die-shapes');
  const heroNumber = document.getElementById('die-number');
  const heroLabel = document.getElementById('die-label');
  const multiTray = document.getElementById('dice-multi-tray');
  const critLabel = document.getElementById('diceCritLabel');
  const resultDiv = document.getElementById('diceResult');

  if (vttDiceRollTimeout) clearTimeout(vttDiceRollTimeout);

  // Reset visual states
  heroWrapper.classList.remove('crit', 'fumble', 'rolling');
  heroSvg.classList.remove('rolling', 'settle');
  critLabel.className = 'dice-crit-label';
  resultDiv.style.display = 'none';
  resultDiv.innerHTML = '';
  overlay.style.display = 'flex';

  const cfg = getDieConfig(faces);

  if (qtd === 1) {
    // ── Modo 1 Dado (Hero Die épico) ──
    multiTray.style.display = 'none';
    heroWrapper.style.display = 'flex';
    heroShapes.innerHTML = getDieFacetedSvgHtml(faces);
    heroNumber.setAttribute('y', cfg.numY);
    heroNumber.setAttribute('font-size', cfg.fs);
    heroNumber.textContent = '?';
    heroLabel.setAttribute('y', cfg.labelY);
    heroLabel.textContent = 'D' + faces;

    heroWrapper.classList.add('rolling');
    heroSvg.classList.add('rolling');

    const start = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - start < 800) {
        heroNumber.textContent = Math.floor(Math.random() * faces) + 1;
        playVttDiceTick();
      } else {
        clearInterval(interval);
        finalizeSingle();
      }
    }, 70);

    function finalizeSingle() {
      heroWrapper.classList.remove('rolling');
      heroSvg.classList.remove('rolling');
      heroSvg.classList.add('settle');
      setTimeout(() => heroSvg.classList.remove('settle'), 500);

      const val = rolls[0];
      heroNumber.textContent = val;

      let isCrit = false;
      let isFumble = false;

      if (faces === 20) {
        if (val === 20) {
          isCrit = true;
          setTimeout(() => {
            heroWrapper.classList.add('crit');
            critLabel.textContent = '⚔ CRÍTICO! ⚔';
            critLabel.className = 'dice-crit-label show success';
            playVttDiceCrit();
            triggerVttScreenFlash('success');
          }, 80);
        } else if (val === 1) {
          isFumble = true;
          setTimeout(() => {
            heroWrapper.classList.add('fumble');
            critLabel.textContent = '☠ FALHA CRÍTICA! ☠';
            critLabel.className = 'dice-crit-label show fumble';
            playVttDiceFumble();
            triggerVttScreenFlash('fumble');
          }, 80);
        }
      }

      const rect = heroWrapper.getBoundingClientRect();
      spawnVttDiceParticles(rect.left + rect.width / 2, rect.top + rect.height / 2, isCrit);

      // Render Result Card
      setTimeout(() => {
        const ms = mod !== 0 ? (mod > 0 ? ' + ' + mod : ' - ' + Math.abs(mod)) : '';
        const modStr = mod !== 0 ? `<div style="font-size:0.75rem;color:var(--text-muted);font-style:italic;margin-top:2px;">Modificador: ${ms}</div>` : '';
        resultDiv.className = 'dice-result-card';
        resultDiv.style.display = 'flex';
        resultDiv.innerHTML = `
          <div class="dice-result-header">${label ? escHTML(label) + ' &bull; ' : ''}1d${faces}${ms}</div>
          <div class="dice-result-total">${total}</div>
          ${modStr}
        `;
      }, 250);
    }
  } else {
    // ── Modo Múltiplos Dados (> 1) ──
    heroWrapper.style.display = 'none';
    multiTray.style.display = 'flex';
    multiTray.innerHTML = '';

    const miniDiceEls = [];
    for (let i = 0; i < qtd; i++) {
      const card = document.createElement('div');
      card.className = 'mini-die-card rolling';
      card.innerHTML = `
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" overflow="visible">
          ${getDieFacetedSvgHtml(faces)}
          <text class="mini-die-num" x="100" y="${cfg.numY}" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-weight="700" font-size="${cfg.fs}" fill="#e8bc60" filter="url(#vttNumGlow)">?</text>
          <text x="100" y="${cfg.labelY}" text-anchor="middle" dominant-baseline="middle" font-family="Cinzel, serif" font-weight="700" font-size="14" fill="#e8bc60" letter-spacing="2">D${faces}</text>
        </svg>
      `;
      multiTray.appendChild(card);
      miniDiceEls.push({ card, numEl: card.querySelector('.mini-die-num'), targetVal: rolls[i] });
    }

    const start = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - start < 800) {
        miniDiceEls.forEach(d => { d.numEl.textContent = Math.floor(Math.random() * faces) + 1; });
        playVttDiceTick();
      } else {
        clearInterval(interval);
        finalizeMulti();
      }
    }, 75);

    function finalizeMulti() {
      let maxRollCount = 0;
      miniDiceEls.forEach((d, idx) => {
        setTimeout(() => {
          d.card.classList.remove('rolling');
          d.card.classList.add('settle');
          d.numEl.textContent = d.targetVal;
          if (d.targetVal === faces) {
            d.card.classList.add('crit');
            maxRollCount++;
          } else if (d.targetVal === 1) {
            d.card.classList.add('fumble');
          }
        }, idx * 60);
      });

      if (maxRollCount > 0 && faces === 20) {
        setTimeout(() => {
          playVttDiceCrit();
          triggerVttScreenFlash('success');
        }, 150);
      }

      // Chips de detalhe
      const chipsHtml = rolls.map(r => {
        const cls = r === faces ? 'max' : r === 1 ? 'min' : '';
        return `<span class="dice-chip ${cls}">${r}</span>`;
      }).join('');

      setTimeout(() => {
        const ms = mod !== 0 ? (mod > 0 ? ' + ' + mod : ' - ' + Math.abs(mod)) : '';
        const modStr = mod !== 0 ? `<div style="font-size:0.75rem;color:var(--text-muted);font-style:italic;margin-top:2px;">Modificador: ${ms}</div>` : '';
        resultDiv.className = 'dice-result-card';
        resultDiv.style.display = 'flex';
        resultDiv.innerHTML = `
          <div class="dice-result-header">${label ? escHTML(label) + ' &bull; ' : ''}${qtd}d${faces}${ms}</div>
          <div class="dice-result-total">${total}</div>
          <div class="dice-result-chips">${chipsHtml}</div>
          ${modStr}
        `;
      }, qtd * 60 + 200);
    }
  }
}

function fecharDados3d() {
  const overlay = document.getElementById('diceOverlay');
  if (overlay) overlay.style.display = 'none';
}

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const overlay = document.getElementById('diceOverlay');
    if (overlay && overlay.style.display !== 'none') {
      fecharDados3d();
    }
  }
});

window.addEventListener('pointerdown', () => {
  initVttAudio();
}, { once: true });

// ─────────── Atalhos de Dados ───────────
function abrirDialogDados(faces) {
  document.getElementById('ddTitle').textContent = 'Rolar d' + faces;
  document.getElementById('diceDialog').dataset.faces = faces;
  document.getElementById('ddQtd').value = 1;
  document.getElementById('ddBonus').value = 0;
  document.getElementById('ddVantagem').checked = false;
  document.getElementById('ddDesvantagem').checked = false;
  document.getElementById('diceDialog').style.display = 'flex';
}

function fecharDialogDados() {
  document.getElementById('diceDialog').style.display = 'none';
}

function rolarDoDialog() {
  if (myRole === 'expectador') { toast('Expectadores não podem rolar dados.'); fecharDialogDados(); return; }
  if (myRole === 'cego') { fecharDialogDados(); return; }
  const faces = parseInt(document.getElementById('diceDialog').dataset.faces);
  const qtd = parseInt(document.getElementById('ddQtd').value) || 1;
  const bonus = parseInt(document.getElementById('ddBonus').value) || 0;
  const vantagem = document.getElementById('ddVantagem').checked ? 1 : document.getElementById('ddDesvantagem').checked ? -1 : 0;
  fecharDialogDados();

  const res = efetuarRolagem(faces, qtd, bonus, '', vantagem, chatVisibility !== 'global');
  if (!res) return;
  const msgData = { type: 'roll', name: myName, role: myRole, text: res, time: formatTime(), visibility: chatVisibility };
  rotearMensagem(msgData);
}

// ══════════════════════════════════════════════════════
//  GIPHY GIF SEARCH & SENDING
// ══════════════════════════════════════════════════════
function abrirGifPicker() {
  const picker = document.getElementById('gifPicker');
  if (!picker) return;
  const isOpen = picker.classList.contains('open');
  if (isOpen) {
    fecharGifPicker();
    return;
  }
  picker.classList.add('open');
  const keyInput = document.getElementById('gifApiKey');
  if (keyInput) {
    keyInput.value = giphyApiKey;
  }
  const searchInput = document.getElementById('gifSearchInput');
  if (searchInput) {
    searchInput.focus();
  }
}
function fecharGifPicker() {
  const picker = document.getElementById('gifPicker');
  if (picker) picker.classList.remove('open');
}
function salvarGiphyKey(val) {
  const key = val.trim();
  giphyApiKey = key || 'TlBoc67SNv0OTVPkfjUofJzuaiQ04MQ2';
  localStorage.setItem('giphy_api_key', key);
  toast('Chave Giphy atualizada!');
}
function gifSearchKey(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    buscarGifs();
  }
}
async function buscarGifs() {
  const searchInput = document.getElementById('gifSearchInput');
  const term = searchInput ? searchInput.value.trim() : '';
  if (!term) return;
  const grid = document.getElementById('gifGrid');
  const loading = document.getElementById('gifLoading');
  if (grid) grid.innerHTML = '';
  if (loading) loading.style.display = 'block';
  try {
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${encodeURIComponent(giphyApiKey)}&q=${encodeURIComponent(term)}&limit=15&rating=g&lang=pt`;
    const response = await fetch(url);
    const data = await response.json();
    if (loading) loading.style.display = 'none';
    if (!grid) return;
    if (data.data && data.data.length > 0) {
      data.data.forEach(gif => {
        const gifUrl = gif.images.fixed_height_small?.url || gif.images.fixed_height?.url || gif.images.original?.url;
        const chatGifUrl = gif.images.fixed_height?.url || gif.images.original?.url;
        if (gifUrl) {
          const img = document.createElement('img');
          img.className = 'gif-item';
          img.src = gifUrl;
          img.alt = gif.title || 'GIF';
          img.onclick = () => {
            enviarGif(chatGifUrl);
            fecharGifPicker();
          };
          grid.appendChild(img);
        }
      });
    } else {
      grid.innerHTML = '<div class="gif-empty">Nenhum GIF encontrado</div>';
    }
  } catch (e) {
    console.error('Erro ao buscar GIFs:', e);
    if (loading) loading.style.display = 'none';
    if (grid) {
      grid.innerHTML = '<div class="gif-empty" style="color: #ff6b6b;">Erro de conexão ou chave inválida.</div>';
    }
  }
}
function enviarGif(gifUrl) {
  if (myRole === 'expectador') { toast('Expectadores não podem enviar GIFs.'); return; }
  if (myRole === 'cego') return;
  if (!gifUrl) return;
  const msgData = {
    type: 'gif',
    name: myName,
    role: myRole,
    gifUrl: gifUrl,
    time: formatTime(),
    visibility: chatVisibility
  };
  rotearMensagem(msgData);
}

// ══════════════════════════════════════════════════════
//  P2P
// ══════════════════════════════════════════════════════
function renderPlayers() {
  const topList = document.getElementById('playersTopList');
  const countEl = document.getElementById('playersTopCount');
  if (topList) {
    topList.innerHTML = '';
    const entries = Object.entries(players);
    if (countEl) countEl.textContent = entries.length;
    entries.forEach(([pid, p]) => {
      const d = document.createElement('div'); d.className = 'player-entry';
      const isSelf = pid === myPeerId;
      const roleLabel = p.role === 'mestre' ? 'Mestre' : p.role === 'expectador' ? 'Expectador' : p.role === 'cego' ? 'Cego' : 'Jogador';
      const tagClass = 'tag-' + p.role;
      let tagHtml = `<div class="tag-role ${tagClass}">${roleLabel}</div>`;
      if (isSelf) {
        if (amIHost) {
          tagHtml = `<div class="tag-role ${tagClass}" id="role-badge" onclick="toggleLocalRole()" style="cursor: pointer;" title="Clique para alternar entre Mestre e Jogador">${roleLabel}</div>`;
        } else {
          tagHtml = `<div class="tag-role ${tagClass}" id="role-badge" title="Sua função na mesa">${roleLabel}</div>`;
        }
      }
      d.innerHTML = `<div class="dot ${isSelf ? 'self' : ''}"></div><div class="name">${escHTML(p.name)}</div>${tagHtml}`;
      if (amIHost && !isSelf) {
        d.classList.add('host-clickable');
        d.addEventListener('contextmenu', (e) => { e.preventDefault(); abrirPlayerContextMenu(e, pid); });
      }
      topList.appendChild(d);
    });
  }
}
function broadcast(data, excludePeer) {
  Object.entries(connections).forEach(([pid, conn]) => {
    if (pid !== excludePeer) try { conn.send(data); } catch (e) { }
  });
}
function criarSala() {
  const name = document.getElementById('master-name').value.trim();
  if (!name) { setLobbyStatus('create', 'Digite seu nome, ó Mestre.', true); return; }
  myName = name; myRole = 'mestre'; amIHost = true;
  roomTitle = document.getElementById('room-name').value.trim() || 'Mesa de ' + name;
  roomId = gerarRoomId();
  setLobbyStatus('create', 'Abrindo a mesa...');
  peer = new Peer('vtt-room-' + roomId, { debug: 0 });
  peer.on('open', (id) => {
    myPeerId = id; players[myPeerId] = { name: myName, role: 'mestre' };
    entrarNoAmbiente(); renderPlayers();
    addMsg({ type: 'system', text: 'Mesa aberta. Aguardando aventureiros...' });
  });
  peer.on('connection', (conn) => configurarConexaoMestre(conn));
  peer.on('error', (err) => {
    if (err.type === 'unavailable-id') { roomId = gerarRoomId(); peer.destroy(); criarSala(); }
    else setLobbyStatus('create', 'Erro: ' + err.message, true);
  });
}
function configurarConexaoMestre(conn) {
  conn.on('open', () => {
    connections[conn.peer] = conn;
    conn.on('data', (data) => {
      if (data.type === 'join') {
        players[conn.peer] = { name: data.name, role: 'jogador' }; renderPlayers();
        conn.send({ type: 'room-info', roomTitle, players });
        // Pedir a ficha do jogador para o mestre ter PV/PM sem precisar de token vinculado
        conn.send({ type: 'ficha-resumo-request' });
        conn.send({
          type: 'scenes-update',
          scenes: getScenesMetadata(),
          activeSceneId: PLAYERS_SCENE_ID
        });
        syncBoardToConnection(conn, PLAYERS_SCENE_ID);
        broadcast({ type: 'player-joined', peerId: conn.peer, name: data.name }, conn.peer);
        const jm = { type: 'system', text: data.name + ' entrou na mesa' };
        addMsg(jm); broadcast({ type: 'chat', ...jm }, null);
        broadcast({ type: 'players-update', players }, null);
      } else if (data.type === 'chat' || data.type === 'roll' || data.type === 'gif' || data.type === 'damage' || data.type === 'spell') {
        const vis = data.visibility || 'global';
        if (vis === 'global') { addMsg(data); broadcast(data, conn.peer); }
        else if (vis === 'togm' || vis === 'blind') { addMsg(data); }
      } else if (data.type === 'player-shapes') {
        if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
          BOARD.shapes = data.shapes;
          boardSave();
          broadcast({ type: 'board-shapes', shapes: BOARD.shapes }, null);
          boardRender();
        } else {
          const scene = SCENES.find(s => s.id === PLAYERS_SCENE_ID);
          if (scene) {
            scene.shapes = data.shapes;
            saveScenesLocally();
            const filtered = data.shapes.filter(s => !s.hidden || s.triggered);
            broadcast({ type: 'board-shapes', shapes: filtered }, conn.peer);
          }
        }
      } else if (data.type === 'board-ping') {
        if (!BOARD.pings) BOARD.pings = [];
        BOARD.pings.push({ x: data.x, y: data.y, time: data.time, color: data.color || '#33ccff' });
        boardRender();
        if (!BOARD.pingAnimId) {
          BOARD.pingAnimId = requestAnimationFrame(pingAnimationTick);
        }
        broadcast(data, conn.peer);
      } else if (data.type === 'player-targets') {
        BOARD.playerTargets[data.peerId] = data.targets;
        boardRender();
        broadcast(data, conn.peer);
      } else if (data.type === 'solicitar-iniciativa') {
        // Player explicitly requests to set their initiative
        processarIniciativaRoll(data.name || players[conn.peer]?.name || 'Jogador', data.initTotal, conn.peer);
      } else if (data.type === 'leave') {
        const n = players[conn.peer]?.name || 'Alguém';
        delete players[conn.peer]; delete connections[conn.peer]; renderPlayers();
        const lm = { type: 'system', text: n + ' saiu da mesa' };
        addMsg(lm); broadcast({ type: 'chat', ...lm }, null);
        broadcast({ type: 'players-update', players }, null);
      } else if (data.type === 'ficha-resumo') {
        receberResumoFicha(data);
        // Notificar no chat discretamente (apenas uma vez)
        const key = 'ficha_notif_' + data.peerId;
        if (!window[key]) {
          window[key] = true;
          addMsg({ type: 'system', text: '📋 Ficha de ' + data.playerName + ' recebida.' });
        }
      } else if (data.type === 'solicitar-criar-token') {
        if (jogadorJaTemToken(conn.peer)) {
          try { conn.send({ type: 'vtt-notify', text: '⚠️ Você já possui um token no mapa. Apenas um token por jogador.' }); } catch (e) { }
          return;
        }
        const entry = fichasJogadores[conn.peer];
        const r = entry?.resumo;
        adicionarTokenNaCena({
          name: data.name,
          hp: data.hp ?? r?.pvC ?? r?.pvM ?? 0,
          hpMax: data.hpMax ?? r?.pvM ?? data.hp ?? 0,
          pm: data.pm ?? r?.pmC ?? r?.pmM ?? 0,
          pmMax: data.pmMax ?? r?.pmM ?? data.pm ?? 0,
          defense: data.defense ?? r?.defenseTotal ?? 0,
          imageUrl: data.imageUrl || r?.charImage || '',
          controlledBy: conn.peer
        }, PLAYERS_SCENE_ID);
      } else if (data.type === 'solicitar-mover-token') {
        if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
          const t = BOARD.tokens.find(tk => tk.id === data.tokenId);
          if (t && t.controlledBy === conn.peer) {
            if (checkMoveBlocked(t, t.gx, t.gy, data.gx, data.gy)) {
              // Rejeitar movimento. Enviar atualização de sync para forçar o revert no cliente do jogador.
              syncBoardTokensToPlayers();
            } else {
              t.gx = data.gx;
              t.gy = data.gy;
              if (getParMontaria(t)) seguirMontaria(t);
              boardSave();
              boardRender();
              syncBoardTokensToPlayers();
              verificarGatilhosToken(t);
              setTimeout(atualizarSeguirToken, 50);
            }
          }
        } else {
          const scene = SCENES.find(s => s.id === PLAYERS_SCENE_ID);
          if (scene && scene.tokens) {
            const t = scene.tokens.find(tk => tk.id === data.tokenId);
            if (t && t.controlledBy === conn.peer) {
              if (checkMoveBlockedForScene(t, t.gx, t.gy, data.gx, data.gy, scene)) {
                const filtered = scene.tokens.filter(tk => (tk.layer || 'players') !== 'gm');
                conn.send({ type: 'board-tokens', tokens: filtered });
              } else {
                t.gx = data.gx;
                t.gy = data.gy;
                if (getParMontaria(t, scene.tokens)) seguirMontaria(t, scene.tokens);
                saveScenesLocally();
                const filtered = scene.tokens.filter(tk => (tk.layer || 'players') !== 'gm');
                broadcast({ type: 'board-tokens', tokens: filtered }, null);
              }
            }
          }
        }
      } else if (data.type === 'solicitar-alternar-parede') {
        if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
          const w = BOARD.walls.find(wall => wall.id === data.wallId);
          if (w) {
            w.open = !w.open;
            boardSave();
            boardRender();
            syncWallsToPlayers();
            setTimeout(atualizarFogJogador, 50);
            if (w.soundId) {
              const url = getSoundUrlById(w.soundId);
              if (url) { playSfx(url); broadcast({ type: 'play-sfx', url }, null); }
            }
          }
        } else {
          const scene = SCENES.find(s => s.id === PLAYERS_SCENE_ID);
          if (scene && scene.walls) {
            const w = scene.walls.find(wall => wall.id === data.wallId);
            if (w) {
              w.open = !w.open;
              saveScenesLocally();
              broadcast({ type: 'board-walls', walls: scene.walls }, null);
            }
          }
        }
      } else if (data.type === 'solicitar-ativar-gatilho') {
        if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
          const t = BOARD.tokens.find(tk => tk.id === data.tokenId);
          const s = BOARD.shapes.find(sk => sk.id === data.shapeId);
          if (t && s && t.controlledBy === conn.peer) {
            aplicarAcaoGatilho(t, s, data.action);
          }
        } else {
          const scene = SCENES.find(sc => sc.id === PLAYERS_SCENE_ID);
          if (scene && scene.tokens && scene.shapes) {
            const t = scene.tokens.find(tk => tk.id === data.tokenId);
            const s = scene.shapes.find(sk => sk.id === data.shapeId);
            if (t && s && t.controlledBy === conn.peer) {
              const oldFloor = Math.floor((t.z || 0) / 10);
              if (data.action === 'subir') {
                t.z = (t.z || 0) + 10;
              } else if (data.action === 'descer') {
                t.z = (t.z || 0) - 10;
              } else if (data.action === 'teleport') {
                const target = s.targetFloor !== undefined ? s.targetFloor : 0;
                t.z = target * 10;
              }
              saveScenesLocally();
              
              const targetFloor = Math.floor((t.z || 0) / 10);
              const filteredTokens = scene.tokens.filter(tk => (tk.layer || 'players') !== 'gm');
              broadcast({ type: 'board-tokens', tokens: filteredTokens }, null);
              
              if (oldFloor !== targetFloor) {
                broadcast({ type: 'board-floor', activeFloor: targetFloor }, null);
              }
            }
          }
        }
      } else if (data.type === 'apply-damage') {
        if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
          var tk = BOARD.tokens.find(function(t) { return t.id === data.targetId; });
          if (tk) {
            if (tk.hp === undefined) tk.hp = tk.hpMax || 0;
            tk.hp = (parseInt(tk.hp) || 0) + data.delta;
            boardSave();
            boardRender();
            syncBoardTokensToPlayers();
          }
        } else {
          var scene = SCENES.find(function(s) { return s.id === PLAYERS_SCENE_ID; });
          if (scene && scene.tokens) {
            var tk = scene.tokens.find(function(t) { return t.id === data.targetId; });
            if (tk) {
              if (tk.hp === undefined) tk.hp = tk.hpMax || 0;
              tk.hp = (parseInt(tk.hp) || 0) + data.delta;
              saveScenesLocally();
              var filtered = scene.tokens.filter(function(t) { return (t.layer || 'players') !== 'gm'; });
              broadcast({ type: 'board-tokens', tokens: filtered }, null);
            }
          }
        }
      } else if (data.type === 'apply-pm') {
        if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
          var tk = BOARD.tokens.find(function(t) { return t.id === data.tokenId; });
          if (tk) {
            if (tk.pm === undefined) tk.pm = tk.pmMax || 0;
            tk.pm = Math.max(0, (parseInt(tk.pm) || 0) + data.delta);
            boardSave();
            boardRender();
            syncBoardTokensToPlayers();
          }
        } else {
          var scene = SCENES.find(function(s) { return s.id === PLAYERS_SCENE_ID; });
          if (scene && scene.tokens) {
            var tk = scene.tokens.find(function(t) { return t.id === data.tokenId; });
            if (tk) {
              if (tk.pm === undefined) tk.pm = tk.pmMax || 0;
              tk.pm = Math.max(0, (parseInt(tk.pm) || 0) + data.delta);
              saveScenesLocally();
              var filtered = scene.tokens.filter(function(t) { return (t.layer || 'players') !== 'gm'; });
              broadcast({ type: 'board-tokens', tokens: filtered }, null);
            }
          }
        }
      } else if (data.type === 'montaria-update') {
        const applyMontaria = (list) => {
          const t = (list || []).find(tk => tk.id === data.tokenId);
          if (!t || t.controlledBy !== conn.peer) return false;
          if (data.mount) t.mount = data.mount;
          else delete t.mount;
          if (data.gx !== undefined) t.gx = data.gx;
          if (data.gy !== undefined) t.gy = data.gy;
          if (data.z !== undefined) t.z = data.z;
          return true;
        };
        if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
          if (applyMontaria(BOARD.tokens)) {
            boardSave();
            boardRender();
            syncBoardTokensToPlayers();
          }
        } else {
          const scene = SCENES.find(s => s.id === PLAYERS_SCENE_ID);
          if (scene && scene.tokens && applyMontaria(scene.tokens)) {
            saveScenesLocally();
            const filtered = scene.tokens.filter(tk => (tk.layer || 'players') !== 'gm');
            broadcast({ type: 'board-tokens', tokens: filtered }, null);
          }
        }
      }
    });
    conn.on('close', () => {
      if (players[conn.peer]) {
        const n = players[conn.peer].name;
        delete players[conn.peer]; delete connections[conn.peer]; renderPlayers();
        const lm = { type: 'system', text: n + ' desconectou' };
        addMsg(lm); broadcast({ type: 'chat', ...lm }, null);
        broadcast({ type: 'players-update', players }, null);
      }
    });
  });
}
function entrarNoAmbiente() {
  document.getElementById('lobby').style.display = 'none';
  document.getElementById('room').classList.add('active');
  document.getElementById('room-title-text').textContent = roomTitle || 'Mesa Virtual';
  document.getElementById('display-room-id').textContent = roomId;
  aplicarRoleVisual();
  atualizarBotaoSelecaoPropria();
  if (myRole === 'mestre') {
    document.getElementById('invite-area').style.display = 'block';
    document.getElementById('invite-link-box').textContent = gerarLinkConvite();
    document.getElementById('master-panel').style.display = 'flex';
    initMasterTools();
  } else {
    document.getElementById('btn-convidar').style.display = 'none';
    document.getElementById('master-panel').style.display = 'none';
  }

  // Ajustes para jogadores verem o botão de ficha / mestre inicializar o Baú
  if (myRole === 'mestre') {
    initBau();
  }
  if (myRole === 'jogador') {
    document.getElementById('btn-ficha').style.display = 'inline-flex';
    // Pré-carregar a ficha em segundo plano para que os botões de ataque/perícia/magia
    // fiquem disponíveis ao selecionar o token
    const iframe = document.getElementById('ficha-iframe');
    if (iframe && (!iframe.src || iframe.src === window.location.href)) {
      iframe.src = FICHA_URL;
      setTimeout(() => {
        try { iframe.contentWindow?.postMessage({ type: 'vtt-request-resume' }, '*'); } catch(e) {}
      }, 1500);
    }
  }

  // Inicialização do tabuleiro (board)
  boardLoad();
  boardInit();
  _ajustarMobile();
  boardSetupRole();
  if (myRole === 'mestre') initBoardCombatButton();
  if (myRole === 'jogador') {
    document.getElementById('master-panel').style.display = 'flex';
    ['encontros', 'combate', 'cenas', 'notas'].forEach(t => {
      const btn = document.getElementById('tab-' + t);
      if (btn) btn.style.display = 'none';
    });
    const bestBtn = document.getElementById('bau-subtab-bestiary');
    if (bestBtn) bestBtn.style.display = 'none';
    const impMaster = document.getElementById('ficha-import-mestre');
    if (impMaster) impMaster.style.display = 'none';
    const fichasMestre = document.getElementById('fichas-mestre-section');
    if (fichasMestre) fichasMestre.style.display = 'none';
    const btnMinhaFicha = document.getElementById('btn-abrir-minha-ficha');
    if (btnMinhaFicha) btnMinhaFicha.style.display = 'inline-block';
    currentBauSubtab = 'equip';
    switchTab('bau');
    switchBauSubtab('equip');
  }
  // Calcula fog inicial para jogadores
  setTimeout(atualizarFogJogador, 300);
  // Aplica efeitos de condições do token do jogador
  setTimeout(applyPlayerConditionEffects, 500);
}
function gerarLinkConvite() { return window.location.href.split('?')[0].split('#')[0] + '?sala=' + roomId; }
function copiarConvite() { navigator.clipboard.writeText(gerarLinkConvite()).then(() => toast('Link copiado!')); }
function copiarCodigo() { navigator.clipboard.writeText(roomId).then(() => toast('Código copiado!')); }
function convidarJogador() {
  const link = gerarLinkConvite();
  const text = 'Você foi convidado para "' + roomTitle + '"!\n\nEntre em: ' + link + '\n\nOu use o código: ' + roomId;
  if (navigator.share) navigator.share({ title: 'VTTArmada', text, url: link }).catch(() => { });
  else navigator.clipboard.writeText(text).then(() => toast('Convite copiado!'));
}
function sairSala() {
  if (myRole === 'jogador' && masterConn) try { masterConn.send({ type: 'leave', name: myName }); } catch (e) { }
  if (peer) peer.destroy(); location.reload();
}
function setLobbyStatus(panel, msg, isError = false) {
  const el = document.getElementById(panel + '-status');
  if (el) { el.textContent = msg; el.className = 'status-msg' + (isError ? ' error' : ''); }
}

// ══════════════════════════════════════════════════════
//  SINCRONIZAÇÃO DE COMBATE P2P
// ══════════════════════════════════════════════════════
function syncCombatToPlayers() {
  if (myRole !== 'mestre' && !amIHost) return;
  const payload = { type: 'combat-sync', state: JSON.parse(JSON.stringify(combatState)) };
  broadcast(payload, null);
  const notify = { type: 'combat-sync-notify', text: 'Mestre sincronizou o combate com a mesa.' };
  broadcast(notify, null);
  addMsg(notify);
  showInitTracker();
  document.getElementById('sync-badge').textContent = '✓ Sync';
  document.getElementById('sync-badge').classList.add('synced');
  setTimeout(() => { document.getElementById('sync-badge').classList.remove('synced'); document.getElementById('sync-badge').textContent = '—'; }, 3000);
  toast('⚔ Combate sincronizado com os jogadores!');
}
function receberSyncCombate(state) {
  combatState = state;
  showInitTracker();
  addMsg({ type: 'combat-sync-notify', text: 'Combate atualizado pelo Mestre — Rodada ' + state.round + ', vez de ' + getCombatActiveName(state) });
  renderInitTracker();
}
function getCombatActiveName(state) {
  const c = (state.combatants || []).find(x => x.id === state.activeId);
  return c ? c.name : '—';
}

// ══════════════════════════════════════════════════════
//  FLOATING INITIATIVE TRACKER
// ══════════════════════════════════════════════════════
function showInitTracker() {
  const el = document.getElementById('initTracker');
  if (!el) return;
  el.classList.remove('hidden');
  delete el.dataset.userCollapsed;
}
function hideInitTracker() {
  const el = document.getElementById('initTracker');
  if (!el) return;
  el.classList.add('hidden');
}
function toggleInitTracker() {
  const el = document.getElementById('initTracker');
  if (!el) return;
  el.classList.toggle('collapsed');
  // Track manual collapse so auto-expand won't override the user's choice
  if (el.classList.contains('collapsed')) {
    el.dataset.userCollapsed = '1';
  } else {
    delete el.dataset.userCollapsed;
  }
}

function renderInitTracker() {
  const tracker = document.getElementById('initTracker');
  if (!tracker) return;
  const list = document.getElementById('initTrackerList');
  const empty = document.getElementById('initTrackerEmpty');
  const roundEl = document.getElementById('initTrackerRound');
  if (!list || !empty) return;

  if (!combatState || !combatState.combatants || combatState.combatants.length === 0) {
    list.innerHTML = '';
    empty.style.display = 'block';
    if (roundEl) roundEl.textContent = '';
    return;
  }

  empty.style.display = 'none';
  if (roundEl) roundEl.textContent = 'R' + (combatState.round || 1);

  const isMestre = (typeof myRole !== 'undefined' && myRole === 'mestre');

  list.innerHTML = combatState.combatants.map(c => {
    const isActive = c.id === combatState.activeId;
    const isDead = (parseInt(c.hpCur) || 0) <= 0;
    const init = parseInt(c.init) || 0;
    const hpCur = parseInt(c.hpCur) || 0;
    const hpMax = parseInt(c.hpMax) || 0;
    const classes = [''];
    if (isActive) classes.push('active-init');
    if (isDead) classes.push('init-dead');
    const hpText = isMestre ? `${hpCur}/${hpMax}` : '';
    return `<li class="${classes.join(' ').trim()}">`
      + `<span class="init-val">${init}</span>`
      + `<span class="init-name" title="${escHTML(c.name)}">${escHTML(c.name)}</span>`
      + (hpText ? `<span class="init-hp">${hpText}</span>` : '')
      + `</li>`;
  }).join('');

  // Auto-expand when there are combatants
  if (tracker.classList.contains('collapsed') && combatState.combatants.length > 0) {
    // Keep collapsed if user collapsed it manually — only auto-open on first data
    if (!tracker.dataset.userCollapsed) {
      tracker.classList.remove('collapsed');
    }
  }
}

// ══════════════════════════════════════════════════════
//  INITIATIVE ROLL DETECTION & COMBAT INTEGRATION
// ══════════════════════════════════════════════════════

// Extract total from roll text patterns like "→ **15**" or "→ 15"
function extractInitiativeTotal(text) {
  // Pattern from parseRoll: "Rola Iniciativa: 1d20+3 → **15**"
  // Pattern from ficha: "Rola Iniciativa: 1d20+3 → **15** [12]"
  const m = text.match(/→\s*\*?\*?(\d+)\*?\*?/);
  return m ? parseInt(m[1]) : null;
}

// Check if a roll text is an initiative roll
function isInitiativeRoll(text) {
  if (!text) return false;
  const lower = text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return lower.includes('iniciativa');
}

// Get the player's selected token (for initiative binding)
// Returns { tokenId, tokenName } or null if no token selected
function getSelectedTokenForInit() {
  if (typeof BOARD === 'undefined' || !BOARD.selectedTokens || BOARD.selectedTokens.size === 0) return null;
  // Use the first selected token
  const tokenId = BOARD.selectedTokens.values().next().value;
  const token = BOARD.tokens.find(t => t.id === tokenId);
  if (!token) return null;
  return { tokenId: token.id, tokenName: token.name || 'Token' };
}

// Detecta uma rolagem de iniciativa em um texto e, se houver, processa-a
// (mestre rola para si mesmo / jogador pede ao mestre via P2P).
// Usado tanto pelo envio normal de chat quanto por mensagens vindas da ficha
// e pelo atalho de perícias dos tokens.
function detectarERolarIniciativa(text, nomeHint) {
  if (!isInitiativeRoll(text)) return;
  const initTotal = extractInitiativeTotal(text);
  if (initTotal === null) return;
  if (myRole === 'mestre' || amIHost) {
    let nomePersonagem = nomeHint || myName;
    if (!nomeHint) {
      const selToken = getSelectedTokenForInit();
      if (selToken) {
        nomePersonagem = selToken.tokenName;
      } else if (currentMasterFichaId) {
        const fichas = getMasterFichas();
        const f = fichas.find(x => x.id === currentMasterFichaId);
        if (f && f.name) nomePersonagem = f.name;
      }
    }
    processarIniciativaRoll(nomePersonagem, initTotal, myPeerId);
  } else if (masterConn) {
    const selToken = getSelectedTokenForInit();
    const nomePersonagem = nomeHint || (selToken ? selToken.tokenName : (localFichaUpdateData?.charName || myName));
    try {
      masterConn.send({
        type: 'solicitar-iniciativa',
        name: nomePersonagem,
        initTotal: initTotal,
        tokenId: selToken ? selToken.tokenId : null
      });
    } catch (err) { }
  }
}

// Process an initiative roll — adds or updates the combatant in combatState
// Called on the MASTER side only
// Preenche PV/PM do combatente a partir da ficha do jogador, do token no board (por controlador ou nome) ou da ficha do mestre
function _preencherPVPMToken(comb, playerName, peerId) {
  let hpCur = 0, hpMax = 0, mpCur = 0, mpMax = 0, imgUrl = '';
  const entry = fichasJogadores[peerId];
  if (entry && entry.resumo) {
    const st = (entry.resumo.fullData && entry.resumo.fullData.status) || {};
    hpCur = parseInt(entry.resumo.pvC != null ? entry.resumo.pvC : st.pvC) || 0;
    hpMax = parseInt(entry.resumo.pvM != null ? entry.resumo.pvM : st.pvM) || hpCur;
    mpCur = parseInt(entry.resumo.pmC != null ? entry.resumo.pmC : st.pmC) || 0;
    mpMax = parseInt(entry.resumo.pmM != null ? entry.resumo.pmM : st.pmM) || mpCur;
    imgUrl = entry.resumo.charImage || '';
  }
  if (hpMax <= 0 && typeof BOARD !== 'undefined' && BOARD.tokens) {
    let tok = BOARD.tokens.find(t => t.controlledBy === peerId);
    if ((!tok || !tok.hpMax) && playerName) tok = BOARD.tokens.find(t => t.name === playerName);
    if (tok) {
      hpCur = parseInt(tok.hp) || 0;
      hpMax = parseInt(tok.hpMax) || hpCur;
      mpCur = parseInt(tok.pm) || 0;
      mpMax = parseInt(tok.pmMax) || mpCur;
      imgUrl = imgUrl || tok.imageUrl || '';
    }
  }
  if (hpMax <= 0 && peerId === myPeerId && currentMasterFichaId) {
    const fichas = getMasterFichas();
    const f = fichas.find(x => x.id === currentMasterFichaId && x.name === playerName);
    if (f) {
      const st = (f.fullData && f.fullData.status) || {};
      hpCur = parseInt(f.pvC != null ? f.pvC : st.pvC) || 0;
      hpMax = parseInt(f.pvM != null ? f.pvM : st.pvM) || hpCur;
      mpCur = parseInt(f.pmC != null ? f.pmC : st.pmC) || 0;
      mpMax = parseInt(f.pmM != null ? f.pmM : st.pmM) || mpCur;
      imgUrl = f.imageUrl || imgUrl;
    }
  }
  comb.hpCur = parseInt(comb.hpCur) || hpCur;
  comb.hpMax = parseInt(comb.hpMax) || hpMax;
  comb.mpCur = parseInt(comb.mpCur) || mpCur;
  comb.mpMax = parseInt(comb.mpMax) || mpMax;
  if (!comb.imageUrl && imgUrl) comb.imageUrl = imgUrl;
}

function processarIniciativaRoll(playerName, initTotal, peerId) {
  if (!combatState) combatState = combatDefaultState();

  // Check if this player already has a combatant entry
  let existing = combatState.combatants.find(c => c.controlledBy === peerId);
  if (existing) {
    existing.init = initTotal;
    existing.name = playerName; // update name in case it changed
    // Se o combatente foi criado antes sem PV/PM, tenta preencher agora
    if (!existing.hpMax) _preencherPVPMToken(existing, playerName, peerId);
    combatLogAdd(`🎲 ${playerName} atualizou iniciativa: ${initTotal}`);
  } else {
    const id = 'c' + Date.now() + Math.floor(Math.random() * 99999);
    const combatant = {
      id,
      name: playerName,
      init: initTotal,
      hpCur: 0, hpMax: 0, mpCur: 0, mpMax: 0,
      notes: '',
      conditions: [],
      stats: { def: '', res: '', cd: '' },
      open: false,
      imageUrl: '',
      controlledBy: peerId
    };
    _preencherPVPMToken(combatant, playerName, peerId);
    combatState.combatants.push(combatant);
    if (!combatState.activeId) combatState.activeId = id;
    combatLogAdd(`🎲 ${playerName} entrou no combate com iniciativa ${initTotal}`);
  }

  // Sort by initiative if autoSort is on
  if (combatState.autoSort) {
    combatState.combatants.sort((a, b) => (parseInt(b.init) || 0) - (parseInt(a.init) || 0));
  }

  combatSave();
  combatRender();
  toast(`⚔ ${playerName} rolou iniciativa: ${initTotal}`);

  // Auto-sync to players
  syncCombatToPlayers();
}

// ══════════════════════════════════════════════════════
//  ENCONTROS ALEATÓRIOS
// ══════════════════════════════════════════════════════
function initMasterTools() {
  // Popula select de terrenos
  const sel = document.getElementById('enc-terreno');
  sel.innerHTML = '';
  Object.keys(terrenos).forEach(t => {
    const opt = document.createElement('option'); opt.value = t; opt.textContent = t; sel.appendChild(opt);
  });
  // Init combate (também inicializa os autocompletes do bestiário e de fichas)
  combatInit();
  // Renderiza fichas do mestre (se houver)
  renderMasterFichas();
}
function avancarDia() {
  encDiasSemEncontro++;
  updateViagemUI();
  addMsg({ type: 'system', text: '☀ Viagem avança. Dia ' + encDiasSemEncontro + ' — Chance: ' + (5 + encDiasSemEncontro * 5) + '%' });
}
function resetarViagem() {
  if (!confirm('Resetar diário de viagem para o Dia 0?')) return;
  encDiasSemEncontro = 0; updateViagemUI();
  addMsg({ type: 'system', text: '⟳ Diário reiniciado para o Dia 0.' });
}
function updateViagemUI() {
  document.getElementById('viagem-dia').textContent = encDiasSemEncontro;
  document.getElementById('viagem-chance').textContent = (5 + encDiasSemEncontro * 5) + '%';
}
function testarSorte() {
  const chance = 5 + encDiasSemEncontro * 5;
  const roll = Math.floor(Math.random() * 100) + 1;
  if (roll <= chance) {
    encDiasSemEncontro = 0; updateViagemUI();
    addMsg({ type: 'system', text: '⚠ Perigo! Rolou ' + roll + ' contra ' + chance + '% — encontro!' });
    gerarEncontro();
  } else {
    encDiasSemEncontro++; updateViagemUI();
    addMsg({ type: 'system', text: '☀ Dia pacífico (' + roll + ' vs ' + chance + '%). Dia ' + encDiasSemEncontro + ' acumulado.' });
  }
}
function selecionarPatamar(el, ajuste) {
  document.querySelectorAll('.patamar-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active'); encPatamarAjuste = ajuste;
}
function encontrarResultadoTerreno(terreno, rolagem) {
  if (!terrenos || !terrenos[terreno]) return null;
  for (const e of terrenos[terreno]) { if (rolagem <= e.porcentagem) return e; }
  const list = terrenos[terreno]; return list[list.length - 1];
}
function gerarEncontro() {
  let rnd = Math.floor(Math.random() * 100) + 1;
  if (rnd === 100 && Math.floor(Math.random() * 100) + 1 <= 25) {
    mostrarResultadoEncontro(100, { descricao: 'O Rhandomm', pag: 'Ameaças, pag. 113' });
    toast('👹 Evento Lendário: O Rhandomm!'); return;
  }
  const final = rnd + encPatamarAjuste;
  const terreno = document.getElementById('enc-terreno').value;
  const res = encontrarResultadoTerreno(terreno, final);
  mostrarResultadoEncontro(final, res, terreno);
}
function mostrarResultadoEncontro(roll, res, terreno) {
  const box = document.getElementById('enc-result-box');
  if (!res) { box.innerHTML = '<div style="font-size:0.82rem;color:var(--text-muted);font-style:italic;text-align:center;">Sem resultado para esta rolagem.</div>'; return; }
  box.innerHTML = `
    <div class="enc-result-roll">Rolagem: ${roll} ${terreno ? '| ' + terreno : ''}</div>
    <div class="enc-result-desc">${escHTML(res.descricao)}</div>
    ${res.pag ? `<div class="enc-result-pag">📖 ${escHTML(res.pag)}</div>` : ''}
  `;
  // Detectar ameaças
  const threats = findThreatsInDescription(res.descricao);
  encCurrentThreats = threats;
  renderThreatMiniCards(threats);
  // Notificar chat
  addMsg({ type: 'system', text: '🗺 [' + roll + '] ' + res.descricao.substring(0, 60) + (res.descricao.length > 60 ? '...' : '') });
}
function findThreatsInDescription(desc) {
  if (!desc || typeof AMEACAS_DB === 'undefined') return [];
  const norm = s => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\*/g, '').replace(/[''']/g, '').replace(/[.,-\/#!$%\^&\*;:{}=\-_`~()]/g, ' ');
  const STOP = new Set(['das', 'dos', 'com', 'sob', 'uma', 'uns', 'para', 'pelo', 'pela', 'pelos', 'pelas', 'como', 'sob']);
  const fixes = { defeitusos: 'defeituosos', defeituso: 'defeituoso', namasquall: 'namasqall' };
  const stem = w => { let s = w; if (s.endsWith('oes')) s = s.slice(0, -3) + 'ao'; else if (s.endsWith('ais')) s = s.slice(0, -3) + 'al'; else if (s.endsWith('eis')) s = s.slice(0, -3) + 'el'; else if (s.endsWith('nns')) s = s.slice(0, -1); else if (s.endsWith('ens')) s = s.slice(0, -3) + 'em'; else if (s.endsWith('ins')) s = s.slice(0, -3) + 'im'; else if (s.endsWith('uns')) s = s.slice(0, -3) + 'um'; else if (s.endsWith('ons')) s = s.slice(0, -1); else if (s.endsWith('ans')) s = s.slice(0, -1); else if (s.endsWith('res') || s.endsWith('ses') || s.endsWith('zes')) s = s.slice(0, -2); else if (s.endsWith('is') && !s.endsWith('lis') && !s.endsWith('mis') && !s.endsWith('ris')) s = s.slice(0, -1); else if (s.endsWith('s')) s = s.slice(0, -1); if (s === 'cae') s = 'cao'; return s; };
  const words = norm(desc).split(/\s+/).filter(w => w.length > 2 && !STOP.has(w)).map(w => fixes[w] || w);
  const stemsD = words.map(stem);
  return AMEACAS_DB.filter(t => {
    const tw = norm(t.nome || '').split(/\s+/).filter(w => w.length > 2 && !STOP.has(w)).map(w => fixes[w] || w);
    return tw.length > 0 && tw.every(w => stemsD.some(d => d === stem(w)));
  }).sort((a, b) => b.nome.length - a.nome.length);
}
function renderThreatMiniCards(threats) {
  const c = document.getElementById('enc-threats'); c.innerHTML = '';
  if (!threats || threats.length === 0) return;
  threats.forEach((t, i) => {
    const card = document.createElement('div'); card.className = 'threat-mini';
    const hasPM = parseInt(t.pm) > 0;
    card.innerHTML = `
      <div class="threat-mini-header">
        <div class="threat-mini-name">${escHTML(t.nome)}</div>
        <div class="threat-mini-nd">ND ${t.nd || '—'}</div>
      </div>
      <div class="threat-mini-stats">
        <span>PV ${t.pv || '—'}</span>${hasPM ? `<span>PM ${t.pm}</span>` : ''}
        <span>Def ${t.defesa || '—'}</span>
      </div>
      <div class="threat-mini-actions">
        <button class="btn btn-sm" onclick="enviarAoCombate(${i},1)">⚔ Ao Combate</button>
        <input type="number" id="enc-qty-${i}" value="1" min="1" max="20" style="width:45px;padding:0.2rem 0.3rem;font-size:0.8rem;">
      </div>
    `;
    card.querySelector('button').onclick = () => {
      const qty = parseInt(document.getElementById('enc-qty-' + i).value) || 1;
      enviarAoCombate(i, qty);
    };
    c.appendChild(card);
  });
}
function enviarAoCombate(threatIdx, qty) {
  const threat = encCurrentThreats[threatIdx]; if (!threat) return;
  for (let i = 1; i <= qty; i++) {
    const id = `c${Date.now()}${Math.floor(Math.random() * 99999)}`;
    const nome = qty > 1 ? `${threat.nome} ${i}` : threat.nome;
    const initText = threat.iniciativa || '+0';
    const initMod = parseInt(initText.replace('+', '')) || 0;
    const roll = Math.floor(Math.random() * 20) + 1;
    const totalInit = roll + initMod;
    const def = threat.defesa + (threat.defesaObs ? ` (${threat.defesaObs})` : '');
    const res = `Fort ${threat.fort || '+0'}, Ref ${threat.ref || '+0'}, Von ${threat.von || '+0'}`;
    let notes = `Tipo: ${threat.tipo || '—'} | ND: ${threat.nd || '—'}\nDeslocamento: ${threat.desl || '—'}\n`;
    if (threat.atributos) { const a = threat.atributos; notes += `FOR ${a.for || '—'}, DES ${a.des || '—'}, CON ${a.con || '—'}, INT ${a.int || '—'}, SAB ${a.sab || '—'}, CAR ${a.car || '—'}\n`; }
    notes += '\n--- ATAQUES ---\n';
    if (Array.isArray(threat.ataques)) threat.ataques.forEach(a => { notes += `• ${a.nome}: ${a.tipo || ''} ${a.bonus || ''} (${a.dano || ''})${a.desc ? ' - ' + a.desc : ''}\n`; });
    notes += '\n--- HABILIDADES ---\n';
    if (Array.isArray(threat.habilidades)) threat.habilidades.forEach(h => { notes += `• ${h.nome} (${h.tipo || ''}): ${h.desc || ''}\n`; });
    combatState.combatants.push({ id, name: nome, init: totalInit, hpCur: parseInt(threat.pv) || 0, hpMax: parseInt(threat.pv) || 0, mpCur: parseInt(threat.pm) || 0, mpMax: parseInt(threat.pm) || 0, notes, conditions: [], stats: { def, res, cd: '' }, open: false, imageUrl: threat.img || '' });
    if (!combatState.activeId) combatState.activeId = id;
  }
  combatSave(); combatRender();
  switchTab('combate');
  toast(`⚔ ${qty}x ${threat.nome} adicionados ao combate! (INI auto-rolada)`);
  addMsg({ type: 'system', text: `⚔ ${qty}x ${threat.nome} entrou no combate.` });
}

// ══════════════════════════════════════════════════════
//  COMBATE — adaptação do VTTArmada original
// ══════════════════════════════════════════════════════
// STORAGE_KEY is declared at the top of the file
let combatState = null;

function combatDefaultState() {
  return {
    round: 1,
    activeId: null,
    combatants: [],
    log: [],
    logOpen: false,
    autoSort: false
  };
}

function combatSetAutoSort(on) {
  combatState.autoSort = !!on;
  combatSave();
}

function combatSave() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(combatState));
  } catch (e) {
    console.warn("Falha ao salvar no localStorage", e);
  }
}

function combatLoad() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    console.warn("Falha ao ler localStorage", e);
    return null;
  }
}

// Inicializa Autocomplete do Bestiário Oficial
function combatInitDbAutocomplete() {
  const datalist = document.getElementById("combatDbDatalist");
  const searchInput = document.getElementById("combatDbSearch");
  if (!datalist || !searchInput) return;

  if (typeof AMEACAS_DB !== "undefined" && Array.isArray(AMEACAS_DB)) {
    const sortedAmeacas = [...AMEACAS_DB].sort((a, b) => (a.nome || "").localeCompare(b.nome || ""));
    datalist.innerHTML = sortedAmeacas.map(a =>
      `<option value="${escHTML(a.nome)}">${escHTML(a.tipo || "Criatura")} · ND ${escHTML(a.nd || "?")}</option>`
    ).join("");

    searchInput.addEventListener("input", () => {
      const val = (searchInput.value || "").trim();
      const match = AMEACAS_DB.find(a => (a.nome || "").toLowerCase() === val.toLowerCase());
      if (match) {
        currentThreatData = match;

        const nameInp = document.getElementById("combatNewName");
        const hpInp = document.getElementById("combatNewHP");
        const mpInp = document.getElementById("combatNewMP");
        const initInp = document.getElementById("combatNewInit");
        const fichaSearch = document.getElementById("combatFichaSearch");

        if (nameInp) nameInp.value = match.nome;
        if (hpInp) hpInp.value = parseInt(match.pv) || 0;
        if (mpInp) mpInp.value = parseInt(match.pm) || 0;
        if (fichaSearch) fichaSearch.value = "";

        // Auto rola iniciativa
        const initText = match.iniciativa || "+0";
        const initMod = parseInt(initText.replace("+", "")) || 0;
        const roll = Math.floor(Math.random() * 20) + 1;
        const totalInit = roll + initMod;

        if (initInp) initInp.value = totalInit;

        combatLogAdd(`🎲 Iniciativa auto-rolada para ${match.nome}: 1d20 (${roll}) + ${initMod} = ${totalInit}`);
        mostrarToast(`🎲 ${match.nome} iniciativa: ${totalInit} (1d20 [${roll}] + ${initMod})`, "sucesso");

        // Revalida formulário
        combatBindAddFormValidation();
      }
    });
  } else {
    console.warn("AMEACAS_DB não está disponível para o autocomplete.");
  }
}

// ── Autocomplete de Fichas (personagens do mestre + jogadores conectados) ──
function getFichasDisponiveis() {
  const fichas = [];
  // Ficha local do mestre (se houver)
  try {
    const raw = localStorage.getItem('t20SheetData');
    if (raw) {
      const data = JSON.parse(raw);
      if (data && data.charName) {
        fichas.push({
          source: 'local',
          label: `${data.charName} (sua ficha)`,
          charName: data.charName,
          pvM: data.pvM || data.status?.pvM || 0,
          pvC: data.pvC || data.status?.pvC || 0,
          pmM: data.pmM || data.status?.pmM || 0,
          pmC: data.pmC || data.status?.pmC || 0,
          imageUrl: data.charImage || ''
        });
      }
    }
  } catch (e) { }
  // Fichas dos jogadores conectados
  if (typeof fichasJogadores !== 'undefined') {
    Object.entries(fichasJogadores).forEach(([pid, entry]) => {
      const r = entry.resumo;
      if (r && r.charName) {
        fichas.push({
          source: 'player',
          peerId: pid,
          playerName: entry.playerName,
          label: `${r.charName} (${entry.playerName})`,
          charName: r.charName,
          pvM: parseInt(r.pvM) || 0,
          pvC: parseInt(r.pvC) || 0,
          pmM: parseInt(r.pmM) || 0,
          pmC: parseInt(r.pmC) || 0,
          imageUrl: r.charImage || ''
        });
      }
    });
  }
  // Fichas importadas pelo mestre
  try {
    const raw = localStorage.getItem(MASTER_FICHAS_KEY);
    if (raw) {
      const masterFichas = JSON.parse(raw);
      if (Array.isArray(masterFichas)) {
        masterFichas.forEach(f => {
          if (f && f.name) {
            fichas.push({
              source: 'master',
              id: f.id,
              label: `${f.name} (ficha do mestre)`,
              charName: f.name,
              pvM: f.pvM || 0,
              pvC: f.pvC || 0,
              pmM: f.pmM || 0,
              pmC: f.pmC || 0,
              imageUrl: f.imageUrl || ''
            });
          }
        });
      }
    }
  } catch (e) { }
  return fichas;
}

function combatInitFichaAutocomplete() {
  const datalist = document.getElementById("combatFichaDatalist");
  const searchInput = document.getElementById("combatFichaSearch");
  if (!datalist || !searchInput) return;

  const fichas = getFichasDisponiveis();
  datalist.innerHTML = fichas.map(f =>
    `<option value="${escHTML(f.charName)}">${escHTML(f.label)}</option>`
  ).join("");
}

function onFichaSearchInput() {
  const searchInput = document.getElementById("combatFichaSearch");
  if (!searchInput) return;
  const val = (searchInput.value || "").trim();
  if (!val) return;

  const fichas = getFichasDisponiveis();
  const match = fichas.find(f => f.charName.toLowerCase() === val.toLowerCase());
  if (match) {
    const nameInp = document.getElementById("combatNewName");
    const hpInp = document.getElementById("combatNewHP");
    const mpInp = document.getElementById("combatNewMP");
    const initInp = document.getElementById("combatNewInit");
    const dbSearch = document.getElementById("combatDbSearch");

    if (nameInp) nameInp.value = match.charName;
    if (hpInp) hpInp.value = match.pvM;
    if (mpInp) mpInp.value = match.pmM;
    // Limpa bestiário para não conflitar
    if (dbSearch) dbSearch.value = "";
    currentThreatData = null;

    // Se não tiver iniciativa, sugere uma baseada em DES (padrão Tormenta)
    if (initInp && !initInp.value) {
      initInp.value = Math.floor(Math.random() * 20) + 1;
    }

    mostrarToast(`📋 Ficha "${match.charName}" selecionada`, "sucesso");
    combatBindAddFormValidation();
  }
}

// Limpa busca e reinicia dados de ameaça
function combatClearSearch() {
  const searchInput = document.getElementById("combatDbSearch");
  if (searchInput) searchInput.value = "";
  currentThreatData = null;
}

// Rolar iniciativa rápida no formulário
function combatRollNewInit() {
  const initInp = document.getElementById("combatNewInit");
  if (!initInp) return;
  const mod = parseInt(initInp.value) || 0;
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + mod;
  initInp.value = total;

  combatLogAdd(`🎲 Iniciativa rolada: 1d20 (${roll}) + ${mod} = ${total}`);
  mostrarToast(`🎲 Rolado: ${total} (1d20 [${roll}] + ${mod})`);

  combatBindAddFormValidation();
}

function combatBindAddFormValidation() {
  const initEl = document.getElementById("combatNewInit");
  const nameEl = document.getElementById("combatNewName");
  const btn = document.getElementById("combatAddBtn");
  const hint = document.getElementById("combatAddHint");
  if (!initEl || !nameEl || !btn) return;

  const validate = () => {
    const nameOk = (nameEl.value || "").trim().length > 0;
    const initOk = (initEl.value !== "" && initEl.value !== null && initEl.value !== undefined);
    btn.disabled = !(nameOk && initOk);
    btn.classList.toggle("is-disabled", btn.disabled);
    if (hint) hint.classList.toggle("show", btn.disabled);
  };

  if (!initEl.dataset.boundValidation) {
    initEl.dataset.boundValidation = "1";
    initEl.addEventListener("input", validate);
    nameEl.addEventListener("input", validate);
    nameEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        validate();
        if (!btn.disabled) {
          e.preventDefault();
          combatAddFromForm();
        }
      }
    });
  }

  validate();
}

function combatAddFromForm() {
  const init = parseInt(document.getElementById("combatNewInit")?.value) || 0;
  const name = (document.getElementById("combatNewName")?.value || "").trim();
  const hpCur = parseInt(document.getElementById("combatNewHP")?.value) || 0;
  const mpCur = parseInt(document.getElementById("combatNewMP")?.value) || 0;

  if (!name || (document.getElementById("combatNewInit")?.value === "")) {
    alert("Preencha Iniciativa e Nome para adicionar.");
    return;
  }

  let def = "";
  let res = "";
  let cd = "";
  let notesStr = "";

  // Se houver dados de criatura no banco e o nome inserido iniciar com o nome da criatura (ex: Goblin 1 começa com Goblin)
  if (currentThreatData && name.toLowerCase().startsWith(currentThreatData.nome.toLowerCase())) {
    def = currentThreatData.defesa + (currentThreatData.defesaObs ? ` (${currentThreatData.defesaObs})` : "");
    res = `Fort ${currentThreatData.fort || "+0"}, Ref ${currentThreatData.ref || "+0"}, Von ${currentThreatData.von || "+0"}`;

    // Tenta encontrar uma CD nas descrições de ataques ou habilidades
    const descTexts = [];
    if (Array.isArray(currentThreatData.ataques)) currentThreatData.ataques.forEach(a => descTexts.push(a.desc || ""));
    if (Array.isArray(currentThreatData.habilidades)) currentThreatData.habilidades.forEach(h => descTexts.push(h.desc || ""));
    const joinedText = descTexts.join(" ");
    const cdMatch = joinedText.match(/CD\s*(\d+)/i);
    if (cdMatch) cd = cdMatch[1];

    // Formata o resumo da criatura nas notas
    notesStr += `Tipo: ${currentThreatData.tipo || "—"} | ND: ${currentThreatData.nd || "—"}\n`;
    notesStr += `Deslocamento: ${currentThreatData.desl || "—"}\n`;
    if (currentThreatData.atributos) {
      const atr = currentThreatData.atributos;
      notesStr += `Atributos: FOR ${atr.for || "—"}, DES ${atr.des || "—"}, CON ${atr.con || "—"}, INT ${atr.int || "—"}, SAB ${atr.sab || "—"}, CAR ${atr.car || "—"}\n`;
    }
    if (currentThreatData.percepcao) {
      notesStr += `Percepção: ${currentThreatData.percepcao} ${currentThreatData.percepcaoObs ? `(${currentThreatData.percepcaoObs})` : ""}\n`;
    }
    if (currentThreatData.tesouro) {
      notesStr += `Tesouro: ${currentThreatData.tesouro}\n`;
    }
    notesStr += `\n--- ATAQUES ---\n`;
    if (Array.isArray(currentThreatData.ataques) && currentThreatData.ataques.length > 0) {
      currentThreatData.ataques.forEach(atk => {
        notesStr += `• ${atk.nome}: ${atk.tipo || ""} ${atk.bonus || ""} (${atk.dano || ""})${atk.desc ? ` - ${atk.desc}` : ""}\n`;
      });
    } else {
      notesStr += `Nenhum ataque registrado.\n`;
    }
    notesStr += `\n--- HABILIDADES ---\n`;
    if (Array.isArray(currentThreatData.habilidades) && currentThreatData.habilidades.length > 0) {
      currentThreatData.habilidades.forEach(hab => {
        notesStr += `• ${hab.nome} (${hab.tipo || ""}): ${hab.desc || ""}\n`;
      });
    } else {
      notesStr += `Nenhuma habilidade registrada.\n`;
    }
  }

  const id = `c${Date.now()}${Math.floor(Math.random() * 9999)}`;

  combatState.combatants.push({
    id,
    name,
    init,
    hpCur: clampInt(hpCur, -999999, 999999, 0),
    hpMax: clampInt(hpCur, 0, 999999, 0),
    mpCur: clampInt(mpCur, 0, 999999, 0),
    mpMax: clampInt(mpCur, 0, 999999, 0),
    notes: notesStr,
    conditions: [],
    stats: { def, res, cd },
    open: false,
    imageUrl: (currentThreatData?.img) || ''
  });

  if (!combatState.activeId) combatState.activeId = id;

  // Limpa nome e busca
  document.getElementById("combatNewName").value = "";
  const dbSearchInput = document.getElementById("combatDbSearch");
  if (dbSearchInput) dbSearchInput.value = "";

  // Reseta estado temporário da ameaça para não auto-aplicar na próxima criação genérica
  currentThreatData = null;

  combatBindAddFormValidation();

  combatLogAdd(`+ ${name} (INI ${init})`);
  mostrarToast(`⚔️ "${name}" adicionado ao combate!`, "sucesso");
  combatRender();
  combatEnableDrag();
  combatSave();
}

function combatFind(id) {
  return combatState.combatants.find(x => x.id === id);
}

function combatIndexOfActive() {
  return combatState.combatants.findIndex(x => x.id === combatState.activeId);
}

function combatGetActiveName() {
  const c = combatFind(combatState.activeId);
  return c ? (c.name || "—") : "—";
}

function combatSetActive(id) {
  combatState.activeId = id;
  combatLogAdd(`Vez: ${combatGetActiveName()}`);
  mostrarToast(` Vez de: ${combatGetActiveName()}`);
  combatRender();
  combatSave();
}

function combatToggleDetails(id) {
  const c = combatFind(id);
  if (!c) return;
  c.open = !c.open;
  combatRender();
  combatSave();
}

function combatRowClick(id, ev) {
  // Clique em inputs/textareas/selects/botões não abre/fecha
  const tag = (ev.target && ev.target.tagName) ? ev.target.tagName.toUpperCase() : "";
  if (["INPUT", "TEXTAREA", "SELECT", "BUTTON", "I"].includes(tag)) return;
  combatToggleDetails(id);
}

function combatUpdateInit(id, value) {
  const c = combatFind(id);
  if (!c) return;
  c.init = parseInt(value) || 0;
  if (combatState.autoSort) combatSort();
  combatSave();
}

function combatUpdateNumber(id, field, value) {
  const c = combatFind(id);
  if (!c) return;
  const n = parseInt(value);
  c[field] = Number.isFinite(n) ? n : 0;

  // Máximos só mudam manualmente
  if (field === "hpMax") c.hpMax = clampInt(c.hpMax, 0, 999999, 0);
  if (field === "mpMax") c.mpMax = clampInt(c.mpMax, 0, 999999, 0);

  // Permite PV negativo
  if (field === "hpCur") c.hpCur = clampInt(c.hpCur, -999999, 999999, 0);
  if (field === "mpCur") c.mpCur = clampInt(c.mpCur, 0, 999999, 0);

  combatRefreshBadges(id);
  combatSave();
}

function combatDelta(id, field, delta) {
  const c = combatFind(id);
  if (!c) return;

  const before = parseInt(c[field]) || 0;
  let next = before + delta;
  if (field === "mpCur" && next < 0) next = 0;
  c[field] = next;

  combatRefreshBadges(id);
  combatRenderMiniFieldsIfOpen(id);

  // Log amigável
  const who = c.name || "—";
  const label = field === "hpCur" ? "PV" : field === "mpCur" ? "PM" : field;
  const sign = delta > 0 ? `+${delta}` : `${delta}`;
  combatLogAdd(`${who}: ${label} ${sign} → ${next}`);

  combatSave();
}

function combatRenderMiniFieldsIfOpen(id) {
  const c = combatFind(id);
  if (!c) return;
  const wrap = document.getElementById(`combatDetails-${id}`);
  if (!wrap) return;

  const map = {
    hpCur: `combatHPcur-${id}`,
    hpMax: `combatHPmax-${id}`,
    mpCur: `combatMPcur-${id}`,
    mpMax: `combatMPmax-${id}`,
  };

  Object.entries(map).forEach(([field, elId]) => {
    const el = document.getElementById(elId);
    if (el) el.value = parseInt(c[field]) || 0;
  });
}

function combatUpdateNotes(id, value) {
  const c = combatFind(id);
  if (!c) return;
  c.notes = value;

  combatSave();
  combatRenderNoteIndicator(id);
}

// Exibe seletor de anotação
function combatRenderNoteIndicator(id) {
  const c = combatFind(id);
  if (!c) return;
  const ind = document.getElementById(`combatNoteIndicator-${id}`);
  if (!ind) return;
  const has = (c.notes || "").trim().length > 0;
  ind.classList.toggle("has-notes", has);
}

function combatUpdateStats(id, field, value) {
  const c = combatFind(id);
  if (!c) return;
  if (!c.stats) c.stats = { def: "", res: "", cd: "" };
  c.stats[field] = value;
  combatSave();
}

function combatRefreshBadges(id) {
  const c = combatFind(id);
  if (!c) return;

  const hpTxt = document.getElementById(`combatHPText-${id}`);
  const mpTxt = document.getElementById(`combatMPText-${id}`);
  const hpFill = document.getElementById(`combatHPFill-${id}`);
  const mpFill = document.getElementById(`combatMPFill-${id}`);

  const hpCur = clampInt(c.hpCur, -999999, 999999, 0);
  const hpMax = clampInt(c.hpMax, 0, 999999, 0);
  const mpCur = clampInt(c.mpCur, 0, 999999, 0);
  const mpMax = clampInt(c.mpMax, 0, 999999, 0);

  const hpDisplay = hpCur > hpMax ? `+${hpCur}` : `${hpCur}`;
  const mpDisplay = mpCur > mpMax ? `+${mpCur}` : `${mpCur}`;

  const hpPct = hpMax > 0 ? clampNum((Math.max(0, Math.min(hpCur, hpMax)) / hpMax) * 100, 0, 100) : 0;
  const mpPct = mpMax > 0 ? clampNum((Math.max(0, Math.min(mpCur, mpMax)) / mpMax) * 100, 0, 100) : 0;

  if (hpTxt) hpTxt.textContent = `PV ${hpDisplay}/${hpMax}`;
  if (mpTxt) mpTxt.textContent = `PM ${mpDisplay}/${mpMax}`;
  if (hpFill) hpFill.style.width = `${hpPct}%`;
  if (mpFill) mpFill.style.width = `${mpPct}%`;

  combatRenderNoteIndicator(id);
  combatRenderNameState(id);
}

function combatRenderNameState(id) {
  const c = combatFind(id);
  if (!c) return;
  const nameEl = document.getElementById(`combatName-${id}`);
  if (!nameEl) return;

  const hpCur = parseInt(c.hpCur) || 0;
  const hpMax = parseInt(c.hpMax) || 0;
  const low = hpMax > 0 && hpCur >= 0 && (hpCur / hpMax) < 0.25;
  const dead = hpCur < 0;

  nameEl.classList.toggle("hp-low", low);
  nameEl.classList.toggle("hp-dead", dead);
}

function combatRemove(id) {
  const c = combatFind(id);
  if (!c) return;
  if (!confirm(`Remover "${c.name}"?`)) return;

  const idx = combatState.combatants.findIndex(x => x.id === id);
  if (idx >= 0) combatState.combatants.splice(idx, 1);

  if (combatState.activeId === id) {
    combatState.activeId = combatState.combatants[0]?.id || null;
  }

  combatLogAdd(`- ${c.name}`);
  mostrarToast(`🗑️ ${c.name} removido.`, "aviso");
  combatRender();
  combatEnableDrag();
  combatSave();
}

function combatDuplicate(id) {
  const src = combatFind(id);
  if (!src) return;

  const copy = deepClone(src);
  copy.id = `c${Date.now()}${Math.floor(Math.random() * 9999)}`;
  copy.name = incrementName(src.name || "Cópia");
  copy.open = false;

  const idx = combatState.combatants.findIndex(x => x.id === id);
  if (idx >= 0) combatState.combatants.splice(idx + 1, 0, copy);
  else combatState.combatants.push(copy);

  combatLogAdd(`⎘ ${src.name} → ${copy.name}`);
  mostrarToast(`📋 Criada cópia de ${src.name}!`);
  combatRender();
  combatEnableDrag();
  combatSave();
}

/** Condições **/
const CONDITION_INFO = {
  "Abalado": "O personagem sofre -2 em testes de perícia. Se ficar abalado novamente, em vez disso fica apavorado. (Medo)",
  "Agarrado": "O personagem fica desprevenido e imóvel, sofre -2 em testes de ataque e só pode atacar com armas leves. Ataques à distância contra um alvo envolvido em uma manobra de agarrar têm 50% de chance de acertar o alvo errado. (Movimento)",
  "Alquebrado": "O custo em pontos de mana das habilidades do personagem aumenta em +1. (Mental)",
  "Apavorado": "O personagem sofre -5 em testes de perícia e não pode se aproximar voluntariamente da fonte do medo. (Medo)",
  "Atordoado": "O personagem fica desprevenido e não pode fazer ações. (Mental)",
  "Caído": "O personagem sofre –5 na Defesa contra ataques corpo a corpo e recebe +5 na Defesa contra ataques à distância (cumulativos com outras condições). Além disso, sofre –5 em ataques corpo a corpo e seu deslocamento é reduzido a 1,5m.",
  "Cego": "O personagem fica desprevenido e lento, não pode fazer testes de Percepção para observar e sofre -5 em testes de perícias baseadas em Força ou Destreza. Todos os alvos de seus ataques recebem camuflagem total. Você é considerado cego enquanto estiver em uma área de escuridão total, a menos que algo lhe permita perceber no escuro. (Sentidos)",
  "Confuso": "O personagem comporta-se de modo aleatório. Role 1d6 no início de seus turnos. 1) Movimenta-se em uma direção escolhida por uma rolagem de 1d8; 2-3) Não pode fazer ações, e fica balbuciando incoerentemente; 4-5) Usa a arma que estiver empunhando para atacar a criatura mais próxima, ou a si mesmo se estiver sozinho (nesse caso, apenas role o dano); 6) A condição termina e pode agir normalmente. (Mental)",
  "Debilitado": "O personagem sofre -5 em testes de Força, Destreza e Constituição e em testes de perícias baseadas nesses atributos. Se o personagem ficar debilitado novamente, em vez disso fica inconsciente.",
  "Desprevenido": "O personagem sofre -5 na Defesa e em Reflexos. Você fica desprevenido contra inimigos que não possa perceber.",
  "Doente": "Sob efeito de uma doença. (Metabolismo)",
  "Em Chamas": "O personagem está pegando fogo. No início de seus turnos, sofre 1d6 pontos de dano de fogo. O personagem pode gastar uma ação padrão para apagar o fogo com as mãos. Imersão em água também apaga as chamas.",
  "Enfeitiçado": "O personagem se torna prestativo em relação à fonte da condição. Ele não fica sob controle da fonte, mas percebe suas palavras e ações da maneira mais favorável possível. A fonte da condição recebe +10 em testes de Diplomacia com o personagem. (Mental)",
  "Enjoado": "O personagem só pode realizar uma ação padrão ou de movimento (não ambas) por rodada. Ele pode gastar uma ação padrão para fazer uma investida, mas pode avançar no máximo seu deslocamento (e não o dobro). (Metabolismo)",
  "Enredado": "O personagem fica lento, vulnerável e sofre -2 em testes de ataque. (Movimento)",
  "Envenenado": "O efeito desta condição varia de acordo com o veneno. Pode ser perda de vida recorrente ou outra condição (como fraco ou enjoado). Perda de vida recorrente por venenos é cumulativa. (Veneno)",
  "Esmorecido": "O personagem sofre -5 em testes de Inteligência, Sabedoria e Carisma e em testes de perícias baseadas nesses atributos. (Mental)",
  "Exausto": "O personagem fica debilitado, lento e vulnerável. Se ficar exausto novamente, em vez disso fica inconsciente. (Cansaço)",
  "Fascinado": "Com a atenção presa em alguma coisa. O personagem sofre -5 em Percepção e não pode fazer ações, exceto observar aquilo que o fascinou. Esta condição é anulada por ações hostis contra o personagem ou se o que o fascinou não estiver mais visível. Balançar uma criatura fascinada para tirá-la desse estado gasta uma ação padrão. (Mental).",
  "Fatigado": "O personagem fica fraco e vulnerável. Se ficar fatigado novamente, em vez disso fica exausto. (Cansaço)",
  "Fraco": "O personagem sofre -2 em testes de Força, Destreza e Constituição e em testes de perícias baseadas nesses atributos. Se ficar fraco novamente, em vez disso fica debilitado.",
  "Frustrado": "O personagem sofre -2 em testes de Inteligência, Sabedoria e Carisma e em testes de perícias baseadas nesses atributos. Se ficar frustrado novamente, em vez disso fica esmorecido. (Mental)",
  "Imóvel": "Todas as formas de deslocamento do personagem são reduzidas a 0 metros. (Movimento)",
  "Inconsciente": "O personagem fica indefeso e não pode fazer ações, incluindo reações (mas ainda pode fazer testes que sejam naturalmente feitos quando se está inconsciente, como testes de Constituição para estabilizar sangramento). Balançar uma criatura para acordá-la gasta uma ação padrão.",
  "Indefeso": "O personagem fica desprevenido, mas sofre -10 na Defesa, falha automaticamente em testes de Reflexos e pode sofrer golpes de misericórdia.",
  "Lento": "Todas as formas de deslocamento do personagem são reduzidas à metade (arredonde para baixo para o primeiro incremento de 1,5 metros) e ele não pode correr ou fazer investidas. (Movimento)",
  "Ofuscado": "O personagem sofre -2 em testes de ataque e de Percepção. (Sentidos)",
  "Paralisado": "Fica imóvel e indefeso e só pode realizar ações puramente mentais. (Movimento)",
  "Pasmo": "Não pode fazer ações. (Mental)",
  "Petrificado": "O personagem fica inconsciente e recebe redução de dano 8. (Metamorfose)",
  "Sangrando": "No início de seu turno, o personagem deve fazer um teste de Constituição (CD 15). Se falhar, perde 1d6 pontos de vida e continua sangrando. Se passar, remove essa condição. (Metabolismo)",
  "Sobrecarregado": "O personagem sofre penalidade de armadura -5 e seu deslocamento é reduzido em -3 metros. (Movimento)",
  "Surdo": "O personagem não pode fazer testes de Percepção para ouvir e sofre -5 em testes de Iniciativa. Além disso, é considerado em condição ruim para lançar magias. (Sentidos)",
  "Surpreendido": "O personagem fica desprevenido e não pode fazer ações.",
  "Vulnerável": "O personagem sofre -2 na Defesa.",
};
const CONDITION_LIST = Object.keys(CONDITION_INFO).sort((a, b) => a.localeCompare(b, "pt-BR"));

const CONDITION_EMOJI = {
  "Abalado": "😰", "Agarrado": "🤝", "Alquebrado": "😩", "Apavorado": "😱",
  "Atordoado": "💫", "Caído": "🦶", "Cego": "🦯", "Confuso": "🌀",
  "Debilitado": "😵", "Desprevenido": "⚡", "Doente": "🤒", "Em Chamas": "🔥",
  "Enfeitiçado": "🫦", "Enjoado": "🤢", "Enredado": "🕸️", "Envenenado": "☠️",
  "Esmorecido": "🥀", "Exausto": "😫", "Fascinado": "✨", "Fatigado": "😮‍💨",
  "Fraco": "🪫", "Frustrado": "😤", "Imóvel": "🗿", "Inconsciente": "💤",
  "Indefeso": "🛐", "Lento": "🐌", "Ofuscado": "🌟", "Paralisado": "🧊",
  "Pasmo": "😶", "Petrificado": "🪨", "Sangrando": "🩸", "Sobrecarregado": "🎒",
  "Surdo": "🦻", "Surpreendido": "😮", "Vulnerável": "🎯",
};

function combatAddCondition(id) {
  const c = combatFind(id);
  if (!c) return;

  const sel = document.getElementById(`condSel-${id}`);
  const durInp = document.getElementById(`condDur-${id}`);
  if (!sel) return;

  const name = (sel.value || "").trim();
  const dur = clampInt(parseInt(durInp?.value), 0, 999, 1);

  if (!name) return;

  if (!Array.isArray(c.conditions)) c.conditions = [];
  c.conditions.push({ name, remaining: dur });

  combatLogAdd(`${c.name}: + condição "${name}" (${dur}r)`);
  mostrarToast(`✨ ${c.name}: + Condição "${name}" (${dur}r)`);
  combatRender();
  combatSave();
}

function combatSyncCondControls(id) {
  const sel = document.getElementById(`condSel-${id}`);
  const infoBtn = document.getElementById(`condInfoBtn-${id}`);
  const addBtn = document.getElementById(`condAddBtn-${id}`);
  const has = !!(sel && (sel.value || "").trim());
  if (infoBtn) infoBtn.disabled = !has;
  if (addBtn) addBtn.disabled = !has;
  if (!has) {
    const pop = document.getElementById(`condPop-${id}`);
    if (pop) pop.classList.add("d-none");
  }
}

function combatCondBump(id, idx, delta) {
  const c = combatFind(id);
  if (!c || !Array.isArray(c.conditions)) return;
  const cond = c.conditions[idx];
  if (!cond) return;

  cond.remaining = clampInt((parseInt(cond.remaining) || 0) + delta, 0, 999, 0);
  combatLogAdd(`${c.name}: ${cond.name} → ${cond.remaining}r`);
  if (cond.remaining <= 0) {
    c.conditions.splice(idx, 1);
    combatLogAdd(`${c.name}: condição "${cond.name}" acabou`);
    mostrarToast(`⌛ ${c.name}: Condição "${cond.name}" expirou.`);
  }
  combatRender();
  combatSave();
}

function combatCondRemove(id, idx) {
  const c = combatFind(id);
  if (!c || !Array.isArray(c.conditions)) return;
  const cond = c.conditions[idx];
  if (!cond) return;
  c.conditions.splice(idx, 1);
  combatLogAdd(`${c.name}: - condição "${cond.name}"`);
  combatRender();
  combatSave();
}

function combatTickConditionsOnLeaveCurrentTurn() {
  const cur = combatFind(combatState.activeId);
  if (!cur || !Array.isArray(cur.conditions) || cur.conditions.length === 0) return;

  const before = cur.conditions.map(x => ({ ...x }));
  cur.conditions.forEach(x => {
    if (Number.isFinite(parseInt(x.remaining)) && parseInt(x.remaining) > 0) {
      x.remaining = parseInt(x.remaining) - 1;
    }
  });

  // Remove as que zeraram
  cur.conditions = cur.conditions.filter(x => (parseInt(x.remaining) || 0) > 0);

  // Log mudanças
  before.forEach((b) => {
    const after = cur.conditions.find(x => x.name === b.name);
    if (!after && (parseInt(b.remaining) || 0) > 0) {
      combatLogAdd(`${cur.name}: condição "${b.name}" acabou`);
      mostrarToast(`⌛ ${cur.name}: Condição "${b.name}" expirou.`, "aviso");
    }
  });
}

/** Turnos / Rodadas **/
function combatNextTurn() {
  if (combatState.combatants.length === 0) return;

  combatTickConditionsOnLeaveCurrentTurn();

  let idx = combatIndexOfActive();
  if (idx < 0) idx = 0;

  idx += 1;
  if (idx >= combatState.combatants.length) {
    idx = 0;
    combatState.round = clampInt((parseInt(combatState.round) || 1) + 1, 1, 9999, 1);
    combatLogAdd(`— Rodada ${combatState.round} —`);
    mostrarToast(`🔔 Nova Rodada: ${combatState.round}!`, "aviso");
  }

  combatState.activeId = combatState.combatants[idx].id;
  combatLogAdd(`Vez: ${combatGetActiveName()}`);
  mostrarToast(` Vez de: ${combatGetActiveName()}`);
  combatRender();
  combatSave();
  if (myRole === 'mestre') setTimeout(atualizarTokensDoCombate, 50);
}

function combatPrevTurn() {
  if (combatState.combatants.length === 0) return;

  let idx = combatIndexOfActive();
  if (idx < 0) idx = 0;

  idx -= 1;
  if (idx < 0) {
    idx = combatState.combatants.length - 1;
    combatState.round = clampInt((parseInt(combatState.round) || 1) - 1, 1, 9999, 1);
    combatLogAdd(`↩ volta (Rodada ${combatState.round})`);
  }

  combatState.activeId = combatState.combatants[idx].id;
  combatLogAdd(`Vez: ${combatGetActiveName()}`);
  combatRender();
  combatSave();
  if (myRole === 'mestre') setTimeout(atualizarTokensDoCombate, 50);
}

function combatResetRound() {
  combatState.round = 1;
  combatLogAdd(`⟳ Rodada resetada para 1`);
  mostrarToast(`⟳ Rodada resetada para 1`);
  combatRender();
  combatSave();
}

function combatNew() {
  if (!confirm("Novo combate: limpar lista, rodada, vez e log?")) return;
  combatState = combatDefaultState();
  combatSave();
  combatRender();
  combatEnableDrag();
  combatLogRender();
  mostrarToast("⚔️ Combate reiniciado!");
}

/** Ordenação / Drag **/
function combatSort() {
  combatState.combatants.sort((a, b) => {
    const ia = parseInt(a.init) || 0;
    const ib = parseInt(b.init) || 0;
    if (ib !== ia) return ib - ia;
    return (a.name || "").toLowerCase().localeCompare((b.name || "").toLowerCase());
  });

  if (combatState.combatants.length > 0 && !combatFind(combatState.activeId)) {
    combatState.activeId = combatState.combatants[0].id;
  }

  combatLogAdd("⇅ Ordenado por iniciativa");
  mostrarToast("⇅ Lista ordenada por Iniciativa!");
  combatRender();
  combatEnableDrag();
  combatSave();
}

function combatEnableDrag() {
  const list = document.getElementById("combatList");
  if (!list || typeof Sortable === "undefined") return;

  if (list._sortableCombat) return;

  list._sortableCombat = new Sortable(list, {
    animation: 150,
    handle: ".drag-handle",
    onEnd: () => {
      const ids = Array.from(list.querySelectorAll(".combat-row")).map(el => el.getAttribute("data-id"));
      combatState.combatants.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
      combatLogAdd("↕ desempate manual (arraste)");
      combatSave();
    }
  });
}

/** Export/Import **/
function combatExport() {
  const blob = new Blob([JSON.stringify(combatState, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "combate_t20.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  mostrarToast("💾 Dados de combate exportados!");
}

function combatImport(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || typeof data !== "object") throw new Error("JSON inválido");

      const next = combatDefaultState();
      next.round = clampInt(data.round, 1, 9999, 1);
      next.activeId = data.activeId || null;
      next.log = Array.isArray(data.log) ? data.log : [];
      next.logOpen = !!data.logOpen;

      next.combatants = Array.isArray(data.combatants) ? data.combatants : [];
      next.combatants = next.combatants.map((c, i) => ({
        id: c.id || (`c${Date.now()}${i}`),
        name: c.name || "—",
        init: parseInt(c.init) || 0,
        hpCur: clampInt(c.hpCur, -999999, 999999, 0),
        hpMax: clampInt(c.hpMax, 0, 999999, clampInt(c.hpCur, 0, 999999, 0)),
        mpCur: clampInt(c.mpCur, 0, 999999, 0),
        mpMax: clampInt(c.mpMax, 0, 999999, clampInt(c.mpCur, 0, 999999, 0)),
        notes: c.notes || "",
        conditions: Array.isArray(c.conditions) ? c.conditions.map(x => ({
          name: (x.name || "").toString(),
          remaining: clampInt(x.remaining, 0, 999, 1)
        })) : [],
        stats: c.stats && typeof c.stats === "object" ? {
          def: c.stats.def ?? "",
          res: c.stats.res ?? "",
          cd: c.stats.cd ?? ""
        } : { def: "", res: "", cd: "" },
        open: false
      }));

      if (next.combatants.length > 0 && !next.activeId) next.activeId = next.combatants[0].id;

      combatState = next;
      combatLogAdd("⬆ combate carregado");
      mostrarToast("⬆ Combate importado com sucesso!", "sucesso");
      combatSave();
      combatRender();
      combatEnableDrag();
      combatLogRender();
    } catch (err) {
      alert("Erro ao carregar combate. Certifique-se de que é um JSON válido.");
      console.error(err);
    }
  };

  reader.readAsText(file);
  input.value = "";
}

/** Log **/
function combatLogAdd(text) {
  const entry = `${stamp()} [R${combatState.round}] ${text}`;
  combatState.log.push(entry);
  if (combatState.log.length > 200) combatState.log.shift();
  combatLogRender();
}

function combatToggleLog() {
  combatState.logOpen = !combatState.logOpen;
  combatLogRender();
  combatSave();
}

function combatClearLog() {
  if (!confirm("Limpar o log?")) return;
  combatState.log = [];
  combatLogRender();
  combatSave();
  mostrarToast("Log limpo.");
}

function combatLogRender() {
  // No VTT, o log do combate é mostrado no chat
  // Os elementos combatLogWrap/combatLog não existem — log fica em combatState.log apenas
}

/** Render **/
function combatRender() {
  const list = document.getElementById("combatList");
  if (!list) return;

  if (!combatState.activeId && combatState.combatants.length > 0) {
    combatState.activeId = combatState.combatants[0].id;
  }

  // Mini topo
  const roundMini = document.getElementById("combatRoundMini");
  if (roundMini) roundMini.innerText = combatState.round;

  const activeMini = document.getElementById("combatActiveMini");
  if (activeMini) activeMini.innerText = combatGetActiveName();

  list.innerHTML = combatState.combatants.map(c => combatRowHTML(c)).join("");

  // Marca ativo e configurações específicas
  combatState.combatants.forEach(c => {
    const row = document.getElementById(`combatRow-${c.id}`);
    if (!row) return;
    row.classList.toggle("active-turn", c.id === combatState.activeId);
    row.classList.toggle("open", !!c.open);
    combatRenderNoteIndicator(c.id);

    // Clique numa condição
    row.querySelectorAll(".cond-chip").forEach(ch => {
      if (ch.dataset.bound) return;
      ch.dataset.bound = "1";
      ch.addEventListener("click", (ev) => {
        const nm = ch.getAttribute("data-cond") || "";
        combatSetCondHelp(c.id, nm);
        ev.stopPropagation();
      });
    });
  });

  // Aplica presets no select de condições
  combatState.combatants.forEach(c => {
    const sel = document.getElementById(`condSel-${c.id}`);
    if (!sel) return;
    if (sel.options.length === 0) {
      const opt0 = document.createElement("option");
      opt0.value = "";
      opt0.textContent = "—";
      sel.appendChild(opt0);

      CONDITION_LIST.forEach(n => {
        const opt = document.createElement("option");
        opt.value = n;
        opt.textContent = n;
        sel.appendChild(opt);
      });
    }

    if (!sel.dataset.bound) {
      sel.dataset.bound = "1";
      sel.addEventListener("change", () => {
        combatSetCondHelp(c.id, sel.value);
        combatSyncCondControls(c.id);
      });
    }
    combatSyncCondControls(c.id);
    if (sel.value) combatSetCondHelp(c.id, sel.value);
  });

  // Update floating initiative tracker
  renderInitTracker();

  // Atualiza barra de rodada no painel VTT
  const roundEl = document.getElementById('c-round');
  const nameEl = document.getElementById('c-active-name');
  if (roundEl) roundEl.textContent = combatState?.round || 1;
  if (nameEl) {
    const act = (combatState?.combatants || []).find(x => x.id === combatState?.activeId);
    nameEl.textContent = act ? act.name : '—';
  }
}

function combatRowHTML(c) {
  const init = parseInt(c.init) || 0;
  const hpCur = clampInt(c.hpCur, -999999, 999999, 0);
  const hpMax = clampInt(c.hpMax, 0, 999999, 0);
  const mpCur = clampInt(c.mpCur, 0, 999999, 0);
  const mpMax = clampInt(c.mpMax, 0, 999999, 0);
  const hasNotes = (c.notes || "").trim().length > 0;
  const open = !!c.open;

  const noteClass = hasNotes ? "has-notes" : "";
  const detailsClass = open ? "" : "d-none";

  const condHTML = (Array.isArray(c.conditions) && c.conditions.length)
    ? `<div class="chip-row mt-2">${c.conditions.map((x, i) => `
        <span class="cond-chip" data-cond="${escHTML(x.name)}" title="${escHTML(combatCondDesc(x.name))}">
          ${escHTML(x.name)} <span class="n">${clampInt(x.remaining, 0, 999, 1)}r</span>
          <button title="-1" onclick="combatCondBump('${c.id}',${i},-1); event.stopPropagation();">-</button>
          <button title="+1" onclick="combatCondBump('${c.id}',${i},+1); event.stopPropagation();">+</button>
          <button title="Remover" onclick="combatCondRemove('${c.id}',${i}); event.stopPropagation();">×</button>
        </span>
      `).join("")}</div>`
    : `<div class="text-muted" style="font-size: 0.78rem; font-style: italic; margin-top: 6px;">Sem condições ativas.</div>`;

  const hpDisplay = hpCur > hpMax ? `+${hpCur}` : `${hpCur}`;
  const mpDisplay = mpCur > mpMax ? `+${mpCur}` : `${mpCur}`;
  const hpPct = hpMax > 0 ? clampNum((Math.max(0, Math.min(hpCur, hpMax)) / hpMax) * 100, 0, 100) : 0;
  const mpPct = mpMax > 0 ? clampNum((Math.max(0, Math.min(mpCur, mpMax)) / mpMax) * 100, 0, 100) : 0;

  // Nome em estado (PV baixo/negativo)
  const low = hpMax > 0 && hpCur >= 0 && (hpCur / hpMax) < 0.25;
  const dead = hpCur < 0;
  const nameStateClass = dead ? "hp-dead" : low ? "hp-low" : "";

  return `
  <div class="combat-row" id="combatRow-${c.id}" data-id="${c.id}">
    <div class="combat-summary" onclick="combatRowClick('${c.id}', event)">
      <div class="cs-ini">
        <i class="bi bi-grip-vertical drag-handle" title="Arrastar"></i>
        <input class="combat-init-input" type="number" inputmode="numeric" value="${init}"
          title="Editar iniciativa"
          onclick="event.stopPropagation()"
          oninput="combatUpdateInit('${c.id}', this.value)">
      </div>

      <div class="cs-name text-start">
        <span id="combatName-${c.id}" class="combat-name ${nameStateClass}">${escHTML(c.name || "—")}</span>
        <span id="combatNoteIndicator-${c.id}" class="combat-note-indicator ${noteClass}" title="Anotações">📝</span>
      </div>

      <div class="cs-right" onclick="event.stopPropagation()">
        <div class="combat-badges">
          <div class="bar-mini hp" title="PV atual / máximo">
            <div id="combatHPFill-${c.id}" class="fill" style="width:${hpPct}%"></div>
            <div id="combatHPText-${c.id}" class="txt">PV ${hpDisplay}/${hpMax}</div>
          </div>
          <div class="bar-mini mp" title="PM atual / máximo">
            <div id="combatMPFill-${c.id}" class="fill" style="width:${mpPct}%"></div>
            <div id="combatMPText-${c.id}" class="txt">PM ${mpDisplay}/${mpMax}</div>
          </div>
        </div>

        <div class="combat-actions-inline" onclick="event.stopPropagation()">
          <button class="btn btn-sm btn-icon-only" onclick="adicionarTokenDoCombatente('${c.id}'); event.stopPropagation();" title="Adicionar Token ao Mapa" style="color: var(--gold);">
            <i class="bi bi-person-plus-fill"></i>
          </button>
          <button class="btn btn-sm btn-icon-only" onclick="combatDuplicate('${c.id}'); event.stopPropagation();" title="Duplicar">
            <i class="bi bi-files"></i>
          </button>
          <button class="btn btn-sm btn-icon-only text-danger" onclick="combatRemove('${c.id}'); event.stopPropagation();" title="Remover">
            <i class="bi bi-trash"></i>
          </button>
        </div>

        <span class="combat-chev" aria-hidden="true">${open ? "▴" : "▾"}</span>
      </div>
    </div>

    <div id="combatDetails-${c.id}" class="combat-details ${detailsClass}">
      <div class="combat-details-grid">
        
        <!-- Bloco de PV -->
        <div class="combat-subbox">
          <div class="subbox-header">
            <span class="subbox-title hp-title">PV</span>
            <div class="combat-quick-btn-group">
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',-5); event.stopPropagation();">-5</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',-1); event.stopPropagation();">-1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',+1); event.stopPropagation();">+1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','hpCur',+5); event.stopPropagation();">+5</button>
            </div>
          </div>
          <div class="combat-inline-fields">
            <div class="form-group">
              <label class="t20-label">Atual</label>
              <input id="combatHPcur-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${hpCur}" oninput="combatUpdateNumber('${c.id}','hpCur',this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">Máx</label>
              <input id="combatHPmax-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${hpMax}" oninput="combatUpdateNumber('${c.id}','hpMax',this.value)">
            </div>
          </div>
        </div>

        <!-- Bloco de PM -->
        <div class="combat-subbox">
          <div class="subbox-header">
            <span class="subbox-title mp-title">PM</span>
            <div class="combat-quick-btn-group">
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',-5); event.stopPropagation();">-5</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',-1); event.stopPropagation();">-1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',+1); event.stopPropagation();">+1</button>
              <button class="btn combat-quick-btn" onclick="combatDelta('${c.id}','mpCur',+5); event.stopPropagation();">+5</button>
            </div>
          </div>
          <div class="combat-inline-fields">
            <div class="form-group">
              <label class="t20-label">Atual</label>
              <input id="combatMPcur-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${mpCur}" oninput="combatUpdateNumber('${c.id}','mpCur',this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">Máx</label>
              <input id="combatMPmax-${c.id}" class="form-control t20-input text-center" type="number" inputmode="numeric" value="${mpMax}" oninput="combatUpdateNumber('${c.id}','mpMax',this.value)">
            </div>
          </div>
        </div>

        <!-- Estatísticas Defesa/Resistência/CD -->
        <div class="combat-subbox details-span-all">
          <div class="stats-inputs-row">
            <div class="form-group">
              <label class="t20-label">Defesa</label>
              <input class="form-control t20-input" value="${escHTML(c.stats?.def ?? "")}" oninput="combatUpdateStats('${c.id}','def', this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">Resistências</label>
              <input class="form-control t20-input" value="${escHTML(c.stats?.res ?? "")}" placeholder="Ex: Fort +8, Ref +4, Von +2" oninput="combatUpdateStats('${c.id}','res', this.value)">
            </div>
            <div class="form-group">
              <label class="t20-label">CD</label>
              <input class="form-control t20-input" value="${escHTML(c.stats?.cd ?? "")}" placeholder="Ex: 16" oninput="combatUpdateStats('${c.id}','cd', this.value)">
            </div>
          </div>
        </div>

        <!-- Condições -->
        <div class="combat-subbox details-span-all">
          <div class="cond-header-bar">
            <span class="t20-label" style="font-size: 0.85rem;"><i class="bi bi-shield-exclamation"></i> Condições</span>
            <div class="cond-selector-group">
              <select id="condSel-${c.id}" class="inline-mini" onclick="event.stopPropagation()"></select>
              <input id="condDur-${c.id}" class="inline-mini" type="number" inputmode="numeric" value="1" min="0" max="999" title="Duração em rodadas" onclick="event.stopPropagation()">
              <button id="condInfoBtn-${c.id}" class="btn btn-icon-only btn-sm" onclick="combatToggleCondInfo('${c.id}'); event.stopPropagation();" title="O que esta condição faz?" disabled>
                <i class="bi bi-info-circle"></i>
              </button>
              <button id="condAddBtn-${c.id}" class="btn btn-icon-only btn-sm" onclick="combatAddCondition('${c.id}'); event.stopPropagation();" title="Adicionar condição" disabled>
                <i class="bi bi-plus-lg"></i>
              </button>
            </div>
          </div>
          
          <div class="cond-popover d-none" id="condPop-${c.id}">
            <div class="cond-popover-inner">
              <div class="cond-popover-title">Condição</div>
              <div class="cond-popover-body" id="condPopBody-${c.id}"></div>
            </div>
          </div>

          ${condHTML}
          <div class="small-help mt-2" style="font-size: 0.72rem; color: var(--text-muted);">
            Duração diminui em 1 rodada automaticamente ao avançar o turno (ao sair da vez deste combatente).
          </div>
        </div>

        <!-- Anotações -->
        <div class="form-group details-span-all">
          <label class="t20-label">Anotações da Criatura / Ataques / Habilidades</label>
          <textarea class="notes-textarea" rows="4" placeholder="Reação preparada, efeitos, lembretes, itens usados ou ficha..." oninput="combatUpdateNotes('${c.id}', this.value)" onclick="event.stopPropagation()">${escHTML(c.notes || "")}</textarea>
        </div>

        <!-- Rodapé do Card -->
        <div class="details-footer-actions details-span-all">
          <button class="btn btn-secondary btn-sm" onclick="combatSetActive('${c.id}'); event.stopPropagation();" title="Definir como a vez atual">
            <i class="bi bi-person-check"></i> Definir Vez
          </button>
          <span class="text-muted" style="font-size: 0.75rem;">Dica: use "Duplicar" (<i class="bi bi-files"></i>) para múltiplos inimigos.</span>
        </div>

      </div>
    </div>
  </div>
  `;
}

/** Util **/
function clampInt(v, min, max, fallback) {
  const n = parseInt(v);
  if (!Number.isFinite(n)) return fallback;
  return Math.max(min, Math.min(max, n));
}

function clampNum(v, min, max) {
  const n = Number(v);
  if (!Number.isFinite(n)) return min;
  return Math.max(min, Math.min(max, n));
}

function combatCondDesc(name) {
  return CONDITION_INFO && CONDITION_INFO[name] ? CONDITION_INFO[name] : "";
}

function combatSetCondHelp(id, name) {
  const nm = (name || "").trim();
  const desc = nm ? combatCondDesc(nm) : "";
  const pop = document.getElementById(`condPop-${id}`);
  const popBody = document.getElementById(`condPopBody-${id}`);
  const popTitle = pop ? pop.querySelector(".cond-popover-title") : null;
  if (!nm) {
    if (pop) pop.classList.add("d-none");
    return;
  }
  if (popTitle) popTitle.textContent = nm;
  if (popBody) popBody.textContent = desc || "";
  if (pop) pop.classList.remove("d-none");
}

function combatToggleCondInfo(id) {
  const pop = document.getElementById(`condPop-${id}`);
  if (!pop) return;
  const willOpen = pop.classList.contains("d-none");
  pop.classList.toggle("d-none");
  if (willOpen) {
    const sel = document.getElementById(`condSel-${id}`);
    const name = sel ? sel.value : "";
    if (!String(name || "").trim()) {
      pop.classList.add("d-none");
      return;
    }
    combatSetCondHelp(id, name);
  }
}

function stamp() {
  const d = new Date();
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function incrementName(name) {
  const s = (name || "").trim();
  const m = s.match(/^(.*?)(\s+)(\d+)$/);
  if (m) {
    const base = m[1];
    const num = parseInt(m[3]) || 1;
    return `${base}${m[2]}${num + 1}`;
  }
  const m2 = s.match(/^(.*?)(#)(\d+)$/);
  if (m2) {
    const base = m2[1].trim();
    const num = parseInt(m2[3]) || 1;
    return `${base} #${num + 1}`;
  }
  return `${s} 2`;
}


// ──── Sobreposição: combatInit para VTT ────
function combatInit() {
  combatState = combatLoad() || combatDefaultState();
  if (!combatState || typeof combatState !== 'object') combatState = combatDefaultState();
  if (!Array.isArray(combatState.combatants)) combatState.combatants = [];
  combatState.combatants.forEach(c => {
    if (!Number.isFinite(parseInt(c.hpCur))) c.hpCur = 0;
    if (!Number.isFinite(parseInt(c.mpCur))) c.mpCur = 0;
    if (!Number.isFinite(parseInt(c.hpMax))) c.hpMax = Math.max(0, parseInt(c.hpCur) || 0);
    if (!Number.isFinite(parseInt(c.mpMax))) c.mpMax = Math.max(0, parseInt(c.mpCur) || 0);
  });
  if (!Array.isArray(combatState.log)) combatState.log = [];
  combatState.round = clampInt(combatState.round, 1, 9999, 1);
  combatState.autoSort = !!combatState.autoSort;

  const auto = document.getElementById("combatAutoSort");
  if (auto) auto.checked = combatState.autoSort;

  // Enter no nome adiciona
  const nameInp = document.getElementById("combatNewName");
  if (nameInp && !nameInp.dataset.boundEnter) {
    nameInp.dataset.boundEnter = "1";
    nameInp.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        combatAddFromForm();
      }
    });
  }

  combatRender();
  combatBindAddFormValidation();
  combatEnableDrag();
  combatLogRender();

  // Inicialização dos Autocompletes (bestiário e fichas)
  combatInitDbAutocomplete();
  combatInitFichaAutocomplete();
}

function onDbSearchInput() {
  const inp = document.getElementById('combatDbSearch');
  const val = (inp?.value || '').trim();
  const match = AMEACAS_DB.find(a => (a.nome || '').toLowerCase() === val.toLowerCase());
  if (match) {
    currentThreatData = match;
    const nameInp = document.getElementById('combatNewName');
    const hpInp = document.getElementById('combatNewHP');
    const mpInp = document.getElementById('combatNewMP');
    const initInp = document.getElementById('combatNewInit');
    if (nameInp) {
      nameInp.value = match.nome;
      nameInp.dispatchEvent(new Event('input'));
    }
    if (hpInp) hpInp.value = parseInt(match.pv) || 0;
    if (mpInp) mpInp.value = parseInt(match.pm) || 0;
    const initMod = parseInt((match.iniciativa || '+0').replace('+', '')) || 0;
    const roll = Math.floor(Math.random() * 20) + 1;
    if (initInp) {
      initInp.value = roll + initMod;
      initInp.dispatchEvent(new Event('input'));
    }
    toast(`🎲 ${match.nome} — Iniciativa: ${roll + initMod}`);
    combatBindAddFormValidation();
  }
}

// ══════════════════════════════════════════════════════
//  INTEGRAÇÃO DA FICHA
// ══════════════════════════════════════════════════════

let fichaAberta = false;
let currentViewingPeerId = null; // PeerId do jogador cuja ficha o mestre está lendo no painel
let currentMasterFichaId = null; // Id da ficha do mestre aberta no painel
let fichasJogadores = {}; // peerId -> resumo da ficha

// Caminho para a ficha-vtt.html (deve estar no mesmo diretório)
const FICHA_URL = 'ficha-vtt.html';
const MASTER_FICHAS_KEY = 't20_mestre_fichas';

function toggleFichaPanel() {
  if (myRole === 'expectador' || myRole === 'cego') {
    toast('Sua função não permite acessar a ficha.');
    return;
  }
  fichaAberta = !fichaAberta;
  const panel = document.getElementById('ficha-panel');
  const board = document.querySelector('.board');
  const btn = document.getElementById('btn-ficha');
  const iframe = document.getElementById('ficha-iframe');

  if (fichaAberta) {
    panel.classList.add('active');
    if (board) board.style.display = 'none';
    btn.textContent = '🗺 Mapa';
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-gold');
    // Carregar a ficha no iframe se ainda não carregou
    if (!iframe.src || iframe.src === window.location.href) {
      iframe.src = FICHA_URL;
    }
    // Pedir resumo imediatamente
    setTimeout(() => iframe.contentWindow?.postMessage({ type: 'vtt-request-resume' }, '*'), 1000);
  } else {
    panel.classList.remove('active');
    if (board) board.style.display = 'flex';
    btn.textContent = '📋 Ficha';
    btn.classList.remove('btn-primary');
    btn.classList.add('btn-gold');

    // Se for o mestre, ele oculta o botão ao fechar a ficha e limpa a visualização ativa
    if (myRole === 'mestre') {
      btn.style.display = 'none';
      currentViewingPeerId = null;
      currentMasterFichaId = null;
    }
    // Restaurar título original
    const titleEl = document.querySelector('.ficha-panel-title');
    if (titleEl) {
      titleEl.textContent = '📋 Ficha do Personagem';
    }
  }
}

// ── Mensagens da ficha (iframe via postMessage E polling) ──
var _fichaMsgProcessed = new Set();

function _handleFichaMsg(data) {
  if (!data || !data.type) return;
  var id = data.__seq ? ('seq_' + data.__seq) : (data.type + '_' + Date.now());
  if (_fichaMsgProcessed.has(id)) return;
  _fichaMsgProcessed.add(id);
  if (_fichaMsgProcessed.size > 1000) {
    var arr = Array.from(_fichaMsgProcessed);
    _fichaMsgProcessed = new Set(arr.slice(arr.length - 500));
  }

  if (data.type === 'ficha-update') {
    var resumo = data;
    localFichaUpdateData = resumo;
    var statusEl = document.getElementById('ficha-sync-status');
    
    if (statusEl) {
      if (myRole === 'jogador') {
        statusEl.textContent = '✓ ' + (resumo.charName || '—');
        statusEl.style.color = '#80c080';
      } else if (myRole === 'mestre' && currentMasterFichaId) {
        statusEl.textContent = '✓ Salvo (' + (resumo.charName || '—') + ')';
        statusEl.style.color = '#80c080';
      }
    }
    
    if (myRole === 'mestre' && currentMasterFichaId) {
      // Atualiza a ficha do mestre no localStorage
      var fichas = getMasterFichas();
      var f = fichas.find(function(item) { return item.id === currentMasterFichaId; });
      if (f) {
        f.name = resumo.charName || f.name;
        f.fullData = resumo.fullData;
        f.pvC = resumo.pvC;
        f.pvM = resumo.pvM;
        f.pmC = resumo.pmC;
        f.pmM = resumo.pmM;
        saveMasterFichas(fichas);
        
        // Atualiza os tokens dessa ficha no board
        var tokenChanged = false;
        BOARD.tokens.forEach(function(t) {
          if (t.masterFichaId === currentMasterFichaId) {
            t.hp = resumo.pvC;
            t.hpMax = resumo.pvM;
            tokenChanged = true;
          }
        });
        if (tokenChanged) boardRender();
      }
    }

    if (myRole === 'jogador') {
      var tokenChanged = false;
      BOARD.tokens.forEach(function(t) {
        if (t.controlledBy === myPeerId) {
          t.hp = resumo.pvC;
          t.hpMax = resumo.pvM;
          tokenChanged = true;
        }
      });
      if (tokenChanged) boardRender();
      atualizarBotoesTokenSelected();
    }
    if (myRole === 'jogador') {
      fichasJogadores[myPeerId] = { playerName: myName, resumo: resumo, ts: Date.now() };
      renderFichasJogadores();
      if (amIHost) {
        receberResumoFicha({ peerId: myPeerId, playerName: myName, resumo: resumo });
      } else if (masterConn) {
        try { masterConn.send({ type: 'ficha-resumo', peerId: myPeerId, playerName: myName, resumo: resumo }); } catch (err) { }
      }
    }
    return;
  }

  if (data.type === 'ficha-ready') {
    var statusEl = document.getElementById('ficha-sync-status');
    if (statusEl) {
      if (myRole === 'jogador') {
        statusEl.textContent = '✓ pronta';
        statusEl.style.color = '#80c080';
      }
    }
    if (myRole === 'mestre' && currentViewingPeerId) {
      var entry = fichasJogadores[currentViewingPeerId];
      if (entry && entry.resumo && entry.resumo.fullData) {
        var iframe = document.getElementById('ficha-iframe');
        iframe.contentWindow?.postMessage({ type: 'vtt-load-sheet-data', data: entry.resumo.fullData, readOnly: true }, '*');
      }
    }
    return;
  }

  if (data.type === 'ficha-swipe-move') {
    if (window.innerWidth <= 900) _fichaPanelSwipeMove(data.dx || 0);
    return;
  }

  if (data.type === 'ficha-swipe-end') {
    if (window.innerWidth <= 900) _fichaPanelSwipeEnd(data.dx || 0);
    return;
  }

  if (data.type === 'vtt-send-chat-message') {
    if (myRole === 'expectador') { toast('Expectadores não podem enviar mensagens da ficha.'); return; }
    if (myRole === 'cego') return;
    var msgData = {
      type: data.msgType || 'chat',
      name: myName,
      role: myRole,
      text: data.text,
      time: formatTime(),
      visibility: chatVisibility
    };
    rotearMensagem(msgData);
    if (data.command) adicionarAoHistorico(data.command);
    if (data.dmgCommand) adicionarAoHistorico(data.dmgCommand);
    // Usa o nome do personagem (e não o apelido) para a iniciativa entrar no tracker
    var nomeChar = myName;
    if (myRole === 'mestre') {
      if (currentMasterFichaId) {
        var fichas = getMasterFichas();
        var fichaM = fichas.find(function(x) { return x.id === currentMasterFichaId; });
        if (fichaM && fichaM.name) nomeChar = fichaM.name;
      }
    } else if (localFichaUpdateData && localFichaUpdateData.charName) {
      nomeChar = localFichaUpdateData.charName;
    }
    detectarERolarIniciativa(data.text, nomeChar);
    return;
  }
}

window.addEventListener('message', function(e) { _handleFichaMsg(e.data); });

function _pollFichaMessages() {
  var iframe = document.getElementById('ficha-iframe');
  if (!iframe || !iframe.contentWindow) return;
  try {
    var raw = iframe.contentWindow.name;
    if (!raw || raw === 'undefined' || raw === '' || raw.indexOf('[') !== 0) return;
    var queue = JSON.parse(raw);
    if (!Array.isArray(queue)) return;
    for (var i = 0; i < queue.length; i++) {
      var entry = queue[i];
      if (entry && entry.msg) {
        entry.msg.__seq = entry.msg.__seq || (entry.ts || 0);
        _handleFichaMsg(entry.msg);
      }
    }
  } catch(e) {}
}
setInterval(_pollFichaMessages, 600);

// Mestre abre a ficha de outro jogador para ler
function abrirFichaJogador(peerId) {
  if (myRole === 'expectador' || myRole === 'cego') return;
  const entry = fichasJogadores[peerId];
  if (!entry || !entry.resumo || !entry.resumo.fullData) {
    alert("Dados completos da ficha ainda não foram recebidos deste jogador.");
    return;
  }

  const panel = document.getElementById('ficha-panel');
  const board = document.querySelector('.board');
  const btn = document.getElementById('btn-ficha');
  const iframe = document.getElementById('ficha-iframe');

  // Mudar título do painel para o nome do jogador/personagem
  const titleEl = document.querySelector('.ficha-panel-title');
  if (titleEl) {
    titleEl.textContent = `📋 Lendo Ficha: ${entry.resumo.charName || '(sem nome)'} (${entry.playerName})`;
  }

  // Atualizar status de sync
  const statusEl = document.getElementById('ficha-sync-status');
  if (statusEl) {
    statusEl.textContent = '👁️ Apenas Leitura';
    statusEl.style.color = '#c9903a';
  }

  panel.classList.add('active');
  if (board) board.style.display = 'none';

  // Exibir botão para que o mestre possa fechar / voltar ao mapa
  if (btn) {
    btn.textContent = '🗺 Mapa';
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-gold');
    btn.style.display = 'inline-flex';
  }

  fichaAberta = true;
  currentViewingPeerId = peerId;
  currentMasterFichaId = null;

  // Carregar a ficha no iframe se ainda não carregou
  if (!iframe.src || iframe.src === window.location.href) {
    iframe.src = FICHA_URL;
  }

  const sendData = () => {
    iframe.contentWindow?.postMessage({
      type: 'vtt-load-sheet-data',
      data: entry.resumo.fullData,
      readOnly: true
    }, '*');
  };

  // Envia os dados logo, e em caso de recarga, o 'ficha-ready' acima cuidará de enviar novamente
  setTimeout(sendData, 300);
}

function criarTokenDaFicha() {
  if (myRole === 'mestre') {
    if (currentMasterFichaId) {
      const fichas = getMasterFichas();
      const ficha = fichas.find(f => f.id === currentMasterFichaId);
      if (ficha) {
        adicionarTokenAutomatico({
          name: ficha.name,
          hp: ficha.pvC || ficha.pvM,
          hpMax: ficha.pvM,
          pm: ficha.pmC || ficha.pmM,
          pmMax: ficha.pmM,
          defense: ficha.defenseTotal,
          imageUrl: ficha.imageUrl || ficha.fullData?.charImage || '',
          controlledBy: null,
          masterFichaId: ficha.id
        });
      } else {
        toast('Ficha do mestre não encontrada.');
      }
    } else if (currentViewingPeerId) {
      const entry = fichasJogadores[currentViewingPeerId];
      if (entry && entry.resumo) {
        adicionarTokenAutomatico({
          name: entry.resumo.charName,
          hp: entry.resumo.pvC || entry.resumo.pvM,
          hpMax: entry.resumo.pvM,
          pm: entry.resumo.pmC || entry.resumo.pmM,
          pmMax: entry.resumo.pmM,
          defense: entry.resumo.defenseTotal,
          imageUrl: entry.resumo.charImage,
          controlledBy: currentViewingPeerId
        });
      } else {
        toast('Ficha ativa sem resumo de dados.');
      }
    } else {
      toast('Nenhuma ficha aberta no momento.');
    }
  } else if (myRole === 'jogador') {
    // Impede que o jogador crie mais de um token controlado
    const jaTemToken = (typeof BOARD !== 'undefined' && BOARD.tokens) ? BOARD.tokens.some(t => t.controlledBy === myPeerId) : false;
    if (jaTemToken) {
      toast('⚠️ Você já possui um token no mapa. Apenas um token por jogador.');
      return;
    }
    if (localFichaUpdateData) {
      let localImg = '';
      try {
        localImg = localStorage.getItem('charImage') || '';
      } catch (e) { }
      const imgUrl = localFichaUpdateData.charImage || localImg;
      if (amIHost) {
        adicionarTokenAutomatico({
          name: localFichaUpdateData.charName,
          hp: localFichaUpdateData.pvC || localFichaUpdateData.pvM,
          hpMax: localFichaUpdateData.pvM,
          pm: localFichaUpdateData.pmC || localFichaUpdateData.pmM || 0,
          pmMax: localFichaUpdateData.pmM || 0,
          defense: localFichaUpdateData.defenseTotal || 0,
          imageUrl: imgUrl,
          controlledBy: myPeerId
        });
      } else if (masterConn) {
        masterConn.send({
          type: 'solicitar-criar-token',
          name: localFichaUpdateData.charName,
          hp: localFichaUpdateData.pvC || localFichaUpdateData.pvM,
          hpMax: localFichaUpdateData.pvM,
          pm: localFichaUpdateData.pmC || localFichaUpdateData.pmM || 0,
          pmMax: localFichaUpdateData.pmM || 0,
          defense: localFichaUpdateData.defenseTotal || 0,
          imageUrl: imgUrl
        });
        toast('Solicitação de token enviada ao Mestre!');
      } else {
        toast('Sem conexão com o Mestre.');
      }
    } else {
      toast('Ficha ainda não sincronizou dados.');
    }
  }
}

function adicionarTokenAutomatico(opts) {
  snapshotBoard();
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const cx = BOARD.wrap.clientWidth / 2;
  const cy = BOARD.wrap.clientHeight / 2;
  const { gx, gy } = canvasToGrid(cx, cy);

  snapshotBoard();
  BOARD.tokens.push({
    id: 'tk' + Date.now() + Math.floor(Math.random() * 9999),
    name: opts.name || 'Token',
    hp: opts.hp || 0,
    hpMax: opts.hpMax || opts.hp || 0,
    pm: opts.pm || 0,
    pmMax: opts.pmMax || opts.pm || 0,
    defense: opts.defense || 0,
    size: 1,
    color: '#c9903a',
    imageUrl: opts.imageUrl || '',
    controlledBy: opts.controlledBy || null,
    masterFichaId: opts.masterFichaId || null,
    layer: opts.controlledBy ? 'players' : (BOARD.activeLayer || 'gm'),
    z: (BOARD.activeFloor || 0) * 10,
    visionType: opts.visionType || 'normal',
    auras: opts.auras || [],
    borderType: 'solid', borderWidth: 1.5, borderColor: '#000000',
    shapeType: 'circle', auraRadius: 0,
    conditions: [],
    hideName: false,
    gx: Math.max(0, gx),
    gy: Math.max(0, gy)
  });
  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
  toast(`Token de ${opts.name} criado no mapa!`);
}

// Verifica se um jogador já possui um token controlado (evita criar mais de um)
function jogadorJaTemToken(peerId) {
  if (!peerId) return false;
  if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
    return (typeof BOARD !== 'undefined' && BOARD.tokens) ? BOARD.tokens.some(t => t.controlledBy === peerId) : false;
  }
  const scene = SCENES.find(s => s.id === PLAYERS_SCENE_ID);
  return scene && scene.tokens ? scene.tokens.some(t => t.controlledBy === peerId && (t.layer || 'players') !== 'gm') : false;
}

function adicionarTokenNaCena(opts, sceneId) {
  if (sceneId === ACTIVE_SCENE_ID) {
    adicionarTokenAutomatico(opts);
    return;
  }
  
  const scene = SCENES.find(s => s.id === sceneId);
  if (!scene) return;
  
  if (!scene.tokens) scene.tokens = [];
  
  const cx = BOARD.wrap?.clientWidth / 2 || 400;
  const cy = BOARD.wrap?.clientHeight / 2 || 400;
  const gx = Math.max(0, Math.floor((cx - (BOARD.offsetX || 0)) / ((scene.gridSize || 50) * (BOARD.zoom || 1))));
  const gy = Math.max(0, Math.floor((cy - (BOARD.offsetY || 0)) / ((scene.gridSize || 50) * (BOARD.zoom || 1))));
  
  const newToken = {
    id: 'tk' + Date.now() + Math.floor(Math.random() * 9999),
    name: opts.name || 'Token',
    hp: opts.hp || 0,
    hpMax: opts.hpMax || opts.hp || 0,
    pm: opts.pm || 0,
    pmMax: opts.pmMax || opts.pm || 0,
    defense: opts.defense || 0,
    size: 1,
    color: '#c9903a',
    imageUrl: opts.imageUrl || '',
    controlledBy: opts.controlledBy || null,
    masterFichaId: opts.masterFichaId || null,
    layer: opts.controlledBy ? 'players' : 'gm',
    z: (scene.activeFloor || 0) * 10,
    visionType: opts.visionType || 'normal',
    auras: opts.auras || [],
    borderType: 'solid', borderWidth: 1.5, borderColor: '#000000',
    shapeType: 'circle', auraRadius: 0,
    conditions: [],
    hideName: false,
    gx: Math.max(0, gx),
    gy: Math.max(0, gy)
  };
  
  scene.tokens.push(newToken);
  saveScenesLocally();
  
  const filtered = scene.tokens.filter(t => (t.layer || 'players') !== 'gm');
  broadcast({ type: 'board-tokens', tokens: filtered }, null);
}

function temControleToken(t) {
  if (myRole === 'mestre') return true;
  return t && t.controlledBy === myPeerId;
}

// ══════════════════════════════════════════════════════
//  MODO "SÓ O SEU TOKEN" (jogadores)
//  Padrão: o jogador só pode selecionar o próprio token,
//  evitando seleção acidental de tokens dos outros.
//  Desative para poder selecionar qualquer token (mirar/atacar).
// ══════════════════════════════════════════════════════
let selecaoPropriaJogador = localStorage.getItem('vtt_selecao_propria') !== '0';
let selecaoPropriaLastToast = 0;

function toggleSelecaoPropria() {
  if (myRole !== 'jogador') return;
  selecaoPropriaJogador = !selecaoPropriaJogador;
  localStorage.setItem('vtt_selecao_propria', selecaoPropriaJogador ? '1' : '0');
  if (selecaoPropriaJogador) {
    [...BOARD.selectedTokens].forEach(id => {
      const t = BOARD.tokens.find(tk => tk.id === id);
      if (t && !temControleToken(t)) BOARD.selectedTokens.delete(id);
    });
    BOARD.mountPendingId = null;
    atualizarBotoesTokenSelected();
    boardRender();
    atualizarVisaoJogadorPorSelecao();
  }
  atualizarBotaoSelecaoPropria();
}

function atualizarBotaoSelecaoPropria() {
  const btn = document.getElementById('btnSelecaoPropria');
  const mob = document.getElementById('mobSelecaoPropriaBtn');
  const isJogador = myRole === 'jogador';
  [btn, mob].forEach(el => { if (el) el.style.display = isJogador ? '' : 'none'; });
  if (btn) {
    btn.classList.toggle('active', selecaoPropriaJogador);
    btn.title = selecaoPropriaJogador
      ? '🛡 Só o seu token — clique para poder selecionar qualquer token (ex.: mirar/atacar)'
      : '🛡 Seleção livre — clique para voltar a só o seu token';
  }
  if (mob) {
    mob.style.display = isJogador ? '' : 'none';
    mob.textContent = selecaoPropriaJogador ? '🛡 Só eu (ON)' : '🛡 Só eu (OFF)';
  }
}

function solicitarMoverToken(tokenId, gx, gy) {
  if (masterConn) {
    masterConn.send({
      type: 'solicitar-mover-token',
      tokenId,
      gx,
      gy
    });
  }
}

function moverTokenPorSeta(key) {
  const dx = key === 'ArrowLeft' ? -1 : key === 'ArrowRight' ? 1 : 0;
  const dy = key === 'ArrowUp' ? -1 : key === 'ArrowDown' ? 1 : 0;
  if (!dx && !dy) return;

  let tokens = BOARD.tokens.filter(t =>
    BOARD.selectedTokens.has(t.id) && temControleToken(t)
  );
  if (tokens.length === 0) {
    const primeiro = BOARD.tokens.find(t => temControleToken(t));
    if (primeiro) tokens = [primeiro];
  }
  if (tokens.length === 0) return;

  snapshotBoard();
  tokens.forEach(t => {
    if (t.conditions && (t.conditions.indexOf('Imóvel') !== -1 || t.conditions.indexOf('Petrificado') !== -1 || t.conditions.indexOf('Inconsciente') !== -1 || t.conditions.indexOf('Paralisado') !== -1)) return;
    const newGx = Math.max(0, (t.gx || 0) + dx);
    const newGy = Math.max(0, (t.gy || 0) + dy);
    if (_isBlind(t) && (checkMoveBlocked(t, t.gx, t.gy, newGx, newGy) || _checkTokenCollision(t, newGx, newGy))) {
      _revealBlindBlocker(t, newGx, newGy, t.gx, t.gy);
      return;
    }
    t.gx = newGx;
    t.gy = newGy;
    if (getParMontaria(t)) seguirMontaria(t);
  });

  if (myRole === 'mestre' || amIHost) {
    boardSave();
    if (emVisaoJogador()) {
      atualizarFogJogador();
    } else {
      boardRender();
    }
    syncBoardTokensToPlayers();
  } else {
    // Montaria: garante que o par inteiro seja enviado ao mestre
    const enviarIds = new Set();
    let montariaEnvolvida = false;
    tokens.forEach(t => {
      enviarIds.add(t.id);
      const par = getParMontaria(t);
      if (par) {
        enviarIds.add(par.rider.id);
        enviarIds.add(par.mount.id);
        montariaEnvolvida = true;
      }
    });
    if (montariaEnvolvida || tokens.length === 1) {
      enviarIds.forEach(id => {
        const tk = BOARD.tokens.find(t => t.id === id);
        if (tk) solicitarMoverToken(tk.id, tk.gx, tk.gy);
      });
    }
  }
  tokens.forEach(t => setTimeout(() => verificarGatilhosToken(t), 50));
  setTimeout(atualizarFogJogador, 50);
  setTimeout(atualizarSeguirToken, 50);
}

function popularControleSelect(selectedVal) {
  const sel = document.getElementById('tfControlledBy');
  if (!sel) return;
  sel.innerHTML = '<option value="">Apenas Mestre</option>';
  Object.entries(players).forEach(([pid, p]) => {
    const opt = document.createElement('option');
    opt.value = pid;
    opt.textContent = p.name + (p.role === 'mestre' ? ' (Mestre)' : '');
    if (pid === selectedVal) opt.selected = true;
    sel.appendChild(opt);
  });
}

function preencherFormAuras(auras) {
  const grupos = document.querySelectorAll('#tfAuraList .aura-group');
  grupos.forEach((g, i) => {
    const a = auras[i] || {};
    const activeCb = g.querySelector('.aura-active');
    if (activeCb) activeCb.checked = a.active !== false;
    const nameEl = g.querySelector('.aura-name');
    if (nameEl) nameEl.value = a.name || '';
    const radiusEl = g.querySelector('.aura-radius');
    if (radiusEl) radiusEl.value = a.radius || '';
    const lightCb = g.querySelector('.aura-light');
    if (lightCb) lightCb.checked = !!a.light;
  });
}

function lerAurasForm() {
  const auras = [];
  document.querySelectorAll('#tfAuraList .aura-group').forEach(g => {
    const activeCb = g.querySelector('.aura-active');
    const active = activeCb ? activeCb.checked : true;
    const name = (g.querySelector('.aura-name')?.value || '').trim();
    const radius = parseInt(g.querySelector('.aura-radius')?.value) || 0;
    const light = !!(g.querySelector('.aura-light')?.checked);
    // Sempre salvar as duas auras (mesmo sem nome/raio), para manter a posição dos índices
    auras.push({ active, name, radius, light });
  });
  return auras;
}

// Mestre recebe resumo de ficha de um jogador
let _resumoSyncTimeout = null;
function receberResumoFicha(data) {
  fichasJogadores[data.peerId] = { playerName: data.playerName, resumo: data.resumo, ts: Date.now() };
  renderFichasJogadores();
  combatInitFichaAutocomplete();

  // Sincronizar HP do token correspondente no tabuleiro do mestre
  let tokenChanged = false;
  BOARD.tokens.forEach(t => {
    if (t.controlledBy === data.peerId) {
      t.hp = data.resumo.pvC;
      t.hpMax = data.resumo.pvM;
      tokenChanged = true;
    }
  });
  if (tokenChanged) {
    boardSave();
    boardRender();
    // Debounce para evitar loop com ficha-resumo → board-tokens → ficha-resumo
    if (_resumoSyncTimeout) clearTimeout(_resumoSyncTimeout);
    _resumoSyncTimeout = setTimeout(syncBoardTokensToPlayers, 150);
  }

  // Se o mestre estiver lendo essa ficha no momento, atualiza em tempo real
  if (myRole === 'mestre' && currentViewingPeerId === data.peerId) {
    const iframe = document.getElementById('ficha-iframe');
    iframe.contentWindow?.postMessage({
      type: 'vtt-load-sheet-data',
      data: data.resumo.fullData,
      readOnly: true
    }, '*');
  }
}

function renderFichasJogadores() {
  const container = document.getElementById('fichas-jogadores-list');
  if (!container) return;
  const entries = Object.entries(fichasJogadores);
  if (entries.length === 0) {
    container.innerHTML = myRole === 'jogador'
      ? '<div class="ficha-sem-dados">Você ainda não carregou sua ficha.<br>Clique em "📋 Abrir / Carregar minha ficha" acima (ou no botão "📋 Ficha" no topo).</div>'
      : '<div class="ficha-sem-dados">Nenhuma ficha recebida ainda.<br>Peça aos jogadores clicarem em "📋 Ficha".</div>';
    return;
  }
  container.innerHTML = '';
  entries.forEach(([pid, entry]) => {
    const r = entry.resumo;
    const pvPct = r.pvM > 0 ? Math.min(100, Math.round((r.pvC / r.pvM) * 100)) : 0;
    const pmPct = r.pmM > 0 ? Math.min(100, Math.round((r.pmC / r.pmM) * 100)) : 0;
    const hpColor = pvPct > 50 ? '#3a7a42' : pvPct > 25 ? '#8a7a1a' : '#8a2a1a';
    const card = document.createElement('div');
    card.className = 'ficha-jogador-card';
    card.onclick = () => abrirFichaJogador(pid); // Adicionado clique para abrir
    card.innerHTML = `
      <div class="ficha-jogador-nome">${escHTML(r.charName || '(sem nome)')}</div>
      <div class="ficha-jogador-classe">${escHTML(entry.playerName)} · ${escHTML(r.charClass || '—')} Nv${r.charLevel || '?'} · ${escHTML(r.charRace || '—')}</div>
      <div class="ficha-resumo-bars" style="margin-top:0.3rem;">
        <div class="ficha-resumo-bar">
          <span style="color:var(--text-muted);font-size:0.65rem;">PV</span>
          <div class="ficha-bar-track"><div class="ficha-bar-hp" style="width:${pvPct}%;background:${hpColor};"></div></div>
          <span>${r.pvC}/${r.pvM}</span>
        </div>
        ${r.pmM > 0 ? `<div class="ficha-resumo-bar">
          <span style="color:var(--text-muted);font-size:0.65rem;">PM</span>
          <div class="ficha-bar-track"><div class="ficha-bar-mp" style="width:${pmPct}%;"></div></div>
          <span>${r.pmC}/${r.pmM}</span>
        </div>` : ''}
        <div class="ficha-resumo-bar" style="margin-left:auto;">
          <span style="color:var(--text-muted);font-size:0.65rem;">Def</span>
          <span style="color:var(--gold-light);font-weight:600;">${escHTML(String(r.defenseTotal || '—'))}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// ══════════════════════════════════════════════════════
//  FICHAS DO MESTRE (upload / import)
// ══════════════════════════════════════════════════════
function getMasterFichas() {
  try {
    const raw = localStorage.getItem(MASTER_FICHAS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) { return []; }
}

function saveMasterFichas(fichas) {
  localStorage.setItem(MASTER_FICHAS_KEY, JSON.stringify(fichas));
}

function uploadFichaMestre(input) {
  const file = input.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const data = JSON.parse(e.target.result);
      const fichas = getMasterFichas();
      const id = 'mf' + Date.now() + Math.floor(Math.random() * 9999);
      const name = data.charName || data.name || 'Personagem';
      const status = data.status || {};
      fichas.push({
        id, name,
        class: data.charClass || data.class || '',
        level: data.charLevel || data.level || '1',
        race: data.charRace || data.race || '',
        pvM: status.pvM || data.pvM || 0,
        pvC: status.pvC || data.pvC || 0,
        pmM: status.pmM || data.pmM || 0,
        pmC: status.pmC || data.pmC || 0,
        defenseTotal: (data.defenseTotal && parseInt(data.defenseTotal)) || (() => {
          const d = data.defense || {};
          return 10 + (parseInt(d.armor?.bonus) || 0) + (parseInt(d.shield?.bonus) || 0);
        })(),
        imageUrl: data.charImage || data.imageUrl || '',
        fullData: data,
        importedAt: Date.now()
      });
      saveMasterFichas(fichas);
      renderMasterFichas();
      combatInitFichaAutocomplete();
      toast('📋 Ficha importada com sucesso!');
    } catch (error) {
      alert('Erro ao carregar ficha. Verifique se é um arquivo JSON de ficha válido.');
      console.error(error);
    }
  };
  reader.readAsText(file);
  input.value = '';
}

function deleteMasterFicha(id) {
  let fichas = getMasterFichas();
  fichas = fichas.filter(f => f.id !== id);
  saveMasterFichas(fichas);
  renderMasterFichas();
  combatInitFichaAutocomplete();
}

function abrirFichaMestre(id) {
  const fichas = getMasterFichas();
  const ficha = fichas.find(f => f.id === id);
  if (!ficha || !ficha.fullData) {
    alert('Dados completos da ficha não encontrados.');
    return;
  }

  const panel = document.getElementById('ficha-panel');
  const board = document.querySelector('.board');
  const btn = document.getElementById('btn-ficha');
  const iframe = document.getElementById('ficha-iframe');

  const titleEl = document.querySelector('.ficha-panel-title');
  if (titleEl) titleEl.textContent = `📋 ${ficha.name}`;

  const statusEl = document.getElementById('ficha-sync-status');
  if (statusEl) {
    statusEl.textContent = '📂 Ficha do Mestre';
    statusEl.style.color = '#c9903a';
  }

  panel.classList.add('active');
  if (board) board.style.display = 'none';

  if (btn) {
    btn.textContent = '🗺 Mapa';
    btn.classList.add('btn-primary');
    btn.classList.remove('btn-gold');
    btn.style.display = 'inline-flex';
  }

  fichaAberta = true;
  currentViewingPeerId = null;
  currentMasterFichaId = id;

  if (!iframe.src || iframe.src === window.location.href) {
    iframe.src = FICHA_URL;
  }

  const sendData = () => {
    iframe.contentWindow?.postMessage({
      type: 'vtt-load-sheet-data',
      data: ficha.fullData,
      readOnly: true
    }, '*');
  };

  setTimeout(sendData, 300);
}

function renderMasterFichas() {
  const container = document.getElementById('fichas-mestre-list');
  if (!container) return;
  const fichas = getMasterFichas();
  if (fichas.length === 0) {
    container.innerHTML = '<div class="ficha-sem-dados">Nenhuma ficha importada ainda.<br>Use o botão acima para importar fichas do Mestre.</div>';
    return;
  }
  container.innerHTML = '';
  fichas.forEach(f => {
    const pvPct = f.pvM > 0 ? Math.min(100, Math.round((f.pvC / f.pvM) * 100)) : 0;
    const pmPct = f.pmM > 0 ? Math.min(100, Math.round((f.pmC / f.pmM) * 100)) : 0;
    const hpColor = pvPct > 50 ? '#3a7a42' : pvPct > 25 ? '#8a7a1a' : '#8a2a1a';
    const card = document.createElement('div');
    card.className = 'ficha-jogador-card';
    card.onclick = () => abrirFichaMestre(f.id);
    const safeName = escHTML(f.name);
    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:flex-start;">
        <div>
          <div class="ficha-jogador-nome">${safeName}</div>
          <div class="ficha-jogador-classe">${escHTML(f.class || '—')} Nv${f.level || '?'} · ${escHTML(f.race || '—')}</div>
        </div>
        <button class="btn btn-sm delete-ficha-btn" onclick="event.stopPropagation(); if(confirm('Excluir ${safeName}?')) deleteMasterFicha('${f.id}')">✕</button>
      </div>
      <div class="ficha-resumo-bars" style="margin-top:0.3rem;">
        <div class="ficha-resumo-bar">
          <span style="color:var(--text-muted);font-size:0.65rem;">PV</span>
          <div class="ficha-bar-track"><div class="ficha-bar-hp" style="width:${pvPct}%;background:${hpColor};"></div></div>
          <span>${f.pvC}/${f.pvM}</span>
        </div>
        ${f.pmM > 0 ? `<div class="ficha-resumo-bar">
          <span style="color:var(--text-muted);font-size:0.65rem;">PM</span>
          <div class="ficha-bar-track"><div class="ficha-bar-mp" style="width:${pmPct}%;"></div></div>
          <span>${f.pmC}/${f.pmM}</span>
        </div>` : ''}
        <div class="ficha-resumo-bar" style="margin-left:auto;">
          <span style="color:var(--text-muted);font-size:0.65rem;">Def</span>
          <span style="color:var(--gold-light);font-weight:600;">${escHTML(String(f.defenseTotal || '—'))}</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function switchTab(name) {
  ['encontros', 'combate', 'fichas', 'bau', 'cenas'].forEach(t => {
    document.getElementById('tab-' + t)?.classList.toggle('active', t === name);
    document.getElementById('content-' + t)?.classList.toggle('active', t === name);
  });
  if (name === 'cenas') renderizarListaCenas();
  if (name === 'bau') {
    if (currentBauSubtab === 'magias') {
      if (!magiasInitialized) initMagias();
    } else if (currentBauSubtab === 'bestiario') {
      initBestiario();
    } else {
      initBau();
    }
  }
}

// ── Compêndio: Sub-abas ──
let currentBauSubtab = 'equip';
let poderesInitialized = false;
let poderesSecaoAtiva = 'origens';
let poderesSubfiltro = '';

function switchBauSubtab(tab) {
  currentBauSubtab = tab;
  const equipPanel = document.getElementById('bau-panel-equip');
  const magiasPanel = document.getElementById('bau-panel-magias');
  const poderesPanel = document.getElementById('bau-panel-poderes');
  const bestiaryPanel = document.getElementById('bau-panel-bestiary');
  const equipBtn = document.getElementById('bau-subtab-equip');
  const magiasBtn = document.getElementById('bau-subtab-magias');
  const poderesBtn = document.getElementById('bau-subtab-poderes');
  const bestiaryBtn = document.getElementById('bau-subtab-bestiary');

  // Hide all
  [equipPanel, magiasPanel, poderesPanel, bestiaryPanel].forEach(p => { if (p) p.style.display = 'none'; });
  // Reset all buttons
  [equipBtn, magiasBtn, poderesBtn, bestiaryBtn].forEach(b => {
    if (b) { b.style.borderBottom = '2px solid transparent'; b.style.color = 'var(--text-muted)'; }
  });

  if (tab === 'equip') {
    if (equipPanel) { equipPanel.style.display = 'flex'; equipPanel.style.flexDirection = 'column'; }
    if (equipBtn) { equipBtn.style.borderBottom = '2px solid var(--gold)'; equipBtn.style.color = 'var(--gold)'; }
    if (!bauInitialized) initBau();
  } else if (tab === 'magias') {
    if (magiasPanel) { magiasPanel.style.display = 'flex'; magiasPanel.style.flexDirection = 'column'; }
    if (magiasBtn) { magiasBtn.style.borderBottom = '2px solid var(--gold)'; magiasBtn.style.color = 'var(--gold)'; }
    if (!magiasInitialized) initMagias();
  } else if (tab === 'poderes') {
    if (poderesPanel) { poderesPanel.style.display = 'flex'; poderesPanel.style.flexDirection = 'column'; }
    if (poderesBtn) { poderesBtn.style.borderBottom = '2px solid var(--gold)'; poderesBtn.style.color = 'var(--gold)'; }
    if (!poderesInitialized) initPoderes();
  } else if (tab === 'bestiario') {
    if (bestiaryPanel) { bestiaryPanel.style.display = 'flex'; bestiaryPanel.style.flexDirection = 'column'; }
    if (bestiaryBtn) { bestiaryBtn.style.borderBottom = '2px solid var(--gold)'; bestiaryBtn.style.color = 'var(--gold)'; }
    initBestiario();
  }
}

function recarregarCompendio() {
  bauInitialized = false;
  bauItemsCache = null;
  magiasInitialized = false;
  magiasCache = null;
  poderesInitialized = false;
  if (currentBauSubtab === 'equip') initBau();
  else if (currentBauSubtab === 'magias') initMagias();
  else if (currentBauSubtab === 'poderes') initPoderes();
  else if (currentBauSubtab === 'bestiario') { buscarBestiario(); }
}

// ── Baú de Itens: apenas Equipamentos ──
let bauItemsCache = null;
let bauInitialized = false;
let bauCategoriaFiltro = '';

function initBau() {
  if (bauInitialized) return;
  bauInitialized = true;
  carregarBau();
}

function carregarBau() {
  const resultsEl = document.getElementById('bauResults');
  const loadingEl = document.getElementById('bauLoading');
  const errorEl = document.getElementById('bauError');
  if (!resultsEl) return;
  resultsEl.innerHTML = '';
  errorEl.style.display = 'none';
  loadingEl.style.display = 'block';
  try {
    const combined = [
      ...(typeof armasData !== 'undefined' ? (armasData.arma || []) : []),
      ...(typeof armadurasData !== 'undefined' ? (armadurasData.armadura || []) : []),
      ...(typeof itensData !== 'undefined' ? (itensData.item || []) : []),
      ...(typeof itensMagicosData !== 'undefined' ? (itensMagicosData.item || []) : []),
      ...(typeof modificacoesData !== 'undefined' ? (modificacoesData.modificacao || []) : []),
      ...(typeof enchantmentosData !== 'undefined' ? (enchantmentosData.encantamento || []) : []),
      ...(typeof maldicaoData !== 'undefined' ? (maldicaoData.maldicao || []) : [])
    ];
    if (combined.length === 0) throw new Error('Nenhum dado encontrado');
    bauItemsCache = combined;
    loadingEl.style.display = 'none';
    buscarItemBau();
    toast(`📚 ${bauItemsCache.length} registros carregados no Compêndio!`);
  } catch (e) {
    console.error('Erro ao carregar compêndio:', e);
    loadingEl.style.display = 'none';
    errorEl.textContent = 'Erro ao carregar itens: ' + e.message;
    errorEl.style.display = 'block';
    if (!bauItemsCache) {
      resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Clique em "⟳" para tentar novamente.</div>';
    }
  }
}

function buscarItemBau() {
  const input = document.getElementById('bauSearch');
  const termo = (input?.value || '').toLowerCase().trim();
  const resultsEl = document.getElementById('bauResults');
  if (!resultsEl) return;
  if (!bauItemsCache) {
    resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Carregando Compêndio...</div>';
    carregarBau();
    return;
  }
  let filtrados = bauItemsCache;
  if (bauCategoriaFiltro) {
    filtrados = filtrados.filter(i => i.categoria === bauCategoriaFiltro);
  }
  if (termo) {
    filtrados = filtrados.filter(i =>
      (i.nome || '').toLowerCase().includes(termo) ||
      (i.categoria || '').toLowerCase().includes(termo) ||
      (i.tipo || '').toLowerCase().includes(termo) ||
      (i.descricao || '').toLowerCase().includes(termo)
    );
  }
  renderBauItems(filtrados.slice(0, 200));
}

function setBauCategoria(btn, cat) {
  bauCategoriaFiltro = cat;
  document.querySelectorAll('.bau-categorias .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarItemBau();
}

let collapsedBauCategories = new Set(['Equipamentos', 'Arma', 'Armadura', 'Escudo', 'Item Geral', 'Item Superior', 'Item Mágico', 'encantamento', 'Maldição']);

function toggleBauFolder(cat) {
  if (collapsedBauCategories.has(cat)) {
    collapsedBauCategories.delete(cat);
  } else {
    collapsedBauCategories.add(cat);
  }
  buscarItemBau();
}

// ── Bestiário ──
let bestiarioCache = null;
let bestiarioInitialized = false;
let bestiarioNdFiltro = '';
let collapsedBestiarioNds = new Set(['1/4', '1/2', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 'S', 'S+']);
const bestiarioNdColors = {
  '1/4': '#8a8a5a', '1/2': '#8a8a5a', '1': '#6a9a4a', '2': '#6a9a4a', '3': '#4a8a6a', '4': '#4a8a6a',
  '5': '#4a6a9a', '6': '#4a6a9a', '7': '#6a4a8a', '8': '#6a4a8a', '9': '#8a4a6a', '10': '#8a4a6a',
  '11': '#9a4a4a', '12': '#9a4a4a', '13': '#aa3a3a', '14': '#aa3a3a', '15': '#ba2a2a', '16': '#ba2a2a',
  '17': '#ca1a1a', '18': '#ca1a1a', '19': '#da0a0a', '20': '#da0a0a', 'S': '#ff0044', 'S+': '#ff0044'
};

function initBestiario() {
  if (bestiarioInitialized && bestiarioCache) { buscarBestiario(); return; }
  bestiarioInitialized = true;
  carregarBestiario();
}

function carregarBestiario() {
  const loadingEl = document.getElementById('bestiaryLoading');
  const resultsEl = document.getElementById('bestiaryResults');
  if (loadingEl) loadingEl.style.display = 'block';
  if (resultsEl) resultsEl.innerHTML = '';
  try {
    if (typeof AMEACAS_DB === 'undefined' || !Array.isArray(AMEACAS_DB) || AMEACAS_DB.length === 0) {
      throw new Error('Banco de ameaças não encontrado');
    }
    bestiarioCache = AMEACAS_DB;
    if (loadingEl) loadingEl.style.display = 'none';
    buscarBestiario();
  } catch (e) {
    console.error('Erro ao carregar bestiário:', e);
    if (loadingEl) loadingEl.style.display = 'none';
    if (resultsEl) {
      resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--red-bright);font-style:italic;">Erro: ' + escHTML(e.message) + '</div>';
    }
  }
}

function setBestiarioNdFiltro(btn, nd) {
  bestiarioNdFiltro = nd;
  document.querySelectorAll('#bestiaryNdFiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarBestiario();
}

function buscarBestiario() {
  const input = document.getElementById('bestiarySearch');
  const termo = (input?.value || '').toLowerCase().trim();
  const resultsEl = document.getElementById('bestiaryResults');
  const countEl = document.getElementById('bestiaryCount');
  if (!resultsEl) return;
  if (!bestiarioCache) {
    resultsEl.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Carregando bestiário...</div>';
    carregarBestiario();
    return;
  }
  let filtrados = bestiarioCache;
  if (bestiarioNdFiltro) {
    filtrados = filtrados.filter(c => String(c.nd) === bestiarioNdFiltro);
  }
  if (termo) {
    filtrados = filtrados.filter(c =>
      (c.nome || '').toLowerCase().includes(termo) ||
      (c.tipo || '').toLowerCase().includes(termo) ||
      (c.nd || '').toLowerCase().includes(termo)
    );
  }
  if (countEl) countEl.textContent = filtrados.length + ' registros';
  renderBestiario(filtrados);
}

function renderBestiario(criaturas) {
  const el = document.getElementById('bestiaryResults');
  if (!el) return;
  if (criaturas.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhuma criatura encontrada.</div>';
    return;
  }

  // Group by ND
  const grupos = {};
  criaturas.forEach(c => {
    const nd = String(c.nd || '?');
    if (!grupos[nd]) grupos[nd] = [];
    grupos[nd].push(c);
  });

  const ndOrder = ['1/4', '1/2', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', 'S', 'S+'];
  const sortedNds = Object.keys(grupos).sort((a, b) => {
    const ia = ndOrder.indexOf(a); const ib = ndOrder.indexOf(b);
    return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
  });

  const ndColors = bestiarioNdColors;
  const ndLabel = nd => nd === 'S+' ? 'S+' : nd === 'S' ? 'S' : `ND ${nd}`;

  let html = '';
  sortedNds.forEach(nd => {
    const lista = grupos[nd];
    const collapsed = collapsedBestiarioNds.has(nd);
    const cor = ndColors[nd] || '#555';

    html += `
      <div onclick="toggleBestiarioFolder('${escHTML(nd)}')" style="display:flex;align-items:center;justify-content:space-between;padding:0.4rem 0.5rem;background:var(--parch2);border:1px solid var(--border);border-left:3px solid ${cor};border-radius:4px;cursor:pointer;margin-top:0.35rem;user-select:none;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.borderLeftColor='${cor}'">
        <span style="font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;color:var(--gold);display:flex;align-items:center;gap:0.35rem;">
          <span style="background:${cor};color:#fff;padding:0.1rem 0.4rem;border-radius:3px;font-size:0.7rem;">${escHTML(ndLabel(nd))}</span>
          <span style="font-size:0.65rem;color:var(--text-muted);font-weight:normal;">(${lista.length})</span>
        </span>
        <i class="bi bi-chevron-${collapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.75rem;"></i>
      </div>
      <div style="display:${collapsed ? 'none' : 'flex'};flex-direction:column;gap:0.2rem;padding-left:0.4rem;border-left:1px dashed var(--border);margin-left:0.5rem;margin-top:0.2rem;margin-bottom:0.3rem;">
    `;

    html += lista.map(c => {
      const pv = parseInt(c.pv) || 0;
      const def = c.defesa || '—';
      const init = c.iniciativa || '—';
      return `<div onclick="mostrarDetalhesCriatura('${escHTML(c.nome)}')" draggable="true" ondragstart="arrastarBestiario(event,'${escHTML(c.nome)}')"
        style="display:flex;align-items:center;gap:0.45rem;padding:0.28rem 0.4rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.12s;"
        onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'"
        title="${escHTML(c.tipo || '')} · PV ${pv} · Def ${def}">
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.72rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(c.nome)}</div>
          <div style="font-size:0.58rem;color:var(--text-muted);">${escHTML(c.tipo || '—')} · PV ${pv} · Def ${def} · INI ${init}</div>
        </div>
      </div>`;
    }).join('');

    html += `</div>`;
  });

  el.innerHTML = html;
}

function toggleBestiarioFolder(nd) {
  if (collapsedBestiarioNds.has(nd)) {
    collapsedBestiarioNds.delete(nd);
  } else {
    collapsedBestiarioNds.add(nd);
  }
  buscarBestiario();
}

function garantirBestiarioCarregado() {
  if (bestiarioCache && Array.isArray(bestiarioCache)) return true;
  if (typeof AMEACAS_DB !== 'undefined' && Array.isArray(AMEACAS_DB) && AMEACAS_DB.length > 0) {
    bestiarioCache = AMEACAS_DB;
    return true;
  }
  return false;
}

function mostrarDetalhesCriatura(nome) {
  if (!garantirBestiarioCarregado()) return;
  const c = bestiarioCache.find(x => x.nome === nome);
  if (!c) return;

  const titleEl = document.getElementById('itemDetailTitle');
  const contentEl = document.getElementById('itemDetailContent');
  const modalEl = document.getElementById('itemDetailModal');
  if (!titleEl || !contentEl || !modalEl) return;

  titleEl.textContent = c.nome;

  const ndCor = bestiarioNdColors[c.nd] || '#555';
  let html = '';

  // Tags
  html += `<div style="margin-bottom:0.75rem;display:flex;gap:0.4rem;flex-wrap:wrap;">`;
  html += `<span style="background:${ndCor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;">ND ${escHTML(String(c.nd))}</span>`;
  if (c.tipo) html += `<span style="background:rgba(255,255,255,0.08);border:1px solid var(--border);padding:0.15rem 0.5rem;border-radius:3px;color:var(--text-muted);font-size:0.8rem;">${escHTML(c.tipo)}</span>`;
  if (c.fonte) html += `<span style="background:rgba(212,175,55,0.1);border:1px solid var(--gold);padding:0.15rem 0.5rem;border-radius:3px;color:var(--gold);font-size:0.75rem;">${escHTML(c.fonte)}</span>`;
  html += `</div>`;

  // Stats grid
  html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.5rem;margin-bottom:0.75rem;font-size:0.9rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(100px,1fr));gap:0.4rem;">`;
  const nomeEnc = encodeURIComponent(c.nome);
  html += `<div><strong>PV:</strong> ${escHTML(c.pv || '—')}</div>`;
  html += `<div><strong>Defesa:</strong> ${escHTML(c.defesa || '—')}${c.defesaObs ? ' <em>(' + escHTML(c.defesaObs) + ')</em>' : ''}</div>`;
  if (c.iniciativa) html += `<div><strong>Iniciativa:</strong> <span onclick="rolarValorBestiario('${nomeEnc}','Iniciativa','${escHTML(c.iniciativa)}')" style="cursor:pointer;color:var(--text);">${escHTML(c.iniciativa)}</span></div>`;
  html += `<div><strong>Desloc.:</strong> ${escHTML(c.desl || '—')}</div>`;
  if (c.percepcao) html += `<div><strong>Percepção:</strong> <span onclick="rolarValorBestiario('${nomeEnc}','Percepção','${escHTML(c.percepcao)}')" style="cursor:pointer;color:var(--text);">${escHTML(c.percepcao)}</span>${c.percepcaoObs ? ' <em>(' + escHTML(c.percepcaoObs) + ')</em>' : ''}</div>`;
  if (c.pm !== undefined && c.pm !== '0') html += `<div><strong>PM:</strong> ${escHTML(String(c.pm))}</div>`;
  if (c.tesouro) html += `<div style="grid-column:1/-1;"><strong>Tesouro:</strong> ${escHTML(c.tesouro)}</div>`;
  html += `</div>`;

  // Resistências
  if (c.fort || c.ref || c.von) {
    html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.5rem;margin-bottom:0.75rem;font-size:0.9rem;display:flex;gap:0.6rem;flex-wrap:wrap;">`;
    if (c.fort) html += `<div><strong>Fort:</strong> <span onclick="rolarValorBestiario('${nomeEnc}','Fortitude','${escHTML(c.fort)}')" style="cursor:pointer;color:${parseInt(c.fort) >= 0 ? '#6aaa6a' : '#aa6a6a'};text-decoration:underline dotted;">${escHTML(c.fort)}</span></div>`;
    if (c.ref) html += `<div><strong>Ref:</strong> <span onclick="rolarValorBestiario('${nomeEnc}','Reflexos','${escHTML(c.ref)}')" style="cursor:pointer;color:${parseInt(c.ref) >= 0 ? '#6aaa6a' : '#aa6a6a'};text-decoration:underline dotted;">${escHTML(c.ref)}</span></div>`;
    if (c.von) html += `<div><strong>Von:</strong> <span onclick="rolarValorBestiario('${nomeEnc}','Vontade','${escHTML(c.von)}')" style="cursor:pointer;color:${parseInt(c.von) >= 0 ? '#6aaa6a' : '#aa6a6a'};text-decoration:underline dotted;">${escHTML(c.von)}</span></div>`;
    html += `</div>`;
  }

  // Atributos
  if (c.atributos) {
    html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.5rem;margin-bottom:0.75rem;font-size:0.85rem;display:flex;gap:0.5rem;flex-wrap:wrap;">`;
    const attr = c.atributos;
    const attrNomes = { for: 'Força', des: 'Destreza', con: 'Constituição', int: 'Inteligência', sab: 'Sabedoria', car: 'Carisma' };
    ['for', 'des', 'con', 'int', 'sab', 'car'].forEach(a => {
      const val = attr[a] !== undefined ? attr[a] : '—';
      const bonus = Math.floor((parseInt(val) - 10) / 2);
      html += `<div onclick="rolarValorBestiario('${nomeEnc}','${attrNomes[a]}','${bonus >= 0 ? '+' : ''}${bonus}')" style="text-align:center;min-width:40px;cursor:pointer;"><div style="font-size:0.6rem;color:var(--text-muted);text-transform:uppercase;font-weight:bold;">${a.toUpperCase()}</div><div style="font-weight:bold;color:var(--text);">${escHTML(String(val))}</div></div>`;
    });
    html += `</div>`;
  }

  // Perícias
  if (c.pericias && c.pericias.length > 0) {
    html += `<div style="font-size:0.75rem;color:var(--text-muted);font-family:'Cinzel',serif;margin-bottom:0.3rem;">PERÍCIAS</div>`;
    html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.4rem 0.6rem;margin-bottom:0.75rem;font-size:0.85rem;display:flex;flex-wrap:wrap;gap:0.2rem 0.6rem;">`;
    c.pericias.forEach(p => {
      html += `<span onclick="rolarValorBestiario('${nomeEnc}','${escHTML(p.nome)}','${escHTML(p.valor)}')" style="cursor:pointer;"><strong>${escHTML(p.nome)}</strong> ${escHTML(p.valor)}</span>`;
    });
    html += `</div>`;
  }

  // Ataques
  if (c.ataques && c.ataques.length > 0) {
    html += `<div style="font-size:0.75rem;color:#c94040;font-family:'Cinzel',serif;margin-bottom:0.3rem;">⚔ ATAQUES</div>`;
    c.ataques.forEach((a, ai) => {
      html += `<div onclick="rolarAtaqueBestiario('${encodeURIComponent(c.nome)}', ${ai})" style="cursor:pointer;background:var(--parch3);border:1px solid var(--border);border-left:3px solid #c94040;border-radius:4px;padding:0.4rem 0.6rem;margin-bottom:0.35rem;transition:background 0.15s;" onmouseenter="this.style.background='rgba(201,64,64,0.08)'" onmouseleave="this.style.background='var(--parch3)'">`;
      html += `<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;">`;
      html += `<strong style="font-size:0.85rem;">${escHTML(a.nome)}</strong>`;
      html += `<span style="font-size:0.72rem;color:var(--text-muted);">${escHTML(a.bonus || '')} · ${escHTML(a.dano || '')}</span>`;
      html += `</div>`;
      if (a.desc) html += `<div style="font-size:0.78rem;color:var(--text-dim);margin-top:0.2rem;font-style:italic;">${escHTML(a.desc)}</div>`;
      if (a.tipo) html += `<div style="font-size:0.65rem;color:var(--text-muted);margin-top:0.1rem;">${escHTML(a.tipo)}</div>`;
      html += `</div>`;
    });
  }

  // Habilidades
  if (c.habilidades && c.habilidades.length > 0) {
    html += `<div style="font-size:0.75rem;color:#c9903a;font-family:'Cinzel',serif;margin-bottom:0.3rem;margin-top:0.4rem;">✨ HABILIDADES</div>`;
    c.habilidades.forEach((h, hi) => {
      html += `<div onclick="exibirHabilidadeBestiario('${nomeEnc}', ${hi})" style="cursor:pointer;background:var(--parch3);border:1px solid var(--border);border-left:3px solid #c9903a;border-radius:4px;padding:0.4rem 0.6rem;margin-bottom:0.35rem;transition:background 0.15s;" onmouseenter="this.style.background='rgba(201,144,58,0.08)'" onmouseleave="this.style.background='var(--parch3)'">`;
      html += `<strong style="font-size:0.82rem;">${escHTML(h.nome)}</strong>`;
      if (h.tipo) html += ` <span style="font-size:0.65rem;color:var(--text-muted);">(${escHTML(h.tipo)})</span>`;
      if (h.desc) html += `<div style="font-size:0.78rem;color:var(--text-dim);margin-top:0.2rem;font-style:italic;">${escHTML(h.desc)}</div>`;
      html += `</div>`;
    });
  }

  contentEl.innerHTML = html;
  modalEl.style.display = 'flex';
  // Mostra botão "Criar Token" e guarda criatura atual
  window._bestiarioCriaturaAtual = c.nome;
  const btn = document.getElementById('btnCriarTokenBestiario');
  if (btn) btn.style.display = myRole === 'mestre' ? '' : 'none';
}

function rolarAtaqueBestiario(nomeEnc, atkIdx) {
  if (!bestiarioCache) return;
  const nome = decodeURIComponent(nomeEnc);
  const c = bestiarioCache.find(x => x.nome === nome);
  if (!c || !c.ataques || !c.ataques[atkIdx]) return;
  const a = c.ataques[atkIdx];

  const bonus = parseInt(a.bonus) || 0;
  const atkRoll = Math.floor(Math.random() * 20) + 1;
  const atkTotal = atkRoll + bonus;
  const isCrit = atkRoll === 20;

  let text = `**${escHTML(c.nome)} — ${escHTML(a.nome)}**\n`;
  text += `**Ataque:** 1d20${bonus >= 0 ? '+' : ''}${bonus} → **${atkTotal}** [${atkRoll}]${isCrit ? ' **(CRÍTICO!)**' : ''}`;

  // Rola dano se houver fórmula
  const danoFormula = (a.dano || '').trim();
  if (danoFormula) {
    const formula = isCrit ? `${escalarFormulaDados(danoFormula, 2)} (Crítico!)` : danoFormula;
    text += `\n**Dano:** ${formula} → `;
    // Processa cada dado na fórmula manualmente
    const danoPartes = formula.match(/([+-]?\s*\d*d\d+|[+-]?\s*\d+)/g);
    let danoTotal = 0;
    let det = '';
    if (danoPartes) {
      danoPartes.forEach(p => {
        const limpo = p.replace(/\s/g, '');
        const dm = limpo.match(/^([+-]?)(\d*)d(\d+)$/);
        if (dm) {
          const sinal = dm[1] === '-' ? -1 : 1;
          const qtd = parseInt(dm[2] || '1');
          const faces = parseInt(dm[3]);
          let soma = 0;
          const rl = [];
          for (let i = 0; i < qtd; i++) {
            const r = Math.floor(Math.random() * faces) + 1;
            rl.push(r); soma += r;
          }
          danoTotal += soma * sinal;
          if (det) det += ' + ';
          det += `${soma * sinal} [${rl.join(',')}]`;
        } else {
          const v = parseInt(limpo) || 0;
          danoTotal += v;
          if (det) det += ' + ';
          det += `${v}`;
        }
      });
    }
    text += `**${danoTotal}** (${det})`;
  }

  const msgData = { type: 'roll', name: myName || 'Bestiário', role: myRole, text, time: formatTime(), visibility: 'global' };
  addMsg(msgData);
  if (myRole === 'mestre' || amIHost) {
    broadcast(msgData, null);
  } else if (masterConn) {
    masterConn.send(msgData);
  }

  // Rola dados 3D
  if (typeof rolarDados3d === 'function' && atkRoll) {
    rolarDados3d(20, 1, [atkRoll], atkTotal, bonus, `⚔ ${a.nome}: `);
  }
}

function escalarFormulaDados(formula, mult) {
  return formula.replace(/(\d*)(d\d+)/g, (m, qtd, d) => {
    const n = parseInt(qtd || '1') * mult;
    return n + d;
  });
}

function rolarValorBestiario(nomeEnc, rotulo, valorStr) {
  if (!garantirBestiarioCarregado()) return;
  const nome = decodeURIComponent(nomeEnc);
  const bonus = parseInt(valorStr) || 0;
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + bonus;

  let text = `**${escHTML(nome)} — ${escHTML(rotulo)}**\n`;
  text += `**Teste:** 1d20${bonus >= 0 ? '+' : ''}${bonus} → **${total}** [${roll}]${roll === 20 ? ' **(CRÍTICO!)**' : ''}`;

  const msgData = { type: 'roll', name: myName || 'Bestiário', role: myRole, text, time: formatTime(), visibility: 'global' };
  addMsg(msgData);
  if (myRole === 'mestre' || amIHost) {
    broadcast(msgData, null);
  } else if (masterConn) {
    masterConn.send(msgData);
  }

  // Iniciativa no bestiário: já adiciona/atualiza a criatura no tracker de combate (só mestre)
  const rotuloNorm = String(rotulo || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  if (rotuloNorm.includes('iniciativa') && (myRole === 'mestre' || amIHost)) {
    const c = bestiarioCache.find(x => x.nome === nome);
    if (c) adicionarIniciativaBestiarioAoCombate(c, total);
  }
}

function adicionarIniciativaBestiarioAoCombate(c, initTotal) {
  if (!c) return;
  if (!combatState) combatState = combatDefaultState();
  const nome = c.nome || 'Criatura';

  // Se a criatura já está no combate, só atualiza a iniciativa
  const existing = combatState.combatants.find(x => x.name === nome);
  if (existing) {
    existing.init = initTotal;
    combatLogAdd(`🎲 ${nome} atualizou iniciativa: ${initTotal}`);
  } else {
    const id = 'c' + Date.now() + Math.floor(Math.random() * 99999);
    const def = c.defesa + (c.defesaObs ? ` (${c.defesaObs})` : '');
    const res = `Fort ${c.fort || '+0'}, Ref ${c.ref || '+0'}, Von ${c.von || '+0'}`;
    let notes = `Tipo: ${c.tipo || '—'} | ND: ${c.nd || '—'}\nDeslocamento: ${c.desl || '—'}\n`;
    if (c.atributos) { const a = c.atributos; notes += `FOR ${a.for || '—'}, DES ${a.des || '—'}, CON ${a.con || '—'}, INT ${a.int || '—'}, SAB ${a.sab || '—'}, CAR ${a.car || '—'}\n`; }
    notes += '\n--- ATAQUES ---\n';
    if (Array.isArray(c.ataques)) c.ataques.forEach(a => { notes += `• ${a.nome}: ${a.tipo || ''} ${a.bonus || ''} (${a.dano || ''})${a.desc ? ' - ' + a.desc : ''}\n`; });
    notes += '\n--- HABILIDADES ---\n';
    if (Array.isArray(c.habilidades)) c.habilidades.forEach(h => { notes += `• ${h.nome} (${h.tipo || ''}): ${h.desc || ''}\n`; });
    combatState.combatants.push({
      id, name: nome, init: initTotal,
      hpCur: parseInt(c.pv) || 0, hpMax: parseInt(c.pv) || 0,
      mpCur: parseInt(c.pm) || 0, mpMax: parseInt(c.pm) || 0,
      notes, conditions: [], stats: { def, res, cd: '' }, open: false, imageUrl: c.img || ''
    });
    if (!combatState.activeId) combatState.activeId = id;
    combatLogAdd(`🎲 ${nome} entrou no combate com iniciativa ${initTotal}`);
  }

  if (combatState.autoSort) {
    combatState.combatants.sort((a, b) => (parseInt(b.init) || 0) - (parseInt(a.init) || 0));
  }

  combatSave();
  combatRender();
  syncCombatToPlayers();
  toast(`⚔ ${nome} no combate com iniciativa ${initTotal}`);
}

function exibirHabilidadeBestiario(nomeEnc, habIdx) {
  if (!bestiarioCache) return;
  const nome = decodeURIComponent(nomeEnc);
  const c = bestiarioCache.find(x => x.nome === nome);
  if (!c || !c.habilidades || !c.habilidades[habIdx]) return;
  const h = c.habilidades[habIdx];
  const nomeHab = h.nome || 'Habilidade';
  const desc = h.desc || '';

  let text = `**${escHTML(nome)} — ${escHTML(nomeHab)}**`;
  if (h.tipo) text += ` _(${escHTML(h.tipo)})_`;
  if (desc) text += `\n> ${escHTML(desc)}`;

  const msgData = { type: 'ability', name: myName || 'Bestiário', role: myRole, text, time: formatTime(), visibility: 'global' };
  addMsg(msgData);
  if (myRole === 'mestre' || amIHost) {
    broadcast(msgData, null);
  } else if (masterConn) {
    masterConn.send(msgData);
  }
}

function tamanhoTokenDoBestiario(tipo) {
  const t = String(tipo || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  let size = 1;
  if (t.includes('minusculo') || t.includes('pequeno')) size = 0.5;
  else if (t.includes('colossal')) size = 4;
  else if (t.includes('enorme')) size = 3;
  else if (t.includes('grande')) size = 2;
  return size;
}

function criarTokenDoBestiario() {
  const nome = window._bestiarioCriaturaAtual;
  if (!nome || !bestiarioCache) return;
  const c = bestiarioCache.find(x => x.nome === nome);
  if (!c) return;
  fecharDetalhesItem();
  window._bestiaryPendingName = c.nome;
  abrirFormToken(undefined, undefined, {
    name: c.nome,
    hp: parseInt(c.pv) || 0,
    imageUrl: c.img || '',
    size: tamanhoTokenDoBestiario(c.tipo)
  });
}

// ── Grimório de Magias ──
let magiasCache = null;
let magiasInitialized = false;
let magiaCirculoFiltro = 0;
let magiaEscolaFiltro = '';
let magiaTipoFiltro = '';

function initMagias() {
  if (magiasInitialized) return;
  magiasInitialized = true;
  carregarMagias();
}

function carregarMagias() {
  const resultsEl = document.getElementById('magiasResults');
  const loadingEl = document.getElementById('magiasLoading');
  if (!resultsEl) return;
  resultsEl.innerHTML = '';
  if (loadingEl) loadingEl.style.display = 'block';

  try {
    if (typeof SPELLS_DB === 'undefined' || SPELLS_DB.length === 0) {
      throw new Error('Grimório não encontrado (SPELLS_DB)');
    }
    magiasCache = SPELLS_DB.map(s => ({
      nome: s.n,
      circulo: s.c,
      tipo: s.t || 'Universal',
      escola: s.e,
      execucao: s.ex,
      alcance: s.a,
      alvo: s.al,
      duracao: s.d,
      resistencia: s.r,
      descricao: s.desc,
      aprimoramentos: s.aprimoramentos || []
    }));
    // Seção de iluminação
    // <option value="sunny">Ensolarado (Dia)</option>
    // <option value="cloudy">Nublado</option>
    // <option value="twilight">Crepúsculo</option>
    // <option value="starnight">Noite Estrelada</option>
    // <option value="darknight">Noite Escura</option>
    // <option value="cave">Caverna (Escuro Total)</option>
    if (loadingEl) loadingEl.style.display = 'none';
    buscarMagia();
    toast(`📖 ${magiasCache.length} magias carregadas no Grimório!`);
  } catch (e) {
    if (loadingEl) loadingEl.style.display = 'none';
    if (resultsEl) resultsEl.innerHTML = `<div style="text-align:center;padding:1rem;color:var(--red-bright);font-style:italic;">Erro ao carregar grimório: ${escHTML(e.message)}</div>`;
    console.error('Erro ao carregar magias:', e);
  }
}

function setMagiaCirculo(btn, circ) {
  magiaCirculoFiltro = circ;
  document.querySelectorAll('#magiasCirculoFiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarMagia();
}

function setMagiaEscola(btn, escola) {
  magiaEscolaFiltro = escola;
  document.querySelectorAll('#magiasEscolaFiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarMagia();
}

function setMagiaTipo(btn, tipo) {
  magiaTipoFiltro = tipo;
  document.querySelectorAll('#magiasTipoFiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarMagia();
}

function buscarMagia() {
  const resultsEl = document.getElementById('magiasResults');
  const countEl = document.getElementById('magiasCount');
  if (!resultsEl) return;
  if (!magiasCache) { carregarMagias(); return; }

  const termo = (document.getElementById('magiasSearch')?.value || '').toLowerCase().trim();
  let filtradas = magiasCache;

  if (magiaCirculoFiltro > 0) {
    filtradas = filtradas.filter(m => m.circulo == magiaCirculoFiltro);
  }
  if (magiaEscolaFiltro) {
    filtradas = filtradas.filter(m => (m.escola || '').toLowerCase() === magiaEscolaFiltro.toLowerCase());
  }
  if (magiaTipoFiltro) {
    filtradas = filtradas.filter(m => (m.tipo || 'Universal') === magiaTipoFiltro);
  }
  if (termo) {
    filtradas = filtradas.filter(m =>
      (m.nome || '').toLowerCase().includes(termo) ||
      (m.escola || '').toLowerCase().includes(termo) ||
      (m.tipo || '').toLowerCase().includes(termo) ||
      (m.descricao || '').toLowerCase().includes(termo)
    );
  }

  if (countEl) countEl.textContent = `${filtradas.length} magia${filtradas.length !== 1 ? 's' : ''}`;
  renderMagias(filtradas.slice(0, 300));
}

// School colors
const escolaCores = {
  'Abjuração': '#4070c9',
  'Adivinhação': '#40a0a0',
  'Convocação': '#40a060',
  'Encantamento': '#c94080',
  'Evocação': '#c97040',
  'Ilusão': '#8040c9',
  'Necromancia': '#404040',
  'Transmutação': '#c9c040'
};

const circuloColors = {
  1: '#5a7a3a', 2: '#3a6a8a', 3: '#7a4a8a', 4: '#8a4a3a', 5: '#6a1a2a'
};

let collapsedMagiaCirculos = new Set([1, 2, 3, 4, 5]);

function toggleMagiaCirculo(circ) {
  if (collapsedMagiaCirculos.has(circ)) {
    collapsedMagiaCirculos.delete(circ);
  } else {
    collapsedMagiaCirculos.add(circ);
  }
  buscarMagia();
}

function renderMagias(magias) {
  const el = document.getElementById('magiasResults');
  if (!el) return;
  if (magias.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhuma magia encontrada.</div>';
    return;
  }

  // Group by circle
  const grupos = {};
  magias.forEach(m => {
    const key = m.circulo || 1;
    if (!grupos[key]) grupos[key] = [];
    grupos[key].push(m);
  });

  const circles = Object.keys(grupos).map(Number).sort((a, b) => a - b);
  let html = '';

  circles.forEach(circ => {
    const lista = grupos[circ];
    const isCollapsed = collapsedMagiaCirculos.has(circ);
    const cor = circuloColors[circ] || '#555';
    const label = `${circ}º Círculo`;

    html += `
      <div onclick="toggleMagiaCirculo(${circ})" style="display:flex;align-items:center;justify-content:space-between;padding:0.4rem 0.5rem;background:var(--parch2);border:1px solid var(--border);border-left:3px solid ${cor};border-radius:4px;cursor:pointer;margin-top:0.35rem;user-select:none;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)';this.style.borderLeftColor='${cor}'">
        <span style="font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;color:var(--gold);display:flex;align-items:center;gap:0.35rem;">
          <span style="background:${cor};color:#fff;padding:0.1rem 0.4rem;border-radius:3px;font-size:0.7rem;">${circ}</span>
          ${escHTML(label)}
          <span style="font-size:0.65rem;color:var(--text-muted);font-weight:normal;">(${lista.length})</span>
        </span>
        <i class="bi bi-chevron-${isCollapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.75rem;"></i>
      </div>
      <div style="display:${isCollapsed ? 'none' : 'flex'};flex-direction:column;gap:0.2rem;padding-left:0.4rem;border-left:1px dashed var(--border);margin-left:0.5rem;margin-top:0.2rem;margin-bottom:0.3rem;">
    `;

    html += lista.map(m => {
      const cor2 = escolaCores[m.escola] || '#666';
      const tipoCor2 = m.tipo === 'Arcana' ? '#8a5ab5' : m.tipo === 'Divina' ? '#e8b96a' : '#5a8a8a';
      const tipoLabel = m.tipo === 'Universal' ? 'U' : m.tipo === 'Arcana' ? 'A' : 'D';
      return `<div onclick="mostrarDetalhesMagia('${escHTML(m.nome)}')" style="display:flex;align-items:center;gap:0.45rem;padding:0.28rem 0.4rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.12s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'"
        title="${escHTML((m.descricao || '').substring(0, 120))}">
        <span style="width:18px;height:18px;border-radius:50%;background:${cor2};display:flex;align-items:center;justify-content:center;font-size:0.55rem;font-weight:700;color:#fff;flex-shrink:0;">${escHTML((m.escola || '?').substring(0, 2).toUpperCase())}</span>
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.72rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(m.nome)}</div>
          <div style="font-size:0.58rem;color:var(--text-muted);display:flex;align-items:center;gap:0.3rem;">
            <span style="background:${tipoCor2};color:#fff;padding:0 0.3rem;border-radius:2px;font-size:0.5rem;font-weight:700;">${tipoLabel}</span>
            ${escHTML(m.escola)} · ${escHTML(m.execucao)}
          </div>
        </div>
      </div>`;
    }).join('');

    html += `</div>`;
  });

  el.innerHTML = html;
}

function mostrarDetalhesMagia(nome) {
  if (!magiasCache) return;
  const m = magiasCache.find(x => x.nome === nome);
  if (!m) return;

  // Reuse the item detail modal
  const titleEl = document.getElementById('itemDetailTitle');
  const contentEl = document.getElementById('itemDetailContent');
  const modalEl = document.getElementById('itemDetailModal');
  if (!titleEl || !contentEl || !modalEl) return;

  titleEl.textContent = m.nome;

  const cor = escolaCores[m.escola] || '#555';
  const cirCor = circuloColors[m.circulo] || '#555';

  let html = '';

  // Tags
  html += `<div style="margin-bottom:0.75rem;display:flex;gap:0.4rem;flex-wrap:wrap;">`;
  html += `<span style="background:${cirCor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;">✨ ${escHTML(String(m.circulo))}º Círculo</span>`;
  html += `<span style="background:${cor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.8rem;">${escHTML(m.escola)}</span>`;
  const tipoCor = m.tipo === 'Arcana' ? '#8a5ab5' : m.tipo === 'Divina' ? '#e8b96a' : '#5a8a8a';
  html += `<span style="background:${tipoCor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.72rem;">${escHTML(m.tipo || 'Universal')}</span>`;
  html += `</div>`;

  // Stats grid
  html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.55rem;margin-bottom:0.7rem;font-size:0.88rem;display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:0.4rem;">`;
  html += `<div><strong>Execução:</strong> ${escHTML(m.execucao)}</div>`;
  html += `<div><strong>Alcance:</strong> ${escHTML(m.alcance)}</div>`;
  if (m.alvo) html += `<div><strong>Alvo/Área:</strong> ${escHTML(m.alvo)}</div>`;
  html += `<div><strong>Duração:</strong> ${escHTML(m.duracao)}</div>`;
  html += `<div><strong>Resistência:</strong> ${escHTML(m.resistencia)}</div>`;
  html += `</div>`;

  // Description
  if (m.descricao) {
    const desc = escHTML(m.descricao).replace(/\n/g, '<br>');
    html += `<div style="border-left:3.5px solid var(--gold);padding-left:0.65rem;font-size:0.9rem;line-height:1.5;word-break:break-word;">${desc}</div>`;
  }

  // Enhancements
  if (m.aprimoramentos && m.aprimoramentos.length > 0) {
    html += `<div style="margin-top:0.8rem;border-top:1px solid var(--border);padding-top:0.5rem;">`;
    html += `<div style="font-family:'Cinzel',serif;font-size:0.82rem;font-weight:bold;color:var(--gold);margin-bottom:0.45rem;">⬆ Aprimoramentos</div>`;
    m.aprimoramentos.forEach(ap => {
      html += `<div style="font-size:0.84rem;margin-bottom:0.4rem;line-height:1.45;padding:0.3rem 0.5rem;background:var(--parch3);border-radius:3px;border-left:2px solid ${cor};">`;
      html += `<span style="color:var(--gold);font-weight:bold;">+${ap.cost} PM</span> — ${escHTML(ap.desc)}`;
      html += `</div>`;
    });
    html += `</div>`;
  }

  contentEl.innerHTML = html;
  modalEl.style.display = 'flex';
}

function initPoderes() {
  if (poderesInitialized) return;
  poderesInitialized = true;
  setPoderesSecao(null, 'origens');
}

function setPoderesSecao(btn, sec) {
  poderesSecaoAtiva = sec;
  poderesSubfiltro = '';
  document.querySelectorAll('#poderesSecaoFiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  _buildPoderesSubfiltros(sec);
  buscarPoderes();
}

function setPoderesSubfiltro(btn, val) {
  poderesSubfiltro = val;
  document.querySelectorAll('#poderesSubfiltros .bau-cat-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
  buscarPoderes();
}

function _buildPoderesSubfiltros(sec) {
  const wrap = document.getElementById('poderesSubfiltroWrap');
  const label = document.getElementById('poderesSubfiltroLabel');
  const container = document.getElementById('poderesSubfiltros');
  if (!wrap || !container) return;

  if (sec === 'poderes') {
    // Classes únicas de powersData
    const classes = [...new Set(
      (typeof powersData !== 'undefined' ? powersData : []).map(p => p.class).filter(Boolean)
    )].sort();
    label.textContent = 'CLASSE';
    container.innerHTML = `<button class="bau-cat-btn active" onclick="setPoderesSubfiltro(this,'')">Todas</button>` +
      classes.map(c => `<button class="bau-cat-btn" onclick="setPoderesSubfiltro(this,'${escHTML(c)}')">${escHTML(_nomeClasse(c))}</button>`).join('');
    wrap.style.display = 'block';
  } else if (sec === 'distincoes') {
    label.textContent = 'FONTE';
    container.innerHTML = `
      <button class="bau-cat-btn active" onclick="setPoderesSubfiltro(this,'')">Todas</button>
      <button class="bau-cat-btn" onclick="setPoderesSubfiltro(this,'herois')">Heróis de Arton</button>
      <button class="bau-cat-btn" onclick="setPoderesSubfiltro(this,'t20')">T20</button>
    `;
    wrap.style.display = 'block';
  } else {
    wrap.style.display = 'none';
  }
}

function _nomeClasse(c) {
  const nomes = {
    arcanista: 'Arcanista', barbaro: 'Bárbaro', bardo: 'Bardo',
    bucaneiro: 'Bucaneiro', cacador: 'Caçador', cavaleiro: 'Cavaleiro',
    clerigo: 'Clérigo', druida: 'Druida', guerreiro: 'Guerreiro',
    inventor: 'Inventor', ladino: 'Ladino', lutador: 'Lutador',
    nobre: 'Nobre', paladino: 'Paladino', samurai: 'Samurai',
    shaman: 'Xamã', outro: 'Outro'
  };
  return nomes[c] || c.charAt(0).toUpperCase() + c.slice(1);
}

function buscarPoderes() {
  const resultsEl = document.getElementById('poderesResults');
  const countEl = document.getElementById('poderesCount');
  if (!resultsEl) return;

  const termo = (document.getElementById('poderesSearch')?.value || '').toLowerCase().trim();
  const sec = poderesSecaoAtiva;

  let itens = [];

  if (sec === 'origens') {
    itens = typeof origensData !== 'undefined' ? origensData : [];
    if (termo) {
      itens = itens.filter(o =>
        (o.name || '').toLowerCase().includes(termo) ||
        (o.desc || '').toLowerCase().includes(termo) ||
        (o.items || '').toLowerCase().includes(termo)
      );
    }
    if (countEl) countEl.textContent = `${itens.length} origem${itens.length !== 1 ? 'ns' : ''}`;
    renderOrigens(itens);

  } else if (sec === 'poderes') {
    itens = typeof powersData !== 'undefined' ? powersData : [];
    if (poderesSubfiltro) itens = itens.filter(p => p.class === poderesSubfiltro);
    if (termo) {
      itens = itens.filter(p =>
        (p.name || '').toLowerCase().includes(termo) ||
        (p.desc || '').toLowerCase().includes(termo) ||
        (p.req || '').toLowerCase().includes(termo)
      );
    }
    if (countEl) countEl.textContent = `${itens.length} poder${itens.length !== 1 ? 'es' : ''}`;
    renderPoderes(itens);

  } else if (sec === 'distincoes') {
    itens = typeof distincoesData !== 'undefined' ? distincoesData : [];
    if (poderesSubfiltro) itens = itens.filter(d => (d.source || '').toLowerCase() === poderesSubfiltro);
    if (termo) {
      itens = itens.filter(d =>
        (d.name || '').toLowerCase().includes(termo) ||
        (d.admissao || '').toLowerCase().includes(termo) ||
        (d.poderes || []).some(p => (p.name || '').toLowerCase().includes(termo) || (p.desc || '').toLowerCase().includes(termo))
      );
    }
    if (countEl) countEl.textContent = `${itens.length} distinção${itens.length !== 1 ? 'ções' : ''}`;
    renderDistincoes(itens);
  }
}

// ── Cores de classe ──
const classeCores = {
  arcanista: '#7040a0', barbaro: '#c04040', bardo: '#c07020',
  bucaneiro: '#205090', cacador: '#406030', cavaleiro: '#809040',
  clerigo: '#a08020', druida: '#306040', guerreiro: '#904040',
  inventor: '#307070', ladino: '#505050', lutador: '#803030',
  nobre: '#706020', paladino: '#4060a0', samurai: '#802020',
  shaman: '#306060'
};

const subTypeCor = { ability: '#5a8a5a', power: '#7a5a9a', geral: '#6a7a9a' };

// ─────────────── ORIGENS ───────────────
let collapsedOrigens = new Set();

function toggleOrigemFolder(id) {
  if (collapsedOrigens.has(id)) collapsedOrigens.delete(id);
  else collapsedOrigens.add(id);
  buscarPoderes();
}

function renderOrigens(origens) {
  const el = document.getElementById('poderesResults');
  if (!el) return;
  if (origens.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhuma origem encontrada.</div>';
    return;
  }

  const html = origens.map(o => {
    const collapsed = collapsedOrigens.has(o.id);
    const benefitList = (o.benefits || []).map(b => {
      const cor = b.type === 'skill' ? '#3a7a5a' : b.type === 'power' ? '#7a5a9a' : '#6a6a9a';
      const label = b.type === 'skill' ? 'Perícia' : b.type === 'power' ? 'Poder' : 'Especial';
      return `<div style="display:flex;align-items:center;gap:0.35rem;padding:0.2rem 0.35rem;background:var(--parch3);border-radius:3px;border-left:2px solid ${cor};">
        <span style="font-size:0.58rem;background:${cor};color:#fff;padding:0.05rem 0.3rem;border-radius:2px;font-family:'Cinzel',serif;">${label}</span>
        <span style="font-size:0.7rem;color:var(--text);">${escHTML(b.name)}${b.desc ? ' — <em style="color:var(--text-muted);font-size:0.65rem;">' + escHTML(b.desc.substring(0, 80)) + (b.desc.length > 80 ? '…' : '') + '</em>' : ''}</span>
      </div>`;
    }).join('');

    const sourceTag = o.source === 'T20' ? `<span style="font-size:0.58rem;background:rgba(212,175,55,0.15);border:1px solid var(--gold);color:var(--gold);padding:0.05rem 0.3rem;border-radius:2px;">T20</span>` :
      o.source === 'atlas' ? `<span style="font-size:0.58rem;background:rgba(100,150,200,0.15);border:1px solid #6a9abc;color:#6a9abc;padding:0.05rem 0.3rem;border-radius:2px;">Atlas</span>` : '';

    return `<div style="border:1px solid var(--border);border-radius:4px;overflow:hidden;margin-bottom:0.2rem;">
      <div onclick="toggleOrigemFolder('${escHTML(o.id)}')" style="display:flex;align-items:center;justify-content:space-between;padding:0.35rem 0.45rem;background:var(--parch2);cursor:pointer;user-select:none;" onmouseover="this.style.background='rgba(212,175,55,0.08)'" onmouseout="this.style.background='var(--parch2)'">
        <span style="display:flex;align-items:center;gap:0.35rem;font-family:'Cinzel',serif;font-size:0.77rem;font-weight:bold;color:var(--text);">
          🏠 ${escHTML(o.name)} ${sourceTag}
          ${o.chooseCount ? `<span style="font-size:0.6rem;color:var(--text-muted);font-weight:normal;">Escolha ${o.chooseCount}</span>` : ''}
        </span>
        <i class="bi bi-chevron-${collapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.72rem;"></i>
      </div>
      ${collapsed ? '' : `<div style="padding:0.4rem 0.45rem;display:flex;flex-direction:column;gap:0.25rem;">
        ${o.desc ? `<div style="font-size:0.72rem;color:var(--text-muted);line-height:1.4;margin-bottom:0.25rem;font-style:italic;">${escHTML(o.desc.substring(0, 200))}${o.desc.length > 200 ? '…' : ''}</div>` : ''}
        ${o.items ? `<div style="font-size:0.68rem;color:var(--gold);margin-bottom:0.2rem;">📦 ${escHTML(o.items)}</div>` : ''}
        <div style="font-size:0.62rem;color:var(--text-muted);font-family:'Cinzel',serif;margin-bottom:0.2rem;">BENEFÍCIOS DISPONÍVEIS</div>
        <div style="display:flex;flex-direction:column;gap:0.18rem;">${benefitList}</div>
      </div>`}
    </div>`;
  }).join('');

  el.innerHTML = html;
}

// ─────────────── PODERES DE CLASSE ───────────────
let collapsedPoderesClasse = new Set(['arcanista', 'barbaro', 'bardo', 'bucaneiro', 'cacador', 'cavaleiro', 'clerigo', 'druida', 'frade', 'guerreiro', 'inventor', 'ladino', 'lutador', 'nobre', 'paladino', 'treinador', 'origens', 'distincoes']);

function togglePoderesClasseFolder(cls) {
  if (collapsedPoderesClasse.has(cls)) collapsedPoderesClasse.delete(cls);
  else collapsedPoderesClasse.add(cls);
  buscarPoderes();
}

function renderPoderes(poderes) {
  const el = document.getElementById('poderesResults');
  if (!el) return;
  if (poderes.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhum poder encontrado.</div>';
    return;
  }

  // Group by class
  const grupos = {};
  poderes.forEach(p => {
    const cls = p.class || 'geral';
    if (!grupos[cls]) grupos[cls] = [];
    grupos[cls].push(p);
  });

  const classes = Object.keys(grupos).sort();
  let html = '';

  classes.forEach(cls => {
    const lista = grupos[cls];
    const collapsed = collapsedPoderesClasse.has(cls);
    const cor = classeCores[cls] || '#555';
    const nome = _nomeClasse(cls);

    // Sub-group by subType
    const habilidades = lista.filter(p => p.subType === 'ability');
    const powers = lista.filter(p => p.subType === 'power');
    const outros = lista.filter(p => !p.subType || (p.subType !== 'ability' && p.subType !== 'power'));

    html += `
      <div style="border:1px solid var(--border);border-left:3px solid ${cor};border-radius:4px;overflow:hidden;margin-bottom:0.25rem;">
        <div onclick="togglePoderesClasseFolder('${escHTML(cls)}')" style="display:flex;align-items:center;justify-content:space-between;padding:0.38rem 0.45rem;background:var(--parch2);cursor:pointer;user-select:none;" onmouseover="this.style.background='rgba(212,175,55,0.08)'" onmouseout="this.style.background='var(--parch2)'">
          <span style="display:flex;align-items:center;gap:0.4rem;font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;color:var(--gold);">
            <span style="background:${cor};color:#fff;padding:0.08rem 0.4rem;border-radius:3px;font-size:0.65rem;">${escHTML(nome)}</span>
            <span style="font-size:0.65rem;color:var(--text-muted);font-weight:normal;">(${lista.length})</span>
          </span>
          <i class="bi bi-chevron-${collapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.72rem;"></i>
        </div>
        ${collapsed ? '' : `<div style="padding:0.3rem 0.4rem;display:flex;flex-direction:column;gap:0.18rem;">
          ${habilidades.length > 0 ? `<div style="font-size:0.6rem;color:var(--text-muted);font-family:'Cinzel',serif;margin:0.15rem 0 0.1rem;">HABILIDADES DE CLASSE</div>
          ${habilidades.map(p => _renderPoderItem(p, cor)).join('')}` : ''}
          ${powers.length > 0 ? `<div style="font-size:0.6rem;color:var(--text-muted);font-family:'Cinzel',serif;margin:0.25rem 0 0.1rem;">PODERES</div>
          ${powers.map(p => _renderPoderItem(p, cor)).join('')}` : ''}
          ${outros.length > 0 ? outros.map(p => _renderPoderItem(p, cor)).join('') : ''}
        </div>`}
      </div>`;
  });

  el.innerHTML = html;
}

function _renderPoderItem(p, cor) {
  const subCor = subTypeCor[p.subType] || cor;
  const badge = p.subType === 'ability' ? 'Hab.' : p.subType === 'power' ? 'Poder' : '';
  return `<div onclick="mostrarDetalhesPoder('${escHTML(p.name)}','${escHTML(p.class || '')}')" style="display:flex;align-items:flex-start;gap:0.4rem;padding:0.25rem 0.35rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.12s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
    ${badge ? `<span style="font-size:0.55rem;background:${subCor};color:#fff;padding:0.05rem 0.28rem;border-radius:2px;margin-top:0.15rem;flex-shrink:0;font-family:'Cinzel',serif;">${badge}</span>` : ''}
    <div style="flex:1;min-width:0;">
      <div style="font-size:0.72rem;color:var(--text);font-weight:bold;">${escHTML(p.name)}</div>
      ${p.req ? `<div style="font-size:0.6rem;color:var(--text-muted);">📋 ${escHTML(p.req)}</div>` : ''}
    </div>
  </div>`;
}

function mostrarDetalhesPoder(name, cls) {
  const data = typeof powersData !== 'undefined' ? powersData : [];
  const p = data.find(x => x.name === name && (x.class || '') === cls) || data.find(x => x.name === name);
  if (!p) return;

  const titleEl = document.getElementById('itemDetailTitle');
  const contentEl = document.getElementById('itemDetailContent');
  const modalEl = document.getElementById('itemDetailModal');
  if (!titleEl || !contentEl || !modalEl) return;

  titleEl.textContent = p.name;
  const cor = classeCores[p.class] || '#555';
  const nomeCls = _nomeClasse(p.class || '');
  const subCor = subTypeCor[p.subType] || cor;
  const badge = p.subType === 'ability' ? 'Habilidade de Classe' : p.subType === 'power' ? 'Poder de Classe' : '';

  let html = `<div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.7rem;">`;
  if (nomeCls) html += `<span style="background:${cor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.8rem;font-weight:bold;">${escHTML(nomeCls)}</span>`;
  if (badge) html += `<span style="background:${subCor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.75rem;">${badge}</span>`;
  html += `</div>`;

  if (p.req) {
    html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.45rem 0.55rem;margin-bottom:0.6rem;font-size:0.85rem;">
      <strong>Requisito:</strong> ${escHTML(p.req)}
    </div>`;
  }

  if (p.desc) {
    html += `<div style="border-left:3.5px solid var(--gold);padding-left:0.65rem;font-size:0.9rem;line-height:1.55;word-break:break-word;">${p.desc}</div>`;
  }

  contentEl.innerHTML = html;
  modalEl.style.display = 'flex';
}

// ─────────────── DISTINÇÕES ───────────────
let collapsedDistincoes = new Set();

function toggleDistincaoFolder(id) {
  if (collapsedDistincoes.has(id)) collapsedDistincoes.delete(id);
  else collapsedDistincoes.add(id);
  buscarPoderes();
}

function renderDistincoes(distincoes) {
  const el = document.getElementById('poderesResults');
  if (!el) return;
  if (distincoes.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhuma distinção encontrada.</div>';
    return;
  }

  const html = distincoes.map(d => {
    const collapsed = collapsedDistincoes.has(d.id);
    const sourceCor = d.source === 'herois' ? '#6a4a9a' : '#4a6a9a';
    const sourceLabel = d.source === 'herois' ? 'Heróis de Arton' : 'T20';
    const exclusiva = d.exclusiva ? `<span style="font-size:0.58rem;background:rgba(180,60,60,0.2);border:1px solid #c04040;color:#c04040;padding:0.05rem 0.3rem;border-radius:2px;">Exclusiva</span>` : '';

    const poderesHTML = (d.poderes || []).map(p =>
      `<div onclick="mostrarDetalhesDistincao('${escHTML(d.id)}','${escHTML(p.name)}')" style="display:flex;align-items:flex-start;gap:0.4rem;padding:0.22rem 0.35rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.12s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
        <div style="flex:1;min-width:0;">
          <div style="font-size:0.71rem;color:var(--text);font-weight:bold;">${escHTML(p.name)}</div>
          ${p.req ? `<div style="font-size:0.6rem;color:var(--text-muted);">📋 ${escHTML(p.req)}</div>` : ''}
        </div>
      </div>`
    ).join('');

    return `<div style="border:1px solid var(--border);border-left:3px solid ${sourceCor};border-radius:4px;overflow:hidden;margin-bottom:0.25rem;">
      <div onclick="toggleDistincaoFolder('${escHTML(d.id)}')" style="display:flex;align-items:center;justify-content:space-between;padding:0.38rem 0.45rem;background:var(--parch2);cursor:pointer;user-select:none;" onmouseover="this.style.background='rgba(212,175,55,0.08)'" onmouseout="this.style.background='var(--parch2)'">
        <span style="display:flex;align-items:center;gap:0.35rem;flex-wrap:wrap;">
          <span style="font-family:'Cinzel',serif;font-size:0.77rem;font-weight:bold;color:var(--gold);">🏆 ${escHTML(d.name)}</span>
          <span style="font-size:0.58rem;background:${sourceCor};color:#fff;padding:0.05rem 0.3rem;border-radius:2px;">${sourceLabel}</span>
          ${exclusiva}
          <span style="font-size:0.6rem;color:var(--text-muted);">(${(d.poderes || []).length} poderes)</span>
        </span>
        <i class="bi bi-chevron-${collapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.72rem;flex-shrink:0;"></i>
      </div>
      ${collapsed ? '' : `<div style="padding:0.4rem 0.45rem;display:flex;flex-direction:column;gap:0.25rem;">
        ${d.marca ? `<div style="background:rgba(212,175,55,0.08);border:1px solid var(--gold);border-radius:4px;padding:0.35rem 0.45rem;margin-bottom:0.15rem;">
          <div style="font-size:0.68rem;color:var(--gold);font-family:'Cinzel',serif;font-weight:bold;margin-bottom:0.15rem;">⭐ ${escHTML(d.marca.name)}</div>
          <div style="font-size:0.7rem;color:var(--text-muted);line-height:1.4;">${escHTML(d.marca.desc)}</div>
        </div>` : ''}
        ${d.admissao ? `<div style="font-size:0.68rem;color:var(--text-muted);font-style:italic;line-height:1.4;border-left:2px solid var(--border);padding-left:0.45rem;">${escHTML(d.admissao.substring(0, 200))}${d.admissao.length > 200 ? '…' : ''}</div>` : ''}
        ${poderesHTML ? `<div style="font-size:0.6rem;color:var(--text-muted);font-family:'Cinzel',serif;margin:0.15rem 0 0.1rem;">PODERES DA DISTINÇÃO</div>
        <div style="display:flex;flex-direction:column;gap:0.15rem;">${poderesHTML}</div>` : ''}
      </div>`}
    </div>`;
  }).join('');

  el.innerHTML = html;
}

function mostrarDetalhesDistincao(distId, poderName) {
  const data = typeof distincoesData !== 'undefined' ? distincoesData : [];
  const d = data.find(x => x.id === distId);
  if (!d) return;
  const p = (d.poderes || []).find(x => x.name === poderName);
  if (!p) return;

  const titleEl = document.getElementById('itemDetailTitle');
  const contentEl = document.getElementById('itemDetailContent');
  const modalEl = document.getElementById('itemDetailModal');
  if (!titleEl || !contentEl || !modalEl) return;

  titleEl.textContent = p.name;
  const sourceCor = d.source === 'herois' ? '#6a4a9a' : '#4a6a9a';
  const sourceLabel = d.source === 'herois' ? 'Heróis de Arton' : 'T20';

  let html = `<div style="display:flex;gap:0.4rem;flex-wrap:wrap;margin-bottom:0.7rem;">
    <span style="background:${sourceCor};color:#fff;padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.78rem;">🏆 ${escHTML(d.name)}</span>
    <span style="background:rgba(212,175,55,0.1);border:1px solid var(--gold);color:var(--gold);padding:0.15rem 0.5rem;border-radius:3px;font-family:'Cinzel',serif;font-size:0.75rem;">${sourceLabel}</span>
  </div>`;

  if (p.req) {
    html += `<div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.45rem 0.55rem;margin-bottom:0.6rem;font-size:0.85rem;">
      <strong>Requisito:</strong> ${escHTML(p.req)}
    </div>`;
  }

  if (p.desc) {
    html += `<div style="border-left:3.5px solid var(--gold);padding-left:0.65rem;font-size:0.9rem;line-height:1.55;word-break:break-word;">${p.desc}</div>`;
  }

  contentEl.innerHTML = html;
  modalEl.style.display = 'flex';
}

function renderBauItems(items) {
  const el = document.getElementById('bauResults');
  if (!el) return;
  if (items.length === 0) {
    el.innerHTML = '<div style="text-align:center;padding:1rem;color:var(--text-muted);font-style:italic;">Nenhum registro encontrado.</div>';
    return;
  }

  // Only equipment items (spells have their own tab)
  const equips = items.filter(i => !i.isSpell);

  let html = '';

  // ── RENDER EQUIPAMENTOS PARENT FOLDER ──
  if (equips.length > 0) {
    const groupedEquip = {};
    equips.forEach(item => {
      const cat = item.categoria || 'Outros';
      if (!groupedEquip[cat]) groupedEquip[cat] = [];
      groupedEquip[cat].push(item);
    });

    const orderedCats = [
      'Arma', 'Armadura', 'Escudo', 'Item Geral', 'Item Superior', 'Item Mágico', 'encantamento', 'Maldição'
    ];
    Object.keys(groupedEquip).forEach(cat => {
      if (!orderedCats.includes(cat)) {
        orderedCats.push(cat);
      }
    });

    const catColors = {
      'Arma': '#c94040', 'Armadura': '#4070c9', 'Escudo': '#40a060',
      'Item Geral': '#9c8a72', 'Item Superior': '#c9903a', 'Item Mágico': '#9040c9',
      'encantamento': '#40a0c9', 'Maldição': '#8a2040'
    };

    const catNames = {
      'Arma': 'Armas',
      'Armadura': 'Armaduras',
      'Escudo': 'Escudos',
      'Item Geral': 'Itens Gerais',
      'Item Superior': 'Itens Superiores',
      'Item Mágico': 'Itens Mágicos',
      'encantamento': 'Encantamentos',
      'Maldição': 'Maldições',
      'Outros': 'Outros'
    };

    const catIcons = {
      'Arma': '⚔',
      'Armadura': '🛡',
      'Escudo': '🛡',
      'Item Geral': '📦',
      'Item Superior': '⭐',
      'Item Mágico': '🔮',
      'encantamento': '✨',
      'Maldição': '☠',
      'Outros': '📂'
    };

    const isEquipamentosCollapsed = collapsedBauCategories.has('Equipamentos');

    html += `
      <div class="bau-parent-folder-header" onclick="toggleBauFolder('Equipamentos')" style="display:flex;align-items:center;justify-content:space-between;padding:0.45rem 0.55rem;background:var(--parch2);border:1px solid var(--border);border-radius:4px;cursor:pointer;margin-top:0.4rem;user-select:none;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
        <span style="font-family:'Cinzel',serif;font-size:0.85rem;font-weight:bold;color:var(--gold);display:flex;align-items:center;gap:0.35rem;">
          <span>📂</span> Equipamentos
        </span>
        <i class="bi bi-chevron-${isEquipamentosCollapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.8rem;"></i>
      </div>
      <div class="bau-parent-folder-content" style="display:${isEquipamentosCollapsed ? 'none' : 'block'};padding-left:0.5rem;border-left:1px dashed var(--border);margin-left:0.55rem;margin-top:0.25rem;">
    `;

    orderedCats.forEach(cat => {
      const catItems = groupedEquip[cat];
      if (!catItems || catItems.length === 0) return;

      const name = catNames[cat] || cat;
      const icon = catIcons[cat] || '📂';
      const isCollapsed = collapsedBauCategories.has(cat);
      const count = catItems.length;

      html += `
        <div class="bau-folder-header" onclick="toggleBauFolder('${escHTML(cat)}')" style="display:flex;align-items:center;justify-content:space-between;padding:0.35rem 0.45rem;background:var(--parch3);border:1px solid var(--border);border-radius:4px;cursor:pointer;margin-top:0.35rem;user-select:none;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'">
          <span style="font-family:'Cinzel',serif;font-size:0.78rem;font-weight:bold;color:var(--gold);display:flex;align-items:center;gap:0.3rem;">
            <span>${icon}</span> ${escHTML(name)} <span style="font-size:0.68rem;color:var(--text-muted);font-weight:normal;">(${count})</span>
          </span>
          <i class="bi bi-chevron-${isCollapsed ? 'right' : 'down'}" style="color:var(--text-muted);font-size:0.75rem;"></i>
        </div>
        <div class="bau-folder-content" style="display:${isCollapsed ? 'none' : 'flex'};flex-direction:column;gap:0.25rem;padding-left:0.35rem;margin-top:0.2rem;margin-bottom:0.35rem;">
      `;

      html += catItems.map(item => {
        const cor = catColors[cat] || '#9c8a72';
        const extras = [];
        if (item.dano) extras.push('⚔ ' + escHTML(item.dano));
        if (item.bonus_defesa) extras.push('🛡 ' + escHTML(item.bonus_defesa));
        if (item.empunhadura) extras.push(escHTML(item.empunhadura));
        const extraStr = extras.length ? ' · ' + extras.join(' ') : '';
        const preco = item.preco ? ' · ' + escHTML(item.preco) : '';
        return `<div onclick="mostrarDetalhesItem('${escHTML(item.nome)}')" style="display:flex;align-items:center;gap:0.5rem;padding:0.3rem 0.4rem;background:var(--parch3);border:1px solid var(--border);border-radius:3px;cursor:pointer;transition:all 0.15s;" onmouseover="this.style.borderColor='var(--gold)'" onmouseout="this.style.borderColor='var(--border)'" title="${escHTML((item.descricao || '').substring(0, 120))}">
          <span style="width:18px;height:18px;border-radius:50%;background:${cor};display:flex;align-items:center;justify-content:center;font-size:0.5rem;font-weight:700;color:#fff;flex-shrink:0;">${cat === 'encantamento' ? 'E' : cat === 'Maldição' ? 'M' : cat === 'Item Mágico' ? 'IM' : cat === 'Item Superior' ? 'S' : cat === 'Item Geral' ? 'G' : cat === 'Armadura' ? 'A' : cat === 'Escudo' ? 'E' : 'W'}</span>
          <div style="flex:1;min-width:0;">
            <div style="font-size:0.72rem;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(item.nome)}</div>
            <div style="font-size:0.58rem;color:var(--text-muted);">${escHTML(cat)}${item.tipo ? ' · ' + escHTML(item.tipo) : ''}${preco}${extraStr}</div>
          </div>
        </div>`;
      }).join('');

      html += `</div>`;
    });

    html += `</div>`;
  }

  el.innerHTML = html;
}


function mostrarDetalhesItem(itemName) {
  if (!itemName || !bauItemsCache) return;
  const item = bauItemsCache.find(i => i.nome === itemName);
  if (!item) return;

  const titleEl = document.getElementById('itemDetailTitle');
  const contentEl = document.getElementById('itemDetailContent');
  const modalEl = document.getElementById('itemDetailModal');

  if (titleEl) titleEl.textContent = item.nome;

  if (contentEl) {
    let html = '';

    if (item.isSpell) {
      // Tags: Circle, School
      html += `<div style="margin-bottom:0.75rem; display:flex; gap:0.4rem; flex-wrap:wrap; font-family:'Cinzel', serif; font-size:0.85rem;">`;
      html += `<span style="background:#9040c9; color:#fff; padding:0.15rem 0.4rem; border-radius:3px; font-weight:bold;">🔮 ${escHTML(item.circulo)}º Círculo</span>`;
      html += `<span style="background:rgba(255,255,255,0.08); border:1px solid var(--border); padding:0.15rem 0.4rem; border-radius:3px; color:var(--text-muted);">${escHTML(item.escola)}</span>`;
      html += `</div>`;

      // Stats Grid: Execucao, Alcance, Alvo/Área, Duracao, Resistencia
      html += `<div style="background:var(--parch3); border:1px solid var(--border); border-radius:4px; padding:0.5rem; margin-bottom:0.75rem; font-size:0.9rem; display:grid; grid-template-columns: repeat(auto-fill, minmax(130px, 1fr)); gap:0.4rem;">`;
      html += `<div><strong>Execução:</strong> ${escHTML(item.execucao)}</div>`;
      html += `<div><strong>Alcance:</strong> ${escHTML(item.alcance)}</div>`;
      if (item.alvo) html += `<div><strong>Alvo/Área:</strong> ${escHTML(item.alvo)}</div>`;
      html += `<div><strong>Duração:</strong> ${escHTML(item.duracao)}</div>`;
      html += `<div><strong>Resistência:</strong> ${escHTML(item.resistencia)}</div>`;
      html += `</div>`;

      // Description
      if (item.descricao) {
        const formattedDesc = escHTML(item.descricao).replace(/\n/g, '<br>');
        html += `<div style="border-left:3.5px solid var(--gold); padding-left:0.6rem; margin-top:0.5rem; font-style:italic; white-space: pre-wrap; word-break: break-word;">${formattedDesc}</div>`;
      }

      // Enhancements
      if (item.aprimoramentos && item.aprimoramentos.length > 0) {
        html += `<div style="margin-top:0.75rem; border-top:1px solid var(--border); padding-top:0.5rem;">`;
        html += `<div style="font-family:'Cinzel', serif; font-size:0.85rem; font-weight:bold; color:var(--gold); margin-bottom:0.4rem;">Aprimoramentos:</div>`;
        item.aprimoramentos.forEach(ap => {
          html += `<div style="font-size:0.85rem; margin-bottom:0.35rem; line-height:1.4; padding-left:0.6rem; border-left:2px solid var(--border); color:var(--text-muted);">`;
          html += `<strong style="color:var(--text);">+${ap.cost} PM:</strong> ${escHTML(ap.desc)}`;
          html += `</div>`;
        });
        html += `</div>`;
      }
    } else {
      // Category, Type, Price tags
      html += `<div style="margin-bottom:0.75rem; display:flex; gap:0.4rem; flex-wrap:wrap; font-family:'Cinzel', serif; font-size:0.85rem;">`;
      if (item.categoria) {
        const catColors = {
          'Arma': '#c94040', 'Armadura': '#4070c9', 'Escudo': '#40a060',
          'Item Geral': '#9c8a72', 'Item Superior': '#c9903a', 'Item Mágico': '#9040c9',
          'encantamento': '#40a0c9', 'Maldição': '#8a2040'
        };
        const cor = catColors[item.categoria] || '#9c8a72';
        html += `<span style="background:${cor}; color:#fff; padding:0.15rem 0.4rem; border-radius:3px; font-weight:bold;">${escHTML(item.categoria)}</span>`;
      }
      if (item.tipo) {
        html += `<span style="background:rgba(255,255,255,0.08); border:1px solid var(--border); padding:0.15rem 0.4rem; border-radius:3px; color:var(--text-muted);">${escHTML(item.tipo)}</span>`;
      }
      if (item.preco) {
        html += `<span style="background:rgba(212,175,55,0.1); border:1px solid var(--gold); padding:0.15rem 0.4rem; border-radius:3px; color:var(--gold); font-weight:bold;">${escHTML(item.preco)}</span>`;
      }
      html += `</div>`;

      // Item Stats Grid
      let hasStats = false;
      let statsHtml = `<div style="background:var(--parch3); border:1px solid var(--border); border-radius:4px; padding:0.5rem; margin-bottom:0.75rem; font-size:0.9rem; display:grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap:0.4rem;">`;

      if (item.dano) {
        statsHtml += `<div><strong>Dano:</strong> ${escHTML(item.dano)}</div>`;
        hasStats = true;
      }
      if (item.bonus_defesa || item.defesa) {
        statsHtml += `<div><strong>Defesa:</strong> ${escHTML(item.bonus_defesa || item.defesa)}</div>`;
        hasStats = true;
      }
      if (item.empunhadura) {
        statsHtml += `<div><strong>Empunhadura:</strong> ${escHTML(item.empunhadura)}</div>`;
        hasStats = true;
      }
      if (item.espaco || item.espacos) {
        statsHtml += `<div><strong>Espaço:</strong> ${escHTML(item.espaco || item.espacos)}</div>`;
        hasStats = true;
      }
      if (item.peso) {
        statsHtml += `<div><strong>Peso:</strong> ${escHTML(item.peso)}</div>`;
        hasStats = true;
      }
      if (item.critico) {
        statsHtml += `<div><strong>Crítico:</strong> ${escHTML(item.critico)}</div>`;
        hasStats = true;
      }
      if (item.alcance) {
        statsHtml += `<div><strong>Alcance:</strong> ${escHTML(item.alcance)}</div>`;
        hasStats = true;
      }

      statsHtml += `</div>`;

      if (hasStats) {
        html += statsHtml;
      }

      // Item Description
      if (item.descricao) {
        const formattedDesc = escHTML(item.descricao).replace(/\n/g, '<br>');
        html += `<div style="border-left:3.5px solid var(--gold); padding-left:0.6rem; margin-top:0.5rem; font-style:italic; white-space: pre-wrap; word-break: break-word;">${formattedDesc}</div>`;
      } else {
        html += `<div style="color:var(--text-muted); font-style:italic;">Sem descrição adicional.</div>`;
      }
    }

    contentEl.innerHTML = html;
  }

  if (modalEl) {
    modalEl.style.display = 'flex';
  }
}

function arrastarBestiario(e, nome) {
  e.dataTransfer.setData('text/plain', nome);
  e.dataTransfer.effectAllowed = 'copy';
}

function onBestiaryDrop(e) {
  e.preventDefault();
  const nome = e.dataTransfer.getData('text/plain');
  if (!nome || !bestiarioCache) return;
  const c = bestiarioCache.find(x => x.nome === nome);
  if (!c) return;

  const rect = BOARD.wrap.getBoundingClientRect();
  const cx = e.clientX - rect.left;
  const cy = e.clientY - rect.top;
  const { gx, gy } = canvasToGrid(cx, cy);

  const nomeToken = c.nome || 'Token';
  const hp = parseInt(c.pv) || 0;
  const cor = bestiarioNdColors[c.nd] || '#c94040';
  const imgUrl = c.img || '';
  const size = tamanhoTokenDoBestiario(c.tipo);

  BOARD.tokens.push({
    id: 'tk' + Date.now() + Math.floor(Math.random() * 9999),
    name: nomeToken, hp, hpMax: hp,
    size, sizeX: size, sizeY: size,
    color: cor,
    imageUrl: imgUrl,
    controlledBy: null,
    layer: BOARD.activeLayer || 'players',
    imagePosition: '50% 50%',
    conditions: [], hideName: false,
    bestiaryName: nomeToken,
    visionType: 'normal', auras: [],
    borderType: 'solid', borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.5)',
    shapeType: 'circle', auraRadius: 0, auraColor: 'rgba(66,165,245,0.2)',
    z: 0,
    gx: Math.max(0, gx), gy: Math.max(0, gy)
  });
  boardSave(); boardRender(); syncBoardTokensToPlayers();
  toast(`Token de ${nomeToken} criado!`);
}

function fecharDetalhesItem() {
  const modalEl = document.getElementById('itemDetailModal');
  if (modalEl) {
    modalEl.style.display = 'none';
  }
}

// ── Pergaminhos (Notas do Mestre) ──
let vttNotas = [];
let vttNotasRecebidas = [];

function syncNotasToPlayers() {
  if (myRole !== 'mestre' && !amIHost) return;
  const visiveis = vttNotas.filter(n => n.visible);
  broadcast({ type: 'pergaminhos', notas: visiveis }, null);
}

function renderNotas() {
  const listas = [...document.querySelectorAll('.notas-list')];
  document.querySelectorAll('.notas-empty').forEach(el => el.style.display = vttNotas.length === 0 ? 'block' : 'none');
  if (listas.length === 0) return;
  const cards = vttNotas.map(n => {
    const preview = (n.content || '').substring(0, 80).replace(/\n/g, ' ');
    return `<div style="background:var(--parch3);border:1px solid ${n.visible ? 'var(--gold)' : 'var(--border)'};border-radius:4px;padding:0.4rem 0.5rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:0.3rem;">
        <span style="font-size:0.75rem;color:var(--text);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:'Cinzel',serif;">${escHTML(n.title || 'Sem título')}</span>
        <div style="display:flex;gap:0.25rem;flex-shrink:0;">
          <button onclick="toggleNotaVisivel('${n.id}')" style="background:none;border:none;cursor:pointer;font-size:0.85rem;${n.visible ? 'color:var(--gold);' : 'color:var(--text-muted);'}" title="${n.visible ? 'Visível aos jogadores' : 'Oculto'}">👁</button>
          <button onclick="editarPergaminho('${n.id}')" style="background:none;border:none;cursor:pointer;color:var(--text-muted);font-size:0.75rem;" title="Editar">✎</button>
          <button onclick="deletarPergaminho('${n.id}')" style="background:none;border:none;cursor:pointer;color:var(--red-bright);font-size:0.75rem;" title="Excluir">✕</button>
        </div>
      </div>
      ${preview ? `<div style="font-size:0.6rem;color:var(--text-muted);margin-top:0.2rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">${escHTML(preview)}</div>` : ''}
    </div>`;
  }).join('');
  listas.forEach(list => { list.innerHTML = cards; });
}

function alternarColunaChat(tab) {
  const isChat = tab === 'diario';
  const isNotas = tab === 'notas';
  const isRolls = tab === 'rolls';
  const tabD = document.getElementById('chatTabDiario');
  const tabN = document.getElementById('chatTabNotas');
  const tabR = document.getElementById('chatTabRolls');
  if (tabD) tabD.classList.toggle('active', isChat);
  if (tabN) tabN.classList.toggle('active', isNotas);
  if (tabR) tabR.classList.toggle('active', isRolls);
  const title = document.getElementById('chatHeaderTitle');
  if (title) title.textContent = isChat ? 'Diário da Mesa' : isNotas ? 'Notas' : 'Histórico de Rolagens';
  const notasView = document.getElementById('chatNotasView');
  if (notasView) notasView.style.display = isNotas ? 'flex' : 'none';
  const rollsView = document.getElementById('chatRollsView');
  if (rollsView) rollsView.style.display = isRolls ? 'flex' : 'none';
  const msgs = document.getElementById('chat-messages');
  const vis = document.getElementById('chatVisibilityRow');
  const footer = document.getElementById('chatFooter');
  if (msgs) msgs.style.display = isChat ? '' : 'none';
  if (vis) vis.style.display = isChat ? '' : 'none';
  if (footer) footer.style.display = isChat ? '' : 'none';
  if (isNotas) {
    if (myRole === 'mestre' || amIHost) renderNotas();
    else renderChatNotasJogador();
  } else if (isRolls) {
    renderRollHistory();
  }
}

function renderRollHistory() {
  const list = document.getElementById('chatRollsList');
  if (!list) return;
  const empty = document.getElementById('chatRollsEmpty');
  if (rollHistory.length === 0) {
    if (empty) empty.style.display = 'block';
    list.innerHTML = '';
    return;
  }
  if (empty) empty.style.display = 'none';
  list.innerHTML = rollHistory.map((e, i) => `
    <div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.4rem 0.5rem;">
      <div style="display:flex;align-items:center;justify-content:space-between;gap:0.3rem;">
        <span style="font-size:0.7rem;color:var(--text);flex:1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-family:'Cinzel',serif;">${escHTML((e.res || '').replace(/\*\*/g, ''))}</span>
        <button onclick="repetirRolagem(${i})" style="background:none;border:none;cursor:pointer;color:var(--gold);font-size:0.75rem;flex-shrink:0;" title="Repetir esta rolagem">🔄</button>
      </div>
      <div style="font-size:0.6rem;color:var(--text-muted);margin-top:0.15rem;">${escHTML(e.time || '')}</div>
    </div>
  `).join('');
}

function repetirRolagem(index) {
  const entry = rollHistory[index];
  if (!entry) {
    toast('Nenhuma rolagem no histórico.');
    return;
  }
  if (myRole === 'expectador') { toast('Expectadores não podem rolar dados.'); return; }
  if (myRole === 'cego') return;
  const res = efetuarRolagem(entry.faces, entry.qtd, entry.mod, entry.label || '', entry.vantagem || 0, false);
  if (!res) return;
  const msgData = { type: 'roll', name: myName, role: myRole, text: res, time: formatTime(), visibility: chatVisibility };
  rotearMensagem(msgData);
}

function renderChatNotasJogador() {
  const list = document.getElementById('chatNotasList');
  if (!list) return;
  const empty = document.getElementById('chatNotasEmpty');
  const header = document.getElementById('chatNotasHeader');
  if (header) header.style.display = 'none';
  const notas = vttNotasRecebidas || [];
  if (empty) { empty.style.display = notas.length === 0 ? 'block' : 'none'; empty.textContent = 'Nenhum pergaminho compartilhado pelo mestre.'; }
  list.innerHTML = notas.map(n => `
    <div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.5rem;">
      <div style="font-family:'Cinzel',serif;font-size:0.7rem;color:var(--gold);margin-bottom:0.3rem;">${escHTML(n.title)}</div>
      <div style="font-size:0.75rem;color:var(--text);white-space:pre-wrap;word-wrap:break-word;line-height:1.4;">${escHTML(n.content)}</div>
    </div>
  `).join('');
}

function criarPergaminho() {
  const title = prompt('Título do pergaminho:');
  if (!title) return;
  const content = prompt('Conteúdo do pergaminho:');
  if (content === null) return;
  const id = 'nt' + Date.now() + Math.floor(Math.random() * 9999);
  vttNotas.push({ id, title, content: content || '', visible: false });
  renderNotas();
  toast(`📜 Pergaminho "${title}" criado!`);
}

function editarPergaminho(id) {
  const nota = vttNotas.find(n => n.id === id);
  if (!nota) return;
  const title = prompt('Título:', nota.title);
  if (!title) return;
  const content = prompt('Conteúdo:', nota.content);
  if (content === null) return;
  nota.title = title;
  nota.content = content || '';
  renderNotas();
  if (nota.visible) syncNotasToPlayers();
  toast(`📜 Pergaminho "${title}" atualizado.`);
}

function deletarPergaminho(id) {
  const nota = vttNotas.find(n => n.id === id);
  if (!nota) return;
  if (!confirm(`Excluir pergaminho "${nota.title}"?`)) return;
  const wasVisible = nota.visible;
  vttNotas = vttNotas.filter(n => n.id !== id);
  renderNotas();
  if (wasVisible) syncNotasToPlayers();
  toast('Pergaminho excluído.');
}

function toggleNotaVisivel(id) {
  const nota = vttNotas.find(n => n.id === id);
  if (!nota) return;
  nota.visible = !nota.visible;
  renderNotas();
  syncNotasToPlayers();
  toast(nota.visible ? `📜 "${nota.title}" agora visível aos jogadores.` : `📜 "${nota.title}" ocultado.`);
}

// ── Jogadores: receber pergaminhos ──
function receberPergaminhos(notas) {
  const btn = document.getElementById('notasPlayerBtn');
  const mobBtn = document.getElementById('mobNotasBtn');
  const panelContent = document.getElementById('notasPlayerContent');
  const panelWrap = document.getElementById('notasPlayerPanel');
  if (!panelContent) return;
  vttNotasRecebidas = notas || [];
  renderChatNotasJogador();
  if (!notas || notas.length === 0) {
    if (btn) btn.style.display = 'none';
    if (mobBtn) mobBtn.style.display = 'none';
    if (panelWrap) panelWrap.style.display = 'none';
    panelContent.innerHTML = '';
    return;
  }
  if (btn) btn.style.display = 'block';
  if (mobBtn) mobBtn.style.display = '';
  panelContent.innerHTML = notas.map(n => `
    <div style="background:var(--parch3);border:1px solid var(--border);border-radius:4px;padding:0.5rem;">
      <div style="font-family:'Cinzel',serif;font-size:0.7rem;color:var(--gold);margin-bottom:0.3rem;">${escHTML(n.title)}</div>
      <div style="font-size:0.75rem;color:var(--text);white-space:pre-wrap;word-wrap:break-word;line-height:1.4;">${escHTML(n.content)}</div>
    </div>
  `).join('');
}

function toggleNotasPlayer() {
  const panel = document.getElementById('notasPlayerPanel');
  if (panel) panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}


// ══════════════════════════════════════════════════════
//  TABULEIRO — VTTArmada
// ══════════════════════════════════════════════════════

const BOARD = {
  canvas: null, ctx: null, wrap: null,
  activeLayer: 'players',
  activeFloor: 0,
  // Viewport
  offsetX: 0, offsetY: 0, zoom: 1,
  // Grade
  gridOn: true, gridSize: 50,
  distanceMode: 'square', // euclidean, square, double_diagonal
  // Mapa
  mapImg: null, mapDataUrl: null,
  mapX: 0, mapY: 0, mapWidth: null, mapHeight: null,
  mapDragging: false, mapResizing: false,
  mapDragStartX: 0, mapDragStartY: 0,
  mapStartX: 0, mapStartY: 0,
  mapStartWidth: 0, mapStartHeight: 0,
  // Tokens: array de { id, name, hp, hpMax, color, size, gx, gy }
  tokens: [],
  // Paredes: array de { id, x1, y1, x2, y2 } em coords world
  walls: [],
  // Formas desenhadas: array de { id, kind: 'rect'|'circle', x1, y1, x2, y2, color, layer }
  shapes: [],
  // Desenho de forma em andamento
  shapeDrawing: false, shapeStartX: 0, shapeStartY: 0, shapeCurX: 0, shapeCurY: 0,
  shapeFreehandPoints: null,
  shapeColor: '#c9903a',
  // Fog of War: Set de "gx,gy" visíveis (calculado dinamicamente)
  // null = sem fog (mestre); Set = células visíveis (jogador)
  fogVisible: null,
  // true quando mestre pintou névoa manualmente (não recalcular automaticamente)
  fogManual: false,
  // true durante pintura de névoa com mouse arrastando
  fogPainting: false,
  // Set<string> - células reveladas por colisão de token cego
  blindRevealed: null,
  fogShape: 'brush', // 'brush' | 'rect'
  fogRectStart: null,
  // Drag
  dragging: null, dragOffX: 0, dragOffY: 0,
  // Pan
  panning: false, panStartX: 0, panStartY: 0,
  // Tool
  tool: 'move',
  // Tipo de parede selecionado para desenhar ('normal', 'invisible', 'door', 'window')
  wallType: 'normal',
  // Desenho de parede em andamento
  wallDrawing: false, wallStartX: 0, wallStartY: 0, wallCurX: 0, wallCurY: 0,
  // Hover
  hovered: null,
  // Edit
  editingTokenId: null,
  // Pinch
  lastPinchDist: 0,
  // Seleção de tokens (marquee)
  selectedTokens: new Set(),
  marquee: null, // { startX, startY, curX, curY } em coords do wrap
  // Handle drag (rotação/redimensionamento)
  handleDrag: null, // { tokenId, type: 'rotate'|'resize', startAngle, startSize }
  // Visão como jogador (mestre vê através do token de um jogador)
  playerViewTokenId: null,
  playerViewTokenName: '',
  // Seguir token automaticamente ao mover
  followTokenId: null,
  // Animação de GIFs (interval para redesenhar canvas com GIFs)
  animFrameId: null,
  gifInterval: null,
  // Parede selecionada para edição
  selectedWallId: null,
  wallDraggingLine: false,
  wallDraggingHandle: null, // 'p1' | 'p2'
  wallDragStart: null, // { x1, y1, x2, y2 }
  wallDragMouseStart: null, // { wx, wy }
  // Régua (linha e círculo)
  rulerActive: false,
  rulerMode: 'line', // 'line' | 'circle'
  rulerStartX: 0, rulerStartY: 0,
  rulerEndX: 0, rulerEndY: 0,
  // Régua com waypoints (caminho)
  wayRulerActive: false,
  wayRulerPoints: [], // [{x, y}, ...]
  wayRulerTempX: 0, wayRulerTempY: 0,
  // Pings (múltiplos simultâneos)
  pings: [],
  pingTimer: null,
  // Targeting: peerId -> [tokenId, ...]
  playerTargets: {},
  // Alvos locais (não são limpos ao trocar seleção)
  targetedTokens: new Set(),
  pingStartX: 0,
  pingStartY: 0,
  // Configurações do Grid/Mapa
  gridCols: 30,
  gridRows: 30,
  gridScaleVal: 1.5,
  gridScaleUnit: 'm',
  gridType: 'square',
  lightingType: 'sunny',
  // Projeção: '2d' (top-down padrão) ou 'iso' (2.5D isométrico)
  projection: '2d',
};

// ══════════════════════════════════════════════════════
//  UNDO / REDO
// ══════════════════════════════════════════════════════
const HISTORY = { stack: [], index: -1, maxSize: 50 };

function snapshotBoard() {
  HISTORY.stack.length = HISTORY.index + 1;
  const state = {
    tokens: JSON.parse(JSON.stringify(BOARD.tokens.map(t => {
      const { conditions, ...rest } = t;
      return { ...rest, conditions: conditions ? [...conditions] : [] };
    }))),
    walls: JSON.parse(JSON.stringify(BOARD.walls)),
    shapes: JSON.parse(JSON.stringify(BOARD.shapes)),
    gridSize: BOARD.gridSize, gridOn: BOARD.gridOn,
    activeFloor: BOARD.activeFloor || 0,
    gridCols: BOARD.gridCols, gridRows: BOARD.gridRows,
    gridScaleVal: BOARD.gridScaleVal, gridScaleUnit: BOARD.gridScaleUnit,
    gridType: BOARD.gridType, lightingType: BOARD.lightingType,
    mapDataUrl: BOARD.mapDataUrl,
    mapX: BOARD.mapX || 0,
    mapY: BOARD.mapY || 0,
    mapWidth: BOARD.mapWidth || null,
    mapHeight: BOARD.mapHeight || null,
    offsetX: BOARD.offsetX, offsetY: BOARD.offsetY, zoom: BOARD.zoom
  };
  if (BOARD.fogManual && BOARD.fogVisible) {
    state.fogVisible = Array.from(BOARD.fogVisible);
    state.fogManual = true;
  }
  HISTORY.stack.push(state);
  if (HISTORY.stack.length > HISTORY.maxSize) HISTORY.stack.shift();
  else HISTORY.index++;
}

function undoBoard() {
  if (HISTORY.index <= 0) return;
  HISTORY.index--;
  _restoreBoardState(HISTORY.stack[HISTORY.index]);
}

function redoBoard() {
  if (HISTORY.index >= HISTORY.stack.length - 1) return;
  HISTORY.index++;
  _restoreBoardState(HISTORY.stack[HISTORY.index]);
}

function _restoreBoardState(state) {
  BOARD.tokens = (state.tokens || []).map(t => ({
    ...t, layer: t.layer || 'players',
    conditions: t.conditions || [], hideName: t.hideName || false
  }));
  BOARD.walls = state.walls || [];
  BOARD.shapes = state.shapes || [];
  BOARD.gridSize = state.gridSize; BOARD.gridOn = state.gridOn;
  BOARD.activeFloor = state.activeFloor || 0;
  BOARD.gridCols = state.gridCols; BOARD.gridRows = state.gridRows;
  BOARD.gridScaleVal = state.gridScaleVal; BOARD.gridScaleUnit = state.gridScaleUnit;
  BOARD.gridType = state.gridType; BOARD.lightingType = state.lightingType;
  BOARD.offsetX = state.offsetX; BOARD.offsetY = state.offsetY; BOARD.zoom = state.zoom;

  BOARD.mapX = state.mapX !== undefined ? state.mapX : 0;
  BOARD.mapY = state.mapY !== undefined ? state.mapY : 0;
  BOARD.mapWidth = state.mapWidth !== undefined ? state.mapWidth : null;
  BOARD.mapHeight = state.mapHeight !== undefined ? state.mapHeight : null;

  if (state.mapDataUrl) {
    BOARD.mapDataUrl = state.mapDataUrl;
    if (BOARD.mapImg && BOARD.mapImg.src === state.mapDataUrl) {
      boardRender();
    } else {
      const img = new Image();
      img.onload = () => {
        BOARD.mapImg = img;
        if (isGifUrl(img.src)) getGifCanvas(img.src, img.naturalWidth, img.naturalHeight);
        boardRender();
      };
      img.src = state.mapDataUrl;
    }
  } else {
    BOARD.mapDataUrl = null;
    BOARD.mapImg = null;
    boardRender();
  }

  if (state.fogManual && state.fogVisible) {
    BOARD.fogVisible = new Set(state.fogVisible); BOARD.fogManual = true;
  } else { BOARD.fogVisible = null; BOARD.fogManual = false; }

  boardSave(); boardRender();
  if (myRole === 'mestre' || amIHost) syncBoardTokensToPlayers();
  setTimeout(atualizarSeguirToken, 50);
  toast(`↩ Desfazer/Refazer (${HISTORY.index}/${HISTORY.stack.length - 1})`);
}

function getFloorFromZ(z) {
  if (z === undefined || z === null) return 0;
  return Math.floor(z / 10);
}

function getCurrentFloor() {
  if (myRole === 'mestre') {
    return BOARD.activeFloor || 0;
  }
  let targetToken = null;
  if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
    for (const tokenId of BOARD.selectedTokens) {
      const t = BOARD.tokens.find(tk => tk.id === tokenId);
      if (t && t.controlledBy === myPeerId) {
        targetToken = t;
        break;
      }
    }
  }
  if (!targetToken) {
    targetToken = BOARD.tokens.find(t => t.controlledBy === myPeerId);
  }
  if (targetToken) {
    return getFloorFromZ(targetToken.z);
  }
  return BOARD.activeFloor || 0;
}

function updateFloorDisplay() {
  const display = document.getElementById('floorDisplay');
  if (!display) return;
  const currentFloor = getCurrentFloor();
  if (myRole === 'jogador') {
    const controlledToken = BOARD.tokens.find(t => t.controlledBy === myPeerId);
    if (controlledToken) {
      display.textContent = `Andar ${currentFloor} (🔒)`;
      display.title = `Visualização travada no andar do seu token (Z = ${controlledToken.z || 0})`;
      return;
    }
  }
  display.textContent = `Andar ${currentFloor}`;
  display.title = `Visualização do Andar ${currentFloor}`;
}

function mudarAndar(delta) {
  if (myRole === 'jogador') {
    const controlledToken = BOARD.tokens.find(t => t.controlledBy === myPeerId);
    if (controlledToken) {
      toast('Visão travada no andar do seu token!');
      return;
    }
  }
  BOARD.activeFloor = (BOARD.activeFloor || 0) + delta;
  boardSave();
  boardRender();
  if (myRole === 'mestre') {
    syncFloorToPlayers();
    setTimeout(atualizarFogJogador, 50);
  }
}

function syncFloorToPlayers() {
  if (myRole !== 'mestre') return;
  if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
    broadcast({ type: 'board-floor', activeFloor: BOARD.activeFloor || 0 }, null);
  }
}

function hasFogVision(gx, gy, floor) {
  if (!BOARD.fogVisible) return true;
  const f = (floor !== undefined) ? floor : getCurrentFloor();
  return BOARD.fogVisible.has(`${f}:${gx},${gy}`) || (f === 0 && BOARD.fogVisible.has(`${gx},${gy}`));
}

function verificarGatilhosToken(token) {
  if (!BOARD.shapes || BOARD.shapes.length === 0) return;
  const { gridSize } = BOARD;
  const tokenFloor = getFloorFromZ(token.z);

  const sz = token.size || 1;
  const pos = tokenWorldPos(token.gx, token.gy);
  const wx = pos.x;
  const wy = pos.y;

  function posicaoDentroForma(s) {
    if (s.kind === 'circle') {
      const cx = (s.x1 + s.x2) / 2;
      const cy = (s.y1 + s.y2) / 2;
      const rx = Math.abs(s.x2 - s.x1) / 2;
      const ry = Math.abs(s.y2 - s.y1) / 2;
      if (rx === 0 || ry === 0) return false;
      const dx = (wx - cx) / rx;
      const dy = (wy - cy) / ry;
      return dx * dx + dy * dy <= 1;
    } else if (s.kind === 'freehand') {
      return s.points && isPointInPolygon(wx, wy, s.points);
    }
    const x1 = Math.min(s.x1, s.x2), x2 = Math.max(s.x1, s.x2);
    const y1 = Math.min(s.y1, s.y2), y2 = Math.max(s.y1, s.y2);
    return wx >= x1 && wx <= x2 && wy >= y1 && wy <= y2;
  }

  // Gatilho no mesmo andar
  const triggerShape = BOARD.shapes.find(s =>
    getFloorFromZ(s.z) === tokenFloor && s.triggerType && posicaoDentroForma(s)
  );
  if (triggerShape) {
    // Tocar som da forma se tiver
    if (triggerShape.soundId) {
      const url = getSoundUrlById(triggerShape.soundId);
      if (url) {
        playSfx(url);
        if (myRole === 'mestre') broadcast({ type: 'play-sfx', url }, null);
      }
    }
    processarGatilho(token, triggerShape);
    return;
  }

  // Gatilho de condição na forma (mesmo andar)
  const condShape = BOARD.shapes.find(s =>
    getFloorFromZ(s.z) === tokenFloor && s.conditionTrigger && posicaoDentroForma(s)
  );
  if (condShape) {
    _processarCondTrigger(token, condShape);
  }

  // Marcação de escada: se o token pisar no mesmo local de um gatilho de escada
  // em um andar adjacente, sobe/desce automaticamente em direção ao andar da escada.
  for (const delta of [-1, 1]) {
    const adjFloor = tokenFloor + delta;
    const adjShape = BOARD.shapes.find(s =>
      getFloorFromZ(s.z) === adjFloor && s.triggerType && posicaoDentroForma(s)
    );
    if (adjShape) {
      // Escadas unidirecionais: só acionam pelo modal (mesmo andar), nunca por adjacência
      if (adjShape.triggerType === 'stairs-up' || adjShape.triggerType === 'stairs-down') continue;
      _revelarImagemGatilho(adjShape);
      if (adjShape.soundId) {
        const url = getSoundUrlById(adjShape.soundId);
        if (url) playSfx(url);
      }
      // Move o token em direção ao andar onde a escada está
      token.z = (token.z || 0) + delta * 10;
      toast(`${delta > 0 ? '🪜' : '🕳'} ${token.name} ${delta > 0 ? 'subiu' : 'desceu'} pela escada.`);
      finalizarGatilho(token);
      return;
    }
  }
}

function _processarCondTrigger(token, shape) {
  const ct = shape.conditionTrigger;
  if (!ct) return;
  if (!token.conditions) token.conditions = [];

  if (ct.mode === 'once') {
    if (!shape.triggered) {
      if (ct.condition && token.conditions.indexOf(ct.condition) === -1) {
        token.conditions.push(ct.condition);
        shape.triggered = true;
        if (!ct.appliedTokens) ct.appliedTokens = [];
        if (ct.appliedTokens.indexOf(token.id) === -1) ct.appliedTokens.push(token.id);
        _revelarImagemGatilho(shape);
        toast(`⚡ ${token.name} sofreu "${ct.condition}" pela armadilha!`);
        boardSave();
        boardRender();
        if (myRole === 'mestre') syncBoardTokensToPlayers();
        syncShapesToPlayers();
        applyPlayerConditionEffects();
        _syncCondToLinkedSheet(token);
      }
    }
  } else if (ct.mode === 'continuous') {
    var idx = token.conditions.indexOf(ct.condition);
    if (idx === -1) {
      token.conditions.push(ct.condition);
      toast(`⚡ ${token.name} entrou na área de "${ct.condition}"`);
      boardSave();
      boardRender();
      if (myRole === 'mestre') syncBoardTokensToPlayers();
      applyPlayerConditionEffects();
      _syncCondToLinkedSheet(token);
    }
  }
}

function _checkContinuousCondTriggers() {
  if (!BOARD.shapes || !BOARD.tokens) return;
  const contShapes = BOARD.shapes.filter(s => s.conditionTrigger && s.conditionTrigger.mode === 'continuous');
  if (contShapes.length === 0) return;
  var changed = false;
  BOARD.tokens.forEach(t => {
    if (!t.conditions) t.conditions = [];
    contShapes.forEach(s => {
      if (getFloorFromZ(s.z) !== getFloorFromZ(t.z)) return;
      var inside = _posicaoDentroForma(s, t);
      var condIdx = t.conditions.indexOf(s.conditionTrigger.condition);
      if (inside && condIdx === -1) {
        t.conditions.push(s.conditionTrigger.condition);
        changed = true;
      } else if (!inside && condIdx !== -1) {
        t.conditions.splice(condIdx, 1);
        changed = true;
      }
    });
  });
  if (changed) {
    boardSave();
    boardRender();
    if (myRole === 'mestre') syncBoardTokensToPlayers();
    applyPlayerConditionEffects();
    BOARD.tokens.forEach(t => _syncCondToLinkedSheet(t));
  }
}

function _posicaoDentroForma(s, t) {
  const pos = tokenWorldPos(t.gx, t.gy);
  const wx = pos.x, wy = pos.y;
  var sz = t.size || 1;
  if (s.kind === 'circle') {
    const cx = (s.x1 + s.x2) / 2;
    const cy = (s.y1 + s.y2) / 2;
    const rx = Math.abs(s.x2 - s.x1) / 2;
    const ry = Math.abs(s.y2 - s.y1) / 2;
    if (rx === 0 || ry === 0) return false;
    const dx = (wx - cx) / rx;
    const dy = (wy - cy) / ry;
    return dx * dx + dy * dy <= 1;
  } else if (s.kind === 'freehand') {
    return s.points && isPointInPolygon(wx, wy, s.points);
  }
  const x1 = Math.min(s.x1, s.x2), x2 = Math.max(s.x1, s.x2);
  const y1 = Math.min(s.y1, s.y2), y2 = Math.max(s.y1, s.y2);
  return wx >= x1 && wx <= x2 && wy >= y1 && wy <= y2;
}

function _revelarImagemGatilho(shape) {
  if (!shape.triggerImageUrl) return;
  if (shape.triggered) return;
  shape.triggered = true;
  boardSave();
  syncShapesToPlayers();
  boardRender();
}

function processarGatilho(token, shape) {
  _revelarImagemGatilho(shape);
  const tType = shape.triggerType;
  if (tType === 'stairs-up') {
    // Armadilha para Cima: automática, mão única, sem retorno
    const delta = shape.floorDelta || 1;
    token.z = (token.z || 0) + delta * 10;
    toast(`💨 ${token.name} foi lançado ${delta} andar(es) para CIMA!`);
    finalizarGatilho(token);
  } else if (tType === 'stairs-down') {
    // Buraco: automático, mão única, sem retorno
    const delta = shape.floorDelta || 1;
    token.z = (token.z || 0) - delta * 10;
    toast(`🕳 ${token.name} CAIU ${delta} andar(es) no buraco!`);
    finalizarGatilho(token);
  } else if (tType === 'elevator-auto') {
    const target = shape.targetFloor !== undefined ? shape.targetFloor : 0;
    token.z = target * 10;
    toast(`⚡ ${token.name} foi teletransportado para o Andar ${target}.`);
    finalizarGatilho(token);
  } else if (tType === 'stairs' || tType === 'stair-up' || tType === 'stair-down' || tType === 'elevator-manual') {
    // Em modo "visão do jogador", o mestre interage diretamente com os gatilhos
    if (myRole === 'mestre' && !emVisaoJogador()) {
      const ownerPeer = token.controlledBy;
      if (ownerPeer && ownerPeer !== myPeerId && connections[ownerPeer]) {
        connections[ownerPeer].send({
          type: 'trigger-prompt',
          tokenId: token.id,
          shapeId: shape.id,
          triggerType: tType,
          targetFloor: shape.targetFloor
        });
        return;
      }
    }
    abrirModalEscolhaGatilho(token, shape);
  }
}

function animarTransicaoAndar(icone, texto, callback) {
  const el = document.getElementById('floorTransition');
  if (!el) { callback(); return; }
  const iconEl = document.getElementById('floorTransitionIcon');
  const textEl = document.getElementById('floorTransitionText');
  if (iconEl) iconEl.textContent = icone;
  if (textEl) textEl.textContent = texto;
  el.style.display = 'flex';
  requestAnimationFrame(() => {
    el.classList.add('show');
    setTimeout(() => {
      callback();
      setTimeout(() => {
        el.classList.remove('show');
        setTimeout(() => { el.style.display = 'none'; }, 300);
      }, 100);
    }, 350);
  });
}

function finalizarGatilho(token) {
  const oldFloor = BOARD.activeFloor;
  const targetFloor = getFloorFromZ(token.z);
  if (oldFloor === targetFloor) {
    boardSave();
    boardRender();
    if (myRole === 'mestre') {
      syncBoardTokensToPlayers();
    }
    return;
  }
  const direcao = targetFloor > oldFloor ? 1 : -1;
  animarTransicaoAndar(
    direcao > 0 ? '🪜' : '🕳',
    direcao > 0 ? `Subindo para o Andar ${targetFloor}...` : `Descendo para o Andar ${targetFloor}...`,
    () => {
      BOARD.activeFloor = targetFloor;
      boardSave();
      boardRender();
      if (myRole === 'mestre') {
        syncBoardTokensToPlayers();
        syncFloorToPlayers();
        setTimeout(atualizarFogJogador, 50);
      }
    }
  );
}

function abrirModalEscolhaGatilho(token, shape) {
  const modal = document.getElementById('stairModal');
  if (!modal) return;

  const title = document.getElementById('stairModalTitle');
  const text = document.getElementById('stairModalText');
  const buttons = document.getElementById('stairModalButtons');

  const nomes = {
    'stairs': 'Escada', 'stair-up': 'Escada que Sobe', 'stair-down': 'Escada que Desce',
    'stairs-up': 'Armadilha', 'stairs-down': 'Buraco',
    'elevator-manual': 'Elevador', 'elevator-auto': 'Elevador Automático'
  };
  title.textContent = nomes[shape.triggerType] || 'Gatilho';
  text.textContent = `O token "${token.name}" pisou em ${title.textContent.toLowerCase()}. O que deseja fazer?`;
  buttons.innerHTML = '';

  const currentFloor = getFloorFromZ(token.z);

  if (shape.triggerType === 'stairs') {
    const btnUp = document.createElement('button');
    btnUp.className = 'tool-btn';
    btnUp.style.padding = '0.5rem';
    btnUp.textContent = `▲ Subir para Andar ${currentFloor + 1}`;
    btnUp.onclick = () => {
      executarAcaoGatilho(token.id, shape.id, 'subir');
      fecharModalGatilho();
    };
    buttons.appendChild(btnUp);

    const btnDown = document.createElement('button');
    btnDown.className = 'tool-btn';
    btnDown.style.padding = '0.5rem';
    btnDown.textContent = `▼ Descer para Andar ${currentFloor - 1}`;
    btnDown.onclick = () => {
      executarAcaoGatilho(token.id, shape.id, 'descer');
      fecharModalGatilho();
    };
    buttons.appendChild(btnDown);
  } else if (shape.triggerType === 'stair-up') {
    const btnUp = document.createElement('button');
    btnUp.className = 'tool-btn';
    btnUp.style.padding = '0.5rem';
    btnUp.textContent = `▲ Subir para Andar ${currentFloor + 1}`;
    btnUp.onclick = () => {
      executarAcaoGatilho(token.id, shape.id, 'subir');
      fecharModalGatilho();
    };
    buttons.appendChild(btnUp);
  } else if (shape.triggerType === 'stair-down') {
    const btnDown = document.createElement('button');
    btnDown.className = 'tool-btn';
    btnDown.style.padding = '0.5rem';
    btnDown.textContent = `▼ Descer para Andar ${currentFloor - 1}`;
    btnDown.onclick = () => {
      executarAcaoGatilho(token.id, shape.id, 'descer');
      fecharModalGatilho();
    };
    buttons.appendChild(btnDown);
  } else if (shape.triggerType === 'elevator-manual') {
    const target = shape.targetFloor !== undefined ? shape.targetFloor : 0;
    const btnGo = document.createElement('button');
    btnGo.className = 'tool-btn';
    btnGo.style.padding = '0.5rem';
    btnGo.textContent = `🛗 Ir para Andar ${target}`;
    btnGo.onclick = () => {
      executarAcaoGatilho(token.id, shape.id, 'teleport');
      fecharModalGatilho();
    };
    buttons.appendChild(btnGo);
  }

  const btnCancel = document.createElement('button');
  btnCancel.className = 'tool-btn danger';
  btnCancel.style.padding = '0.5rem';
  btnCancel.textContent = `Cancelar`;
  btnCancel.onclick = fecharModalGatilho;
  buttons.appendChild(btnCancel);

  modal.style.display = 'flex';
}

function fecharModalGatilho() {
  const modal = document.getElementById('stairModal');
  if (modal) modal.style.display = 'none';
}

function executarAcaoGatilho(tokenId, shapeId, action) {
  if (myRole === 'jogador') {
    if (masterConn) {
      masterConn.send({
        type: 'solicitar-ativar-gatilho',
        tokenId,
        shapeId,
        action
      });
    }
  } else {
    const t = BOARD.tokens.find(tk => tk.id === tokenId);
    const s = BOARD.shapes.find(sk => sk.id === shapeId);
    if (t && s) {
      aplicarAcaoGatilho(t, s, action);
    }
  }
}

function aplicarAcaoGatilho(t, s, action) {
  const oldFloor = BOARD.activeFloor;
  if (action === 'subir') {
    t.z = (t.z || 0) + 10;
  } else if (action === 'descer') {
    t.z = (t.z || 0) - 10;
  } else if (action === 'teleport') {
    const target = s.targetFloor !== undefined ? s.targetFloor : 0;
    t.z = target * 10;
  }
  const targetFloor = getFloorFromZ(t.z);
  if (oldFloor === targetFloor) {
    if (action === 'subir') toast(`🪜 ${t.name} subiu para o Andar ${targetFloor}.`);
    else if (action === 'descer') toast(`🪜 ${t.name} desceu para o Andar ${targetFloor}.`);
    else toast(`🛗 ${t.name} usou o elevador para o Andar ${targetFloor}.`);
    boardSave();
    boardRender();
    syncBoardTokensToPlayers();
    return;
  }
  const direcao = targetFloor > oldFloor ? 1 : -1;
  const icone = action === 'teleport' ? '🛗' : (direcao > 0 ? '🪜' : '🕳');
  const verbo = action === 'teleport' ? 'Teleportando' : (direcao > 0 ? 'Subindo' : 'Descendo');
  animarTransicaoAndar(icone, `${verbo} para o Andar ${targetFloor}...`, () => {
    BOARD.activeFloor = targetFloor;
    if (action === 'subir') toast(`🪜 ${t.name} subiu para o Andar ${targetFloor}.`);
    else if (action === 'descer') toast(`🪜 ${t.name} desceu para o Andar ${targetFloor}.`);
    else toast(`🛗 ${t.name} usou o elevador para o Andar ${targetFloor}.`);
    boardSave();
    boardRender();
    syncBoardTokensToPlayers();
    if (myRole === 'mestre') {
      syncFloorToPlayers();
      setTimeout(atualizarFogJogador, 50);
    }
  });
}

function setShapeTrigger(type) {
  if (!contextShapeId) return;
  const shape = BOARD.shapes.find(s => s.id === contextShapeId);
  if (shape) {
    if (type === null) {
      delete shape.triggerType;
      delete shape.targetFloor;
      delete shape.floorDelta;
      toast('Gatilho removido do desenho.');
    } else {
      shape.triggerType = type;
      if (type === 'stairs-up') {
        const deltaStr = prompt('Quantos andares para SUBIR? (ex: 1, 2, 3):', '1');
        if (deltaStr === null) { fecharContextMenu(); return; }
        const deltaNum = parseInt(deltaStr);
        shape.floorDelta = (isNaN(deltaNum) || deltaNum < 1) ? 1 : deltaNum;
      } else if (type === 'stairs-down') {
        const deltaStr = prompt('Quantos andares para DESCER? (ex: 1, 2, 3):', '1');
        if (deltaStr === null) { fecharContextMenu(); return; }
        const deltaNum = parseInt(deltaStr);
        shape.floorDelta = (isNaN(deltaNum) || deltaNum < 1) ? 1 : deltaNum;
      } else if (type === 'elevator-auto' || type === 'elevator-manual') {
        const floorStr = prompt('Digite o andar de destino para o elevador (ex: 0, 1, 2, -1):', '0');
        if (floorStr === null) { fecharContextMenu(); return; }
        const floorNum = parseInt(floorStr);
        shape.targetFloor = isNaN(floorNum) ? 0 : floorNum;
      }
      toast('Gatilho configurado no desenho!');
    }
    boardSave();
    boardRender();
    syncShapesToPlayers();
  }
  fecharContextMenu();
}

function setWallTypeAction(type) {
  if (!BOARD.selectedWallId) return;
  const w = BOARD.walls.find(wall => wall.id === BOARD.selectedWallId);
  if (w) {
    snapshotBoard();
    w.type = type;
    if (type === 'door' || type === 'window') {
      w.open = false;
    }
    boardSave();
    boardRender();
    syncWallsToPlayers();
    setTimeout(atualizarFogJogador, 50);
    const names = {
      normal: 'Parede Normal',
      invisible: 'Parede Invisível',
      door: 'Porta',
      window: 'Janela'
    };
    toast(`🧱 Tipo de parede alterado para: ${names[type] || type}`);
  }
  fecharContextMenu();
}

function contextDeleteWall() {
  if (!BOARD.selectedWallId) return;
  snapshotBoard();
  BOARD.walls = BOARD.walls.filter(w => w.id !== BOARD.selectedWallId);
  BOARD.selectedWallId = null;
  _invalidateOutdoorCache();
  boardSave();
  boardRender();
  syncWallsToPlayers();
  toast('🧱 Parede removida.');
  setTimeout(atualizarFogJogador, 50);
  fecharContextMenu();
}

function contextDeleteShape() {
  if (!contextShapeId) return;
  BOARD.shapes = BOARD.shapes.filter(s => s.id !== contextShapeId);
  boardSave();
  syncShapesToPlayers();
  boardRender();
  toast('🗑 Desenho removido.');
  fecharContextMenu();
}

let _shapeConfigId = null;

function abrirModalConfigForma(shape) {
  _shapeConfigId = shape.id;
  const chk = document.getElementById('shapeHiddenCheck');
  if (chk) chk.checked = shape.hidden === true;
  const imgUrl = document.getElementById('shapeTriggerImageUrl');
  if (imgUrl) imgUrl.value = shape.triggerImageUrl || '';
  _atualizarPreviewImagemTrigger();
  // Mostra botão "Rearmar" apenas se a armadilha já foi disparada
  const btnRearmar = document.getElementById('btnRearmarForma');
  if (btnRearmar) btnRearmar.style.display = shape.triggered ? '' : 'none';
  const modal = document.getElementById('shapeConfigModal');
  if (modal) modal.style.display = 'flex';
}

function salvarConfigForma() {
  if (!_shapeConfigId) return;
  const shape = BOARD.shapes.find(s => s.id === _shapeConfigId);
  if (!shape) return;
  const chk = document.getElementById('shapeHiddenCheck');
  shape.hidden = chk ? chk.checked : false;
  const imgUrl = document.getElementById('shapeTriggerImageUrl');
  shape.triggerImageUrl = imgUrl ? imgUrl.value.trim() || null : null;
  boardSave();
  syncShapesToPlayers();
  boardRender();
  fecharModalConfigForma();
}

function _atualizarPreviewImagemTrigger() {
  const url = document.getElementById('shapeTriggerImageUrl')?.value?.trim();
  const preview = document.getElementById('shapeTriggerImagePreview');
  const img = document.getElementById('shapeTriggerImagePreviewImg');
  if (!preview || !img) return;
  if (url) {
    img.src = url;
    preview.style.display = 'block';
  } else {
    preview.style.display = 'none';
  }
}

function rearmarForma() {
  if (!_shapeConfigId) return;
  const shape = BOARD.shapes.find(s => s.id === _shapeConfigId);
  if (!shape) return;
  shape.triggered = false;
  boardSave();
  syncShapesToPlayers();
  boardRender();
  fecharModalConfigForma();
  toast('🔃 Armadilha rearmada!');
}

function buscarImagemTrigger() {
  abrirBuscaUnsplash();
  // Após selecionar, o usuário copia manualmente a URL
}

function fecharModalConfigForma() {
  _shapeConfigId = null;
  const modal = document.getElementById('shapeConfigModal');
  if (modal) modal.style.display = 'none';
}

// ── Modal de Condição para Formas ──
let _shapeCondFormaId = null;

function abrirModalCondTriggerForma() {
  if (!contextShapeId) { fecharContextMenu(); return; }
  const shape = BOARD.shapes.find(s => s.id === contextShapeId);
  if (!shape) { fecharContextMenu(); return; }
  _shapeCondFormaId = contextShapeId;
  const current = shape.conditionTrigger;
  const container = document.getElementById('shapeCondList');
  if (!container) { fecharContextMenu(); return; }
  container.innerHTML = '';
  CONDITION_LIST.forEach(c => {
    const btn = document.createElement('button');
    btn.style.cssText = 'display:flex;align-items:center;gap:0.3rem;padding:0.25rem 0.4rem;border:1px solid var(--border);border-radius:3px;background:var(--parch3);color:var(--text);font-size:0.78rem;cursor:pointer;font-family:\'Crimson Text\',serif;transition:all 0.1s;text-align:left;';
    btn.innerHTML = (CONDITION_EMOJI[c] || '') + ' ' + c;
    btn.dataset.condition = c;
    btn.onclick = function() {
      container.querySelectorAll('button').forEach(b => b.style.borderColor = 'var(--border)');
      this.style.borderColor = 'var(--gold)';
      this.style.background = 'rgba(212,175,55,0.12)';
    };
    if (current && current.condition === c) {
      btn.style.borderColor = 'var(--gold)';
      btn.style.background = 'rgba(212,175,55,0.12)';
    }
    container.appendChild(btn);
  });
  const radios = document.getElementsByName('shapeCondMode');
  radios.forEach(r => r.checked = false);
  if (current && current.mode === 'continuous') {
    document.querySelector('input[name="shapeCondMode"][value="continuous"]').checked = true;
  } else {
    document.querySelector('input[name="shapeCondMode"][value="once"]').checked = true;
  }
  const btnRemover = document.getElementById('btnRemoverCondForma');
  if (btnRemover) btnRemover.style.display = current ? '' : 'none';
  document.getElementById('shapeCondModal').style.display = 'flex';
  fecharContextMenu();
}

function salvarCondTriggerForma() {
  if (!_shapeCondFormaId) { fecharModalCondForma(); return; }
  const shape = BOARD.shapes.find(s => s.id === _shapeCondFormaId);
  if (!shape) { fecharModalCondForma(); return; }
  const selected = document.querySelector('#shapeCondList button[style*="border-color: var(--gold)"]');
  if (!selected) { toast('Selecione uma condição.'); return; }
  const condition = selected.dataset.condition;
  const mode = document.querySelector('input[name="shapeCondMode"]:checked')?.value || 'once';
  snapshotBoard();
  shape.conditionTrigger = { condition, mode, appliedTokens: [] };
  if (mode === 'once') shape.triggered = false;
  boardSave();
  boardRender();
  syncShapesToPlayers();
  toast(`⚡ Forma aplicará "${condition}" (${mode === 'once' ? 'ao entrar' : 'enquanto estiver dentro'})`);
  fecharModalCondForma();
}

function removerCondTriggerForma() {
  if (!_shapeCondFormaId) { fecharModalCondForma(); return; }
  const shape = BOARD.shapes.find(s => s.id === _shapeCondFormaId);
  if (!shape) { fecharModalCondForma(); return; }
  snapshotBoard();
  delete shape.conditionTrigger;
  boardSave();
  boardRender();
  syncShapesToPlayers();
  toast('Gatilho de condição removido.');
  fecharModalCondForma();
}

function fecharModalCondForma() {
  _shapeCondFormaId = null;
  const modal = document.getElementById('shapeCondModal');
  if (modal) modal.style.display = 'none';
}

function converterFormaEmParedes() {
  if (!contextShapeId) return;
  const shape = BOARD.shapes.find(s => s.id === contextShapeId);
  if (!shape) return;

  const floorZ = shape.z !== undefined ? shape.z : (BOARD.activeFloor || 0) * 10;

  if (shape.kind === 'rect') {
    const x1 = shape.x1, y1 = shape.y1, x2 = shape.x2, y2 = shape.y2;
    const segments = [
      { x1: x1, y1: y1, x2: x2, y2: y1 },
      { x1: x2, y1: y1, x2: x2, y2: y2 },
      { x1: x2, y1: y2, x2: x1, y2: y2 },
      { x1: x1, y1: y2, x2: x1, y2: y1 }
    ];
    segments.forEach(seg => {
      BOARD.walls.push({
        id: 'wl' + Date.now() + Math.floor(Math.random() * 9999),
        x1: seg.x1, y1: seg.y1, x2: seg.x2, y2: seg.y2,
        z: floorZ,
        open: false,
        soundId: null
      });
    });
    toast('🧱 Desenho retangular convertido em 4 paredes!');
  } else if (shape.kind === 'circle') {
    const cx = (shape.x1 + shape.x2) / 2;
    const cy = (shape.y1 + shape.y2) / 2;
    const rx = Math.abs(shape.x2 - shape.x1) / 2;
    const ry = Math.abs(shape.y2 - shape.y1) / 2;
    const steps = 24;
    for (let i = 0; i < steps; i++) {
      const a1 = (i / steps) * Math.PI * 2;
      const a2 = ((i + 1) / steps) * Math.PI * 2;
      const sx1 = cx + rx * Math.cos(a1);
      const sy1 = cy + ry * Math.sin(a1);
      const sx2 = cx + rx * Math.cos(a2);
      const sy2 = cy + ry * Math.sin(a2);
      BOARD.walls.push({
        id: 'wl' + Date.now() + Math.floor(Math.random() * 9999),
        x1: sx1, y1: sy1, x2: sx2, y2: sy2,
        z: floorZ,
        open: false,
        soundId: null
      });
    }
    toast(`🧱 Desenho circular convertido em ${steps} paredes!`);
  } else if (shape.kind === 'freehand' && shape.points && shape.points.length > 1) {
    const pts = shape.points;
    for (let i = 0; i < pts.length; i++) {
      const p1 = pts[i];
      const p2 = pts[(i + 1) % pts.length];
      BOARD.walls.push({
        id: 'wl' + Date.now() + Math.floor(Math.random() * 9999),
        x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y,
        z: floorZ,
        open: false,
        soundId: null
      });
    }
    toast(`🧱 Desenho livre convertido em ${pts.length} paredes!`);
  }

  BOARD.shapes = BOARD.shapes.filter(s => s.id !== contextShapeId);
  contextShapeId = null;
  fecharContextMenu();
  boardSave();
  boardRender();
  syncWallsToPlayers();
  syncShapesToPlayers();
  setTimeout(atualizarFogJogador, 50);
}

function aplicarNevoaForma(revelar) {
  if (!contextShapeId) return;
  const shape = BOARD.shapes.find(s => s.id === contextShapeId);
  if (!shape) return;

  const gx1 = Math.floor(Math.min(shape.x1, shape.x2) / BOARD.gridSize);
  const gy1 = Math.floor(Math.min(shape.y1, shape.y2) / BOARD.gridSize);
  const gx2 = Math.ceil(Math.max(shape.x1, shape.x2) / BOARD.gridSize);
  const gy2 = Math.ceil(Math.max(shape.y1, shape.y2) / BOARD.gridSize);

  const floor = getFloorFromZ(shape.z);
  let count = 0;

  if (!BOARD.fogVisible) {
    BOARD.fogVisible = new Set();
  }

  for (let gx = gx1; gx <= gx2; gx++) {
    for (let gy = gy1; gy <= gy2; gy++) {
      const key = floor === 0 ? `${gx},${gy}` : `${floor}:${gx},${gy}`;
      if (revelar) BOARD.fogVisible.add(key);
      else BOARD.fogVisible.delete(key);
      count++;
    }
  }

  contextShapeId = null;
  boardSave();
  boardRender();
  syncFogToPlayers();
  toast(`Névoa ${revelar ? 'revelada' : 'aplicada'} em ${count} células.`);
}

function getEffectiveVisionRadius(token) {
  if (token.conditions && token.conditions.indexOf('Cego') !== -1) return 1;
  const visionType = token.visionType || 'normal';
  const lightingType = BOARD.lightingType || 'sunny';
  const baseRange = token.visaoRange || 12;

  // Converter 9m para células de grade (alcance curto da penu mbra/visão no escuro)
  const scaleVal = BOARD.gridScaleVal || 1.5;
  const shortRange = Math.round(9 / scaleVal); // tipicamente 6 células a 1,5m/célula

  if (lightingType === 'sunny') {
    // Luz do dia: todos vêem em alcance máximo
    return baseRange;
  }

  if (lightingType === 'twilight' || lightingType === 'cloudy' || lightingType === 'rainy' || lightingType === 'snowy') {
    // Escuridão leve / nublado / chuva / neve
    switch (visionType) {
      case 'penumbra': return shortRange; // Visão na Penumbra: enxerga 9m em escuridão leve
      case 'escuro':   return shortRange; // Visão no Escuro: também enxerga 9m em escuridão leve
      default:         return Math.ceil(baseRange * 0.5); // Normal: metade do alcance
    }
  }

  if (lightingType === 'starnight') {
    // Noite Estrelada: luminosidade ambiente sutil. Como twilight mas um pouco mais escuro.
    switch (visionType) {
      case 'penumbra': return shortRange;             // Penumbra: enxerga 9m
      case 'escuro':   return shortRange;             // Visão no Escuro: enxerga 9m
      default:         return Math.ceil(baseRange * 0.35); // Normal: ~1/3 do alcance
    }
  }

  if (lightingType === 'darknight' || lightingType === 'cave') {
    // Escuridão total
    switch (visionType) {
      case 'penumbra': return 0; // Penumbra não enxerga em escuridão total
      case 'escuro':   return shortRange; // Visão no Escuro: enxerga 9m mesmo em escuridão total
      default:         return 0; // Normal: não enxerga nada
    }
  }

  return baseRange;
}

function atualizarFogJogador() {
  if (myRole === 'mestre' && BOARD.playerViewTokenId) {
    const token = BOARD.tokens.find(t => t.id === BOARD.playerViewTokenId);
    if (!token) { exitPlayerView(); return; }
    const radius = getEffectiveVisionRadius(token);
    BOARD.fogVisible = computeVisibility(token, radius);
    // Sempre adicionar as células do próprio token (visível independente de escuridão)
    adicionarCelulasPropriasToken(token, BOARD.fogVisible);
    // Auras com Light de todos os tokens da camada de jogadores também revelam névoa
    BOARD.tokens.forEach(t => {
      if (t.type === 'object') return;
      if ((t.layer || 'players') !== 'players') return;
      adicionarCelulasAuraLight(t, BOARD.fogVisible);
    });
    boardRender();
    return;
  }
  if (myRole === 'mestre') {
    if (BOARD.fogManual && BOARD.fogVisible) { boardRender(); return; }
    BOARD.fogVisible = null; boardRender(); return;
  }
  const currentFloor = getCurrentFloor();
  const meusTokens = BOARD.tokens.filter(t => t.controlledBy === myPeerId && t.type !== 'object' && getFloorFromZ(t.z) === currentFloor);
  if (meusTokens.length === 0) {
    BOARD.fogVisible = new Set();
    boardRender(); return;
  }
  const total = new Set();
  meusTokens.forEach(t => {
    const radius = getEffectiveVisionRadius(t);
    computeVisibility(t, radius).forEach(k => total.add(k));
    // Sempre adicionar as células do próprio token (visível independente de escuridão)
    adicionarCelulasPropriasToken(t, total);
  });
  // Auras com Light de todos os tokens da camada de jogadores também revelam névoa
  // (consistente com a camada de iluminação que já ilumina visualmente essas auras)
  BOARD.tokens.forEach(t => {
    if (t.type === 'object') return;
    if (getFloorFromZ(t.z) !== currentFloor) return;
    if ((t.layer || 'players') !== 'players') return;
    adicionarCelulasAuraLight(t, total);
  });
  // Mesclar células reveladas por colisão de token cego
  if (BOARD.blindRevealed) BOARD.blindRevealed.forEach(c => total.add(c));
  BOARD.fogVisible = total;
  boardRender();
}

// Adiciona as células que o token ocupa ao conjunto de células visíveis,
// garantindo que o próprio token seja sempre visível para seu controlador.
function adicionarCelulasPropriasToken(token, visibleSet) {
  const floor = getFloorFromZ(token.z);
  const spanX = Math.ceil(token.sizeX || token.size || 1);
  const spanY = Math.ceil(token.sizeY || token.size || 1);
  for (let dx = 0; dx < spanX; dx++) {
    for (let dy = 0; dy < spanY; dy++) {
      const gx = token.gx + dx;
      const gy = token.gy + dy;
      const key = floor === 0 ? `${gx},${gy}` : `${floor}:${gx},${gy}`;
      visibleSet.add(key);
    }
  }
}

// Adiciona as células dentro do raio de auras com Light ativo ao conjunto de células visíveis,
// permitindo que a iluminação da aura revele o mapa (fog de guerra).
function adicionarCelulasAuraLight(token, visibleSet) {
  if (!token.auras || token.auras.length === 0) return;
  const floor = getFloorFromZ(token.z);
  const scaleVal = BOARD.gridScaleVal || 1.5;
  const gx0 = token.gx;
  const gy0 = token.gy;
  token.auras.forEach(aura => {
    if (!aura.light || !aura.radius || aura.radius <= 0) return;
    const radiusCells = Math.ceil(aura.radius / scaleVal);
    for (let dgx = -radiusCells; dgx <= radiusCells; dgx++) {
      for (let dgy = -radiusCells; dgy <= radiusCells; dgy++) {
        if (dgx * dgx + dgy * dgy > radiusCells * radiusCells) continue;
        const gx = gx0 + dgx;
        const gy = gy0 + dgy;
        if (gx < 0 || gy < 0) continue;
        const key = floor === 0 ? `${gx},${gy}` : `${floor}:${gx},${gy}`;
        visibleSet.add(key);
      }
    }
  });
}

// Desenha a borda de um token em qualquer contexto (canvas principal ou preview).
// opts: { borderType, borderWidth, borderColor, shapeType, zoom }
function renderTokenBorder(ctx, px, py, r, opts) {
  const borderType = opts.borderType || 'solid';
  if (borderType === 'none') return;
  const zoom = opts.zoom || 1;
  const borderWidth = parseFloat(opts.borderWidth) || 1.5;
  const col = opts.borderColor || '#000000';
  const shapeType = opts.shapeType || 'circle';

  ctx.save();
  const bw = borderWidth / zoom;
  ctx.lineWidth = bw;
  ctx.strokeStyle = col;
  ctx.beginPath();
  tokenShapePath(ctx, px, py, r, shapeType);

  if (borderType === 'dashed') {
    ctx.setLineDash([6 / zoom, 3 / zoom]);
    ctx.stroke();
  } else if (borderType === 'dotted') {
    ctx.setLineDash([2 / zoom, 3 / zoom]);
    ctx.stroke();
  } else if (borderType === 'double') {
    ctx.stroke();
    const innerR = r - bw * 1.8;
    if (innerR > 2) {
      ctx.beginPath();
      tokenShapePath(ctx, px, py, innerR, shapeType);
      ctx.stroke();
    }
  } else if (borderType === 'neon') {
    ctx.shadowColor = col;
    ctx.shadowBlur = 10 / zoom;
    ctx.strokeStyle = col;
    ctx.lineWidth = bw;
    ctx.stroke();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = bw * 0.4;
    ctx.stroke();
  } else if (borderType === 'runic') {
    ctx.stroke();
    ctx.save();
    ctx.translate(px, py);
    ctx.strokeStyle = col;
    ctx.lineWidth = bw * 0.7;
    const numRunas = 12;
    for (let i = 0; i < numRunas; i++) {
      ctx.rotate((Math.PI * 2) / numRunas);
      ctx.beginPath();
      ctx.moveTo(r - bw, 0);
      ctx.lineTo(r + bw * 1.5, 0);
      ctx.stroke();
    }
    ctx.restore();
  } else {
    ctx.stroke();
  }
  ctx.restore();
}

function tokenShapePath(ctx, px, py, r, shapeType) {
  switch (shapeType) {
    case 'square':
      ctx.rect(px - r, py - r, r * 2, r * 2);
      break;
    case 'rounded-square':
      if (ctx.roundRect) {
        ctx.roundRect(px - r, py - r, r * 2, r * 2, r * 0.2);
      } else {
        ctx.rect(px - r, py - r, r * 2, r * 2);
      }
      break;
    case 'hexagon':
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = Math.PI / 3 * i - Math.PI / 6;
        const hx = px + r * Math.cos(angle);
        const hy = py + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(hx, hy) : ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      break;
    default:
      ctx.arc(px, py, r, 0, Math.PI * 2);
  }
}

function hexCenter(gx, gy) {
  const R = BOARD.gridSize / 2;
  const hexH = Math.sqrt(3) * R;
  return {
    x: gx * R * 1.5,
    y: gy * hexH + ((Math.abs(Math.round(gx)) % 2) ? hexH / 2 : 0)
  };
}

function hexGridFromPoint(wx, wy) {
  const R = BOARD.gridSize / 2;
  const hexH = Math.sqrt(3) * R;
  const gxApprox = wx / (R * 1.5);
  const candidates = [Math.floor(gxApprox), Math.ceil(gxApprox)];
  let bestGx = 0, bestGy = 0, bestDist = Infinity;
  for (const cgx of candidates) {
    const gyApprox = (wy - ((Math.abs(Math.round(cgx)) % 2) ? hexH / 2 : 0)) / hexH;
    for (const cgy of [Math.floor(gyApprox), Math.ceil(gyApprox)]) {
      const c = hexCenter(cgx, cgy);
      const d = Math.hypot(wx - c.x, wy - c.y);
      if (d < bestDist) {
        bestDist = d;
        bestGx = cgx;
        bestGy = cgy;
      }
    }
  }
  return { gx: Math.max(0, bestGx), gy: Math.max(0, bestGy) };
}

// ══════════════════════════════════════════════════════
//  SISTEMA DE PROJEÇÃO 2D / 2.5D ISOMÉTRICO
// ══════════════════════════════════════════════════════

// Converte coordenadas mundo (world/flat) → tela (screen) no modo isométrico
// O ratio ISO_RATIO controla o achatamento vertical (0.5 = isométrico clássico)
const ISO_RATIO = 0.5;

function isoProject(wx, wy) {
  const gs = BOARD.gridSize;
  const cols = BOARD.gridCols || 30;
  // Desloca a origem para que o grid fique centralizado horizontalmente
  const originX = cols * gs * ISO_RATIO;
  return {
    x: (wx - wy) * ISO_RATIO + originX,
    y: (wx + wy) * ISO_RATIO * ISO_RATIO
  };
}

// isoProject é uma transformação linear (afim) de (wx,wy). Esta função expõe
// os mesmos coeficientes no formato do ctx.transform(a,b,c,d,e,f) do Canvas,
// permitindo aplicar a MESMA projeção isométrica diretamente ao desenhar
// imagens (ex: o mapa de fundo), sem precisar re-implementar o warp manualmente.
function isoMatrix() {
  const gs = BOARD.gridSize;
  const cols = BOARD.gridCols || 30;
  const originX = cols * gs * ISO_RATIO;
  const r2 = ISO_RATIO * ISO_RATIO;
  return { a: ISO_RATIO, b: r2, c: -ISO_RATIO, d: r2, e: originX, f: 0 };
}

// Converte coordenadas tela (screen) → mundo (world/flat) no modo isométrico
function isoUnproject(sx, sy) {
  const gs = BOARD.gridSize;
  const cols = BOARD.gridCols || 30;
  const originX = cols * gs * ISO_RATIO;
  const sxAdj = sx - originX;
  const isoH = ISO_RATIO * ISO_RATIO;
  return {
    x: (sxAdj / ISO_RATIO + sy / isoH) / 2,
    y: (sy / isoH - sxAdj / ISO_RATIO) / 2
  };
}

// Wrapper: projeta ponto mundo → tela usando a projeção ativa
function projectPoint(wx, wy) {
  if (BOARD.projection === 'iso' && BOARD.gridType !== 'hex') {
    return isoProject(wx, wy);
  }
  return { x: wx, y: wy };
}

// Wrapper: des-projeta ponto tela → mundo usando a projeção ativa
function unprojectPoint(sx, sy) {
  if (BOARD.projection === 'iso' && BOARD.gridType !== 'hex') {
    return isoUnproject(sx, sy);
  }
  return { x: sx, y: sy };
}

// Projeta os 4 cantos de uma célula do grid — retorna array de 4 pontos {x,y}
function projectTileCorners(gx, gy) {
  const gs = BOARD.gridSize;
  return [
    projectPoint(gx * gs, gy * gs),           // topo
    projectPoint((gx + 1) * gs, gy * gs),      // direita
    projectPoint((gx + 1) * gs, (gy + 1) * gs),// base
    projectPoint(gx * gs, (gy + 1) * gs)       // esquerda
  ];
}

// Centro de uma célula na projeção ativa
function projectTileCenter(gx, gy) {
  const gs = BOARD.gridSize;
  return projectPoint(gx * gs + gs / 2, gy * gs + gs / 2);
}

// Retorna elevação visual em pixels para um andar (floor) no modo iso
function isoElevation(floor) {
  if (BOARD.projection !== 'iso') return 0;
  return floor * BOARD.gridSize * 0.6;
}

// Toggle de projeção
function toggleProjection() {
  if (BOARD.gridType === 'hex') {
    toast('Modo isométrico não disponível para grid hexagonal.');
    return;
  }
  BOARD.projection = BOARD.projection === 'iso' ? '2d' : 'iso';
  const btn = document.getElementById('btnToggleProjection');
  if (btn) {
    btn.textContent = BOARD.projection === 'iso' ? '🔷 2.5D' : '🔲 2D';
    btn.classList.toggle('active', BOARD.projection === 'iso');
  }
  boardRender();
  boardSave();
  toast(BOARD.projection === 'iso' ? 'Modo 2.5D Isométrico ativado' : 'Modo 2D Top-Down ativado');
}

function tokenWorldPos(gx, gy) {
  const gs = BOARD.gridSize;
  if (BOARD.gridType === 'hex') {
    return hexCenter(gx, gy);
  }
  if (BOARD.projection === 'iso') {
    return projectTileCenter(gx, gy);
  }
  return { x: gx * gs + gs / 2, y: gy * gs + gs / 2 };
}

// ── Coordenadas canvas → grade ──
function canvasToGrid(cx, cy) {
  const { offsetX, offsetY, zoom, gridSize, gridType } = BOARD;
  let wx = (cx - offsetX) / zoom;
  let wy = (cy - offsetY) / zoom;
  if (gridType === 'hex') {
    return hexGridFromPoint(wx, wy);
  }
  if (BOARD.projection === 'iso') {
    const world = unprojectPoint(wx, wy);
    return { gx: Math.floor(world.x / gridSize), gy: Math.floor(world.y / gridSize) };
  }
  return { gx: Math.floor(wx / gridSize), gy: Math.floor(wy / gridSize) };
}

function gridToCanvas(gx, gy) {
  const { offsetX, offsetY, zoom, gridSize, gridType } = BOARD;
  let wx, wy;
  if (gridType === 'hex') {
    const c = hexCenter(gx, gy);
    wx = c.x;
    wy = c.y;
  } else if (BOARD.projection === 'iso') {
    const p = projectPoint(gx * gridSize, gy * gridSize);
    wx = p.x;
    wy = p.y;
  } else {
    wx = gx * gridSize;
    wy = gy * gridSize;
  }
  return {
    cx: wx * zoom + offsetX,
    cy: wy * zoom + offsetY
  };
}

function getTokenAt(cx, cy) {
  const { offsetX, offsetY, zoom, gridSize, tokens } = BOARD;
  const wx = (cx - offsetX) / zoom;
  const wy = (cy - offsetY) / zoom;

  const activeLayer = (myRole === 'mestre') ? (BOARD.activeLayer || 'players') : 'players';

  for (let i = tokens.length - 1; i >= 0; i--) {
    const t = tokens[i];
    const layer = t.layer || 'players';

    if ((myRole !== 'mestre' || emVisaoJogador()) && layer === 'gm') continue;
    if (myRole === 'mestre' && !emVisaoJogador() && layer !== activeLayer) continue;
    if (getFloorFromZ(t.z) !== getCurrentFloor()) continue;

    const sizeW = (t.sizeX || t.size || 1) * gridSize;
    const sizeH = (t.sizeY || t.size || 1) * gridSize;
    const pos = tokenWorldPos(t.gx, t.gy);
    const px = pos.x;
    let py = pos.y;
    // No modo iso, aplicar elevação visual do andar
    if (BOARD.projection === 'iso') {
      py -= isoElevation(getFloorFromZ(t.z));
    }
    if (t.type === 'object') {
      if (BOARD.projection === 'iso') {
        // Hit-test losango para objetos em iso
        const isoHalfW = sizeW * ISO_RATIO;
        const isoHalfH = sizeH * ISO_RATIO * ISO_RATIO;
        const ddx = Math.abs(wx - px);
        const ddy = Math.abs(wy - py);
        if (ddx / isoHalfW + ddy / isoHalfH <= 1) return t;
      } else {
        if (wx >= px - sizeW / 2 && wx <= px + sizeW / 2 && wy >= py - sizeH / 2 && wy <= py + sizeH / 2) return t;
      }
      continue;
    }
    const rX = sizeW * 0.42;
    const rY = BOARD.projection === 'iso' ? sizeH * 0.42 * ISO_RATIO : sizeH * 0.42;
    const dist = Math.sqrt(((wx - px) / rX) ** 2 + ((wy - py) / rY) ** 2);
    if (dist <= 1) return t;
  }
  return null;
}

function getHandleAt(cx, cy) {
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const wx = (cx - offsetX) / zoom;
  const wy = (cy - offsetY) / zoom;
  const hitR = 14 / zoom;

  for (const tokenId of BOARD.selectedTokens) {
    const t = BOARD.tokens.find(tk => tk.id === tokenId);
    if (!t) continue;

    const rotation = t.rotation || 0;
    const sizeW = (t.sizeX || t.size || 1) * gridSize;
    const sizeH = (t.sizeY || t.size || 1) * gridSize;
    const pos = tokenWorldPos(t.gx, t.gy);
    const px = pos.x;
    const py = pos.y;
    const halfW = sizeW / 2;
    const halfH = sizeH / 2;

    if (t.type === 'object') {
      const half = Math.max(halfW, halfH);
      const rotOff = half + 14 / zoom;
      const rotHX = px + rotOff * Math.sin(rotation);
      const rotHY = py - rotOff * Math.cos(rotation);
      if (Math.hypot(wx - rotHX, wy - rotHY) <= hitR) {
        return { token: t, type: 'rotate' };
      }
      const rhX = px + halfW * Math.cos(rotation) - halfH * Math.sin(rotation);
      const rhY = py + halfW * Math.sin(rotation) + halfH * Math.cos(rotation);
      if (Math.hypot(wx - rhX, wy - rhY) <= hitR) {
        return { token: t, type: 'resize' };
      }
    } else {
      const rX = sizeW * 0.42;
      const rY = sizeH * 0.42;
      const r = Math.max(rX, rY);
      const handleDist = r + 22 / zoom;

      const rotHX = px + handleDist * Math.sin(rotation);
      const rotHY = py - handleDist * Math.cos(rotation);
      if (Math.hypot(wx - rotHX, wy - rotHY) <= hitR) {
        return { token: t, type: 'rotate' };
      }

      const resLocalX = rX * 0.85;
      const resLocalY = rY * 0.85;
      const resHX = px + resLocalX * Math.cos(rotation) - resLocalY * Math.sin(rotation);
      const resHY = py + resLocalX * Math.sin(rotation) + resLocalY * Math.cos(rotation);
      if (Math.hypot(wx - resHX, wy - resHY) <= hitR) {
        return { token: t, type: 'resize' };
      }
    }
  }
  return null;
}

// ── Zoom ──
function zoomBoardAt(cx, cy, delta) {
  const oldZoom = BOARD.zoom;
  BOARD.zoom = Math.min(4, Math.max(0.2, BOARD.zoom + delta));
  const dz = BOARD.zoom - oldZoom;
  BOARD.offsetX -= (cx - BOARD.offsetX) * (dz / oldZoom);
  BOARD.offsetY -= (cy - BOARD.offsetY) * (dz / oldZoom);
  document.getElementById('zoomDisplay').textContent = Math.round(BOARD.zoom * 100) + '%';
  boardRender();
  setTimeout(atualizarSeguirToken, 10);
}
function zoomBoard(delta) {
  const wrap = BOARD.wrap;
  zoomBoardAt(wrap.clientWidth / 2, wrap.clientHeight / 2, delta);
}
function zoomReset() {
  BOARD.zoom = 1; BOARD.offsetX = 0; BOARD.offsetY = 0;
  document.getElementById('zoomDisplay').textContent = '100%';
  boardRender();
  setTimeout(atualizarSeguirToken, 10);
}

let contextTokenId = null;
const _triggerImageCache = {};

// ── Eventos mouse/touch ──
function boardBindEvents() {
  const wrap = BOARD.wrap;

  wrap.addEventListener('mousedown', onBoardMouseDown);
  wrap.addEventListener('mousemove', onBoardMouseMove);
  window.addEventListener('mouseup', onBoardMouseUp);
  wrap.addEventListener('mouseleave', onBoardMouseLeave);
  wrap.addEventListener('wheel', onBoardWheel, { passive: false });

  wrap.addEventListener('touchstart', onBoardTouchStart, { passive: false });
  wrap.addEventListener('touchmove', onBoardTouchMove, { passive: false });
  wrap.addEventListener('touchend', onBoardTouchEnd);

  wrap.addEventListener('dblclick', onBoardDblClick);

  wrap.addEventListener('contextmenu', onBoardContextMenu);

  wrap.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    wrap.classList.add('drag-over');
  });
  wrap.addEventListener('dragleave', () => { wrap.classList.remove('drag-over'); });
  wrap.addEventListener('drop', (e) => {
    wrap.classList.remove('drag-over');
    if (myRole === 'mestre' || amIHost) {
      onBestiaryDrop(e);
    }
  });

  wrap.addEventListener('mousedown', (e) => { if (e.button !== 2) fecharContextMenu(); });
}

function triggerBoardPing(wx, wy) {
  const pingColor = myRole === 'mestre' ? '#ff3333' : '#33ccff';
  const pingTime = Date.now();
  
  if (!BOARD.pings) BOARD.pings = [];
  BOARD.pings.push({ x: wx, y: wy, time: pingTime, color: pingColor });
  
  boardRender();
  
  if (!BOARD.pingAnimId) {
    BOARD.pingAnimId = requestAnimationFrame(pingAnimationTick);
  }
  
  if (myRole === 'mestre') {
    broadcast({ type: 'board-ping', x: wx, y: wy, time: pingTime, color: pingColor }, null);
  } else if (masterConn) {
    masterConn.send({ type: 'board-ping', x: wx, y: wy, time: pingTime, color: pingColor });
  }
}

function pingAnimationTick() {
  const now = Date.now();
  if (BOARD.pings && BOARD.pings.length > 0) {
    BOARD.pings = BOARD.pings.filter(p => now - p.time < 1500);
    boardRender();
    if (BOARD.pings.length > 0) {
      BOARD.pingAnimId = requestAnimationFrame(pingAnimationTick);
    } else {
      BOARD.pingAnimId = null;
    }
  } else {
    BOARD.pingAnimId = null;
  }
}

function getBoardXY(e) {
  const rect = BOARD.wrap.getBoundingClientRect();
  return { x: e.clientX - rect.left, y: e.clientY - rect.top };
}

function onBoardMouseDown(e) {
  if (e.button === 1) {
    e.preventDefault();
    const { x, y } = getBoardXY(e);
    BOARD.panning = true;
    BOARD.panStartX = x - BOARD.offsetX;
    BOARD.panStartY = y - BOARD.offsetY;
    BOARD.wrap.classList.add('panning');
    return;
  }
  if (e.button !== 0) return;

  const { x, y } = getBoardXY(e);
  fecharFormToken();
  fecharContextMenu();

  // Iniciar timer para Ping (segurar botão esquerdo)
  BOARD.pingStartX = e.clientX;
  BOARD.pingStartY = e.clientY;
  BOARD.pingTimer = setTimeout(() => {
    triggerBoardPing((x - BOARD.offsetX) / BOARD.zoom, (y - BOARD.offsetY) / BOARD.zoom);
    BOARD.pingTimer = null;
  }, 600);

  if (BOARD.tool === 'pan') {
    BOARD.panning = true;
    BOARD.panStartX = x - BOARD.offsetX;
    BOARD.panStartY = y - BOARD.offsetY;
    BOARD.wrap.classList.add('panning');
    return;
  }

  if (BOARD.tool === 'wall' && myRole === 'mestre') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    const hitR = 8 / BOARD.zoom;

    // 1. Check if clicking handles of the currently selected wall
    if (BOARD.selectedWallId) {
      const selWall = BOARD.walls.find(w => w.id === BOARD.selectedWallId);
      if (selWall && getFloorFromZ(selWall.z) === getCurrentFloor()) {
        if (Math.hypot(wx - selWall.x1, wy - selWall.y1) <= hitR) {
          BOARD.wallDraggingHandle = 'p1';
          BOARD.wallDragMouseStart = { wx, wy };
          BOARD.wallDragStart = { x1: selWall.x1, y1: selWall.y1, x2: selWall.x2, y2: selWall.y2 };
          e.preventDefault();
          return;
        }
        if (Math.hypot(wx - selWall.x2, wy - selWall.y2) <= hitR) {
          BOARD.wallDraggingHandle = 'p2';
          BOARD.wallDragMouseStart = { wx, wy };
          BOARD.wallDragStart = { x1: selWall.x1, y1: selWall.y1, x2: selWall.x2, y2: selWall.y2 };
          e.preventDefault();
          return;
        }
      }
    }

    // 2. Check if clicking any existing wall on the active floor
    const nearbyWall = wallAt(wx, wy, hitR);
    if (nearbyWall) {
      BOARD.selectedWallId = nearbyWall.id;
      if (Math.hypot(wx - nearbyWall.x1, wy - nearbyWall.y1) <= hitR) {
        BOARD.wallDraggingHandle = 'p1';
      } else if (Math.hypot(wx - nearbyWall.x2, wy - nearbyWall.y2) <= hitR) {
        BOARD.wallDraggingHandle = 'p2';
      } else {
        BOARD.wallDraggingLine = true;
      }
      BOARD.wallDragMouseStart = { wx, wy };
      BOARD.wallDragStart = { x1: nearbyWall.x1, y1: nearbyWall.y1, x2: nearbyWall.x2, y2: nearbyWall.y2 };
      boardRender();
      e.preventDefault();
      return;
    }

    // 3. Clicked empty space: clear selection and start drawing a new wall
    BOARD.selectedWallId = null;
    BOARD.wallDrawing = true;
    BOARD.wallStartX = wx; BOARD.wallStartY = wy;
    BOARD.wallCurX = wx; BOARD.wallCurY = wy;
    boardRender();
    e.preventDefault();
    return;
  }

  if ((BOARD.tool === 'shape-rect' || BOARD.tool === 'shape-circle' || BOARD.tool === 'shape-freehand') && myRole === 'mestre') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    BOARD.shapeDrawing = true;
    if (BOARD.tool === 'shape-freehand') {
      BOARD.shapeFreehandPoints = [{ x: wx, y: wy }];
    } else {
      BOARD.shapeStartX = wx; BOARD.shapeStartY = wy;
      BOARD.shapeCurX = wx; BOARD.shapeCurY = wy;
    }
    e.preventDefault();
    return;
  }

  if ((BOARD.tool === 'fog' || BOARD.tool === 'reveal') && myRole === 'mestre') {
    e.preventDefault();
    if (!BOARD.fogVisible) BOARD.fogVisible = new Set();
    const gx = Math.floor((x - BOARD.offsetX) / BOARD.zoom / BOARD.gridSize);
    const gy = Math.floor((y - BOARD.offsetY) / BOARD.zoom / BOARD.gridSize);
    if (gx >= 0 && gy >= 0) {
      BOARD.fogPainting = true;
      BOARD.fogManual = true;
      if (BOARD.fogShape === 'rect') {
        BOARD.fogRectStart = { gx, gy };
        BOARD.fogRectCur = { gx, gy };
      } else {
        pintarFogCelula(gx, gy, BOARD.tool === 'reveal');
        BOARD.lastFogCell = `${gx},${gy}`;
      }
    }
    return;
  }

  if (BOARD.tool === 'ruler' || BOARD.tool === 'circle-ruler') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    BOARD.rulerActive = true;
    BOARD.rulerMode = (BOARD.tool === 'ruler') ? 'line' : 'circle';
    BOARD.rulerStartX = wx;
    BOARD.rulerStartY = wy;
    BOARD.rulerEndX = wx;
    BOARD.rulerEndY = wy;
    e.preventDefault();
    return;
  }

  if (BOARD.tool === 'way-ruler') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    if (!BOARD.wayRulerActive) {
      BOARD.wayRulerActive = true;
      BOARD.wayRulerPoints = [{ x: wx, y: wy }];
    } else {
      BOARD.wayRulerPoints.push({ x: wx, y: wy });
    }
    BOARD.wayRulerTempX = wx;
    BOARD.wayRulerTempY = wy;
    e.preventDefault();
    boardRender();
    return;
  }

  if ((myRole === 'mestre' || emVisaoJogador()) && BOARD.tool === 'move' && BOARD.selectedTokens.size > 0) {
    const handle = getHandleAt(x, y);
    if (handle) {
      const ht = handle.token;
      const sz = (ht.size || 1) * BOARD.gridSize;
      const pcx = ht.gx * BOARD.gridSize + sz / 2;
      const pcy = ht.gy * BOARD.gridSize + sz / 2;
      BOARD.handleDrag = {
        tokenId: ht.id,
        type: handle.type,
        startAngle: ht.rotation || 0,
        startSize: ht.size || 1,
        centerX: pcx,
        centerY: pcy
      };
      e.preventDefault();
      return;
    }
  }

  const token = getTokenAt(x, y);
  if (token) {
    // Jogadores não podem interagir com objetos
    if (token.type === 'object' && myRole !== 'mestre' && !emVisaoJogador()) {
      e.preventDefault();
      return;
    }
    // Modo "só o seu token": jogador não seleciona tokens dos outros
    if (myRole === 'jogador' && selecaoPropriaJogador && !temControleToken(token)) {
      e.preventDefault();
      const now = Date.now();
      if (now - selecaoPropriaLastToast > 4000) {
        selecaoPropriaLastToast = now;
        toast('🛡 Apenas o seu token é selecionável. Desative "Só eu" na barra de ferramentas para mirar/atacar outros.');
      }
      return;
    }
    if (e.shiftKey) {
      if (BOARD.selectedTokens.has(token.id)) {
        BOARD.selectedTokens.delete(token.id);
      } else {
        BOARD.selectedTokens.add(token.id);
      }
      boardRender();
      atualizarVisaoJogadorPorSelecao();
      e.preventDefault();
      return;
    }
    if (!temControleToken(token)) {
      // Jogador pode selecionar tokens alheios (para mirar/atacar), mas não movê-los
      if (!BOARD.selectedTokens.has(token.id)) {
        BOARD.selectedTokens.clear();
        BOARD.selectedTokens.add(token.id);
        boardRender();
        atualizarVisaoJogadorPorSelecao();
      }
      atualizarBotoesTokenSelected();
      e.preventDefault();
      return;
    }

    if (token.conditions) {
      if (token.conditions.indexOf('Imóvel') !== -1) {
        toast('🗿 Token imóvel não pode se mover!'); return;
      }
      if (token.conditions.indexOf('Inconsciente') !== -1) {
        toast('💤 Token inconsciente não pode se mover!'); return;
      }
      if (token.conditions.indexOf('Petrificado') !== -1) {
        toast('🪨 Token petrificado não pode se mover!'); return;
      }
      if (token.conditions.indexOf('Paralisado') !== -1) {
        toast('🧊 Token paralisado não pode se mover!'); return;
      }
    }

    if (!BOARD.selectedTokens.has(token.id)) {
      if (BOARD.mountPendingId && token.id !== BOARD.mountPendingId) {
        BOARD.mountPendingId = null;
        BOARD.selectedTokens.add(token.id);
      } else {
        BOARD.mountPendingId = null;
        BOARD.selectedTokens.clear();
        BOARD.selectedTokens.add(token.id);
      }
      boardRender();
      atualizarVisaoJogadorPorSelecao();
    }

    // Tocar som do token/objeto se tiver
    if (token.soundId) {
      const url = getSoundUrlById(token.soundId);
      if (url) {
        playSfx(url);
        if (myRole === 'mestre') broadcast({ type: 'play-sfx', url }, null);
      }
    }

    // Apenas o mestre pode arrastar tokens
    const isGroupDrag = BOARD.selectedTokens.has(token.id) && BOARD.selectedTokens.size > 1;

    snapshotBoard();
    BOARD.dragging = token;
    BOARD.dragStartGx = token.gx;
    BOARD.dragStartGy = token.gy;
    const { offsetX, offsetY, zoom, gridSize } = BOARD;
    const pos2 = tokenWorldPos(token.gx, token.gy);
    const px = pos2.x * zoom + offsetX;
    const py = pos2.y * zoom + offsetY;
    BOARD.dragOffX = x - px;
    BOARD.dragOffY = y - py;
    e.preventDefault();

    BOARD.dragGroup = null;
    if (isGroupDrag) {
      BOARD.dragGroup = {};
      BOARD.selectedTokens.forEach(id => {
        const t = BOARD.tokens.find(tk => tk.id === id);
        if (t) BOARD.dragGroup[id] = { gx: t.gx, gy: t.gy };
      });
    }
  } else if (BOARD.tool === 'move') {
    if (BOARD.activeLayer === 'map' && myRole === 'mestre' && BOARD.mapImg) {
      const wx = (x - BOARD.offsetX) / BOARD.zoom;
      const wy = (y - BOARD.offsetY) / BOARD.zoom;
      const mx = BOARD.mapX || 0;
      const my = BOARD.mapY || 0;
      const mw = BOARD.mapWidth !== undefined && BOARD.mapWidth !== null ? BOARD.mapWidth : BOARD.mapImg.naturalWidth;
      const mh = BOARD.mapHeight !== undefined && BOARD.mapHeight !== null ? BOARD.mapHeight : BOARD.mapImg.naturalHeight;
      const handleRadius = 12 / BOARD.zoom;

      if (Math.hypot(wx - (mx + mw), wy - (my + mh)) <= handleRadius) {
        snapshotBoard();
        BOARD.mapResizing = true;
        BOARD.mapStartX = mx;
        BOARD.mapStartY = my;
        BOARD.mapStartWidth = mw;
        BOARD.mapStartHeight = mh;
        BOARD.mapDragStartX = wx;
        BOARD.mapDragStartY = wy;
        e.preventDefault();
        return;
      }

      if (wx >= mx && wx <= mx + mw && wy >= my && wy <= my + mh) {
        snapshotBoard();
        BOARD.mapDragging = true;
        BOARD.mapStartX = mx;
        BOARD.mapStartY = my;
        BOARD.mapDragStartX = wx;
        BOARD.mapDragStartY = wy;
        e.preventDefault();
        return;
      }
    }

    const clickedWall = getWallHandleAt(x, y);
    if (clickedWall) {
      toggleWallState(clickedWall.id);
      e.preventDefault();
      return;
    }

    if (!e.shiftKey) {
      BOARD.selectedTokens.clear();
      BOARD.mountPendingId = null;
      boardRender();
      atualizarVisaoJogadorPorSelecao();
    }
    BOARD.marquee = { startX: x, startY: y, curX: x, curY: y };
    e.preventDefault();
  }
}

function onBoardMouseMove(e) {
  if (BOARD.pingTimer) {
    const dx = e.clientX - BOARD.pingStartX;
    const dy = e.clientY - BOARD.pingStartY;
    if (Math.hypot(dx, dy) > 8) {
      clearTimeout(BOARD.pingTimer);
      BOARD.pingTimer = null;
    }
  }

  const { x, y } = getBoardXY(e);

  if (BOARD.mapDragging) {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    const dx = wx - BOARD.mapDragStartX;
    const dy = wy - BOARD.mapDragStartY;
    BOARD.mapX = BOARD.mapStartX + dx;
    BOARD.mapY = BOARD.mapStartY + dy;
    boardRender();
    return;
  }

  if (BOARD.mapResizing) {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    const dx = wx - BOARD.mapDragStartX;
    const dy = wy - BOARD.mapDragStartY;
    let newWidth = BOARD.mapStartWidth + dx;
    let newHeight = BOARD.mapStartHeight + dy;
    if (newWidth < 50) newWidth = 50;
    if (newHeight < 50) newHeight = 50;
    if (e.shiftKey && BOARD.mapStartWidth > 0) {
      const ratio = BOARD.mapStartHeight / BOARD.mapStartWidth;
      newHeight = newWidth * ratio;
    }
    BOARD.mapWidth = newWidth;
    BOARD.mapHeight = newHeight;
    boardRender();
    return;
  }

  if (BOARD.rulerActive) {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    BOARD.rulerEndX = wx;
    BOARD.rulerEndY = wy;
    boardRender();
    return;
  }

  if (BOARD.wayRulerActive) {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    BOARD.wayRulerTempX = wx;
    BOARD.wayRulerTempY = wy;
    boardRender();
    return;
  }

  if (BOARD.panning) {
    BOARD.offsetX = x - BOARD.panStartX;
    BOARD.offsetY = y - BOARD.panStartY;
    boardRender(); return;
  }

  if (BOARD.shapeDrawing) {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;
    if (BOARD.tool === 'shape-freehand') {
      const lastPt = BOARD.shapeFreehandPoints[BOARD.shapeFreehandPoints.length - 1];
      const dist = Math.hypot(wx - lastPt.x, wy - lastPt.y);
      if (dist > 3) {
        BOARD.shapeFreehandPoints.push({ x: wx, y: wy });
        boardRender();
      }
    } else {
      let curWx = wx;
      let curWy = wy;
      if (e.shiftKey) {
        const dx = curWx - BOARD.shapeStartX;
        const dy = curWy - BOARD.shapeStartY;
        const side = Math.max(Math.abs(dx), Math.abs(dy));
        curWx = BOARD.shapeStartX + (dx < 0 ? -side : side);
        curWy = BOARD.shapeStartY + (dy < 0 ? -side : side);
      }
      BOARD.shapeCurX = curWx;
      BOARD.shapeCurY = curWy;
      boardRender();
    }
    return;
  }

  if (BOARD.tool === 'wall' && myRole === 'mestre') {
    const wx = (x - BOARD.offsetX) / BOARD.zoom;
    const wy = (y - BOARD.offsetY) / BOARD.zoom;

    if (BOARD.wallDraggingHandle && BOARD.selectedWallId) {
      const w = BOARD.walls.find(wall => wall.id === BOARD.selectedWallId);
      if (w) {
        let targetWx = wx;
        let targetWy = wy;

        if (e.shiftKey) {
          const gridSize = BOARD.gridSize;
          targetWx = Math.round(wx / (gridSize / 2)) * (gridSize / 2);
          targetWy = Math.round(wy / (gridSize / 2)) * (gridSize / 2);
        }

        if (BOARD.wallDraggingHandle === 'p1') {
          w.x1 = targetWx;
          w.y1 = targetWy;
        } else if (BOARD.wallDraggingHandle === 'p2') {
          w.x2 = targetWx;
          w.y2 = targetWy;
        }
        boardRender();
        return;
      }
    }

    if (BOARD.wallDraggingLine && BOARD.selectedWallId) {
      const w = BOARD.walls.find(wall => wall.id === BOARD.selectedWallId);
      if (w) {
        const dx = wx - BOARD.wallDragMouseStart.wx;
        const dy = wy - BOARD.wallDragMouseStart.wy;

        let newX1 = BOARD.wallDragStart.x1 + dx;
        let newY1 = BOARD.wallDragStart.y1 + dy;
        let newX2 = BOARD.wallDragStart.x2 + dx;
        let newY2 = BOARD.wallDragStart.y2 + dy;

        if (e.shiftKey) {
          const gridSize = BOARD.gridSize;
          const snapDx = Math.round(dx / (gridSize / 2)) * (gridSize / 2);
          const snapDy = Math.round(dy / (gridSize / 2)) * (gridSize / 2);
          newX1 = BOARD.wallDragStart.x1 + snapDx;
          newY1 = BOARD.wallDragStart.y1 + snapDy;
          newX2 = BOARD.wallDragStart.x2 + snapDx;
          newY2 = BOARD.wallDragStart.y2 + snapDy;
        }

        w.x1 = newX1;
        w.y1 = newY1;
        w.x2 = newX2;
        w.y2 = newY2;
        boardRender();
        return;
      }
    }
  }

  if (BOARD.wallDrawing) {
    BOARD.wallCurX = (x - BOARD.offsetX) / BOARD.zoom;
    BOARD.wallCurY = (y - BOARD.offsetY) / BOARD.zoom;
    boardRender(); return;
  }

  if (BOARD.fogPainting && (BOARD.tool === 'fog' || BOARD.tool === 'reveal')) {
    const gx = Math.floor((x - BOARD.offsetX) / BOARD.zoom / BOARD.gridSize);
    const gy = Math.floor((y - BOARD.offsetY) / BOARD.zoom / BOARD.gridSize);
    if (gx >= 0 && gy >= 0) {
      if (BOARD.fogShape === 'rect') {
        if (!BOARD.fogRectCur || BOARD.fogRectCur.gx !== gx || BOARD.fogRectCur.gy !== gy) {
          BOARD.fogRectCur = { gx, gy };
          boardRender();
        }
      } else {
        const key = `${gx},${gy}`;
        if (key !== BOARD.lastFogCell) {
          pintarFogCelula(gx, gy, BOARD.tool === 'reveal');
          BOARD.lastFogCell = key;
        }
      }
    }
    return;
  }

  if (BOARD.handleDrag) {
    const hd = BOARD.handleDrag;
    const t = BOARD.tokens.find(tk => tk.id === hd.tokenId);
    if (t) {
      const wx = (x - BOARD.offsetX) / BOARD.zoom;
      const wy = (y - BOARD.offsetY) / BOARD.zoom;

      if (hd.type === 'rotate') {
        const angle = Math.atan2(wx - hd.centerX, -(wy - hd.centerY));
        t.rotation = angle;
      } else if (hd.type === 'resize') {
        const dx = Math.abs(wx - hd.centerX);
        const dy = Math.abs(wy - hd.centerY);
        if (e.altKey) {
          // Alt pressionado: redimensiona X e Y independentemente
          t.sizeX = Math.max(0.25, Math.round((dx / BOARD.gridSize) * 2 * 4) / 4);
          t.sizeY = Math.max(0.25, Math.round((dy / BOARD.gridSize) * 2 * 4) / 4);
        } else {
          const dist = Math.hypot(dx, dy);
          let newSize;
          if (t.type === 'object') {
            newSize = Math.max(0.25, (dist / BOARD.gridSize) * 2 / Math.SQRT2);
          } else {
            newSize = Math.max(0.5, (dist / BOARD.gridSize) * 2);
          }
          t.size = Math.round(newSize * 4) / 4;
          delete t.sizeX;
          delete t.sizeY;
        }
      }
      boardRender();
    }
    return;
  }

  if (BOARD.marquee) {
    BOARD.marquee.curX = x;
    BOARD.marquee.curY = y;
    updateSelectionBox();
    return;
  }

  if (BOARD.dragging) {
    const { zoom, gridSize } = BOARD;
    const sz = (BOARD.dragging.size || 1);
    if (e.altKey) {
      const cx = x - BOARD.dragOffX + sz * gridSize * zoom / 2;
      const cy = y - BOARD.dragOffY + sz * gridSize * zoom / 2;
      const wx = (cx - BOARD.offsetX) / zoom;
      const wy = (cy - BOARD.offsetY) / zoom;
      BOARD.dragging.gx = Math.max(0, wx / gridSize - sz / 2);
      BOARD.dragging.gy = Math.max(0, wy / gridSize - sz / 2);
    } else {
      const { gx, gy } = canvasToGrid(x - BOARD.dragOffX + sz * gridSize * zoom / 2, y - BOARD.dragOffY + sz * gridSize * zoom / 2);
      BOARD.dragging.gx = Math.max(0, gx - Math.floor(sz / 2));
      BOARD.dragging.gy = Math.max(0, gy - Math.floor(sz / 2));
    }

    if (BOARD.dragGroup) {
      const dgx = BOARD.dragging.gx - BOARD.dragStartGx;
      const dgy = BOARD.dragging.gy - BOARD.dragStartGy;
      Object.keys(BOARD.dragGroup).forEach(id => {
        if (id === BOARD.dragging.id) return;
        const t = BOARD.tokens.find(tk => tk.id === id);
        if (t) {
          const start = BOARD.dragGroup[id];
          t.gx = Math.max(0, start.gx + dgx);
          t.gy = Math.max(0, start.gy + dgy);
        }
      });
    }

    // Montaria: o par arrasta junto (fixa o parceiro no centro do token puxado)
    if (getParMontaria(BOARD.dragging)) {
      seguirMontaria(BOARD.dragging);
    }

    if (emVisaoJogador()) {
      atualizarFogJogador();
    } else {
      boardRender();
    }
    updateTooltip(BOARD.dragging, x, y);
    return;
  }

  const token = getTokenAt(x, y);
  const prevHov = BOARD.hovered;
  BOARD.hovered = token && !(token.type === 'object' && myRole !== 'mestre' && !emVisaoJogador()) ? token.id : null;
  if (BOARD.hovered !== prevHov) boardRender();
  if (token) {
    if (token.type === 'object' && myRole !== 'mestre' && !emVisaoJogador()) {
      hideTooltip();
    } else {
      updateTooltip(token, x, y);
    }
  } else {
    hideTooltip();
  }
}

function _isBlind(token) {
  return token.conditions && token.conditions.indexOf('Cego') !== -1;
}

function _tokenCells(gx, gy, size) {
  const floor = getCurrentFloor();
  const cells = [];
  const sx = Math.ceil(size || 1);
  for (let dx = 0; dx < sx; dx++)
    for (let dy = 0; dy < sx; dy++)
      cells.push(floor === 0 ? `${gx + dx},${gy + dy}` : `${floor}:${gx + dx},${gy + dy}`);
  return cells;
}

function _checkTokenCollision(token, gx, gy) {
  const sz = token.size || 1;
  for (const other of BOARD.tokens) {
    if (other.id === token.id) continue;
    if (other.hideInBoard) continue;
    const oSz = other.size || 1;
    if (gx < other.gx + oSz && gx + sz > other.gx && gy < other.gy + oSz && gy + sz > other.gy)
      return other;
  }
  return null;
}

function _revealBlindBlocker(token, targetGx, targetGy, fromGx, fromGy) {
  if (!BOARD.blindRevealed) BOARD.blindRevealed = new Set();
  const wallBlocked = checkMoveBlocked(token, fromGx, fromGy, targetGx, targetGy);
  if (wallBlocked)
    _tokenCells(targetGx, targetGy, token.size || 1).forEach(c => BOARD.blindRevealed.add(c));
  const hitToken = _checkTokenCollision(token, targetGx, targetGy);
  if (hitToken)
    _tokenCells(hitToken.gx, hitToken.gy, hitToken.size || 1).forEach(c => BOARD.blindRevealed.add(c));
  if (BOARD.fogVisible)
    BOARD.blindRevealed.forEach(c => BOARD.fogVisible.add(c));
}

function finalizarArrastoToken() {
  if (BOARD.dragging) {
    const token = BOARD.dragging;
    const isBlind = _isBlind(token);
    const isGroup = !!BOARD.dragGroup;
    const targetGx = token.gx;
    const targetGy = token.gy;
    const fromGx = BOARD.dragStartGx;
    const fromGy = BOARD.dragStartGy;

    let blocked = false;

    if (!isGroup && (isBlind || myRole !== 'mestre') && checkMoveBlocked(token, fromGx, fromGy, targetGx, targetGy))
      blocked = true;

    if (!blocked && isBlind && _checkTokenCollision(token, targetGx, targetGy))
      blocked = true;

    if (blocked) {
      token.gx = fromGx;
      token.gy = fromGy;
      if (isBlind) _revealBlindBlocker(token, targetGx, targetGy, fromGx, fromGy);
      else toast('🚫 Movimento bloqueado por uma parede!');
      boardRender();
      return;
    }

    // Montaria: se o par terminar a mais de 3 quadrados, desmonta automaticamente
    if (getParMontaria(token)) {
      const par = getParMontaria(token);
      if (distanciaMontaria(par.mount, par.rider) > 3) {
        par.rider.z = par.mount.z || 0;
        delete par.mount.mount;
        delete par.rider.mount;
        _sincronizarMontariaMestre([par.mount, par.rider]);
        toast('🐴 Montaria desfeita — tokens distantes demais.');
      }
    }

    if (myRole === 'mestre' || amIHost) {
      boardSave();
      syncBoardTokensToPlayers();
    } else {
      solicitarMoverToken(token.id, token.gx, token.gy);
    }
    setTimeout(() => verificarGatilhosToken(token), 50);
    setTimeout(atualizarFogJogador, 50);
    setTimeout(atualizarSeguirToken, 50);
  }
}

function onBoardMouseUp(e) {
  if (BOARD.pingTimer) {
    clearTimeout(BOARD.pingTimer);
    BOARD.pingTimer = null;
  }
  BOARD.wrap.classList.remove('panning');
  if (BOARD.panning) { BOARD.panning = false; return; }

  if (BOARD.mapDragging || BOARD.mapResizing) {
    BOARD.mapDragging = false;
    BOARD.mapResizing = false;
    if (myRole === 'mestre' || amIHost) {
      boardSave();
      syncBoardMapToPlayers();
    }
    boardRender();
    return;
  }

  if (BOARD.rulerActive) {
    BOARD.rulerActive = false;
    boardRender();
    return;
  }

  if (BOARD.shapeDrawing) {
    BOARD.shapeDrawing = false;
    if (BOARD.tool === 'shape-freehand') {
      const pts = BOARD.shapeFreehandPoints || [];
      if (pts.length > 2) {
        snapshotBoard();
        let minX = pts[0].x, maxX = pts[0].x;
        let minY = pts[0].y, maxY = pts[0].y;
        pts.forEach(p => {
          if (p.x < minX) minX = p.x;
          if (p.x > maxX) maxX = p.x;
          if (p.y < minY) minY = p.y;
          if (p.y > maxY) maxY = p.y;
        });
        BOARD.shapes.push({
          id: 'sh' + Date.now() + Math.floor(Math.random() * 9999),
          kind: 'freehand',
          x1: minX, y1: minY,
          x2: maxX, y2: maxY,
          points: pts,
          color: BOARD.shapeColor || '#c9903a',
          z: (BOARD.activeFloor || 0) * 10,
          soundId: null,
          hidden: false,
          conditionTrigger: null,
          triggerImageUrl: null,
          triggered: false
        });
        boardSave();
        syncShapesToPlayers();
        toast('✏ Desenho livre adicionado.');
      }
      BOARD.shapeFreehandPoints = null;
    } else {
      const x1 = Math.min(BOARD.shapeStartX, BOARD.shapeCurX);
      const y1 = Math.min(BOARD.shapeStartY, BOARD.shapeCurY);
      const x2 = Math.max(BOARD.shapeStartX, BOARD.shapeCurX);
      const y2 = Math.max(BOARD.shapeStartY, BOARD.shapeCurY);
      if ((x2 - x1) > 3 && (y2 - y1) > 3) {
        snapshotBoard();
        BOARD.shapes.push({
          id: 'sh' + Date.now() + Math.floor(Math.random() * 9999),
          kind: BOARD.tool === 'shape-circle' ? 'circle' : 'rect',
          x1, y1, x2, y2,
          color: BOARD.shapeColor || '#c9903a',
          z: (BOARD.activeFloor || 0) * 10,
          soundId: null,
          hidden: false,
          conditionTrigger: null,
          triggerImageUrl: null,
          triggered: false
        });
        boardSave();
        syncShapesToPlayers();
        toast(BOARD.tool === 'shape-circle' ? '⬤ Círculo adicionado.' : '▭ Retângulo adicionado.');
      }
    }
    boardRender();
    return;
  }

  if (BOARD.wallDraggingLine || BOARD.wallDraggingHandle) {
    BOARD.wallDraggingLine = false;
    BOARD.wallDraggingHandle = null;
    BOARD.wallDragStart = null;
    BOARD.wallDragMouseStart = null;
    if (myRole === 'mestre') {
      boardSave();
      syncWallsToPlayers();
      setTimeout(atualizarFogJogador, 50);
    }
    boardRender();
    return;
  }

  if (BOARD.wallDrawing) {
    BOARD.wallDrawing = false;
    const dx = BOARD.wallCurX - BOARD.wallStartX;
    const dy = BOARD.wallCurY - BOARD.wallStartY;
    const len = Math.sqrt(dx * dx + dy * dy);
    if (len > 5) {
      snapshotBoard();
      const wType = BOARD.wallType || 'normal';
      const newWallId = 'w' + Date.now() + Math.floor(Math.random() * 9999);
      BOARD.walls.push({
        id: newWallId,
        x1: BOARD.wallStartX, y1: BOARD.wallStartY,
        x2: BOARD.wallCurX, y2: BOARD.wallCurY,
        type: wType,
        open: false,
        z: (BOARD.activeFloor || 0) * 10,
        soundId: null
      });
      BOARD.selectedWallId = newWallId;
      boardSave();
      syncWallsToPlayers();
      setTimeout(atualizarFogJogador, 50);

      if (wType === 'normal') toast('🧱 Parede adicionada. Clique direito para editar.');
      else if (wType === 'invisible') toast('👻 Parede invisível adicionada. Clique direito para editar.');
      else if (wType === 'door') toast('🚪 Porta adicionada. Clique para abrir/fechar.');
      else if (wType === 'window') toast('🪟 Janela adicionada. Clique para abrir/fechar.');
    }
    boardRender();
    return;
  }

  if (BOARD.fogPainting) {
    if (BOARD.fogShape === 'rect' && BOARD.fogRectStart && BOARD.fogRectCur) {
      pintarFogRetangulo(
        BOARD.fogRectStart.gx,
        BOARD.fogRectStart.gy,
        BOARD.fogRectCur.gx,
        BOARD.fogRectCur.gy,
        BOARD.tool === 'reveal'
      );
    }
    BOARD.fogPainting = false;
    BOARD.lastFogCell = null;
    BOARD.fogRectStart = null;
    BOARD.fogRectCur = null;
    boardSave();
    syncFogToPlayers();
    boardRender();
    return;
  }

  if (BOARD.handleDrag) {
    BOARD.handleDrag = null;
    if (myRole === 'mestre' || amIHost) {
      boardSave();
      syncBoardTokensToPlayers();
    }
    boardRender();
    return;
  }

  if (BOARD.marquee) {
    finalizeMarqueeSelection(e.shiftKey);
    BOARD.marquee = null;
    hideSelectionBox();
    boardRender();
    atualizarVisaoJogadorPorSelecao();
    return;
  }

  finalizarArrastoToken();
  BOARD.dragging = null;
  BOARD.dragGroup = null;
}

function onBoardMouseLeave() {
  BOARD.wrap.classList.remove('panning');
  BOARD.panning = false;

  if (BOARD.mapDragging || BOARD.mapResizing) {
    BOARD.mapDragging = false;
    BOARD.mapResizing = false;
    if (myRole === 'mestre' || amIHost) {
      boardSave();
      syncBoardMapToPlayers();
    }
    boardRender();
  }
  if (BOARD.rulerActive) {
    BOARD.rulerActive = false;
    boardRender();
  }
  if (BOARD.shapeDrawing) {
    BOARD.shapeDrawing = false;
    BOARD.shapeFreehandPoints = null;
    boardRender();
    return;
  }
  if (BOARD.wallDrawing) { BOARD.wallDrawing = false; boardRender(); return; }
  if (BOARD.handleDrag) { BOARD.handleDrag = null; boardRender(); }
  if (BOARD.marquee) { BOARD.marquee = null; hideSelectionBox(); boardRender(); }
  finalizarArrastoToken();
  if (BOARD.fogPainting) {
    BOARD.fogPainting = false;
    BOARD.lastFogCell = null;
    BOARD.fogRectStart = null;
    BOARD.fogRectCur = null;
    boardRender();
  }
  BOARD.dragging = null;
  BOARD.dragGroup = null;
  hideTooltip();
}

function onBoardWheel(e) {
  e.preventDefault();
  if (BOARD.dragging) return; // Prevent zooming while dragging a token
  fecharContextMenu();
  const { x, y } = getBoardXY(e);
  const delta = e.deltaY > 0 ? -0.08 : 0.08;
  zoomBoardAt(x, y, delta);
}

function updateSelectionBox() {
  const m = BOARD.marquee;
  if (!m) return;
  const box = document.getElementById('selectionBox');
  if (!box) return;
  const left = Math.min(m.startX, m.curX);
  const top = Math.min(m.startY, m.curY);
  const w = Math.abs(m.curX - m.startX);
  const h = Math.abs(m.curY - m.startY);
  box.style.left = left + 'px';
  box.style.top = top + 'px';
  box.style.width = w + 'px';
  box.style.height = h + 'px';
  box.style.display = (w > 3 || h > 3) ? 'block' : 'none';
}

function hideSelectionBox() {
  const box = document.getElementById('selectionBox');
  if (box) box.style.display = 'none';
}

function finalizeMarqueeSelection(additive) {
  const m = BOARD.marquee;
  if (!m) return;
  const { offsetX, offsetY, zoom, gridSize, tokens } = BOARD;
  const activeLayer = (myRole === 'mestre') ? (BOARD.activeLayer || 'players') : 'players';

  const selL = Math.min(m.startX, m.curX);
  const selT = Math.min(m.startY, m.curY);
  const selR = Math.max(m.startX, m.curX);
  const selB = Math.max(m.startY, m.curY);

  if ((selR - selL) < 5 && (selB - selT) < 5) return;

  if (!additive) {
    BOARD.selectedTokens.clear();
    BOARD.mountPendingId = null;
  }

  tokens.forEach(t => {
    const layer = t.layer || 'players';
    if ((myRole !== 'mestre' || emVisaoJogador()) && layer === 'gm') return;
    if (myRole === 'mestre' && !emVisaoJogador() && layer !== activeLayer) return;
    if (myRole === 'jogador' && selecaoPropriaJogador && !temControleToken(t)) return;

    const sizeW = (t.sizeX || t.size || 1) * gridSize;
    const sizeH = (t.sizeY || t.size || 1) * gridSize;
    const pos3 = tokenWorldPos(t.gx, t.gy);
    const cx = pos3.x * zoom + offsetX;
    const cy = pos3.y * zoom + offsetY;
    const rX = sizeW * 0.42 * zoom;
    const rY = sizeH * 0.42 * zoom;

    const tokL = cx - rX;
    const tokR = cx + rX;
    const tokT = cy - rY;
    const tokB = cy + rY;

    if (tokR >= selL && tokL <= selR && tokB >= selT && tokT <= selB) {
      BOARD.selectedTokens.add(t.id);
    }
  });
}

function onBoardDblClick(e) {
  // Way-ruler: duplo clique finaliza o caminho
  if (BOARD.tool === 'way-ruler' && BOARD.wayRulerActive && BOARD.wayRulerPoints.length >= 1) {
    BOARD.wayRulerActive = false;
    boardRender();
    return;
  }

  // Mobile: duplo clique alterna entre Mover e Navegar
  if (document.body.dataset.mobile === '1') {
    const { x, y } = getBoardXY(e);
    const token = getTokenAt(x, y);
    const shape = myRole === 'mestre' ? shapeAt(x, y) : null;
    if (!token && !shape) {
      if (BOARD.tool === 'move') {
        setTool('pan');
        toast('✜ Navegar');
      } else if (BOARD.tool === 'pan') {
        setTool('move');
        toast('✥ Mover');
      }
      return;
    }
    // Mobile: duplo clique no token seleciona e abre ficha vinculada
    if (token) {
      if (myRole === 'jogador' && selecaoPropriaJogador && !temControleToken(token)) {
        return;
      }
      BOARD.selectedTokens.clear();
      BOARD.selectedTokens.add(token.id);
      atualizarVisaoJogadorPorSelecao();
      boardRender();
      if (token.bestiaryName && typeof AMEACAS_DB !== 'undefined') {
        mostrarDetalhesCriatura(token.bestiaryName);
        return;
      }
      if (token.masterFichaId && myRole === 'mestre') {
        abrirFichaMestre(token.masterFichaId);
        return;
      }
      if (token.controlledBy) {
        if (myRole === 'mestre' && fichasJogadores[token.controlledBy]) {
          abrirFichaJogador(token.controlledBy);
          return;
        } else if (temControleToken(token)) {
          toggleFichaPanel();
          return;
        }
      }
      return;
    }
  }

  const { x, y } = getBoardXY(e);
  const token = getTokenAt(x, y);
  if (!token) {
    // Se não tem token, verifica se clicou em uma forma (só mestre configura)
    if (myRole === 'mestre') {
      const shape = shapeAt(x, y);
      if (shape) {
        abrirModalConfigForma(shape);
        return;
      }
    }
    // Desktop: duplo clique fora de token alterna Mover → Navegar
    if (BOARD.tool === 'move') {
      setTool('pan');
      toast('✜ Navegar');
      return;
    }
    return;
  }
  if (token.type === 'object' && myRole !== 'mestre' && !emVisaoJogador()) return;

  // Se token veio do bestiário, abre a ficha da criatura
  if (token.bestiaryName && typeof AMEACAS_DB !== 'undefined') {
    mostrarDetalhesCriatura(token.bestiaryName);
    return;
  }

  // Se token tem ficha do mestre vinculada, abre (somente mestre)
  if (token.masterFichaId && myRole === 'mestre') {
    abrirFichaMestre(token.masterFichaId);
    return;
  }

  // Se token tem ficha de jogador vinculada, abre
  if (token.controlledBy) {
    if (myRole === 'mestre') {
      if (fichasJogadores[token.controlledBy]) {
        abrirFichaJogador(token.controlledBy);
      }
    } else if (temControleToken(token)) {
      toggleFichaPanel();
    }
  }
}

function onBoardContextMenu(e) {
  e.preventDefault();

  // Way-ruler: right-click finaliza o caminho
  if (BOARD.tool === 'way-ruler' && BOARD.wayRulerActive && BOARD.wayRulerPoints.length >= 1) {
    BOARD.wayRulerActive = false;
    boardRender();
    return;
  }

  const { x, y } = getBoardXY(e);
  const wx = (x - BOARD.offsetX) / BOARD.zoom;
  const wy = (y - BOARD.offsetY) / BOARD.zoom;

  const isMestre = (myRole === 'mestre');

  // Formas desenhadas: só o mestre vê o menu; jogador ignora
  if (isMestre) {
    const nearbyShape = shapeAt(wx, wy);
    if (nearbyShape) {
      abrirShapeContextMenu(e, nearbyShape);
      return;
    }
  }

  fecharFormToken();

  // Paredes são só para o mestre
  if (isMestre) {
    if (BOARD.tool === 'wall') {
      const nearbyWall = wallAt(wx, wy, 10 / BOARD.zoom);
      if (nearbyWall) {
        BOARD.selectedWallId = nearbyWall.id;
        boardRender();
        const menu = document.getElementById('wallContextMenu');
        if (menu) {
          menu.style.left = Math.min(e.clientX + 5, window.innerWidth - 200) + 'px';
          menu.style.top = Math.min(e.clientY + 5, window.innerHeight - 180) + 'px';
          menu.style.display = 'block';
        }
        return;
      }
    }
  }

  const token = getTokenAt(x, y);
  if (token) {
    // Jogadores não interagem com objetos (cai no else p/ localizar próprio token)
    if (token.type === 'object' && !isMestre) {
      const meuToken = BOARD.tokens.find(t => temControleToken(t));
      if (meuToken) centralizarEmToken(meuToken);
      return;
    }

    contextTokenId = token.id;
    centralizarEmToken(token);
    const isObject = token.type === 'object';
    document.getElementById('ctxCondMenu').style.display = isObject ? 'none' : '';
    if (!isObject) {
      popularCtxCondicoes(token);
    }
    // Atualizar texto do botão de alvo
    const targetText = document.getElementById('ctxTargetText');
    const isTargeted = BOARD.targetedTokens && BOARD.targetedTokens.has(token.id);
    if (targetText) targetText.textContent = isTargeted ? 'Desmarcar Alvo' : 'Marcar Alvo';
    document.getElementById('ctxTargetToggle').style.display = '';
    const menu = document.getElementById('tokenContextMenu');
    if (menu) {
      document.getElementById('ctxEditToken').style.display = !isObject ? '' : 'none';
      document.getElementById('ctxEditObject').style.display = (isMestre && isObject) ? '' : 'none';
      document.getElementById('ctxVincularFicha').style.display = (isMestre && !isObject) ? '' : 'none';
      if (isMestre && !isObject) popularCtxVincularFicha(token);
      document.getElementById('ctxCfgCamada').style.display = isMestre ? '' : 'none';
      const camadaAtual = token.layer || 'map';
      document.getElementById('ctxLayerMap').querySelector('i').style.visibility = camadaAtual === 'map' ? 'visible' : 'hidden';
      document.getElementById('ctxLayerPlayers').querySelector('i').style.visibility = camadaAtual === 'players' ? 'visible' : 'hidden';
      document.getElementById('ctxLayerGm').querySelector('i').style.visibility = camadaAtual === 'gm' ? 'visible' : 'hidden';
      document.getElementById('ctxAlturaMenu').style.display = isMestre ? '' : 'none';
      document.getElementById('ctxCfgApagar').style.display = isMestre ? '' : 'none';
      if (isMestre) {
        const lockIcon = document.querySelector('#ctxToggleLock i');
        const lockText = document.getElementById('ctxToggleLockText');
        if (lockIcon) lockIcon.className = token.locked ? 'bi bi-unlock' : 'bi bi-lock';
        if (lockText) lockText.textContent = token.locked ? 'Destravar' : 'Travar';
        document.getElementById('ctxToggleLock').style.display = '';
      } else {
        document.getElementById('ctxToggleLock').style.display = 'none';
      }
      document.getElementById('ctxAlignGrid').style.display = isMestre ? '' : 'none';

      const ctxMontaria = document.getElementById('ctxMontaria');
      if (ctxMontaria) {
        ctxMontaria.style.display = (isMestre || temControleToken(token)) && !isObject ? '' : 'none';
        const txt = document.getElementById('ctxMontariaText');
        if (txt) txt.textContent = token.mount ? 'Desmontar' : 'Montar';
      }

      const gs = BOARD.gridSize;
      const sz = (token.size || 1) * gs;
      const { cx, cy } = gridToCanvas(token.gx, token.gy);
      const tokScreenX = cx + (sz * BOARD.zoom) / 2;
      const tokScreenY = cy + (sz * BOARD.zoom) / 2;
      const wrapRect = BOARD.wrap.getBoundingClientRect();
      let menuX = wrapRect.left + tokScreenX + 10;
      let menuY = wrapRect.top + tokScreenY - 20;
      menuX = Math.min(menuX, window.innerWidth - 260);
      menuY = Math.min(menuY, window.innerHeight - 180);
      menuX = Math.max(menuX, 5);
      menuY = Math.max(menuY, 5);
      menu.style.left = menuX + 'px';
      menu.style.top = menuY + 'px';
      menu.style.display = 'block';
    }
  } else if (isMestre) {
    const menu = document.getElementById('boardContextMenu');
    if (menu) {
      BOARD.ctxMenuBoardX = x;
      BOARD.ctxMenuBoardY = y;
      menu.style.left = Math.min(e.clientX + 5, window.innerWidth - 200) + 'px';
      menu.style.top = Math.min(e.clientY + 5, window.innerHeight - 100) + 'px';
      menu.style.display = 'block';
    }
  } else {
    const meuToken = BOARD.tokens.find(t => temControleToken(t));
    if (meuToken) {
      centralizarEmToken(meuToken);
    }
  }
}

function centralizarMapa() {
  const wrap = BOARD.wrap;
  const ccx = wrap.clientWidth / 2;
  const ccy = wrap.clientHeight / 2;
  const cx = BOARD.ctxMenuBoardX ?? ccx;
  const cy = BOARD.ctxMenuBoardY ?? ccy;
  BOARD.offsetX = ccx - cx + BOARD.offsetX;
  BOARD.offsetY = ccy - cy + BOARD.offsetY;
  boardSave(); boardRender();
  fecharContextMenu();
}

function centralizarEmToken(token) {
  if (!token) return;
  const wrap = BOARD.wrap;
  const gs = BOARD.gridSize;
  const pos = tokenWorldPos(token.gx, token.gy);
  const tx = pos.x;
  const ty = pos.y;
  BOARD.offsetX = wrap.clientWidth / 2 - tx * BOARD.zoom;
  BOARD.offsetY = wrap.clientHeight / 2 - ty * BOARD.zoom;
  BOARD.activeFloor = getFloorFromZ(token.z);
  boardRender();
}

function toggleSeguirToken(tokenId) {
  if (BOARD.followTokenId === tokenId) {
    BOARD.followTokenId = null;
    return false;
  }
  BOARD.followTokenId = tokenId;
  const token = BOARD.tokens.find(t => t.id === tokenId);
  if (token) centralizarEmToken(token);
  return true;
}

function atualizarSeguirToken() {
  if (!BOARD.followTokenId) return;
  const token = BOARD.tokens.find(t => t.id === BOARD.followTokenId);
  if (!token) { BOARD.followTokenId = null; return; }
  centralizarEmToken(token);
}

function abrirShapeContextMenu(e, shape) {
  contextShapeId = shape.id;
  const menu = document.getElementById('shapeContextMenu');
  if (menu) {
    const isMaster = (myRole === 'mestre');
    const gmItems = menu.querySelectorAll('.gm-only-item');
    gmItems.forEach(el => {
      el.style.display = isMaster ? '' : 'none';
    });

    menu.style.left = Math.min(e.clientX + 5, window.innerWidth - 220) + 'px';
    menu.style.top = Math.min(e.clientY + 5, window.innerHeight - 200) + 'px';
    menu.style.display = 'block';
  }
}

function contextShapeConfig() {
  if (!contextShapeId) return;
  const shape = BOARD.shapes.find(s => s.id === contextShapeId);
  if (shape) abrirModalConfigForma(shape);
}

/* ── Mobile ── */
function toggleMobileMenu() {
  const overlay = document.getElementById('mobileMenuOverlay');
  if (!overlay) return;
  const open = overlay.style.display !== 'flex';
  overlay.style.display = open ? 'flex' : 'none';
  overlay.style.alignItems = 'flex-end';
}
function fecharMobileMenu() {
  const overlay = document.getElementById('mobileMenuOverlay');
  if (overlay) overlay.style.display = 'none';
}
function abrirDiarioMobile() {
  // Abre o master panel (se colapsado) e alterna para a aba Encontros
  const master = document.getElementById('master-panel');
  if (master && master.classList.contains('collapsed')) {
    toggleMasterPanel();
  }
  switchTab('encontros');
}

function toggleChatMobile() {
  toggleChatPanel();
  fecharMobileMenu();
}

function fecharContextMenu() {
  document.querySelectorAll('.context-menu').forEach(m => m.style.display = 'none');
  _esconderCtxCondTooltip();
  contextTokenId = null;
  contextShapeId = null;
}

function abrirConfigGrid() {
  fecharContextMenu();
  document.getElementById('gcGridCols').value = BOARD.gridCols || 30;
  document.getElementById('gcGridRows').value = BOARD.gridRows || 30;
  document.getElementById('gcScaleVal').value = BOARD.gridScaleVal ?? 1.5;
  document.getElementById('gcScaleUnit').value = BOARD.gridScaleUnit || 'm';
  document.getElementById('gcGridType').value = BOARD.gridType || 'square';
  document.getElementById('gcDistanceMode').value = BOARD.distanceMode || 'square';
  document.getElementById('gcLightingType').value = BOARD.lightingType || 'sunny';
  document.getElementById('gridConfigModal').style.display = 'flex';
}

function fecharConfigGrid() {
  document.getElementById('gridConfigModal').style.display = 'none';
}

function salvarConfigGrid() {
  snapshotBoard();
  BOARD.gridCols = parseInt(document.getElementById('gcGridCols').value) || 30;
  BOARD.gridRows = parseInt(document.getElementById('gcGridRows').value) || 30;
  BOARD.gridScaleVal = parseFloat(document.getElementById('gcScaleVal').value) || 1.5;
  BOARD.gridScaleUnit = document.getElementById('gcScaleUnit').value.trim() || 'm';
  BOARD.gridType = document.getElementById('gcGridType').value || 'square';
  BOARD.distanceMode = document.getElementById('gcDistanceMode').value || 'square';
  BOARD.lightingType = document.getElementById('gcLightingType').value || 'sunny';
  boardSave(); boardRender();
  if (myRole === 'mestre' && PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) syncBoardToPlayers();
  fecharConfigGrid();
  toast('Grid e mapa configurados!');
}

// ── Partículas de Clima ──
var _weatherParticles = [];
var _weatherAnimId = null;
var _weatherLastTime = 0;
var _weatherActive = '';
// Cache de células já verificadas para evitar recalcular por partícula
var _outdoorCache = null;
var _outdoorCacheWalls = null;
var _outdoorCacheGridSize = 0;
var _outdoorCacheCount = -1;

function _isOutdoor(wx, wy, walls) {
  if (!walls || !walls.length) return true;

  // Arredonda para célula do grid para cache
  var gs = BOARD.gridSize || 50;
  var cellX = Math.floor(wx / gs);
  var cellY = Math.floor(wy / gs);

  // Invalida cache se paredes mudaram, foram trocadas ou contagem mudou
  var wallsSig = walls.length;
  if (_outdoorCacheWalls !== walls || _outdoorCacheGridSize !== gs || _outdoorCacheCount !== wallsSig) {
    _outdoorCache = {};
    _outdoorCacheWalls = walls;
    _outdoorCacheGridSize = gs;
    _outdoorCacheCount = wallsSig;
  }

  var key = cellX + ',' + cellY;
  if (key in _outdoorCache) return _outdoorCache[key];

  // Ponto central da célula para o teste
  var cx = (cellX + 0.5) * gs;
  var cy = (cellY + 0.5) * gs;

  // Dispara 3 raios em direções diferentes — usa votação majoritária para robustez
  var dirs = [
    [cx, cy, cx, cy - 99999],   // para cima
    [cx, cy, cx - 99999, cy],   // para esquerda
    [cx, cy, cx + 99999, cy + 33333] // diagonal
  ];
  var votes = 0;
  for (var d = 0; d < dirs.length; d++) {
    var ax = dirs[d][0], ay = dirs[d][1], bx = dirs[d][2], by = dirs[d][3];
    var crossings = 0;
    for (var i = 0; i < walls.length; i++) {
      var w = walls[i];
      if (_raySegIntersect(ax, ay, bx, by, w.x1, w.y1, w.x2, w.y2)) crossings++;
    }
    if (crossings % 2 === 0) votes++; // par = exterior
  }
  // Maioria: 2 ou 3 votos = exterior; 0 ou 1 = interior
  var outdoor = votes >= 2;
  _outdoorCache[key] = outdoor;
  return outdoor;
}

// Ray casting mais preciso — raio semi-infinito de A→B contra segmento C→D
function _raySegIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  var rdx = bx - ax, rdy = by - ay;
  var sdx = dx - cx, sdy = dy - cy;
  var denom = rdx * sdy - rdy * sdx;
  if (Math.abs(denom) < 1e-9) return false;
  var t = ((cx - ax) * sdy - (cy - ay) * sdx) / denom;
  var u = ((cx - ax) * rdy - (cy - ay) * rdx) / denom;
  return t > 1e-9 && u > 1e-9 && u < 1 - 1e-9;
}

// Limpa cache quando paredes mudam
function _invalidateOutdoorCache() { _outdoorCache = null; _outdoorCacheWalls = null; }

function _initWeatherParticles(type) {
  _weatherParticles = [];
  var count = type === 'rainy' ? 150 : 100;
  var canvas = BOARD.canvas;
  var W = canvas ? canvas.width : (window.innerWidth || 800);
  var H = canvas ? canvas.height : (window.innerHeight || 600);
  for (var i = 0; i < count; i++) {
    _weatherParticles.push({
      x: Math.random() * W,
      y: Math.random() * H,
      speed: type === 'rainy' ? (4 + Math.random() * 4) : (1 + Math.random() * 2),
      size: type === 'rainy' ? (1 + Math.random() * 1.5) : (2 + Math.random() * 3),
      opacity: type === 'rainy' ? (0.3 + Math.random() * 0.4) : (0.5 + Math.random() * 0.4),
      sway: type === 'snowy' ? (Math.random() * 2) : 0,
      phase: Math.random() * Math.PI * 2
    });
  }
}

function _weatherTick(time) {
  if (!_weatherActive) return;
  if (!_lastWeatherTime) _lastWeatherTime = time;
  var dt = Math.min((time - _lastWeatherTime) / 16.67, 3);
  _lastWeatherTime = time;
  var W = BOARD.canvas ? BOARD.canvas.width : window.innerWidth;
  var H = BOARD.canvas ? BOARD.canvas.height : window.innerHeight;
  var type = _weatherActive;
  for (var i = 0; i < _weatherParticles.length; i++) {
    var p = _weatherParticles[i];
    p.y += p.speed * dt;
    if (type === 'snowy') p.x += Math.sin(p.phase + time * 0.001) * p.sway * 0.3 * dt;
    if (p.y > H + 10) { p.y = -10; p.x = Math.random() * W; }
    if (p.x > W + 10) p.x = -10;
    if (p.x < -10) p.x = W + 10;
  }
  if (typeof boardRender === 'function') boardRender();
  _weatherAnimId = requestAnimationFrame(_weatherTick);
}

function _renderWeather(ctx) {
  if (!_weatherActive || !_weatherParticles.length) return;
  var type = _weatherActive;
  var offsetX = BOARD.offsetX || 0;
  var offsetY = BOARD.offsetY || 0;
  var zoom = BOARD.zoom || 1;
  var walls = BOARD.walls || [];
  ctx.save();
  for (var i = 0; i < _weatherParticles.length; i++) {
    var p = _weatherParticles[i];
    var wx = (p.x - offsetX) / zoom;
    var wy = (p.y - offsetY) / zoom;
    if (!_isOutdoor(wx, wy, walls)) continue;
    if (type === 'rainy') {
      ctx.beginPath();
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x + 4, p.y + 8);
      ctx.strokeStyle = 'rgba(150,180,220,' + p.opacity + ')';
      ctx.lineWidth = p.size;
      ctx.stroke();
    } else if (type === 'snowy') {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,' + p.opacity + ')';
      ctx.fill();
    }
  }
  ctx.restore();
}

function setWeather(type) {
  if (myRole !== 'mestre' && !amIHost) return;
  snapshotBoard();
  if (_weatherAnimId) { cancelAnimationFrame(_weatherAnimId); _weatherAnimId = null; }
  _weatherActive = '';
  _weatherParticles = [];

  if (type === 'sun') {
    BOARD.lightingType = 'sunny';
    toast('☀️ Claro (Sol).');
  } else if (type === 'rain') {
    BOARD.lightingType = 'rainy';
    _weatherActive = 'rainy';
    _initWeatherParticles('rainy');
    _lastWeatherTime = 0;
    _weatherAnimId = requestAnimationFrame(_weatherTick);
    toast('🌧 Chuva.');
  } else if (type === 'snow') {
    BOARD.lightingType = 'snowy';
    _weatherActive = 'snowy';
    _initWeatherParticles('snowy');
    _lastWeatherTime = 0;
    _weatherAnimId = requestAnimationFrame(_weatherTick);
    toast('❄️ Neve.');
  } else if (type === 'night') {
    BOARD.lightingType = 'starnight';
    toast('🌙 Noite (estrelada).');
  }

  // Sincroniza o select com o valor atual
  const sel = document.getElementById('weatherSelect');
  if (sel) sel.value = type;

  boardSave();
  boardRender();
  if (myRole === 'mestre' && PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) syncBoardToPlayers();
}

function _syncWeatherSelect() {
  const sel = document.getElementById('weatherSelect');
  if (!sel) return;
  const lt = BOARD.lightingType || 'sunny';
  if (lt === 'sunny') sel.value = 'sun';
  else if (lt === 'rainy') sel.value = 'rain';
  else if (lt === 'snowy') sel.value = 'snow';
  else if (lt === 'starnight') sel.value = 'night';
  else sel.value = 'sun';
}

function _applyWeatherParticles() {
  var lt = BOARD.lightingType;
  if (lt === 'rainy' || lt === 'snowy') {
    var wtype = lt === 'rainy' ? 'rainy' : 'snowy';
    if (_weatherAnimId) { cancelAnimationFrame(_weatherAnimId); _weatherAnimId = null; }
    _weatherActive = wtype;
    setTimeout(function() {
      if (typeof _initWeatherParticles === 'function') _initWeatherParticles(wtype);
      _lastWeatherTime = 0;
      if (typeof _weatherTick === 'function') _weatherAnimId = requestAnimationFrame(_weatherTick);
    }, 300);
  } else {
    if (_weatherAnimId) { cancelAnimationFrame(_weatherAnimId); _weatherAnimId = null; }
    _weatherActive = '';
  }
}

// ──── Animação de Condições ────
let _condAnimState = {};
let _condAnimId = null;
let _condAnimLastTime = 0;

function _initCondDrips(tokenId) {
  if (!_condAnimState[tokenId]) _condAnimState[tokenId] = {};
  const st = _condAnimState[tokenId];
  if (!st.drips) {
    st.drips = [];
    for (let i = 0; i < 3; i++) {
      st.drips.push({
        x: (Math.random() - 0.5) * 12,
        y: -Math.random() * 20,
        speed: 1.5 + Math.random() * 2,
        size: 2 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2
      });
    }
  }
}

function _initCondNausea(tokenId) {
  if (!_condAnimState[tokenId]) _condAnimState[tokenId] = {};
  const st = _condAnimState[tokenId];
  if (!st.nausea) {
    st.nausea = [];
    for (let i = 0; i < 4; i++) {
      st.nausea.push({
        x: (Math.random() - 0.5) * 16,
        y: -Math.random() * 20,
        speed: 0.8 + Math.random() * 1.2,
        size: 1.5 + Math.random() * 1.5,
        wobble: Math.random() * Math.PI * 2
      });
    }
  }
}

function _initCondZzz(tokenId) {
  if (!_condAnimState[tokenId]) _condAnimState[tokenId] = {};
  const st = _condAnimState[tokenId];
  if (!st.zzz) {
    st.zzz = [];
    const labels = ['Z', 'Z', 'z'];
    for (let i = 0; i < 3; i++) {
      st.zzz.push({
        x: (Math.random() - 0.3) * 14,
        y: -(i * 14) - Math.random() * 6,
        speed: 0.4 + Math.random() * 0.3,
        alpha: 0.5 + Math.random() * 0.5,
        label: labels[i],
        size: 6 + i * 2
      });
    }
  }
}

function _initCondFire(tokenId) {
  if (!_condAnimState[tokenId]) _condAnimState[tokenId] = {};
  const st = _condAnimState[tokenId];
  if (!st.fire) {
    st.fire = [];
    for (let i = 0; i < 6; i++) {
      st.fire.push({
        x: (Math.random() - 0.5) * 18,
        y: Math.random() * 20,
        speed: 0.6 + Math.random() * 1.2,
        size: 2 + Math.random() * 3,
        phase: Math.random() * Math.PI * 2,
        flicker: Math.random() * Math.PI * 2
      });
    }
  }
}

function _initCondHearts(tokenId) {
  if (!_condAnimState[tokenId]) _condAnimState[tokenId] = {};
  const st = _condAnimState[tokenId];
  if (!st.hearts) {
    st.hearts = [];
    for (let i = 0; i < 5; i++) {
      st.hearts.push({
        x: (Math.random() - 0.5) * 20,
        y: Math.random() * 24,
        speed: 0.3 + Math.random() * 0.6,
        size: 3 + Math.random() * 3,
        wobble: Math.random() * Math.PI * 2,
        phase: Math.random() * Math.PI * 2,
        alpha: 0.6 + Math.random() * 0.4
      });
    }
  }
}

function _tickCondAnims(time) {
  if (!_condAnimLastTime) _condAnimLastTime = time;
  const dt = Math.min((time - _condAnimLastTime) / 16.67, 5);
  _condAnimLastTime = time;

  let hasAnimatedConds = false;
  const tokens = BOARD.tokens || [];
  for (let i = 0; i < tokens.length; i++) {
    const t = tokens[i];
    if (!t.conditions || !t.conditions.length) continue;
    const conds = t.conditions;
    const needsAnim = [
      'Sangrando','Atordoado','Confuso','Inconsciente',
      'Paralisado','Enjoado','Fascinado','Enredado','Desprevenido',
      'Em Chamas','Envenenado','Enfeitiçado'
    ].some(c => conds.indexOf(c) !== -1);
    if (!needsAnim) continue;
    hasAnimatedConds = true;

    // ── Sangrando: gotas de sangue caindo
    if (conds.indexOf('Sangrando') !== -1) {
      _initCondDrips(t.id);
      const st = _condAnimState[t.id];
      if (st.drips) {
        for (let j = 0; j < st.drips.length; j++) {
          const d = st.drips[j];
          d.y += d.speed * dt;
          if (d.y > 32) {
            d.y = -5 - Math.random() * 15;
            d.x = (Math.random() - 0.5) * 12;
            d.speed = 1.5 + Math.random() * 2;
          }
        }
      }
    }

    // ── Enjoado: gotas verdes caindo
    if (conds.indexOf('Enjoado') !== -1) {
      _initCondNausea(t.id);
      const st = _condAnimState[t.id];
      if (st.nausea) {
        for (let j = 0; j < st.nausea.length; j++) {
          const d = st.nausea[j];
          d.y += d.speed * dt;
          d.wobble += 0.05 * dt;
          if (d.y > 28) {
            d.y = -5 - Math.random() * 12;
            d.x = (Math.random() - 0.5) * 16;
            d.speed = 0.8 + Math.random() * 1.2;
          }
        }
      }
    }

    // ── Inconsciente: ZZZ's flutuando
    if (conds.indexOf('Inconsciente') !== -1) {
      _initCondZzz(t.id);
      const st = _condAnimState[t.id];
      if (st.zzz) {
        for (let j = 0; j < st.zzz.length; j++) {
          const z = st.zzz[j];
          z.y -= z.speed * dt;
          z.alpha -= 0.003 * dt;
          if (z.alpha <= 0 || z.y < -50) {
            z.y = -5 - Math.random() * 5;
            z.x = (Math.random() - 0.3) * 14;
            z.alpha = 0.7 + Math.random() * 0.3;
          }
        }
      }
    }

    // ── Em Chamas: chamas subindo
    if (conds.indexOf('Em Chamas') !== -1) {
      _initCondFire(t.id);
      const st = _condAnimState[t.id];
      if (st.fire) {
        for (let j = 0; j < st.fire.length; j++) {
          const f = st.fire[j];
          f.y -= f.speed * dt;
          f.x += Math.sin(f.phase + Date.now() * 0.005) * 0.15 * dt;
          if (f.y < -25) {
            f.y = 18 + Math.random() * 10;
            f.x = (Math.random() - 0.5) * 18;
            f.speed = 0.6 + Math.random() * 1.2;
            f.size = 2 + Math.random() * 3;
          }
        }
      }
    }

    // ── Enfeitiçado: corações flutuando
    if (conds.indexOf('Enfeitiçado') !== -1) {
      _initCondHearts(t.id);
      const st = _condAnimState[t.id];
      if (st.hearts) {
        for (let j = 0; j < st.hearts.length; j++) {
          const h = st.hearts[j];
          h.y -= h.speed * dt;
          h.x += Math.sin(h.wobble + Date.now() * 0.003) * 0.2 * dt;
          if (h.y < -30) {
            h.y = 20 + Math.random() * 15;
            h.x = (Math.random() - 0.5) * 20;
            h.speed = 0.3 + Math.random() * 0.6;
          }
        }
      }
    }
  }

  if (hasAnimatedConds) {
    boardRender();
    _condAnimId = requestAnimationFrame(_tickCondAnims);
  } else {
    _condAnimState = {};
    _condAnimId = null;
  }
}

function _startCondAnims() {
  if (_condAnimId) return;
  _condAnimLastTime = 0;
  _condAnimId = requestAnimationFrame(_tickCondAnims);
}

function _stopCondAnims() {
  if (_condAnimId) {
    cancelAnimationFrame(_condAnimId);
    _condAnimId = null;
  }
  _condAnimState = {};
}

function _renderCondEffects(ctx, t) {
  if (!t.conditions || !t.conditions.length) return;
  const gs = BOARD.gridSize;
  const sz = (t.size || 1) * gs;
  const rX = sz / 2;
  const rY = sz / 2;
  const pos4 = tokenWorldPos(t.gx, t.gy);
  const px = pos4.x;
  const py = pos4.y;
  const zoom = BOARD.zoom;
  const now = Date.now();

  // ── Petrificado → overlay cinza granito
  if (t.conditions.indexOf('Petrificado') !== -1) {
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(px, py, rX * 0.92, rY * 0.92, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(120,120,120,0.45)';
    ctx.fill();
    ctx.strokeStyle = 'rgba(160,160,160,0.5)';
    ctx.lineWidth = 2 / zoom;
    ctx.stroke();
    ctx.restore();
  }

  // ── Paralisado → cristais de gelo + brilho azul frio
  if (t.conditions.indexOf('Paralisado') !== -1) {
    const icePulse = 0.5 + Math.sin(now * 0.003) * 0.2;
    ctx.save();
    // overlay azul gelado
    ctx.beginPath();
    ctx.ellipse(px, py, rX * 0.88, rY * 0.88, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(100,200,255,' + icePulse * 0.18 + ')';
    ctx.fill();
    // anel brilhante
    ctx.beginPath();
    ctx.ellipse(px, py, rX * 0.92, rY * 0.92, 0, 0, Math.PI * 2);
    ctx.shadowColor = 'rgba(100,200,255,0.8)';
    ctx.shadowBlur = 18 / zoom;
    ctx.strokeStyle = 'rgba(140,220,255,' + icePulse * 0.75 + ')';
    ctx.lineWidth = 2.5 / zoom;
    ctx.stroke();
    // cristais hexagonais
    const crystalAngles = [0, Math.PI/3, 2*Math.PI/3, Math.PI, 4*Math.PI/3, 5*Math.PI/3];
    const cr = rX * 0.95;
    ctx.fillStyle = 'rgba(180,240,255,0.75)';
    ctx.shadowBlur = 6 / zoom;
    for (let a = 0; a < crystalAngles.length; a++) {
      const ang = crystalAngles[a] + now * 0.0005;
      const cx2 = px + Math.cos(ang) * cr;
      const cy2 = py + Math.sin(ang) * cr;
      ctx.save();
      ctx.translate(cx2, cy2);
      ctx.rotate(ang + Math.PI / 6);
      ctx.beginPath();
      for (let s = 0; s < 6; s++) {
        const sa = (s / 6) * Math.PI * 2;
        const sr = 2.5 / zoom;
        s === 0 ? ctx.moveTo(Math.cos(sa)*sr, Math.sin(sa)*sr)
                : ctx.lineTo(Math.cos(sa)*sr, Math.sin(sa)*sr);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    }
    ctx.restore();
  }

  // ── Sangrando → gotas de sangue caindo
  if (t.conditions.indexOf('Sangrando') !== -1) {
    _startCondAnims();
    const st = _condAnimState[t.id];
    if (st && st.drips) {
      ctx.save();
      for (let i = 0; i < st.drips.length; i++) {
        const d = st.drips[i];
        const dx = px + d.x;
        const dy = py + rY + d.y;
        ctx.beginPath();
        ctx.arc(dx, dy, d.size / zoom, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(180,30,30,0.85)';
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(dx, dy);
        ctx.lineTo(dx, dy + d.size * 1.5 / zoom);
        ctx.strokeStyle = 'rgba(180,30,30,0.5)';
        ctx.lineWidth = d.size * 0.6 / zoom;
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  // ── Enjoado → gotículas verdes caindo
  if (t.conditions.indexOf('Enjoado') !== -1) {
    _startCondAnims();
    const st = _condAnimState[t.id];
    if (st && st.nausea) {
      ctx.save();
      for (let i = 0; i < st.nausea.length; i++) {
        const d = st.nausea[i];
        const dx = px + d.x + Math.sin(d.wobble) * 3;
        const dy = py + rY * 0.5 + d.y;
        ctx.beginPath();
        ctx.arc(dx, dy, d.size / zoom, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(100,210,80,0.8)';
        ctx.fill();
      }
      ctx.restore();
    }
  }

  // ── Em Chamas → brilho laranja pulsante + chamas
  if (t.conditions.indexOf('Em Chamas') !== -1) {
    const pulse = 0.6 + Math.sin(now * 0.005) * 0.2;
    ctx.save();

    // Chamas animadas
    _startCondAnims();
    const st = _condAnimState[t.id];
    if (st && st.fire) {
      for (let i = 0; i < st.fire.length; i++) {
        const f = st.fire[i];
        const fx = px + f.x;
        const fy = py + rY * 0.2 + f.y;
        const fs = f.size / zoom;
        const alpha = 0.5 + Math.sin(Date.now() * 0.008 + f.flicker) * 0.3;
        // Núcleo branco
        ctx.beginPath();
        ctx.arc(fx, fy, fs * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,200,' + alpha * 0.6 + ')';
        ctx.fill();
        // Meio amarelo
        ctx.beginPath();
        ctx.arc(fx, fy, fs * 0.7, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,200,50,' + alpha * 0.7 + ')';
        ctx.fill();
        // Fora laranja
        ctx.beginPath();
        ctx.arc(fx, fy, fs, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,100,0,' + alpha * 0.4 + ')';
        ctx.fill();
      }
    }

    ctx.beginPath();
    ctx.ellipse(px, py, rX * 0.8, rY * 0.8, 0, 0, Math.PI * 2);
    ctx.shadowColor = 'rgba(255,120,0,0.65)';
    ctx.shadowBlur = 22 / zoom;
    ctx.fillStyle = 'rgba(255,120,0,' + pulse * 0.15 + ')';
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,180,50,' + pulse * 0.55 + ')';
    ctx.lineWidth = 2.5 / zoom;
    ctx.stroke();
    ctx.restore();
  }

  // ── Envenenado → tom arroxeado + brilho verde pulsante
  if (t.conditions.indexOf('Envenenado') !== -1) {
    const pulse = 0.5 + Math.sin(now * 0.004) * 0.15;
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(px, py, rX * 0.85, rY * 0.85, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(120,0,180,' + pulse * 0.2 + ')';
    ctx.fill();
    ctx.shadowColor = 'rgba(0,200,80,0.55)';
    ctx.shadowBlur = 16 / zoom;
    ctx.strokeStyle = 'rgba(0,200,80,' + pulse * 0.65 + ')';
    ctx.lineWidth = 2.5 / zoom;
    ctx.stroke();
    ctx.restore();
  }

  // ── Atordoado → estrelinhas orbitando
  if (t.conditions.indexOf('Atordoado') !== -1) {
    _startCondAnims();
    const orbit = rX * 1.05;
    const starCount = 5;
    const angleOffset = (now * 0.002) % (Math.PI * 2);
    ctx.save();
    for (let s = 0; s < starCount; s++) {
      const ang = angleOffset + (s / starCount) * Math.PI * 2;
      const sx = px + Math.cos(ang) * orbit;
      const sy = py - rY * 0.3 + Math.sin(ang) * orbit * 0.4;
      const starR = 3 / zoom;
      ctx.beginPath();
      for (let p = 0; p < 5; p++) {
        const pa = (p * 4 / 5) * Math.PI - Math.PI / 2;
        const r = (p % 2 === 0) ? starR : starR * 0.45;
        p === 0 ? ctx.moveTo(sx + Math.cos(pa)*r, sy + Math.sin(pa)*r)
                : ctx.lineTo(sx + Math.cos(pa)*r, sy + Math.sin(pa)*r);
      }
      ctx.closePath();
      ctx.fillStyle = 'rgba(255,235,80,0.9)';
      ctx.shadowColor = 'rgba(255,230,0,0.8)';
      ctx.shadowBlur = 8 / zoom;
      ctx.fill();
    }
    ctx.restore();
  }

  // ── Fascinado → estrelas douradas orbitando (mais suaves, maiores)
  if (t.conditions.indexOf('Fascinado') !== -1) {
    _startCondAnims();
    const orbit = rX * 1.1;
    const starCount = 6;
    const angleOffset = (now * 0.0015) % (Math.PI * 2);
    ctx.save();
    for (let s = 0; s < starCount; s++) {
      const ang = angleOffset + (s / starCount) * Math.PI * 2;
      const sx = px + Math.cos(ang) * orbit;
      const sy = py + Math.sin(ang) * orbit * 0.35;
      const sparkle = 0.6 + Math.sin(now * 0.006 + s) * 0.4;
      const starR = (3.5 + sparkle) / zoom;
      ctx.beginPath();
      for (let p = 0; p < 10; p++) {
        const pa = (p / 10) * Math.PI * 2 - Math.PI / 2;
        const r = (p % 2 === 0) ? starR : starR * 0.4;
        p === 0 ? ctx.moveTo(sx + Math.cos(pa)*r, sy + Math.sin(pa)*r)
                : ctx.lineTo(sx + Math.cos(pa)*r, sy + Math.sin(pa)*r);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(255,215,0,${sparkle * 0.9})`;
      ctx.shadowColor = 'rgba(255,200,0,0.9)';
      ctx.shadowBlur = 10 / zoom;
      ctx.fill();
    }
    ctx.restore();
  }

  // ── Enfeitiçado → corações flutuando
  if (t.conditions.indexOf('Enfeitiçado') !== -1) {
    _startCondAnims();
    const st = _condAnimState[t.id];
    ctx.save();
    if (st && st.hearts) {
      for (let i = 0; i < st.hearts.length; i++) {
        const h = st.hearts[i];
        const hx = px + h.x;
        const hy = py + rY * 0.3 + h.y;
        const hs = h.size / zoom;
        const pulseAlpha = h.alpha * (0.7 + Math.sin(Date.now() * 0.004 + h.phase) * 0.3);
        ctx.shadowColor = 'rgba(255,80,120,0.6)';
        ctx.shadowBlur = 8 / zoom;
        ctx.translate(hx, hy);
        ctx.scale(hs * 0.15, hs * 0.15);
        ctx.beginPath();
        ctx.moveTo(0, -3);
        ctx.bezierCurveTo(-5, -8, -10, -2, 0, 5);
        ctx.bezierCurveTo(10, -2, 5, -8, 0, -3);
        ctx.closePath();
        ctx.fillStyle = `rgba(255,60,120,${pulseAlpha})`;
        ctx.fill();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
    ctx.restore();
  }

  // ── Confuso → espiral colorida girando
  if (t.conditions.indexOf('Confuso') !== -1) {
    _startCondAnims();
    const spiralAngle = (now * 0.003) % (Math.PI * 2);
    ctx.save();
    const spiralColors = ['rgba(255,80,80,0.7)','rgba(80,80,255,0.7)','rgba(80,255,80,0.7)','rgba(255,255,0,0.7)'];
    for (let arm = 0; arm < 4; arm++) {
      const baseAng = spiralAngle + (arm / 4) * Math.PI * 2;
      ctx.beginPath();
      ctx.strokeStyle = spiralColors[arm];
      ctx.lineWidth = 2 / zoom;
      ctx.shadowColor = spiralColors[arm];
      ctx.shadowBlur = 6 / zoom;
      for (let step = 0; step <= 20; step++) {
        const frac = step / 20;
        const r = rX * 0.2 + frac * rX * 0.7;
        const a = baseAng + frac * Math.PI * 1.5;
        const sx = px + Math.cos(a) * r;
        const sy = py + Math.sin(a) * r;
        step === 0 ? ctx.moveTo(sx, sy) : ctx.lineTo(sx, sy);
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  // ── Enredado → linhas de teia ao redor do token
  if (t.conditions.indexOf('Enredado') !== -1) {
    ctx.save();
    const webColor = 'rgba(200,200,200,0.55)';
    ctx.strokeStyle = webColor;
    ctx.lineWidth = 1 / zoom;
    // raios
    const rays = 8;
    for (let r = 0; r < rays; r++) {
      const ang = (r / rays) * Math.PI * 2;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(px + Math.cos(ang) * rX * 1.05, py + Math.sin(ang) * rY * 1.05);
      ctx.stroke();
    }
    // anéis concêntricos
    const rings = 3;
    for (let ri = 1; ri <= rings; ri++) {
      const frac = ri / rings;
      ctx.beginPath();
      ctx.ellipse(px, py, rX * frac * 0.95, rY * frac * 0.95, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    // curvas transversais da teia
    for (let r = 0; r < rays; r++) {
      const a1 = (r / rays) * Math.PI * 2;
      const a2 = ((r + 1) / rays) * Math.PI * 2;
      for (let ri = 1; ri <= rings; ri++) {
        const frac = ri / rings * 0.95;
        ctx.beginPath();
        ctx.moveTo(px + Math.cos(a1) * rX * frac, py + Math.sin(a1) * rY * frac);
        ctx.lineTo(px + Math.cos(a2) * rX * frac, py + Math.sin(a2) * rY * frac);
        ctx.stroke();
      }
    }
    ctx.restore();
  }

  // ── Desprevenido → flash branco periódico
  if (t.conditions.indexOf('Desprevenido') !== -1) {
    _startCondAnims();
    const flashCycle = (now * 0.002) % (Math.PI * 2);
    const flashAlpha = Math.max(0, Math.sin(flashCycle)) * 0.35;
    if (flashAlpha > 0.01) {
      ctx.save();
      ctx.beginPath();
      ctx.ellipse(px, py, rX * 0.9, rY * 0.9, 0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${flashAlpha})`;
      ctx.shadowColor = 'rgba(255,255,200,0.9)';
      ctx.shadowBlur = 20 / zoom;
      ctx.fill();
      // borda elétrica
      ctx.beginPath();
      ctx.ellipse(px, py, rX * 0.95, rY * 0.95, 0, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(255,255,100,${flashAlpha * 1.8})`;
      ctx.lineWidth = 2 / zoom;
      ctx.stroke();
      ctx.restore();
    }
  }

  // ── Inconsciente → ZZZ's flutuando
  if (t.conditions.indexOf('Inconsciente') !== -1) {
    _startCondAnims();
    const st = _condAnimState[t.id];
    if (st && st.zzz) {
      ctx.save();
      ctx.font = `bold ${Math.max(7, st.zzz[0].size) / zoom}px sans-serif`;
      for (let z = 0; z < st.zzz.length; z++) {
        const zz = st.zzz[z];
        const zx = px + rX * 0.5 + zz.x;
        const zy = py - rY * 0.6 + zz.y;
        ctx.globalAlpha = Math.max(0, Math.min(1, zz.alpha));
        ctx.fillStyle = 'rgba(160,200,255,1)';
        ctx.shadowColor = 'rgba(100,160,255,0.8)';
        ctx.shadowBlur = 6 / zoom;
        ctx.fillText(zz.label, zx, zy);
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }
}

function contextToggleLock() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (!token) { fecharContextMenu(); return; }
  snapshotBoard();
  token.locked = !token.locked;
  boardSave(); boardRender(); syncBoardTokensToPlayers();
  toast(token.locked ? `🔒 "${token.name}" travado` : `🔓 "${token.name}" destravado`);
  fecharContextMenu();
}

function contextAlignToGrid() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (!token) { fecharContextMenu(); return; }
  snapshotBoard();
  token.gx = 0;
  token.gy = 0;
  boardSave(); boardRender(); syncBoardTokensToPlayers();
  toast(`📐 "${token.name}" alinhado ao centro`);
  fecharContextMenu();
}

function contextToggleTarget() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (!token) { fecharContextMenu(); return; }
  if (!BOARD.targetedTokens) BOARD.targetedTokens = new Set();
  var isTargeted = BOARD.targetedTokens.has(token.id);
  if (isTargeted) {
    BOARD.targetedTokens.delete(token.id);
    toast(`🎯 "${token.name}" desmarcado como alvo`);
  } else {
    BOARD.targetedTokens.add(token.id);
    toast(`🎯 "${token.name}" marcado como alvo`);
  }
  boardRender();
  fecharContextMenu();
}

function contextEditToken() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (!token) { fecharContextMenu(); return; }
  if (token.locked) { toast(`🔒 "${token.name}" está travado.`); fecharContextMenu(); return; }
  const { cx, cy } = gridToCanvas(token.gx, token.gy);
  abrirFormTokenEdit(token, cx, cy);
  fecharContextMenu();
}

function contextChangeLayer(layer) {
  if (!contextTokenId) return;
  snapshotBoard();
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    token.layer = layer;
    boardSave();
    boardRender();
    syncBoardTokensToPlayers();
    toast(`Camada do token "${token.name}" alterada para ${layer === 'players' ? 'Jogadores' : (layer === 'map' ? 'Mapa' : 'GM (Oculto)')}`);
  }
  fecharContextMenu();
}

function contextDeleteToken() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    if (confirm(`Remover token "${token.name}"?`)) {
      snapshotBoard();
      if (token.mount) {
        const par = getParMontaria(token);
        if (par) {
          delete par.mount.mount;
          delete par.rider.mount;
          par.rider.z = par.mount.z || 0;
        }
      }
      BOARD.tokens = BOARD.tokens.filter(t => t.id !== token.id);
      BOARD.selectedTokens.delete(token.id);
      if (BOARD.followTokenId === token.id) BOARD.followTokenId = null;
      if (BOARD.playerViewTokenId === token.id) exitPlayerView();
      atualizarVisaoJogadorPorSelecao();
      boardSave();
      boardRender();
      syncBoardTokensToPlayers();
    }
  }
  fecharContextMenu();
}

function apagarTokensSelecionados() {
  if (!BOARD.selectedTokens || BOARD.selectedTokens.size === 0) return;
  const alvos = [...BOARD.selectedTokens].map(id => BOARD.tokens.find(t => t.id === id)).filter(Boolean);
  const permitidos = alvos.filter(t => t && temControleToken(t) && !t.locked);
  if (permitidos.length === 0) {
    toast('Nenhum token selecionado pode ser apagado.');
    return;
  }
  const nomes = permitidos.slice(0, 3).map(t => `"${t.name || 'Token'}"`).join(', ');
  const resto = permitidos.length > 3 ? ` (+${permitidos.length - 3} outros)` : '';
  if (!confirm(`Remover ${permitidos.length === 1 ? 'o token' : `${permitidos.length} tokens`} ${nomes}${resto}?`)) return;
  snapshotBoard();
  const ids = new Set(permitidos.map(t => t.id));
  permitidos.forEach(token => {
    if (token.mount) {
      const par = getParMontaria(token);
      if (par) {
        delete par.mount.mount;
        delete par.rider.mount;
        par.rider.z = par.mount.z || 0;
      }
    }
  });
  BOARD.tokens = BOARD.tokens.filter(t => !ids.has(t.id));
  permitidos.forEach(t => BOARD.selectedTokens.delete(t.id));
  if (BOARD.followTokenId && ids.has(BOARD.followTokenId)) BOARD.followTokenId = null;
  if (BOARD.playerViewTokenId && ids.has(BOARD.playerViewTokenId)) exitPlayerView();
  atualizarVisaoJogadorPorSelecao();
  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
  toast(`${permitidos.length} token${permitidos.length > 1 ? 's' : ''} removido${permitidos.length > 1 ? 's' : ''}!`);
}

function contextSubirToken() {
  if (!contextTokenId) return;
  snapshotBoard();
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    token.z = (token.z || 0) + 1;
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  }
  fecharContextMenu();
}
function contextDescerToken() {
  if (!contextTokenId) return;
  snapshotBoard();
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    token.z = (token.z || 0) - 1;
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  }
  fecharContextMenu();
}
function contextSubirAndar() {
  snapshotBoard();
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    token.z = (token.z || 0) + 10;
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  }
  fecharContextMenu();
}
function contextDescerAndar() {
  snapshotBoard();
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    token.z = (token.z || 0) - 10;
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  }
  fecharContextMenu();
}
function contextViewFicha() {
  if (!contextTokenId) return;
  fecharContextMenu();
  // Abre a ficha do personagem se o jogador tiver uma ficha vinculada
  if (myRole !== 'mestre') {
    toggleFichaPanel();
  } else {
    // Mestre: tenta abrir a ficha do jogador dono do token
    const token = BOARD.tokens.find(t => t.id === contextTokenId);
    if (token && token.masterFichaId) {
      abrirFichaMestre(token.masterFichaId);
    } else if (token && token.controlledBy && fichasJogadores[token.controlledBy]) {
      abrirFichaJogador(token.controlledBy);
    } else {
      toast('Nenhuma ficha vinculada a este token.');
    }
  }
}

function popularCtxVincularFicha(token) {
  const submenu = document.getElementById('ctxVincularFichaSubmenu');
  if (!submenu) return;
  submenu.innerHTML = '';

  // Nenhum Vínculo
  const itemNenhum = document.createElement('div');
  itemNenhum.className = 'context-menu-item';
  const checkNenhum = (!token.masterFichaId && !token.controlledBy) ? '<i class="bi bi-check"></i> ' : '<i class="bi bi-check" style="visibility:hidden"></i> ';
  itemNenhum.innerHTML = `${checkNenhum}Nenhum Vínculo`;
  itemNenhum.onclick = () => { vincularFichaAToken(null, null); };
  submenu.appendChild(itemNenhum);

  // Fichas dos Jogadores
  if (Object.keys(fichasJogadores).length > 0) {
    const divJogadores = document.createElement('div');
    divJogadores.style.fontSize = '0.6rem';
    divJogadores.style.color = 'var(--gold)';
    divJogadores.style.padding = '0.3rem 0.5rem 0.1rem';
    divJogadores.style.fontFamily = "'Cinzel', serif";
    divJogadores.textContent = 'JOGADORES';
    submenu.appendChild(divJogadores);

    for (const pid in fichasJogadores) {
      const f = fichasJogadores[pid];
      const item = document.createElement('div');
      item.className = 'context-menu-item';
      const check = (token.controlledBy === pid) ? '<i class="bi bi-check"></i> ' : '<i class="bi bi-check" style="visibility:hidden"></i> ';
      item.innerHTML = `${check}${escHTML(f.playerName || 'Jogador')}`;
      item.onclick = () => { vincularFichaAToken('jogador', pid); };
      submenu.appendChild(item);
    }
  }

  // Fichas do Mestre
  const fichasMestre = getMasterFichas();
  if (fichasMestre.length > 0) {
    const divMestre = document.createElement('div');
    divMestre.style.fontSize = '0.6rem';
    divMestre.style.color = 'var(--gold)';
    divMestre.style.padding = '0.3rem 0.5rem 0.1rem';
    divMestre.style.fontFamily = "'Cinzel', serif";
    divMestre.textContent = 'MESTRE';
    submenu.appendChild(divMestre);

    fichasMestre.forEach(f => {
      const item = document.createElement('div');
      item.className = 'context-menu-item';
      const check = (token.masterFichaId === f.id) ? '<i class="bi bi-check"></i> ' : '<i class="bi bi-check" style="visibility:hidden"></i> ';
      item.innerHTML = `${check}${escHTML(f.name || 'NPC')}`;
      item.onclick = () => { vincularFichaAToken('mestre', f.id); };
      submenu.appendChild(item);
    });
  }
}

function fecharSeletorPericiasToken() {
  const modal = document.getElementById('seletorPericiasModal');
  if (modal) modal.style.display = 'none';
}

var _editarPericiaData = null;
var _editarPericiaOptionsIdx = 0;

function adicionarOpcaoPericia(descVal) {
  var container = document.getElementById('editarPericiaOpcoes');
  if (!container) return;
  var idx = _editarPericiaOptionsIdx++;
  var div = document.createElement('div');
  div.id = 'editarPericiaOpcao_' + idx;
  div.style.display = 'flex';
  div.style.gap = '4px';
  div.style.alignItems = 'stretch';
  div.innerHTML = '<input id="editarPericiaOpcaoDesc_' + idx + '" type="text" placeholder="Descrição da opção" style="flex-grow:1;padding:0.3rem;border:1px solid #444;border-radius:4px;background:#1a1a1a;color:#e8d5a3;font-family:\'Cinzel\',serif;font-size:0.75rem;box-sizing:border-box;" value="' + (descVal || '') + '">' +
    '<button onclick="this.parentElement.remove()" style="width:28px;border:1px solid #dc3545;background:#f8d7da;color:#721c24;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;justify-content:center;align-items:center;">✕</button>';
  container.appendChild(div);
}

function abrirDialogEditarPericia(item, items, cacheKey, btn) {
  document.getElementById('editarPericiaNome').value = item.name || '';
  document.getElementById('editarPericiaDesc').value = item.desc || '';
  document.getElementById('editarPericiaImg').value = item.img || '';
  document.getElementById('editarPericiaVantagem').value = String(item.rollMode || 0);
  _editarPericiaData = { item: item, items: items, cacheKey: cacheKey, btn: btn };
  var container = document.getElementById('editarPericiaOpcoes');
  container.innerHTML = '';
  _editarPericiaOptionsIdx = 0;
  if (item.options && item.options.length) {
    item.options.forEach(function(o) {
      adicionarOpcaoPericia(o.desc);
    });
  }
  document.getElementById('editarPericiaDialog').style.display = 'flex';
}

function fecharDialogEditarPericia() {
  document.getElementById('editarPericiaDialog').style.display = 'none';
  _editarPericiaData = null;
}

function salvarDialogEditarPericia() {
  if (!_editarPericiaData) return;
  var d = _editarPericiaData;
  var item = d.item;
  var nome = document.getElementById('editarPericiaNome').value.trim();

  if (nome) item.name = nome;
  var desc = document.getElementById('editarPericiaDesc').value.trim();
  if (desc) item.desc = desc;
  else delete item.desc;
  var img = document.getElementById('editarPericiaImg').value.trim();
  if (img) item.img = img;
  else delete item.img;
  var rollMode = parseInt(document.getElementById('editarPericiaVantagem').value) || 0;
  if (rollMode) item.rollMode = rollMode;
  else delete item.rollMode;

  var options = [];
  var container = document.getElementById('editarPericiaOpcoes');
  if (container) {
    var children = container.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var descInput = child.querySelector('input[id^="editarPericiaOpcaoDesc_"]');
      if (descInput && descInput.value.trim()) {
        options.push({ desc: descInput.value.trim() });
      }
    }
  }
  if (options.length) item.options = options;
  else delete item.options;

  localStorage.setItem(d.cacheKey, JSON.stringify(d.items));

  var nameSpan = d.btn.children[0];
  if (nameSpan) nameSpan.textContent = item.name;

  fecharDialogEditarPericia();
}

var _selecionarOpcaoPericiaData = null;

function abrirDialogSelecionarOpcaoPericia(item) {
  var titleEl = document.getElementById('selecionarOpcaoPericiaTitle');
  if (titleEl) titleEl.textContent = '⚡ ' + item.name;
  var listEl = document.getElementById('selecionarOpcaoPericiaList');
  if (!listEl) return;
  listEl.innerHTML = '';
  _selecionarOpcaoPericiaData = { item: item };

  var opcoes = [];
  if (item.desc) {
    opcoes.push({ desc: item.desc, _base: true });
  }
  (item.options || []).forEach(function(o) { opcoes.push(o); });

  opcoes.forEach(function(opcao, idx) {
    var row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexDirection = 'column';
    row.style.background = 'rgba(184,134,11,0.1)';
    row.style.border = '1px solid var(--gold)';
    row.style.borderRadius = '6px';
    row.style.padding = '0.5rem 0.8rem';
    row.style.cursor = 'pointer';
    row.style.fontFamily = "'Cinzel', serif";

    var descEl = document.createElement('div');
    descEl.style.fontSize = '0.75rem';
    descEl.style.color = '#e8d5a3';
    descEl.style.lineHeight = '1.3';
    descEl.textContent = opcao.desc;

    row.appendChild(descEl);

    if (opcao._base) {
      var baseLabel = document.createElement('div');
      baseLabel.style.fontSize = '0.65rem';
      baseLabel.style.color = '#b8860b';
      baseLabel.style.marginTop = '4px';
      baseLabel.textContent = 'Base';
      row.appendChild(baseLabel);
    }

    row.onmouseover = function() { row.style.background = 'rgba(184,134,11,0.25)'; };
    row.onmouseout = function() { row.style.background = 'rgba(184,134,11,0.1)'; };

    row.onclick = function() {
      var text = '**Perícia:** ' + item.name + '\n';
      text += '_' + descComImagem(opcao.desc, item.img) + '_';
      var rollerName = myName;
      if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
        var tkId = BOARD.selectedTokens.values().next().value;
        var tk = BOARD.tokens.find(function(t) { return t.id === tkId; });
        if (tk && tk.name) rollerName = tk.name;
      }
      fecharDialogSelecionarOpcaoPericia();
      fecharSeletorPericiasToken();
      rotearMensagem({ type: 'text', name: rollerName, role: myRole, text: text, time: formatTime(), visibility: chatVisibility });
      if (item.canRoll) {
        var vant = parseInt(item.rollMode) || 0;
        if (vant !== 0) {
          var r1 = Math.floor(Math.random() * 20) + 1;
          var r2 = Math.floor(Math.random() * 20) + 1;
          var chosen = vant === 1 ? Math.max(r1, r2) : Math.min(r1, r2);
          var totalRoll = chosen + item.total;
          var advLabel = vant === 1 ? ' (vantagem)' : ' (desvantagem)';
          var bonusStr = item.total >= 0 ? '+' + item.total : item.total;
          var rollText = item.name + ': 2d20' + advLabel + bonusStr + ' → **' + totalRoll + '** [' + r1 + ', ' + r2 + ']';
          rotearMensagem({ type: 'roll', name: rollerName, role: myRole, text: rollText, time: formatTime(), visibility: chatVisibility });
          if (chatVisibility === 'global') {
            rolarDados3d(20, 2, [r1, r2], chosen + item.total, item.total, item.name + ': ');
          }
        } else {
          executarMacro('/r ' + item.name + ':1d20' + (item.total >= 0 ? '+' : '') + item.total);
        }
      }
    };

    listEl.appendChild(row);
  });

  document.getElementById('selecionarOpcaoPericiaDialog').style.display = 'flex';
}

function fecharDialogSelecionarOpcaoPericia() {
  document.getElementById('selecionarOpcaoPericiaDialog').style.display = 'none';
  _selecionarOpcaoPericiaData = null;
}

var _editarAtaqueData = null;

function abrirDialogEditarAtaque(item, items, cacheKey, btn, pmSpan, rightSpan) {
  document.getElementById('editarAtaqueNome').value = item.name || '';
  document.getElementById('editarAtaquePM').value = item.pm || '';
  document.getElementById('editarAtaqueBonus').value = item.attackBonus !== undefined ? item.attackBonus : '';
  document.getElementById('editarAtaqueDmgBase').value = item.dmg || item.dmgFormula || '';
  document.getElementById('editarAtaqueDmgExtra').value = item.dmgExtra || '';
  document.getElementById('editarAtaqueDiceExtra').value = item.diceExtra || '';
  document.getElementById('editarAtaqueDmgAttr').value = item.dmgAttr || '';
  document.getElementById('editarAtaqueDesc').value = item.desc || '';
  document.getElementById('editarAtaqueImg').value = item.img || '';
  document.getElementById('editarAtaqueCritRange').value = item.critRange || '';
  document.getElementById('editarAtaqueCritMult').value = item.critMult || '';
  document.getElementById('editarAtaqueVantagem').value = String(item.rollMode || 0);
  _editarAtaqueData = { item: item, items: items, cacheKey: cacheKey, btn: btn, pmSpan: pmSpan, rightSpan: rightSpan };
  document.getElementById('editarAtaqueDialog').style.display = 'flex';
}

function fecharDialogEditarAtaque() {
  document.getElementById('editarAtaqueDialog').style.display = 'none';
  _editarAtaqueData = null;
}

function salvarDialogEditarAtaque() {
  if (!_editarAtaqueData) return;
  var d = _editarAtaqueData;
  var item = d.item;
  var nome = document.getElementById('editarAtaqueNome').value.trim();
  var pm = document.getElementById('editarAtaquePM').value.trim();
  var bonus = document.getElementById('editarAtaqueBonus').value.trim();
  var dmgBase = document.getElementById('editarAtaqueDmgBase').value.trim();
  var dmgExtra = document.getElementById('editarAtaqueDmgExtra').value.trim();
  var diceExtra = document.getElementById('editarAtaqueDiceExtra').value.trim();
  var dmgAttr = document.getElementById('editarAtaqueDmgAttr').value.trim();
  var desc = document.getElementById('editarAtaqueDesc').value.trim();

  if (nome) item.name = nome;
  if (pm) item.pm = pm;
  else delete item.pm;
  if (bonus) item.attackBonus = parseInt(bonus) || 0;
  if (dmgBase) {
    item.dmg = dmgBase;
    var extraParts = [];
    if (dmgExtra) extraParts.push(dmgExtra);
    if (diceExtra) extraParts.push(diceExtra);
    var attrStr = dmgAttr ? (dmgAttr.startsWith('+') || dmgAttr.startsWith('-') ? dmgAttr : '+' + dmgAttr) : '';
    if (attrStr) extraParts.push(attrStr);
    item.dmgFormula = dmgBase + (extraParts.length ? '+' + extraParts.join('+') : '');
    item.dmgExtra = dmgExtra || undefined;
    item.diceExtra = diceExtra || undefined;
    item.dmgAttr = dmgAttr || undefined;
  } else {
    delete item.dmg;
    delete item.dmgExtra;
    delete item.diceExtra;
    delete item.dmgAttr;
  }
  if (desc) item.desc = desc;
  else delete item.desc;
  var img = document.getElementById('editarAtaqueImg').value.trim();
  if (img) item.img = img;
  else delete item.img;
  var critRange = document.getElementById('editarAtaqueCritRange').value.trim();
  var critMult = document.getElementById('editarAtaqueCritMult').value.trim();
  if (critRange) item.critRange = critRange;
  else delete item.critRange;
  if (critMult) item.critMult = critMult;
  else delete item.critMult;
  var rollMode = parseInt(document.getElementById('editarAtaqueVantagem').value) || 0;
  if (rollMode) item.rollMode = rollMode;
  else delete item.rollMode;

  localStorage.setItem(d.cacheKey, JSON.stringify(d.items));

  var leftSpan = d.btn.children[0];
  if (leftSpan) leftSpan.textContent = item.name;

  if (item.pm) {
    d.pmSpan.textContent = '[' + item.pm + ' PM]';
    d.pmSpan.style.display = '';
    d.pmSpan.style.color = '#ff4d4d';
  } else {
    d.pmSpan.style.display = 'none';
  }

  var atkTotal = item.attackBonus >= 0 ? '+' + item.attackBonus : item.attackBonus;
  var critStr = item.critRange && item.critMult ? ' | ' + item.critRange + '/x' + item.critMult : '';
  d.rightSpan.textContent = atkTotal + ' | ' + item.dmgFormula + critStr;

  fecharDialogEditarAtaque();
}

function fecharSeletorAtaquesToken() {
  const modal = document.getElementById('seletorAtaquesModal');
  if (modal) modal.style.display = 'none';
}

function atualizarMiniaturasSelecionados() {
  const container = document.getElementById('selected-tokens-row');
  if (!container) return;
  container.innerHTML = '';
  
  if (!BOARD.selectedTokens || BOARD.selectedTokens.size === 0) {
    container.style.display = 'none';
    return;
  }
  
  container.style.display = 'flex';
  
  BOARD.selectedTokens.forEach(id => {
    const token = BOARD.tokens.find(t => t.id === id);
    if (!token) return;
    
    const wrapper = document.createElement('div');
    wrapper.className = 'selected-token-capsule';
    wrapper.title = token.name || 'Token';
    
    wrapper.onclick = (e) => {
      e.stopPropagation();
      centralizarEmToken(token);
    };
    
    if (token.imageUrl) {
      const img = document.createElement('img');
      img.src = token.imageUrl;
      img.style.border = `2px solid ${token.color || 'var(--gold)'}`;
      wrapper.appendChild(img);
    } else {
      const initials = document.createElement('div');
      initials.style.width = '28px';
      initials.style.height = '28px';
      initials.style.borderRadius = '50%';
      initials.style.display = 'flex';
      initials.style.alignItems = 'center';
      initials.style.justifyContent = 'center';
      initials.style.background = token.color || 'var(--gold)';
      initials.style.color = '#000';
      initials.style.fontFamily = "'Cinzel', serif";
      initials.style.fontSize = '0.85rem';
      initials.style.fontWeight = 'bold';
      initials.style.border = '2px solid var(--border)';
      initials.style.boxShadow = '0 0 4px rgba(0,0,0,0.5)';
      initials.style.flexShrink = '0';
      
      const firstLetter = (token.name || 'T').substring(0, 1).toUpperCase();
      initials.textContent = firstLetter;
      wrapper.appendChild(initials);
    }
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = token.name || 'Token';
    wrapper.appendChild(nameSpan);
    
    container.appendChild(wrapper);
  });
}

function atualizarBotoesTokenSelected() {
  atualizarMiniaturasSelecionados();
  atualizarBotaoMontaria();
  const btnSkills = document.getElementById('token-skills-btn');
  const btnAttacks = document.getElementById('token-attacks-btn');
  const btnMagias = document.getElementById('token-magias-btn');
  const btnPowers = document.getElementById('token-powers-btn');
  if (!btnSkills && !btnAttacks && !btnMagias && !btnPowers) return;
  if (BOARD.selectedTokens.size === 1) {
    const selId = BOARD.selectedTokens.values().next().value;
    const token = BOARD.tokens.find(t => t.id === selId);
    if (token) {
      const mestreVe = myRole === 'mestre' && (token.masterFichaId || (token.controlledBy && fichasJogadores[token.controlledBy]));
      const jogadorVe = myRole === 'jogador' && token.controlledBy === myPeerId && (localFichaUpdateData || _carregarFichaLocal());
      const show = mestreVe || jogadorVe;
      if (btnSkills) btnSkills.style.display = show ? 'flex' : 'none';
      if (btnAttacks) btnAttacks.style.display = show ? 'flex' : 'none';
      if (btnMagias) btnMagias.style.display = show ? 'flex' : 'none';
      if (btnPowers) btnPowers.style.display = show ? 'flex' : 'none';
      return;
    }
  }
  if (btnSkills) btnSkills.style.display = 'none';
  if (btnAttacks) btnAttacks.style.display = 'none';
  if (btnMagias) btnMagias.style.display = 'none';
  if (btnPowers) btnPowers.style.display = 'none';
}

// ══════════════════════════════════════════════════════
//  MONTARIA (Mount)
//  Dois tokens de tamanhos diferentes formam uma criatura
//  montada: o menor fica +2 no eixo Z, sempre sobre o maior,
//  e ambos se movem juntos (até 3 quadrados de distância).
// ══════════════════════════════════════════════════════

function _spanToken(t) {
  return { x: t.sizeX || t.size || 1, y: t.sizeY || t.size || 1 };
}

function getParMontaria(t, tokens) {
  if (!t || !t.mount) return null;
  const list = tokens || BOARD.tokens;
  const other = list.find(x => x.id === (t.mount.riderId || t.mount.mountId));
  if (!other || !other.mount) return null;
  const isRider = !!t.mount.mountId;
  return isRider ? { mount: other, rider: t } : { mount: t, rider: other };
}

function moverRiderParaCentro(mount, rider) {
  // O motor desenha/ancora tokens no centro da 1ª célula (tokenWorldPos),
  // então alinhar gx/gy centraliza o cavaleiro sobre a montaria.
  rider.gx = Math.max(0, mount.gx || 0);
  rider.gy = Math.max(0, mount.gy || 0);
  rider.z = (mount.z || 0) + 2;
}

function moverMountParaRider(mount, rider) {
  mount.gx = Math.max(0, rider.gx || 0);
  mount.gy = Math.max(0, rider.gy || 0);
}

function seguirMontaria(token, tokens) {
  const par = getParMontaria(token, tokens);
  if (!par) return false;
  if (token.id === par.mount.id) {
    moverRiderParaCentro(par.mount, par.rider);
  } else {
    moverMountParaRider(par.mount, par.rider);
  }
  return true;
}

function distanciaMontaria(mount, rider) {
  const ms = _spanToken(mount), rs = _spanToken(rider);
  const mx = mount.gx + ms.x / 2, my = mount.gy + ms.y / 2;
  const rx = rider.gx + rs.x / 2, ry = rider.gy + rs.y / 2;
  return Math.hypot(mx - rx, my - ry);
}

// Colide com qualquer outro token/objeto do tabuleiro (exceto o próprio token)
function _colideComOutroToken(token, gx, gy) {
  const rs = _spanToken(token);
  for (const other of BOARD.tokens) {
    if (other.id === token.id) continue;
    if (other.hideInBoard) continue;
    const os = _spanToken(other);
    if (gx < other.gx + os.x && gx + rs.x > other.gx && gy < other.gy + os.y && gy + rs.y > other.gy) {
      return true;
    }
  }
  return false;
}

// Acha a célula adjacente mais próxima da montaria que esteja livre
// (sem tokens/objetos e sem sobrepor a própria montaria)
function _acharPosAdjacente(mount, rider) {
  const spanM = _spanToken(mount), spanR = _spanToken(rider);
  const minX = mount.gx - spanR.x, maxX = mount.gx + spanM.x;
  const minY = mount.gy - spanR.y, maxY = mount.gy + spanM.y;
  let best = null, bestDist = Infinity;
  for (let rx = minX; rx <= maxX; rx++) {
    for (let ry = minY; ry <= maxY; ry++) {
      if (rx < 0 || ry < 0) continue;
      if (rx >= mount.gx && rx < mount.gx + spanM.x && ry >= mount.gy && ry < mount.gy + spanM.y) continue;
      if (_colideComOutroToken(rider, rx, ry)) continue;
      const dx = Math.max(mount.gx, rx) - Math.min(mount.gx + spanM.x, rx + spanR.x);
      const dy = Math.max(mount.gy, ry) - Math.min(mount.gy + spanM.y, ry + spanR.y);
      const dist = Math.max(0, dx) + Math.max(0, dy);
      if (dist < bestDist) {
        bestDist = dist;
        best = { gx: rx, gy: ry };
      }
    }
  }
  return best;
}

function atualizarBotaoMontaria() {
  const btn = document.getElementById('token-mount-btn');
  if (!btn) return;
  btn.style.display = 'none';
  if (!BOARD.selectedTokens || BOARD.selectedTokens.size === 0) return;
  const sel = [...BOARD.selectedTokens].map(id => BOARD.tokens.find(t => t.id === id)).filter(Boolean);
  if (sel.length !== 2) return;
  if (!sel.every(t => temControleToken(t))) return;
  const [a, b] = sel;
  const mounted = !!(a.mount && b.mount &&
    ((a.mount.mountId === b.id && b.mount.riderId === a.id) ||
     (a.mount.riderId === b.id && b.mount.mountId === a.id)));
  btn.style.display = 'flex';
  btn.classList.toggle('mounted', mounted);
  btn.innerHTML = mounted
    ? '🐴<span style="font-size:0.5rem;font-weight:bold;">DESMONTAR</span>'
    : '🐴<span style="font-size:0.5rem;font-weight:bold;">MONTAR</span>';
  btn.title = mounted
    ? 'Desmontar o par'
    : 'Montar (tokens de tamanhos diferentes, até 3 quadrados de distância)';
}

function montar() {
  if (!BOARD.selectedTokens || BOARD.selectedTokens.size !== 2) {
    toast('🐴 Selecione exatamente 2 tokens para montar.'); return;
  }
  const sel = [...BOARD.selectedTokens].map(id => BOARD.tokens.find(t => t.id === id)).filter(Boolean);
  if (sel.length !== 2) return;
  if (!sel.every(t => temControleToken(t))) {
    toast('🐴 Você só pode montar tokens que controla.'); return;
  }
  const [a, b] = sel;
  const areaA = _spanToken(a).x * _spanToken(a).y;
  const areaB = _spanToken(b).x * _spanToken(b).y;
  if (areaA === areaB) {
    toast('🐴 Os tokens precisam ter tamanhos diferentes.'); return;
  }
  if (a.mount || b.mount) {
    toast('🐴 Um dos tokens já está em uma montaria.'); return;
  }
  const mount = areaA > areaB ? a : b;
  const rider = areaA > areaB ? b : a;
  if (distanciaMontaria(mount, rider) > 3) {
    toast('🐴 Os tokens precisam estar a até 3 quadrados de distância.'); return;
  }
  snapshotBoard();
  moverRiderParaCentro(mount, rider);
  mount.mount = { riderId: rider.id };
  rider.mount = { mountId: mount.id };
  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
  _sincronizarMontariaMestre([mount, rider]);
  atualizarBotaoMontaria();
  toast(`🐴 ${rider.name || 'Token'} montou em ${mount.name || 'Token'}!`);
}

function desmontar() {
  if (!BOARD.selectedTokens) return;
  let par = null;
  const sel = [...BOARD.selectedTokens].map(id => BOARD.tokens.find(t => t.id === id)).filter(Boolean);
  if (sel.length === 2) {
    par = getParMontaria(sel[0]);
    if (par && par.rider.id !== sel[1].id && par.mount.id !== sel[1].id) par = null;
  } else if (sel.length === 1 && sel[0].mount) {
    par = getParMontaria(sel[0]);
  }
  if (!par) {
    toast('🐴 Selecione o par montado para desmontar.'); return;
  }
  if (!temControleToken(par.rider) || !temControleToken(par.mount)) {
    toast('🐴 Você só pode desmontar tokens que controla.'); return;
  }
  snapshotBoard();
  // Coloca o cavaleiro numa célula adjacente livre (fora da montaria)
  const pos = _acharPosAdjacente(par.mount, par.rider);
  if (pos) {
    par.rider.gx = pos.gx;
    par.rider.gy = pos.gy;
    par.rider.z = par.mount.z || 0;
  } else {
    // Sem espaço adjacente: mantém onde está, mas acima da montaria
    par.rider.z = (par.mount.z || 0) + 2;
    toast('🐴 Sem espaço adjacente — o cavaleiro permaneceu em cima da montaria.');
  }
  delete par.mount.mount;
  delete par.rider.mount;
  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
  _sincronizarMontariaMestre([par.mount, par.rider]);
  atualizarBotaoMontaria();
  toast('🐴 Montaria desfeita.');
}

function toggleMontaria() {
  const btn = document.getElementById('token-mount-btn');
  if (btn && btn.classList.contains('mounted')) desmontar();
  else montar();
}

// Jogador → Mestre: propaga estado/posição da montaria (master aplica e re-sincroniza)
function _sincronizarMontariaMestre(tokens) {
  if (myRole === 'mestre' || amIHost || !masterConn) return;
  tokens.forEach(t => {
    if (!t) return;
    try {
      masterConn.send({ type: 'montaria-update', tokenId: t.id, mount: t.mount || null, gx: t.gx, gy: t.gy, z: t.z });
    } catch (e) {}
  });
}

function contextMontaria() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    if (token.mount) {
      BOARD.mountPendingId = null;
      BOARD.selectedTokens.clear();
      BOARD.selectedTokens.add(token.id);
      desmontar();
    } else {
      BOARD.mountPendingId = token.id;
      BOARD.selectedTokens.clear();
      BOARD.selectedTokens.add(token.id);
      boardRender();
      toast('🐴 Agora clique no outro token (tamanho diferente) para montar.');
    }
  }
  fecharContextMenu();
}

function contextLuz(preset) {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (!token) { fecharContextMenu(); return; }
  if (!token.auras) token.auras = [];
  snapshotBoard();
  if (preset === 'none') {
    token.auras = token.auras.map(a => a.light ? Object.assign({}, a, { active: false }) : a);
  } else {
    const radius = Number(preset);
    const idx = token.auras.findIndex(a => a.light && a.active);
    if (idx !== -1) {
      token.auras[idx].radius = radius;
      token.auras[idx].active = true;
      token.auras[idx].name = 'Luz';
    } else {
      const livre = token.auras.find(a => !a.active);
      if (livre) Object.assign(livre, { active: true, name: 'Luz', radius, light: true });
      else if (token.auras.length < 2) token.auras.push({ active: true, name: 'Luz', radius, light: true });
      else Object.assign(token.auras[0], { active: true, name: 'Luz', radius, light: true });
    }
  }
  const temLuz = token.auras.some(a => a.light && a.active);
  const presets = { 6: 'Tocha (6m)', 9: 'Lanterna (9m)', 12: 'Fogueira (12m)' };
  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
  setTimeout(atualizarFogJogador, 50);
  toast(temLuz ? `🔦 "${token.name}": ${presets[preset] || 'luz'} ativada.` : `🔦 Luz removida de "${token.name}".`);
  fecharContextMenu();
}

// State variables for VTT selectors locks
var locksState = {
  attacks: localStorage.getItem('vtt_lock_attacks') === 'true',
  skills: localStorage.getItem('vtt_lock_skills') === 'true',
  spells: localStorage.getItem('vtt_lock_spells') === 'true',
  powers: localStorage.getItem('vtt_lock_powers') === 'true'
};

function toggleLock(type) {
  locksState[type] = !locksState[type];
  localStorage.setItem('vtt_lock_' + type, locksState[type]);
  atualizarIconeCadeado(type);
  
  if (type === 'attacks') {
    const modal = document.getElementById('seletorAtaquesModal');
    if (modal && modal.style.display === 'flex') abrirSeletorAtaquesToken(true);
  } else if (type === 'skills') {
    const modal = document.getElementById('seletorPericiasModal');
    if (modal && modal.style.display === 'flex') abrirSeletorPericiasToken(true);
  } else if (type === 'spells') {
    const modal = document.getElementById('seletorMagiasModal');
    if (modal && modal.style.display === 'flex') abrirSeletorMagiasToken(true);
  } else if (type === 'powers') {
    const modal = document.getElementById('seletorPoderesModal');
    if (modal && modal.style.display === 'flex') abrirSeletorPoderesToken(true);
  }
  
  toast((locksState[type] ? '🔒 Atualização travada' : '🔓 Atualização destravada') + ' para este modal.');
}

function atualizarIconeCadeado(type) {
  var btnId = 'lock-' + type + '-btn';
  var btn = document.getElementById(btnId);
  if (btn) {
    btn.innerHTML = locksState[type] ? '🔒' : '🔓';
    btn.title = locksState[type] ? 'Bloqueado (Clique para desbloquear sincronização com a ficha)' : 'Desbloqueado (Clique para bloquear sincronização com a ficha)';
  }
}

function initLocks() {
  atualizarIconeCadeado('attacks');
  atualizarIconeCadeado('skills');
  atualizarIconeCadeado('spells');
  atualizarIconeCadeado('powers');
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLocks);
} else {
  initLocks();
}

function _carregarFichaLocal() {
  const iframe = document.getElementById('ficha-iframe');
  if (!iframe) return null;
  if (!iframe.src || iframe.src === window.location.href) {
    iframe.src = FICHA_URL;
  }
  setTimeout(() => {
    try { iframe.contentWindow?.postMessage({ type: 'vtt-request-resume' }, '*'); } catch (e) {}
  }, 500);
  return null;
}

function _getTargetChatPrefix() {
  if (!BOARD.targetedTokens || BOARD.targetedTokens.size === 0) return '';
  var names = [];
  BOARD.targetedTokens.forEach(function(id) {
    var t = BOARD.tokens.find(function(tk) { return tk.id === id; });
    if (t && t.name) names.push(t.name);
  });
  if (names.length === 0) return '';
  return '🎯 [' + names.join(', ') + '] ';
}

function _rollSpellDice(desc) {
  var regex = /(\d+)d(\d+)([+-]\d+)?/gi;
  var parts = [];
  var total = 0;
  var match;
  while ((match = regex.exec(desc)) !== null) {
    var qtd = parseInt(match[1]);
    var faces = parseInt(match[2]);
    var mod = match[3] ? parseInt(match[3]) : 0;
    var rolls = [];
    for (var i = 0; i < qtd; i++) rolls.push(Math.floor(Math.random() * faces) + 1);
    var sum = rolls.reduce(function(s, v) { return s + v; }, 0) + mod;
    total += sum;
    var det = qtd > 1 ? ' [' + rolls.join(',') + ']' : '';
    var modStr = mod !== 0 ? (mod > 0 ? '+' + mod : '' + mod) : '';
    parts.push(qtd + 'd' + faces + modStr + ' → **' + sum + '**' + det);
  }
  if (parts.length === 0) return null;
  return { text: parts.join(' | '), total: total };
}

var _spellDiceDialogData = null;

function abrirDialogRolagemMagia(spellName, desc, rollerName, targetIds, pmBase, sourceTokenId) {
  var dialog = document.getElementById('spellDiceDialog');
  var nameEl = document.getElementById('sddSpellName');
  var segsEl = document.getElementById('sddSegments');
  if (!dialog || !nameEl || !segsEl) return;
  nameEl.textContent = spellName;
  segsEl.innerHTML = '';
  var segments = _parseDescSegments(desc);
  segments.forEach(function(seg, idx) {
    var segDiv = document.createElement('div');
    segDiv.style.cssText = 'margin-bottom:10px;border-bottom:1px solid rgba(153,102,255,0.2);padding-bottom:8px;';
    var header = document.createElement('div');
    header.style.cssText = 'font-size:0.7rem;color:#a0a0ff;margin-bottom:4px;font-weight:bold;text-transform:uppercase;letter-spacing:0.5px;';
    header.textContent = idx === 0 ? '⚡ Magia Base' : seg.pmCost > 0 ? '+ ' + seg.pmCost + ' PM' : '⚡ Magia Base';
    segDiv.appendChild(header);
    var descEl = document.createElement('div');
    descEl.style.cssText = 'font-size:0.72rem;color:#d0c0a0;margin-bottom:6px;line-height:1.3;white-space:pre-wrap;';
    descEl.textContent = seg.text;
    segDiv.appendChild(descEl);
    var diceEl = document.createElement('div');
    diceEl.style.cssText = 'display:flex;flex-direction:column;gap:0.35rem;';
    var diceRegex = /(\d+)d(\d+)([+-]\d+)?/gi;
    var match;
    var hasDice = false;
    while ((match = diceRegex.exec(seg.text)) !== null) {
      hasDice = true;
      (function(formula, pCost, segText) {
        var btn = document.createElement('button');
        btn.style.cssText = 'background:rgba(111,66,193,0.3);border:1px solid #9966ff;color:#e8d5a3;border-radius:6px;padding:0.4rem 0.8rem;cursor:pointer;font-family:"Cinzel",serif;font-size:0.8rem;font-weight:bold;transition:background 0.15s;text-align:left;display:flex;justify-content:space-between;align-items:center;width:100%;';
        var labelSpan = document.createElement('span');
        labelSpan.textContent = '🎲 ' + formula;
        var pmSpan = document.createElement('span');
        pmSpan.style.cssText = 'font-size:0.65rem;color:#a0a0ff;margin-left:8px;';
        var actualCost = pCost > 0 ? pCost : pmBase;
        pmSpan.textContent = actualCost > 0 ? 'PM: ' + actualCost : '—';
        btn.appendChild(labelSpan);
        btn.appendChild(pmSpan);
        btn.onmouseover = function() { this.style.background = 'rgba(111,66,193,0.5)'; };
        btn.onmouseout = function() { this.style.background = 'rgba(111,66,193,0.3)'; };
        btn.onclick = function() { rolarFormulaMagia(formula, spellName, rollerName, targetIds, pCost, segText); };
        diceEl.appendChild(btn);
      })(match[0], seg.pmCost, seg.text);
    }
    if (!hasDice) {
      var effectiveCost = seg.pmCost > 0 ? seg.pmCost : (idx === 0 ? pmBase : 0);
      if (effectiveCost > 0) {
        var enhBtn = document.createElement('button');
        enhBtn.style.cssText = 'background:rgba(111,66,193,0.3);border:1px solid #9966ff;color:#e8d5a3;border-radius:6px;padding:0.4rem 0.8rem;cursor:pointer;font-family:"Cinzel",serif;font-size:0.8rem;font-weight:bold;transition:background 0.15s;text-align:left;display:flex;justify-content:space-between;align-items:center;width:100%;';
        var labelSpan = document.createElement('span');
        labelSpan.textContent = idx === 0 ? '⚡ Lançar Magia' : '🎯 Aprimoramento';
        var pmSpan = document.createElement('span');
        pmSpan.style.cssText = 'font-size:0.65rem;color:#a0a0ff;margin-left:8px;';
        pmSpan.textContent = 'PM: ' + effectiveCost;
        enhBtn.appendChild(labelSpan);
        enhBtn.appendChild(pmSpan);
        enhBtn.onmouseover = function() { this.style.background = 'rgba(111,66,193,0.5)'; };
        enhBtn.onmouseout = function() { this.style.background = 'rgba(111,66,193,0.3)'; };
        (function(cost, txt, isBase) {
          enhBtn.onclick = function() {
            if (_spellDiceDialogData && _spellDiceDialogData.sourceTokenId) {
              _gastarPmMagia(_spellDiceDialogData.sourceTokenId, cost);
            }
            var text = isBase
              ? '**Magia:** ' + spellName + ' — ⚡ Lançada (**PM ' + cost + '**)\n' + txt
              : '**Magia:** ' + spellName + ' — 🎯 Aprimoramento **+ ' + cost + ' PM**\n' + txt;
            var msg = { type: 'roll', name: rollerName, role: myRole, text: text, time: formatTime(), visibility: chatVisibility };
            rotearMensagem(msg);
          };
        })(effectiveCost, seg.text, idx === 0);
        diceEl.appendChild(enhBtn);
      } else {
        var noDice = document.createElement('div');
        noDice.style.cssText = 'font-size:0.7rem;color:#666;font-style:italic;';
        noDice.textContent = 'Nenhuma fórmula de dados.';
        diceEl.appendChild(noDice);
      }
    }
    segDiv.appendChild(diceEl);
    segsEl.appendChild(segDiv);
  });
  _spellDiceDialogData = { spellName: spellName, rollerName: rollerName, targetIds: targetIds, pmBase: pmBase, sourceTokenId: sourceTokenId };
  dialog.style.display = 'flex';
}

function _parseDescSegments(desc) {
  var enhSplit = desc.split(/---\s*APRIMORAMENTOS?\s*---/i);
  var baseText = (enhSplit[0] || desc).trim();
  var enhSection = enhSplit.length > 1 ? enhSplit.slice(1).join('--- APRIMORAMENTOS ---') : '';
  var segments = [];
  var enhRegex = /[•*]?\s*\+(\d+)\s*PM\s*:\s*/gim;
  var positions = [];
  var m;
  enhRegex.lastIndex = 0;
  while ((m = enhRegex.exec(enhSection)) !== null) {
    positions.push({ index: m.index, cost: parseInt(m[1]) });
  }
  if (positions.length === 0) {
    return [{ text: baseText, pmCost: 0 }];
  }
  var lastEnhEnd = 0;
  for (var i = 0; i < positions.length; i++) {
    var pos = positions[i];
    var enhStart = pos.index + enhSection.substring(pos.index).match(/[•*]?\s*\+\d+\s*PM\s*:\s*/)[0].length;
    var nextPos = positions[i + 1];
    var enhEnd = nextPos ? nextPos.index : enhSection.length;
    var content = enhSection.substring(enhStart, enhEnd).trim();
    segments.push({ text: content, pmCost: pos.cost });
    lastEnhEnd = enhEnd;
  }
  segments.unshift({ text: baseText, pmCost: 0 });
  return segments;
}

function fecharDialogRolagemMagia() {
  var dialog = document.getElementById('spellDiceDialog');
  if (dialog) dialog.style.display = 'none';
  _spellDiceDialogData = null;
}

function rolarFormulaMagia(formula, spellName, rollerName, targetIds, pmCost, segText) {
  var m = formula.match(/^(\d*)d(\d+)([+-]\d+)?$/i);
  if (!m) return;
  var qtd = parseInt(m[1] || '1'), faces = parseInt(m[2]);
  var mod = m[3] ? parseInt(m[3]) : 0;
  var rolls = [];
  for (var i = 0; i < qtd; i++) rolls.push(Math.floor(Math.random() * faces) + 1);
  var sum = rolls.reduce(function(s, v) { return s + v; }, 0) + mod;
  var det = qtd > 1 ? ' [' + rolls.join(',') + ']' : '';
  var modStr = mod !== 0 ? (mod > 0 ? '+' + mod : '' + mod) : '';
  var resultText = qtd + 'd' + faces + modStr + ' → **' + sum + '**' + det;
  var text = '**Magia:** ' + spellName + ' — 🎲 ' + resultText + (segText ? '\n' + segText : '');
  if (_spellDiceDialogData) {
    var actualPmCost = pmCost > 0 ? pmCost : (_spellDiceDialogData.pmBase || 0);
    if (actualPmCost > 0 && _spellDiceDialogData.sourceTokenId) {
      _gastarPmMagia(_spellDiceDialogData.sourceTokenId, actualPmCost);
    }
  }
  var msg = { type: 'roll', name: rollerName, role: myRole, text: text, time: formatTime(), visibility: chatVisibility };
  if (targetIds && targetIds.length > 0 && sum > 0) {
    msg.type = 'damage';
    msg.targetIds = targetIds;
    msg.dmgTotal = sum;
  }
  rotearMensagem(msg);
}

function _tokenPmDelta(tokenId, delta) {
  var token = BOARD.tokens.find(function(t) { return t.id === tokenId; });
  if (!token) return;
  if (token.pm === undefined) token.pm = token.pmMax || 0;
  var before = parseInt(token.pm) || 0;
  token.pm = before + delta;
  if (token.pm < 0) token.pm = 0;
  boardSave();
  boardRender();
  if (myRole === 'mestre') {
    if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) syncBoardToPlayers();
  } else if (masterConn) {
    try { masterConn.send({ type: 'apply-pm', tokenId: tokenId, delta: delta }); } catch (e) {}
  }
}

function _gastarPmMagia(sourceTokenId, pmCost) {
  var cost = parseInt(pmCost);
  if (isNaN(cost) || cost <= 0) return;
  _tokenPmDelta(sourceTokenId, -cost);
  var token = BOARD.tokens.find(function(t) { return t.id === sourceTokenId; });
  if (token) toast('💫 ' + (token.name || 'Token') + ': PM -' + cost + ' → ' + token.pm);
}

function _buildDmgMessage(label, targetIds) {
  var rollerName = myName;
  if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
    var selId = BOARD.selectedTokens.values().next().value;
    var tk = BOARD.tokens.find(function(t) { return t.id === selId; });
    if (tk && tk.name) rollerName = tk.name;
  }
  var text = label;
  var dmgTotal = 0;
  var colonIdx = label.indexOf(':');
  if (colonIdx > 0) {
    var dmgLabel = label.substring(0, colonIdx);
    var dmgRoll = label.substring(colonIdx + 1).trim();
    var result = _rollDmgFormula(dmgRoll);
    dmgTotal = parseInt(result) || 0;
    dmgLabel = dmgLabel.replace(/\(dano\)/i, '').trim();
    text = '**Dano:** ' + dmgLabel + '\n🎲 ' + dmgRoll + ' → **' + result + '**';
  }
  return { type: 'damage', name: rollerName, role: myRole, text: text, time: formatTime(), visibility: chatVisibility, targetIds: targetIds, dmgTotal: dmgTotal };
}

function _rollDmgFormula(formula) {
  try {
    var total = 0;
    var parts = formula.split('+');
    var rollDetail = [];
    parts.forEach(function(p) {
      var m = p.match(/^(\d*)d(\d+)$/i);
      if (m) {
        var qtd = parseInt(m[1] || '1'), faces = parseInt(m[2]);
        var rolls = [];
        for (var i = 0; i < qtd; i++) rolls.push(Math.floor(Math.random() * faces) + 1);
        var sum = rolls.reduce(function(s, v) { return s + v; }, 0);
        total += sum;
        if (qtd > 1) rollDetail.push('[' + rolls.join(',') + ']');
      } else {
        var num = parseInt(p);
        if (!isNaN(num)) total += num;
      }
    });
    var det = rollDetail.length > 0 ? ' ' + rollDetail.join(' ') : '';
    return total + det;
  } catch (e) { return formula; }
}

function _tokenDmgDelta(targetId, delta) {
  var token = BOARD.tokens.find(function(t) { return t.id === targetId; });
  if (!token) { toast('Token alvo não encontrado.'); return; }
  if (token.hp === undefined) token.hp = token.hpMax || 0;
  var before = parseInt(token.hp) || 0;
  token.hp = before + delta;
  boardSave();
  boardRender();
  if (myRole === 'mestre') {
    if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) syncBoardToPlayers();
  } else if (masterConn) {
    try { masterConn.send({ type: 'apply-damage', targetId: targetId, delta: delta }); } catch (e) {}
  }
  var name = token.name || 'Token';
  var sign = delta > 0 ? '+' + delta : delta;
  toast(name + ': PV ' + sign + ' → ' + token.hp);
}

function resolveFichaToken(token) {
  let fullData = null;
  let charName = 'Personagem';
  if (token.masterFichaId) {
    const f = getMasterFichas().find(f => f.id === token.masterFichaId);
    if (f) { fullData = f.fullData; charName = f.name; }
  } else if (token.controlledBy === myPeerId && localFichaUpdateData) {
    fullData = localFichaUpdateData.fullData || localFichaUpdateData;
    charName = localFichaUpdateData.charName || charName;
  } else if (token.controlledBy && fichasJogadores[token.controlledBy]) {
    fullData = fichasJogadores[token.controlledBy].resumo?.fullData;
    charName = fichasJogadores[token.controlledBy].playerName;
  }
  return { fullData, charName };
}

function adicionarNovoAtaque() {
  if (BOARD.selectedTokens.size !== 1) { toast('Selecione exatamente 1 token.'); return; }
  const selId = BOARD.selectedTokens.values().next().value;
  const token = BOARD.tokens.find(t => t.id === selId);
  if (!token) { toast('Token não encontrado.'); return; }
  const { charName } = resolveFichaToken(token);
  const cacheKey = 'vtt_cache_' + charName + '_attacks';
  var items = [];
  try {
    var cached = localStorage.getItem(cacheKey);
    if (cached) items = JSON.parse(cached);
  } catch (e) {}
  if (!Array.isArray(items)) items = [];
  items.push({ name: 'Novo Ataque', attackBonus: 0, dmgFormula: '1d4', dmg: '1d4', pm: '', desc: '', options: [] });
  localStorage.setItem(cacheKey, JSON.stringify(items));
  abrirSeletorAtaquesToken(true);
}

function abrirSeletorAtaquesToken(isLockToggle) {
  if (BOARD.selectedTokens.size !== 1) { 
    if (!isLockToggle) toast('Selecione exatamente 1 token.'); 
    return; 
  }
  const selId = BOARD.selectedTokens.values().next().value;
  const token = BOARD.tokens.find(t => t.id === selId);
  if (!token) { 
    if (!isLockToggle) toast('Token não encontrado.'); 
    return; 
  }
  const { fullData, charName } = resolveFichaToken(token);
  
  const listEl = document.getElementById('seletorAtaquesList');
  if (!listEl) { toast('Erro de UI.'); return; }
  listEl.innerHTML = '';
  
  const titleEl = document.getElementById('seletorAtaquesTitle');
  if (titleEl) titleEl.textContent = 'Ataques (' + charName + ')';

  let items = [];
  const cacheKey = 'vtt_cache_' + charName + '_attacks';

  if (locksState.attacks) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        items = JSON.parse(cached);
      } catch (e) {
        console.error('Erro ao ler cache de ataques:', e);
      }
    }
  }

  if (!items || !items.length) {
    if (!fullData) { 
      if (!isLockToggle) toast('Este token não está vinculado a nenhuma ficha.'); 
      return; 
    }
    if (!fullData.attacks || !fullData.attacks.length) { 
      if (!isLockToggle) toast('Ficha sem ataques.'); 
      return; 
    }

    const level = parseInt(fullData.charLevel || 1) || 1;
    const halfLevel = Math.floor(level / 2);
    const trainBonus = level >= 15 ? 6 : (level >= 7 ? 4 : 2);

    fullData.attacks.forEach(a => {
      const bonusStr = a.bonus || '0';
      let attackBonus = parseInt(bonusStr) || 0;
      if (a.skill && fullData.skills) {
        const sk = fullData.skills.find(s => s.n === a.skill);
        if (sk) {
          let attrVal = parseInt((fullData.attrs && fullData.attrs[sk.a]) || 0) || 0;
          const trainedBonus = sk.trained ? trainBonus : 0;
          const skillTotal = halfLevel + attrVal + trainedBonus + (parseInt(sk.other) || 0);
          attackBonus = Math.max(attackBonus, skillTotal);
        }
      }
      const dmgBase = a.dmg || '1d4';
      const dmgExtraRaw = a.dmgExtra || '';
      const diceExtraRaw = a.diceExtra || '';
      const dmgExtra = dmgExtraRaw ? '+' + dmgExtraRaw : '';
      const diceExtra = diceExtraRaw ? '+' + diceExtraRaw : '';
      let dmgAttrStr = '';
      let dmgAttrVal = '';
      if (a.dmgAttr && fullData.attrs) {
        const attrVal = parseInt(fullData.attrs[a.dmgAttr]) || 0;
        if (attrVal !== 0) {
          dmgAttrStr = (attrVal > 0 ? '+' : '') + attrVal;
          dmgAttrVal = String(attrVal);
        }
      }
      const dmgFormula = dmgBase + dmgExtra + diceExtra + dmgAttrStr;
      
      items.push({
        name: a.name,
        attackBonus: attackBonus,
        dmg: dmgBase,
        dmgExtra: dmgExtraRaw || undefined,
        diceExtra: diceExtraRaw || undefined,
        dmgAttr: dmgAttrVal || undefined,
        dmgFormula: dmgFormula,
        critRange: a.critRange || undefined,
        critMult: a.crit || undefined
      });
    });

    localStorage.setItem(cacheKey, JSON.stringify(items));
  }

  items.forEach(item => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'stretch';
    row.style.gap = '0.3rem';
    row.style.marginBottom = '0.2rem';

    const btn = document.createElement('button');
    btn.style.flexGrow = '1';
    btn.style.display = 'flex';
    btn.style.justifyContent = 'space-between';
    btn.style.alignItems = 'center';
    btn.style.padding = '0.5rem 0.8rem';
    btn.style.background = 'var(--parch3)';
    btn.style.border = '1px solid var(--border)';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';
    btn.style.fontFamily = "'Cinzel', serif";
    btn.style.fontWeight = 'bold';
    btn.style.color = 'var(--text-color)';

    const leftSpan = document.createElement('span');
    leftSpan.textContent = item.name;

    const pmSpan = document.createElement('span');
    pmSpan.style.fontSize = '0.75rem';
    pmSpan.style.fontWeight = 'normal';
    pmSpan.style.marginLeft = '0.5rem';
    if (item.pm) {
      pmSpan.textContent = '[' + item.pm + ' PM]';
      pmSpan.style.color = '#ff4d4d';
    } else {
      pmSpan.style.display = 'none';
    }

    const rightSpan = document.createElement('span');
    rightSpan.style.fontSize = '0.75rem';
    rightSpan.style.color = '#ff4d4d';
    const atkTotal = item.attackBonus >= 0 ? '+' + item.attackBonus : item.attackBonus;
    const critStr = item.critRange && item.critMult ? ' | ' + item.critRange + '/x' + item.critMult : '';
    rightSpan.textContent = atkTotal + ' | ' + item.dmgFormula + critStr;

    btn.appendChild(leftSpan);
    btn.appendChild(pmSpan);
    btn.appendChild(rightSpan);

    btn.onclick = () => {
      var targetStr = _getTargetChatPrefix();
      var atkLabel = item.name;
      var targetIds = [];
      if (targetStr) {
        atkLabel = item.name + ' → ' + targetStr.replace('🎯 ', '').trim();
        if (BOARD.targetedTokens) BOARD.targetedTokens.forEach(function(id) { targetIds.push(id); });
      }
      if (item.desc) {
        var descText = '**' + item.name + ':** _' + descComImagem(item.desc, item.img) + '_';
        rotearMensagem({ type: 'text', name: myName, role: myRole, text: descText, time: formatTime(), visibility: chatVisibility });
      }

      // ── Rolagem unificada (estilo ficha) ──
      var rollMode = item.rollMode || 0;
      var d20, d20b, atkDiceLabel, textExtra;
      if (rollMode === 1) {
        var r1 = Math.floor(Math.random() * 20) + 1;
        var r2 = Math.floor(Math.random() * 20) + 1;
        d20 = Math.max(r1, r2); d20b = r1 === d20 ? r2 : r1;
        atkDiceLabel = '2d20 (vantagem)';
        textExtra = ' [' + r1 + ', ' + r2 + ']';
      } else if (rollMode === -1) {
        var r1 = Math.floor(Math.random() * 20) + 1;
        var r2 = Math.floor(Math.random() * 20) + 1;
        d20 = Math.min(r1, r2); d20b = r1 === d20 ? r2 : r1;
        atkDiceLabel = '2d20 (desvantagem)';
        textExtra = ' [' + r1 + ', ' + r2 + ']';
      } else {
        d20 = Math.floor(Math.random() * 20) + 1;
        atkDiceLabel = '1d20';
        textExtra = '';
      }
      var atkTotalVal = d20 + item.attackBonus;
      var critRange = parseInt(item.critRange) || 20;
      var critMult = parseInt((item.critMult || '').toString().replace('x', '')) || 2;
      var isCrit = d20 >= critRange;

      // Monta texto do ataque
      var bonusStr = item.attackBonus >= 0 ? '+' + item.attackBonus : '' + item.attackBonus;
      var text = '**⚔️ Ataque com ' + item.name + '**\n';
      if (targetStr) text += '**Alvo:** ' + targetStr.replace('🎯 ', '').trim() + '\n';
      text += '**Teste:** ' + atkDiceLabel + bonusStr + ' → **' + atkTotalVal + '**' + textExtra;
      if (isCrit) text += ' **(CRÍTICO!)**';
      text += '\n';

      // Rolagem de dano
      if (item.dmgFormula) {
        var dmgFormula = item.dmgFormula;
        if (isCrit && critMult > 1) {
          var critBase = item.dmg || item.dmgFormula;
          var critBaseMult = critBase.split('+').map(function(p) {
            var t = p.trim();
            if (/^\d*d\d+/i.test(t)) {
              var m = t.match(/^(\d*)d(\d+)/i);
              return (parseInt(m[1] || 1) * critMult) + 'd' + m[2];
            }
            if (/^\d+$/.test(t)) return parseInt(t) * critMult;
            return t;
          }).join('+');
          if (item.dmg && item.dmgFormula) {
            dmgFormula = item.dmgFormula.replace(item.dmg, critBaseMult);
          } else {
            dmgFormula = critBaseMult;
          }
        }
        var dmgResult = _rollDmgFormula(dmgFormula);
        var dmgTotal = parseInt(dmgResult) || 0;
        text += '**Dano:** **' + dmgTotal + '**';
        if (isCrit && critMult > 1) text += ' _(crítico x' + critMult + ')_';
        text += ' (Fórmula: ' + dmgFormula + ') [' + dmgResult + ']\n';
      }

      // Rolar dados 3D (se visibilidade global)
      if (chatVisibility === 'global') {
        if (rollMode !== 0 && d20b !== undefined) {
          rolarDados3d(20, 2, [r1, r2], d20 + item.attackBonus, item.attackBonus, '⚔️ ' + item.name + ': ');
        } else {
          rolarDados3d(20, 1, [d20], atkTotalVal, item.attackBonus, '⚔️ ' + item.name + ': ');
        }
      }

      var rollerName = myName;
      if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
        var tkId = BOARD.selectedTokens.values().next().value;
        var tk = BOARD.tokens.find(function(t) { return t.id === tkId; });
        if (tk && tk.name) rollerName = tk.name;
      }

      var dmgTotalFinal = (typeof dmgTotal !== 'undefined') ? dmgTotal : 0;

      rotearMensagem({ type: 'damage', name: rollerName, role: myRole, text: text, time: formatTime(), visibility: chatVisibility, targetIds: targetIds, dmgTotal: dmgTotalFinal });
      fecharSeletorAtaquesToken();
    };

    btn.onmouseover = () => btn.style.background = 'var(--parch1)';
    btn.onmouseout = () => btn.style.background = 'var(--parch3)';

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '⚙️';
    editBtn.title = 'Editar ataque';
    editBtn.style.width = '32px';
    editBtn.style.border = '1px solid #6c757d';
    editBtn.style.background = '#e2e3e5';
    editBtn.style.color = '#383d41';
    editBtn.style.borderRadius = '4px';
    editBtn.style.cursor = 'pointer';
    editBtn.style.display = 'flex';
    editBtn.style.justifyContent = 'center';
    editBtn.style.alignItems = 'center';
    editBtn.style.fontSize = '0.9rem';

    editBtn.onclick = () => {
      abrirDialogEditarAtaque(item, items, cacheKey, btn, pmSpan, rightSpan);
    };
    editBtn.onmouseover = () => editBtn.style.background = '#c8c9cb';
    editBtn.onmouseout = () => editBtn.style.background = '#e2e3e5';

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '🗑️';
    delBtn.title = 'Remover atalho';
    delBtn.style.width = '32px';
    delBtn.style.border = '1px solid #dc3545';
    delBtn.style.background = '#f8d7da';
    delBtn.style.color = '#721c24';
    delBtn.style.borderRadius = '4px';
    delBtn.style.cursor = 'pointer';
    delBtn.style.display = 'flex';
    delBtn.style.justifyContent = 'center';
    delBtn.style.alignItems = 'center';
    delBtn.style.fontSize = '0.9rem';

    delBtn.onclick = () => {
      row.remove();
      items = items.filter(x => x.name !== item.name || x.dmgFormula !== item.dmgFormula);
      localStorage.setItem(cacheKey, JSON.stringify(items));
    };
    delBtn.onmouseover = () => delBtn.style.background = '#f5c6cb';
    delBtn.onmouseout = () => delBtn.style.background = '#f8d7da';

    row.appendChild(btn);
    row.appendChild(editBtn);
    row.appendChild(delBtn);
    listEl.appendChild(row);
  });

  const modal = document.getElementById('seletorAtaquesModal');
  if (modal) modal.style.display = 'flex';
}

function abrirSeletorPericiasToken(isLockToggle) {
  if (BOARD.selectedTokens.size !== 1) {
    if (!isLockToggle) toast('Selecione exatamente 1 token.');
    return;
  }
  const selId = BOARD.selectedTokens.values().next().value;
  const token = BOARD.tokens.find(t => t.id === selId);
  if (!token) {
    if (!isLockToggle) toast('Token não encontrado na board.');
    return;
  }

  const { fullData, charName } = resolveFichaToken(token);

  const listEl = document.getElementById('seletorPericiasList');
  if (!listEl) {
    toast('Erro de UI: seletorPericiasList não encontrado.');
    return;
  }
  listEl.innerHTML = '';

  const titleEl = document.getElementById('seletorPericiasTitle');
  if (titleEl) titleEl.textContent = `Perícias (${charName})`;

  let items = [];
  const cacheKey = 'vtt_cache_' + charName + '_skills';

  if (locksState.skills) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        items = JSON.parse(cached);
      } catch (e) {
        console.error('Erro ao ler cache de perícias:', e);
      }
    }
  }

  if (!items || !items.length) {
    if (!fullData) {
      if (!isLockToggle) toast('Este token não está vinculado a nenhuma ficha.');
      return;
    }
    if (!fullData.skills) {
      if (!isLockToggle) toast('Ficha sem dados de perícias.');
      return;
    }

    const level = parseInt(fullData.charLevel || 1) || 1;
    const halfLevel = Math.floor(level / 2);
    const trainBonus = level >= 15 ? 6 : (level >= 7 ? 4 : 2);
    const TRAINED_ONLY_SKILLS = ["Adestramento", "Conhecimento", "Guerra", "Jogatina", "Ladinagem", "Misticismo", "Nobreza", "Pilotagem", "Religião"];

    fullData.skills.forEach(s => {
      let attrVal = parseInt((fullData.attrs && fullData.attrs[s.a]) || 0) || 0;
      if (fullData.tempMods && fullData.tempMods.globais) {
         const mod = parseInt(fullData.tempMods.globais[`attr${s.a}`]);
         if (!isNaN(mod)) attrVal += mod;
      }
      const other = parseInt(s.other) || 0;
      
      const isTrainedOnly = TRAINED_ONLY_SKILLS.includes(s.n);
      let total = halfLevel + attrVal + (s.trained ? trainBonus : 0) + other;
      
      const penaltySkills = ["Acrobacia", "Furtividade", "Ladinagem"];
      if (penaltySkills.includes(s.n) && fullData.defense && fullData.defense.armor) {
          const pen = parseInt(fullData.defense.armor.penalty);
          if (!isNaN(pen)) total -= pen;
      }
      if (penaltySkills.includes(s.n) && fullData.defense && fullData.defense.shield) {
          const pen = parseInt(fullData.defense.shield.penalty);
          if (!isNaN(pen)) total -= pen;
      }
      if (s.n === "Furtividade" && fullData.extras && fullData.extras.size) {
          const sz = parseInt(fullData.extras.size);
          if (!isNaN(sz)) total += sz;
      }

      const canRoll = !(isTrainedOnly && !s.trained);
      const displayTotal = canRoll ? (total >= 0 ? `+${total}` : total) : 'N/A';

      items.push({
        name: s.n,
        total: total,
        canRoll: canRoll,
        displayTotal: displayTotal
      });
    });

    localStorage.setItem(cacheKey, JSON.stringify(items));
  }

  items.forEach(item => {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'stretch';
    row.style.gap = '0.3rem';
    row.style.marginBottom = '0.2rem';

    const btn = document.createElement('button');
    btn.style.flexGrow = '1';
    btn.style.display = 'flex';
    btn.style.justifyContent = 'space-between';
    btn.style.alignItems = 'center';
    btn.style.padding = '0.5rem 0.8rem';
    btn.style.background = 'var(--parch3)';
    btn.style.border = '1px solid var(--border)';
    btn.style.borderRadius = '4px';
    btn.style.cursor = item.canRoll ? 'pointer' : 'not-allowed';
    btn.style.opacity = item.canRoll ? '1' : '0.6';
    btn.style.fontFamily = "'Cinzel', serif";
    btn.style.fontWeight = 'bold';
    btn.style.color = 'var(--text-color)';
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = item.name;
    
    const valSpan = document.createElement('span');
    valSpan.textContent = item.displayTotal;
    if (item.canRoll) {
       valSpan.style.color = (item.total >= 0 ? '#198754' : '#dc3545');
    } else {
       valSpan.style.color = '#777';
    }
    
    btn.appendChild(nameSpan);
    btn.appendChild(valSpan);

    btn.onclick = () => {
      if (item.options && item.options.length) {
        abrirDialogSelecionarOpcaoPericia(item);
        return;
      }
      if (item.canRoll) {
        var rollerName = myName;
        if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
          var tkId = BOARD.selectedTokens.values().next().value;
          var tk = BOARD.tokens.find(function(t) { return t.id === tkId; });
          if (tk && tk.name) rollerName = tk.name;
        }
        var vant = parseInt(item.rollMode) || 0;
        if (vant !== 0) {
          var r1 = Math.floor(Math.random() * 20) + 1;
          var r2 = Math.floor(Math.random() * 20) + 1;
          var chosen = vant === 1 ? Math.max(r1, r2) : Math.min(r1, r2);
          var totalRoll = chosen + item.total;
          var advLabel = vant === 1 ? ' (vantagem)' : ' (desvantagem)';
          var bonusStr = item.total >= 0 ? '+' + item.total : item.total;
          var text = item.name + ': 2d20' + advLabel + bonusStr + ' → **' + totalRoll + '** [' + r1 + ', ' + r2 + ']';
          rotearMensagem({ type: 'roll', name: rollerName, role: myRole, text: text, time: formatTime(), visibility: chatVisibility });
          detectarERolarIniciativa(text);
          if (chatVisibility === 'global') {
            rolarDados3d(20, 2, [r1, r2], chosen + item.total, item.total, item.name + ': ');
          }
        } else {
          executarMacro('/r ' + item.name + ':1d20' + (item.total >= 0 ? '+' : '') + item.total);
        }
      }
      fecharSeletorPericiasToken();
    };
    if (item.canRoll) {
      btn.onmouseover = () => btn.style.background = 'var(--parch1)';
      btn.onmouseout = () => btn.style.background = 'var(--parch3)';
    }

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '⚙️';
    editBtn.title = 'Editar perícia';
    editBtn.style.width = '32px';
    editBtn.style.border = '1px solid #6c757d';
    editBtn.style.background = '#e2e3e5';
    editBtn.style.color = '#383d41';
    editBtn.style.borderRadius = '4px';
    editBtn.style.cursor = 'pointer';
    editBtn.style.display = 'flex';
    editBtn.style.justifyContent = 'center';
    editBtn.style.alignItems = 'center';
    editBtn.style.fontSize = '0.9rem';

    editBtn.onclick = () => {
      abrirDialogEditarPericia(item, items, cacheKey, btn);
    };
    editBtn.onmouseover = () => editBtn.style.background = '#c8c9cb';
    editBtn.onmouseout = () => editBtn.style.background = '#e2e3e5';

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '🗑️';
    delBtn.title = 'Remover atalho';
    delBtn.style.width = '32px';
    delBtn.style.border = '1px solid #dc3545';
    delBtn.style.background = '#f8d7da';
    delBtn.style.color = '#721c24';
    delBtn.style.borderRadius = '4px';
    delBtn.style.cursor = 'pointer';
    delBtn.style.display = 'flex';
    delBtn.style.justifyContent = 'center';
    delBtn.style.alignItems = 'center';
    delBtn.style.fontSize = '0.9rem';

    delBtn.onclick = () => {
      row.remove();
      items = items.filter(x => x.name !== item.name);
      localStorage.setItem(cacheKey, JSON.stringify(items));
    };
    delBtn.onmouseover = () => delBtn.style.background = '#f5c6cb';
    delBtn.onmouseout = () => delBtn.style.background = '#f8d7da';

    row.appendChild(btn);
    row.appendChild(editBtn);
    row.appendChild(delBtn);
    listEl.appendChild(row);
  });

  const modal = document.getElementById('seletorPericiasModal');
  if (modal) {
    modal.style.display = 'flex';
  } else {
    toast('Modal seletorPericiasModal não encontrado no DOM!');
  }
}

function abrirSeletorMagiasToken(isLockToggle) {
  if (BOARD.selectedTokens.size !== 1) { 
    if (!isLockToggle) toast('Selecione exatamente 1 token.'); 
    return; 
  }
  const selId = BOARD.selectedTokens.values().next().value;
  const token = BOARD.tokens.find(t => t.id === selId);
  if (!token) { 
    if (!isLockToggle) toast('Token não encontrado.'); 
    return; 
  }
  const { fullData, charName } = resolveFichaToken(token);

  const listEl = document.getElementById('seletorMagiasList');
  if (!listEl) { toast('Erro de UI.'); return; }
  listEl.innerHTML = '';

  const titleEl = document.getElementById('seletorMagiasTitle');
  if (titleEl) titleEl.textContent = 'Magias (' + charName + ')';

  let items = [];
  const cacheKey = 'vtt_cache_' + charName + '_spells';

  if (locksState.spells) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        items = JSON.parse(cached);
      } catch (e) {
        console.error('Erro ao ler cache de magias:', e);
      }
    }
  }

  if (!items || !items.length) {
    if (!fullData) { 
      if (!isLockToggle) toast('Este token não está vinculado a nenhuma ficha.'); 
      return; 
    }
    const spellsList = fullData.spells && fullData.spells.list;
    if (!spellsList || !spellsList.length) { 
      if (!isLockToggle) toast('Ficha sem magias.'); 
      return; 
    }

    const circleLabels = { 1: '1º', 2: '2º', 3: '3º', 4: '4º', 5: '5º' };
    spellsList.forEach(function(sp) {
      if (!sp || !sp.name) return;
      const circLabel = circleLabels[sp.circle] || sp.circle + 'º';
      items.push({
        name: sp.name,
        circle: sp.circle,
        circLabel: circLabel,
        pm: sp.pm || '—',
        school: sp.school || '—',
        exec: sp.exec || '—',
        range: sp.range || '—',
        target: sp.target || '—',
        dur: sp.dur || '—',
        res: sp.res || '—',
        desc: sp.desc || ''
      });
    });

    localStorage.setItem(cacheKey, JSON.stringify(items));
  }

  items.forEach(function(item) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'stretch';
    row.style.gap = '0.3rem';
    row.style.marginBottom = '0.2rem';

    var btn = document.createElement('button');
    btn.style.flexGrow = '1';
    btn.style.display = 'flex';
    btn.style.justifyContent = 'space-between';
    btn.style.alignItems = 'center';
    btn.style.padding = '0.5rem 0.8rem';
    btn.style.background = 'var(--parch3)';
    btn.style.border = '1px solid var(--border)';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';
    btn.style.fontFamily = "'Cinzel', serif";
    btn.style.fontWeight = 'bold';
    btn.style.color = 'var(--text-color)';

    var leftSpan = document.createElement('span');
    leftSpan.textContent = item.name;

    var rightSpan = document.createElement('span');
    rightSpan.style.fontSize = '0.7rem';
    rightSpan.style.color = '#c77dff';
    rightSpan.textContent = item.circLabel + ' Círculo · ' + item.pm + ' PM';

    btn.appendChild(leftSpan);
    btn.appendChild(rightSpan);

    btn.onclick = function() {
      var targetStr = _getTargetChatPrefix();
      var targetIds = [];
      if (targetStr && BOARD.targetedTokens) {
        BOARD.targetedTokens.forEach(function(id) { targetIds.push(id); });
      }
      var text = '**Magia:** ' + item.name + ' (' + item.circLabel + ' Círculo · ' + item.pm + ' PM)\n';
      if (targetStr) text += '**Alvo(s):** ' + targetStr.replace('🎯 ', '') + '\n';
      text += '**Escola:** ' + item.school + ' | **Execução:** ' + item.exec + ' | **Alcance:** ' + item.range + ' | **Alvo/Área:** ' + item.target + ' | **Duração:** ' + item.dur + ' | **Resistência:** ' + item.res + '\n';
      text += '_' + descComImagem(item.desc, item.img) + '_';
      var rollerName = myName;
      var sourceTokenId = null;
      if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
        var tkId = BOARD.selectedTokens.values().next().value;
        sourceTokenId = tkId;
        var tk = BOARD.tokens.find(function(t) { return t.id === tkId; });
        if (tk && tk.name) rollerName = tk.name;
      }
      fecharSeletorMagiasToken();
      rotearMensagem({ type: 'spell', name: rollerName, role: myRole, text: text, time: formatTime(), visibility: chatVisibility });
      setTimeout(function() {
        var pmVal = parseInt(item.pm) || 0;
        abrirDialogRolagemMagia(item.name, item.desc, rollerName, targetIds, pmVal, sourceTokenId);
      }, 100);
    };

    btn.onmouseover = function() { btn.style.background = 'var(--parch1)'; };
    btn.onmouseout = function() { btn.style.background = 'var(--parch3)'; };

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '⚙️';
    editBtn.title = 'Editar magia';
    editBtn.style.width = '32px';
    editBtn.style.border = '1px solid #6c757d';
    editBtn.style.background = '#e2e3e5';
    editBtn.style.color = '#383d41';
    editBtn.style.borderRadius = '4px';
    editBtn.style.cursor = 'pointer';
    editBtn.style.display = 'flex';
    editBtn.style.justifyContent = 'center';
    editBtn.style.alignItems = 'center';
    editBtn.style.fontSize = '0.9rem';

    editBtn.onclick = () => {
      abrirDialogEditarMagia(item, items, cacheKey, btn, rightSpan);
    };
    editBtn.onmouseover = () => editBtn.style.background = '#c8c9cb';
    editBtn.onmouseout = () => editBtn.style.background = '#e2e3e5';

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '🗑️';
    delBtn.title = 'Remover atalho';
    delBtn.style.width = '32px';
    delBtn.style.border = '1px solid #dc3545';
    delBtn.style.background = '#f8d7da';
    delBtn.style.color = '#721c24';
    delBtn.style.borderRadius = '4px';
    delBtn.style.cursor = 'pointer';
    delBtn.style.display = 'flex';
    delBtn.style.justifyContent = 'center';
    delBtn.style.alignItems = 'center';
    delBtn.style.fontSize = '0.9rem';

    delBtn.onclick = () => {
      row.remove();
      items = items.filter(x => x.name !== item.name);
      localStorage.setItem(cacheKey, JSON.stringify(items));
    };
    delBtn.onmouseover = () => delBtn.style.background = '#f5c6cb';
    delBtn.onmouseout = () => delBtn.style.background = '#f8d7da';

    row.appendChild(btn);
    row.appendChild(editBtn);
    row.appendChild(delBtn);
    listEl.appendChild(row);
  });

  var modal = document.getElementById('seletorMagiasModal');
  if (modal) modal.style.display = 'flex';
}

function fecharSeletorMagiasToken() {
  var modal = document.getElementById('seletorMagiasModal');
  if (modal) modal.style.display = 'none';
}

var _editarMagiaData = null;

function abrirDialogEditarMagia(item, items, cacheKey, btn, rightSpan) {
  document.getElementById('editarMagiaNome').value = item.name || '';
  document.getElementById('editarMagiaPM').value = item.pm || '';
  document.getElementById('editarMagiaDesc').value = item.desc || '';
  document.getElementById('editarMagiaImg').value = item.img || '';
  _editarMagiaData = { item: item, items: items, cacheKey: cacheKey, btn: btn, rightSpan: rightSpan };
  document.getElementById('editarMagiaDialog').style.display = 'flex';
}

function fecharDialogEditarMagia() {
  document.getElementById('editarMagiaDialog').style.display = 'none';
  _editarMagiaData = null;
}

function salvarDialogEditarMagia() {
  if (!_editarMagiaData) return;
  var d = _editarMagiaData;
  var item = d.item;
  var nome = document.getElementById('editarMagiaNome').value.trim();
  var pm = document.getElementById('editarMagiaPM').value.trim();
  var desc = document.getElementById('editarMagiaDesc').value.trim();

  if (nome) item.name = nome;
  if (pm) item.pm = pm;
  else item.pm = '—';
  item.desc = desc;
  var img = document.getElementById('editarMagiaImg').value.trim();
  if (img) item.img = img;
  else delete item.img;

  localStorage.setItem(d.cacheKey, JSON.stringify(d.items));

  var leftSpan = d.btn.children[0];
  if (leftSpan) leftSpan.textContent = item.name;

  d.rightSpan.textContent = item.circLabel + ' Círculo · ' + item.pm + ' PM';

  fecharDialogEditarMagia();
}

function abrirSeletorPoderesToken(isLockToggle) {
  if (BOARD.selectedTokens.size !== 1) { 
    if (!isLockToggle) toast('Selecione exatamente 1 token.'); 
    return; 
  }
  const selId = BOARD.selectedTokens.values().next().value;
  const token = BOARD.tokens.find(t => t.id === selId);
  if (!token) { 
    if (!isLockToggle) toast('Token não encontrado.'); 
    return; 
  }
  const { fullData, charName } = resolveFichaToken(token);

  const listEl = document.getElementById('seletorPoderesList');
  if (!listEl) { toast('Erro de UI.'); return; }
  listEl.innerHTML = '';

  const titleEl = document.getElementById('seletorPoderesTitle');
  if (titleEl) titleEl.textContent = 'Poderes (' + charName + ')';

  let items = [];
  const cacheKey = 'vtt_cache_' + charName + '_powers';

  if (locksState.powers) {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        items = JSON.parse(cached);
      } catch (e) {
        console.error('Erro ao ler cache de poderes/habilidades:', e);
      }
    }
  }

  if (!items || !items.length) {
    if (!fullData) { 
      if (!isLockToggle) toast('Este token não está vinculado a nenhuma ficha.'); 
      return; 
    }
    const raceAb = fullData.raceAbilities || [];
    const classAb = fullData.classAbilities || [];
    if (!raceAb.length && !classAb.length) { 
      if (!isLockToggle) toast('Ficha sem habilidades ou poderes.'); 
      return; 
    }

    raceAb.forEach(function(ab) {
      if (ab && ab.name) items.push({ name: ab.name, desc: ab.desc, type: 'Raça' });
    });
    classAb.forEach(function(ab) {
      if (ab && ab.name) items.push({ name: ab.name, desc: ab.desc, type: 'Classe/Poder' });
    });

    localStorage.setItem(cacheKey, JSON.stringify(items));
  }

  items.forEach(function(item) {
    const row = document.createElement('div');
    row.style.display = 'flex';
    row.style.alignItems = 'stretch';
    row.style.gap = '0.3rem';
    row.style.marginBottom = '0.2rem';

    var btn = document.createElement('button');
    btn.style.flexGrow = '1';
    btn.style.display = 'flex';
    btn.style.justifyContent = 'space-between';
    btn.style.alignItems = 'center';
    btn.style.padding = '0.5rem 0.8rem';
    btn.style.background = 'var(--parch3)';
    btn.style.border = '1px solid var(--border)';
    btn.style.borderRadius = '4px';
    btn.style.cursor = 'pointer';
    btn.style.fontFamily = "'Cinzel', serif";
    btn.style.fontWeight = 'bold';
    btn.style.color = 'var(--text-color)';

    var leftSpan = document.createElement('span');
    leftSpan.textContent = item.name;

    var pmSpan = document.createElement('span');
    pmSpan.style.fontSize = '0.75rem';
    pmSpan.style.fontWeight = 'normal';
    pmSpan.style.marginLeft = '0.5rem';
    if (item.pm) {
      pmSpan.textContent = '[' + item.pm + ' PM]';
      pmSpan.style.color = '#2ecc71';
    } else {
      pmSpan.style.display = 'none';
    }

    var rightSpan = document.createElement('span');
    rightSpan.style.fontSize = '0.7rem';
    rightSpan.style.color = '#2ecc71';
    rightSpan.textContent = item.type;

    btn.appendChild(leftSpan);
    btn.appendChild(pmSpan);
    btn.appendChild(rightSpan);

    btn.onclick = function() {
      if (item.options && item.options.length) {
        abrirDialogSelecionarOpcaoPoder(item);
        return;
      }
      var text = '**Poder/Habilidade:** ' + item.name + ' (' + item.type + ')\n';
      if (item.pm) text += '**Custo:** ' + item.pm + ' PM\n';
      text += '_' + descComImagem(item.desc, item.img) + '_';

      var rollerName = myName;
      if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
        var tkId = BOARD.selectedTokens.values().next().value;
        var tk = BOARD.tokens.find(function(t) { return t.id === tkId; });
        if (tk && tk.name) rollerName = tk.name;
      }

      fecharSeletorPoderesToken();
      rotearMensagem({ type: 'ability', name: rollerName, role: myRole, text: text, time: formatTime(), visibility: chatVisibility });
    };

    btn.onmouseover = function() { btn.style.background = 'var(--parch1)'; };
    btn.onmouseout = function() { btn.style.background = 'var(--parch3)'; };

    const editBtn = document.createElement('button');
    editBtn.innerHTML = '⚙️';
    editBtn.title = 'Editar poder';
    editBtn.style.width = '32px';
    editBtn.style.border = '1px solid #6c757d';
    editBtn.style.background = '#e2e3e5';
    editBtn.style.color = '#383d41';
    editBtn.style.borderRadius = '4px';
    editBtn.style.cursor = 'pointer';
    editBtn.style.display = 'flex';
    editBtn.style.justifyContent = 'center';
    editBtn.style.alignItems = 'center';
    editBtn.style.fontSize = '0.9rem';

    editBtn.onclick = () => {
      abrirDialogEditarPoder(item, items, cacheKey, btn, pmSpan);
    };
    editBtn.onmouseover = () => editBtn.style.background = '#c8c9cb';
    editBtn.onmouseout = () => editBtn.style.background = '#e2e3e5';

    const delBtn = document.createElement('button');
    delBtn.innerHTML = '🗑️';
    delBtn.title = 'Remover atalho';
    delBtn.style.width = '32px';
    delBtn.style.border = '1px solid #dc3545';
    delBtn.style.background = '#f8d7da';
    delBtn.style.color = '#721c24';
    delBtn.style.borderRadius = '4px';
    delBtn.style.cursor = 'pointer';
    delBtn.style.display = 'flex';
    delBtn.style.justifyContent = 'center';
    delBtn.style.alignItems = 'center';
    delBtn.style.fontSize = '0.9rem';

    delBtn.onclick = () => {
      row.remove();
      items = items.filter(x => x.name !== item.name || x.type !== item.type);
      localStorage.setItem(cacheKey, JSON.stringify(items));
    };
    delBtn.onmouseover = () => delBtn.style.background = '#f5c6cb';
    delBtn.onmouseout = () => delBtn.style.background = '#f8d7da';

    row.appendChild(btn);
    row.appendChild(editBtn);
    row.appendChild(delBtn);
    listEl.appendChild(row);
  });

  var modal = document.getElementById('seletorPoderesModal');
  if (modal) modal.style.display = 'flex';
}

function fecharSeletorPoderesToken() {
  var modal = document.getElementById('seletorPoderesModal');
  if (modal) modal.style.display = 'none';
}

var _editarPoderData = null;
var _editarPoderOptionsIdx = 0;

function adicionarOpcaoPoder(descVal, pmVal) {
  var container = document.getElementById('editarPoderOpcoes');
  if (!container) return;
  var idx = _editarPoderOptionsIdx++;
  var div = document.createElement('div');
  div.id = 'editarPoderOpcao_' + idx;
  div.style.display = 'flex';
  div.style.gap = '4px';
  div.style.alignItems = 'stretch';
  div.innerHTML = '<input id="editarPoderOpcaoDesc_' + idx + '" type="text" placeholder="Descrição da opção" style="flex-grow:1;padding:0.3rem;border:1px solid #444;border-radius:4px;background:#1a1a1a;color:#e8d5a3;font-family:\'Cinzel\',serif;font-size:0.75rem;box-sizing:border-box;" value="' + (descVal || '') + '">' +
    '<input id="editarPoderOpcaoPM_' + idx + '" type="text" placeholder="PM" style="width:50px;padding:0.3rem;border:1px solid #444;border-radius:4px;background:#1a1a1a;color:#e8d5a3;font-family:\'Cinzel\',serif;font-size:0.75rem;box-sizing:border-box;text-align:center;" value="' + (pmVal || '') + '">' +
    '<button onclick="this.parentElement.remove()" style="width:28px;border:1px solid #dc3545;background:#f8d7da;color:#721c24;border-radius:4px;cursor:pointer;font-size:0.8rem;display:flex;justify-content:center;align-items:center;">✕</button>';
  container.appendChild(div);
}

function abrirDialogEditarPoder(item, items, cacheKey, btn, pmSpan) {
  document.getElementById('editarPoderNome').value = item.name || '';
  document.getElementById('editarPoderPM').value = item.pm || '';
  document.getElementById('editarPoderDesc').value = item.desc || '';
  document.getElementById('editarPoderImg').value = item.img || '';
  _editarPoderData = { item: item, items: items, cacheKey: cacheKey, btn: btn, pmSpan: pmSpan };
  var container = document.getElementById('editarPoderOpcoes');
  container.innerHTML = '';
  _editarPoderOptionsIdx = 0;
  if (item.options && item.options.length) {
    item.options.forEach(function(o) {
      adicionarOpcaoPoder(o.desc, o.pm);
    });
  }
  document.getElementById('editarPoderDialog').style.display = 'flex';
}

function fecharDialogEditarPoder() {
  document.getElementById('editarPoderDialog').style.display = 'none';
  _editarPoderData = null;
}

function salvarDialogEditarPoder() {
  if (!_editarPoderData) return;
  var d = _editarPoderData;
  var item = d.item;
  var nome = document.getElementById('editarPoderNome').value.trim();
  var pm = document.getElementById('editarPoderPM').value.trim();
  var desc = document.getElementById('editarPoderDesc').value.trim();

  if (nome) item.name = nome;
  if (pm) item.pm = pm;
  else delete item.pm;
  item.desc = desc;
  var img = document.getElementById('editarPoderImg').value.trim();
  if (img) item.img = img;
  else delete item.img;

  var options = [];
  var container = document.getElementById('editarPoderOpcoes');
  if (container) {
    var children = container.children;
    for (var i = 0; i < children.length; i++) {
      var child = children[i];
      var descInput = child.querySelector('input[id^="editarPoderOpcaoDesc_"]');
      var pmInput = child.querySelector('input[id^="editarPoderOpcaoPM_"]');
      if (descInput && descInput.value.trim()) {
        options.push({ desc: descInput.value.trim(), pm: pmInput ? pmInput.value.trim() : '' });
      }
    }
  }
  if (options.length) item.options = options;
  else delete item.options;

  localStorage.setItem(d.cacheKey, JSON.stringify(d.items));

  var leftSpan = d.btn.children[0];
  if (leftSpan) leftSpan.textContent = item.name;

  if (item.pm) {
    d.pmSpan.textContent = '[' + item.pm + ' PM]';
    d.pmSpan.style.display = '';
    d.pmSpan.style.color = '#2ecc71';
  } else {
    d.pmSpan.style.display = 'none';
  }

  fecharDialogEditarPoder();
}

var _selecionarOpcaoPoderData = null;

function abrirDialogSelecionarOpcaoPoder(item) {
  var titleEl = document.getElementById('selecionarOpcaoPoderTitle');
  if (titleEl) titleEl.textContent = '⚡ ' + item.name;
  var listEl = document.getElementById('selecionarOpcaoPoderList');
  if (!listEl) return;
  listEl.innerHTML = '';
  _selecionarOpcaoPoderData = { item: item };

  var opcoes = [];
  if (item.desc) {
    opcoes.push({ desc: item.desc, pm: item.pm || '', _base: true });
  }
  (item.options || []).forEach(function(o) { opcoes.push(o); });
  opcoes.forEach(function(opcao, idx) {
    var row = document.createElement('div');
    row.style.display = 'flex';
    row.style.flexDirection = 'column';
    row.style.background = 'rgba(46,204,113,0.1)';
    row.style.border = '1px solid #2ecc71';
    row.style.borderRadius = '6px';
    row.style.padding = '0.5rem 0.8rem';
    row.style.cursor = 'pointer';
    row.style.fontFamily = "'Cinzel', serif";

    var descEl = document.createElement('div');
    descEl.style.fontSize = '0.75rem';
    descEl.style.color = '#e8d5a3';
    descEl.style.lineHeight = '1.3';
    descEl.textContent = opcao.desc;

    var pmEl = document.createElement('div');
    pmEl.style.fontSize = '0.65rem';
    pmEl.style.color = '#2ecc71';
    pmEl.style.marginTop = '4px';
    pmEl.textContent = opcao._base ? (opcao.pm ? 'Base · ' + opcao.pm + ' PM' : 'Base') : (opcao.pm ? '+ ' + opcao.pm + ' PM' : 'Sem custo');

    row.appendChild(descEl);
    row.appendChild(pmEl);

    row.onmouseover = function() { row.style.background = 'rgba(46,204,113,0.25)'; };
    row.onmouseout = function() { row.style.background = 'rgba(46,204,113,0.1)'; };

    row.onclick = function() {
      var text = '**Poder/Habilidade:** ' + item.name + ' (' + (item.type || '') + ')\n';
      if (opcao.pm) text += '**Custo:** ' + opcao.pm + ' PM\n';
      text += '_' + descComImagem(opcao.desc, item.img) + '_';

      var rollerName = myName;
      if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
        var tkId = BOARD.selectedTokens.values().next().value;
        var tk = BOARD.tokens.find(function(t) { return t.id === tkId; });
        if (tk && tk.name) rollerName = tk.name;
      }

      fecharDialogSelecionarOpcaoPoder();
      fecharSeletorPoderesToken();
      rotearMensagem({ type: 'ability', name: rollerName, role: myRole, text: text, time: formatTime(), visibility: chatVisibility });
    };

    listEl.appendChild(row);
  });

  document.getElementById('selecionarOpcaoPoderDialog').style.display = 'flex';
}

function fecharDialogSelecionarOpcaoPoder() {
  document.getElementById('selecionarOpcaoPoderDialog').style.display = 'none';
  _selecionarOpcaoPoderData = null;
}

function vincularFichaAToken(type, id) {
  if (!contextTokenId) return;
  snapshotBoard();
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (token) {
    if (type === 'mestre') {
      token.masterFichaId = id;
      token.controlledBy = '';
    } else if (type === 'jogador') {
      token.controlledBy = id;
      token.masterFichaId = null;
    } else {
      token.controlledBy = '';
      token.masterFichaId = null;
    }
    boardSave();
    boardRender();
    syncBoardTokensToPlayers();
    toast('Vínculo atualizado.');
  }
  fecharContextMenu();
}

function atualizarVisaoJogadorPorSelecao() {
  atualizarBotoesTokenSelected();
  if (myRole !== 'mestre') return;
  if (BOARD.selectedTokens.size === 1) {
    const selId = BOARD.selectedTokens.values().next().value;
    const token = BOARD.tokens.find(t => t.id === selId);
    if (token) {
      if (token.type === 'object') {
        if (BOARD.playerViewTokenId) exitPlayerView();
        return;
      }
      if (BOARD.playerViewTokenId !== token.id) {
        BOARD.playerViewTokenId = token.id;
        BOARD.playerViewTokenName = token.name || 'Jogador';
        BOARD.followTokenId = token.id;
        atualizarFogJogador();
        mostrarBarraVisaoJogador();
        const btn = document.getElementById('btnSeguirPlayerView');
        if (btn) {
          btn.textContent = '🎯 Seguindo';
          btn.style.borderColor = '#4caf50';
          btn.style.color = '#4caf50';
        }
      }
    } else {
      if (BOARD.playerViewTokenId) exitPlayerView();
    }
  } else {
    if (BOARD.playerViewTokenId) exitPlayerView();
  }
}

function exitPlayerView() {
  if (BOARD.followTokenId === BOARD.playerViewTokenId) {
    BOARD.followTokenId = null;
    const btn = document.getElementById('btnSeguirPlayerView');
    if (btn) { btn.textContent = '🎯 Seguir'; btn.style.borderColor = '#00bfff'; btn.style.color = '#00bfff'; }
  }
  BOARD.playerViewTokenId = null;
  BOARD.playerViewTokenName = '';
  esconderBarraVisaoJogador();
  atualizarFogJogador();
}

function emVisaoJogador() {
  return myRole === 'mestre' && BOARD.playerViewTokenId;
}

function toggleSeguirTokenUI() {
  const sel = BOARD.selectedTokens;
  if (sel.size === 0) { toast('Selecione um token primeiro.'); return; }
  const firstId = sel.values().next().value;
  const ativou = toggleSeguirToken(firstId);
  const btn = document.getElementById('btnSeguirToken');
  if (btn) btn.classList.toggle('active', ativou);
  toast(ativou ? 'Seguindo token.' : 'Seguir desativado.');
}

function toggleSeguirPlayerView() {
  if (!BOARD.playerViewTokenId) return;
  const ativou = toggleSeguirToken(BOARD.playerViewTokenId);
  const btn = document.getElementById('btnSeguirPlayerView');
  if (btn) {
    btn.textContent = ativou ? '🎯 Seguindo' : '🎯 Seguir';
    btn.style.borderColor = ativou ? '#4caf50' : '#00bfff';
    btn.style.color = ativou ? '#4caf50' : '#00bfff';
  }
  toast(ativou ? 'Seguindo jogador.' : 'Seguir desativado.');
}

function popularCtxCondicoes(token) {
  const sub = document.getElementById('ctxCondSubmenu');
  if (!sub) return;
  const ativas = token.conditions || [];
  sub.innerHTML = '';

  // Opção "Remover Todas" no topo (só se houver condições ativas)
  if (ativas.length > 0) {
    const remAll = document.createElement('div');
    remAll.className = 'ctx-cond-item';
    remAll.style.borderBottom = '1px solid var(--border)';
    remAll.style.marginBottom = '4px';
    remAll.style.paddingBottom = '4px';
    remAll.style.color = '#ff6b6b';
    remAll.textContent = '🗑 Remover Todas Condições';
    remAll.onclick = (e) => {
      e.stopPropagation();
      snapshotBoard();
      const t = BOARD.tokens.find(tk => tk.id === contextTokenId);
      if (!t) return;
      t.conditions = [];
      boardSave();
      boardRender();
      syncBoardTokensToPlayers();
      popularCtxCondicoes(t);
      _syncCondToLinkedSheet(t);
      fecharContextMenu();
    };
    sub.appendChild(remAll);
  }

  CONDITION_LIST.forEach(c => {
    const div = document.createElement('div');
    div.className = 'ctx-cond-item';
    const emoji = CONDITION_EMOJI[c] || '?';
    const checked = ativas.includes(c) ? '✓ ' : '  ';
    div.textContent = `${emoji} ${checked}${c}`;
    div.onclick = (e) => { e.stopPropagation(); toggleTokenCondition(contextTokenId, c); };
    if (ativas.includes(c)) div.classList.add('active');
    // Tooltip com a descrição da condição ao passar o mouse
    const desc = CONDITION_INFO[c];
    if (desc) {
      div.addEventListener('mouseenter', () => { _mostrarCtxCondTooltip(div, c, desc); });
      div.addEventListener('mouseleave', _esconderCtxCondTooltip);
    }
    sub.appendChild(div);
  });
}

function _mostrarCtxCondTooltip(el, nome, desc) {
  const tip = document.getElementById('ctxCondTooltip');
  if (!tip) return;
  tip.innerHTML = `<strong>${escHTML(nome)}</strong><br><span class="ctx-cond-tip-desc">${escHTML(desc)}</span>`;
  tip.style.display = 'block';
  const rect = el.getBoundingClientRect();
  let x = rect.right + 8;
  let y = rect.top;
  tip.style.left = '0px';
  tip.style.top = '0px';
  const w = tip.offsetWidth, h = tip.offsetHeight;
  if (x + w > window.innerWidth - 8) x = rect.left - w - 8;
  if (y + h > window.innerHeight - 8) y = window.innerHeight - h - 8;
  tip.style.left = x + 'px';
  tip.style.top = y + 'px';
}

function _esconderCtxCondTooltip() {
  const tip = document.getElementById('ctxCondTooltip');
  if (tip) tip.style.display = 'none';
}

// Mapeamento: nomes das condições do board → chaves das condições da ficha
const COND_BOARD_TO_SHEET = {
  "Abalado": "abalado", "Agarrado": "agarrado", "Alquebrado": "alquebrado",
  "Apavorado": "apavorado", "Atordoado": "atordoado", "Caído": "caido",
  "Cego": "cego", "Confuso": "confuso", "Debilitado": "debilitado",
  "Desprevenido": "desprevenido", "Doente": "doente", "Em Chamas": "em_chamas",
  "Enfeitiçado": "enfeitiçado", "Enjoado": "enjoado", "Enredado": "enredado",
  "Envenenado": "envenenado", "Esmorecido": "esmorecido", "Exausto": "exausto",
  "Fascinado": "fascinado", "Fatigado": "fatigado", "Fraco": "fraco",
  "Frustrado": "frustrado", "Imóvel": "imovel", "Inconsciente": "inconsciente",
  "Indefeso": "indefeso", "Lento": "lento", "Ofuscado": "ofuscado",
  "Paralisado": "paralisado", "Pasmo": "pasmo", "Petrificado": "petrificacao",
  "Sangrando": "sangrando", "Surdo": "surdo", "Surpreendido": "surpreendido",
  "Vulnerável": "vulneravel"
};

function _syncCondToLinkedSheet(token) {
  if (!token) return;
  const sheetCondKeys = (token.conditions || [])
    .map(c => COND_BOARD_TO_SHEET[c])
    .filter(k => k);

  // Token vinculado a uma ficha de mestre
  if (token.masterFichaId) {
    const fichas = getMasterFichas();
    const f = fichas.find(item => item.id === token.masterFichaId);
    if (f && f.fullData) {
      f.fullData.condicoes = sheetCondKeys;
      saveMasterFichas(fichas);
      if (currentMasterFichaId === token.masterFichaId) {
        const iframe = document.getElementById('ficha-iframe');
        if (iframe && iframe.contentWindow)
          iframe.contentWindow.postMessage({ type: 'vtt-set-conditions', condicoes: sheetCondKeys }, '*');
      }
    }
  }

  // Token vinculado ao próprio jogador (ficha aberta)
  if (token.controlledBy === myPeerId && fichaAberta) {
    const iframe = document.getElementById('ficha-iframe');
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage({ type: 'vtt-set-conditions', condicoes: sheetCondKeys }, '*');
    }
    if (localFichaUpdateData && localFichaUpdateData.fullData)
      localFichaUpdateData.fullData.condicoes = sheetCondKeys;
  }
}

// ══════════════════════════════════════════════════════
//  EFEITOS DE CONDIÇÕES NO CLIENTE DO JOGADOR
// ══════════════════════════════════════════════════════

/**
 * Aplica efeitos visuais/funcionais no cliente do jogador com base nas condições
 * do token que ele controla. Chamada sempre que tokens são atualizados.
 */
function applyPlayerConditionEffects() {
  if (myRole !== 'jogador' && myRole !== 'mestre') return;

  // Pegar o token controlado pelo jogador atual
  const meuToken = BOARD.tokens.find(t => t.controlledBy === myPeerId);
  const conds = (meuToken && meuToken.conditions) ? meuToken.conditions : [];

  // ── Overlay de tela (Cego / Inconsciente / Ofuscado de tela) ──
  _atualizarOverlayCondicao(conds);

  // ── Surdo: muta o áudio ambiente ──
  _aplicarSurdo(conds);

  // ── Efeito visual global de Ofuscado na câmera ──
  _aplicarOfuscadoCanvas(conds);
}

function _atualizarOverlayCondicao(conds) {
  let overlay = document.getElementById('condition-screen-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.id = 'condition-screen-overlay';
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9998',
      'pointer-events:none', 'transition:opacity 0.6s ease',
      'display:none'
    ].join(';');
    document.body.appendChild(overlay);
  }

  const isCego        = conds.indexOf('Cego') !== -1;
  const isInconsciente= conds.indexOf('Inconsciente') !== -1;
  const isPetrificado = conds.indexOf('Petrificado') !== -1;
  const isOfuscado    = conds.indexOf('Ofuscado') !== -1;
  const isSangrando   = conds.indexOf('Sangrando') !== -1;
  const isApavorado   = conds.indexOf('Apavorado') !== -1 || conds.indexOf('Abalado') !== -1;
  const isConfuso     = conds.indexOf('Confuso') !== -1;
  const isEmChamas    = conds.indexOf('Em Chamas') !== -1;

  // Injetar keyframes globais se necessário
  if (!document.getElementById('cond-keyframes')) {
    const style = document.createElement('style');
    style.id = 'cond-keyframes';
    style.textContent = `
      @keyframes pulseOfuscado { 0%,100%{opacity:1} 50%{opacity:0.5} }
      @keyframes pulseSangrando { 0%,100%{box-shadow:inset 0 0 0 rgba(180,0,0,0)} 50%{box-shadow:inset 0 0 80px rgba(180,0,0,0.55)} }
      @keyframes shakeConfuso { 0%,100%{transform:rotate(0deg)} 20%{transform:rotate(-1.5deg)} 60%{transform:rotate(1.2deg)} }
      @keyframes vignetteApavorado { 0%,100%{opacity:0.7} 50%{opacity:0.95} }
      @keyframes pulseEmChamas { 0%,100%{box-shadow:inset 0 0 0 rgba(255,80,0,0)} 50%{box-shadow:inset 0 0 80px rgba(255,80,0,0.5)} }
    `;
    document.head.appendChild(style);
  }

  if (isInconsciente) {
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9998',
      'pointer-events:none',
      'background:rgba(0,0,0,0.88)',
      'display:flex', 'align-items:center', 'justify-content:center',
      'flex-direction:column'
    ].join(';');
    overlay.innerHTML = `
      <div style="color:#aaa;font-family:Cinzel,serif;font-size:2rem;text-shadow:0 0 20px #000;opacity:0.9;">💤 Inconsciente</div>
      <div style="color:#555;font-family:serif;font-size:0.95rem;margin-top:0.6rem;">aguardando recuperação...</div>
    `;
  } else if (isPetrificado) {
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9998',
      'pointer-events:none',
      'background:rgba(100,90,80,0.6)',
      'display:flex', 'align-items:center', 'justify-content:center',
      'flex-direction:column'
    ].join(';');
    overlay.innerHTML = `
      <div style="color:#c0b0a0;font-family:Cinzel,serif;font-size:2rem;text-shadow:0 0 20px #000;opacity:0.9;">🪨 Petrificado</div>
      <div style="color:#908070;font-family:serif;font-size:0.95rem;margin-top:0.6rem;">totalmente imóvel...</div>
    `;
  } else if (isOfuscado) {
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9998',
      'pointer-events:none',
      'background:rgba(255,255,220,0.12)',
      'backdrop-filter:blur(2px)',
      '-webkit-backdrop-filter:blur(2px)',
      'animation:pulseOfuscado 2.5s ease-in-out infinite',
      'display:block'
    ].join(';');
    overlay.innerHTML = '';
  } else if (isSangrando) {
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9998',
      'pointer-events:none',
      'animation:pulseSangrando 1.4s ease-in-out infinite',
      'display:block'
    ].join(';');
    overlay.innerHTML = '';
  } else if (isEmChamas) {
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9998',
      'pointer-events:none',
      'background:rgba(255,60,0,0.08)',
      'animation:pulseEmChamas 1.2s ease-in-out infinite',
      'display:block'
    ].join(';');
    overlay.innerHTML = '';
  } else if (isApavorado) {
    overlay.style.cssText = [
      'position:fixed', 'inset:0', 'z-index:9998',
      'pointer-events:none',
      'background:radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)',
      'animation:vignetteApavorado 1.8s ease-in-out infinite',
      'display:block'
    ].join(';');
    overlay.innerHTML = '';
  } else {
    overlay.style.display = 'none';
    overlay.innerHTML = '';
    return;
  }
  overlay.style.display = 'block';

  // Efeito de shake no canvas para Confuso (separado, no próprio canvas)
  const canvas = document.getElementById('boardCanvas');
  if (canvas) {
    if (isConfuso) {
      canvas.style.animation = 'shakeConfuso 0.9s ease-in-out infinite';
    } else if (canvas.style.animation && canvas.style.animation.includes('shakeConfuso')) {
      canvas.style.animation = '';
    }
  }
}

let _surdoMuted = false;
function _aplicarSurdo(conds) {
  const isSurdo = conds.indexOf('Surdo') !== -1;
  if (isSurdo && !_surdoMuted) {
    _surdoMuted = true;
    if (soundAmbientGain) soundAmbientGain.gain.value = 0;
    if (soundSfxGain) soundSfxGain.gain.value = 0;
    // Mostrar indicador
    _mostrarIndicadorCondicao('surdo-indicator', '🦻 Surdo — áudio mutado', '#663300', '#ffcc88');
  } else if (!isSurdo && _surdoMuted) {
    _surdoMuted = false;
    // Restaurar volumes padrão dos sliders, se existirem
    const sliderAmbient = document.getElementById('sliderAmbientVol');
    const sliderSfx = document.getElementById('sliderSfxVol');
    if (soundAmbientGain) soundAmbientGain.gain.value = sliderAmbient ? parseFloat(sliderAmbient.value) : 0.5;
    if (soundSfxGain) soundSfxGain.gain.value = sliderSfx ? parseFloat(sliderSfx.value) : 0.8;
    _removerIndicadorCondicao('surdo-indicator');
  }
}

function _aplicarOfuscadoCanvas(conds) {
  const canvas = document.getElementById('boardCanvas');
  if (!canvas) return;
  const isOfuscado = conds.indexOf('Ofuscado') !== -1;
  const isConfuso  = conds.indexOf('Confuso') !== -1;

  let filter = '';
  if (isOfuscado) filter = 'brightness(1.05) blur(1px) saturate(0.85)';
  canvas.style.filter = filter;

  if (isConfuso) {
    canvas.style.animation = 'shakeConfuso 0.9s ease-in-out infinite';
  } else {
    if (canvas.style.animation && canvas.style.animation.includes('shakeConfuso')) {
      canvas.style.animation = '';
    }
  }
}

function _mostrarIndicadorCondicao(id, texto, bgColor, textColor) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.style.cssText = [
      'position:fixed', 'bottom:80px', 'left:50%',
      'transform:translateX(-50%)',
      'z-index:9999', 'padding:6px 18px',
      'border-radius:20px',
      'font-family:Cinzel,serif', 'font-size:0.82rem',
      'border:1px solid rgba(255,200,100,0.3)',
      'pointer-events:none',
      'transition:opacity 0.4s ease'
    ].join(';');
    document.body.appendChild(el);
  }
  el.textContent = texto;
  el.style.background = bgColor;
  el.style.color = textColor;
  el.style.display = 'block';
  el.style.opacity = '1';
}

function _removerIndicadorCondicao(id) {
  const el = document.getElementById(id);
  if (el) { el.style.opacity = '0'; setTimeout(() => { if (el.parentNode) el.parentNode.removeChild(el); }, 500); }
}

function toggleTokenCondition(tokenId, condition) {
  snapshotBoard();
  const t = BOARD.tokens.find(tk => tk.id === tokenId);
  if (!t) return;
  if (!t.conditions) t.conditions = [];
  const idx = t.conditions.indexOf(condition);
  if (idx >= 0) {
    t.conditions.splice(idx, 1);
  } else {
    t.conditions.push(condition);
  }
  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
  popularCtxCondicoes(t);
  _syncCondToLinkedSheet(t);
  applyPlayerConditionEffects();
  atualizarFogJogador();
}

function onBoardTouchStart(e) {
  if (e.touches.length === 2) {
    BOARD.lastPinchDist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    return;
  }
  if (e.touches.length === 1) {
    const t = e.touches[0];
    const now = Date.now();
    const lastTapTime = BOARD.lastTapTime || 0;
    const lastTapX = BOARD.lastTapX || 0;
    const lastTapY = BOARD.lastTapY || 0;
    const isDoubleTap = (now - lastTapTime < 300) && (Math.hypot(t.clientX - lastTapX, t.clientY - lastTapY) < 30);
    
    BOARD.lastTapTime = now;
    BOARD.lastTapX = t.clientX;
    BOARD.lastTapY = t.clientY;

    if (isDoubleTap && document.body.dataset.mobile === '1') {
      if (BOARD.longPressTimer) { clearTimeout(BOARD.longPressTimer); BOARD.longPressTimer = null; }
      if (BOARD.pingTimer) { clearTimeout(BOARD.pingTimer); BOARD.pingTimer = null; }
      
      const fakeDblClick = {
        clientX: t.clientX,
        clientY: t.clientY,
        preventDefault: () => e.preventDefault()
      };
      onBoardDblClick(fakeDblClick);
      e.preventDefault();
      return;
    }

    const fake = { button: 0, clientX: t.clientX, clientY: t.clientY, preventDefault: () => e.preventDefault() };
    onBoardMouseDown(fake);

    // Long-press para mobile: abrir menu de contexto do token
    if (document.body.dataset.mobile === '1') {
      BOARD.longPressStartX = t.clientX;
      BOARD.longPressStartY = t.clientY;
      BOARD.longPressTimer = setTimeout(() => {
        BOARD.longPressTimer = null;
        // Cancela o ping timer pra não disparar junto
        if (BOARD.pingTimer) { clearTimeout(BOARD.pingTimer); BOARD.pingTimer = null; }
        const rect = BOARD.wrap.getBoundingClientRect();
        const relX = t.clientX - rect.left;
        const relY = t.clientY - rect.top;
        const token = getTokenAt(relX, relY);
        if (token) {
          const fakeContext = {
            clientX: t.clientX,
            clientY: t.clientY,
            preventDefault: () => {}
          };
          onBoardContextMenu(fakeContext);
        }
      }, 700);
    }
  }
}
function onBoardTouchMove(e) {
  e.preventDefault();
  // Cancela long-press se o dedo moveu muito
  if (BOARD.longPressTimer) {
    const t = e.touches[0];
    const dx = t.clientX - BOARD.longPressStartX;
    const dy = t.clientY - BOARD.longPressStartY;
    if (Math.hypot(dx, dy) > 12) {
      clearTimeout(BOARD.longPressTimer);
      BOARD.longPressTimer = null;
    }
  }
  if (e.touches.length === 2) {
    if (BOARD.dragging) return; // Prevent zooming while dragging a token
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    const midX = (e.touches[0].clientX + e.touches[1].clientX) / 2;
    const midY = (e.touches[0].clientY + e.touches[1].clientY) / 2;
    const rect = BOARD.wrap.getBoundingClientRect();
    const delta = (dist - BOARD.lastPinchDist) * 0.005;
    zoomBoardAt(midX - rect.left, midY - rect.top, delta);
    BOARD.lastPinchDist = dist;
    return;
  }
  if (e.touches.length === 1) {
    const t = e.touches[0];
    onBoardMouseMove({ clientX: t.clientX, clientY: t.clientY });
  }
}
function onBoardTouchEnd(e) {
  if (BOARD.longPressTimer) { clearTimeout(BOARD.longPressTimer); BOARD.longPressTimer = null; }
  onBoardMouseUp({ button: 0 });
}

// ── Render principal ──
function boardInit() {
  BOARD.canvas = document.getElementById('boardCanvas');
  BOARD.ctx = BOARD.canvas.getContext('2d');
  BOARD.wrap = document.getElementById('canvasWrap');
  if (!BOARD.canvas) return;
  isBoardInitialized = true;
  boardResize();
  window.addEventListener('resize', () => { boardResize(); _ajustarMobile(); });
  boardBindEvents();
  boardRender();
  // Snapshot inicial para undo
  snapshotBoard();
}

function boardResize() {
  const wrap = BOARD.wrap;
  if (!wrap) return;
  const w = wrap.clientWidth, h = wrap.clientHeight;
  const dpr = window.devicePixelRatio || 1;
  BOARD.canvas.width = w * dpr;
  BOARD.canvas.height = h * dpr;
  BOARD.canvas.style.width = w + 'px';
  BOARD.canvas.style.height = h + 'px';
  const ctx = BOARD.ctx;
  if (ctx) ctx.scale(dpr, dpr);
  boardRender();
}

function _ajustarMobile() {
  const isMobile = window.innerWidth <= 900;
  const sidebar = document.getElementById('sidebar');
  const master = document.getElementById('master-panel');
  if (isMobile) {
    if (sidebar && !sidebar.classList.contains('collapsed')) { toggleSidebar(); }
    if (master && !master.classList.contains('collapsed')) { toggleMasterPanel(); }
    document.body.dataset.mobile = '1';
  } else {
    // Restaura estado do localStorage ao sair do mobile
    if (sidebar && sidebar.classList.contains('collapsed') && localStorage.getItem('vtt_sidebar_collapsed') !== '1') { toggleSidebar(); }
    if (master && master.classList.contains('collapsed') && localStorage.getItem('vtt_master_collapsed') !== '1') { toggleMasterPanel(); }
    document.body.dataset.mobile = '';
  }
}

function toggleGrid(checked) {
  BOARD.gridOn = checked;
  boardRender();
  boardSave();
}

function setGridSize(val) {
  if (isNaN(val) || val < 20) return;
  BOARD.gridSize = val;
  document.getElementById('gridSize').value = val;
  boardRender();
  boardSave();
}

function boardRender() {
  if (myRole === 'cego') return;
  _syncWeatherSelect();
  const { canvas, ctx, offsetX, offsetY, zoom, gridOn, gridSize, mapImg, tokens, dragging, hovered, gridCols, gridRows, gridType, lightingType } = BOARD;
  if (!ctx) return;

  updateFloorDisplay();

  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  ctx.save();
  ctx.translate(offsetX, offsetY);
  ctx.scale(zoom, zoom);

  // Mapa
  if (mapImg) {
    ctx.globalAlpha = 1;
    const mx = BOARD.mapX || 0;
    const my = BOARD.mapY || 0;
    const mw = BOARD.mapWidth !== undefined && BOARD.mapWidth !== null ? BOARD.mapWidth : mapImg.naturalWidth;
    const mh = BOARD.mapHeight !== undefined && BOARD.mapHeight !== null ? BOARD.mapHeight : mapImg.naturalHeight;
    // No modo iso, a imagem do mapa é desenhada através da mesma transformação
    // afim usada pelo grid/tokens/paredes, para que ela acompanhe o "losango"
    // isométrico ao invés de ficar plana/top-down.
    const mapIso = BOARD.projection === 'iso' && gridType !== 'hex';
    if (mapIso) {
      ctx.save();
      const m = isoMatrix();
      ctx.transform(m.a, m.b, m.c, m.d, m.e, m.f);
    }
    if (isAnimatedMediaUrl(mapImg.src)) {
      const frame = getAnimatedFrame(mapImg.src, mapImg.naturalWidth, mapImg.naturalHeight);
      ctx.drawImage(frame, mx, my, mw, mh);
    } else {
      ctx.drawImage(mapImg, mx, my, mw, mh);
    }
    if (mapIso) {
      ctx.restore();
    }
  } else {
    const R = gridSize / 2;
    const hexH = Math.sqrt(3) * R;
    const gridPixelW = gridType === 'hex'
      ? (gridCols * R * 1.5 + R)
      : (gridCols * gridSize);
    const gridPixelH = gridType === 'hex'
      ? (gridRows * hexH + ((gridCols % 2) ? 0 : hexH / 2) + R)
      : (gridRows * gridSize);

    // Void background (fora do grid)
    ctx.fillStyle = '#0f0b08';
    ctx.fillRect(-offsetX / zoom, -offsetY / zoom, W / zoom, H / zoom);

    if (BOARD.projection === 'iso') {
      const cols = gridCols || 30;
      const rows = gridRows || 30;
      const corners = [
        projectPoint(0, 0),
        projectPoint(cols * gridSize, 0),
        projectPoint(cols * gridSize, rows * gridSize),
        projectPoint(0, rows * gridSize)
      ];
      ctx.beginPath();
      ctx.moveTo(corners[0].x, corners[0].y);
      for (let i = 1; i < 4; i++) ctx.lineTo(corners[i].x, corners[i].y);
      ctx.closePath();
      ctx.fillStyle = '#1e1610';
      ctx.fill();
    } else {
      // Pergaminho dentro do grid
      ctx.fillStyle = '#1e1610';
      ctx.fillRect(0, 0, gridPixelW, gridPixelH);
    }
  }

  // Grade
  if (gridOn) drawGrid(ctx, W, H);

  // Andar inferior: renderiza tokens como fundo para que objetos com
  // transparência (PNG) no andar atual deixem ver o que está abaixo
  const mainFloor = getCurrentFloor();
  const lowerFloor = mainFloor - 1;
  const lowerTokens = tokens.filter(t => {
    if (getFloorFromZ(t.z) !== lowerFloor) return false;
    const layer = t.layer || 'players';
    if (layer === 'gm' && (myRole !== 'mestre' || emVisaoJogador())) return false;
    return true;
  });
  if (lowerTokens.length) {
    ctx.save();
    ctx.globalAlpha = 0.3;
    lowerTokens.sort((a, b) => (a.z || 0) - (b.z || 0));
    lowerTokens.forEach(t => drawToken(ctx, t, false, false));
    ctx.restore();
  }

  // Formas desenhadas (retângulos/círculos)
  drawShapes(ctx);

  // Preview de forma sendo desenhada
  if (BOARD.shapeDrawing) drawShapePreview(ctx);

  // Fog of War (jogadores)
  if (BOARD.fogVisible) drawFog(ctx, W, H);

  // Preview de seleção de retangulo da nevoa
  drawFogRectPreview(ctx);

  // Paredes
  drawWalls(ctx);

  // Preview de parede sendo desenhada
  if (BOARD.wallDrawing) drawWallPreview(ctx);

  // Tokens (ordenação por camadas: players / gm / mapa / objetos)
  const activeFloor = getCurrentFloor();
  const renderTokens = tokens.filter(t => {
    if (getFloorFromZ(t.z) !== activeFloor) return false;
    const layer = t.layer || 'players';
    if (layer === 'gm' && (myRole !== 'mestre' || emVisaoJogador())) return false;
    return true;
  });

  renderTokens.sort((a, b) => {
    const zA = a.z || 0;
    const zB = b.z || 0;
    if (zA !== zB) return zA - zB;
    const layerA = a.layer || 'players';
    const layerB = b.layer || 'players';
    if (layerA !== layerB) {
      if (layerA === 'map') return -1;
      if (layerB === 'map') return 1;
    }
    // Painter's algorithm no modo iso: desenhar de trás (gx+gy menor) para frente
    if (BOARD.projection === 'iso') {
      const isoA = (a.gx || 0) + (a.gy || 0);
      const isoB = (b.gx || 0) + (b.gy || 0);
      if (isoA !== isoB) return isoA - isoB;
    }
    return 0;
  });

  // 1. Desenhar os clones estáticos nas posições iniciais para os tokens sendo arrastados
  renderTokens.forEach(t => {
    const isMainDragging = (BOARD.dragging && t.id === BOARD.dragging.id);
    const isInDragGroup = (BOARD.dragGroup && BOARD.dragGroup[t.id] !== undefined);

    if (isMainDragging || isInDragGroup) {
      const startPos = BOARD.dragGroup && BOARD.dragGroup[t.id]
        ? BOARD.dragGroup[t.id]
        : { gx: BOARD.dragStartGx, gy: BOARD.dragStartGy };

      if (startPos && startPos.gx !== undefined && startPos.gy !== undefined) {
        const curGx = t.gx;
        const curGy = t.gy;
        t.gx = startPos.gx;
        t.gy = startPos.gy;

        ctx.save();
        ctx.globalAlpha = 0.7;
        drawToken(ctx, t, false, false);
        ctx.restore();

        t.gx = curGx;
        t.gy = curGy;
      }
    }
  });

  // 2. Desenhar os tokens nas posições atuais (com ghost opacity 0.55 se arrastando)
  renderTokens.forEach(t => {
    const isMainDragging = (BOARD.dragging && t.id === BOARD.dragging.id);
    const isInDragGroup = (BOARD.dragGroup && BOARD.dragGroup[t.id] !== undefined);
    const isDragging = isMainDragging || isInDragGroup;

    drawToken(ctx, t, isDragging, t.id === BOARD.hovered);
  });

  // 3. Desenhar a seta e caminho de movimento do token principal sendo arrastado
  if (BOARD.dragging) {
    drawTokenMovementPath(ctx, BOARD.dragging);
  }

  // Régua / Medição ativa
  if (BOARD.rulerActive) {
    drawRulerPreview(ctx);
  }

  // Régua com waypoints
  if (BOARD.wayRulerPoints && BOARD.wayRulerPoints.length > 0) {
    drawWayRulerPreview(ctx);
  }

  // Outline and resize handle for GM map edit
  if (myRole === 'mestre' && BOARD.activeLayer === 'map' && BOARD.tool === 'move' && BOARD.mapImg) {
    const mx = BOARD.mapX || 0;
    const my = BOARD.mapY || 0;
    const mw = BOARD.mapWidth !== undefined && BOARD.mapWidth !== null ? BOARD.mapWidth : BOARD.mapImg.naturalWidth;
    const mh = BOARD.mapHeight !== undefined && BOARD.mapHeight !== null ? BOARD.mapHeight : BOARD.mapImg.naturalHeight;
    
    ctx.save();
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 2 / BOARD.zoom;
    ctx.setLineDash([6 / BOARD.zoom, 4 / BOARD.zoom]);
    ctx.strokeRect(mx, my, mw, mh);
    
    ctx.fillStyle = '#00ff00';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5 / BOARD.zoom;
    ctx.setLineDash([]);
    const handleSz = 10 / BOARD.zoom;
    ctx.beginPath();
    ctx.arc(mx + mw, my + mh, handleSz, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // Desenhar pings ativos
  if (BOARD.pings && BOARD.pings.length > 0) {
    const now = Date.now();
    BOARD.pings.forEach(p => {
      const elapsed = now - p.time;
      if (elapsed < 0 || elapsed >= 1500) return;
      const progress = elapsed / 1500;
      
      const maxRadius = 40;
      const currentRadius = progress * maxRadius;
      const alpha = 1 - progress;
      const color = p.color || '#ff3333';
      
      ctx.save();
      ctx.strokeStyle = color;
      ctx.lineWidth = 3 / BOARD.zoom;
      ctx.globalAlpha = alpha;
      
      // Desenha 3 círculos concêntricos expandindo
      for (let i = 0; i < 3; i++) {
        const r = currentRadius * (1 - i * 0.25);
        if (r > 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
      
      // Ponto sólido central
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 4 / BOARD.zoom, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.restore();
    });
  }

  ctx.restore(); // Restaura transformações para coordenadas da tela

  // Iluminação (twilight, night, sunny - cheia apenas para jogadores; mestre vê tudo)
  // A camada de escuridão é desenhada em um canvas offscreen para que o
  // destination-out não apague os pixels dos tokens já renderizados no canvas principal.
  if (lightingType && lightingType !== 'sunny' && (myRole !== 'mestre' || emVisaoJogador())) {
    const offscreen = document.createElement('canvas');
    offscreen.width = W;
    offscreen.height = H;
    const lctx = offscreen.getContext('2d');

    if (lightingType === 'twilight') {
      // Crepuúsculo: tons laranja-ámbar
      lctx.fillStyle = 'rgba(180, 80, 50, 0.18)';
      lctx.fillRect(0, 0, W, H);
      lctx.fillStyle = 'rgba(40, 10, 80, 0.1)';
      lctx.fillRect(0, 0, W, H);
    } else if (lightingType === 'starnight') {
      // Noite Estrelada: azul-índigo com luminosidade ambiente sutil
      lctx.fillStyle = 'rgba(15, 20, 60, 0.72)';
      lctx.fillRect(0, 0, W, H);
      lctx.fillStyle = 'rgba(30, 10, 80, 0.08)';
      lctx.fillRect(0, 0, W, H);
    } else {
      lctx.fillStyle = getLightingColor(lightingType);
      lctx.fillRect(0, 0, W, H);
    }

    // Remove a escuridão onde há luz (operando no canvas offscreen, não no principal)
    lctx.globalCompositeOperation = 'destination-out';
    tokens.forEach(t => {
      if (getFloorFromZ(t.z) !== activeFloor) return;
      const layer = t.layer || 'players';
      if (layer === 'gm' && (myRole !== 'mestre' || emVisaoJogador())) return;
      if (t.type === 'object') return;
      const sizeW = (t.sizeX || t.size || 1) * gridSize;
      const sizeH = (t.sizeY || t.size || 1) * gridSize;

      let tcx, tcy;
      if (BOARD.projection === 'iso') {
        const pos = tokenWorldPos(t.gx, t.gy);
        tcx = pos.x;
        tcy = pos.y;
      } else if (BOARD.gridType === 'hex') {
        const R = gridSize / 2;
        const hexHeight = Math.sqrt(3) * R;
        tcx = t.gx * R * 1.5;
        tcy = t.gy * hexHeight + ((Math.abs(Math.round(t.gx)) % 2) ? hexHeight / 2 : 0);
      } else {
        tcx = t.gx * gridSize + sizeW / 2;
        tcy = t.gy * gridSize + sizeH / 2;
      }

      const sx = tcx * zoom + offsetX;
      const sy = tcy * zoom + offsetY;

      // Jogador vê seus próprios tokens, raio calculado com base no tipo de visão e iluminação.
      // O próprio token é SEMPRE visível para o controlador (mínimo de 0.8 célula de luz).
      if (t.controlledBy === myPeerId || (emVisaoJogador() && BOARD.playerViewTokenId === t.id)) {
        const alcance = getEffectiveVisionRadius(t);
        // Raio mínimo garante que o próprio token não fique escondido pela escuridão
        const raioMinPx = Math.max(gridSize * zoom * 0.8, 30);
        const raioVisaoPx = alcance * gridSize * zoom;
        const raioPx = Math.max(raioVisaoPx, raioMinPx);
        const grad = lctx.createRadialGradient(sx, sy, 0, sx, sy, raioPx);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.6, 'rgba(255,255,255,0.8)');
        grad.addColorStop(1, 'rgba(255,255,255,0)');
        lctx.fillStyle = grad;
        lctx.beginPath();
        lctx.arc(sx, sy, raioPx, 0, Math.PI * 2);
        lctx.fill();
      }

      // Luzes das auras (apenas auras marcadas como fonte de luz)
      if (t.auras && t.auras.length > 0) {
        t.auras.forEach(aura => {
          if (!aura.light) return;
          const scaleVal = BOARD.gridScaleVal || 1.5;
          const auraRadiusPx = ((aura.radius || 0) / scaleVal) * gridSize * zoom;
          if (auraRadiusPx > 0) {
            const grad = lctx.createRadialGradient(sx, sy, 0, sx, sy, auraRadiusPx);
            grad.addColorStop(0, 'rgba(255,255,255,1)');
            grad.addColorStop(0.6, 'rgba(255,255,255,0.8)');
            grad.addColorStop(1, 'rgba(255,255,255,0)');
            lctx.fillStyle = grad;
            lctx.beginPath();
            lctx.arc(sx, sy, auraRadiusPx, 0, Math.PI * 2);
            lctx.fill();
          }
        });
      }
    });

  // Compõe a camada de escuridão sobre o canvas principal (source-over padrão)
    ctx.drawImage(offscreen, 0, 0);
  }

  // Loop de animação para suporte a GIFs e vídeos (webm)
  if (boardTemGif()) {
    if (!BOARD.gifInterval) {
      // Vídeos ficam mais suaves com ~20fps; GIFs com ~10fps
      BOARD.gifInterval = setInterval(boardRender, boardTemVideo() ? 50 : 100);
    }
  } else {
    if (BOARD.gifInterval) { clearInterval(BOARD.gifInterval); BOARD.gifInterval = null; }
  }

  // Visão no Escuro (darkvision): converte a cena para grayscale, mas mantém
  // as áreas iluminadas por auras com light em cores normais.
  if (checkDarkvisionGrayscale()) {
    const dvCanvas = document.createElement('canvas');
    dvCanvas.width = W;
    dvCanvas.height = H;
    const dvCtx = dvCanvas.getContext('2d');

    // Copiar cena atual (já com iluminação/escuridão) para o offscreen
    dvCtx.drawImage(canvas, 0, 0);

    // Aplicar grayscale + brilho no offscreen
    dvCtx.filter = 'grayscale(1) brightness(1.1)';
    dvCtx.drawImage(dvCanvas, 0, 0);
    dvCtx.filter = 'none';

    // Recortar (destination-out) as áreas iluminadas por auras com light,
    // para que o canvas principal (cores normais) apareça nessas regiões
    dvCtx.globalCompositeOperation = 'destination-out';
    tokens.forEach(t => {
      if (getFloorFromZ(t.z) !== activeFloor) return;
      const layer = t.layer || 'players';
      if (layer === 'gm' && (myRole !== 'mestre' || emVisaoJogador())) return;
      if (t.type === 'object') return;
      const sizeW = (t.sizeX || t.size || 1) * gridSize;
      const sizeH = (t.sizeY || t.size || 1) * gridSize;

      let tcx, tcy;
      if (BOARD.projection === 'iso') {
        const pos = tokenWorldPos(t.gx, t.gy);
        tcx = pos.x;
        tcy = pos.y;
      } else if (BOARD.gridType === 'hex') {
        const R = gridSize / 2;
        const hexHeight = Math.sqrt(3) * R;
        tcx = t.gx * R * 1.5;
        tcy = t.gy * hexHeight + ((Math.abs(Math.round(t.gx)) % 2) ? hexHeight / 2 : 0);
      } else {
        tcx = t.gx * gridSize + sizeW / 2;
        tcy = t.gy * gridSize + sizeH / 2;
      }
      const sx = tcx * zoom + offsetX;
      const sy = tcy * zoom + offsetY;

      if (t.auras && t.auras.length > 0) {
        t.auras.forEach(aura => {
          if (!aura.light) return;
          const scaleVal = BOARD.gridScaleVal || 1.5;
          const auraRadiusPx = ((aura.radius || 0) / scaleVal) * gridSize * zoom;
          if (auraRadiusPx > 0) {
            dvCtx.beginPath();
            dvCtx.arc(sx, sy, auraRadiusPx, 0, Math.PI * 2);
            dvCtx.fillStyle = 'rgba(255,255,255,1)';
            dvCtx.fill();
          }
        });
      }
    });
    dvCtx.globalCompositeOperation = 'source-over';

    // Compor a camada de darkvision (grayscale com buracos) sobre o canvas principal
    ctx.drawImage(dvCanvas, 0, 0);
  }

  // Partículas de clima (chuva/neve) — em coordenadas de tela
  _renderWeather(ctx);
}

// Verifica gatilhos contínuos de condição após cada render
var _checkingContCond = false;
setInterval(function() {
  if (_checkingContCond) return;
  _checkingContCond = true;
  _checkContinuousCondTriggers();
  _checkingContCond = false;
}, 500);

// Verifica se o filtro de preto e branco (darkvision) deve ser ativado.
// Condição: escuridão total (darknight/cave) + token ativo com visão no escuro (visionType === 'escuro').
function checkDarkvisionGrayscale() {
  const lightingType = BOARD.lightingType;
  if (lightingType !== 'darknight' && lightingType !== 'cave') return false;

  // Mestre simulando visão de um jogador
  if (emVisaoJogador()) {
    const token = BOARD.tokens.find(t => t.id === BOARD.playerViewTokenId);
    return !!(token && token.visionType === 'escuro');
  }

  // Jogador normal: verificar se algum token controlado tem visão no escuro
  if (myRole !== 'mestre') {
    return BOARD.tokens.some(t => t.controlledBy === myPeerId && t.visionType === 'escuro');
  }

  return false;
}

function isGifUrl(url) {
  if (!url) return false;
  return /\.gif($|\?)/i.test(url) || url.startsWith('data:image/gif');
}

function isVideoUrl(url) {
  if (!url) return false;
  return /\.(webm|mp4|m4v|ogv|ogg)($|\?)/i.test(url) || url.startsWith('data:video/');
}

function isAnimatedMediaUrl(url) {
  return isGifUrl(url) || isVideoUrl(url);
}

const _gifCanvasCache = {};

function getGifCanvas(url, naturalWidth, naturalHeight) {
  const entry = _gifCanvasCache[url];
  if (entry && entry.w === naturalWidth && entry.h === naturalHeight) return entry;
  if (entry && naturalWidth > 0) {
    entry.img.width = naturalWidth;
    entry.img.height = naturalHeight;
    entry.img.style.width = naturalWidth + 'px';
    entry.img.style.height = naturalHeight + 'px';
    entry.offCanvas.width = naturalWidth;
    entry.offCanvas.height = naturalHeight;
    entry.w = naturalWidth;
    entry.h = naturalHeight;
    return entry;
  }
  if (entry) return entry;

  const w = naturalWidth || 200;
  const h = naturalHeight || 200;

  const container = document.createElement('div');
  container.style.cssText = 'position:fixed;left:-9999px;top:0;width:' + w + 'px;height:' + h + 'px;overflow:visible;pointer-events:none;z-index:-1;';

  let img = tokenImageCache[url];
  if (!img) {
    img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = url;
    tokenImageCache[url] = img;
  }
  img.width = w;
  img.height = h;
  img.style.cssText = 'width:' + w + 'px;height:' + h + 'px;display:block;';

  const offCanvas = document.createElement('canvas');
  offCanvas.width = w;
  offCanvas.height = h;

  container.appendChild(img);
  document.body.appendChild(container);

  const newEntry = { img, offCanvas, w, h, container };
  _gifCanvasCache[url] = newEntry;
  return newEntry;
}

function getGifFrame(url, naturalWidth, naturalHeight) {
  const w = naturalWidth || 200;
  const h = naturalHeight || 200;
  const entry = getGifCanvas(url, w, h);
  const ctx = entry.offCanvas.getContext('2d');
  try {
    ctx.clearRect(0, 0, entry.w, entry.h);
    ctx.drawImage(entry.img, 0, 0, entry.w, entry.h);
  } catch (e) { }
  return entry.offCanvas;
}

// ── Suporte a vídeo/webm para tokens, objetos e mapas ─────────────────
const _videoCache = {};

function getVideo(url) {
  let entry = _videoCache[url];
  if (entry) return entry;
  const video = document.createElement('video');
  video.muted = true;
  video.loop = true;
  video.autoplay = true;
  video.playsInline = true;
  video.preload = 'auto';
  video.setAttribute('playsinline', '');
  video.setAttribute('webkit-playsinline', '');
  video.crossOrigin = 'anonymous';
  video.src = url;
  const container = document.getElementById('gifHost') || document.body;
  container.appendChild(video);
  video.play().catch(() => { });
  entry = { video, offCanvas: document.createElement('canvas') };
  _videoCache[url] = entry;
  return entry;
}

function isVideoReady(url) {
  const entry = _videoCache[url];
  return !!(entry && entry.video.readyState >= 1 && entry.video.videoWidth > 0);
}

function getVideoFrame(url, w, h) {
  const entry = getVideo(url);
  const v = entry.video;
  const vw = w || v.videoWidth || 200;
  const vh = h || v.videoHeight || 200;
  if (entry.offCanvas.width !== vw) entry.offCanvas.width = vw;
  if (entry.offCanvas.height !== vh) entry.offCanvas.height = vh;
  const ctx = entry.offCanvas.getContext('2d');
  ctx.clearRect(0, 0, vw, vh);
  try { ctx.drawImage(v, 0, 0, vw, vh); } catch (e) { }
  return entry.offCanvas;
}

function getAnimatedFrame(url, w, h) {
  if (isVideoUrl(url)) return getVideoFrame(url, w, h);
  return getGifFrame(url, w, h);
}

function hospedarGifNoDom(img) {
  // Mantida para compatibilidade
}

function boardTemGif() {
  if (BOARD.mapDataUrl && isAnimatedMediaUrl(BOARD.mapDataUrl)) return true;
  if (BOARD.mapImg && BOARD.mapImg.src && isAnimatedMediaUrl(BOARD.mapImg.src)) return true;
  for (const t of BOARD.tokens) {
    if (t.imageUrl && isAnimatedMediaUrl(t.imageUrl)) return true;
  }
  return false;
}

function boardTemVideo() {
  if (BOARD.mapDataUrl && isVideoUrl(BOARD.mapDataUrl)) return true;
  if (BOARD.mapImg && BOARD.mapImg.src && isVideoUrl(BOARD.mapImg.src)) return true;
  for (const t of BOARD.tokens) {
    if (t.imageUrl && isVideoUrl(t.imageUrl)) return true;
  }
  return false;
}

function drawGrid(ctx, W, H) {
  const { offsetX, offsetY, zoom, gridSize, gridType, gridCols, gridRows } = BOARD;
  const gs = gridSize;
  ctx.save();
  ctx.strokeStyle = 'rgba(107,77,42,0.35)';
  ctx.lineWidth = 0.5 / zoom;
  ctx.beginPath();

  if (gridType === 'hex') {
    const R = gs / 2;
    const hexHeight = Math.sqrt(3) * R;

    const startGx = Math.max(0, Math.floor((-offsetX / zoom) / (R * 1.5)) - 1);
    const endGx = Math.min(gridCols || 100, Math.ceil((W - offsetX) / zoom / (R * 1.5)) + 1);
    const startGy = Math.max(0, Math.floor((-offsetY / zoom) / hexHeight) - 1);
    const endGy = Math.min(gridRows || 100, Math.ceil((H - offsetY) / zoom / hexHeight) + 1);

    for (let gx = startGx; gx < endGx; gx++) {
      for (let gy = startGy; gy < endGy; gy++) {
        const cx = gx * R * 1.5;
        const cy = gy * hexHeight + ((Math.abs(Math.round(gx)) % 2) ? hexHeight / 2 : 0);

        ctx.moveTo(cx + R * Math.cos(0), cy + R * Math.sin(0));
        for (let i = 1; i <= 6; i++) {
          const angle = Math.PI / 3 * i;
          ctx.lineTo(cx + R * Math.cos(angle), cy + R * Math.sin(angle));
        }
      }
    }
  } else if (BOARD.projection === 'iso') {
    const startGx = Math.max(0, Math.ceil((-offsetX / zoom) / gs) - 2);
    const endGx = Math.min(gridCols || 30, Math.ceil(((W - offsetX) / zoom) / gs) + 2);
    const startGy = Math.max(0, Math.ceil((-offsetY / zoom) / gs) - 2);
    const endGy = Math.min(gridRows || 30, Math.ceil(((H - offsetY) / zoom) / gs) + 2);

    for (let gx = startGx; gx <= endGx; gx++) {
      const p1 = projectPoint(gx * gs, -gs * 10);
      const p2 = projectPoint(gx * gs, (gridRows + 10) * gs);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
    for (let gy = startGy; gy <= endGy; gy++) {
      const p1 = projectPoint(-gs * 10, gy * gs);
      const p2 = projectPoint((gridCols + 10) * gs, gy * gs);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
    }
  } else {
    const startGx = Math.ceil((-offsetX / zoom) / gs);
    const endGx = Math.ceil(((W - offsetX) / zoom) / gs);
    const startGy = Math.ceil((-offsetY / zoom) / gs);
    const endGy = Math.ceil(((H - offsetY) / zoom) / gs);

    for (let gx = startGx; gx <= endGx; gx++) {
      const x = gx * gs;
      ctx.moveTo(x, -offsetY / zoom);
      ctx.lineTo(x, (H - offsetY) / zoom);
    }
    for (let gy = startGy; gy <= endGy; gy++) {
      const y = gy * gs;
      ctx.moveTo(-offsetX / zoom, y);
      ctx.lineTo((W - offsetX) / zoom, y);
    }
  }
  ctx.stroke();
  ctx.restore();
}

function _wallProj(x, y, elev) {
  if (BOARD.projection !== 'iso') return { x, y };
  const p = projectPoint(x, y);
  p.y -= elev;
  return p;
}

function drawWalls(ctx) {
  const walls = BOARD.walls;
  if (!walls || walls.length === 0) return;
  const activeFloor = getCurrentFloor();
  const iso = BOARD.projection === 'iso';
  ctx.save();

  walls.forEach(w => {
    if (getFloorFromZ(w.z) !== activeFloor) return;
    const type = w.type || 'normal';
    const elev = iso ? isoElevation(getFloorFromZ(w.z)) : 0;

    if (type === 'invisible') {
      if (myRole !== 'mestre' || emVisaoJogador()) return;
      ctx.save();
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.5)';
      ctx.lineWidth = 3 / BOARD.zoom;
      ctx.setLineDash([6 / BOARD.zoom, 6 / BOARD.zoom]);
      ctx.beginPath();
      const p1 = _wallProj(w.x1, w.y1, elev);
      const p2 = _wallProj(w.x2, w.y2, elev);
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
      return;
    }

    if (type === 'normal') {
      ctx.save();
      const p1 = _wallProj(w.x1, w.y1, elev);
      const p2 = _wallProj(w.x2, w.y2, elev);

      ctx.strokeStyle = '#5a3a1a';
      ctx.lineWidth = 4 / BOARD.zoom;
      ctx.lineCap = 'round';
      ctx.shadowColor = 'rgba(0,0,0,0.6)';
      ctx.shadowBlur = 4 / BOARD.zoom;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(160,100,40,0.6)';
      ctx.lineWidth = 1.5 / BOARD.zoom;
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
      ctx.restore();
      return;
    }

    ctx.save();
    ctx.lineCap = 'round';

    let baseColor = '#5a3a1a';
    let topColor = 'rgba(160,100,40,0.6)';
    let isDashed = false;

    if (type === 'door') {
      if (w.open) {
        baseColor = 'rgba(76, 175, 80, 0.2)';
        topColor = 'rgba(76, 175, 80, 0.5)';
        isDashed = true;
      } else {
        baseColor = '#d32f2f';
        topColor = '#ef5350';
      }
    } else if (type === 'window') {
      if (w.open) {
        baseColor = 'rgba(3, 169, 244, 0.2)';
        topColor = 'rgba(3, 169, 244, 0.5)';
        isDashed = true;
      } else {
        baseColor = '#0288d1';
        topColor = '#29b6f6';
      }
    }

    const p1 = _wallProj(w.x1, w.y1, elev);
    const p2 = _wallProj(w.x2, w.y2, elev);

    ctx.strokeStyle = baseColor;
    ctx.lineWidth = 5 / BOARD.zoom;
    if (isDashed) {
      ctx.setLineDash([4 / BOARD.zoom, 4 / BOARD.zoom]);
    }
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    ctx.strokeStyle = topColor;
    ctx.lineWidth = 2 / BOARD.zoom;
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y);
    ctx.lineTo(p2.x, p2.y);
    ctx.stroke();

    ctx.restore();
  });

  walls.forEach(w => {
    if (getFloorFromZ(w.z) !== activeFloor) return;
    const type = w.type || 'normal';
    if (type === 'door' || type === 'window') {
      const elev = iso ? isoElevation(getFloorFromZ(w.z)) : 0;
      const p1 = _wallProj(w.x1, w.y1, elev);
      const p2 = _wallProj(w.x2, w.y2, elev);
      const mx = (p1.x + p2.x) / 2;
      const my = (p1.y + p2.y) / 2;
      const r = 9 / BOARD.zoom;

      ctx.save();
      ctx.beginPath();
      ctx.arc(mx, my, r, 0, Math.PI * 2);

      let fillColor = '#ffffff';
      let strokeColor = '#333333';

      if (type === 'door') {
        fillColor = w.open ? '#4caf50' : '#f44336';
        strokeColor = w.open ? '#2e7d32' : '#c62828';
      } else if (type === 'window') {
        fillColor = w.open ? '#03a9f4' : '#9e9e9e';
        strokeColor = w.open ? '#0277bd' : '#757575';
      }

      ctx.fillStyle = fillColor;
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2 / BOARD.zoom;
      ctx.shadowColor = 'rgba(0,0,0,0.4)';
      ctx.shadowBlur = 4 / BOARD.zoom;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.stroke();

      ctx.fillStyle = '#ffffff';
      ctx.font = `bold ${Math.max(6, 9 / BOARD.zoom)}px Cinzel, serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      const label = w.open ? 'A' : 'F';
      ctx.fillText(label, mx, my + 0.5 / BOARD.zoom);

      ctx.restore();
    }
  });

  if (myRole === 'mestre' && BOARD.tool === 'wall' && BOARD.selectedWallId) {
    const selWall = BOARD.walls.find(w => w.id === BOARD.selectedWallId);
    if (selWall && getFloorFromZ(selWall.z) === activeFloor) {
      const elev = iso ? isoElevation(activeFloor) : 0;
      const sp1 = _wallProj(selWall.x1, selWall.y1, elev);
      const sp2 = _wallProj(selWall.x2, selWall.y2, elev);
      ctx.save();
      // Draw highlight glow
      ctx.strokeStyle = 'rgba(0, 255, 255, 0.4)';
      ctx.lineWidth = 12 / BOARD.zoom;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(sp1.x, sp1.y);
      ctx.lineTo(sp2.x, sp2.y);
      ctx.stroke();

      // Draw handles
      const handleR = 6 / BOARD.zoom;
      ctx.lineWidth = 2 / BOARD.zoom;
      ctx.strokeStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0,0,0,0.5)';
      ctx.shadowBlur = 4 / BOARD.zoom;

      // Point 1 handle
      ctx.beginPath();
      ctx.arc(sp1.x, sp1.y, handleR, 0, Math.PI * 2);
      ctx.fillStyle = '#00bfff';
      ctx.fill();
      ctx.stroke();

      // Point 2 handle
      ctx.beginPath();
      ctx.arc(sp2.x, sp2.y, handleR, 0, Math.PI * 2);
      ctx.fillStyle = '#00bfff';
      ctx.fill();
      ctx.stroke();

      ctx.restore();
    }
  }

  ctx.restore();
}

function _carregarImagemTrigger(url) {
  if (_triggerImageCache[url]) return _triggerImageCache[url];
  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => { if (typeof boardRender === 'function') boardRender(); };
  img.src = url;
  _triggerImageCache[url] = img;
  return img;
}

function _desenharImagemGatilho(ctx, s) {
  const img = _carregarImagemTrigger(s.triggerImageUrl);
  if (!img.complete || img.naturalWidth === 0) return;
  const x1 = Math.min(s.x1, s.x2), y1 = Math.min(s.y1, s.y2);
  const x2 = Math.max(s.x1, s.x2), y2 = Math.max(s.y1, s.y2);
  const w = x2 - x1, h = y2 - y1;
  if (w === 0 || h === 0) return;

  ctx.save();
  // Recorta ao formato da forma
  ctx.beginPath();
  if (s.kind === 'circle') {
    const cx = (x1 + x2) / 2, cy = (y1 + y2) / 2;
    ctx.ellipse(cx, cy, w / 2, h / 2, 0, 0, Math.PI * 2);
  } else if (s.kind === 'freehand' && s.points && s.points.length > 0) {
    ctx.moveTo(s.points[0].x, s.points[0].y);
    for (let j = 1; j < s.points.length; j++) ctx.lineTo(s.points[j].x, s.points[j].y);
    ctx.closePath();
  } else {
    ctx.rect(x1, y1, w, h);
  }
  ctx.clip();
  ctx.drawImage(img, x1, y1, w, h);
  ctx.restore();
}

function _spPt(x, y) {
  if (BOARD.projection !== 'iso') return { x, y };
  return projectPoint(x, y);
}

function drawShapes(ctx) {
  if (!BOARD.shapes || BOARD.shapes.length === 0) return;
  const activeFloor = getCurrentFloor();
  const iso = BOARD.projection === 'iso';
  const elev = iso ? isoElevation(activeFloor) : 0;
  BOARD.shapes.forEach(s => {
    if (getFloorFromZ(s.z) !== activeFloor) return;
    ctx.save();
    const isHidden = (s.hidden === true) && !s.triggered;
    if (isHidden && myRole !== 'mestre') { ctx.restore(); return; }
    const fillColor = hexToRgba(s.color || '#c9903a', isHidden ? 0.1 : 0.25);
    const strokeColor = s.color || '#c9903a';
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 2 / BOARD.zoom;
    if (isHidden) ctx.setLineDash([6 / BOARD.zoom, 4 / BOARD.zoom]);

    if (iso) {
      const p1 = _spPt(s.x1, s.y1);
      const p2 = _spPt(s.x2, s.y2);
      p1.y -= elev; p2.y -= elev;
      if (s.kind === 'circle') {
        const cx = (p1.x + p2.x) / 2;
        const cy = (p1.y + p2.y) / 2;
        const w2 = Math.abs(p2.x - p1.x) / 2;
        const h2 = Math.abs(p2.y - p1.y) / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, w2, h2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (s.kind === 'freehand' && s.points && s.points.length > 0) {
        ctx.beginPath();
        const p0 = _spPt(s.points[0].x, s.points[0].y); p0.y -= elev;
        ctx.moveTo(p0.x, p0.y);
        for (let j = 1; j < s.points.length; j++) {
          const pj = _spPt(s.points[j].x, s.points[j].y); pj.y -= elev;
          ctx.lineTo(pj.x, pj.y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else {
        const rx = Math.min(p1.x, p2.x);
        const ry = Math.min(p1.y, p2.y);
        const rw = Math.abs(p2.x - p1.x);
        const rh = Math.abs(p2.y - p1.y);
        ctx.fillRect(rx, ry, rw, rh);
        ctx.strokeRect(rx, ry, rw, rh);
      }
    } else {
      const w = s.x2 - s.x1;
      const h = s.y2 - s.y1;
      if (s.kind === 'circle') {
        const cx = s.x1 + w / 2;
        const cy = s.y1 + h / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(w) / 2, Math.abs(h) / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
      } else if (s.kind === 'freehand') {
        if (s.points && s.points.length > 0) {
          ctx.beginPath();
          ctx.moveTo(s.points[0].x, s.points[0].y);
          for (let j = 1; j < s.points.length; j++) {
            ctx.lineTo(s.points[j].x, s.points[j].y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      } else {
        ctx.fillRect(s.x1, s.y1, w, h);
        ctx.strokeRect(s.x1, s.y1, w, h);
      }
    }
    if (isHidden) ctx.setLineDash([]);

    // Imagem de revelação do gatilho
    if (s.triggered && s.triggerImageUrl) {
      _desenharImagemGatilho(ctx, s);
    }

    if (BOARD.selectedShapeId === s.id) {
      ctx.setLineDash([6 / BOARD.zoom, 3 / BOARD.zoom]);
      ctx.strokeStyle = '#00bfff';
      ctx.lineWidth = 2 / BOARD.zoom;
      if (iso) {
        const p1 = _spPt(s.x1, s.y1);
        const p2 = _spPt(s.x2, s.y2);
        p1.y -= elev; p2.y -= elev;
        if (s.kind === 'circle') {
          const cx = (p1.x + p2.x) / 2;
          const cy = (p1.y + p2.y) / 2;
          ctx.beginPath();
          ctx.ellipse(cx, cy, Math.abs(p2.x - p1.x) / 2, Math.abs(p2.y - p1.y) / 2, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else if (s.kind === 'freehand' && s.points && s.points.length > 0) {
          ctx.beginPath();
          const p0 = _spPt(s.points[0].x, s.points[0].y); p0.y -= elev;
          ctx.moveTo(p0.x, p0.y);
          for (let j = 1; j < s.points.length; j++) {
            const pj = _spPt(s.points[j].x, s.points[j].y); pj.y -= elev;
            ctx.lineTo(pj.x, pj.y);
          }
          ctx.closePath();
          ctx.stroke();
        } else {
          const rx = Math.min(p1.x, p2.x);
          const ry = Math.min(p1.y, p2.y);
          ctx.strokeRect(rx, ry, Math.abs(p2.x - p1.x), Math.abs(p2.y - p1.y));
        }
      } else {
        const w = s.x2 - s.x1;
        const h = s.y2 - s.y1;
        if (s.kind === 'circle') {
          const cx = s.x1 + w / 2;
          const cy = s.y1 + h / 2;
          ctx.beginPath();
          ctx.ellipse(cx, cy, Math.abs(w) / 2, Math.abs(h) / 2, 0, 0, Math.PI * 2);
          ctx.stroke();
        } else if (s.kind === 'freehand') {
          if (s.points && s.points.length > 0) {
            ctx.beginPath();
            ctx.moveTo(s.points[0].x, s.points[0].y);
            for (let j = 1; j < s.points.length; j++) {
              ctx.lineTo(s.points[j].x, s.points[j].y);
            }
            ctx.closePath();
            ctx.stroke();
          }
        } else {
          ctx.strokeRect(s.x1, s.y1, w, h);
        }
      }
      ctx.setLineDash([]);
    }

    // Indicador visual de gatilho (escada/elevador) — só o mestre vê
    if (s.triggerType && myRole === 'mestre') {
      const cxRaw = (s.x1 + s.x2) / 2;
      const cyRaw = (s.y1 + s.y2) / 2;
      const center = iso ? _spPt(cxRaw, cyRaw) : { x: cxRaw, y: cyRaw };
      if (iso) center.y -= elev;
      const cx = center.x, cy = center.y;
      const sz = Math.min(Math.abs(s.x2 - s.x1), Math.abs(s.y2 - s.y1)) * 0.35;
      const iconSize = Math.max(16 / BOARD.zoom, Math.min(sz, 60 / BOARD.zoom));

      ctx.fillStyle = 'rgba(0,0,0,0.55)';
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1.5 / BOARD.zoom;

      if (s.triggerType === 'stairs-up' || s.triggerType === 'stair-up') {
        ctx.beginPath();
        ctx.moveTo(cx, cy - iconSize);
        ctx.lineTo(cx - iconSize * 0.8, cy + iconSize * 0.4);
        ctx.lineTo(cx + iconSize * 0.8, cy + iconSize * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold ' + (iconSize * 0.55) + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('▲', cx, cy - iconSize * 0.15);
      } else if (s.triggerType === 'stairs-down' || s.triggerType === 'stair-down') {
        ctx.beginPath();
        ctx.moveTo(cx, cy + iconSize);
        ctx.lineTo(cx - iconSize * 0.8, cy - iconSize * 0.4);
        ctx.lineTo(cx + iconSize * 0.8, cy - iconSize * 0.4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold ' + (iconSize * 0.55) + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('▼', cx, cy + iconSize * 0.15);
      } else if (s.triggerType === 'stairs') {
        const half = iconSize * 0.45;
        ctx.beginPath();
        ctx.moveTo(cx, cy - iconSize * 0.7);
        ctx.lineTo(cx - half, cy - half * 0.3);
        ctx.lineTo(cx + half, cy - half * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(cx, cy + iconSize * 0.7);
        ctx.lineTo(cx - half, cy + half * 0.3);
        ctx.lineTo(cx + half, cy + half * 0.3);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      } else if (s.triggerType === 'elevator-manual' || s.triggerType === 'elevator-auto') {
        const box = iconSize * 0.7;
        ctx.fillRect(cx - box, cy - box, box * 2, box * 2);
        ctx.strokeRect(cx - box, cy - box, box * 2, box * 2);
        ctx.fillStyle = '#ffd700';
        ctx.font = 'bold ' + (iconSize * 0.75) + 'px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('E', cx, cy);
      }
    }

    ctx.restore();
  });
}

function _projPt(x, y) {
  if (BOARD.projection !== 'iso') return { x, y };
  return projectPoint(x, y);
}

function drawShapePreview(ctx) {
  const { shapeStartX, shapeStartY, shapeCurX, shapeCurY, shapeColor, tool } = BOARD;
  ctx.save();
  const color = shapeColor || '#c9903a';
  ctx.fillStyle = hexToRgba(color, 0.2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2 / BOARD.zoom;
  ctx.setLineDash([8 / BOARD.zoom, 4 / BOARD.zoom]);
  const iso = BOARD.projection === 'iso';
  if (tool === 'shape-circle') {
    const s1 = _projPt(shapeStartX, shapeStartY);
    const s2 = _projPt(shapeCurX, shapeCurY);
    const x1 = Math.min(s1.x, s2.x);
    const y1 = Math.min(s1.y, s2.y);
    const w = Math.abs(s2.x - s1.x);
    const h = Math.abs(s2.y - s1.y);
    ctx.beginPath();
    ctx.ellipse(x1 + w / 2, y1 + h / 2, w / 2, h / 2, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  } else if (tool === 'shape-freehand') {
    const pts = BOARD.shapeFreehandPoints || [];
    if (pts.length > 0) {
      ctx.beginPath();
      const p0 = _projPt(pts[0].x, pts[0].y);
      ctx.moveTo(p0.x, p0.y);
      for (let i = 1; i < pts.length; i++) {
        const pi = _projPt(pts[i].x, pts[i].y);
        ctx.lineTo(pi.x, pi.y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  } else {
    const s1 = _projPt(shapeStartX, shapeStartY);
    const s2 = _projPt(shapeCurX, shapeCurY);
    const x1 = Math.min(s1.x, s2.x);
    const y1 = Math.min(s1.y, s2.y);
    const w = Math.abs(s2.x - s1.x);
    const h = Math.abs(s2.y - s1.y);
    ctx.fillRect(x1, y1, w, h);
    ctx.strokeRect(x1, y1, w, h);
  }
  ctx.setLineDash([]);
  ctx.restore();
}

function hexToRgba(hex, alpha) {
  hex = (hex || '#c9903a').replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawWallPreview(ctx) {
  const { wallStartX, wallStartY, wallCurX, wallCurY, wallType } = BOARD;
  ctx.save();
  const elev = BOARD.projection === 'iso' ? isoElevation(getCurrentFloor()) : 0;

  let strokeStyle = 'rgba(232,185,106,0.8)';
  if (wallType === 'invisible') strokeStyle = 'rgba(0, 191, 255, 0.6)';
  else if (wallType === 'door') strokeStyle = 'rgba(211, 47, 47, 0.8)';
  else if (wallType === 'window') strokeStyle = 'rgba(2, 136, 209, 0.8)';

  const p1 = _wallProj(wallStartX, wallStartY, elev);
  const p2 = _wallProj(wallCurX, wallCurY, elev);

  ctx.strokeStyle = strokeStyle;
  ctx.lineWidth = 3 / BOARD.zoom;
  ctx.lineCap = 'round';
  ctx.setLineDash([8 / BOARD.zoom, 4 / BOARD.zoom]);
  ctx.beginPath();
  ctx.moveTo(p1.x, p1.y);
  ctx.lineTo(p2.x, p2.y);
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.restore();
}

function _rulerFlatDist(x1, y1, x2, y2) {
  if (BOARD.projection !== 'iso') return { dx: x2 - x1, dy: y2 - y1 };
  const u1 = unprojectPoint(x1, y1);
  const u2 = unprojectPoint(x2, y2);
  return { dx: u2.x - u1.x, dy: u2.y - u1.y };
}

function drawRulerPreview(ctx) {
  if (!BOARD.rulerActive) return;
  const { rulerStartX, rulerStartY, rulerEndX, rulerEndY, rulerMode, gridSize, gridScaleVal, gridScaleUnit, zoom } = BOARD;
  const f = _rulerFlatDist(rulerStartX, rulerStartY, rulerEndX, rulerEndY);
  const dx = f.dx, dy = f.dy;
  const D = Math.hypot(dx, dy);
  if (D < 2) return;

  let cells;
  if (rulerMode === 'circle' || BOARD.gridType === 'hex') {
    cells = D / gridSize;
  } else {
    const gridDx = Math.round(Math.abs(dx) / gridSize);
    const gridDy = Math.round(Math.abs(dy) / gridSize);
    if (BOARD.distanceMode === 'euclidean') {
      cells = D / gridSize;
    } else if (BOARD.distanceMode === 'double_diagonal') {
      cells = Math.max(gridDx, gridDy) + Math.min(gridDx, gridDy);
    } else {
      cells = Math.max(gridDx, gridDy);
    }
  }
  
  const val = cells * gridScaleVal;
  const formattedText = val.toFixed(1) + ' ' + (gridScaleUnit || 'm');

  ctx.save();
  ctx.strokeStyle = '#00bfff';
  ctx.lineWidth = 3 / zoom;

  if (rulerMode === 'circle') {
    ctx.setLineDash([6 / zoom, 4 / zoom]);
    ctx.fillStyle = 'rgba(0, 191, 255, 0.12)';
    ctx.beginPath();
    ctx.arc(rulerStartX, rulerStartY, D, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(rulerStartX, rulerStartY);
    ctx.lineTo(rulerEndX, rulerEndY);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(rulerStartX, rulerStartY);
    ctx.lineTo(rulerEndX, rulerEndY);
    ctx.stroke();

    ctx.fillStyle = '#00bfff';
    ctx.beginPath();
    ctx.arc(rulerStartX, rulerStartY, 5 / zoom, 0, Math.PI * 2);
    ctx.arc(rulerEndX, rulerEndY, 5 / zoom, 0, Math.PI * 2);
    ctx.fill();
  }

  const midX = (rulerStartX + rulerEndX) / 2;
  const midY = (rulerStartY + rulerEndY) / 2;

  ctx.font = `${Math.max(12, 14 / zoom)}px 'Cinzel', sans-serif`;
  const textWidth = ctx.measureText(formattedText).width;
  const paddingX = 8 / zoom;
  const paddingY = 4 / zoom;
  const bgW = textWidth + paddingX * 2;
  const bgH = Math.max(16, 20 / zoom);

  ctx.fillStyle = 'rgba(20, 15, 10, 0.85)';
  ctx.strokeStyle = '#8b6b3e';
  ctx.lineWidth = 1.5 / zoom;
  
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(midX - bgW / 2, midY - bgH / 2, bgW, bgH, 4 / zoom);
  } else {
    ctx.rect(midX - bgW / 2, midY - bgH / 2, bgW, bgH);
  }
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#e8d5a3';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(formattedText, midX, midY);

  ctx.restore();
}

// ── Régua com Waypoints ──
function _wayFlatDist(p1, p2) {
  if (BOARD.projection !== 'iso') return { dx: p2.x - p1.x, dy: p2.y - p1.y };
  const u1 = unprojectPoint(p1.x, p1.y);
  const u2 = unprojectPoint(p2.x, p2.y);
  return { dx: u2.x - u1.x, dy: u2.y - u1.y };
}

function _wayCells(dx, dy, gridSize) {
  if (BOARD.gridType === 'hex') return Math.hypot(dx, dy) / gridSize;
  const gridDx = Math.round(Math.abs(dx) / gridSize);
  const gridDy = Math.round(Math.abs(dy) / gridSize);
  if (BOARD.distanceMode === 'euclidean') return Math.hypot(dx, dy) / gridSize;
  if (BOARD.distanceMode === 'double_diagonal') return Math.max(gridDx, gridDy) + Math.min(gridDx, gridDy);
  return Math.max(gridDx, gridDy);
}

function drawWayRulerPreview(ctx) {
  const pts = BOARD.wayRulerPoints;
  if (!pts || !pts.length) return;
  const { gridSize, gridScaleVal, gridScaleUnit, zoom } = BOARD;
  const col = '#ffaa44';

  ctx.save();
  ctx.lineWidth = 2 / zoom;
  ctx.strokeStyle = col;
  ctx.fillStyle = col;
  ctx.setLineDash([]);

  let totalDist = 0;
  for (let i = 1; i < pts.length; i++) {
    const f = _wayFlatDist(pts[i - 1], pts[i]);
    const cells = _wayCells(f.dx, f.dy, gridSize);
    totalDist += cells;

    const val = cells * gridScaleVal;
    const label = val.toFixed(1) + ' ' + (gridScaleUnit || 'm');

    ctx.beginPath();
    ctx.moveTo(pts[i - 1].x, pts[i - 1].y);
    ctx.lineTo(pts[i].x, pts[i].y);
    ctx.stroke();

    const mx = (pts[i - 1].x + pts[i].x) / 2;
    const my = (pts[i - 1].y + pts[i].y) / 2;
    ctx.font = `${Math.max(11, 13 / zoom)}px 'Cinzel', sans-serif`;
    const tw = ctx.measureText(label).width;
    const px = 6 / zoom, py = 3 / zoom;
    const bw = tw + px * 2, bh = Math.max(14, 18 / zoom);
    ctx.fillStyle = 'rgba(30,20,10,0.8)';
    ctx.strokeStyle = col;
    ctx.lineWidth = 1 / zoom;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(mx - bw / 2, my - bh / 2, bw, bh, 3 / zoom);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillRect(mx - bw / 2, my - bh / 2, bw, bh);
      ctx.strokeRect(mx - bw / 2, my - bh / 2, bw, bh);
    }
    ctx.fillStyle = col;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, mx, my);
  }

  // Linha pontilhada para o preview (último ponto → mouse)
  if (BOARD.wayRulerActive && pts.length > 0) {
    const lastPt = pts[pts.length - 1];
    const tempPt = { x: BOARD.wayRulerTempX, y: BOARD.wayRulerTempY };
    const f = _wayFlatDist(lastPt, tempPt);
    
    ctx.setLineDash([4 / zoom, 4 / zoom]);
    ctx.strokeStyle = 'rgba(255,170,68,0.5)';
    ctx.lineWidth = 1.5 / zoom;
    ctx.beginPath();
    ctx.moveTo(lastPt.x, lastPt.y);
    ctx.lineTo(tempPt.x, tempPt.y);
    ctx.stroke();
    ctx.setLineDash([]);
    
    const tempCells = _wayCells(f.dx, f.dy, gridSize);
    
    if (tempCells > 0) {
      const val = tempCells * gridScaleVal;
      const label = '+' + val.toFixed(1) + ' ' + (gridScaleUnit || 'm');
      const mx = (lastPt.x + tempPt.x) / 2;
      const my = (lastPt.y + tempPt.y) / 2;
      
      ctx.font = `${Math.max(11, 13 / zoom)}px 'Cinzel', sans-serif`;
      const tw = ctx.measureText(label).width;
      const px = 6 / zoom, py = 3 / zoom;
      const bw = tw + px * 2, bh = Math.max(14, 18 / zoom);
      ctx.fillStyle = 'rgba(30,20,10,0.6)';
      ctx.strokeStyle = 'rgba(255,170,68,0.5)';
      ctx.lineWidth = 1 / zoom;
      if (ctx.roundRect) {
        ctx.beginPath();
        ctx.roundRect(mx - bw / 2, my - bh / 2, bw, bh, 3 / zoom);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(mx - bw / 2, my - bh / 2, bw, bh);
        ctx.strokeRect(mx - bw / 2, my - bh / 2, bw, bh);
      }
      ctx.fillStyle = 'rgba(255,170,68,0.8)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(label, mx, my);
      
      totalDist += tempCells;
    }
  }

  // Bolinhas nos waypoints
  for (let i = 0; i < pts.length; i++) {
    ctx.beginPath();
    ctx.arc(pts[i].x, pts[i].y, (i === 0 || i === pts.length - 1 && !BOARD.wayRulerActive) ? 5 / zoom : 3.5 / zoom, 0, Math.PI * 2);
    ctx.fillStyle = i === 0 ? '#44dd88' : (i === pts.length - 1 && !BOARD.wayRulerActive ? '#ff4444' : col);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1 / zoom;
    ctx.stroke();
  }

  if (totalDist > 0) {
    const totalVal = totalDist * gridScaleVal;
    const totalLabel = 'Total: ' + totalVal.toFixed(1) + ' ' + (gridScaleUnit || 'm');

    ctx.font = `bold ${Math.max(13, 16 / zoom)}px 'Cinzel', sans-serif`;
    const tw = ctx.measureText(totalLabel).width;
    const px = 10 / zoom, py = 5 / zoom;
    const bw = tw + px * 2, bh = Math.max(20, 26 / zoom);
    const cx = pts[0].x + (pts[pts.length - 1].x - pts[0].x) / 2;
    const cy = pts[0].y + (pts[pts.length - 1].y - pts[0].y) / 2;

    ctx.fillStyle = 'rgba(30,20,10,0.85)';
    ctx.strokeStyle = '#ffaa44';
    ctx.lineWidth = 1.5 / zoom;
    if (ctx.roundRect) {
      ctx.beginPath();
      ctx.roundRect(cx - bw / 2, cy - bh / 2 - 22 / zoom, bw, bh, 4 / zoom);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillRect(cx - bw / 2, cy - bh / 2 - 22 / zoom, bw, bh);
      ctx.strokeRect(cx - bw / 2, cy - bh / 2 - 22 / zoom, bw, bh);
    }
    ctx.fillStyle = '#ffcc66';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(totalLabel, cx, cy - 22 / zoom);
  }

  ctx.restore();
}

function drawFogRectPreview(ctx) {
  if (!BOARD.fogPainting || BOARD.fogShape !== 'rect' || !BOARD.fogRectStart || !BOARD.fogRectCur) return;
  const gs = BOARD.gridSize;
  const gx1 = BOARD.fogRectStart.gx;
  const gy1 = BOARD.fogRectStart.gy;
  const gx2 = BOARD.fogRectCur.gx;
  const gy2 = BOARD.fogRectCur.gy;

  const minX = Math.min(gx1, gx2) * gs;
  const minY = Math.min(gy1, gy2) * gs;
  const maxX = (Math.max(gx1, gx2) + 1) * gs;
  const maxY = (Math.max(gy1, gy2) + 1) * gs;
  const w = maxX - minX;
  const h = maxY - minY;

  ctx.save();
  if (BOARD.tool === 'reveal') {
    ctx.fillStyle = 'rgba(76, 175, 80, 0.25)';
    ctx.strokeStyle = '#4CAF50';
  } else {
    ctx.fillStyle = 'rgba(244, 67, 54, 0.25)';
    ctx.strokeStyle = '#F44336';
  }

  ctx.lineWidth = 2 / BOARD.zoom;
  ctx.setLineDash([6 / BOARD.zoom, 4 / BOARD.zoom]);
  if (BOARD.projection === 'iso') {
    const c1 = projectPoint(minX, minY);
    const c2 = projectPoint(maxX, minY);
    const c3 = projectPoint(maxX, maxY);
    const c4 = projectPoint(minX, maxY);
    ctx.beginPath();
    ctx.moveTo(c1.x, c1.y);
    ctx.lineTo(c2.x, c2.y);
    ctx.lineTo(c3.x, c3.y);
    ctx.lineTo(c4.x, c4.y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  } else {
    ctx.fillRect(minX, minY, w, h);
    ctx.strokeRect(minX, minY, w, h);
  }
  ctx.restore();
}

function _drawFogTile(ctx, gx, gy, gs) {
  if (BOARD.projection === 'iso') {
    const c = projectTileCorners(gx, gy);
    ctx.moveTo(c[0].x, c[0].y);
    for (let i = 1; i < 4; i++) ctx.lineTo(c[i].x, c[i].y);
    ctx.closePath();
  } else {
    ctx.rect(gx * gs, gy * gs, gs, gs);
  }
}

function drawFog(ctx, W, H) {
  if (!BOARD.fogVisible) return;
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const gs = gridSize;
  const f = getCurrentFloor();
  const x0 = Math.floor(-offsetX / zoom / gs) - 1;
  const y0 = Math.floor(-offsetY / zoom / gs) - 1;
  const x1 = Math.ceil((W / zoom - offsetX / zoom) / gs) + 1;
  const y1 = Math.ceil((H / zoom - offsetY / zoom) / gs) + 1;

  ctx.save();
  ctx.fillStyle = 'rgba(10,8,6,0.82)';
  ctx.beginPath();
  for (let gx = x0; gx <= x1; gx++) {
    for (let gy = y0; gy <= y1; gy++) {
      const key = f === 0 ? `${gx},${gy}` : `${f}:${gx},${gy}`;
      if (!BOARD.fogVisible.has(key)) {
        _drawFogTile(ctx, gx, gy, gs);
      }
    }
  }
  ctx.fill();
  ctx.restore();
}

function computeVisibility(token, radius) {
  // Se radius não fornecido, calcular baseado no tipo de visão e iluminação
  if (radius === undefined) {
    radius = getEffectiveVisionRadius(token);
  }

  const { gridSize, walls, gridCols, gridRows, lightingType } = BOARD;
  const gs = gridSize;
  const sz = (token.size || 1);
  const ox = token.gx * gs + sz * gs / 2;
  const oy = token.gy * gs + sz * gs / 2;

  const visible = new Set();
  const gx0 = Math.floor(ox / gs);
  const gy0 = Math.floor(oy / gs);
  const tokenFloor = getFloorFromZ(token.z);
  const relevantWalls = (walls || []).filter(w => getFloorFromZ(w.z) === tokenFloor);

  // Sem alcance: nenhuma célula visível
  if (radius <= 0) return visible;

  if (lightingType === 'sunny' && radius > 1) {
    const cols = gridCols || 30;
    const rows = gridRows || 30;
    for (let gx = 0; gx < cols; gx++) {
      for (let gy = 0; gy < rows; gy++) {
        const tx = gx * gs + gs / 2;
        const ty = gy * gs + gs / 2;
        if (!rayHitsWall(ox, oy, tx, ty, relevantWalls)) {
          const key = tokenFloor === 0 ? `${gx},${gy}` : `${tokenFloor}:${gx},${gy}`;
          visible.add(key);
        }
      }
    }
    return visible;
  }

  // Para todos os outros tipos de iluminação, usar o raio calculado por getEffectiveVisionRadius
  for (let dgx = -radius; dgx <= radius; dgx++) {
    for (let dgy = -radius; dgy <= radius; dgy++) {
      if (dgx * dgx + dgy * dgy > radius * radius) continue;
      const gx = gx0 + dgx;
      const gy = gy0 + dgy;
      if (gx < 0 || gy < 0) continue;
      const tx = gx * gs + gs / 2;
      const ty = gy * gs + gs / 2;
      if (!rayHitsWall(ox, oy, tx, ty, relevantWalls)) {
        const key = tokenFloor === 0 ? `${gx},${gy}` : `${tokenFloor}:${gx},${gy}`;
        visible.add(key);
      }
    }
  }
  return visible;
}

function wallBlocksVision(w) {
  const type = w.type || 'normal';
  if (type === 'invisible') return false;
  if (type === 'door' && w.open) return false;
  if (type === 'window' && w.open) return false;
  return true;
}

function wallBlocksMovement(w) {
  const type = w.type || 'normal';
  if (type === 'door' && w.open) return false;
  return true;
}

function checkMoveBlocked(token, fromGx, fromGy, toGx, toGy) {
  const { gridSize, walls } = BOARD;
  const sz = (token.size || 1) * gridSize;
  const startX = fromGx * gridSize + sz / 2;
  const startY = fromGy * gridSize + sz / 2;
  const endX = toGx * gridSize + sz / 2;
  const endY = toGy * gridSize + sz / 2;
  const tokenFloor = getFloorFromZ(token.z);
  const relevantWalls = (walls || []).filter(w => getFloorFromZ(w.z) === tokenFloor);

  for (const w of relevantWalls) {
    if (wallBlocksMovement(w)) {
      if (segmentsIntersect(startX, startY, endX, endY, w.x1, w.y1, w.x2, w.y2)) {
        return true;
      }
    }
  }
  return false;
}

function checkMoveBlockedForScene(token, fromGx, fromGy, toGx, toGy, scene) {
  const oldWalls = BOARD.walls;
  const oldGridSize = BOARD.gridSize;
  
  BOARD.walls = scene.walls || [];
  BOARD.gridSize = scene.gridSize || 50;
  
  const blocked = checkMoveBlocked(token, fromGx, fromGy, toGx, toGy);
  
  BOARD.walls = oldWalls;
  BOARD.gridSize = oldGridSize;
  
  return blocked;
}

function rayHitsWall(ax, ay, bx, by, walls) {
  for (const w of walls) {
    if (wallBlocksVision(w)) {
      if (segmentsIntersect(ax, ay, bx, by, w.x1, w.y1, w.x2, w.y2)) return true;
    }
  }
  return false;
}

function segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  const d1x = bx - ax, d1y = by - ay;
  const d2x = dx - cx, d2y = dy - cy;
  const cross = d1x * d2y - d1y * d2x;
  if (Math.abs(cross) < 1e-10) return false;
  const dx2 = cx - ax, dy2 = cy - ay;
  const t = (dx2 * d2y - dy2 * d2x) / cross;
  const u = (dx2 * d1y - dy2 * d1x) / cross;
  return t > 0.001 && t < 0.999 && u > 0.001 && u < 0.999;
}

function getLightingColor(type) {
  switch (type) {
    case 'darknight':  return 'rgba(8, 6, 18, 0.92)';     // Noite Escura: quasi-total
    case 'starnight':  return 'rgba(15, 20, 60, 0.72)';   // Noite Estrelada: azul-índigo com luminosidade sutil
    case 'twilight':   return 'rgba(180, 80, 50, 0.18)';  // Crepuúsculo: laranja quente
    case 'cave':       return 'rgba(5, 5, 10, 0.97)';     // Caverna: escuro total
    case 'cloudy':     return 'rgba(100, 100, 120, 0.12)';// Nublado: cinza leve
    case 'rainy':      return 'rgba(80, 100, 130, 0.25)'; // Chuva: azul-acinzentado
    case 'snowy':      return 'rgba(200, 210, 230, 0.20)';// Neve: branco-azulado frio
    default:           return 'transparent';
  }
}

function getTokenCenter(t, gx, gy) {
  return tokenWorldPos(gx, gy);
}

function drawToken(ctx, t, isDragging, isHovered) {
  const layer = t.layer || 'players';
  if (layer === 'gm' && (myRole !== 'mestre' || emVisaoJogador())) return;
  const isObject = t.type === 'object';

  // Calcular visibilidade por névoa antes de desenhar
  let _fogFloor = null, _fogCanSeeAnyway = true;
  if (BOARD.fogVisible) {
    _fogFloor = getFloorFromZ(t.z);
    if (emVisaoJogador()) {
      _fogCanSeeAnyway = (t.id === BOARD.playerViewTokenId);
    } else {
      _fogCanSeeAnyway = temControleToken(t);
    }

    if (!_fogCanSeeAnyway) {
      // Verificar se QUALQUER célula que o token ocupa está visível
      const spanX = (t.sizeX || t.size || 1);
      const spanY = (t.sizeY || t.size || 1);
      let isVisible = false;
      outer:
      for (let dx = 0; dx < spanX; dx++) {
        for (let dy = 0; dy < spanY; dy++) {
          const cellGx = t.gx + dx;
          const cellGy = t.gy + dy;
          const key = _fogFloor === 0 ? `${cellGx},${cellGy}` : `${_fogFloor}:${cellGx},${cellGy}`;
          if (BOARD.fogVisible.has(key)) { isVisible = true; break outer; }
        }
      }
      if (!isVisible) return;
    }
  }

  const isSelected = BOARD.selectedTokens.has(t.id);
  const rotation = t.rotation || 0;
  const { gridSize } = BOARD;
  const gs = gridSize;
  const sizeW = (t.sizeX || t.size || 1) * gs;
  const sizeH = (t.sizeY || t.size || 1) * gs;
  const pos = tokenWorldPos(t.gx, t.gy);
  const floorElev = BOARD.projection === 'iso' ? isoElevation(getFloorFromZ(t.z)) : 0;
  const px = pos.x;
  const py = pos.y - floorElev;
  const rX = isObject ? sizeW / 2 : sizeW * 0.42;
  const rY = isObject ? sizeH / 2 : sizeH * 0.42;

  ctx.save();

  if (layer === 'gm') {
    ctx.globalAlpha = 0.5;
  }

  // Sombra projetada no modo isométrico
  if (BOARD.projection === 'iso' && floorElev > 1) {
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.strokeStyle = 'rgba(0,0,0,0.1)';
    ctx.lineWidth = 0.5 / BOARD.zoom;
    if (isObject) {
      const shw = sizeW * ISO_RATIO * 0.9;
      const shh = sizeH * ISO_RATIO * ISO_RATIO * 0.9;
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y, shw / 2, shh / 2, 0, 0, Math.PI * 2);
    } else {
      const sr = Math.max(rX, rY) * ISO_RATIO * 0.9;
      ctx.beginPath();
      ctx.ellipse(pos.x, pos.y, sr, sr * ISO_RATIO, 0, 0, Math.PI * 2);
    }
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  const halfW = rX;
  const halfH = rY;

  if (isObject) {
    if (t.imageUrl) {
      const isVideo = isVideoUrl(t.imageUrl);
      let img = tokenImageCache[t.imageUrl];
      if (!isVideo && !img) {
        img = new Image();
        img.src = t.imageUrl;
        img.onload = () => boardRender();
        tokenImageCache[t.imageUrl] = img;
      }

      const mediaReady = isVideo
        ? isVideoReady(t.imageUrl)
        : (img && img.complete && img.naturalWidth !== 0);

      if (mediaReady) {
        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(rotation);
        ctx.translate(-px, -py);
        const drawSrc = isAnimatedMediaUrl(t.imageUrl)
          ? getAnimatedFrame(t.imageUrl, img ? img.naturalWidth : 0, img ? img.naturalHeight : 0)
          : img;
        ctx.drawImage(drawSrc, px - halfW, py - halfH, sizeW, sizeH);
        ctx.restore();
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(px - halfW, py - halfH, sizeW, sizeH);
      }
    } else {
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.fillRect(px - halfW, py - halfH, sizeW, sizeH);
    }
    ctx.strokeStyle = isDragging ? '#e8b96a' : isHovered ? '#c9903a' : (isSelected ? '#00bfff' : 'rgba(255,255,255,0.2)');
    ctx.lineWidth = (isDragging || isSelected ? 2.5 : 1) / BOARD.zoom;
    ctx.strokeRect(px - halfW, py - halfH, sizeW, sizeH);
    if (isSelected) {
      const hSize = 7 / BOARD.zoom;
      const half = Math.max(halfW, halfH);
      const rotOff = half + 14 / BOARD.zoom;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(px + half * 0.7 * Math.sin(rotation), py - half * 0.7 * Math.cos(rotation));
      ctx.lineTo(px + rotOff * Math.sin(rotation), py - rotOff * Math.cos(rotation));
      ctx.strokeStyle = 'rgba(0, 191, 255, 0.6)';
      ctx.lineWidth = 1.5 / BOARD.zoom;
      ctx.stroke();
      const rotHX2 = px + rotOff * Math.sin(rotation);
      const rotHY2 = py - rotOff * Math.cos(rotation);
      ctx.fillStyle = '#00bfff';
      ctx.strokeStyle = '#005f7f';
      ctx.lineWidth = 1 / BOARD.zoom;
      ctx.fillRect(rotHX2 - hSize / 2, rotHY2 - hSize / 2, hSize, hSize);
      ctx.strokeRect(rotHX2 - hSize / 2, rotHY2 - hSize / 2, hSize, hSize);
      ctx.restore();
      const rhX2 = px + half * Math.cos(rotation) - half * Math.sin(rotation);
      const rhY2 = py + half * Math.sin(rotation) + half * Math.cos(rotation);
      ctx.save();
      ctx.fillStyle = '#00ff88';
      ctx.strokeStyle = '#007744';
      ctx.lineWidth = 1 / BOARD.zoom;
      ctx.fillRect(rhX2 - hSize / 2, rhY2 - hSize / 2, hSize, hSize);
      ctx.strokeRect(rhX2 - hSize / 2, rhY2 - hSize / 2, hSize, hSize);
      ctx.restore();
    }
    // Indicador de alvo para objetos
    if (BOARD.targetedTokens && BOARD.targetedTokens.has(t.id)) {
      ctx.save();
      ctx.strokeStyle = '#ff4444';
      ctx.lineWidth = 2 / BOARD.zoom;
      ctx.shadowColor = 'rgba(255,68,68,0.5)';
      ctx.shadowBlur = 6 / BOARD.zoom;
      ctx.setLineDash([4 / BOARD.zoom, 4 / BOARD.zoom]);
      ctx.strokeRect(px - halfW - 3 / BOARD.zoom, py - halfH - 3 / BOARD.zoom, sizeW + 6 / BOARD.zoom, sizeH + 6 / BOARD.zoom);
      ctx.setLineDash([]);
      ctx.restore();
    }
    // Overlay de névoa parcial sobre o objeto: células fora da visão ficam escuras,
    // células de borda (limítrofes à área visível) ficam com blur para fade suave.
    if (BOARD.fogVisible && !_fogCanSeeAnyway) {
      const spanX = Math.ceil(t.sizeX || t.size || 1);
      const spanY = Math.ceil(t.sizeY || t.size || 1);
      const floor = _fogFloor;
      const gs = BOARD.gridSize;

      // Helper para gerar key de névoa
      const fogKey = (gx, gy) => floor === 0 ? `${gx},${gy}` : `${floor}:${gx},${gy}`;

      // Overlay sem blur (salvo separado do ctx.save anterior)
      ctx.save();
      // Clip ao bounding box do objeto para o overlay não vazar
      ctx.beginPath();
      if (BOARD.projection === 'iso') {
        const c0 = projectPoint(t.gx * gs, t.gy * gs);
        const c1 = projectPoint((t.gx + spanX) * gs, t.gy * gs);
        const c2 = projectPoint((t.gx + spanX) * gs, (t.gy + spanY) * gs);
        const c3 = projectPoint(t.gx * gs, (t.gy + spanY) * gs);
        ctx.moveTo(c0.x, c0.y);
        ctx.lineTo(c1.x, c1.y);
        ctx.lineTo(c2.x, c2.y);
        ctx.lineTo(c3.x, c3.y);
        ctx.closePath();
      } else {
        ctx.rect(t.gx * gs, t.gy * gs, spanX * gs, spanY * gs);
      }
      ctx.clip();

      ctx.filter = 'none';
      ctx.fillStyle = 'rgba(10,8,6,0.92)';
      ctx.beginPath();
      for (let dx = 0; dx < spanX; dx++) {
        for (let dy = 0; dy < spanY; dy++) {
          const cellGx = t.gx + dx;
          const cellGy = t.gy + dy;
          if (BOARD.fogVisible.has(fogKey(cellGx, cellGy))) continue;
          const isBoundary =
            BOARD.fogVisible.has(fogKey(cellGx - 1, cellGy)) ||
            BOARD.fogVisible.has(fogKey(cellGx + 1, cellGy)) ||
            BOARD.fogVisible.has(fogKey(cellGx, cellGy - 1)) ||
            BOARD.fogVisible.has(fogKey(cellGx, cellGy + 1));
          if (BOARD.projection === 'iso') {
            if (isBoundary) continue; // skip boundary in iso (simplified)
            _drawFogTile(ctx, cellGx, cellGy, gs);
          } else if (!isBoundary) {
            ctx.rect(cellGx * gs, cellGy * gs, gs, gs);
          }
        }
      }
      ctx.fill();

      // Segunda passagem (apenas 2D): células de borda com blur para fade suave
      if (BOARD.projection !== 'iso') {
        ctx.filter = `blur(${Math.max(4, gs * 0.35)}px)`;
        ctx.fillStyle = 'rgba(10,8,6,0.88)';
        ctx.beginPath();
        for (let dx = 0; dx < spanX; dx++) {
          for (let dy = 0; dy < spanY; dy++) {
            const cellGx = t.gx + dx;
            const cellGy = t.gy + dy;
            if (BOARD.fogVisible.has(fogKey(cellGx, cellGy))) continue;
            const isBoundary =
              BOARD.fogVisible.has(fogKey(cellGx - 1, cellGy)) ||
              BOARD.fogVisible.has(fogKey(cellGx + 1, cellGy)) ||
              BOARD.fogVisible.has(fogKey(cellGx, cellGy - 1)) ||
              BOARD.fogVisible.has(fogKey(cellGx, cellGy + 1));
            if (isBoundary) {
              ctx.rect(cellGx * gs - gs * 0.5, cellGy * gs - gs * 0.5, gs * 2, gs * 2);
            }
          }
        }
        ctx.fill();
        ctx.filter = 'none';
      }
      ctx.restore();
    }
    ctx.restore();
    return;
  }

  const tokenR = Math.max(rX, rY);

  // Desenhar auras visuais antes do token
  if (t.auras && t.auras.length > 0) {
    const AURA_COLORS = ['#ff8800', '#4488ff'];
    const scaleVal = BOARD.gridScaleVal || 1.5;
    t.auras.forEach((aura, idx) => {
      if (!aura.active || !aura.radius || aura.radius <= 0) return;
      const auraRadiusCells = aura.radius / scaleVal;
      const auraRadiusPx = auraRadiusCells * gs;
      const color = AURA_COLORS[idx] || '#ffffff';
      const r = parseInt(color.slice(1,3), 16);
      const g2 = parseInt(color.slice(3,5), 16);
      const b = parseInt(color.slice(5,7), 16);
      ctx.save();
      // Auras com Light ativo: visual mais brilhante com glow
      if (aura.light) {
        ctx.shadowColor = `rgba(${r},${g2},${b},0.6)`;
        ctx.shadowBlur = 25 / BOARD.zoom;
        ctx.beginPath();
        ctx.arc(px, py, auraRadiusPx, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g2},${b},0.12)`;
        ctx.fill();
        ctx.shadowColor = `rgba(${r},${g2},${b},0.4)`;
        ctx.shadowBlur = 10 / BOARD.zoom;
        ctx.strokeStyle = `rgba(255,255,200,0.5)`;
        ctx.lineWidth = 2 / BOARD.zoom;
        ctx.setLineDash([]);
        ctx.stroke();
      } else {
        ctx.beginPath();
        ctx.arc(px, py, auraRadiusPx, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g2},${b},0.18)`;
        ctx.fill();
        ctx.strokeStyle = `rgba(${r},${g2},${b},0.55)`;
        ctx.lineWidth = 1.5 / BOARD.zoom;
        ctx.setLineDash([5 / BOARD.zoom, 4 / BOARD.zoom]);
        ctx.stroke();
      }
      ctx.setLineDash([]);
      ctx.restore();
    });
  }

  if (isSelected) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, tokenR + 4 / BOARD.zoom, 0, Math.PI * 2);
    ctx.strokeStyle = '#00bfff';
    ctx.lineWidth = 2.5 / BOARD.zoom;
    ctx.shadowColor = 'rgba(0, 191, 255, 0.7)';
    ctx.shadowBlur = 10 / BOARD.zoom;
    ctx.stroke();
    ctx.restore();
  }

  // Indicador de alvo (target)
  if (BOARD.targetedTokens && BOARD.targetedTokens.has(t.id)) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(px, py, tokenR + 8 / BOARD.zoom, 0, Math.PI * 2);
    ctx.strokeStyle = '#ff4444';
    ctx.lineWidth = 2 / BOARD.zoom;
    ctx.shadowColor = 'rgba(255,68,68,0.6)';
    ctx.shadowBlur = 8 / BOARD.zoom;
    ctx.setLineDash([4 / BOARD.zoom, 4 / BOARD.zoom]);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  }

  if (isDragging || isHovered) {
    ctx.shadowColor = 'rgba(201,144,58,0.6)';
    ctx.shadowBlur = 12 / BOARD.zoom;
  }

  ctx.beginPath();
  ctx.ellipse(px, py, rX, rY, 0, 0, Math.PI * 2);
  ctx.fillStyle = t.color || '#c94040';
  ctx.fill();

  let hasDrawnImage = false;
  if (t.imageUrl) {
    const isVideo = isVideoUrl(t.imageUrl);
    let img = tokenImageCache[t.imageUrl];
    if (!isVideo && !img) {
      img = new Image();
      img.src = t.imageUrl;
      img.onload = () => boardRender();
      tokenImageCache[t.imageUrl] = img;
    }

    const mediaReady = isVideo ? isVideoReady(t.imageUrl) : (img.complete && img.naturalWidth !== 0);

    if (mediaReady) {
      ctx.save();
      ctx.translate(px, py);
      ctx.rotate(rotation);
      ctx.translate(-px, -py);

      ctx.beginPath();
      ctx.ellipse(px, py, rX, rY, 0, 0, Math.PI * 2);
      ctx.clip();

      let imagePosition = t.imagePosition || '50% 50%';
      if (t.name) {
        const cleanName = t.name.replace(/\s+\d+$/, '').trim();
        const customEntry = t20ThreatImagesCache[cleanName];
        if (customEntry && typeof customEntry === 'object' && customEntry.position) {
          imagePosition = customEntry.position;
        }
      }

      let posX = 50;
      let posY = 50;
      const m = imagePosition.match(/(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/);
      if (m) {
        posX = parseFloat(m[1]);
        posY = parseFloat(m[2]);
      }

      const srcW = isVideo ? (getVideo(t.imageUrl).video.videoWidth || 1) : img.naturalWidth;
      const srcH = isVideo ? (getVideo(t.imageUrl).video.videoHeight || 1) : img.naturalHeight;
      const w = srcW;
      const h = srcH;
      const s = Math.min(w, h);

      let sx = 0;
      let sy = 0;

      if (w > h) {
        sx = (w - h) * posX / 100;
      } else {
        sy = (h - w) * posY / 100;
      }

      if (isAnimatedMediaUrl(t.imageUrl)) {
        const frame = getAnimatedFrame(t.imageUrl, w, h);
        ctx.drawImage(frame, sx, sy, s, s, px - tokenR, py - tokenR, tokenR * 2, tokenR * 2);
      } else {
        ctx.drawImage(img, sx, sy, s, s, px - tokenR, py - tokenR, tokenR * 2, tokenR * 2);
      }
      ctx.restore();
      hasDrawnImage = true;
    }
  }

  // Ofuscado: overlay branco + blur sobre o token
  if (t.conditions && t.conditions.indexOf('Ofuscado') !== -1) {
    ctx.save();
    ctx.filter = `blur(${Math.max(2, tokenR * 0.18)}px)`;
    ctx.beginPath();
    ctx.ellipse(px, py, rX, rY, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,220,0.45)';
    ctx.fill();
    ctx.filter = 'none';
    ctx.restore();
  }
  ctx.lineWidth = (isDragging ? 2.5 : 1.5) / BOARD.zoom;
  if (layer === 'gm') {
    ctx.setLineDash([4 / BOARD.zoom, 2 / BOARD.zoom]);
  }
  ctx.stroke();
  ctx.setLineDash([]);

  ctx.shadowBlur = 0;

  if (!hasDrawnImage) {
    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(rotation);
    const initial = (t.name || '?')[0].toUpperCase();
    const fontSize = Math.max(10, tokenR * 0.9);
    ctx.font = `bold ${fontSize}px Cinzel, serif`;
    ctx.fillStyle = '#fff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(initial, 0, 0);
    ctx.restore();
  }

  const nameFontSize = Math.max(8, gs * 0.22);
  if (!t.hideName) {
    ctx.font = `${nameFontSize}px Cinzel, serif`;
    ctx.fillStyle = '#e8d9c0';
    ctx.strokeStyle = 'rgba(0,0,0,0.8)';
    ctx.lineWidth = 2.5 / BOARD.zoom;
    ctx.strokeText(t.name || '', px, py + tokenR + nameFontSize * 0.9);
    ctx.fillText(t.name || '', px, py + tokenR + nameFontSize * 0.9);

    if (t.conditions && t.conditions.length) {
      const emojiSize = Math.max(9, gs * 0.18);
      ctx.font = `${emojiSize}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'bottom';
      const gap = emojiSize * 0.4;
      const condStartY = py + tokenR + nameFontSize * 0.9 + emojiSize * 0.6;
      const visibleConds = t.conditions.slice(0, 6);
      const widths = visibleConds.map(c => ctx.measureText(CONDITION_EMOJI[c] || '?').width);
      const totalW = widths.reduce((a, b) => a + b + gap, -gap);
      let cx3 = px - totalW / 2;
      visibleConds.forEach(c => {
        const emoji = CONDITION_EMOJI[c] || '?';
        const w = ctx.measureText(emoji).width;
        ctx.fillStyle = 'rgba(0,0,0,0.5)';
        ctx.fillText(emoji, cx3 + w / 2 + 0.5, condStartY + 0.5);
        ctx.fillStyle = '#fff';
        ctx.fillText(emoji, cx3 + w / 2, condStartY);
        cx3 += w + gap;
      });
      if (t.conditions.length > 6) {
        ctx.font = `bold ${emojiSize * 0.7}px sans-serif`;
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText(`+${t.conditions.length - 6}`, cx3 + gap * 0.3, condStartY);
      }
    }
  }

  if (t.hpMax > 0) {
    const barW = sizeW * 0.7;
    const barH = Math.max(4, gs * 0.1);
    const barX = px - barW / 2;
    const barY = py - tokenR - barH - 3 / BOARD.zoom;
    const pct = Math.max(0, Math.min(1, t.hp / t.hpMax));
    const hpColor = pct > 0.5 ? '#3a7a42' : pct > 0.25 ? '#8a7a1a' : '#8a2a1a';

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.fillRect(barX, barY, barW, barH);
    ctx.fillStyle = hpColor;
    ctx.fillRect(barX, barY, barW * pct, barH);
    ctx.strokeStyle = 'rgba(0,0,0,0.4)';
    ctx.lineWidth = 0.5 / BOARD.zoom;
    ctx.strokeRect(barX, barY, barW, barH);
  }

  if (t.pmMax !== undefined || t.defense !== undefined) {
    const circleR = Math.max(5, gs * 0.09);
    const gap = circleR * 0.6;
    const stats = [
      { v: t.hp ?? 0, m: t.hpMax, label: 'PV', color: t.hpMax > 0 ? (t.hp / t.hpMax > 0.5 ? '#3a7a42' : t.hp / t.hpMax > 0.25 ? '#8a7a1a' : '#8a2a1a') : '#3a7a42' },
      { v: t.pm ?? 0, m: t.pmMax, label: 'PM', color: '#2a5a8a' },
      { v: parseInt(String(t.defense ?? 0)) || 0, m: t.defenseMax, label: 'DEF', color: '#c9903a' }
    ];
    const totalW = stats.length * (circleR * 2) + (stats.length - 1) * gap;
    const startX = px - totalW / 2 + circleR;
    const topY = t.hpMax > 0 ? (py - tokenR - Math.max(4, gs * 0.1) - 3 / BOARD.zoom) : py - tokenR;
    const circleY = topY - circleR - gs * 0.1;
    const zoom = BOARD.zoom;

    stats.forEach((s, i) => {
      const cx2 = startX + i * (circleR * 2 + gap);
      ctx.beginPath();
      ctx.arc(cx2, circleY, circleR, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,0,0,0.65)';
      ctx.fill();
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 1.2 / zoom;
      ctx.stroke();
      const fSize = Math.max(6, circleR * 1.1);
      ctx.font = `bold ${fSize}px sans-serif`;
      ctx.fillStyle = s.color;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(s.v, cx2, circleY);
    });
  }

  if (isSelected) {
    const hSize = 7 / BOARD.zoom;
    const handleDist = tokenR + 22 / BOARD.zoom;

    const rotHX = px + handleDist * Math.sin(rotation);
    const rotHY = py - handleDist * Math.cos(rotation);

    ctx.save();
    ctx.beginPath();
    ctx.moveTo(px + tokenR * Math.sin(rotation), py - tokenR * Math.cos(rotation));
    ctx.lineTo(rotHX, rotHY);
    ctx.strokeStyle = 'rgba(0, 191, 255, 0.6)';
    ctx.lineWidth = 1.5 / BOARD.zoom;
    ctx.stroke();

    ctx.fillStyle = '#00bfff';
    ctx.strokeStyle = '#005f7f';
    ctx.lineWidth = 1 / BOARD.zoom;
    ctx.fillRect(rotHX - hSize / 2, rotHY - hSize / 2, hSize, hSize);
    ctx.strokeRect(rotHX - hSize / 2, rotHY - hSize / 2, hSize, hSize);
    ctx.restore();

    const resLocalX = tokenR * 0.85;
    const resLocalY = tokenR * 0.85;
    const resHX = px + resLocalX * Math.cos(rotation) - resLocalY * Math.sin(rotation);
    const resHY = py + resLocalX * Math.sin(rotation) + resLocalY * Math.cos(rotation);

    ctx.save();
    ctx.fillStyle = '#00ff88';
    ctx.strokeStyle = '#007744';
    ctx.lineWidth = 1 / BOARD.zoom;
    ctx.fillRect(resHX - hSize / 2, resHY - hSize / 2, hSize, hSize);
    ctx.strokeRect(resHX - hSize / 2, resHY - hSize / 2, hSize, hSize);
    ctx.restore();
  }

  _renderCondEffects(ctx, t);

  ctx.restore();
}

function drawTokenMovementPath(ctx, t) {
  if (!BOARD.dragging || t.id !== BOARD.dragging.id) return;
  const startGx = BOARD.dragStartGx;
  const startGy = BOARD.dragStartGy;
  if (startGx === undefined || startGy === undefined) return;

  const start = getTokenCenter(t, startGx, startGy);
  const end = getTokenCenter(t, t.gx, t.gy);

  // Aplicar elevação iso
  if (BOARD.projection === 'iso') {
    const elev = isoElevation(getFloorFromZ(t.z));
    start.y -= elev;
    end.y -= elev;
  }

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const len = Math.hypot(dx, dy);
  if (len < 5) return;

  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = 'rgba(0, 191, 255, 0.8)';
  ctx.lineWidth = 3 / BOARD.zoom;
  ctx.setLineDash([6 / BOARD.zoom, 4 / BOARD.zoom]);
  ctx.moveTo(start.x, start.y);
  ctx.lineTo(end.x, end.y);
  ctx.stroke();
  ctx.setLineDash([]);

  const angle = Math.atan2(dy, dx);
  const arrowLen = 12 / BOARD.zoom;
  ctx.fillStyle = 'rgba(0, 191, 255, 0.9)';
  ctx.beginPath();
  ctx.moveTo(end.x, end.y);
  ctx.lineTo(end.x - arrowLen * Math.cos(angle - Math.PI / 6), end.y - arrowLen * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(end.x - arrowLen * Math.cos(angle + Math.PI / 6), end.y - arrowLen * Math.sin(angle + Math.PI / 6));
  ctx.fill();

  // Desenhar o badge numérico com a distância percorrida
  let cells;
  if (BOARD.gridType === 'hex') {
    cells = len / BOARD.gridSize;
  } else {
    const gridDx = Math.round(Math.abs(dx) / BOARD.gridSize);
    const gridDy = Math.round(Math.abs(dy) / BOARD.gridSize);
    if (BOARD.distanceMode === 'euclidean') {
      cells = len / BOARD.gridSize;
    } else if (BOARD.distanceMode === 'double_diagonal') {
      cells = Math.max(gridDx, gridDy) + Math.min(gridDx, gridDy);
    } else {
      cells = Math.max(gridDx, gridDy);
    }
  }
  const val = cells * BOARD.gridScaleVal;
  const formattedText = val.toFixed(1) + ' ' + (BOARD.gridScaleUnit || 'm');

  const midX = (start.x + end.x) / 2;
  const midY = (start.y + end.y) / 2;

  ctx.font = `${Math.max(10, 12 / BOARD.zoom)}px 'Cinzel', sans-serif`;
  const textWidth = ctx.measureText(formattedText).width;
  const paddingX = 6 / BOARD.zoom;
  const paddingY = 3 / BOARD.zoom;
  const bgW = textWidth + paddingX * 2;
  const bgH = Math.max(14, 18 / BOARD.zoom);

  ctx.fillStyle = 'rgba(20, 15, 10, 0.85)';
  ctx.strokeStyle = 'rgba(0, 191, 255, 0.8)';
  ctx.lineWidth = 1.5 / BOARD.zoom;
  
  ctx.beginPath();
  if (ctx.roundRect) {
    ctx.roundRect(midX - bgW / 2, midY - bgH / 2, bgW, bgH, 4 / BOARD.zoom);
  } else {
    ctx.rect(midX - bgW / 2, midY - bgH / 2, bgW, bgH);
  }
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(formattedText, midX, midY);

  ctx.restore();
}

const UNSPLASH_ACCESS_KEY = 'etK-AkXGz5Y57XQUXkiot9ad3oN619Vq4k_oL9sxtZQ';
const PIXABAY_API_KEY = '56232677-4d3f788e61cab49986809d088';
const PEXELS_API_KEY = 'dLBE0nAJB45cRSbm65Ej1JeLNOI5JAKiR0tw0E7niNk7TMeDE6XurC4X';
let unsplashSelected = null;
let currentSearchSource = 'unsplash';

// ──── Sound System ────
let audioCtx = null;
let soundMasterGain = null;
let soundAmbientGain = null;
let soundSfxGain = null;
let ambientSource = null;
let ambientPlaying = false;
let ambientCurrentUrl = null;
let ytPlayer = null;
let ytReady = false;
let ytPendingUrl = null;

function _extrairYtId(url) {
  const m = url.match(/(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m ? m[1] : null;
}

function _carregarYtApi() {
  if (window.YT && window.YT.Player) {
    ytReady = true;
    if (ytPendingUrl) {
      let temp = ytPendingUrl;
      ytPendingUrl = null;
      _tocarYt(temp);
    }
    return;
  }
  if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
    // Script já solicitado anteriormente; garante que o callback aponte
    // para a chamada atual mesmo que tenha sido sobrescrito.
    if (!window.onYouTubeIframeAPIReady) {
      window.onYouTubeIframeAPIReady = () => {
        ytReady = true;
        if (ytPendingUrl) {
          let temp = ytPendingUrl;
          ytPendingUrl = null;
          _tocarYt(temp);
        }
      };
    }
    return;
  }
  const tag = document.createElement('script');
  tag.src = 'https://www.youtube.com/iframe_api';
  tag.async = true;
  tag.onerror = () => {
    toast('Não foi possível carregar a API do YouTube (verifique sua conexão ou bloqueador de anúncios).');
    ytPendingUrl = null;
  };
  document.head.appendChild(tag);
  window.onYouTubeIframeAPIReady = () => {
    ytReady = true;
    if (ytPendingUrl) {
      let temp = ytPendingUrl;
      ytPendingUrl = null;
      _tocarYt(temp);
    }
  };
  // Fallback: se a API não responder em 8s (bloqueada por extensão, rede, etc.)
  setTimeout(() => {
    if (!ytReady) {
      toast('A API do YouTube demorou demais para carregar. Verifique sua conexão ou um possível bloqueador de anúncios.');
      ytPendingUrl = null;
    }
  }, 8000);
}

function _tocarYt(url) {
  const id = _extrairYtId(url);
  if (!id) { toast('Link do YouTube inválido. Cole um link de vídeo válido.'); return; }
  stopAmbient();
  if (window.YT && window.YT.Player) ytReady = true;
  if (!ytReady) { ytPendingUrl = url; _carregarYtApi(); return; }
  ambientCurrentUrl = url;
  const old = document.getElementById('ytAmbientPlayer');
  if (old) old.remove();
  const div = document.createElement('div');
  div.id = 'ytAmbientPlayer';
  // Avoid display: none, as it breaks YT Iframe API
  div.style.position = 'absolute';
  div.style.left = '-9999px';
  div.style.width = '1px';
  div.style.height = '1px';
  div.style.opacity = '0';
  document.body.appendChild(div);
  ytPlayer = new YT.Player('ytAmbientPlayer', {
    height: '1', width: '1',
    videoId: id,
    playerVars: { autoplay: 1, loop: 1, playlist: id, controls: 0, modestbranding: 1, rel: 0, showinfo: 0 },
    events: {
      onReady: (e) => {
        e.target.setVolume((soundAmbientGain ? soundAmbientGain.gain.value : 0.5) * 100);
        e.target.playVideo();
        ambientPlaying = true;
        updateAmbientUI();
        // Alguns navegadores bloqueiam autoplay com som quando a chamada
        // não está diretamente atrelada ao clique do usuário (ex: APIs
        // carregadas de forma assíncrona). Detecta isso e avisa.
        setTimeout(() => {
          try {
            const state = e.target.getPlayerState();
            // -1 = não iniciado, 2 = pausado: provável bloqueio de autoplay
            if (state === -1 || state === 2) {
              toast('O navegador bloqueou a reprodução automática. Clique em ▶ Play novamente para liberar o áudio.');
            }
          } catch (err) { /* ignore */ }
        }, 1500);
      },
      onStateChange: (e) => {
        if (e.data === YT.PlayerState.ENDED) { stopAmbient(); }
      },
      onError: (e) => {
        // Códigos: 2=ID inválido, 5=erro HTML5, 100=removido/privado, 101/150=incorporação não permitida
        const msgs = {
          2: 'Link do YouTube inválido.',
          5: 'Erro ao reproduzir esse vídeo no player do YouTube.',
          100: 'Vídeo não encontrado ou privado.',
          101: 'O dono do vídeo não permite incorporação (embed) em outros sites.',
          150: 'O dono do vídeo não permite incorporação (embed) em outros sites.'
        };
        toast('YouTube: ' + (msgs[e.data] || 'não foi possível tocar esse vídeo.'));
        stopAmbient();
      }
    }
  });
}
let soundboardData = [];
let soundSearchResults = [];
let soundSelectedHit = null;
let currentPreviewAudio = null;
const FREESOUND_API_KEY = 'hfGoQwml55fUjtpX6dSy7NxZ8SDwSpKYPYizND9K';
let freesoundApiKey = localStorage.getItem('vtt_freesound_key') || FREESOUND_API_KEY;
function salvarFreesoundKey(val) {
  freesoundApiKey = val.trim();
  localStorage.setItem('vtt_freesound_key', freesoundApiKey);
}

function initAudioCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    soundMasterGain = audioCtx.createGain();
    soundMasterGain.gain.value = 0.7;
    soundMasterGain.connect(audioCtx.destination);
    soundAmbientGain = audioCtx.createGain();
    soundAmbientGain.gain.value = 0.5;
    soundAmbientGain.connect(soundMasterGain);
    soundSfxGain = audioCtx.createGain();
    soundSfxGain.gain.value = 0.8;
    soundSfxGain.connect(soundMasterGain);
  }
  if (audioCtx.state === 'suspended') audioCtx.resume();
}

function loadSoundboard() {
  try { soundboardData = JSON.parse(localStorage.getItem('vtt_soundboard')) || []; }
  catch (e) { soundboardData = []; }
}

function saveSoundboard() {
  localStorage.setItem('vtt_soundboard', JSON.stringify(soundboardData));
}

function addToSoundboard(audio) {
  initAudioCtx();
  const url = audio.previews?.medium || audio.previews?.low || audio.download || '';
  if (!url) { toast('Áudio sem URL disponível.'); return; }
  const entry = {
    id: 'sb' + Date.now() + Math.floor(Math.random() * 9999),
    name: audio.name || (audio.tags || '').split(',')[0].trim() || 'Som ' + (soundboardData.length + 1),
    url: url,
    duration: audio.duration || 0,
    tags: audio.tags || ''
  };
  soundboardData.push(entry);
  saveSoundboard();
  renderSoundboard();
  toast('🔊 Som adicionado à Soundboard!');
}

function removeFromSoundboard(id) {
  soundboardData = soundboardData.filter(s => s.id !== id);
  saveSoundboard();
  renderSoundboard();
}

function playSfx(url) {
  initAudioCtx();
  if (!url) return;
  fetch(url).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); })
    .then(buf => audioCtx.decodeAudioData(buf))
    .then(ab => {
      const source = audioCtx.createBufferSource();
      source.buffer = ab;
      source.connect(soundSfxGain);
      source.start(0);
    })
    .catch(() => {
      // Fallback: reproduzir via Audio element (funciona cross-origin)
      const a = new Audio(url);
      a.volume = (soundSfxGain ? soundSfxGain.gain.value : 0.8) * (soundMasterGain ? soundMasterGain.gain.value : 0.7);
      a.play().catch(() => toast('Erro ao carregar áudio SFX.'));
    });
}

function playAmbient(url) {
  initAudioCtx();
  if (!url) return;
  if (ambientPlaying && ambientCurrentUrl === url) { stopAmbient(); return; }
  // YouTube
  if (_extrairYtId(url)) {
    _tocarYt(url);
    return;
  }
  stopAmbient();
  ambientCurrentUrl = url;
  fetch(url).then(r => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.arrayBuffer(); })
    .then(buf => audioCtx.decodeAudioData(buf))
    .then(ab => {
      const source = audioCtx.createBufferSource();
      source.buffer = ab;
      source.loop = true;
      source.connect(soundAmbientGain);
      source.start(0);
      ambientSource = source;
      ambientPlaying = true;
      updateAmbientUI();
    })
    .catch(() => {
      // Fallback: reproduzir via Audio element (funciona cross-origin)
      const a = new Audio(url);
      a.loop = true;
      a.volume = (soundAmbientGain ? soundAmbientGain.gain.value : 0.5) * (soundMasterGain ? soundMasterGain.gain.value : 0.7);
      a.play().then(() => {
        ambientSource = { stop: () => { a.pause(); a.currentTime = 0; } };
        ambientPlaying = true;
        updateAmbientUI();
      }).catch(() => toast('Erro ao carregar música ambiente.'));
    });
}

function stopAmbient() {
  if (ytPlayer) {
    try { ytPlayer.stopVideo(); ytPlayer.destroy(); } catch (e) { /* ignore */ }
    ytPlayer = null;
    const el = document.getElementById('ytAmbientPlayer');
    if (el) el.remove();
  }
  if (ambientSource) {
    try { ambientSource.stop(); } catch (e) { /* ignore */ }
    ambientSource = null;
  }
  ambientPlaying = false;
  ambientCurrentUrl = null;
  updateAmbientUI();
}

function toggleAmbient() {
  if (ambientPlaying) {
    stopAmbient();
    if (myRole === 'mestre') broadcast({ type: 'stop-ambient' }, null);
  } else {
    const url = document.getElementById('ambientUrlInput')?.value.trim();
    if (url) {
      playAmbient(url);
      if (myRole === 'mestre') broadcast({ type: 'play-ambient', url }, null);
    } else toast('Cole uma URL de áudio ou link do YouTube.');
  }
}

function setAmbientFromInput() {
  const url = document.getElementById('ambientUrlInput')?.value.trim();
  if (!url) { toast('Cole uma URL de áudio.'); return; }
  playAmbient(url);
  if (myRole === 'mestre') broadcast({ type: 'play-ambient', url }, null);
}

function salvarSomAtual() {
  const url = document.getElementById('ambientUrlInput')?.value.trim();
  if (!url) { toast('Nenhuma URL para salvar.'); return; }
  // Extrai nome do arquivo/URL
  let nome = url.split('/').pop().split('?')[0].replace(/[_-]/g, ' ') || 'Som ambiente';
  nome = nome.replace(/\.[^.]+$/, '').substring(0, 40);
  if (nome.length < 2) nome = 'Som ' + (soundboardData.length + 1);
  // Verifica se já existe
  if (soundboardData.some(s => s.url === url)) { toast('Esse som já está na soundboard.'); return; }
  soundboardData.push({ id: 'sb' + Date.now() + Math.floor(Math.random() * 9999), name: nome, url, duration: 0, tags: '' });
  saveSoundboard();
  renderSoundboard();
  toast('💾 Som salvo na soundboard!');
}

function carregarMp3Local(input) {
  const file = input.files?.[0];
  if (!file) return;
  if (file.size > 50 * 1024 * 1024) { toast('Arquivo muito grande (máx 50MB).'); input.value = ''; return; }
  const url = URL.createObjectURL(file);
  const el = document.getElementById('ambientUrlInput');
  if (el) { el.value = url; el.title = file.name; }
  toast(`📁 ${file.name} carregado. Clique em Play.`);
  input.value = '';
}

function updateAmbientUI() {
  const btn = document.getElementById('btnAmbientPlay');
  const status = document.getElementById('ambientStatus');
  if (btn) btn.textContent = ambientPlaying ? '⏸ Pausar' : '▶ Play';
  if (status) {
    const isYt = ambientCurrentUrl && _extrairYtId(ambientCurrentUrl);
    status.textContent = ambientPlaying ? (isYt ? '▶ YouTube' : 'Tocando') : 'Parado';
  }
}

function setMasterVolume(v) {
  if (soundMasterGain) soundMasterGain.gain.value = parseFloat(v);
  const lbl = document.getElementById('lblMasterVol');
  if (lbl) lbl.textContent = Math.round(v * 100) + '%';
}
function setSfxVolume(v) {
  if (soundSfxGain) soundSfxGain.gain.value = parseFloat(v);
  const lbl = document.getElementById('lblSfxVol');
  if (lbl) lbl.textContent = Math.round(v * 100) + '%';
}
function setAmbientVolume(v) {
  if (soundAmbientGain) soundAmbientGain.gain.value = parseFloat(v);
  if (ytPlayer && ytPlayer.setVolume) ytPlayer.setVolume(parseFloat(v) * 100);
  const lbl = document.getElementById('lblAmbientVol');
  if (lbl) lbl.textContent = Math.round(v * 100) + '%';
}

loadSoundboard();

function getSoundUrlById(id) {
  if (!id) return null;
  const entry = soundboardData.find(s => s.id === id);
  return entry ? entry.url : null;
}

function getSoundNameById(id) {
  if (!id) return '';
  const entry = soundboardData.find(s => s.id === id);
  return entry ? entry.name : '';
}

function popularSelectorSom(selectId, currentId) {
  const sel = document.getElementById(selectId);
  if (!sel) return;
  sel.innerHTML = '<option value="">Nenhum</option>';
  soundboardData.forEach(s => {
    const opt = document.createElement('option');
    opt.value = s.id;
    opt.textContent = s.name;
    sel.appendChild(opt);
  });
  if (currentId) sel.value = currentId;
}

function popularMenuSomParede(menuId) {
  const menu = document.getElementById(menuId);
  if (!menu) return;
  const wallId = BOARD.selectedWallId;
  const w = wallId ? BOARD.walls.find(wall => wall.id === wallId) : null;
  const currentSoundId = w ? (w.soundId || '') : '';
  menu.innerHTML = '';
  const none = document.createElement('div');
  none.className = 'context-menu-item';
  none.textContent = 'Nenhum';
  none.onclick = function() { setWallSound(''); fecharContextMenu(); };
  if (!currentSoundId) none.style.color = 'var(--gold)';
  menu.appendChild(none);
  soundboardData.forEach(s => {
    const item = document.createElement('div');
    item.className = 'context-menu-item';
    item.textContent = s.name;
    item.onclick = function() { setWallSound(s.id); fecharContextMenu(); };
    if (s.id === currentSoundId) item.style.color = 'var(--gold)';
    menu.appendChild(item);
  });
}

function setWallSound(soundId) {
  if (!BOARD.selectedWallId) return;
  const w = BOARD.walls.find(wall => wall.id === BOARD.selectedWallId);
  if (w) {
    snapshotBoard();
    w.soundId = soundId || null;
    boardSave();
    boardRender();
    syncWallsToPlayers();
    const name = soundId ? getSoundNameById(soundId) : 'nenhum';
    toast(`🔊 Som da parede: ${name}`);
  }
}

function popularMenuSomForma() {
  const menu = document.getElementById('ctxShapeSomSubmenu');
  if (!menu) return;
  const shape = BOARD.shapes.find(s => s.id === contextShapeId);
  const currentSoundId = shape ? (shape.soundId || '') : '';
  menu.innerHTML = '';
  const none = document.createElement('div');
  none.className = 'context-menu-item';
  none.textContent = 'Nenhum';
  none.onclick = function() { setShapeSound(''); fecharContextMenu(); };
  if (!currentSoundId) none.style.color = 'var(--gold)';
  menu.appendChild(none);
  soundboardData.forEach(s => {
    const item = document.createElement('div');
    item.className = 'context-menu-item';
    item.textContent = s.name;
    item.onclick = function() { setShapeSound(s.id); fecharContextMenu(); };
    if (s.id === currentSoundId) item.style.color = 'var(--gold)';
    menu.appendChild(item);
  });
}

function setShapeSound(soundId) {
  if (!contextShapeId) return;
  const shape = BOARD.shapes.find(s => s.id === contextShapeId);
  if (shape) {
    snapshotBoard();
    shape.soundId = soundId || null;
    boardSave();
    boardRender();
    syncShapesToPlayers();
    const name = soundId ? getSoundNameById(soundId) : 'nenhum';
    toast(`🔊 Som da forma: ${name}`);
  }
}

function testarSomFormulario() {
  const soundId = document.getElementById('tfSom')?.value;
  if (!soundId) { toast('Selecione um som primeiro.'); return; }
  const url = getSoundUrlById(soundId);
  if (url) playSfx(url);
  else toast('URL do som não encontrada.');
}

function setSearchSource(source) {
  currentSearchSource = source;
  ['search-tab-unsplash', 'search-tab-pexels', 'search-tab-pixabay'].forEach(id => {
    const tab = document.getElementById(id);
    if (tab) {
      tab.classList.remove('active');
      tab.style.borderBottomColor = 'transparent';
      tab.style.color = 'var(--text-muted)';
    }
  });

  const activeTab = document.getElementById(source === 'unsplash' ? 'search-tab-unsplash' : (source === 'pexels' ? 'search-tab-pexels' : 'search-tab-pixabay'));
  if (activeTab) {
    activeTab.classList.add('active');
    activeTab.style.borderBottomColor = 'var(--gold)';
    activeTab.style.color = 'var(--gold)';
  }

  const queryInput = document.getElementById('unsplashQuery');
  const footerSpan = document.querySelector('.unsplash-footer span');

  if (source === 'unsplash') {
    if (queryInput) queryInput.placeholder = 'Ex: dragon, warrior, castle...';
    if (footerSpan) footerSpan.innerHTML = 'Fotos por <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a>';
  } else if (source === 'pexels') {
    if (queryInput) queryInput.placeholder = 'Ex: fantasy, forest, orc...';
    if (footerSpan) footerSpan.innerHTML = 'Fotos por <a href="https://pexels.com" target="_blank" rel="noopener">Pexels</a>';
  } else if (source === 'pixabay') {
    if (queryInput) queryInput.placeholder = 'Ex: dwarf, elf, treasure...';
    if (footerSpan) footerSpan.innerHTML = 'Fotos por <a href="https://pixabay.com" target="_blank" rel="noopener">Pixabay</a>';
  }
}

function abrirBuscaUnsplash() {
  fecharContextMenu();
  document.getElementById('unsplashModal').style.display = 'flex';
  document.getElementById('unsplashQuery').value = '';
  document.getElementById('unsplashGrid').innerHTML = '<div class="unsplash-empty">Digite um termo e pressione Enter ou clique em Buscar</div>';
  document.getElementById('unsplashActions').style.display = 'none';
  unsplashSelected = null;
  setSearchSource(currentSearchSource);
  setTimeout(() => document.getElementById('unsplashQuery').focus(), 100);
}

function fecharBuscaUnsplash() {
  document.getElementById('unsplashModal').style.display = 'none';
  unsplashSelected = null;
}

function selecionarFotoUnsplash(foto) {
  unsplashSelected = foto;
  if (foto.links && foto.links.download_location) {
    fetch(foto.links.download_location + '&client_id=' + UNSPLASH_ACCESS_KEY, { method: 'GET' });
  }
  const preview = document.getElementById('unsplashPreview');
  preview.innerHTML = `<img src="${foto.urls.thumb}" alt="">`;
  document.getElementById('unsplashActions').style.display = 'flex';
}

function precarregarGifSeNecessario(url) {
  if (isVideoUrl(url)) {
    getVideo(url);
    return;
  }
  if (isGifUrl(url)) {
    loadImageWithCORSFallback(url, (img) => {
      tokenImageCache[url] = img;
      getGifCanvas(url, img.naturalWidth, img.naturalHeight);
      boardRender();
    });
  }
}

function criarTokenDeImagem(url, size) {
  const { x, y } = BOARD.ctxMenuBoardX !== undefined ? { x: BOARD.ctxMenuBoardX, y: BOARD.ctxMenuBoardY } : { x: BOARD.wrap.clientWidth / 2, y: BOARD.wrap.clientHeight / 2 };
  const { gx, gy } = canvasToGrid(x, y);
  snapshotBoard();
  BOARD.tokens.push({
    id: 'tk' + Date.now() + Math.floor(Math.random() * 9999),
    name: 'Imagem',
    hp: 0, hpMax: 0, size: size,
    color: '#c9903a',
    imageUrl: url, controlledBy: null,
    borderType: 'solid', borderWidth: 1.5, borderColor: '#000000',
    shapeType: 'circle', auraRadius: 0,
    z: 0,
    layer: 'gm', conditions: [], hideName: false, soundId: null,
    gx: Math.max(0, gx), gy: Math.max(0, gy)
  });
  precarregarGifSeNecessario(url);
  boardSave(); boardRender(); syncBoardTokensToPlayers();
  toast(`🎯 Token criado (${size}×${size})!`);
}

function criarObjetoDeImagem(url, size) {
  const { x, y } = BOARD.ctxMenuBoardX !== undefined ? { x: BOARD.ctxMenuBoardX, y: BOARD.ctxMenuBoardY } : { x: BOARD.wrap.clientWidth / 2, y: BOARD.wrap.clientHeight / 2 };
  const { gx, gy } = canvasToGrid(x, y);
  snapshotBoard();
  const newId = 'tk' + Date.now() + Math.floor(Math.random() * 9999);
  const tokenObj = {
    id: newId,
    type: 'object',
    name: 'Objeto',
    size: size,
    imageUrl: url,
    borderType: 'solid', borderWidth: 1.5, borderColor: '#ffffff',
    layer: 'map',
    z: 0,
    conditions: [],
    hideName: true, soundId: null,
    gx: Math.max(0, gx), gy: Math.max(0, gy)
  };
  BOARD.tokens.push(tokenObj);
  if (isVideoUrl(url)) {
    const v = getVideo(url).video;
    if (v.videoWidth && v.videoHeight) {
      const iw = v.videoWidth, ih = v.videoHeight;
      let sx = size, sy = size;
      if (iw > ih) {
        sy = Math.max(0.25, size * (ih / iw));
      } else {
        sx = Math.max(0.25, size * (iw / ih));
      }
      tokenObj.sizeX = Math.round(sx * 4) / 4;
      tokenObj.sizeY = Math.round(sy * 4) / 4;
    }
    precarregarGifSeNecessario(url);
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  } else {
  loadImageWithCORSFallback(url, (img) => {
    if (img.naturalWidth && img.naturalHeight) {
      const iw = img.naturalWidth, ih = img.naturalHeight;
      let sx = size, sy = size;
      if (iw > ih) {
        sy = Math.max(0.25, size * (ih / iw));
      } else {
        sx = Math.max(0.25, size * (iw / ih));
      }
      tokenObj.sizeX = Math.round(sx * 4) / 4;
      tokenObj.sizeY = Math.round(sy * 4) / 4;
    }
    precarregarGifSeNecessario(url);
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  }, () => {
    precarregarGifSeNecessario(url);
    boardSave(); boardRender(); syncBoardTokensToPlayers();
  });
  }
  setBoardLayer('map');
  BOARD.selectedTokens.clear();
  BOARD.selectedTokens.add(newId);
  toast(`◻ Objeto criado na camada Mapa! Arraste para posicionar.`);
}

function usarImgComo(tipo) {
  if (!unsplashSelected) return;
  const url = unsplashSelected.urls.regular;

  const formAberto = document.getElementById('tokenForm')?.classList.contains('open');

  if (tipo === 'token') {
    if (formAberto) {
      document.getElementById('tfImgUrl').value = url;
      previewImagemToken(url);
      fecharBuscaUnsplash();
      toast('🎯 Imagem selecionada para o token! Abra o formulário e edite.');
    } else {
      if (myRole !== 'mestre') { toast('Apenas o Mestre pode criar tokens.'); fecharBuscaUnsplash(); return; }
      fecharBuscaUnsplash();
      criarTokenDeImagem(url, 1);
    }
  } else if (tipo === 'objeto') {
    if (myRole !== 'mestre') { toast('Apenas o Mestre pode criar objetos.'); fecharBuscaUnsplash(); return; }
    fecharBuscaUnsplash();
    criarObjetoDeImagem(url, 2);
  } else if (tipo === 'mapa') {
    if (myRole !== 'mestre') { toast('Apenas o Mestre pode alterar o mapa.'); fecharBuscaUnsplash(); return; }
    loadImageWithCORSFallback(url, (img) => {
      snapshotBoard();
      BOARD.mapImg = img;
      if (isGifUrl(url)) getGifCanvas(url, img.naturalWidth, img.naturalHeight);
      BOARD.mapDataUrl = url;
      BOARD.mapX = 0;
      BOARD.mapY = 0;
      BOARD.mapWidth = null;
      BOARD.mapHeight = null;
      boardRender();
      if (myRole === 'mestre' || amIHost) syncBoardMapToPlayers();
      fecharBuscaUnsplash();
      toast('🗺 Mapa atualizado!');
    }, () => {
      toast('Erro ao carregar imagem.');
    });
  }

  BOARD.ctxMenuBoardX = undefined;
  BOARD.ctxMenuBoardY = undefined;
}

// ──── Sound Search & Soundboard UI ────
function setSoundTab(tab) {
  ['sound-tab-buscar', 'sound-tab-soundboard'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.classList.remove('active'); el.style.color = 'var(--text-muted)'; el.style.borderBottomColor = 'transparent'; }
  });
  document.getElementById('soundTabBuscar').style.display = tab === 'buscar' ? 'block' : 'none';
  document.getElementById('soundTabSoundboard').style.display = tab === 'soundboard' ? 'block' : 'none';
  const activeTab = document.getElementById(tab === 'buscar' ? 'sound-tab-buscar' : 'sound-tab-soundboard');
  if (activeTab) { activeTab.classList.add('active'); activeTab.style.color = 'var(--gold)'; activeTab.style.borderBottomColor = 'var(--gold)'; }
  if (tab === 'soundboard') renderSoundboard();
}

function abrirBuscaAudios() {
  fecharContextMenu();
  fecharBuscaUnsplash();
  document.getElementById('soundModal').style.display = 'flex';
  document.getElementById('soundQuery').value = '';
  document.getElementById('soundGrid').innerHTML = '<div class="unsplash-empty">Digite um termo e pressione Enter ou clique em Buscar</div>';
  document.getElementById('soundActions').style.display = 'none';
  soundSearchResults = [];
  soundSelectedHit = null;
  document.getElementById('soundSelectedName').textContent = '';
  setSoundTab('buscar');
  setTimeout(() => document.getElementById('soundQuery').focus(), 100);
  const savedKeyEl = document.getElementById('freesoundApiKey');
  if (savedKeyEl) savedKeyEl.value = freesoundApiKey;
}

function abrirJukebox() {
  fecharContextMenu();
  fecharBuscaUnsplash();
  document.getElementById('soundModal').style.display = 'flex';
  setSoundTab('soundboard');
}

function fecharBuscaAudios() {
  document.getElementById('soundModal').style.display = 'none';
  stopPreviewAudio();
}

function formatDuration(seconds) {
  if (!seconds || seconds <= 0) return '';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ':' + s.toString().padStart(2, '0');
}

async function executarBuscaAudios() {
  const q = document.getElementById('soundQuery').value.trim();
  if (!q) return;
  const grid = document.getElementById('soundGrid');
  grid.innerHTML = '<div class="unsplash-empty">Buscando...</div>';
  document.getElementById('soundActions').style.display = 'none';
  soundSearchResults = [];
  soundSelectedHit = null;
  try {
    if (!freesoundApiKey) {
      grid.innerHTML = '<div class="unsplash-empty">Configure sua Freesound API Key para buscar sons.<br><small>Acesse <a href="https://freesound.org/apiv2/apply/" target="_blank" style="color:var(--gold)">freesound.org/apiv2/apply</a> para obter uma gratuitamente.</small></div>';
      const keyInput = document.getElementById('freesoundApiKey');
      if (keyInput) keyInput.focus();
      return;
    }
    const res = await fetch(`https://freesound.org/apiv2/search/text/?query=${encodeURIComponent(q)}&fields=id,name,tags,duration,previews&page_size=20&token=${freesoundApiKey}`);
    if (!res.ok) {
      if (res.status === 401 || res.status === 403) {
        grid.innerHTML = '<div class="unsplash-empty">API Key inválida ou expirada. Verifique sua Freesound API Key.</div>';
      } else {
        grid.innerHTML = '<div class="unsplash-empty">Erro na busca. Tente novamente.</div>';
      }
      return;
    }
    const data = await res.json();
    if (!data.results || !data.results.length) { grid.innerHTML = '<div class="unsplash-empty">Nenhum som encontrado.</div>'; return; }
    // Normalizar resultados do Freesound para formato compatível
    soundSearchResults = data.results.map(r => ({
      id: r.id,
      name: r.name || 'Som',
      previews: {
        medium: r.previews?.['preview-hq-mp3'] || r.previews?.['preview-lq-mp3'] || '',
        low: r.previews?.['preview-lq-mp3'] || ''
      },
      tags: r.name + (r.tags && r.tags.length ? ', ' + r.tags.slice(0, 5).join(', ') : ''),
      duration: r.duration
    }));
    grid.innerHTML = '';
    soundSearchResults.forEach((hit, idx) => {
      const div = document.createElement('div');
      div.className = 'sound-item';
      const previewUrl = hit.previews?.medium || hit.previews?.low || '';
      const tags = hit.tags || 'Sem nome';
      const dur = formatDuration(hit.duration);
      const firstName = hit.name || tags.split(',')[0].trim() || 'Som';
      div.innerHTML =
        '<div class="sound-play-btn" onclick="event.stopPropagation();previewAudio(\'' + previewUrl.replace(/'/g, "\\'") + '\',this)" title="Preview">▶</div>' +
        '<div class="sound-info">' +
          '<div class="sound-name">' + escHTML(firstName.substring(0, 30)) + '</div>' +
          '<div class="sound-tags">' + escHTML(tags.substring(0, 50)) + '</div>' +
          '<div class="sound-dur">' + dur + '</div>' +
        '</div>' +
        '<div class="sound-actions">' +
          '<button class="btn btn-sm" onclick="event.stopPropagation();addToSoundboard(soundSearchResults[' + idx + '])" title="Adicionar à Soundboard" style="padding:0.15rem 0.35rem;">+</button>' +
        '</div>';
      div.onclick = () => selecionarAudioBusca(hit);
      grid.appendChild(div);
    });
  } catch (e) {
    grid.innerHTML = '<div class="unsplash-empty">Erro de conexão.</div>';
  }
}

function selecionarAudioBusca(hit) {
  soundSelectedHit = hit;
  const tags = hit.tags || '';
  document.getElementById('soundSelectedName').textContent = (tags.split(',')[0] || 'Som selecionado').trim();
  document.getElementById('soundActions').style.display = 'flex';
  document.getElementById('soundBtnPlayPreview').dataset.url = hit.previews?.medium || hit.previews?.low || hit.download || '';
}

function tocarPreviewSelecionado() {
  const url = document.getElementById('soundBtnPlayPreview').dataset.url;
  if (url) previewAudio(url, null);
  else toast('Selecione um som primeiro.');
}

function previewAudio(url, btnEl) {
  stopPreviewAudio();
  if (!url) return;
  const audio = new Audio(url);
  audio.volume = 0.4;
  audio.onended = function() { if (btnEl) btnEl.textContent = '▶'; };
  audio.onerror = function() { toast('Erro ao reproduzir preview.'); };
  audio.play().then(function() {
    currentPreviewAudio = audio;
    if (btnEl) btnEl.textContent = '⏹';
    document.querySelectorAll('.sound-play-btn').forEach(function(b) { if (b !== btnEl) b.textContent = '▶'; });
  }).catch(function() { toast('Clique na página para iniciar o áudio.'); });
}

function stopPreviewAudio() {
  if (currentPreviewAudio) {
    try { currentPreviewAudio.pause(); currentPreviewAudio = null; } catch (e) { /* ignore */ }
  }
  document.querySelectorAll('.sound-play-btn').forEach(function(b) { b.textContent = '▶'; });
}

function addSelectedToSoundboard() {
  if (soundSelectedHit) { addToSoundboard(soundSelectedHit); }
  else toast('Selecione um som primeiro.');
}

function tocarSomSoundboard(id) {
  const entry = soundboardData.find(function(s) { return s.id === id; });
  if (entry) {
    playSfx(entry.url);
    if (myRole === 'mestre') broadcast({ type: 'play-sfx', url: entry.url }, null);
  }
}

function tocarAmbientSoundboard(url) {
  playAmbient(url);
  if (myRole === 'mestre') broadcast({ type: 'play-ambient', url }, null);
}

function renderSoundboard() {
  const container = document.getElementById('soundboardList');
  const countEl = document.getElementById('sboardCount');
  if (!container) return;
  if (!soundboardData || !soundboardData.length) {
    container.innerHTML = '<div class="sboard-empty">Nenhum som salvo. Busque sons para adicionar!</div>';
    if (countEl) countEl.textContent = '0';
    return;
  }
  if (countEl) countEl.textContent = soundboardData.length;
  var html = '';
  soundboardData.forEach(function(s) {
    html += '<div class="sboard-item">' +
      '<button class="sboard-play-btn" onclick="tocarSomSoundboard(\'' + s.id + '\')" title="Tocar uma vez">▶</button>' +
      '<button class="sboard-play-btn" onclick="tocarAmbientSoundboard(\'' + s.url.replace(/'/g, "\\'") + '\')" title="Repetir como música ambiente" style="color:var(--gold);">🔁</button>' +
      '<div class="sboard-info">' +
        '<div class="sboard-name">' + escHTML(s.name.substring(0, 28)) + '</div>' +
        '<div class="sboard-meta">' + (s.duration ? formatDuration(s.duration) : '') + '</div>' +
      '</div>' +
      '<button class="btn btn-sm" onclick="removeFromSoundboard(\'' + s.id + '\')" style="font-size:0.6rem;padding:0;width:20px;height:20px;color:var(--red-bright);" title="Remover">✕</button>' +
    '</div>';
  });
  container.innerHTML = html;
}

// ── Colar URL da Imagem no grid ──
function abrirPasteImagem() {
  fecharContextMenu();
  document.getElementById('pasteImgModal').style.display = 'flex';
  document.getElementById('pasteImgUrl').value = '';
  setTimeout(() => document.getElementById('pasteImgUrl').focus(), 100);
}

function fecharPasteImagem() {
  document.getElementById('pasteImgModal').style.display = 'none';
}

function usarPasteImg(tipo) {
  if (myRole !== 'mestre') { toast('Apenas o Mestre pode colar imagens.'); fecharPasteImagem(); return; }
  const url = document.getElementById('pasteImgUrl').value.trim();
  if (!url) { toast('Cole uma URL primeiro.'); return; }
  fecharPasteImagem();
  if (tipo === 'fundo') {
    loadImageWithCORSFallback(url, (img) => {
      snapshotBoard();
      BOARD.mapImg = img;
      if (isGifUrl(url)) getGifCanvas(url, img.naturalWidth, img.naturalHeight);
      BOARD.mapDataUrl = url;
      BOARD.mapX = 0;
      BOARD.mapY = 0;
      BOARD.mapWidth = null;
      BOARD.mapHeight = null;
      boardRender();
      if (myRole === 'mestre' || amIHost) syncBoardMapToPlayers();
      toast('🗺 Fundo atualizado!');
    }, () => {
      toast('Erro ao carregar imagem.');
    });
  } else if (tipo === 'objeto') {
    const s = parseFloat(document.getElementById('pasteImgSize').value) || 2;
    criarObjetoDeImagem(url, s);
  } else if (tipo === 'token') {
    const s = parseFloat(document.getElementById('pasteImgSize').value) || 1;
    criarTokenDeImagem(url, s);
  }
  BOARD.ctxMenuBoardX = undefined;
  BOARD.ctxMenuBoardY = undefined;
}

let boardUploadedImageDataUrl = null;

function abrirUploadImagem() {
  fecharContextMenu();
  boardUploadedImageDataUrl = null;
  document.getElementById('uploadImgModal').style.display = 'flex';
  document.getElementById('uploadImgLabel').textContent = 'Escolha um arquivo do dispositivo...';
  document.getElementById('boardUploadFileInput').value = '';
  document.getElementById('btnUploadComoFundo').disabled = true;
  document.getElementById('btnUploadComoObjeto').disabled = true;
  document.getElementById('btnUploadComoToken').disabled = true;
}

function fecharUploadImagem() {
  document.getElementById('uploadImgModal').style.display = 'none';
}

function onBoardUploadFileChange(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  if (file.type && file.type.startsWith('video/')) {
    toast('🎬 Vídeos devem ser adicionados por URL (ex: https://.../fire.webm). Upload de vídeo está bloqueado para proteger o armazenamento/sync.', 4000);
    input.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    boardUploadedImageDataUrl = e.target.result;
    document.getElementById('uploadImgLabel').textContent = `✓ ${file.name}`;
    document.getElementById('btnUploadComoFundo').disabled = false;
    document.getElementById('btnUploadComoObjeto').disabled = false;
    document.getElementById('btnUploadComoToken').disabled = false;
  };
  reader.readAsDataURL(file);
}

function usarUploadImg(tipo) {
  if (myRole !== 'mestre') { toast('Apenas o Mestre pode fazer upload de imagens.'); fecharUploadImagem(); return; }
  if (!boardUploadedImageDataUrl) { toast('Escolha um arquivo primeiro.'); return; }
  const dataUrl = boardUploadedImageDataUrl;
  fecharUploadImagem();

  if (tipo === 'fundo') {
    loadImageWithCORSFallback(dataUrl, (img) => {
      snapshotBoard();
      BOARD.mapImg = img;
      if (isGifUrl(dataUrl)) getGifCanvas(dataUrl, img.naturalWidth, img.naturalHeight);
      BOARD.mapDataUrl = dataUrl;
      BOARD.mapX = 0;
      BOARD.mapY = 0;
      BOARD.mapWidth = null;
      BOARD.mapHeight = null;
      boardRender();
      if (myRole === 'mestre' || amIHost) syncBoardMapToPlayers();
      toast('🗺 Fundo atualizado!');
    }, () => {
      toast('Erro ao carregar imagem.');
    });
  } else if (tipo === 'objeto') {
    const s = parseFloat(document.getElementById('uploadImgSize').value) || 2;
    criarObjetoDeImagem(dataUrl, s);
  } else if (tipo === 'token') {
    const s = parseFloat(document.getElementById('uploadImgSize').value) || 1;
    criarTokenDeImagem(dataUrl, s);
  }
  BOARD.ctxMenuBoardX = undefined;
  BOARD.ctxMenuBoardY = undefined;
}

function carregarMapa() {
  if (myRole !== 'mestre') {
    toast('Apenas o Mestre pode alterar o mapa.');
    return;
  }
  const op = confirm("Deseja carregar o mapa enviando um arquivo do seu computador?\n(Clique em Cancelar se desejar colar uma URL de imagem)");
  if (op) {
    document.getElementById('mapaFileInput').click();
  } else {
    const url = prompt("Cole a URL da imagem do mapa:");
    if (url && url.trim()) {
      carregarMapaDeUrl(url.trim());
    }
  }
}

function onMapaFileChange(input) {
  if (myRole !== 'mestre') return;
  const file = input.files && input.files[0];
  if (!file) return;
  if (file.type && file.type.startsWith('video/')) {
    toast('🎬 Vídeos devem ser adicionados por URL (ex: https://.../fire.webm). Upload de vídeo está bloqueado para proteger o armazenamento/sync.', 4000);
    input.value = '';
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    carregarMapaDeUrl(e.target.result);
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function carregarMapaDeUrl(url) {
  if (myRole !== 'mestre') return;
  loadImageWithCORSFallback(url, (img) => {
    snapshotBoard();
    BOARD.mapImg = img;
    if (isGifUrl(url)) getGifCanvas(url, img.naturalWidth, img.naturalHeight);
    BOARD.mapDataUrl = url;
    BOARD.mapX = 0;
    BOARD.mapY = 0;
    BOARD.mapWidth = null;
    BOARD.mapHeight = null;
    boardRender();
    if (myRole === 'mestre' || amIHost) {
      syncBoardMapToPlayers();
    }
    boardSave();
    toast('🗺 Mapa atualizado!');
  }, () => {
    toast('Erro ao carregar imagem do mapa.');
  });
}

function importarUVTT() {
  if (myRole !== 'mestre') {
    toast('Apenas o Mestre pode importar mapas UVTT.');
    return;
  }
  document.getElementById('uvttFileInput').click();
}

async function onUVTTFile(input) {
  if (myRole !== 'mestre') return;
  const file = input.files && input.files[0];
  if (!file) return;
  input.value = '';

  try {
    const arrayBuffer = await file.arrayBuffer();
    const zip = await JSZip.loadAsync(arrayBuffer);

    let imageFile = null;
    let metadataFile = null;

    const files = Object.keys(zip.files);
    for (const name of files) {
      const lower = name.toLowerCase();
      if (lower.endsWith('.png') || lower.endsWith('.jpg') || lower.endsWith('.jpeg') || lower.endsWith('.webp')) {
        if (!name.startsWith('__') && !lower.includes('thumbnail')) {
          imageFile = name;
        }
      }
      if (lower === 'dd2vtt.json' || lower.endsWith('/dd2vtt.json') || lower.endsWith('metadata.json') || lower.endsWith('map.json')) {
        metadataFile = name;
      }
    }

    if (!imageFile) {
      toast('Erro: Nenhuma imagem encontrada no arquivo UVTT.');
      return;
    }

    const imageBlob = await zip.files[imageFile].async('blob');
    const imageUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(imageBlob);
    });

    let wallsData = null;
    let pixelsPerGrid = 100;
    let offsetX = 0, offsetY = 0;

    if (metadataFile) {
      try {
        const metadataStr = await zip.files[metadataFile].async('string');
        const metadata = JSON.parse(metadataStr);

        pixelsPerGrid = metadata.resolution?.pixels_per_grid || 100;

        if (metadata.resolution?.map_origin) {
          offsetX = metadata.resolution.map_origin.x || 0;
          offsetY = metadata.resolution.map_origin.y || 0;
        }

        wallsData = metadata.walls || [];

        if (metadata.portals) {
          for (const p of metadata.portals) {
            if (p.x !== undefined && p.y !== undefined && p.x2 !== undefined && p.y2 !== undefined) {
              wallsData.push({ x: p.x, y: p.y, x2: p.x2, y2: p.y2, type: (p.type === 'door' || p.type === 'window') ? p.type : 'door' });
            }
          }
        }
      } catch (e) {
        console.warn('Erro ao ler metadados UVTT:', e);
      }
    }

    snapshotBoard();

    loadImageWithCORSFallback(imageUrl, (img) => {
      BOARD.mapImg = img;
      BOARD.mapDataUrl = imageUrl;
      BOARD.mapX = 0;
      BOARD.mapY = 0;
      BOARD.mapWidth = null;
      BOARD.mapHeight = null;

      if (wallsData) {
        const floorZ = (BOARD.activeFloor || 0) * 10;
        let wallCount = 0;
        for (const w of wallsData) {
          if (w.x !== undefined && w.y !== undefined && w.x2 !== undefined && w.y2 !== undefined) {
            BOARD.walls.push({
              id: 'uvtt_wall_' + Date.now() + '_' + wallCount,
              x1: w.x - offsetX,
              y1: w.y - offsetY,
              x2: w.x2 - offsetX,
              y2: w.y2 - offsetY,
              type: w.type || 'normal',
              open: false,
              z: floorZ,
              soundId: null
            });
            wallCount++;
          }
        }
        toast(`📦 UVTT: ${wallCount} paredes importadas!`);
      } else {
        toast('📦 UVTT: Mapa importado (sem paredes no arquivo).');
      }

      boardRender();
      if (myRole === 'mestre' || amIHost) {
        syncBoardMapToPlayers();
        syncWallsToPlayers();
      }
      boardSave();
    }, () => {
      toast('Erro ao carregar imagem do UVTT.');
    });
  } catch (e) {
    console.error('Erro ao processar UVTT:', e);
    toast('Erro ao processar arquivo UVTT.');
  }
}

async function executarBuscaImagens() {
  const q = document.getElementById('unsplashQuery').value.trim();
  if (!q) return;
  const grid = document.getElementById('unsplashGrid');
  grid.innerHTML = '<div class="unsplash-empty">Buscando...</div>';
  document.getElementById('unsplashActions').style.display = 'none';
  unsplashSelected = null;

  if (currentSearchSource === 'unsplash') {
    try {
      const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(q)}&per_page=15&client_id=${UNSPLASH_ACCESS_KEY}`);
      if (!res.ok) { grid.innerHTML = '<div class="unsplash-empty">Erro na busca. Tente novamente.</div>'; return; }
      const data = await res.json();
      if (!data.results || !data.results.length) { grid.innerHTML = '<div class="unsplash-empty">Nenhuma imagem encontrada.</div>'; return; }
      grid.innerHTML = '';
      data.results.forEach(foto => {
        const div = document.createElement('div');
        div.className = 'unsplash-item';
        div.innerHTML = `<img src="${foto.urls.thumb}" alt="${foto.alt_description || ''}" loading="lazy">
          <div class="unsplash-attr">📷 ${foto.user.name}</div>`;
        div.onclick = () => selecionarFotoUnsplash(foto);
        grid.appendChild(div);
      });
    } catch (e) {
      grid.innerHTML = '<div class="unsplash-empty">Erro de conexão.</div>';
    }
  } else if (currentSearchSource === 'pixabay') {
    // Busca via Pixabay
    try {
      const res = await fetch(`https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(q)}&per_page=15`);
      if (!res.ok) { grid.innerHTML = '<div class="unsplash-empty">Erro na busca no Pixabay. Tente novamente.</div>'; return; }
      const data = await res.json();
      if (!data.hits || !data.hits.length) { grid.innerHTML = '<div class="unsplash-empty">Nenhuma imagem encontrada no Pixabay.</div>'; return; }
      grid.innerHTML = '';
      data.hits.forEach(hit => {
        const adaptedPhoto = {
          urls: {
            regular: hit.largeImageURL,
            thumb: hit.previewURL
          },
          user: {
            name: hit.user
          },
          alt_description: hit.tags || '',
          links: {
            download_location: null
          }
        };
        const div = document.createElement('div');
        div.className = 'unsplash-item';
        div.innerHTML = `<img src="${adaptedPhoto.urls.thumb}" alt="${adaptedPhoto.alt_description}" loading="lazy">
          <div class="unsplash-attr">📷 ${adaptedPhoto.user.name}</div>`;
        div.onclick = () => selecionarFotoUnsplash(adaptedPhoto);
        grid.appendChild(div);
      });
    } catch (e) {
      grid.innerHTML = '<div class="unsplash-empty">Erro de conexão com o Pixabay.</div>';
    }
  } else {
    // Busca via Pexels
    try {
      const res = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(q)}&per_page=15`, {
        headers: {
          'Authorization': PEXELS_API_KEY
        }
      });
      if (!res.ok) { grid.innerHTML = '<div class="unsplash-empty">Erro na busca no Pexels. Tente novamente.</div>'; return; }
      const data = await res.json();
      if (!data.photos || !data.photos.length) { grid.innerHTML = '<div class="unsplash-empty">Nenhuma imagem encontrada no Pexels.</div>'; return; }
      grid.innerHTML = '';
      data.photos.forEach(photo => {
        const adaptedPhoto = {
          urls: {
            regular: photo.src.large,
            thumb: photo.src.tiny
          },
          user: {
            name: photo.photographer
          },
          alt_description: photo.alt || '',
          links: {
            download_location: null
          }
        };
        const div = document.createElement('div');
        div.className = 'unsplash-item';
        div.innerHTML = `<img src="${adaptedPhoto.urls.thumb}" alt="${adaptedPhoto.alt_description}" loading="lazy">
          <div class="unsplash-attr">📷 ${adaptedPhoto.user.name}</div>`;
        div.onclick = () => selecionarFotoUnsplash(adaptedPhoto);
        grid.appendChild(div);
      });
    } catch (e) {
      grid.innerHTML = '<div class="unsplash-empty">Erro de conexão com o Pexels.</div>';
    }
  }
}

async function buscarUnsplash() {
  return executarBuscaImagens();
}

function limparImagemToken() {
  definirImagemToken('');
}

let tfSelectedColor = '#c94040';
let tfSelectedImage = '';
let tfEditingId = null;

function abrirFormToken(cx, cy, prefillOpts) {
  tfEditingId = null;
  document.getElementById('tfTitle').textContent = 'Novo Token';
  document.getElementById('tfName').value = prefillOpts?.name || '';
  document.getElementById('tfHP').value = prefillOpts?.hp ?? '';
  const hpInit = prefillOpts?.hp ?? '';
  document.getElementById('tfHPMax').value = hpInit;
  document.getElementById('tfPM').value = '';
  document.getElementById('tfPMMax').value = '';
  document.getElementById('tfDefesa').value = '';
  document.getElementById('tfDefesaMax').value = '';
  document.getElementById('tfSize').value = String(prefillOpts?.size || 1);
  selectTokenColorByValue('#c94040');
  popularControleSelect('');
  definirImagemToken(prefillOpts?.imageUrl || '');

  popularSelectorSom('tfSom', null);

  // Restaura todos os campos (podem ter sido ocultos pelo jogador antes)
  ['tfRowControle','tfRowLayer','tfRowVisao','tfRowZ','tfRowAuras','tfRowAuraAlcance','tfRowForma','tfRowSom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = '';
  });

  const layerSelect = document.getElementById('tfLayer');
  if (layerSelect) {
    layerSelect.value = BOARD.activeLayer || 'players';
  }
  const zInput = document.getElementById('tfZ');
  if (zInput) zInput.value = '0';
  const posXInput = document.getElementById('tfImgPosX');
  const posYInput = document.getElementById('tfImgPosY');
  if (posXInput) posXInput.value = 50;
  if (posYInput) posYInput.value = 50;

  // Preview da borda
  ['tfBorderType','tfBorderWidth','tfBorderColor'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = id === 'tfBorderColor' ? '#000000' : (id === 'tfBorderWidth' ? '1.5' : 'solid');
  });
  const bw = document.getElementById('tfBorderWidthVal');
  if (bw) bw.textContent = '1.5';
  const bType = document.getElementById('tfBorderType');
  const bWidth = document.getElementById('tfBorderWidth');
  const bColor = document.getElementById('tfBorderColor');
  const atualizarPreview = () => {
    const s = document.getElementById('tfBorderWidthVal');
    if (s) s.textContent = document.getElementById('tfBorderWidth')?.value || '1.5';
    _renderBorderPreview();
  };
  if (bType) bType.onchange = atualizarPreview;
  if (bWidth) bWidth.oninput = atualizarPreview;
  if (bColor) bColor.oninput = atualizarPreview;
  _renderBorderPreview();

  posicionarForm(cx, cy);
  document.getElementById('tokenForm').classList.add('open');
  document.getElementById('tfName').focus();
}

function abrirFormTokenEdit(token, cx, cy) {
  tfEditingId = token.id;
  document.getElementById('tfTitle').textContent = 'Editar Token';
  document.getElementById('tfName').value = token.name;
  document.getElementById('tfHP').value = token.hp ?? '';
  document.getElementById('tfHPMax').value = token.hpMax ?? '';
  document.getElementById('tfPM').value = token.pm ?? '';
  document.getElementById('tfPMMax').value = token.pmMax ?? '';
  document.getElementById('tfDefesa').value = token.defense ?? '';
  document.getElementById('tfDefesaMax').value = token.defenseMax ?? '';
  document.getElementById('tfSize').value = String(token.size || 1);
  selectTokenColorByValue(token.color || '#c94040');
  popularControleSelect(token.controlledBy || '');
  definirImagemToken(token.imageUrl || '');

  const ehJogador = (myRole !== 'mestre');

  popularSelectorSom('tfSom', token.soundId || '');

  // Mostra todos os campos primeiro, depois esconde os restritos p/ jogador
  ['tfRowControle','tfRowLayer','tfRowVisao','tfRowZ','tfRowAuras','tfRowAuraAlcance','tfRowForma','tfRowSom'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = '';
  });
  if (ehJogador) {
    ['tfRowControle','tfRowLayer','tfRowVisao','tfRowZ','tfRowAuras','tfRowAuraAlcance','tfRowForma','tfRowSom'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  }

  // Objetos não têm visão
  if (token.type === 'object') {
    const el = document.getElementById('tfRowVisao');
    if (el) el.style.display = 'none';
  }

  const layerSelect = document.getElementById('tfLayer');
  if (layerSelect) {
    layerSelect.value = token.layer || 'players';
  }
  const zInput = document.getElementById('tfZ');
  if (zInput) zInput.value = token.z ?? 0;
  const hideNameCb = document.getElementById('tfHideName');
  if (hideNameCb) hideNameCb.checked = !!token.hideName;
  const posXInput = document.getElementById('tfImgPosX');
  const posYInput = document.getElementById('tfImgPosY');
  let posX = 50, posY = 50;
  if (token.imagePosition) {
    const m = token.imagePosition.match(/(-?\d+(?:\.\d+)?)%\s+(-?\d+(?:\.\d+)?)%/);
    if (m) { posX = parseFloat(m[1]); posY = parseFloat(m[2]); }
  }
  if (posXInput) posXInput.value = posX;
  if (posYInput) posYInput.value = posY;

  if (token.type === 'object') {
    const sx = document.getElementById('tfSizeX');
    const sy = document.getElementById('tfSizeY');
    if (sx) sx.value = String(token.sizeX || token.size || 1);
    if (sy) sy.value = String(token.sizeY || token.size || 1);
    const origX = token.sizeX || token.size || 1;
    const origY = token.sizeY || token.size || 1;
    _initSizeProportionLock(origX, origY, sx, sy);
  } else {
    _clearSizeProportionLock();
  }

  // Inicializa preview da borda
  const setB = (id, prop, fallback) => { const el = document.getElementById(id); if (el) el.value = token[prop] ?? fallback; };
  setB('tfBorderType', 'borderType', 'solid');
  setB('tfBorderWidth', 'borderWidth', '1.5');
  setB('tfBorderColor', 'borderColor', '#000000');
  const bwSpan = document.getElementById('tfBorderWidthVal');
  if (bwSpan) bwSpan.textContent = document.getElementById('tfBorderWidth')?.value || '1.5';
  const atualizarPreview = () => {
    const s = document.getElementById('tfBorderWidthVal');
    if (s) s.textContent = document.getElementById('tfBorderWidth')?.value || '1.5';
    _renderBorderPreview();
  };
  const bType = document.getElementById('tfBorderType');
  const bWidth = document.getElementById('tfBorderWidth');
  const bColor = document.getElementById('tfBorderColor');
  if (bType) bType.onchange = atualizarPreview;
  if (bWidth) bWidth.oninput = atualizarPreview;
  if (bColor) bColor.oninput = atualizarPreview;
  _renderBorderPreview();

  posicionarForm(cx, cy);
  document.getElementById('tokenForm').classList.add('open');
  document.getElementById('tfName').focus();
  _initTokenPreviewDrag();
  _loadTokenPreviewImage(token.imageUrl || '');
}

let _sizePropLockX = null;
let _sizePropLockY = null;
let _sizePropRatio = 1;

function _clearSizeProportionLock() {
  if (_sizePropLockX) { _sizePropLockX.oninput = null; _sizePropLockX = null; }
  if (_sizePropLockY) { _sizePropLockY.oninput = null; _sizePropLockY = null; }
  _sizePropRatio = 1;
}

function _initSizeProportionLock(origX, origY, elX, elY) {
  _clearSizeProportionLock();
  _sizePropRatio = origY / origX || 1;
  _sizePropLockX = elX;
  _sizePropLockY = elY;
  if (!elX || !elY) return;
  elX.oninput = function () {
    const v = parseFloat(this.value);
    if (!isNaN(v) && v > 0) {
      elY.value = String(Math.round(v * _sizePropRatio * 4) / 4);
    }
  };
  elY.oninput = function () {
    const v = parseFloat(this.value);
    if (!isNaN(v) && v > 0) {
      elX.value = String(Math.round(v / _sizePropRatio * 4) / 4);
    }
  };
}

function posicionarForm(cx, cy) {
  const form = document.getElementById('tokenForm');
  if (cx === undefined) {
    const rect = BOARD.wrap.getBoundingClientRect();
    cx = rect.left + rect.width / 2;
    cy = rect.top + rect.height / 2;
  } else {
    const rect = BOARD.wrap.getBoundingClientRect();
    cx = rect.left + cx;
    cy = rect.top + cy;
  }
  form.style.left = Math.min(cx + 10, window.innerWidth - 240) + 'px';
  form.style.top = Math.min(cy - 20, window.innerHeight - 200) + 'px';
}

function fecharFormToken() {
  document.getElementById('tokenForm')?.classList.remove('open');
  tfEditingId = null;
  if (tfPreviewAnim) { clearInterval(tfPreviewAnim); tfPreviewAnim = null; }
  _clearSizeProportionLock();
}

function selectTokenColor(el) {
  document.querySelectorAll('.token-color-swatch').forEach(s => s.classList.remove('selected'));
  el.classList.add('selected');
  tfSelectedColor = el.dataset.color;
}

function selectTokenColorByValue(color) {
  document.querySelectorAll('.token-color-swatch').forEach(s => {
    s.classList.toggle('selected', s.dataset.color === color);
  });
  tfSelectedColor = color;
}

let tfPreviewImg = null;
let tfPreviewVideo = null;
let tfPreviewDrag = null;
let tfPreviewAnim = null;

function _tfPreviewSource() {
  return tfPreviewImg || tfPreviewVideo || null;
}

function _tfPreviewWidth() {
  if (tfPreviewImg && tfPreviewImg.naturalWidth) return tfPreviewImg.naturalWidth;
  if (tfPreviewVideo && tfPreviewVideo.videoWidth) return tfPreviewVideo.videoWidth;
  return 0;
}

function _tfPreviewHeight() {
  if (tfPreviewImg && tfPreviewImg.naturalHeight) return tfPreviewImg.naturalHeight;
  if (tfPreviewVideo && tfPreviewVideo.videoHeight) return tfPreviewVideo.videoHeight;
  return 0;
}

function _renderTokenPreviewCanvas() {
  const canvas = document.getElementById('tfImgCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height, R = W / 2;
  ctx.clearRect(0, 0, W, H);

  ctx.save();
  ctx.beginPath();
  ctx.arc(R, R, R - 1, 0, Math.PI * 2);
  ctx.fillStyle = '#2e251c';
  ctx.fill();
  ctx.restore();

  const preview = _tfPreviewSource();
  const pw = _tfPreviewWidth();
  const ph = _tfPreviewHeight();
  if (preview && pw > 0 && ph > 0) {
    const posX = parseFloat(document.getElementById('tfImgPosX')?.value ?? 50);
    const posY = parseFloat(document.getElementById('tfImgPosY')?.value ?? 50);
    const iw = pw, ih = ph;

    const scale = (W * 1.0) / Math.min(iw, ih);
    const dw = iw * scale, dh = ih * scale;
    const dx = -(dw - W) * posX / 100;
    const dy = -(dh - H) * posY / 100;
    ctx.save();
    ctx.beginPath();
    ctx.arc(R, R, R - 1, 0, Math.PI * 2);
    ctx.clip();
    ctx.drawImage(preview, dx, dy, dw, dh);
    ctx.restore();
  }

  ctx.save();
  ctx.beginPath();
  ctx.arc(R, R, R - 1, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(107,77,42,0.8)';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

function _initTokenPreviewDrag() {
  const canvas = document.getElementById('tfImgCanvas');
  if (!canvas || canvas._dragInited) return;
  canvas._dragInited = true;

  function getPos(e) {
    if (e.touches) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }
  function onStart(e) {
    if (!_tfPreviewSource()) return;
    e.preventDefault();
    const p = getPos(e);
    tfPreviewDrag = {
      startX: p.x, startY: p.y,
      startPosX: parseFloat(document.getElementById('tfImgPosX')?.value ?? 50),
      startPosY: parseFloat(document.getElementById('tfImgPosY')?.value ?? 50)
    };
    canvas.style.cursor = 'grabbing';
  }
  function onMove(e) {
    if (!tfPreviewDrag) return;
    e.preventDefault();
    const p = getPos(e);
    const iw = _tfPreviewWidth(), ih = _tfPreviewHeight();
    const scale = (canvas.width) / Math.min(iw, ih);
    const dw = iw * scale, dh = ih * scale;
    const rangeX = dw - canvas.width;
    const rangeY = dh - canvas.height;
    const dx = p.x - tfPreviewDrag.startX;
    const dy = p.y - tfPreviewDrag.startY;
    let nx = tfPreviewDrag.startPosX - (rangeX > 0 ? dx / rangeX * 100 : 0);
    let ny = tfPreviewDrag.startPosY - (rangeY > 0 ? dy / rangeY * 100 : 0);
    nx = Math.max(0, Math.min(100, nx));
    ny = Math.max(0, Math.min(100, ny));
    const px = document.getElementById('tfImgPosX');
    const py = document.getElementById('tfImgPosY');
    if (px) px.value = nx.toFixed(1);
    if (py) py.value = ny.toFixed(1);
    _renderTokenPreviewCanvas();
  }
  function onEnd() {
    tfPreviewDrag = null;
    canvas.style.cursor = 'grab';
  }

  canvas.addEventListener('mousedown', onStart);
  canvas.addEventListener('touchstart', onStart, { passive: false });
  window.addEventListener('mousemove', onMove);
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('mouseup', onEnd);
  window.addEventListener('touchend', onEnd);
}

function _renderBorderPreview() {
  const canvas = document.getElementById('tfBorderPreview');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const borderType = document.getElementById('tfBorderType')?.value || 'solid';
  if (borderType === 'none') return;

  const borderWidth = parseFloat(document.getElementById('tfBorderWidth')?.value) || 1.5;
  const borderColor = document.getElementById('tfBorderColor')?.value || '#000000';
  const cx = W / 2, cy = H / 2, r = W / 2 - 2;

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = '#3a2a1c';
  ctx.fill();

  renderTokenBorder(ctx, cx, cy, r, { borderType, borderWidth, borderColor, shapeType: 'circle', zoom: 1 });
  ctx.restore();
}

function _loadTokenPreviewImage(url, cb) {
  tfPreviewImg = null;
  tfPreviewVideo = null;
  if (tfPreviewAnim) { clearInterval(tfPreviewAnim); tfPreviewAnim = null; }
  _renderTokenPreviewCanvas();
  if (!url) { if (cb) cb(); return; }
  if (isVideoUrl(url)) {
    const v = document.createElement('video');
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.preload = 'auto';
    v.setAttribute('playsinline', '');
    v.crossOrigin = 'anonymous';
    v.addEventListener('loadeddata', () => {
      tfPreviewVideo = v;
      _renderTokenPreviewCanvas();
      if (cb) cb();
    });
    v.addEventListener('error', () => { if (cb) cb(); });
    v.src = url;
    v.play().catch(() => { });
    // Anima o preview enquanto o formulário estiver aberto
    tfPreviewAnim = setInterval(_renderTokenPreviewCanvas, 50);
    return;
  }
  loadImageWithCORSFallback(url, (img) => {
    tfPreviewImg = img;
    _renderTokenPreviewCanvas();
    if (cb) cb();
  }, () => {
    tfPreviewImg = null;
    _renderTokenPreviewCanvas();
    if (cb) cb();
  });
}

function definirImagemToken(url) {
  tfSelectedImage = url || '';
  const urlInput = document.getElementById('tfImgUrl');
  const placeholder = document.getElementById('tfImgPlaceholder');
  const clearBtn = document.getElementById('tfImgClear');
  if (urlInput) urlInput.value = tfSelectedImage;
  if (placeholder) placeholder.style.display = tfSelectedImage ? 'none' : '';
  if (clearBtn) clearBtn.style.display = tfSelectedImage ? 'flex' : 'none';
  _initTokenPreviewDrag();
  _loadTokenPreviewImage(tfSelectedImage);
}

function previewImagemToken(url) {
  tfSelectedImage = (url || '').trim();
  const placeholder = document.getElementById('tfImgPlaceholder');
  const clearBtn = document.getElementById('tfImgClear');
  if (placeholder) placeholder.style.display = tfSelectedImage ? 'none' : '';
  if (clearBtn) clearBtn.style.display = tfSelectedImage ? 'flex' : 'none';
  _initTokenPreviewDrag();
  _loadTokenPreviewImage(tfSelectedImage);
}

function carregarImagemArquivo(input) {
  const file = input.files && input.files[0];
  if (!file) return;
  if (file.type && file.type.startsWith('video/')) {
    toast('🎬 Vídeos devem ser adicionados por URL (ex: https://.../fire.webm). Upload de vídeo está bloqueado para proteger o armazenamento/sync.', 4000);
    input.value = '';
    return;
  }
  const reader = new FileReader();
  reader.onload = (e) => {
    definirImagemToken(e.target.result);
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function confirmarToken() {
  snapshotBoard();
  const name = document.getElementById('tfName').value.trim() || 'Token';
  const hp = parseInt(document.getElementById('tfHP').value) || 0;
  const hpMax = parseInt(document.getElementById('tfHPMax').value) || 0;
  const pm = parseInt(document.getElementById('tfPM').value) || 0;
  const pmMax = parseInt(document.getElementById('tfPMMax').value) || 0;
  const defesa = parseInt(document.getElementById('tfDefesa').value) || 0;
  const defesaMax = parseInt(document.getElementById('tfDefesaMax').value) || 0;
  const size = parseFloat(document.getElementById('tfSize').value) || 1;
  const ehJogador = (myRole !== 'mestre');
  const controlledBy = ehJogador ? null : (document.getElementById('tfControlledBy').value || null);
  const imageUrl = tfSelectedImage || '';
  const layer = myRole === 'mestre' ? (document.getElementById('tfLayer')?.value || 'gm') : 'players';
  const posX = parseInt(document.getElementById('tfImgPosX').value) || 50;
  const posY = parseInt(document.getElementById('tfImgPosY').value) || 50;
  const imagePosition = `${posX}% ${posY}%`;
  const hideName = document.getElementById('tfHideName').checked;
  const z = !ehJogador ? (parseInt(document.getElementById('tfZ').value) || 0) : 0;
  const visionType = !ehJogador ? (document.querySelector('input[name="tfVision"]:checked')?.value || 'normal') : 'normal';
  const auras = !ehJogador ? lerAurasForm() : [];
  const borderType = document.getElementById('tfBorderType')?.value || 'solid';
  const borderWidth = parseFloat(document.getElementById('tfBorderWidth')?.value) || 1.5;
  const borderColor = document.getElementById('tfBorderColor')?.value || 'rgba(0,0,0,0.5)';
  const shapeType = !ehJogador ? (document.getElementById('tfShapeType')?.value || 'circle') : 'circle';
  const auraRadius = !ehJogador ? (parseFloat(document.getElementById('tfAuraRadius')?.value) || 0) : 0;
  const auraColor = !ehJogador ? (document.getElementById('tfAuraColor')?.value || 'rgba(66,165,245,0.2)') : 'rgba(66,165,245,0.2)';
  const soundId = document.getElementById('tfSom')?.value || null;

  if (tfEditingId) {
    const t = BOARD.tokens.find(t => t.id === tfEditingId);
    if (t) {
      t.name = name;
      t.hp = hp; t.hpMax = hpMax;
      t.pm = pm; t.pmMax = pmMax;
      t.defense = defesa; t.defenseMax = defesaMax;
      t.imageUrl = imageUrl;
      t.imagePosition = imagePosition;
      t.hideName = hideName;
      t.color = tfSelectedColor;
      t.borderType = borderType;
      t.borderWidth = borderWidth;
      t.borderColor = borderColor;

      t.soundId = soundId;

      if (!ehJogador) {
        t.controlledBy = controlledBy;
        t.layer = layer;
        t.z = z;
        t.visionType = visionType;
        t.auras = auras;
        t.shapeType = shapeType;
        t.auraRadius = auraRadius;
        t.auraColor = auraColor;
      }

      if (t.type === 'object') {
        const sizeX = parseFloat(document.getElementById('tfSizeX').value);
        const sizeY = parseFloat(document.getElementById('tfSizeY').value);
        t.sizeX = isNaN(sizeX) ? 1 : sizeX;
        t.sizeY = isNaN(sizeY) ? 1 : sizeY;
        t.size = Math.max(t.sizeX, t.sizeY);
      } else {
        t.size = size;
        t.sizeX = size;
        t.sizeY = size;
      }
    }
  } else {
    const cx = BOARD.wrap.clientWidth / 2;
    const cy = BOARD.wrap.clientHeight / 2;
    const { gx, gy } = canvasToGrid(cx, cy);
    const bestiaryName = window._bestiaryPendingName || '';
    window._bestiaryPendingName = '';
    BOARD.tokens.push({
      id: 'tk' + Date.now() + Math.floor(Math.random() * 9999),
      name, hp, hpMax, pm, pmMax, defense: defesa, defenseMax: defesaMax, size,
      sizeX: size, sizeY: size,
      color: tfSelectedColor,
      imageUrl, controlledBy,
      layer, imagePosition,
      conditions: [], hideName,
      bestiaryName, visionType, auras,
      borderType, borderWidth, borderColor, shapeType, auraRadius, auraColor,
      z, soundId,
      gx: Math.max(0, gx), gy: Math.max(0, gy)
    });
  }

  fecharFormToken();
  boardSave(); boardRender(); syncBoardTokensToPlayers();
  if (myRole !== 'mestre' || emVisaoJogador()) atualizarFogJogador();
}

// ── Adicionar token a partir do combate ──
function tokenDosCombatentes() {
  if (!combatState?.combatants?.length) { toast('Sem combatentes no gerenciador.'); return; }
  snapshotBoard();
  const CORES = ['#c94040', '#4080c9', '#40a050', '#c9903a', '#9040c9', '#c0c0c0', '#40b0b0', '#c940a0'];
  let adicionados = 0;
  combatState.combatants.forEach((c, i) => {
    const jaExiste = BOARD.tokens.find(t => t.combatId === c.id);
    if (!jaExiste) {
      const { offsetX, offsetY, zoom, gridSize } = BOARD;
      const col = i % 8; const row = Math.floor(i / 8);
      const startGx = Math.max(0, Math.floor((-offsetX / zoom) / gridSize) + 1 + col * 2);
      const startGy = Math.max(0, Math.floor((-offsetY / zoom) / gridSize) + 1 + row * 2);

      // Busca enquadramento customizado se houver
      let threatImg = c.imageUrl || '';
      let threatImgPosition = '50% 50%';
      try {
        const customImages = JSON.parse(localStorage.getItem('t20_threat_images')) || {};
        const cleanName = c.name.replace(/\s+\d+$/, '').trim();
        if (customImages[cleanName]) {
          if (typeof customImages[cleanName] === 'object') {
            threatImg = customImages[cleanName].url || threatImg;
            threatImgPosition = customImages[cleanName].position || '50% 50%';
          }
        }
      } catch (e) { }

      BOARD.tokens.push({
        id: 'tk' + Date.now() + Math.floor(Math.random() * 9999),
        combatId: c.id,
        name: c.name, hp: c.hpCur, hpMax: c.hpMax,
        pm: c.mpCur || 0, pmMax: c.mpMax || 0,
        defense: c.stats?.def || 0,
        color: CORES[i % CORES.length], size: 1,
        imageUrl: threatImg || '',
        imagePosition: threatImgPosition,
        controlledBy: null,
        borderType: 'solid', borderWidth: 1.5, borderColor: '#000000',
        shapeType: 'circle', auraRadius: 0,
        z: 0,
        layer: BOARD.activeLayer || 'gm',
        conditions: [],
        hideName: false,
        gx: startGx, gy: startGy
      });
      adicionados++;
    }
  });
  boardSave(); boardRender(); syncBoardTokensToPlayers();
  toast(`⚔ ${adicionados} token(s) do combate adicionados ao tabuleiro!`);
}

// ── Adicionar um único token a partir do combate ──
function adicionarTokenDoCombatente(combatantId) {
  snapshotBoard();
  if (!combatState?.combatants) return;
  const c = combatState.combatants.find(x => x.id === combatantId);
  if (!c) return;

  // Busca imagem e enquadramento customizado se houver
  let threatImg = c.imageUrl || '';
  let threatImgPosition = '50% 50%';

  if (!threatImg && typeof AMEACAS_DB !== 'undefined') {
    const cleanName = c.name.replace(/\s+\d+$/, '').trim().toLowerCase();
    const threatMatch = AMEACAS_DB.find(t => (t.nome || '').toLowerCase() === cleanName);
    if (threatMatch && threatMatch.img) {
      threatImg = threatMatch.img;
    }
  }

  try {
    const customImages = JSON.parse(localStorage.getItem('t20_threat_images')) || {};
    const cleanName = c.name.replace(/\s+\d+$/, '').trim();
    if (customImages[cleanName]) {
      if (typeof customImages[cleanName] === 'object') {
        threatImg = customImages[cleanName].url || threatImg;
        threatImgPosition = customImages[cleanName].position || '50% 50%';
      } else {
        threatImg = customImages[cleanName];
      }
    }
  } catch (e) { }

  // Centraliza na tela
  const { offsetX, offsetY, zoom, gridSize } = BOARD;
  const cx = BOARD.wrap.clientWidth / 2;
  const cy = BOARD.wrap.clientHeight / 2;
  const { gx, gy } = canvasToGrid(cx, cy);

  BOARD.tokens.push({
    id: 'tk' + Date.now() + Math.floor(Math.random() * 9999),
    combatId: c.id,
    name: c.name,
    hp: c.hpCur,
    hpMax: c.hpMax,
    pm: c.mpCur || 0,
    pmMax: c.mpMax || 0,
    defense: c.stats?.def || 0,
    color: '#c94040',
    size: 1,
    imageUrl: threatImg || '',
    imagePosition: threatImgPosition,
    controlledBy: null,
    borderType: 'solid', borderWidth: 1.5, borderColor: '#000000',
    shapeType: 'circle', auraRadius: 0,
    z: 0,
    conditions: [],
    hideName: false,
    layer: 'gm',
    gx: Math.max(0, gx),
    gy: Math.max(0, gy)
  });

  boardSave();
  boardRender();
  syncBoardTokensToPlayers();
  toast(`Token de ${c.name} adicionado ao mapa!`);
}

// Atualizar tokens quando combate muda de HP/MP/Def
function atualizarTokensDoCombate() {
  if (!combatState?.combatants) return;
  let changed = false;
  BOARD.tokens.forEach(t => {
    if (t.combatId) {
      const c = combatState.combatants.find(c => c.id === t.combatId);
      if (c) {
        if (t.hp !== c.hpCur || t.hpMax !== c.hpMax ||
          t.pm !== (c.mpCur || 0) || t.pmMax !== (c.mpMax || 0) ||
          t.defense !== (c.stats?.def || '')) {
          t.hp = c.hpCur; t.hpMax = c.hpMax;
          t.pm = c.mpCur || 0; t.pmMax = c.mpMax || 0;
          t.defense = c.stats?.def || 0;
          changed = true;
        }
      }
    }
  });
  if (changed) { boardRender(); syncBoardTokensToPlayers(); }
}

// ── Salvar/Carregar Cenas ──
function saveCurrentBoardToActiveScene() {
  const activeScene = SCENES.find(s => s.id === ACTIVE_SCENE_ID);
  if (!activeScene) return;

  activeScene.tokens = BOARD.tokens;
  activeScene.walls = BOARD.walls;
  activeScene.shapes = BOARD.shapes;
  activeScene.gridSize = BOARD.gridSize;
  activeScene.gridOn = BOARD.gridOn;
  activeScene.activeFloor = BOARD.activeFloor || 0;
  activeScene.gridCols = BOARD.gridCols;
  activeScene.gridRows = BOARD.gridRows;
  activeScene.gridScaleVal = BOARD.gridScaleVal;
  activeScene.gridScaleUnit = BOARD.gridScaleUnit;
  activeScene.gridType = BOARD.gridType;
  activeScene.distanceMode = BOARD.distanceMode;
  activeScene.lightingType = BOARD.lightingType;
  activeScene.projection = BOARD.projection || '2d';
  activeScene.mapDataUrl = BOARD.mapDataUrl;
  activeScene.mapX = BOARD.mapX || 0;
  activeScene.mapY = BOARD.mapY || 0;
  activeScene.mapWidth = BOARD.mapWidth || null;
  activeScene.mapHeight = BOARD.mapHeight || null;
  
  if (BOARD.fogManual && BOARD.fogVisible) {
    activeScene.fogVisible = Array.from(BOARD.fogVisible);
    activeScene.fogManual = true;
  } else {
    activeScene.fogVisible = null;
    activeScene.fogManual = false;
  }
}

function saveScenesLocally() {
  try {
    localStorage.setItem('vtt_scenes', JSON.stringify(SCENES));
    localStorage.setItem('vtt_active_scene_id', ACTIVE_SCENE_ID);
    localStorage.setItem('vtt_players_scene_id', PLAYERS_SCENE_ID);
  } catch (e) { }
}

function loadSceneIntoBoard(scene) {
  // Clear selections
  if (BOARD.selectedTokens) BOARD.selectedTokens.clear();
  BOARD.dragging = null;
  BOARD.hovered = null;

  BOARD.tokens = (scene.tokens || []).map(t => ({
    ...t,
    layer: t.layer || 'players',
    conditions: t.conditions || [],
    hideName: t.hideName || false,
    soundId: t.soundId || null
  }));
  
  BOARD.walls = (scene.walls || []).map(w => ({
    ...w,
    soundId: w.soundId || null
  }));
  
  BOARD.shapes = (scene.shapes || []).map(sh => ({
    ...sh,
    soundId: sh.soundId || null,
    hidden: sh.hidden === true,
    triggerImageUrl: sh.triggerImageUrl || null,
    triggered: sh.triggered === true
  }));
  
  if (scene.gridSize) BOARD.gridSize = scene.gridSize;
  if (typeof scene.gridOn === 'boolean') BOARD.gridOn = scene.gridOn;
  if (scene.activeFloor !== undefined) BOARD.activeFloor = scene.activeFloor;
  if (scene.gridCols !== undefined) BOARD.gridCols = scene.gridCols;
  if (scene.gridRows !== undefined) BOARD.gridRows = scene.gridRows;
  if (scene.gridScaleVal !== undefined) BOARD.gridScaleVal = scene.gridScaleVal;
  if (scene.gridScaleUnit !== undefined) BOARD.gridScaleUnit = scene.gridScaleUnit;
  if (scene.gridType !== undefined) BOARD.gridType = scene.gridType;
  if (scene.distanceMode !== undefined) BOARD.distanceMode = scene.distanceMode;
  if (scene.lightingType !== undefined) {
    BOARD.lightingType = scene.lightingType;
    if (typeof _syncWeatherSelect === 'function') _syncWeatherSelect();
  }
  BOARD.projection = scene.projection || '2d';
  const isoBtn = document.getElementById('btnToggleProjection');
  if (isoBtn) {
    isoBtn.textContent = BOARD.projection === 'iso' ? '🔷 2.5D' : '🔲 2D';
    isoBtn.classList.toggle('active', BOARD.projection === 'iso');
  }
  
  if (scene.fogManual && scene.fogVisible) {
    BOARD.fogVisible = new Set(scene.fogVisible);
    BOARD.fogManual = true;
  } else {
    BOARD.fogVisible = null;
    BOARD.fogManual = false;
  }
  
  if (scene.mapDataUrl) {
    BOARD.mapDataUrl = scene.mapDataUrl;
    BOARD.mapX = scene.mapX !== undefined ? scene.mapX : 0;
    BOARD.mapY = scene.mapY !== undefined ? scene.mapY : 0;
    BOARD.mapWidth = scene.mapWidth !== undefined ? scene.mapWidth : null;
    BOARD.mapHeight = scene.mapHeight !== undefined ? scene.mapHeight : null;
    
    const img = new Image();
    img.onload = () => {
      BOARD.mapImg = img;
      if (isGifUrl(img.src)) getGifCanvas(img.src, img.naturalWidth, img.naturalHeight);
      boardRender();
    };
    img.src = scene.mapDataUrl;
  } else {
    BOARD.mapDataUrl = null;
    BOARD.mapImg = null;
    BOARD.mapX = 0;
    BOARD.mapY = 0;
    BOARD.mapWidth = null;
    BOARD.mapHeight = null;
  }
  
  // Auto-iniciar partículas se o clima carregado for chuva/neve
  if (typeof _applyWeatherParticles === 'function') _applyWeatherParticles();
}

function boardSave() {
  if (myRole !== 'mestre' && !amIHost) return;
  saveCurrentBoardToActiveScene();
  saveScenesLocally();
}

function boardLoad() {
  try {
    const rawScenes = localStorage.getItem('vtt_scenes');
    const rawActiveId = localStorage.getItem('vtt_active_scene_id');
    const rawPlayersId = localStorage.getItem('vtt_players_scene_id');
    
    if (rawScenes) {
      SCENES = JSON.parse(rawScenes);
      ACTIVE_SCENE_ID = rawActiveId;
      PLAYERS_SCENE_ID = rawPlayersId || rawActiveId;
    }
    
    if (!SCENES || SCENES.length === 0) {
      // Tenta migrar do estado legado se houver
      const rawLegacy = localStorage.getItem('vtt_board_state');
      let legacyState = null;
      if (rawLegacy) {
        try { legacyState = JSON.parse(rawLegacy); } catch (e) { }
      }
      
      const defaultScene = {
        id: 'scene_' + Date.now(),
        name: 'Cena 1',
        tokens: legacyState?.tokens || [],
        walls: legacyState?.walls || [],
        shapes: legacyState?.shapes || [],
        gridSize: legacyState?.gridSize || 50,
        gridOn: legacyState?.gridOn !== undefined ? legacyState.gridOn : true,
        activeFloor: legacyState?.activeFloor || 0,
        gridCols: legacyState?.gridCols || 40,
        gridRows: legacyState?.gridRows || 40,
        gridScaleVal: legacyState?.gridScaleVal || 1.5,
        gridScaleUnit: legacyState?.gridScaleUnit || 'm',
        gridType: legacyState?.gridType || 'square',
        lightingType: legacyState?.lightingType || 'normal',
        mapDataUrl: legacyState?.mapDataUrl || null,
        mapX: legacyState?.mapX || 0,
        mapY: legacyState?.mapY || 0,
        mapWidth: legacyState?.mapWidth || null,
        mapHeight: legacyState?.mapHeight || null,
        fogManual: legacyState?.fogManual || false,
        fogVisible: legacyState?.fogVisible || null
      };
      
      SCENES = [defaultScene];
      ACTIVE_SCENE_ID = defaultScene.id;
      PLAYERS_SCENE_ID = defaultScene.id;
      saveScenesLocally();
    }
    
    const activeScene = SCENES.find(s => s.id === ACTIVE_SCENE_ID) || SCENES[0];
    ACTIVE_SCENE_ID = activeScene.id;
    if (!PLAYERS_SCENE_ID) {
      PLAYERS_SCENE_ID = ACTIVE_SCENE_ID;
    }
    
    loadSceneIntoBoard(activeScene);
    renderScenesPanel();
  } catch (e) { }
}

// ── Funções de Gerenciamento de Cena ──
function alternarCena(sceneId) {
  if (myRole !== 'mestre' && !amIHost) return;
  if (sceneId === ACTIVE_SCENE_ID) return;
  
  saveCurrentBoardToActiveScene();
  ACTIVE_SCENE_ID = sceneId;
  saveScenesLocally();
  
  const newScene = SCENES.find(s => s.id === sceneId);
  if (newScene) {
    loadSceneIntoBoard(newScene);
  }
  
  setTimeout(atualizarFogJogador, 100);
  boardRender();
  
  broadcastScenesUpdate();
  renderScenesPanel();
  
  toast(`Cena alterada para: ${newScene ? newScene.name : ''}`);
}

function criarNovaCena() {
  if (myRole !== 'mestre' && !amIHost) return;
  
  const nome = prompt("Nome da nova cena:", `Cena ${SCENES.length + 1}`);
  if (nome === null) return;
  const finalNome = nome.trim() || `Cena ${SCENES.length + 1}`;
  
  saveCurrentBoardToActiveScene();
  
  const newScene = {
    id: 'scene_' + Date.now(),
    name: finalNome,
    tokens: [],
    walls: [],
    shapes: [],
    gridSize: 50,
    gridOn: true,
    activeFloor: 0,
    gridCols: 40,
    gridRows: 40,
    gridScaleVal: 1.5,
    gridScaleUnit: 'm',
    gridType: 'square',
    lightingType: 'normal',
    mapDataUrl: null,
    mapX: 0,
    mapY: 0,
    mapWidth: null,
    mapHeight: null,
    fogManual: false,
    fogVisible: null
  };
  
  SCENES.push(newScene);
  ACTIVE_SCENE_ID = newScene.id;
  
  saveScenesLocally();
  loadSceneIntoBoard(newScene);
  
  setTimeout(atualizarFogJogador, 100);
  boardRender();
  
  broadcastScenesUpdate();
  renderScenesPanel();
  
  toast(`Cena "${finalNome}" criada!`);
}

function deletarCena(sceneId, event) {
  if (event) event.stopPropagation();
  if (myRole !== 'mestre' && !amIHost) return;
  if (SCENES.length <= 1) {
    alert("Você não pode deletar a única cena restante!");
    return;
  }
  
  const scene = SCENES.find(s => s.id === sceneId);
  if (!scene) return;
  
  if (!confirm(`Tem certeza que deseja deletar a cena "${scene.name}"? Todos os tokens, paredes e mapas dela serão perdidos.`)) {
    return;
  }
  
  let targetActiveId = ACTIVE_SCENE_ID;
  if (sceneId === ACTIVE_SCENE_ID) {
    const remaining = SCENES.filter(s => s.id !== sceneId);
    targetActiveId = remaining[0].id;
    loadSceneIntoBoard(remaining[0]);
  }
  
  SCENES = SCENES.filter(s => s.id !== sceneId);
  ACTIVE_SCENE_ID = targetActiveId;
  
  let deletedPlayersScene = (sceneId === PLAYERS_SCENE_ID);
  if (deletedPlayersScene) {
    PLAYERS_SCENE_ID = targetActiveId;
    localStorage.setItem('vtt_players_scene_id', PLAYERS_SCENE_ID);
  }
  
  saveScenesLocally();
  
  setTimeout(atualizarFogJogador, 100);
  boardRender();
  
  if (deletedPlayersScene) {
    syncBoardToPlayers();
  }
  broadcastScenesUpdate();
  renderScenesPanel();
  
  toast(`Cena deletada.`);
}

function renomearCena(sceneId, event) {
  if (event) event.stopPropagation();
  if (myRole !== 'mestre' && !amIHost) return;
  
  const scene = SCENES.find(s => s.id === sceneId);
  if (!scene) return;
  
  const novoNome = prompt("Novo nome da cena:", scene.name);
  if (novoNome === null) return;
  const finalNome = novoNome.trim();
  if (!finalNome) return;
  
  scene.name = finalNome;
  
  saveScenesLocally();
  broadcastScenesUpdate();
  renderScenesPanel();
  
  toast(`Cena renomeada para "${finalNome}"`);
}

function renderScenesPanel() {
  const container = document.getElementById('scenesTopList');
  if (!container) return;
  container.innerHTML = '';
  
  const isMaster = (myRole === 'mestre' || amIHost);
  
  const btnCriar = document.getElementById('btn-criar-cena');
  if (btnCriar) {
    btnCriar.style.display = isMaster ? 'inline-block' : 'none';
  }
  
  SCENES.forEach(scene => {
    const isActive = (scene.id === ACTIVE_SCENE_ID);
    
    const btn = document.createElement('div');
    btn.className = `scene-btn ${isActive ? 'active' : ''}`;
    
    if (isMaster) {
      btn.onclick = () => alternarCena(scene.id);
      btn.oncontextmenu = (e) => abrirSceneContextMenu(e, scene.id);
    } else {
      btn.style.cursor = 'default';
      if (!isActive) {
        btn.style.opacity = '0.6';
      }
    }
    
    const nameSpan = document.createElement('span');
    nameSpan.textContent = scene.name;
    btn.appendChild(nameSpan);
    
    if (isMaster && scene.id === PLAYERS_SCENE_ID) {
      const indicator = document.createElement('span');
      indicator.className = 'scene-players-indicator';
      indicator.innerHTML = ' 👥';
      indicator.title = 'Jogadores estão aqui';
      btn.appendChild(indicator);
    }
    
    if (isMaster) {
      const controls = document.createElement('div');
      controls.className = 'scene-controls';
      
      const btnRename = document.createElement('button');
      btnRename.className = 'scene-action-btn';
      btnRename.title = 'Renomear Cena';
      btnRename.innerHTML = '✏️';
      btnRename.onclick = (e) => renomearCena(scene.id, e);
      controls.appendChild(btnRename);
      
      if (SCENES.length > 1) {
        const btnDelete = document.createElement('button');
        btnDelete.className = 'scene-action-btn delete-scene-btn';
        btnDelete.title = 'Deletar Cena';
        btnDelete.innerHTML = '✕';
        btnDelete.onclick = (e) => deletarCena(scene.id, e);
        controls.appendChild(btnDelete);
      }
      
      btn.appendChild(controls);
    }
    
    container.appendChild(btn);
  });
}

function abrirSceneContextMenu(e, sceneId) {
  e.preventDefault();
  e.stopPropagation();
  fecharContextMenu();
  
  contextSceneId = sceneId;
  const menu = document.getElementById('sceneContextMenu');
  if (menu) {
    const btnDelete = document.getElementById('ctxDeletarCena');
    if (btnDelete) {
      btnDelete.style.display = SCENES.length > 1 ? '' : 'none';
    }
    menu.style.left = e.clientX + 'px';
    menu.style.top = e.clientY + 'px';
    menu.style.display = 'block';
    
    const fechar = (ev) => {
      if (!menu.contains(ev.target)) {
        menu.style.display = 'none';
        document.removeEventListener('click', fechar);
      }
    };
    setTimeout(() => document.addEventListener('click', fechar), 10);
  }
}

function puxarJogadoresParaCenaContext() {
  if (contextSceneId) {
    puxarJogadores(contextSceneId);
  }
  fecharContextMenu();
}

function renomearCenaContext() {
  if (contextSceneId) {
    renomearCena(contextSceneId);
  }
  fecharContextMenu();
}

function deletarCenaContext() {
  if (contextSceneId) {
    deletarCena(contextSceneId);
  }
  fecharContextMenu();
}

let contextSceneId = null;

function broadcastScenesUpdate() {
  if (myRole !== 'mestre' && !amIHost) return;
  const metadata = getScenesMetadata();
  broadcast({
    type: 'scenes-update',
    scenes: metadata,
    activeSceneId: PLAYERS_SCENE_ID
  }, null);
}

function getScenesMetadata() {
  return SCENES.map(s => ({ id: s.id, name: s.name }));
}

// ── Limpar ──
function limparBoard() {
  if (!confirm('Limpar todos os tokens, paredes e o mapa?')) return;
  snapshotBoard();
  BOARD.tokens = []; BOARD.walls = []; BOARD.shapes = []; BOARD.mapImg = null; BOARD.mapDataUrl = null;
  BOARD.mapX = 0; BOARD.mapY = 0; BOARD.mapWidth = null; BOARD.mapHeight = null;
  BOARD.selectedWallId = null;
  BOARD.fogVisible = null; BOARD.fogManual = false;
  if (BOARD.animFrameId) { cancelAnimationFrame(BOARD.animFrameId); BOARD.animFrameId = null; }
  if (BOARD.playerViewTokenId) exitPlayerView();
  boardSave(); boardRender(); if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) syncBoardToPlayers();
  toast('Tabuleiro limpo.');
}

function limparParedes() {
  const activeFloor = getCurrentFloor();
  const currentFloorWalls = BOARD.walls.filter(w => getFloorFromZ(w.z) === activeFloor);
  if (currentFloorWalls.length === 0) { toast('Nenhuma parede neste andar para apagar.'); return; }
  if (!confirm(`Apagar todas as ${currentFloorWalls.length} paredes do Andar ${activeFloor}?`)) return;
  snapshotBoard();
  BOARD.walls = BOARD.walls.filter(w => getFloorFromZ(w.z) !== activeFloor);
  BOARD.selectedWallId = null;
  boardSave(); syncWallsToPlayers(); boardRender();
  toast(`🧱 Paredes do Andar ${activeFloor} apagadas.`);
}

function isPointInPolygon(x, y, polygon) {
  let inside = false;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].x, yi = polygon[i].y;
    const xj = polygon[j].x, yj = polygon[j].y;

    const intersect = ((yi > y) !== (yj > y))
      && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
}

// Encontra forma sob o ponto (wx,wy) em coords world
function shapeAt(wx, wy) {
  if (!BOARD.shapes) return null;
  const activeFloor = getCurrentFloor();
  for (let i = BOARD.shapes.length - 1; i >= 0; i--) {
    const s = BOARD.shapes[i];
    if (getFloorFromZ(s.z) !== activeFloor) continue;
    if (s.hidden && myRole !== 'mestre') continue;
    if (s.kind === 'circle') {
      const cx = (s.x1 + s.x2) / 2;
      const cy = (s.y1 + s.y2) / 2;
      const rx = Math.abs(s.x2 - s.x1) / 2;
      const ry = Math.abs(s.y2 - s.y1) / 2;
      if (rx === 0 || ry === 0) continue;
      const dx = (wx - cx) / rx;
      const dy = (wy - cy) / ry;
      if (dx * dx + dy * dy <= 1) return s;
    } else if (s.kind === 'freehand') {
      if (s.points && isPointInPolygon(wx, wy, s.points)) return s;
    } else {
      const x1 = Math.min(s.x1, s.x2), x2 = Math.max(s.x1, s.x2);
      const y1 = Math.min(s.y1, s.y2), y2 = Math.max(s.y1, s.y2);
      if (wx >= x1 && wx <= x2 && wy >= y1 && wy <= y2) return s;
    }
  }
  return null;
}

// Encontra parede mais próxima do ponto (wx,wy) em coords world
function wallAt(wx, wy, threshold) {
  let best = null, bestDist = threshold;
  const activeFloor = getCurrentFloor();
  BOARD.walls.forEach(w => {
    if (getFloorFromZ(w.z) !== activeFloor) return;
    const d = distPointSegment(wx, wy, w.x1, w.y1, w.x2, w.y2);
    if (d < bestDist) { bestDist = d; best = w; }
  });
  return best;
}

function distPointSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const len2 = dx * dx + dy * dy;
  if (len2 === 0) return Math.hypot(px - ax, py - ay);
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / len2));
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

function getWallHandleAt(cx, cy) {
  const { offsetX, offsetY, zoom, walls } = BOARD;
  const wx = (cx - offsetX) / zoom;
  const wy = (cy - offsetY) / zoom;
  const hitR = 12 / zoom; // clique de tolerância

  const activeFloor = getCurrentFloor();

  for (const w of walls) {
    if (getFloorFromZ(w.z) !== activeFloor) continue;
    if (w.type === 'door' || w.type === 'window') {
      const mx = (w.x1 + w.x2) / 2;
      const my = (w.y1 + w.y2) / 2;
      if (Math.hypot(wx - mx, wy - my) <= hitR) {
        return w;
      }
    }
  }
  return null;
}

function toggleWallState(wallId) {
  snapshotBoard();
  const w = BOARD.walls.find(wall => wall.id === wallId);
  if (!w) return;
  w.open = !w.open;

  boardSave();
  boardRender();

  if (myRole === 'mestre') {
    syncWallsToPlayers();
    setTimeout(atualizarFogJogador, 50);
  } else {
    solicitarAlternarParede(wallId);
  }

  // Tocar som da parede se tiver
  if (w.soundId) {
    const url = getSoundUrlById(w.soundId);
    if (url) {
      playSfx(url);
      if (myRole === 'mestre') broadcast({ type: 'play-sfx', url }, null);
    }
  }

  const stateStr = w.open ? 'aberta' : 'fechada';
  const name = w.type === 'door' ? 'Porta' : 'Janela';
  toast(`${name === 'Porta' ? '🚪' : '🪟'} ${name} agora está ${stateStr}.`);
}

function solicitarAlternarParede(wallId) {
  if (masterConn) {
    masterConn.send({
      type: 'solicitar-alternar-parede',
      wallId: wallId
    });
  }
}

// ── Sincronização P2P ──
function syncBoardTokensToPlayers() {
  if (myRole !== 'mestre') return;
  if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
    const filtered = BOARD.tokens.filter(t => (t.layer || 'players') !== 'gm');
    broadcast({ type: 'board-tokens', tokens: filtered }, null);
  }
}
function syncBoardMapToPlayers() {
  if (myRole !== 'mestre') return;
  if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
    broadcast({
      type: 'board-map',
      mapUrl: BOARD.mapDataUrl || null,
      mapX: BOARD.mapX || 0,
      mapY: BOARD.mapY || 0,
      mapWidth: BOARD.mapWidth || null,
      mapHeight: BOARD.mapHeight || null
    }, null);
  }
}
function syncWallsToPlayers() {
  if (myRole !== 'mestre') return;
  if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
    broadcast({ type: 'board-walls', walls: BOARD.walls }, null);
  }
}
function syncShapesToPlayers() {
  if (myRole === 'mestre') {
    if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
      const filtered = BOARD.shapes.filter(s => !s.hidden || s.triggered);
      broadcast({ type: 'board-shapes', shapes: filtered }, null);
    }
  } else if (masterConn) {
    const filtered = BOARD.shapes.filter(s => !s.hidden || s.triggered);
    masterConn.send({ type: 'player-shapes', shapes: filtered });
  }
}
function syncFogToPlayers() {
  if (myRole !== 'mestre') return;
  if (PLAYERS_SCENE_ID === ACTIVE_SCENE_ID) {
    if (BOARD.fogManual && BOARD.fogVisible) {
      broadcast({ type: 'board-fog', fog: Array.from(BOARD.fogVisible) }, null);
    } else {
      broadcast({ type: 'board-fog', fog: null }, null);
    }
  }
}
function pintarFogCelula(gx, gy, reveal) {
  if (!BOARD.fogVisible) return;
  const f = getCurrentFloor();
  const key = f === 0 ? `${gx},${gy}` : `${f}:${gx},${gy}`;
  if (reveal) BOARD.fogVisible.add(key);
  else BOARD.fogVisible.delete(key);
  boardRender();
}
function toggleFogShape() {
  BOARD.fogShape = BOARD.fogShape === 'brush' ? 'rect' : 'brush';
  const btn = document.getElementById('btnFogShape');
  if (btn) btn.textContent = BOARD.fogShape === 'brush' ? '🖌 Pincel' : '⛶ Seleção';
  toast(`Modo névoa: ${BOARD.fogShape === 'brush' ? 'Pincel (pintar célula)' : 'Seleção (arrastar área)'}`);
}
function pintarFogRetangulo(gx1, gy1, gx2, gy2, reveal) {
  if (!BOARD.fogVisible) return;
  const f = getCurrentFloor();
  const minX = Math.min(gx1, gx2), maxX = Math.max(gx1, gx2);
  const minY = Math.min(gy1, gy2), maxY = Math.max(gy1, gy2);
  for (let gx = minX; gx <= maxX; gx++) {
    for (let gy = minY; gy <= maxY; gy++) {
      const key = f === 0 ? `${gx},${gy}` : `${f}:${gx},${gy}`;
      if (reveal) BOARD.fogVisible.add(key);
      else BOARD.fogVisible.delete(key);
    }
  }
  boardRender();
}
function recalcularFog() {
  if (myRole !== 'mestre') return;
  if (BOARD.playerViewTokenId) {
    const token = BOARD.tokens.find(t => t.id === BOARD.playerViewTokenId);
    if (token) {
      BOARD.fogVisible = computeVisibility(token);
      BOARD.fogManual = false;
      boardSave(); syncFogToPlayers(); boardRender();
      toast('👁 Névoa recalculada para visão de jogador.');
      return;
    }
  }
  const selected = BOARD.tokens.filter(t => BOARD.selectedTokens.has(t.id) && t.type !== 'object');
  if (selected.length > 0) {
    const total = new Set();
    selected.forEach(t => {
      computeVisibility(t).forEach(k => total.add(k));
    });
    BOARD.fogVisible = total;
    BOARD.fogManual = false;
    boardSave(); syncFogToPlayers(); boardRender();
    toast('👁 Névoa recalculada para ' + selected.length + ' token(s).');
  } else {
    toast('👁 Selecione um token ou ative a visão de jogador.');
  }
}
function limparFog() {
  if (myRole !== 'mestre') return;
  if (!confirm('Remover toda a névoa do mapa?')) return;
  BOARD.fogVisible = null;
  BOARD.fogManual = false;
  boardSave();
  syncFogToPlayers();
  boardRender();
  toast('🌫 Névoa removida.');
}
function syncBoardToConnection(conn, sceneId) {
  const scene = SCENES.find(s => s.id === sceneId);
  if (!scene) return;
  
  let tokens = scene.tokens || [];
  let walls = scene.walls || [];
  let shapes = scene.shapes || [];
  let mapUrl = scene.mapDataUrl || null;
  let mapX = scene.mapX || 0;
  let mapY = scene.mapY || 0;
  let mapWidth = scene.mapWidth || null;
  let mapHeight = scene.mapHeight || null;
  let fogData = (scene.fogManual && scene.fogVisible) ? Array.from(scene.fogVisible) : null;
  let activeFloor = scene.activeFloor || 0;
  let gridSize = scene.gridSize || 50;
  let gridCols = scene.gridCols || 40;
  let gridRows = scene.gridRows || 40;
  let gridScaleVal = scene.gridScaleVal || 1.5;
  let gridScaleUnit = scene.gridScaleUnit || 'm';
  let gridType = scene.gridType || 'square';
  let lightingType = scene.lightingType || 'normal';

  if (sceneId === ACTIVE_SCENE_ID) {
    const filtered = BOARD.tokens.filter(t => (t.layer || 'players') !== 'gm');
    fogData = (BOARD.fogManual && BOARD.fogVisible) ? Array.from(BOARD.fogVisible) : null;
    conn.send({
      type: 'board-full',
      tokens: filtered,
      walls: BOARD.walls,
      shapes: BOARD.shapes,
      mapUrl: BOARD.mapDataUrl || null,
      mapX: BOARD.mapX || 0,
      mapY: BOARD.mapY || 0,
      mapWidth: BOARD.mapWidth || null,
      mapHeight: BOARD.mapHeight || null,
      fog: fogData,
      activeFloor: BOARD.activeFloor || 0,
      gridCols: BOARD.gridCols,
      gridRows: BOARD.gridRows,
      gridScaleVal: BOARD.gridScaleVal,
      gridScaleUnit: BOARD.gridScaleUnit,
      gridType: BOARD.gridType,
      distanceMode: BOARD.distanceMode,
      lightingType: BOARD.lightingType
    });
  } else {
    const filtered = tokens.filter(t => (t.layer || 'players') !== 'gm');
    conn.send({
      type: 'board-full',
      tokens: filtered,
      walls: walls,
      shapes: shapes,
      mapUrl: mapUrl,
      mapX: mapX,
      mapY: mapY,
      mapWidth: mapWidth,
      mapHeight: mapHeight,
      fog: fogData,
      activeFloor: activeFloor,
      gridCols: gridCols,
      gridRows: gridRows,
      gridScaleVal: gridScaleVal,
      gridScaleUnit: gridScaleUnit,
      gridType: gridType,
      distanceMode: scene.distanceMode || BOARD.distanceMode || 'square',
      lightingType: lightingType
    });
  }
}

function syncBoardToPlayers() {
  if (myRole !== 'mestre') return;
  PLAYERS_SCENE_ID = ACTIVE_SCENE_ID;
  localStorage.setItem('vtt_players_scene_id', PLAYERS_SCENE_ID);
  
  const filtered = BOARD.tokens.filter(t => (t.layer || 'players') !== 'gm');
  const fogData = (BOARD.fogManual && BOARD.fogVisible) ? Array.from(BOARD.fogVisible) : null;
  broadcast({
    type: 'board-full',
    tokens: filtered,
    walls: BOARD.walls,
    shapes: BOARD.shapes,
    mapUrl: BOARD.mapDataUrl || null,
    mapX: BOARD.mapX || 0,
    mapY: BOARD.mapY || 0,
    mapWidth: BOARD.mapWidth || null,
    mapHeight: BOARD.mapHeight || null,
    fog: fogData,
    activeFloor: BOARD.activeFloor || 0,
    gridCols: BOARD.gridCols,
    gridRows: BOARD.gridRows,
    gridScaleVal: BOARD.gridScaleVal,
    gridScaleUnit: BOARD.gridScaleUnit,
    gridType: BOARD.gridType,
    distanceMode: BOARD.distanceMode,
    lightingType: BOARD.lightingType,
    projection: BOARD.projection || '2d'
  }, null);
  const notify = { type: 'combat-sync-notify', text: 'Mestre sincronizou o tabuleiro.' };
  broadcast(notify, null); addMsg(notify);
  
  broadcastScenesUpdate();
  renderScenesPanel();
  
  toast('📡 Tabuleiro sincronizado!');
}

function puxarJogadores(sceneId) {
  if (myRole !== 'mestre' && !amIHost) return;
  
  const oldSceneId = PLAYERS_SCENE_ID;
  
  // Migrar tokens controlados por jogadores da cena antiga para a nova
  if (oldSceneId && oldSceneId !== sceneId) {
    // 1. Extrair tokens de jogadores da cena antiga
    let playerTokens = [];
    if (oldSceneId === ACTIVE_SCENE_ID) {
      // Cena antiga é a ativa no BOARD
      playerTokens = BOARD.tokens.filter(t => t.controlledBy);
      BOARD.tokens = BOARD.tokens.filter(t => !t.controlledBy);
      boardSave();
    } else {
      // Cena antiga está salva no array SCENES
      const oldScene = SCENES.find(s => s.id === oldSceneId);
      if (oldScene && oldScene.tokens) {
        playerTokens = oldScene.tokens.filter(t => t.controlledBy);
        oldScene.tokens = oldScene.tokens.filter(t => !t.controlledBy);
      }
    }
    
    // 2. Inserir tokens de jogadores na cena destino
    if (playerTokens.length > 0) {
      if (sceneId === ACTIVE_SCENE_ID) {
        // Cena destino é a ativa no BOARD
        playerTokens.forEach(t => {
          t.z = (BOARD.activeFloor || 0) * 10;
          BOARD.tokens.push(t);
        });
        boardSave();
        boardRender();
      } else {
        // Cena destino está salva no array SCENES
        const targetScene = SCENES.find(s => s.id === sceneId);
        if (targetScene) {
          if (!targetScene.tokens) targetScene.tokens = [];
          playerTokens.forEach(t => {
            t.z = (targetScene.activeFloor || 0) * 10;
            targetScene.tokens.push(t);
          });
        }
      }
      saveScenesLocally();
    }
  }
  
  PLAYERS_SCENE_ID = sceneId;
  localStorage.setItem('vtt_players_scene_id', PLAYERS_SCENE_ID);
  
  syncBoardToPlayersOfScene(sceneId);
  toast("Jogadores puxados para a cena!");
}

function syncBoardToPlayersOfScene(sceneId) {
  if (myRole !== 'mestre') return;
  
  const scene = SCENES.find(s => s.id === sceneId);
  if (!scene) return;
  
  let tokens = scene.tokens || [];
  let walls = scene.walls || [];
  let shapes = scene.shapes || [];
  let mapUrl = scene.mapDataUrl || null;
  let mapX = scene.mapX || 0;
  let mapY = scene.mapY || 0;
  let mapWidth = scene.mapWidth || null;
  let mapHeight = scene.mapHeight || null;
  let fogData = (scene.fogManual && scene.fogVisible) ? Array.from(scene.fogVisible) : null;
  let activeFloor = scene.activeFloor || 0;
  let gridCols = scene.gridCols;
  let gridRows = scene.gridRows;
  let gridScaleVal = scene.gridScaleVal;
  let gridScaleUnit = scene.gridScaleUnit;
  let gridType = scene.gridType;
  let lightingType = scene.lightingType;

  if (sceneId === ACTIVE_SCENE_ID) {
    const filtered = BOARD.tokens.filter(t => (t.layer || 'players') !== 'gm');
    fogData = (BOARD.fogManual && BOARD.fogVisible) ? Array.from(BOARD.fogVisible) : null;
    broadcast({
      type: 'board-full',
      tokens: filtered,
      walls: BOARD.walls,
      shapes: BOARD.shapes,
      mapUrl: BOARD.mapDataUrl || null,
      mapX: BOARD.mapX || 0,
      mapY: BOARD.mapY || 0,
      mapWidth: BOARD.mapWidth || null,
      mapHeight: BOARD.mapHeight || null,
      fog: fogData,
      activeFloor: BOARD.activeFloor || 0,
      gridCols: BOARD.gridCols,
      gridRows: BOARD.gridRows,
      gridScaleVal: BOARD.gridScaleVal,
      gridScaleUnit: BOARD.gridScaleUnit,
      gridType: BOARD.gridType,
      distanceMode: BOARD.distanceMode,
      lightingType: BOARD.lightingType
    }, null);
  } else {
    const filtered = tokens.filter(t => (t.layer || 'players') !== 'gm');
    broadcast({
      type: 'board-full',
      tokens: filtered,
      walls: walls,
      shapes: shapes,
      mapUrl: mapUrl,
      mapX: mapX,
      mapY: mapY,
      mapWidth: mapWidth,
      mapHeight: mapHeight,
      fog: fogData,
      activeFloor: activeFloor,
      gridCols: gridCols,
      gridRows: gridRows,
      gridScaleVal: gridScaleVal,
      gridScaleUnit: gridScaleUnit,
      gridType: gridType,
      distanceMode: scene.distanceMode || BOARD.distanceMode || 'square',
      lightingType: lightingType
    }, null);
  }
  
  const notify = { type: 'combat-sync-notify', text: 'Mestre sincronizou o tabuleiro.' };
  broadcast(notify, null); addMsg(notify);
  
  broadcastScenesUpdate();
  renderScenesPanel();
}

function receberBoardSync(data) {
  if (data.tokens) BOARD.tokens = data.tokens.map(t => ({ ...t, conditions: t.conditions || [], hideName: t.hideName || false }));
  if (data.walls) { BOARD.walls = data.walls; }
  else if (!data.walls) { /* manter as existentes se não vier no payload */ }
  if (data.shapes) BOARD.shapes = data.shapes;

  BOARD.mapX = data.mapX !== undefined ? data.mapX : 0;
  BOARD.mapY = data.mapY !== undefined ? data.mapY : 0;
  BOARD.mapWidth = data.mapWidth !== undefined ? data.mapWidth : null;
  BOARD.mapHeight = data.mapHeight !== undefined ? data.mapHeight : null;

  if (data.mapUrl) {
    BOARD.mapDataUrl = data.mapUrl;
    if (BOARD.mapImg && BOARD.mapImg.src === data.mapUrl) {
      boardRender();
    } else {
      const img = new Image();
      img.onload = () => {
        BOARD.mapImg = img;
        if (isGifUrl(img.src)) getGifCanvas(img.src, img.naturalWidth, img.naturalHeight);
        boardRender();
      };
      img.src = data.mapUrl;
    }
  } else if (data.mapUrl === null) {
    BOARD.mapImg = null;
    BOARD.mapDataUrl = null;
  }
  if (data.fog) BOARD.fogVisible = new Set(data.fog);
  else if (data.fog === null) BOARD.fogVisible = null;
  if (data.activeFloor !== undefined) BOARD.activeFloor = data.activeFloor;
  if (data.gridCols !== undefined) BOARD.gridCols = data.gridCols;
  if (data.gridRows !== undefined) BOARD.gridRows = data.gridRows;
  if (data.gridScaleVal !== undefined) BOARD.gridScaleVal = data.gridScaleVal;
  if (data.gridScaleUnit !== undefined) BOARD.gridScaleUnit = data.gridScaleUnit;
  if (data.gridType !== undefined) BOARD.gridType = data.gridType;
  if (data.lightingType !== undefined) { BOARD.lightingType = data.lightingType; _syncWeatherSelect(); _applyWeatherParticles(); }
  if (data.distanceMode !== undefined) BOARD.distanceMode = data.distanceMode;
  if (data.projection !== undefined) {
    BOARD.projection = data.projection;
    const isoBtn = document.getElementById('btnToggleProjection');
    if (isoBtn) {
      isoBtn.textContent = BOARD.projection === 'iso' ? '🔷 2.5D' : '🔲 2D';
      isoBtn.classList.toggle('active', BOARD.projection === 'iso');
    }
  }
  setTimeout(atualizarFogJogador, 50);
  boardRender();
  setTimeout(applyPlayerConditionEffects, 80);
}

// ── Botão do combate "→ Tabuleiro" ──
// Adicionar botão na barra de combate para enviar tokens
function initBoardCombatButton() {
  const bar = document.querySelector('.combat-round-bar .combat-nav');
  if (!bar) return;
  const btn = document.createElement('button');
  btn.className = 'btn btn-sm';
  btn.title = 'Criar tokens no tabuleiro a partir dos combatentes';
  btn.textContent = '🗺';
  btn.onclick = tokenDosCombatentes;
  bar.appendChild(btn);
}

// ── Ocultar toolbar para jogadores ──
function boardSetupRole() {
  const isMaster = (myRole === 'mestre');

  // Toda a toolbar fica visível para todos (jogadores podem usar formas/reguas)
  const tbSection = document.getElementById('board-toolbar-section');
  if (tbSection) tbSection.style.display = 'flex';

  // Ferramentas exclusivas do mestre
  const masterOnlyTools = ['toolWall', 'btnLimparParedes', 'toolFog', 'toolReveal'];
  masterOnlyTools.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isMaster ? '' : 'none';
  });

  // Clima exclusivo do mestre
  const weatherRow = document.querySelector('.tool-row-weather');
  if (weatherRow) weatherRow.style.display = isMaster ? '' : 'none';

  // Ações exclusivas do mestre
  const actionsGroup = document.getElementById('actionsGroup');
  if (actionsGroup) actionsGroup.style.display = isMaster ? '' : 'none';

  // Camadas exclusivas do mestre
  ['layerSep', 'layerLabel', 'layerPlayers', 'layerMap', 'layerGm', 'layerGroup'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = isMaster ? '' : 'none';
  });

  // Andares exclusivos do mestre
  const floorGroup = document.getElementById('floorGroup');
  if (floorGroup) floorGroup.style.display = isMaster ? '' : 'none';

  // Grade exclusiva do mestre
  const gridGroup = document.getElementById('toolGroupGrid');
  if (gridGroup) gridGroup.style.display = isMaster ? '' : 'none';
}

function setBoardLayer(layer) {
  if (myRole !== 'mestre') return;
  BOARD.activeLayer = layer;
  ['layerPlayers', 'layerMap', 'layerGm'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.remove('active');
  });
  const activeBtnId = layer === 'players' ? 'layerPlayers' : (layer === 'map' ? 'layerMap' : 'layerGm');
  const activeBtn = document.getElementById(activeBtnId);
  if (activeBtn) activeBtn.classList.add('active');

  // Refresh the board
  boardRender();
  toast(`Camada ativa: ${layer === 'players' ? 'Jogadores' : (layer === 'map' ? 'Mapa' : 'GM (Oculto)')}`);
}


// ── Init ──
function entrarSala() {
  const name = document.getElementById('player-name').value.trim();
  let code = document.getElementById('room-code').value.trim();
  if (!name) { setLobbyStatus('join', 'Como você se chama?', true); return; }
  const match = code.match(/[?&]sala=([A-Z0-9]{8})/);
  if (match) code = match[1];
  code = code.replace(/[^A-Z0-9]/gi, '').toUpperCase().slice(0, 8);
  if (code.length !== 8) { setLobbyStatus('join', 'Código inválido.', true); return; }
  myName = name; myRole = 'jogador'; roomId = code;
  setLobbyStatus('join', 'Buscando a mesa...');
  peer = new Peer(undefined, { debug: 0 });
  peer.on('open', (id) => {
    myPeerId = id;
    masterConn = peer.connect('vtt-room-' + roomId, { reliable: true, metadata: { name } });
    masterConn.on('open', () => {
      masterConn.send({ type: 'join', name });
      masterConn.on('data', (data) => {
        if (data.type === 'room-info') {
          roomTitle = data.roomTitle; players = data.players;
          if (players[myPeerId]) myRole = players[myPeerId].role;
          entrarNoAmbiente(); renderPlayers();
          addMsg({ type: 'system', text: 'Você entrou em "' + roomTitle + '"' });
        } else if (data.type === 'player-joined') addMsg({ type: 'system', text: data.name + ' entrou na mesa' });
        else if (data.type === 'players-update') {
          players = data.players;
          if (players[myPeerId] && players[myPeerId].role !== myRole) {
            myRole = players[myPeerId].role;
            aplicarRoleVisual();
          }
          renderPlayers();
        }
        else if (data.type === 'scenes-update') {
          SCENES = data.scenes;
          ACTIVE_SCENE_ID = data.activeSceneId;
          renderScenesPanel();
        }
        else if (data.type === 'chat' || data.type === 'roll' || data.type === 'gif' || data.type === 'damage' || data.type === 'spell') addMsg(data);
        else if (data.type === 'combat-sync') receberSyncCombate(data.state);
        else if (data.type === 'combat-sync-notify') addMsg(data);
        // BOARD
        else if (data.type === 'board-tokens') { BOARD.tokens = data.tokens.map(t => ({ ...t, conditions: t.conditions || [], hideName: t.hideName || false })); setTimeout(atualizarFogJogador, 50); boardRender(); setTimeout(applyPlayerConditionEffects, 80); setTimeout(() => { const meuToken = BOARD.tokens.find(tk => tk.controlledBy === myPeerId); if (meuToken) _syncCondToLinkedSheet(meuToken); }, 100); }
        else if (data.type === 'board-walls') { BOARD.walls = data.walls; setTimeout(atualizarFogJogador, 50); boardRender(); }
        else if (data.type === 'board-shapes') { BOARD.shapes = data.shapes; boardRender(); }
        else if (data.type === 'board-ping') {
          if (!BOARD.pings) BOARD.pings = [];
          BOARD.pings.push({ x: data.x, y: data.y, time: data.time, color: data.color || '#ff3333' });
          boardRender();
          if (!BOARD.pingAnimId) {
            BOARD.pingAnimId = requestAnimationFrame(pingAnimationTick);
          }
        }
        else if (data.type === 'player-targets') { BOARD.playerTargets[data.peerId] = data.targets; boardRender(); }
        else if (data.type === 'board-fog') { BOARD.fogVisible = data.fog ? new Set(data.fog) : null; boardRender(); }
        else if (data.type === 'board-map') {
          BOARD.mapX = data.mapX !== undefined ? data.mapX : 0;
          BOARD.mapY = data.mapY !== undefined ? data.mapY : 0;
          BOARD.mapWidth = data.mapWidth !== undefined ? data.mapWidth : null;
          BOARD.mapHeight = data.mapHeight !== undefined ? data.mapHeight : null;
          if (data.mapUrl) {
            BOARD.mapDataUrl = data.mapUrl;
            if (BOARD.mapImg && BOARD.mapImg.src === data.mapUrl) {
              boardRender();
            } else {
              const img = new Image();
              img.onload = () => {
                BOARD.mapImg = img;
                if (isGifUrl(img.src)) getGifCanvas(img.src, img.naturalWidth, img.naturalHeight);
                boardRender();
              };
              img.src = data.mapUrl;
            }
          } else {
            BOARD.mapImg = null;
            BOARD.mapDataUrl = null;
            boardRender();
          }
        }
        else if (data.type === 'board-floor') {
          BOARD.activeFloor = data.activeFloor;
          setTimeout(atualizarFogJogador, 50);
          boardRender();
        }
        else if (data.type === 'trigger-prompt') {
          const t = BOARD.tokens.find(tk => tk.id === data.tokenId);
          const s = BOARD.shapes.find(sk => sk.id === data.shapeId);
          if (t && s) abrirModalEscolhaGatilho(t, s);
        }
        else if (data.type === 'board-grid-settings') {
          if (data.gridCols !== undefined) BOARD.gridCols = data.gridCols;
          if (data.gridRows !== undefined) BOARD.gridRows = data.gridRows;
          if (data.gridScaleVal !== undefined) BOARD.gridScaleVal = data.gridScaleVal;
          if (data.gridScaleUnit !== undefined) BOARD.gridScaleUnit = data.gridScaleUnit;
          if (data.gridType !== undefined) BOARD.gridType = data.gridType;
          if (data.lightingType !== undefined) { BOARD.lightingType = data.lightingType; _syncWeatherSelect(); _applyWeatherParticles(); }
          boardRender();
        }
        else if (data.type === 'board-full') receberBoardSync(data);
        // ÁUDIO
        else if (data.type === 'play-ambient') {
          if (data.url) { stopAmbient(); playAmbient(data.url); }
        }
        else if (data.type === 'stop-ambient') { stopAmbient(); }
        else if (data.type === 'play-sfx') {
          if (data.url) playSfx(data.url);
        }
        // FICHA
        else if (data.type === 'ficha-resumo-request') {
          // Reenvia o último resumo conhecido direto (não depende do iframe estar carregado)
          if (myRole === 'jogador' && localFichaUpdateData) {
            const resumo = localFichaUpdateData;
            fichasJogadores[myPeerId] = { playerName: myName, resumo: resumo, ts: Date.now() };
            if (amIHost) {
              receberResumoFicha({ peerId: myPeerId, playerName: myName, resumo: resumo });
            } else if (masterConn) {
              try { masterConn.send({ type: 'ficha-resumo', peerId: myPeerId, playerName: myName, resumo: resumo }); } catch (err) { }
            }
          }
          document.getElementById('ficha-iframe')?.contentWindow?.postMessage({ type: 'vtt-request-resume' }, '*');
        }
        else if (data.type === 'vtt-notify') {
          if (data.text) toast(data.text);
        }
        // PERGAMINHOS
        else if (data.type === 'pergaminhos') {
          receberPergaminhos(data.notas);
        }
      });
      masterConn.on('close', () => addMsg({ type: 'system', text: 'Conexão com o Mestre perdida.' }));
    });
    masterConn.on('error', () => setLobbyStatus('join', 'Não foi possível conectar.', true));
  });
  peer.on('error', (e) => setLobbyStatus('join', 'Erro: ' + (e.type || e.message), true));
}


// ──── Estado das Macros ────
let vttMacros = [];
let macroPage = 0;

function carregarMacros() {
  const raw = localStorage.getItem('t20_vtt_macros');
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      vttMacros = Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      vttMacros = [];
    }
  } else {
    vttMacros = [];
  }
  while (vttMacros.length < 10) vttMacros.push(null);
  macroPage = 0;
  renderizarMacros();
}

function salvarMacros() {
  // Trim trailing nulls to keep storage lean
  let trimmed = [...vttMacros];
  while (trimmed.length > 10 && trimmed[trimmed.length - 1] === null) trimmed.pop();
  localStorage.setItem('t20_vtt_macros', JSON.stringify(trimmed));
  renderizarMacros();
}

function macroPagePrev() {
  if (macroPage > 0) { macroPage--; renderizarMacros(); }
}

function macroPageNext() {
  const totalPages = Math.max(1, Math.ceil(vttMacros.length / 10));
  if (macroPage < totalPages - 1) { macroPage++; renderizarMacros(); }
}

function macroAddSlot() {
  vttMacros.push(null);
  // Navigate to the page containing the new slot
  macroPage = Math.floor((vttMacros.length - 1) / 10);
  renderizarMacros();
  abrirConfigMacros(vttMacros.length - 1);
}

function renderizarMacros() {
  const btnList = document.getElementById('macro-buttons-list');
  if (!btnList) return;

  const totalPages = Math.max(1, Math.ceil(vttMacros.length / 10));
  if (macroPage >= totalPages) macroPage = totalPages - 1;

  // Update nav state
  const prevBtn = document.getElementById('macro-prev');
  const nextBtn = document.getElementById('macro-next');
  const pageInd = document.getElementById('macro-page-indicator');
  if (prevBtn) prevBtn.style.opacity = macroPage > 0 ? '1' : '0.3';
  if (nextBtn) nextBtn.style.opacity = macroPage < totalPages - 1 ? '1' : '0.3';
  if (pageInd) pageInd.textContent = (macroPage + 1) + '/' + totalPages;

  btnList.innerHTML = '';
  const start = macroPage * 10;
  const end = Math.min(start + 10, vttMacros.length);
  for (let i = start; i < end; i++) {
    const m = vttMacros[i];
    const btn = document.createElement('button');
    btn.className = 'macro-btn';
    
    btn.style.width = '42px';
    btn.style.height = '42px';
    btn.style.display = 'flex';
    btn.style.flexDirection = 'column';
    btn.style.alignItems = 'center';
    btn.style.justifyContent = 'center';
    btn.style.padding = '0';
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';

    // Slot number (actual index + 1, but last of page shows 0 for page 0)
    const slotNum = (i + 1).toString();
    const numEl = document.createElement('span');
    numEl.textContent = slotNum;
    numEl.style.position = 'absolute';
    numEl.style.top = '2px';
    numEl.style.left = '4px';
    numEl.style.fontSize = '0.65rem';
    numEl.style.opacity = '0.6';
    numEl.style.fontWeight = 'bold';
    btn.appendChild(numEl);

    if (m && m.name && m.command) {
      btn.title = `${m.name}\n${m.command}\n(Botão direito para editar)`;
      btn.onclick = () => executarMacro(m.command);
      btn.oncontextmenu = (e) => {
        e.preventDefault();
        abrirConfigMacros(i);
      };
      
      const icon = document.createElement('i');
      icon.className = 'bi bi-play-fill';
      icon.style.fontSize = '1.2rem';
      
      const label = document.createElement('span');
      label.textContent = m.name.substring(0, 5);
      label.style.fontSize = '0.55rem';
      label.style.marginTop = '-2px';
      
      btn.appendChild(icon);
      btn.appendChild(label);
    } else {
      btn.title = 'Slot Vazio (Clique para adicionar macro)';
      btn.style.background = 'rgba(0,0,0,0.1)';
      btn.style.borderStyle = 'dashed';
      btn.onclick = () => abrirConfigMacros(i);
    }
    btnList.appendChild(btn);
  }
}

function executarMacro(cmd) {
  if (myRole === 'expectador') { toast('Expectadores não podem executar macros.'); return; }
  if (myRole === 'cego') return;
  const text = cmd.trim(); if (!text) return;
  
  let rollerName = myName;
  if (typeof BOARD !== 'undefined' && BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
    const tokenId = BOARD.selectedTokens.values().next().value;
    const token = BOARD.tokens.find(t => t.id === tokenId);
    if (token && token.name) {
      rollerName = token.name;
    }
  }

  let msgData;
  if (text.toLowerCase().startsWith('/r ')) {
    const res = processarRolagem(text, chatVisibility !== 'global');
    if (res) msgData = { type: 'roll', name: rollerName, role: myRole, text: res, time: formatTime(), visibility: chatVisibility };
    else {
      if (chatVisibility !== 'blind') addMsg({ type: 'system', text: 'Sintaxe: /r 2d6 ou /r d20+3' });
      return;
    }
  } else {
    msgData = { type: 'chat', name: rollerName, role: myRole, text, time: formatTime(), visibility: chatVisibility };
  }
  rotearMensagem(msgData);
  if (msgData.type === 'roll') detectarERolarIniciativa(msgData.text);
}

function abrirConfigMacros(index) {
  const modal = document.getElementById('macroConfigModal');
  const nameInp = document.getElementById('macro-new-name');
  const cmdInp = document.getElementById('macro-new-command');
  const idxInp = document.getElementById('macro-edit-index');
  const title = document.getElementById('macro-modal-title');
  const delBtn = document.getElementById('macro-delete-btn');

  if (modal) {
    title.textContent = `Configurar Macro (#${index + 1})`;
    idxInp.value = index;
    
    const m = vttMacros[index];
    if (m && m.name && m.command) {
      nameInp.value = m.name;
      cmdInp.value = m.command;
      if (delBtn) delBtn.style.display = 'block';
    } else {
      nameInp.value = '';
      cmdInp.value = '';
      if (delBtn) delBtn.style.display = 'none';
    }
    
    modal.classList.add('open');
  }
}

function fecharConfigMacros() {
  const modal = document.getElementById('macroConfigModal');
  if (modal) modal.classList.remove('open');
}

function salvarEdicaoMacro() {
  const nameInp = document.getElementById('macro-new-name');
  const cmdInp = document.getElementById('macro-new-command');
  const idxInp = document.getElementById('macro-edit-index');
  
  if (!nameInp || !cmdInp || !idxInp) return;

  const name = nameInp.value.trim();
  const command = cmdInp.value.trim();
  const index = parseInt(idxInp.value);

  if (!name) { alert('Digite um nome para a macro.'); return; }
  if (!command) { alert('Digite um comando ou mensagem para a macro.'); return; }

  vttMacros[index] = { name, command };
  salvarMacros();
  fecharConfigMacros();
  mostrarToast('Macro salva com sucesso!', 'sucesso');
}

function limparMacroSlot() {
  const idxInp = document.getElementById('macro-edit-index');
  if (!idxInp) return;
  const index = parseInt(idxInp.value);
  if (confirm('Deseja remover esta macro do slot?')) {
    vttMacros[index] = null;
    salvarMacros();
    fecharConfigMacros();
    mostrarToast('Macro removida!', 'sucesso');
  }
}

// ── Recolher/Expandir Barra de Macros ──
function toggleMacroBar() {
  const content = document.getElementById('macro-collapsible-content');
  const btn = document.getElementById('macro-collapse-toggle');
  if (!content || !btn) return;
  const isCollapsed = content.style.display === 'none';
  content.style.display = isCollapsed ? 'flex' : 'none';
  btn.textContent = isCollapsed ? '❮' : '❯';
  btn.title = isCollapsed ? 'Recolher barra de macros' : 'Expandir barra de macros';
  localStorage.setItem('t20_macro_bar_collapsed', isCollapsed ? '0' : '1');
}

function _initMacroBarCollapse() {
  const content = document.getElementById('macro-collapsible-content');
  const btn = document.getElementById('macro-collapse-toggle');
  if (!content || !btn) return;
  const collapsed = localStorage.getItem('t20_macro_bar_collapsed') === '1';
  if (collapsed) {
    content.style.display = 'none';
    btn.textContent = '❯';
    btn.title = 'Expandir barra de macros';
  }
}


// ── Visão do Jogador (mestre) ──

function mostrarBarraVisaoJogador() {
  const bar = document.getElementById('playerViewBar');
  const nameEl = document.getElementById('playerViewName');
  if (bar) bar.style.display = 'flex';
  if (nameEl) nameEl.textContent = BOARD.playerViewTokenName;
}

function esconderBarraVisaoJogador() {
  const bar = document.getElementById('playerViewBar');
  if (bar) bar.style.display = 'none';
}

function toggleLocalRole() {
  if (!amIHost) {
    toast('Apenas o Mestre criador da sala pode alternar entre Mestre e Jogador.');
    return;
  }
  myRole = (myRole === 'mestre') ? 'jogador' : 'mestre';
  if (players[myPeerId]) players[myPeerId].role = myRole;
  broadcast({ type: 'players-update', players }, null);
  renderPlayers();
  aplicarRoleVisual();
  toast(`Visualização alterada para: ${myRole === 'mestre' ? 'Mestre' : 'Jogador'}`);
}

function togglePanelColapsavel(panel, btnFloatingId, storageKey) {
  const btnFloating = document.getElementById(btnFloatingId);
  if (!panel) return;
  const isMobile = window.innerWidth <= 900;
  panel.classList.toggle('collapsed');
  const isCollapsed = panel.classList.contains('collapsed');
  if (!isMobile) {
    localStorage.setItem(storageKey, isCollapsed ? '1' : '0');
  }
  if (btnFloating) {
    btnFloating.style.display = isCollapsed ? 'flex' : 'none';
    // No mobile, mantém o botão visível para fechar o painel
    if (isMobile) btnFloating.style.display = 'flex';
  }
  if (!isMobile) {
    setTimeout(() => {
      if (typeof boardResize === 'function') boardResize();
    }, 260);
  }
}

function toggleSidebar() {
  togglePanelColapsavel(document.getElementById('sidebar'), 'btn-sidebar-expand-floating', 'vtt_sidebar_collapsed');
}

function toggleMasterPanel() {
  togglePanelColapsavel(document.getElementById('master-panel'), 'btn-master-expand-floating', 'vtt_master_collapsed');
}

function toggleChatPanel() {
  togglePanelColapsavel(document.querySelector('.chat-panel'), 'btn-chat-expand-floating', 'vtt_chat_collapsed');
}

// ── Fechar painéis colapsáveis deslizando (swipe) no celular ──
// direction: 'left'  -> painel fecha deslizando para a esquerda (ex: sidebar)
// direction: 'right' -> painel fecha deslizando para a direita (ex: master-panel, chat-panel)
function _initSwipeToClose(panel, direction, closeFn) {
  if (!panel) return;
  const THRESHOLD = 65; // px mínimos de arraste para considerar "fechar"
  let startX = 0, startY = 0, lastX = 0, dragging = false, horizontalLock = false;

  const isMobile = () => window.innerWidth <= 900;

  panel.addEventListener('touchstart', (e) => {
    if (!isMobile() || panel.classList.contains('collapsed')) return;
    if (e.touches.length !== 1) return;
    startX = lastX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    dragging = true;
    horizontalLock = false;
    panel.style.transition = 'none';
  }, { passive: true });

  panel.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (!horizontalLock) {
      // Só assume o gesto como swipe horizontal se o movimento for
      // claramente mais horizontal que vertical (evita atrapalhar scroll interno do painel).
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) return;
      if (Math.abs(deltaY) > Math.abs(deltaX)) { dragging = false; panel.style.transition = ''; return; }
      horizontalLock = true;
    }

    const closing = direction === 'left' ? deltaX < 0 : deltaX > 0;
    lastX = touch.clientX;
    // Segue o dedo ao fechar; resistência leve se arrastar no sentido de abrir.
    panel.style.transform = `translateX(${closing ? deltaX : deltaX * 0.15}px)`;
  }, { passive: true });

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    const deltaX = lastX - startX;
    const closing = direction === 'left' ? deltaX < -THRESHOLD : deltaX > THRESHOLD;

    if (closing && horizontalLock) {
      const finalTransform = direction === 'left' ? 'translateX(-100%)' : 'translateX(100%)';
      panel.style.transition = 'transform 0.2s ease';
      panel.style.transform = finalTransform;
      setTimeout(() => {
        closeFn();
        panel.style.transform = '';
        panel.style.transition = '';
      }, 200);
    } else {
      panel.style.transition = 'transform 0.2s ease';
      panel.style.transform = '';
      setTimeout(() => { panel.style.transition = ''; }, 200);
    }
  };

  panel.addEventListener('touchend', endDrag);
  panel.addEventListener('touchcancel', endDrag);
}

function _initSwipeToCloseAllPanels() {
  _initSwipeToClose(document.getElementById('sidebar'), 'left', toggleSidebar);
  _initSwipeToClose(document.getElementById('master-panel'), 'right', toggleMasterPanel);
  _initSwipeToClose(document.querySelector('.chat-panel'), 'right', toggleChatPanel);
  _initSwipeToCloseFichaPanel();
}

// ── Fechar a Ficha do Personagem deslizando (swipe) no celular ──
// A ficha-panel ocupa a tela toda no lugar do mapa e o conteúdo é um <iframe>.
// Duas fontes acionam o mesmo gesto:
//   1) Toque no cabeçalho (título/botões), capturado aqui direto.
//   2) Toque dentro do próprio conteúdo da ficha, que roda em outro documento
//      e nos avisa via postMessage ('ficha-swipe-move' / 'ficha-swipe-end').
var _fichaSwipeDragging = false;
var FICHA_SWIPE_THRESHOLD = 65;

function _fichaPanelSwipeMove(deltaX) {
  const panel = document.getElementById('ficha-panel');
  if (!panel || !panel.classList.contains('active')) return;
  if (!_fichaSwipeDragging) {
    panel.style.transition = 'none';
    _fichaSwipeDragging = true;
  }
  panel.style.transform = `translateX(${deltaX}px)`;
}

function _fichaPanelSwipeEnd(deltaX) {
  const panel = document.getElementById('ficha-panel');
  _fichaSwipeDragging = false;
  if (!panel || !panel.classList.contains('active')) return;
  const closing = Math.abs(deltaX) > FICHA_SWIPE_THRESHOLD;

  if (closing) {
    const finalTransform = deltaX < 0 ? 'translateX(-100%)' : 'translateX(100%)';
    panel.style.transition = 'transform 0.2s ease';
    panel.style.transform = finalTransform;
    setTimeout(() => {
      toggleFichaPanel();
      panel.style.transform = '';
      panel.style.transition = '';
    }, 200);
  } else {
    panel.style.transition = 'transform 0.2s ease';
    panel.style.transform = '';
    setTimeout(() => { panel.style.transition = ''; }, 200);
  }
}

function _initSwipeToCloseFichaPanel() {
  const panel = document.getElementById('ficha-panel');
  const header = panel ? panel.querySelector('.ficha-panel-header') : null;
  if (!panel || !header) return;

  let startX = 0, startY = 0, lastX = 0, dragging = false, horizontalLock = false;
  const isMobile = () => window.innerWidth <= 900;

  header.addEventListener('touchstart', (e) => {
    if (!isMobile() || !panel.classList.contains('active')) return;
    if (e.touches.length !== 1) return;
    startX = lastX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
    dragging = true;
    horizontalLock = false;
  }, { passive: true });

  header.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    const deltaX = touch.clientX - startX;
    const deltaY = touch.clientY - startY;

    if (!horizontalLock) {
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) return;
      if (Math.abs(deltaY) > Math.abs(deltaX)) { dragging = false; return; }
      horizontalLock = true;
    }

    lastX = touch.clientX;
    _fichaPanelSwipeMove(deltaX);
  }, { passive: true });

  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    if (!horizontalLock) return;
    _fichaPanelSwipeEnd(lastX - startX);
  };

  header.addEventListener('touchend', endDrag);
  header.addEventListener('touchcancel', endDrag);
}

// ── Painel colapsável de Aventureiros ──
function togglePlayersPanel() {
  const list = document.getElementById('playersTopList');
  const arrow = document.getElementById('playersTopArrow');
  if (!list) return;
  list.classList.toggle('open');
  if (arrow) arrow.classList.toggle('open');
  localStorage.setItem('vtt_players_panel_open', list.classList.contains('open') ? '1' : '0');
}

// ── Context menu do jogador (apenas host) ──
function abrirPlayerContextMenu(e, pid) {
  e.preventDefault();
  e.stopPropagation();
  const menu = document.getElementById('playerContextMenu');
  if (!menu) return;
  fecharContextMenu();
  const role = players[pid]?.role || 'jogador';
  menu.style.left = e.clientX + 'px';
  menu.style.top = e.clientY + 'px';
  menu.style.display = 'block';
  menu.dataset.pid = pid;
  // Marca a opção atual
  menu.querySelectorAll('.context-menu-item').forEach(el => {
    el.dataset.pid = pid;
    el.classList.toggle('selected', el.textContent.trim().toLowerCase() === role);
  });
  const fechar = (ev) => {
    if (!menu.contains(ev.target)) {
      menu.style.display = 'none';
      document.removeEventListener('click', fechar);
    }
  };
  setTimeout(() => document.addEventListener('click', fechar), 10);
}

function changePlayerRole(pid, role) {
  if (!amIHost) { toast('Apenas o criador da mesa pode alterar funções.'); return; }
  if (!players[pid]) return;
  if (role === players[pid].role) { fecharContextMenu(); return; }
  players[pid].role = role;
  renderPlayers();
  broadcast({ type: 'players-update', players }, null);
  // Se mudou o próprio papel (host alterou a si mesmo)
  if (pid === myPeerId) {
    myRole = role;
    // Atualiza painéis de mestre
    if (role === 'mestre') {
      document.getElementById('invite-area').style.display = 'block';
      document.getElementById('master-panel').style.display = 'flex';
      document.getElementById('btn-convidar').style.display = '';
      document.getElementById('btn-ficha').style.display = 'none';
      initBau();
    } else {
      document.getElementById('invite-area').style.display = 'none';
      document.getElementById('master-panel').style.display = 'none';
      document.getElementById('btn-convidar').style.display = 'none';
      document.getElementById('btn-ficha').style.display = 'inline-flex';
    }
    aplicarRoleVisual();
  }
  fecharContextMenu();
}

function aplicarRoleVisual() {
  const b = document.getElementById('role-badge');
  if (b) {
    const label = myRole === 'mestre' ? 'Mestre' : myRole === 'expectador' ? 'Expectador' : myRole === 'cego' ? 'Cego' : 'Jogador';
    b.textContent = label;
    b.className = 'tag-role tag-' + myRole;
    b.title = amIHost ? 'Clique para alternar entre Mestre e Jogador' : 'Sua função na mesa';
  }
  // Painéis de mestre
  if (myRole === 'mestre') {
    document.getElementById('invite-area').style.display = amIHost ? 'block' : 'none';
    document.getElementById('master-panel').style.display = 'flex';
    document.getElementById('btn-convidar').style.display = amIHost ? '' : 'none';
    document.getElementById('btn-ficha').style.display = 'none';
    const btnExp = document.getElementById('btn-exportar-mesa');
    if (btnExp) btnExp.style.display = '';
    const btnImp = document.getElementById('btn-importar-mesa');
    if (btnImp) btnImp.style.display = '';
    if (amIHost) initBau();
  } else {
    document.getElementById('invite-area').style.display = 'none';
    document.getElementById('master-panel').style.display = 'none';
    document.getElementById('btn-convidar').style.display = 'none';
    const podeAbrirFicha = myRole !== 'expectador' && myRole !== 'cego';
    document.getElementById('btn-ficha').style.display = podeAbrirFicha ? 'inline-flex' : 'none';
    const mobBtn = document.querySelector('.mob-ficha-btn');
    if (mobBtn) mobBtn.style.display = podeAbrirFicha ? '' : 'none';
    const btnExp = document.getElementById('btn-exportar-mesa');
    if (btnExp) btnExp.style.display = 'none';
    const btnImp = document.getElementById('btn-importar-mesa');
    if (btnImp) btnImp.style.display = 'none';
  }
  boardSetupRole();
  aplicarCegoVisual();
  atualizarFogJogador();
  renderScenesPanel();
  boardRender();
}

function aplicarCegoVisual() {
  const isCego = myRole === 'cego';
  const canvas = document.getElementById('boardCanvas');
  const wrap = document.getElementById('boardCanvasWrap');
  if (isCego) {
    if (canvas) canvas.style.display = 'none';
    if (wrap) wrap.style.display = 'none';
    // Bloqueia chat
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.querySelector('.send-btn');
    if (chatInput) { chatInput.disabled = true; chatInput.placeholder = 'Você está cego...'; }
    if (sendBtn) sendBtn.disabled = true;
    document.getElementById('chat-messages')?.classList.add('hidden');
  } else {
    if (canvas) canvas.style.display = '';
    if (wrap) wrap.style.display = '';
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.querySelector('.send-btn');
    if (chatInput) { chatInput.disabled = myRole === 'expectador'; chatInput.placeholder = myRole === 'expectador' ? 'Apenas observando...' : 'Digite sua mensagem...'; }
    if (sendBtn) sendBtn.disabled = myRole === 'expectador';
    document.getElementById('chat-messages')?.classList.remove('hidden');
  }
}

// Auto-preencher código da URL + inicializações

(function () {
  const params = new URLSearchParams(window.location.search);
  const sala = params.get('sala');
  if (sala) {
    // Link de convite: oculta a opção de abrir uma nova mesa (entrar como mestre)
    const createPanel = document.getElementById('panel-create');
    if (createPanel) createPanel.style.display = 'none';
    const divider = document.getElementById('lobby-divider');
    if (divider) divider.style.display = 'none';
    document.getElementById('room-code').value = sala;
    document.getElementById('player-name').focus();
    // Mostrar toast após curto delay
    setTimeout(() => toast('Código preenchido! Digite seu nome e entre.', 3500), 500);
  }
  // Inicializa as macros
  carregarMacros();
  _initMacroBarCollapse();
  // Inicializa o editor de imagens
  initImageEditor();
  // Inicializa o fechamento por swipe dos painéis colapsáveis (mobile)
  _initSwipeToCloseAllPanels();

  // Inicialização do estado recolhido dos painéis (só em desktop)
  if (window.innerWidth > 900) {
    if (localStorage.getItem('vtt_sidebar_collapsed') === '1') {
      const sidebar = document.getElementById('sidebar');
      if (sidebar) sidebar.classList.add('collapsed');
      const btn = document.getElementById('btn-sidebar-expand-floating');
      if (btn) btn.style.display = 'flex';
    }
    if (localStorage.getItem('vtt_master_collapsed') === '1') {
      const panel = document.getElementById('master-panel');
      if (panel) panel.classList.add('collapsed');
      const btn = document.getElementById('btn-master-expand-floating');
      if (btn) btn.style.display = 'flex';
    }
    if (localStorage.getItem('vtt_chat_collapsed') === '1') {
      const panel = document.querySelector('.chat-panel');
      if (panel) panel.classList.add('collapsed');
      const btn = document.getElementById('btn-chat-expand-floating');
      if (btn) btn.style.display = 'flex';
    }
  }
  if (localStorage.getItem('vtt_players_panel_open') === '1') {
    const list = document.getElementById('playersTopList');
    const arrow = document.getElementById('playersTopArrow');
    if (list) list.classList.add('open');
    if (arrow) arrow.classList.add('open');
  }
  setTimeout(() => {
    if (typeof boardResize === 'function') boardResize();
  }, 500);
  // Atalhos globais
  let tokenClipboard = null;

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (BOARD.playerViewTokenId || BOARD.selectedTokens.size > 0) {
        BOARD.selectedTokens.clear();
        exitPlayerView();
        boardRender();
        return;
      }
      if (BOARD.wayRulerActive || BOARD.wayRulerPoints.length > 0) {
        BOARD.wayRulerActive = false;
        BOARD.wayRulerPoints = [];
        boardRender();
        return;
      }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) redoBoard(); else undoBoard();
      return;
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
      e.preventDefault();
      redoBoard();
      return;
    }
    // Ctrl+C: copiar token/objeto selecionado (só mestre)
    if ((e.ctrlKey || e.metaKey) && e.key === 'c' && (myRole === 'mestre')) {
      if (BOARD.selectedTokens.size > 0) {
        e.preventDefault();
        const srcId = BOARD.selectedTokens.values().next().value;
        const src = BOARD.tokens.find(t => t.id === srcId);
        if (src) {
          tokenClipboard = JSON.parse(JSON.stringify(src));
          delete tokenClipboard.id;
          tokenClipboard.name = (src.name || 'Token') + ' (cópia)';
          toast(`📋 "${src.name}" copiado`);
        }
      }
      return;
    }
    // Ctrl+V: colar token/objeto copiado (só mestre)
    if ((e.ctrlKey || e.metaKey) && e.key === 'v' && (myRole === 'mestre')) {
      if (tokenClipboard) {
        e.preventDefault();
        snapshotBoard();
        const newId = 'tk' + Date.now() + Math.floor(Math.random() * 9999);
        const paste = JSON.parse(JSON.stringify(tokenClipboard));
        paste.id = newId;
        paste.gx = (paste.gx || 0) + 2;
        paste.gy = (paste.gy || 0) + 2;
        BOARD.tokens.push(paste);
        BOARD.selectedTokens.clear();
        BOARD.selectedTokens.add(newId);
        boardSave();
        boardRender();
        syncBoardTokensToPlayers();
        toast(`📋 "${paste.name}" colado`);
      }
      return;
    }
    // T: marcar/desmarcar token selecionado como alvo
    if (e.key === 't' || e.key === 'T') {
      const ativo = document.activeElement;
      if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA' || ativo.contentEditable === 'true')) return;
      if (BOARD.selectedTokens.size > 0) {
        e.preventDefault();
        const selId = BOARD.selectedTokens.values().next().value;
        const token = BOARD.tokens.find(t => t.id === selId);
        if (token) {
          if (!BOARD.targetedTokens) BOARD.targetedTokens = new Set();
          if (BOARD.targetedTokens.has(token.id)) {
            BOARD.targetedTokens.delete(token.id);
            toast(`🎯 "${token.name}" desmarcado como alvo`);
          } else {
            BOARD.targetedTokens.add(token.id);
            toast(`🎯 "${token.name}" marcado como alvo`);
          }
          boardRender();
        }
      }
      return;
    }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      const ativo = document.activeElement;
      if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA' || ativo.contentEditable === 'true')) return;
      e.preventDefault();
      moverTokenPorSeta(e.key);
    }
    // Delete: apagar token(s) selecionado(s) (só mestre)
    if (e.key === 'Delete') {
      const ativo = document.activeElement;
      if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA' || ativo.contentEditable === 'true')) return;
      if (myRole === 'mestre' && BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
        e.preventDefault();
        apagarTokensSelecionados();
      }
      return;
    }
    // M: montar/desmontar com os tokens selecionados
    if (e.key === 'm' || e.key === 'M') {
      const ativo = document.activeElement;
      if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA' || ativo.contentEditable === 'true')) return;
      if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
        e.preventDefault();
        const sel = [...BOARD.selectedTokens].map(id => BOARD.tokens.find(t => t.id === id)).filter(Boolean);
        if (sel.length === 2) {
          const [a, b] = sel;
          const pareado = a.mount && b.mount &&
            ((a.mount.mountId === b.id && b.mount.riderId === a.id) ||
             (a.mount.riderId === b.id && b.mount.mountId === a.id));
          if (pareado) desmontar(); else montar();
        } else if (sel.length === 1 && sel[0].mount) {
          desmontar();
        } else {
          montar();
        }
      }
      return;
    }
    // F: seguir/câmera no token selecionado
    if (e.key === 'f' || e.key === 'F') {
      const ativo = document.activeElement;
      if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA' || ativo.contentEditable === 'true')) return;
      if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
        e.preventDefault();
        const selId = BOARD.selectedTokens.values().next().value;
        toggleSeguirToken(selId);
        boardRender();
      }
      return;
    }
    // C: centralizar câmera no token selecionado
    if (e.key === 'c' || e.key === 'C') {
      const ativo = document.activeElement;
      if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA' || ativo.contentEditable === 'true')) return;
      if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
        e.preventDefault();
        const selId = BOARD.selectedTokens.values().next().value;
        centralizarEmToken(BOARD.tokens.find(t => t.id === selId));
        boardRender();
      }
      return;
    }
    // E: editar token selecionado
    if (e.key === 'e' || e.key === 'E') {
      const ativo = document.activeElement;
      if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA' || ativo.contentEditable === 'true')) return;
      if (BOARD.selectedTokens && BOARD.selectedTokens.size > 0) {
        e.preventDefault();
        const selId = BOARD.selectedTokens.values().next().value;
        const token = BOARD.tokens.find(t => t.id === selId);
        if (token) {
          if (token.locked) {
            toast(`🔒 "${token.name}" está travado.`);
          } else {
            const { cx, cy } = gridToCanvas(token.gx, token.gy);
            abrirFormTokenEdit(token, cx, cy);
          }
        }
      }
      return;
    }
    // V: mestre alterna visão de jogador
    if (e.key === 'v' || e.key === 'V') {
      const ativo = document.activeElement;
      if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA' || ativo.contentEditable === 'true')) return;
      if (myRole === 'mestre') {
        e.preventDefault();
        if (emVisaoJogador()) {
          exitPlayerView();
          boardRender();
        } else {
          atualizarVisaoJogadorPorSelecao();
          boardRender();
        }
      }
      return;
    }
    // B: abrir bestiário
    if (e.key === 'b' || e.key === 'B') {
      const ativo = document.activeElement;
      if (ativo && (ativo.tagName === 'INPUT' || ativo.tagName === 'TEXTAREA' || ativo.contentEditable === 'true')) return;
      e.preventDefault();
      switchTab('bau');
      switchBauSubtab('bestiario');
      return;
    }
  });

  // Mobile: arrastar lobby para cima
  const lobbySheet = document.getElementById('lobbySheet');
  const lobbyHandle = document.getElementById('lobbyHandle');
  if (lobbySheet && lobbyHandle && window.innerWidth <= 500 && window.innerHeight >= 601) {
    let startY = 0, currentY = 0, isDragging = false;
    const onTouchStart = (e) => {
      startY = e.touches[0].clientY;
      currentY = startY;
      isDragging = true;
      lobbySheet.style.transition = 'none';
    };
    const onTouchMove = (e) => {
      if (!isDragging) return;
      currentY = e.touches[0].clientY;
      const diff = startY - currentY;
      if (diff > 0) {
        const sheetH = lobbySheet.scrollHeight;
        const maxTranslate = sheetH - 80;
        const newTranslate = Math.max(0, maxTranslate - diff);
        lobbySheet.style.transform = `translateY(${newTranslate}px)`;
      }
    };
    const onTouchEnd = () => {
      if (!isDragging) return;
      isDragging = false;
      lobbySheet.style.transition = 'transform 0.35s ease';
      const diff = startY - currentY;
      if (diff > 60) {
        lobbySheet.classList.add('open');
        lobbySheet.style.transform = '';
      } else {
        lobbySheet.classList.remove('open');
        lobbySheet.style.transform = '';
      }
    };
    lobbyHandle.addEventListener('touchstart', onTouchStart, { passive: true });
    lobbyHandle.addEventListener('touchmove', onTouchMove, { passive: false });
    lobbyHandle.addEventListener('touchend', onTouchEnd);
  }
})();

// ══════════════════════════════════════════════════════
//  EDITOR DE IMAGENS
// ══════════════════════════════════════════════════════

const editorState = {
  active: false,
  target: 'general',
  imageLoaded: false,
  originalImg: null,
  canvas: null,
  ctx: null,
  overlayCanvas: null,
  overlayCtx: null,
  mode: 'crop',
  cropRatio: 'free',
  cropBox: { x: 0, y: 0, w: 0, h: 0 },
  activeHandle: null,
  cropMinSize: 20,
  brushMode: 'draw',
  brushColor: '#ff0000',
  brushSize: 10,
  isDrawing: false,
  lastX: 0,
  lastY: 0,
  brushCursorPos: null,
  undoStack: [],
  redoStack: [],
  maxStackSize: 20,
  eyedropperActive: false,
  backupCanvas: null
};

function abrirEditorImagem(url, target) {
  editorState.active = true;
  editorState.target = target;
  editorState.undoStack = [];
  editorState.redoStack = [];
  editorState.backupCanvas = null;

  document.getElementById('imageEditorModal').style.display = 'flex';
  document.getElementById('btnEditorApplyToken').style.display = (target === 'token') ? 'inline-block' : 'none';

  const applyObjectBtn = document.getElementById('btnEditorApplyObject');
  if (applyObjectBtn) {
    if (target === 'edit-object') {
      applyObjectBtn.textContent = '✓ Salvar Objeto';
      applyObjectBtn.style.display = 'inline-block';
    } else {
      applyObjectBtn.textContent = 'Usar como Objeto';
      applyObjectBtn.style.display = (target === 'token') ? 'none' : 'inline-block';
    }
  }

  document.getElementById('btnEditorApplyMap').style.display = (target === 'map' || target === 'general') ? 'inline-block' : 'none';

  resetFiltersStateAndUI();
  setEditorTab('crop');
  setEditorCropRatio('free');

  const welcome = document.getElementById('editorWelcome');
  const canvasContainer = document.getElementById('editorCanvasContainer');

  if (url) {
    welcome.style.display = 'none';
    canvasContainer.style.display = 'inline-block';

    loadImageWithCORSFallback(url, (img) => {
      setupEditorWithImage(img);
    }, () => {
      toast('Erro ao carregar imagem no editor.');
      welcome.style.display = 'flex';
      canvasContainer.style.display = 'none';
      editorState.imageLoaded = false;
    });
  } else {
    welcome.style.display = 'flex';
    canvasContainer.style.display = 'none';
    editorState.imageLoaded = false;
  }
}

function abrirEditorImagemToken() {
  if (isVideoUrl(tfSelectedImage)) {
    toast('Vídeos (webm/mp4) não podem ser editados no editor de imagem.');
    return;
  }
  if (tfSelectedImage) {
    abrirEditorImagem(tfSelectedImage, 'token');
  } else {
    abrirEditorImagem('', 'token');
    toast('Nenhuma imagem no token. Escolha uma no editor.');
  }
}

function abrirEditorImagemGeral() {
  if (BOARD.mapDataUrl) {
    abrirEditorImagem(BOARD.mapDataUrl, 'general');
  } else {
    abrirEditorImagem('', 'general');
  }
}

function setupEditorWithImage(img) {
  const canvas = document.getElementById('editorCanvas');
  const overlay = document.getElementById('editorOverlayCanvas');

  editorState.canvas = canvas;
  editorState.ctx = canvas.getContext('2d');
  editorState.overlayCanvas = overlay;
  editorState.overlayCtx = overlay.getContext('2d');

  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;

  editorState.ctx.clearRect(0, 0, canvas.width, canvas.height);
  editorState.ctx.drawImage(img, 0, 0);

  editorState.imageLoaded = true;
  document.getElementById('editorWelcome').style.display = 'none';
  document.getElementById('editorCanvasContainer').style.display = 'inline-block';

  resizeOverlayCanvas();
  resetEditorCropBox();

  pushToUndoStack();
  drawOverlay();
}

function resizeOverlayCanvas() {
  const canvas = document.getElementById('editorCanvas');
  const overlay = document.getElementById('editorOverlayCanvas');
  if (!canvas || !overlay) return;
  overlay.width = canvas.clientWidth;
  overlay.height = canvas.clientHeight;
  overlay.style.width = canvas.clientWidth + 'px';
  overlay.style.height = canvas.clientHeight + 'px';
}

window.addEventListener('resize', () => {
  if (editorState.active && editorState.imageLoaded) {
    const oldW = editorState.overlayCanvas.width;
    const oldH = editorState.overlayCanvas.height;

    resizeOverlayCanvas();

    if (oldW > 0 && oldH > 0) {
      const scaleX = editorState.overlayCanvas.width / oldW;
      const scaleY = editorState.overlayCanvas.height / oldH;
      editorState.cropBox.x *= scaleX;
      editorState.cropBox.w *= scaleX;
      editorState.cropBox.y *= scaleY;
      editorState.cropBox.h *= scaleY;
    }
    drawOverlay();
  }
  });

function drawOverlay() {
  const overlay = editorState.overlayCanvas;
  const ctx = editorState.overlayCtx;
  if (!overlay || !ctx) return;

  ctx.clearRect(0, 0, overlay.width, overlay.height);

  if (editorState.mode === 'crop') {
    const box = editorState.cropBox;

    ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.fillRect(0, 0, overlay.width, box.y);
    ctx.fillRect(0, box.y + box.h, overlay.width, overlay.height - (box.y + box.h));
    ctx.fillRect(0, box.y, box.x, box.h);
    ctx.fillRect(box.x + box.w, box.y, overlay.width - (box.x + box.w), box.h);

    ctx.strokeStyle = '#c9903a';
    ctx.lineWidth = 2;

    if (editorState.cropRatio === 'circle') {
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(box.x + box.w / 2, box.y + box.h / 2, Math.min(box.w, box.h) / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.arc(box.x + box.w / 2, box.y + box.h / 2, Math.min(box.w, box.h) / 2, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(201, 144, 58, 0.4)';
      ctx.lineWidth = 1;
      ctx.strokeRect(box.x, box.y, box.w, box.h);
    } else {
      ctx.strokeRect(box.x, box.y, box.w, box.h);
    }

    const handleSize = 8;
    ctx.fillStyle = '#e8b96a';
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;

    const corners = [
      { x: box.x, y: box.y },
      { x: box.x + box.w, y: box.y },
      { x: box.x + box.w, y: box.y + box.h },
      { x: box.x, y: box.y + box.h }
    ];

    corners.forEach(c => {
      ctx.fillRect(c.x - handleSize / 2, c.y - handleSize / 2, handleSize, handleSize);
      ctx.strokeRect(c.x - handleSize / 2, c.y - handleSize / 2, handleSize, handleSize);
    });
  } else if (editorState.mode === 'brush' && editorState.brushCursorPos) {
    const pos = editorState.brushCursorPos;
    const clientBrushRadius = editorState.brushSize * (overlay.width / editorState.canvas.width) / 2;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, Math.max(1, clientBrushRadius), 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, Math.max(1, clientBrushRadius), 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }
}

function setEditorCropRatio(ratio) {
  editorState.cropRatio = ratio;
  document.getElementById('btnCropFree').classList.toggle('active', ratio === 'free');
  document.getElementById('btnCrop11').classList.toggle('active', ratio === '1:1');
  document.getElementById('btnCropCircle').classList.toggle('active', ratio === 'circle');
  resetEditorCropBox();
  drawOverlay();
}

function resetEditorCropBox() {
  const overlay = editorState.overlayCanvas;
  if (!overlay) return;

  if (editorState.cropRatio === 'free') {
    editorState.cropBox = {
      x: overlay.width * 0.05,
      y: overlay.height * 0.05,
      w: overlay.width * 0.9,
      h: overlay.height * 0.9
    };
  } else {
    const size = Math.min(overlay.width, overlay.height) * 0.8;
    editorState.cropBox = {
      x: (overlay.width - size) / 2,
      y: (overlay.height - size) / 2,
      w: size,
      h: size
    };
  }
}

function setEditorTab(tab) {
  editorState.mode = tab;
  document.getElementById('tabEditorCrop').classList.toggle('active', tab === 'crop');
  document.getElementById('tabEditorColor').classList.toggle('active', tab === 'color');
  document.getElementById('tabEditorBrush').classList.toggle('active', tab === 'brush');

  document.getElementById('editorContentCrop').classList.toggle('active', tab === 'crop');
  document.getElementById('editorContentColor').classList.toggle('active', tab === 'color');
  document.getElementById('editorContentBrush').classList.toggle('active', tab === 'brush');

  if (tab !== 'color' && editorState.backupCanvas) {
    applyFilters();
  }

  if (tab !== 'brush') {
    editorState.brushCursorPos = null;
  }

  drawOverlay();
}

function handleCropStart(mx, my) {
  const box = editorState.cropBox;
  const handleSize = 14;
  let active = null;

  if (Math.hypot(mx - box.x, my - box.y) < handleSize) active = 'nw';
  else if (Math.hypot(mx - (box.x + box.w), my - box.y) < handleSize) active = 'ne';
  else if (Math.hypot(mx - (box.x + box.w), my - (box.y + box.h)) < handleSize) active = 'se';
  else if (Math.hypot(mx - box.x, my - (box.y + box.h)) < handleSize) active = 'sw';
  else if (mx >= box.x && mx <= box.x + box.w && my >= box.y && my <= box.y + box.h) active = 'move';

  if (active) {
    editorState.activeHandle = active;
    editorState.dragStart = { x: mx, y: my, box: { ...box } };
  }
}

function handleCropMove(mx, my) {
  if (!editorState.activeHandle) return;
  const oCanvas = editorState.overlayCanvas;
  const dx = mx - editorState.dragStart.x;
  const dy = my - editorState.dragStart.y;
  const startBox = editorState.dragStart.box;
  const handle = editorState.activeHandle;
  const minSize = editorState.cropMinSize;

  let newBox = { ...editorState.cropBox };

  if (handle === 'move') {
    newBox.x = Math.max(0, Math.min(oCanvas.width - startBox.w, startBox.x + dx));
    newBox.y = Math.max(0, Math.min(oCanvas.height - startBox.h, startBox.y + dy));
  } else {
    if (handle === 'nw') {
      newBox.x = Math.max(0, Math.min(startBox.x + startBox.w - minSize, startBox.x + dx));
      newBox.w = startBox.x + startBox.w - newBox.x;
      newBox.y = Math.max(0, Math.min(startBox.y + startBox.h - minSize, startBox.y + dy));
      newBox.h = startBox.y + startBox.h - newBox.y;
    } else if (handle === 'ne') {
      newBox.w = Math.max(minSize, Math.min(oCanvas.width - startBox.x, startBox.w + dx));
      newBox.y = Math.max(0, Math.min(startBox.y + startBox.h - minSize, startBox.y + dy));
      newBox.h = startBox.y + startBox.h - newBox.y;
    } else if (handle === 'se') {
      newBox.w = Math.max(minSize, Math.min(oCanvas.width - startBox.x, startBox.w + dx));
      newBox.h = Math.max(minSize, Math.min(oCanvas.height - startBox.y, startBox.h + dy));
    } else if (handle === 'sw') {
      newBox.x = Math.max(0, Math.min(startBox.x + startBox.w - minSize, startBox.x + dx));
      newBox.w = startBox.x + startBox.w - newBox.x;
      newBox.h = Math.max(minSize, Math.min(oCanvas.height - startBox.y, startBox.h + dy));
    }

    if (editorState.cropRatio === '1:1' || editorState.cropRatio === 'circle') {
      const size = Math.min(newBox.w, newBox.h);
      if (handle === 'nw') {
        newBox.x = startBox.x + startBox.w - size;
        newBox.y = startBox.y + startBox.h - size;
      } else if (handle === 'ne') {
        newBox.y = startBox.y + startBox.h - size;
      } else if (handle === 'sw') {
        newBox.x = startBox.x + startBox.w - size;
      }
      newBox.w = size;
      newBox.h = size;
    }
  }

  editorState.cropBox = newBox;
  drawOverlay();
}

function handleBrushStart(mx, my) {
  const scale = editorState.canvas.width / editorState.overlayCanvas.width;
  const imgX = mx * scale;
  const imgY = my * scale;

  editorState.isDrawing = true;
  editorState.lastX = imgX;
  editorState.lastY = imgY;

  pushToUndoStack();
  drawBrushStroke(imgX, imgY, imgX, imgY);
}

function handleBrushMove(mx, my) {
  const scale = editorState.canvas.width / editorState.overlayCanvas.width;
  const imgX = mx * scale;
  const imgY = my * scale;

  if (editorState.isDrawing) {
    drawBrushStroke(editorState.lastX, editorState.lastY, imgX, imgY);
    editorState.lastX = imgX;
    editorState.lastY = imgY;
  }

  editorState.brushCursorPos = { x: mx, y: my };
  drawOverlay();
}

function drawBrushStroke(x1, y1, x2, y2) {
  const ctx = editorState.ctx;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = editorState.brushSize;

  if (editorState.brushMode === 'erase') {
    ctx.globalCompositeOperation = 'destination-out';
    ctx.strokeStyle = 'rgba(0,0,0,1)';
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = editorState.brushColor;
  }
  ctx.stroke();
  ctx.restore();
}

function applyCrop() {
  const canvas = editorState.canvas;
  const overlay = editorState.overlayCanvas;
  if (!canvas || !overlay || !editorState.imageLoaded) return;

  const scale = canvas.width / overlay.width;
  const box = editorState.cropBox;
  const ix = box.x * scale;
  const iy = box.y * scale;
  const iw = box.w * scale;
  const ih = box.h * scale;

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = iw;
  tempCanvas.height = ih;
  const tempCtx = tempCanvas.getContext('2d');

  if (editorState.cropRatio === 'circle') {
    tempCtx.beginPath();
    tempCtx.arc(iw / 2, ih / 2, Math.min(iw, ih) / 2, 0, Math.PI * 2);
    tempCtx.clip();
  }

  tempCtx.drawImage(canvas, ix, iy, iw, ih, 0, 0, iw, ih);

  canvas.width = iw;
  canvas.height = ih;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, iw, ih);
  ctx.drawImage(tempCanvas, 0, 0);

  resizeOverlayCanvas();
  resetEditorCropBox();
  pushToUndoStack();
  drawOverlay();

  toast('Imagem recortada!');
}

function updateEditorFilters() {
  const canvas = editorState.canvas;
  const ctx = editorState.ctx;
  if (!canvas || !ctx || !editorState.imageLoaded) return;

  if (!editorState.backupCanvas) {
    editorState.backupCanvas = document.createElement('canvas');
    editorState.backupCanvas.width = canvas.width;
    editorState.backupCanvas.height = canvas.height;
    const bCtx = editorState.backupCanvas.getContext('2d');
    bCtx.drawImage(canvas, 0, 0);
  }

  const brightness = document.getElementById('slideBrightness').value;
  const contrast = document.getElementById('slideContrast').value;
  const saturation = document.getElementById('slideSaturation').value;
  const hue = document.getElementById('slideHue').value;
  const grayscale = document.getElementById('slideGrayscale').value;
  const invert = document.getElementById('slideInvert').value;

  document.getElementById('valBrightness').textContent = brightness + '%';
  document.getElementById('valContrast').textContent = contrast + '%';
  document.getElementById('valSaturation').textContent = saturation + '%';
  document.getElementById('valHue').textContent = hue + '°';
  document.getElementById('valGrayscale').textContent = grayscale + '%';
  document.getElementById('valInvert').textContent = invert + '%';

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) saturate(${saturation}%) hue-rotate(${hue}deg) grayscale(${grayscale}%) invert(${invert}%)`;
  ctx.drawImage(editorState.backupCanvas, 0, 0);
  ctx.restore();
}

function applyFilters() {
  if (!editorState.backupCanvas) return;
  editorState.backupCanvas = null;
  pushToUndoStack();
  toast('Filtros aplicados!');
}

function resetFilterSlidersUI() {
  document.getElementById('slideBrightness').value = 100;
  document.getElementById('slideContrast').value = 100;
  document.getElementById('slideSaturation').value = 100;
  document.getElementById('slideHue').value = 0;
  document.getElementById('slideGrayscale').value = 0;
  document.getElementById('slideInvert').value = 0;

  document.getElementById('valBrightness').textContent = '100%';
  document.getElementById('valContrast').textContent = '100%';
  document.getElementById('valSaturation').textContent = '100%';
  document.getElementById('valHue').textContent = '0°';
  document.getElementById('valGrayscale').textContent = '0%';
  document.getElementById('valInvert').textContent = '0%';
}

function resetFilters() {
  resetFilterSlidersUI();

  if (editorState.backupCanvas) {
    const canvas = editorState.canvas;
    const ctx = editorState.ctx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(editorState.backupCanvas, 0, 0);
    editorState.backupCanvas = null;
    toast('Filtros resetados.');
  }
}

function resetFiltersStateAndUI() {
  resetFilterSlidersUI();
  editorState.backupCanvas = null;
}

function updateBrushSize(val) {
  editorState.brushSize = parseInt(val);
  document.getElementById('valBrushSize').textContent = val + 'px';
  drawOverlay();
}

function setBrushMode(mode) {
  editorState.brushMode = mode;
  document.getElementById('btnBrushModeDraw').classList.toggle('active', mode === 'draw');
  document.getElementById('btnBrushModeErase').classList.toggle('active', mode === 'erase');
}

function activateEyedropper() {
  editorState.eyedropperActive = true;
  document.getElementById('editorOverlayCanvas').style.cursor = 'crosshair';
  toast('Clique na imagem para copiar a cor');
}

function sampleEyedropperColor(mx, my) {
  const scale = editorState.canvas.width / editorState.overlayCanvas.width;
  const ix = Math.floor(mx * scale);
  const iy = Math.floor(my * scale);

  if (ix >= 0 && ix < editorState.canvas.width && iy >= 0 && iy < editorState.canvas.height) {
    const imgData = editorState.ctx.getImageData(ix, iy, 1, 1).data;
    if (imgData[3] > 0) {
      const hexColor = rgbToHex(imgData[0], imgData[1], imgData[2]);
      editorState.brushColor = hexColor;
      document.getElementById('editorBrushColor').value = hexColor;
      toast(`Cor copiada: ${hexColor}`);
    } else {
      toast('Pixel transparente!');
    }
  }
  editorState.eyedropperActive = false;
  document.getElementById('editorOverlayCanvas').style.cursor = 'default';
}

function rgbToHex(r, g, b) {
  const toHex = x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + toHex(r) + toHex(g) + toHex(b);
}

function promptEditorUrl() {
  const url = prompt('Cole a URL da imagem:');
  if (url && url.trim()) {
    carregarImagemEditor(url.trim());
  }
}

function handleEditorFileLoad(input) {
  const file = input.files && input.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (e) => {
    carregarImagemEditor(e.target.result);
  };
  reader.readAsDataURL(file);
  input.value = '';
}

function handleEditorFileDrop(e) {
  const file = e.dataTransfer.files && e.dataTransfer.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) {
    toast('Por favor, arraste apenas arquivos de imagem.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    carregarImagemEditor(e.target.result);
  };
  reader.readAsDataURL(file);
}

function carregarImagemEditor(url) {
  const welcome = document.getElementById('editorWelcome');
  const canvasContainer = document.getElementById('editorCanvasContainer');
  welcome.style.display = 'none';
  canvasContainer.style.display = 'inline-block';

  loadImageWithCORSFallback(url, (img) => {
    setupEditorWithImage(img);
  }, () => {
    toast('Erro ao carregar imagem selecionada.');
    if (!editorState.imageLoaded) {
      welcome.style.display = 'flex';
      canvasContainer.style.display = 'none';
    }
  });
}

function pushToUndoStack() {
  const canvas = editorState.canvas;
  if (!canvas) return;
  const state = {
    width: canvas.width,
    height: canvas.height,
    dataUrl: canvas.toDataURL()
  };
  editorState.undoStack.push(state);
  if (editorState.undoStack.length > editorState.maxStackSize) {
    editorState.undoStack.shift();
  }
  editorState.redoStack = [];
  updateUndoRedoButtons();
}

function editorUndo() {
  if (editorState.undoStack.length <= 1) return;
  const current = editorState.undoStack.pop();
  editorState.redoStack.push(current);

  const previous = editorState.undoStack[editorState.undoStack.length - 1];
  restoreEditorState(previous);
}

function editorRedo() {
  if (editorState.redoStack.length === 0) return;
  const state = editorState.redoStack.pop();
  editorState.undoStack.push(state);
  restoreEditorState(state);
}

function restoreEditorState(state) {
  const canvas = editorState.canvas;
  const ctx = editorState.ctx;
  const img = new Image();
  img.onload = () => {
    canvas.width = state.width;
    canvas.height = state.height;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
    resizeOverlayCanvas();
    resetEditorCropBox();
    drawOverlay();
  };
  img.src = state.dataUrl;
  updateUndoRedoButtons();
}

function updateUndoRedoButtons() {
  const undoBtn = document.getElementById('btnEditorUndo');
  const redoBtn = document.getElementById('btnEditorRedo');
  if (undoBtn) undoBtn.disabled = (editorState.undoStack.length <= 1);
  if (redoBtn) redoBtn.disabled = (editorState.redoStack.length === 0);
}

function fecharEditorImagem() {
  if (editorState.undoStack.length > 1) {
    if (!confirm('Deseja fechar o editor? Suas alterações não salvas serão perdidas.')) {
      return;
    }
  }
  document.getElementById('imageEditorModal').style.display = 'none';
  editorState.active = false;
  editorState.imageLoaded = false;
  editorState.undoStack = [];
  editorState.redoStack = [];
  editorState.backupCanvas = null;
}

function editorExportToken() {
  if (!editorState.imageLoaded) return;
  if (editorState.backupCanvas) applyFilters();

  const dataUrl = editorState.canvas.toDataURL();
  definirImagemToken(dataUrl);

  document.getElementById('imageEditorModal').style.display = 'none';
  editorState.active = false;
  toast('Imagem editada aplicada ao Token!');
}

function editorExportMap() {
  if (!editorState.imageLoaded) return;
  if (editorState.backupCanvas) applyFilters();

  const dataUrl = editorState.canvas.toDataURL();

  const img = new Image();
  img.onload = () => {
    snapshotBoard();
    BOARD.mapImg = img;
    BOARD.mapDataUrl = dataUrl;
    BOARD.mapX = 0;
    BOARD.mapY = 0;
    BOARD.mapWidth = null;
    BOARD.mapHeight = null;
    boardRender();

    if (myRole === 'mestre' || amIHost) {
      syncBoardMapToPlayers();
    }

    document.getElementById('imageEditorModal').style.display = 'none';
    editorState.active = false;
    toast('Imagem editada aplicada como Mapa!');
  };
  img.src = dataUrl;
}

function editorExportDownload() {
  if (!editorState.imageLoaded) return;
  if (editorState.backupCanvas) applyFilters();

  const dataUrl = editorState.canvas.toDataURL();
  const link = document.createElement('a');
  link.download = 'imagem_editada_' + Date.now() + '.png';
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  toast('Download iniciado!');
}

function initImageEditorEvents() {
  const overlay = document.getElementById('editorOverlayCanvas');
  if (!overlay) return;

  function getMousePos(e) {
    const rect = overlay.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  overlay.addEventListener('mousedown', (e) => {
    if (!editorState.imageLoaded) return;
    const pos = getMousePos(e);
    if (editorState.eyedropperActive) {
      sampleEyedropperColor(pos.x, pos.y);
      return;
    }
    if (editorState.mode === 'crop') {
      handleCropStart(pos.x, pos.y);
    } else if (editorState.mode === 'brush') {
      handleBrushStart(pos.x, pos.y);
    }
  });

  overlay.addEventListener('mousemove', (e) => {
    if (!editorState.imageLoaded) return;
    const pos = getMousePos(e);
    if (editorState.mode === 'crop') {
      handleCropMove(pos.x, pos.y);
    } else if (editorState.mode === 'brush') {
      handleBrushMove(pos.x, pos.y);
    }
  });

  const endHandler = () => {
    if (editorState.mode === 'crop') {
      editorState.activeHandle = null;
    } else if (editorState.mode === 'brush') {
      editorState.isDrawing = false;
    }
  };

  overlay.addEventListener('mouseup', endHandler);
  overlay.addEventListener('mouseleave', () => {
    endHandler();
    if (editorState.mode === 'brush') {
      editorState.brushCursorPos = null;
      drawOverlay();
    }
  });

  overlay.addEventListener('touchstart', (e) => {
    if (!editorState.imageLoaded) return;
    e.preventDefault();
    const pos = getMousePos(e);
    if (editorState.eyedropperActive) {
      sampleEyedropperColor(pos.x, pos.y);
    } else if (editorState.mode === 'crop') {
      handleCropStart(pos.x, pos.y);
    } else if (editorState.mode === 'brush') {
      handleBrushStart(pos.x, pos.y);
    }
  }, { passive: false });

  overlay.addEventListener('touchmove', (e) => {
    if (!editorState.imageLoaded) return;
    e.preventDefault();
    const pos = getMousePos(e);
    if (editorState.mode === 'crop') {
      handleCropMove(pos.x, pos.y);
    } else if (editorState.mode === 'brush') {
      handleBrushMove(pos.x, pos.y);
    }
  }, { passive: false });

  overlay.addEventListener('touchend', endHandler);
}

function initImageEditor() {
  initImageEditorEvents();
  document.getElementById('editorBrushColor')?.addEventListener('input', (e) => {
    editorState.brushColor = e.target.value;
  });
}

function editorExportObject() {
  if (!editorState.imageLoaded) return;
  if (editorState.backupCanvas) applyFilters();

  const dataUrl = editorState.canvas.toDataURL();

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    tokenImageCache[dataUrl] = img;

    if (editorState.target === 'edit-object') {
      const token = BOARD.tokens.find(t => t.id === editorState.editingObjectId);
      if (token) {
        token.imageUrl = dataUrl;
        const iw = img.naturalWidth || canvas.width;
        const ih = img.naturalHeight || canvas.height;
        const oldMax = Math.max(token.sizeX || token.size || 1, token.sizeY || token.size || 1);
        if (iw > ih) {
          token.sizeX = oldMax;
          token.sizeY = Math.max(0.25, Math.round(oldMax * ih / iw * 4) / 4);
        } else {
          token.sizeY = oldMax;
          token.sizeX = Math.max(0.25, Math.round(oldMax * iw / ih * 4) / 4);
        }
        token.size = Math.max(token.sizeX, token.sizeY);
        boardSave();
        boardRender();
        syncBoardTokensToPlayers();
        toast('◻ Objeto atualizado!');
      } else {
        toast('Erro: Objeto não encontrado para edição.');
      }
      document.getElementById('imageEditorModal').style.display = 'none';
      editorState.active = false;
      return;
    }

    const cx = BOARD.wrap.clientWidth / 2;
    const cy = BOARD.wrap.clientHeight / 2;
    const { gx, gy } = canvasToGrid(cx, cy);
    const s = 2; // tamanho padrão em grid cells

    let sizeX = s, sizeY = s;
    if (img.naturalWidth && img.naturalHeight) {
      const iw = img.naturalWidth, ih = img.naturalHeight;
      if (iw > ih) {
        sizeY = s * (ih / iw);
      } else {
        sizeX = s * (iw / ih);
      }
    }

    const newId = 'tk' + Date.now() + Math.floor(Math.random() * 9999);

    BOARD.tokens.push({
      id: newId,
      type: 'object',
      name: 'Objeto',
      size: s,
      sizeX: sizeX,
      sizeY: sizeY,
      imageUrl: dataUrl,
      borderType: 'solid', borderWidth: 1.5, borderColor: '#ffffff',
      layer: 'map',
      z: 0,
      conditions: [],
      hideName: true,
      gx: Math.max(0, gx), gy: Math.max(0, gy)
    });

    setBoardLayer('map');
    BOARD.selectedTokens.clear();
    BOARD.selectedTokens.add(newId);
    boardSave();
    boardRender();
    syncBoardTokensToPlayers();

    document.getElementById('imageEditorModal').style.display = 'none';
    editorState.active = false;
    toast(`◻ Objeto criado (${s}×${s}) na camada Mapa! Arraste para posicionar.`);
  };
  img.src = dataUrl;
}

function contextEditObject() {
  if (!contextTokenId) return;
  const token = BOARD.tokens.find(t => t.id === contextTokenId);
  if (!token) { fecharContextMenu(); return; }
  if (token.locked) { toast(`🔒 "${token.name}" está travado.`); fecharContextMenu(); return; }
  editorState.editingObjectId = token.id;
  abrirEditorImagem(token.imageUrl || '', 'edit-object');
  fecharContextMenu();
}

// ── Tooltip ──
function updateTooltip(token, x, y) {
  const tooltip = document.getElementById('tokenTooltip');
  if (!tooltip) return;

  const isMestre = (myRole === 'mestre');
  const hasControl = temControleToken(token);
  const showInfo = !token.hideName || isMestre || hasControl;

  let name = token.name || 'Token';
  if (token.hideName && !isMestre && !hasControl) {
    name = 'Desconhecido';
  } else if (token.hideName && isMestre) {
    name += ' (Oculto)';
  }

  let content = `<strong>${name}</strong>`;

  if (showInfo && token.type !== 'object') {
    if (token.hp !== undefined && token.hpMax !== undefined && token.hpMax > 0) {
      content += `<br>PV: ${token.hp}/${token.hpMax}`;
    }
    if (token.pm !== undefined && token.pmMax !== undefined && token.pmMax > 0) {
      content += `<br>PM: ${token.pm}/${token.pmMax}`;
    }
    if (token.defense) {
      content += `<br>Defesa: ${token.defense}`;
      if (token.defenseMax) content += `/${token.defenseMax}`;
    }
    if (token.conditions && token.conditions.length > 0) {
      const emojis = token.conditions.map(c => {
        const emoji = (typeof CONDITION_EMOJI !== 'undefined' && CONDITION_EMOJI[c]) ? CONDITION_EMOJI[c] : '';
        return emoji ? `${emoji} ${c}` : c;
      });
      content += `<br>Condições: ${emojis.join(', ')}`;
    }
  }

  content += `<br><span style="font-size:0.6rem;opacity:0.5;">T — marcar / alvo</span>`;

  tooltip.innerHTML = content;
  tooltip.style.display = 'block';

  // Position
  const rect = BOARD.wrap.getBoundingClientRect();
  const vx = rect.left + x + 15;
  const vy = rect.top + y + 15;

  tooltip.style.left = vx + 'px';
  tooltip.style.top = vy + 'px';

  // Prevent overflowing the viewport
  const tooltipRect = tooltip.getBoundingClientRect();
  if (vx + tooltipRect.width > window.innerWidth) {
    tooltip.style.left = (rect.left + x - tooltipRect.width - 15) + 'px';
  }
  if (vy + tooltipRect.height > window.innerHeight) {
    tooltip.style.top = (rect.top + y - tooltipRect.height - 15) + 'px';
  }
}

function hideTooltip() {
  const tooltip = document.getElementById('tokenTooltip');
  if (tooltip) {
    tooltip.style.display = 'none';
  }
}

// ── Salvar / Importar Estado da Mesa via JSON ──
function exportarMesa() {
  if (myRole !== 'mestre') {
    toast('Apenas o Mestre pode exportar a mesa.');
    return;
  }
  try {
    saveCurrentBoardToActiveScene();
    
    const state = {
      scenes: SCENES,
      activeSceneId: ACTIVE_SCENE_ID,
      playersSceneId: PLAYERS_SCENE_ID,
      exportVersion: 2
    };

    const dataStr = JSON.stringify(state, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const exportFileDefaultName = 'mesa_' + (roomTitle || 'vtt').replace(/\s+/g, '_').toLowerCase() + '_' + Date.now() + '.json';

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', url);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 100);

    toast('Mesa exportada com sucesso!');
  } catch (e) {
    toast('Erro ao exportar mesa: ' + e.message);
  }
}

function importarMesa(event) {
  if (myRole !== 'mestre') {
    toast('Apenas o Mestre pode importar uma mesa.');
    return;
  }
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (e) {
    try {
      const s = JSON.parse(e.target.result);

      if (!s) {
        toast('Arquivo JSON inválido para restauração da mesa.');
        return;
      }

      if (!confirm('Isso irá substituir todas as cenas e o tabuleiro atual. Deseja prosseguir?')) {
        event.target.value = '';
        return;
      }

      snapshotBoard();

      // Check if it is a multi-scene export (exportVersion >= 2 or s.scenes exists)
      if (s.scenes && Array.isArray(s.scenes) && s.activeSceneId) {
        SCENES = s.scenes;
        ACTIVE_SCENE_ID = s.activeSceneId;
        PLAYERS_SCENE_ID = s.playersSceneId || s.activeSceneId;
      } else {
        // Fallback para arquivos legados de cena única
        if (s.tokens === undefined && s.walls === undefined && s.mapDataUrl === undefined) {
          toast('Arquivo JSON inválido para restauração da mesa.');
          return;
        }

        const oldScene = {
          id: 'scene_' + Date.now(),
          name: 'Cena Restaurada',
          tokens: s.tokens || [],
          walls: s.walls || [],
          shapes: s.shapes || [],
          gridSize: s.gridSize || 50,
          gridOn: typeof s.gridOn === 'boolean' ? s.gridOn : true,
          activeFloor: s.activeFloor || 0,
          gridCols: s.gridCols || 40,
          gridRows: s.gridRows || 40,
          gridScaleVal: s.gridScaleVal || 1.5,
          gridScaleUnit: s.gridScaleUnit || 'm',
          gridType: s.gridType || 'square',
          lightingType: s.lightingType || 'normal',
          mapDataUrl: s.mapDataUrl || null,
          mapX: s.mapX || 0,
          mapY: s.mapY || 0,
          mapWidth: s.mapWidth || null,
          mapHeight: s.mapHeight || null,
          fogManual: s.fogManual || false,
          fogVisible: s.fogVisible || null
        };
        SCENES = [oldScene];
        ACTIVE_SCENE_ID = oldScene.id;
        PLAYERS_SCENE_ID = oldScene.id;
      }

      saveScenesLocally();
      
      const activeScene = SCENES.find(sc => sc.id === ACTIVE_SCENE_ID) || SCENES[0];
      ACTIVE_SCENE_ID = activeScene.id;
      loadSceneIntoBoard(activeScene);

      setTimeout(atualizarFogJogador, 100);
      boardRender();

      if (myRole === 'mestre' || amIHost) {
        syncBoardToPlayers();

        broadcastScenesUpdate();
        renderScenesPanel();
      }

      toast('Mesa restaurada com sucesso!');
    } catch (err) {
      toast('Erro ao importar arquivo JSON: ' + err.message);
    }
    event.target.value = '';
  };
  reader.readAsText(file);
}

// ── Alternar Ferramentas do Tabuleiro ──
function setTool(toolName) {
  BOARD.tool = toolName;

  // Atualiza a classe active nos botões da barra de ferramentas
  const toolButtons = [
    { name: 'move', id: 'toolMove' }, { name: 'move', id: 'mobToolMove' },
    { name: 'pan', id: 'toolPan' }, { name: 'pan', id: 'mobToolPan' },
    { name: 'wall', id: 'toolWall' }, { name: 'wall', id: 'mobToolWall' },
    { name: 'fog', id: 'toolFog' }, { name: 'fog', id: 'mobToolFog' },
    { name: 'reveal', id: 'toolReveal' }, { name: 'reveal', id: 'mobToolReveal' },
    { name: 'shape-rect', id: 'toolShapeRect' }, { name: 'shape-rect', id: 'mobToolRect' },
    { name: 'shape-circle', id: 'toolShapeCircle' }, { name: 'shape-circle', id: 'mobToolCircle' },
    { name: 'shape-freehand', id: 'toolShapeFreehand' }, { name: 'shape-freehand', id: 'mobToolFreehand' },
    { name: 'ruler', id: 'toolRuler' }, { name: 'ruler', id: 'mobToolRuler' },
    { name: 'circle-ruler', id: 'toolCircleRuler' }, { name: 'circle-ruler', id: 'mobToolCircleRuler' },
    { name: 'way-ruler', id: 'toolWayRuler' }, { name: 'way-ruler', id: 'mobToolWayRuler' }
  ];

  toolButtons.forEach(btn => {
    const el = document.getElementById(btn.id);
    if (el) {
      if (btn.name === toolName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });

  // Ajusta a classe de cursor no wrap do canvas
  const wrap = BOARD.wrap;
  if (wrap) {
    wrap.className = 'board-canvas-wrap';
    wrap.classList.add('tool-' + toolName);
  }

  // Cancela qualquer desenho ou pintura ativa ao trocar de ferramenta
  BOARD.wallDrawing = false;
  BOARD.shapeDrawing = false;
  BOARD.fogPainting = false;
  BOARD.panning = false;
  BOARD.dragging = null;
  BOARD.dragGroup = null;
  BOARD.handleDrag = null;
  if (BOARD.marquee) { BOARD.marquee = null; hideSelectionBox(); }
  BOARD.selectedTokens.clear();
  BOARD.selectedWallId = null;
  BOARD.wayRulerActive = false;
  BOARD.wayRulerPoints = [];
  atualizarVisaoJogadorPorSelecao();

  // Seletor de tipo de parede: só aparece com a ferramenta parede ativa
  const wallSelect = document.getElementById('wallTypeSelect');
  if (wallSelect) {
    wallSelect.style.display = (toolName === 'wall' && myRole === 'mestre') ? '' : 'none';
  }

  // Seletor de modo de distância: aparece para régua e caminho
  const distanceModeSelect = document.getElementById('distanceModeSelect');
  if (distanceModeSelect) {
    distanceModeSelect.style.display = (toolName === 'ruler' || toolName === 'way-ruler') ? '' : 'none';
  }

  // Seletor de cor: aparece só com ferramentas de desenho
  const colorPicker = document.getElementById('shapeColorPicker');
  if (colorPicker) {
    const isShape = (toolName === 'shape-rect' || toolName === 'shape-circle' || toolName === 'shape-freehand');
    colorPicker.style.display = isShape ? '' : 'none';
  }

  boardRender();
}

function setShapeColor(hex) {
  BOARD.shapeColor = hex;
}

function setDistanceMode(mode) {
  BOARD.distanceMode = mode;
  const gcDist = document.getElementById('gcDistanceMode');
  if (gcDist) gcDist.value = mode;
  const distSel = document.getElementById('distanceModeSelect');
  if (distSel) distSel.value = mode;
  saveCurrentBoardToActiveScene();
  if (myRole === 'mestre') syncBoardToPlayers();
  boardRender();
}
// ══════════════════════════════════════════════════════════
// GERENCIADOR DE MÚLTIPLAS CENAS
// ══════════════════════════════════════════════════════════
const CENAS_KEY = 'vtt_cenas_v1';
let cenaAtualId = null;

function _getCenas() {
  try { return JSON.parse(localStorage.getItem(CENAS_KEY)) || []; }
  catch(e) { return []; }
}

function _setCenas(arr) {
  try {
    localStorage.setItem(CENAS_KEY, JSON.stringify(arr));
    return true;
  } catch (e) {
    // QuotaExceededError: o mapa é salvo como base64 e o localStorage tem ~5 MB.
    // Antes o erro era engolido em silêncio e a cena era perdida sem aviso.
    console.error('Falha ao salvar cenas no localStorage', e);
    const quota = e && (e.name === 'QuotaExceededError' ||
                        e.name === 'NS_ERROR_DOM_QUOTA_REACHED' || e.code === 22);
    toast(quota
      ? '⚠️ Limite de armazenamento atingido — a cena NÃO foi salva. Exclua cenas antigas ou use mapa por URL em vez de upload.'
      : '⚠️ Não foi possível salvar a cena. Veja o console para detalhes.', 6000);
    return false;
  }
}

function _capturarEstadoAtual() {
  const state = {
    tokens: JSON.parse(JSON.stringify(BOARD.tokens)),
    walls: JSON.parse(JSON.stringify(BOARD.walls)),
    shapes: JSON.parse(JSON.stringify(BOARD.shapes)),
    gridSize: BOARD.gridSize,
    gridOn: BOARD.gridOn,
    activeFloor: BOARD.activeFloor || 0,
    gridCols: BOARD.gridCols,
    gridRows: BOARD.gridRows,
    gridScaleVal: BOARD.gridScaleVal,
    gridScaleUnit: BOARD.gridScaleUnit,
    gridType: BOARD.gridType,
    lightingType: BOARD.lightingType,
    distanceMode: BOARD.distanceMode,
    mapDataUrl: BOARD.mapDataUrl,
    mapX: BOARD.mapX || 0,
    mapY: BOARD.mapY || 0,
    mapWidth: BOARD.mapWidth || null,
    mapHeight: BOARD.mapHeight || null
  };
  if (BOARD.fogManual && BOARD.fogVisible) {
    state.fogVisible = Array.from(BOARD.fogVisible);
    state.fogManual = true;
  }
  return state;
}

function _capturarThumb() {
  try {
    const src = document.getElementById('board-canvas');
    if (!src) return null;
    const tmp = document.createElement('canvas');
    tmp.width = 120; tmp.height = 80;
    tmp.getContext('2d').drawImage(src, 0, 0, 120, 80);
    return tmp.toDataURL('image/jpeg', 0.5);
  } catch(e) { return null; }
}

function salvarCenaAtual() {
  if (myRole !== 'mestre') { toast('Apenas o Mestre pode gerenciar cenas.'); return; }
  const input = document.getElementById('cena-nome-input');
  const nome = (input?.value || '').trim() ||
    ('Cena ' + new Date().toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'}));

  const cenas = _getCenas();

  // Se há uma cena ativa, oferece sobrescrever
  if (cenaAtualId) {
    const idx = cenas.findIndex(c => c.id === cenaAtualId);
    if (idx !== -1) {
      cenas[idx].nome = nome;
      cenas[idx].state = _capturarEstadoAtual();
      cenas[idx].thumb = _capturarThumb();
      cenas[idx].atualizado = Date.now();
      if (!_setCenas(cenas)) return;
      if (input) input.value = '';
      toast(`Cena "${nome}" atualizada!`);
      renderizarListaCenas();
      return;
    }
  }

  // Nova cena
  const id = 'cena_' + Date.now();
  cenas.push({ id, nome, state: _capturarEstadoAtual(), thumb: _capturarThumb(),
    criado: Date.now(), atualizado: Date.now() });
  if (!_setCenas(cenas)) return;
  cenaAtualId = id;
  if (input) input.value = '';
  toast(`Cena "${nome}" salva!`);
  renderizarListaCenas();
}

function carregarCena(id) {
  if (myRole !== 'mestre') { toast('Apenas o Mestre pode trocar de cena.'); return; }
  const cenas = _getCenas();
  const cena = cenas.find(c => c.id === id);
  if (!cena) { toast('Cena não encontrada.'); return; }

  if (!confirm(`Carregar "${cena.nome}"? O estado atual será perdido (salve antes se quiser guardar).`)) return;
  snapshotBoard();

  const s = cena.state;
  BOARD.tokens  = (s.tokens  || []).map(t => ({...t, layer: t.layer||'players', conditions: t.conditions||[], hideName: t.hideName||false, soundId: t.soundId||null}));
  BOARD.walls   = (s.walls   || []).map(w => ({...w, soundId: w.soundId||null}));
  BOARD.shapes  = (s.shapes  || []).map(sh => ({...sh, soundId: sh.soundId||null, hidden: sh.hidden===true, triggerImageUrl: sh.triggerImageUrl||null, triggered: sh.triggered===true}));

  if (s.gridSize)  BOARD.gridSize  = s.gridSize;
  if (typeof s.gridOn === 'boolean') BOARD.gridOn = s.gridOn;
  if (s.activeFloor !== undefined) BOARD.activeFloor = s.activeFloor;
  if (s.gridCols   !== undefined)  BOARD.gridCols   = s.gridCols;
  if (s.gridRows   !== undefined)  BOARD.gridRows   = s.gridRows;
  if (s.gridScaleVal  !== undefined) BOARD.gridScaleVal  = s.gridScaleVal;
  if (s.gridScaleUnit !== undefined) BOARD.gridScaleUnit = s.gridScaleUnit;
  if (s.gridType   !== undefined)  BOARD.gridType   = s.gridType;
  if (s.lightingType !== undefined) { BOARD.lightingType = s.lightingType; _syncWeatherSelect?.(); }

  if (s.fogManual && s.fogVisible) {
    BOARD.fogVisible = new Set(s.fogVisible); BOARD.fogManual = true;
  } else { BOARD.fogVisible = null; BOARD.fogManual = false; }

  BOARD.mapX = s.mapX ?? 0; BOARD.mapY = s.mapY ?? 0;
  BOARD.mapWidth = s.mapWidth ?? null; BOARD.mapHeight = s.mapHeight ?? null;

  const afterLoad = () => {
    boardRender();
    syncBoardMapToPlayers();
    syncBoardTokensToPlayers();
    syncWallsToPlayers?.();
    syncShapesToPlayers?.();
    syncFogToPlayers?.();
  };

  if (s.mapDataUrl) {
    BOARD.mapDataUrl = s.mapDataUrl;
    const img = new Image();
    img.onload = () => {
      BOARD.mapImg = img;
      if (typeof isGifUrl === 'function' && isGifUrl(img.src)) getGifCanvas?.(img.src, img.naturalWidth, img.naturalHeight);
      afterLoad();
    };
    img.src = s.mapDataUrl;
  } else {
    BOARD.mapDataUrl = null; BOARD.mapImg = null;
    afterLoad();
  }

  cenaAtualId = id;
  boardSave();
  toast(`Cena "${cena.nome}" carregada!`);
  renderizarListaCenas();
}

function renomearCena(id) {
  const cenas = _getCenas();
  const cena  = cenas.find(c => c.id === id);
  if (!cena) return;
  const novo = prompt('Novo nome:', cena.nome);
  if (!novo?.trim()) return;
  cena.nome = novo.trim();
  if (!_setCenas(cenas)) return;
  renderizarListaCenas();
  toast(`Cena renomeada para "${cena.nome}".`);
}

function excluirCena(id) {
  const cenas = _getCenas();
  const cena  = cenas.find(c => c.id === id);
  if (!cena) return;
  if (!confirm(`Excluir "${cena.nome}"? Esta ação não pode ser desfeita.`)) return;
  _setCenas(cenas.filter(c => c.id !== id));
  if (cenaAtualId === id) cenaAtualId = null;
  renderizarListaCenas();
  toast(`Cena "${cena.nome}" excluída.`);
}

function _sobreescreverCena(id) {
  if (myRole !== 'mestre') return;
  const cenas = _getCenas();
  const idx   = cenas.findIndex(c => c.id === id);
  if (idx === -1) return;
  if (!confirm(`Sobrescrever "${cenas[idx].nome}" com o estado atual?`)) return;
  cenas[idx].state = _capturarEstadoAtual();
  cenas[idx].thumb = _capturarThumb();
  cenas[idx].atualizado = Date.now();
  if (!_setCenas(cenas)) return;
  cenaAtualId = id;
  toast(`Cena "${cenas[idx].nome}" sobrescrita!`);
  renderizarListaCenas();
}

function renderizarListaCenas() {
  const lista = document.getElementById('cenas-lista');
  const vazio = document.getElementById('cenas-empty');
  if (!lista) return;
  const cenas = _getCenas();
  lista.innerHTML = '';

  if (cenas.length === 0) {
    if (vazio) vazio.style.display = 'block';
    return;
  }
  if (vazio) vazio.style.display = 'none';

  cenas.forEach(cena => {
    const card = document.createElement('div');
    card.className = 'cena-card' + (cena.id === cenaAtualId ? ' active-scene' : '');

    if (cena.thumb) {
      const img = document.createElement('img');
      img.src = cena.thumb; img.className = 'cena-thumb';
      img.title = `Carregar "${cena.nome}"`; img.onclick = () => carregarCena(cena.id);
      card.appendChild(img);
    } else {
      const ph = document.createElement('div');
      ph.className = 'cena-thumb-placeholder'; ph.textContent = '🗺';
      ph.title = `Carregar "${cena.nome}"`; ph.onclick = () => carregarCena(cena.id);
      card.appendChild(ph);
    }

    const span = document.createElement('span');
    span.className = 'cena-card-name'; span.textContent = cena.nome;
    span.title = 'Clique para carregar'; span.onclick = () => carregarCena(cena.id);
    card.appendChild(span);

    const actions = document.createElement('div');
    actions.className = 'cena-card-actions';

    [
      ['🔄', 'Sobrescrever com estado atual', e => { e.stopPropagation(); _sobreescreverCena(cena.id); }],
      ['✏️', 'Renomear',                       e => { e.stopPropagation(); renomearCena(cena.id); }],
      ['🗑',  'Excluir',                         e => { e.stopPropagation(); excluirCena(cena.id); }],
    ].forEach(([txt, title, fn]) => {
      const b = document.createElement('button');
      b.className = 'btn btn-sm'; b.textContent = txt; b.title = title;
      b.style.cssText = 'padding:0.1rem 0.3rem;' + (txt==='🗑' ? 'color:var(--danger,#e74c3c);' : '');
      b.onclick = fn;
      actions.appendChild(b);
    });

    card.appendChild(actions);
    lista.appendChild(card);
  });
}
// ══════════════════════════════════════════════════════════
