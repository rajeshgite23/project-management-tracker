import {useState} from 'react';
import axios from 'axios';

export function RegisterCompany(props){

    const [ccode, setCompanyCode] = useState();
    const [cname, setCompanyName] = useState();
    const [cceo, setCompanyCEO] = useState();
    const [cexchange, setCompanyExchange] = useState();
    const [cturnover, setCompanyTurnover] = useState(0);
    const [cwebsite, setCompanyWebsite] = useState();

    const handleCompanyCode = (event)=>{
        setCompanyCode(event.target.value)
    }
    const handleCompanyCEO = (event)=>{
        setCompanyCEO(event.target.value)
    }
    const handleCompanyExchange = (event)=>{
        setCompanyExchange(event.target.value)
    }
    const handleCompanyTurnover = (event)=>{
        setCompanyTurnover(event.target.value)
    }
    const handleCompanyName = (event)=>{
        setCompanyName(event.target.value)
    }
    const handleCompanyWebsite = (event)=>{
        setCompanyWebsite(event.target.value)
    }

    const registerCompany = () => {
        let data = {
              "C_CEO": cceo,
              "C_CODE": ccode,
              "C_EXCHANGE": cexchange,
              "C_NAME": cname,
              "C_TURNOVER": parseInt(cturnover),
              "C_WEBSITE": cwebsite
        }
        let api_url = props.url+"/api/v1.0/market/company/register";
        axios.post(api_url, data)
        .then(response => {
            {props.showAlert(response.data.message, "info")};
        })
        .catch((error) => {
            console.log(error)
        })
    }

    return(
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h3 className="my-3">Register a Company</h3>
            <div className="row g-3 my-3">
              <div className="col-md-3">
                <label htmlFor="inputCompanyCode" className="form-label">Company Code</label>
                <input type="text" value={ccode} onChange={handleCompanyCode} className="form-control" id="inputCompanyCode" placeholder="IIHT"/>
              </div>
              <div className="col-md-3">
                <label htmlFor="inputCompanyCEO" className="form-label">Company CEO</label>
                <input type="text" value={cceo} onChange={handleCompanyCEO} className="form-control" id="inputCompanyCEO" placeholder="CEO Name"/>
              </div>
              <div className="col-md-3">
                <label htmlFor="inputCompanyExchange" className="form-label">Company Exchange</label>
                <input type="text" value={cexchange} onChange={handleCompanyExchange} className="form-control" id="inputCompanyExchange" placeholder="NSE"/>
              </div>
            </div>
            <div className="row g-3 my-3">
              <div className="col-md-3">
                <label htmlFor="inputCompanyName" className="form-label">Company Name</label>
                <input type="text" value={cname} onChange={handleCompanyName} className="form-control" id="inputCompanyName" placeholder="The IIHT pvt Limited"/>
              </div>
              <div className="col-md-3">
                <label htmlFor="inputCompanyTurnover" className="form-label">Company Turnover</label>
                <input type="number" value={cturnover} onChange={handleCompanyTurnover} className="form-control" id="inputCompanyTurnover" placeholder="1000000000"/>
              </div>
              <div className="col-md-3">
                <label htmlFor="inputCompanyWebsite" className="form-label">Company Website</label>
                <input type="url" value={cwebsite} onChange={handleCompanyWebsite} className="form-control" id="inputCompanyWebsite" placeholder="http://www.iiht.com"/>
              </div>
            </div>
            <div className="row g-3 my-3">
                <div className="col-md-3">
                    <button className="btn btn-primary my-4" onClick={registerCompany} >Register Company</button>
                </div>
             </div>
        </div>
    )
}