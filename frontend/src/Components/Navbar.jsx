const Navbar = () => {
    return (
        <div className="col-md-4 p-3">
        <div className="position-sticky" >
            <div>
          <h4 className="fst-italic">Recent posts</h4>
          <ul className="list-unstyled">
            <li>
              <a className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                <div className="col-lg-8">
                  <h6 className="mb-0">Example blog post title</h6>
                  <small className="text-body-secondary">January 15, 2024</small>
                </div>
              </a>
            </li>
            <li>
              <a className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                <div className="col-lg-8">
                  <h6 className="mb-0">This is another blog post title</h6>
                  <small className="text-body-secondary">January 14, 2024</small>
                </div>
              </a>
            </li>
            <li>
              <a className="d-flex flex-column flex-lg-row gap-3 align-items-start align-items-lg-center py-3 link-body-emphasis text-decoration-none border-top" href="#">
                <svg className="bd-placeholder-img" width="100%" height="96" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false"><rect width="100%" height="100%" fill="#777"></rect></svg>
                <div className="col-lg-8">
                  <h6 className="mb-0">Longer blog post title: This one has multiple lines!</h6>
                  <small className="text-body-secondary">January 13, 2024</small>
                </div>
              </a>
            </li>
          </ul>
        </div>
        </div>
        </div>
    )
}

export default Navbar;