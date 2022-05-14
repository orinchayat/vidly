import http from "./httpService";

export function register(user) {
  return http.post("/users", {
    password: user.password,
    name: user.name,
    email: user.email,
  });
}
