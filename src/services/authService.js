import http from "./httpService";
import jwtDecode from "jwt-decode";
import httpService from "./httpService";

const endpoint = "/auth";
const tokenKey = "token";
httpService.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(endpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    const user = jwtDecode(jwt);
    return user;
  } catch (error) {
    return null;
  }
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
