import {useState} from 'react';
import axios from 'axios';

export function GetCompanyDetails(props){

    const [ccode, setCompanyCode] = useState("");
    const [cceo, setCompanyCEO] = useState("");
    const [cexchange, setCompanyExchange] = useState("");
    const [cname, setCompanyName] = useState("");
    const [cturnover, setCompanyTurnover] = useState("");
    const [cwebsite, setCompanyWebsite] = useState("");
    const [sprice, setStockPrice] = useState("");

    const handleCompanyCode = (event)=>{
        setCompanyCode(event.target.value)
    }

    const getCompanyDetails = () => {
        if (ccode !== "")
        {
            let api_url = props.url+"/api/v1.0/market/company/info/"+ccode;
            axios(api_url)
            .then(response => {
           if (response.data.message)
            {
                {props.showAlert("No Details Exists", "info")}
            }
            else
            {
                setCompanyCode(response.data.details.C_CODE);
                setCompanyCEO(response.data.details.C_CEO);
                setCompanyExchange(response.data.details.C_EXCHANGE);
                setCompanyName(response.data.details.C_NAME);
                setCompanyTurnover(response.data.details.C_TURNOVER);
                setCompanyWebsite(response.data.details.C_WEBSITE);
                setStockPrice(response.data.details.S_PRICE);
            }
             })
            .catch((error) => {
                console.log(error)
                })
        }
        else
        {
            {props.showAlert("Company Code is Mandatory", "info")};
        }
    }

    return(
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h3 className="my-3">Get Company Details</h3>
            <div className="row g-3 my-3">
              <div className="col-md-3">
                <label htmlFor="inputCompanyCode" className="form-label">Company Code</label>
                <input type="text" value={ccode} onChange={handleCompanyCode} className="form-control" id="inputCompanyCode" placeholder="IIHT"/>
              </div>
              <div className="col-md-3">
                    <button className="btn btn-primary my-4" onClick={getCompanyDetails}>Get Company Details</button>
              </div>
            </div>
            <div className={`table-responsive-sm text-${props.mode==='light'?'dark':'light'}`}>
                    <table className="table table-striped table-{props.mode}  my-3 caption-top">
                      <caption className={`text-${props.mode==='light'?'dark':'light'}`}>Company Details</caption>
                      <thead>
                        <tr className={`text-${props.mode==='light'?'dark':'light'}`}>
                          <th scope="col">#</th>
                          <th scope="col">Values</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                            <tr>
                              <th className={`text-${props.mode==='light'?'dark':'light'}`} scope="row">Code</th>
                              <td className={`text-${props.mode==='light'?'dark':'light'}`}>{ccode}</td>
                            </tr>
                            <tr>
                              <th className={`text-${props.mode==='light'?'dark':'light'}`} scope="row">Name</th>
                              <td className={`text-${props.mode==='light'?'dark':'light'}`}>{cname}</td>
                            </tr>
                            <tr>
                              <th className={`text-${props.mode==='light'?'dark':'light'}`} scope="row">Turnover</th>
                              <td className={`text-${props.mode==='light'?'dark':'light'}`}>{cturnover}</td>
                            </tr>
                            <tr>
                              <th className={`text-${props.mode==='light'?'dark':'light'}`} scope="row">CEO</th>
                              <td className={`text-${props.mode==='light'?'dark':'light'}`}>{cceo}</td>
                            </tr>
                            <tr>
                              <th className={`text-${props.mode==='light'?'dark':'light'}`} scope="row">Exchange</th>
                              <td className={`text-${props.mode==='light'?'dark':'light'}`}>{cexchange}</td>
                            </tr>
                            <tr>
                              <th className={`text-${props.mode==='light'?'dark':'light'}`} scope="row">Website</th>
                              <td className={`text-${props.mode==='light'?'dark':'light'}`}>{cwebsite}</td>
                            </tr>
                            <tr>
                              <th className={`text-${props.mode==='light'?'dark':'light'}`} scope="row">Latest Stock Price</th>
                              <td className={`text-${props.mode==='light'?'dark':'light'}`}>{sprice}</td>
                            </tr>
                      </tbody>
                    </table>
             </div>
        </div>
    )
}