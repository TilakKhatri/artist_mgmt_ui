const TOKEN_KEY: string = "token";
const USER_DATA_KEY: string = "auth_user";

interface ISetUserLoginProps {
  userData: any;
  token: string;
}

export function getToken() {
  if (typeof localStorage === "undefined") {
    return undefined;
  }
  const localStorageToken = localStorage.getItem(TOKEN_KEY);
  const sessionStorageToken = sessionStorage.getItem(TOKEN_KEY);

  if (localStorageToken) return localStorageToken;
  if (sessionStorageToken) return sessionStorageToken;
  return null;
}

export function setUserLogin(props: ISetUserLoginProps) {
  const { userData, token } = props;
  console.log("props", props);
  localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  sessionStorage.setItem(TOKEN_KEY, token);
  sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  sessionStorage.setItem(TOKEN_KEY, token);
}

export function getUserData() {
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    const localStorageData = localStorage.getItem(USER_DATA_KEY);
    const sessionStorageData = sessionStorage.getItem(USER_DATA_KEY);
    console.log(localStorageData, sessionStorageData);
    try {
      if (localStorageData) return JSON.parse(localStorageData);
      if (sessionStorageData) return JSON.parse(sessionStorageData);
    } catch {
      return null;
    }
  }

  return undefined;
}

export function isUserLogin() {
  if (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  ) {
    const localStorageToken = localStorage.getItem(TOKEN_KEY);
    const sessionStorageToken = sessionStorage.getItem(TOKEN_KEY);
    const userData = getUserData();

    if ((localStorageToken || sessionStorageToken) && userData) return true;
    return false;
  }
}

export function resetUserLogin() {
  const userData = getUserData();
  if (userData) {
    localStorage.clear();
    sessionStorage.clear();
  }
}

export function setUserData(userData: object) {
  if (!userData) return;

  const localStorageUserData = localStorage.getItem(USER_DATA_KEY);
  const sessionStorageUserData = sessionStorage.getItem(USER_DATA_KEY);

  if (localStorageUserData) {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    return;
  }
  if (sessionStorageUserData) {
    sessionStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
  }
}
