export function isLogined() {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}

export function saveCookie(cookieName,cookieValue,cookieDates){
	var d = new Date();
	d.setDate(d.getDate()+cookieDates);
	document.cookie = cookieName+"="+cookieValue+";expires="+d.toGMTString();
}
export function getCookie(cookieName){
	var cookieStr = unescape(document.cookie);
	var arr = cookieStr.split("; ");
	var cookieValue = "";
	for(var i=0;i<arr.length;i++){
		var temp = arr[i].split("=");
		if(temp[0]==cookieName){
			cookieValue = temp[1];
			break;
		}
	}
	return cookieValue;
}
export function removeCookie(cookieName) {
    document.cookie=encodeURIComponent(cookieName)+"=; expires=" + new Date();
}

export function getToken() {
  return localStorage.getItem("token");
}

export function setToken(v) {
  return localStorage.setItem("token",v);
}
export function removeToken(v){
	return localStorage.removeItem(v);
}

export const serverUrl = "http://localhost:3000/";
