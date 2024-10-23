import { useEffect, useState } from "react";
import checkCookie from "./components/checkCookie";
import IsLoggedInComponent from "./components/isLoggedIn";
function App() {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const handleLogin = async () => {
      window.location.href = "http://localhost:3001/auth";
   };
   const handleLogout = async () => {
      const deleteCookie = (name) => {
         document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      };
      deleteCookie("access_token");
      deleteCookie("id_token");
      setIsLoggedIn(false);
   };
   useEffect(() => {
      if (checkCookie("access_token") && checkCookie("id_token")) {
         setIsLoggedIn(true);
      }
   }, []);

   return (
      <>
         {isLoggedIn ? (
            <button onClick={handleLogout}>Logout</button>
         ) : (
            <button onClick={handleLogin}>Login</button>
         )}
         {isLoggedIn ? <IsLoggedInComponent /> : <p>logged out</p>}
      </>
   );
}

export default App;
