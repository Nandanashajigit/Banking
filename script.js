

const LV_USERS_KEY = 'lv_users';    
const LV_SESSION_KEY = 'lv_session';

function lvGetUsers() {
  const raw = localStorage.getItem(LV_USERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

function lvSaveUsers(users) {
  localStorage.setItem(LV_USERS_KEY, JSON.stringify(users));
}

function lvFindUser(email) {
  return lvGetUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
}

function lvRegisterUser(name, email, password) {
  const users = lvGetUsers();
  users.push({
    name: name,
    email: email,
    password: password, 
    balance: 0,
    transactions: [] 
  });
  lvSaveUsers(users);
}

function lvUpdateUser(updatedUser) {
  const users = lvGetUsers().map(u => (u.email === updatedUser.email ? updatedUser : u));
  lvSaveUsers(users);
}

function lvSetSession(email) {
  localStorage.setItem(LV_SESSION_KEY, email);
}

function lvGetSession() {
  return localStorage.getItem(LV_SESSION_KEY);
}

function lvClearSession() {
  localStorage.removeItem(LV_SESSION_KEY);
}

function lvFormatMoney(amount) {
  return '₹' + Number(amount).toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function lvShowError(el, message) {
  el.textContent = message;
}
function lvClearError(el) {
  el.textContent = '';
}