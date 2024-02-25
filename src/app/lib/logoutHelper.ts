export function handleLogout(setUser: any) {
  localStorage.removeItem('QLimaxUser');
  setUser(null);
};
