const USERS_KEY = 'sf-capacita-users';
const SESSION_KEY = 'sf-capacita-session';

export function getUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
  } catch {
    return [];
  }
}

async function sha256(text) {
  const data = new TextEncoder().encode(text);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function registerUser({ fullName, dni, email, password }) {
  const normalizedEmail = email.trim().toLowerCase();
  const username = normalizedEmail.split('@')[0];
  const users = getUsers();
  if (users.some(u => u.email === normalizedEmail)) {
    throw new Error('Ese correo institucional ya se encuentra registrado.');
  }
  if (users.some(u => u.username === username)) {
    throw new Error('El usuario generado ya se encuentra registrado.');
  }
  const passwordHash = await sha256(password);
  const user = { id: crypto.randomUUID(), fullName: fullName.trim(), dni: dni.trim(), email: normalizedEmail, username, passwordHash };
  localStorage.setItem(USERS_KEY, JSON.stringify([...users, user]));
  return user;
}

export async function loginUser(username, password) {
  const normalized = username.trim().toLowerCase();
  const hash = await sha256(password);
  const user = getUsers().find(u => u.username === normalized && u.passwordHash === hash);
  if (!user) throw new Error('Usuario o contraseña incorrectos.');
  localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id }));
  return user;
}

export function getCurrentUser() {
  try {
    const session = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (!session) return null;
    return getUsers().find(u => u.id === session.userId) || null;
  } catch {
    return null;
  }
}

export function logoutUser() {
  localStorage.removeItem(SESSION_KEY);
}
