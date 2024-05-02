import { Link } from "react-router-dom";
import { useVerifiedLogin, useUserName, useHandleLogout } from "../Context/auth.context";

const Header = () => {
 const userName = useUserName();
 const isVerified = useVerifiedLogin();
 const handleLogout = useHandleLogout();



 const logout = () => {
  handleLogout(); 
};
 

    return (
        <>
        {isVerified && (
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0">
          <div className="header-container d-flex align-items-center justify-content-between ">
            <div className="logo">
              <Link to="/" className="logga">
                <b>Elins Blog</b>
              </Link>
            </div>
        
             <div className="header-nav-container">
             <p className="nav-link font-bold">
                Hello, {userName}
              </p>
              <Link className="nav-link" to="/logout" onClick={logout}>
                Logga ut
              </Link>
              </div>
              </div>
        </nav>
        )}
        {!isVerified && (
          <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0">
          <div className="header-container d-flex align-items-center justify-content-between ">
            <div className="logo">
              <Link to="/" className="logga">
                <b>Elins Blog</b>
              </Link>
            </div>
        
             <div className="header-nav-container">
             <Link className="nav-link" to="/register">
                Skapa konto
              </Link>
              <Link className="nav-link" to="/login">
                Logga in
              </Link>
              </div>
              </div>
        </nav> 
        )}
         
      </>
    )
}

export default Header;