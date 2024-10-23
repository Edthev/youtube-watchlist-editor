export default function checkCookie(name) {
   const cookieArr = document.cookie.split(";");
   for (let cookie of cookieArr) {
      if (cookie.trim().startsWith(name + "=")) {
         return true;
      }
   }
   return false;
}
