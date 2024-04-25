import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0">
          <div className="header-container d-flex align-items-center justify-content-between ">
            <div className="logo">
              <Link to="/" className="logga">
                <b>Elins Blog</b>
              </Link>
            </div>
        
             <div className="header-nav-container">
             <Link className="nav-link" to="#">
                Skapa konto
              </Link>
              <Link className="nav-link" to="/login">
                Logga in
              </Link>
              </div>
              </div>
        </nav>
      </>
    )
}

export default Header;