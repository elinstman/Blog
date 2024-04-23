// import { Link } from "react-router-dom";

const Header = () => {
    return (
        <>
        <nav classNameName="navbar navbar-expand-lg navbar-light bg-light fixed-top p-0">
          <div classNameName="header-container d-flex align-items-center justify-content-center ">
            <div classNameName="logo">
              <Link to="/" classNameName="link">
                <b>LOGGA</b>
              </Link>
            </div>
             <div>
              <Link classNameName="nav-link" to="#">
                Logga in
              </Link>
              </div>
              </div>
        </nav>
      </>
    )
}

export default Header;