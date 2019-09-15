import { isObject, isNull, isUndefined } from 'lodash';

export function saveAuthToken(token) {
  localStorage.setItem('token', token);
}

export function getAuthToken() {
  return localStorage.getItem('token');
}

export function removeAuthToken() {
  localStorage.removeItem('token');
}

export function setSideBarOpt(opt) {
  if (isNull(opt) || isUndefined(opt) || !isObject(opt)) {
    return;
  }

  localStorage.setItem('sidebar_opt', JSON.stringify(opt));
}

export function getSideBarOpt() {
  const sidebarOpt = localStorage.getItem('sidebar_opt') || '{}';
  return JSON.parse(sidebarOpt);
}
