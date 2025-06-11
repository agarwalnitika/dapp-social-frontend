// lib/auth.ts

export function setToken(token: string) {
  if (typeof window === "undefined") return null;
  localStorage.setItem("token", token);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function removeToken() {
  if (typeof window === "undefined") return null;
  localStorage.removeItem("token");
}

export function isLoggedIn(): boolean {
  return !!getToken();
}
