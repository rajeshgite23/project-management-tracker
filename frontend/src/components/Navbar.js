import { Link } from "react-router-dom";

export function Navbar(props) {
    return(
        <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
          <div className="container-fluid">
            <Link className="navbar-brand" to="/"><img src="stock_market_image.jpg" height="30" width="40" alt="EStockMarketLogo"/></Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/registerCompany">Register Company</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/addStockPrice">Add a Stock Price</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/getCompanyDetails">Get Company Details</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/getCompanyStockDetails">Get Company Stocks Details</Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/about">About EStock</Link>
                    </li>
                  </ul>
                 <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'}`}>
                     <input className="form-check-input" onClick={props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                     <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark Mode</label>
                 </div>
            </div>
          </div>
        </nav>
    )
}