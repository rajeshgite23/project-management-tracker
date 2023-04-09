import {useState, useEffect} from 'react';
import axios from 'axios';

export function AllCompanyLatestStockPrice(props){

    const [companyPrices, setCompanyPrices] = useState([]);
    const [output, setOutput] = useState(false);

    const fetchData = () => {
        let api_url = props.url+"/api/v1.0/market/company/getall"
        axios(api_url)
        .then(response => {
            if (response.data.message)
            {
                {props.showAlert("No Details Exists", "info")}
                setOutput(false);
            }
            else
            {
                setCompanyPrices(response.data.details);
                setOutput(true);
            }
        })
        .catch((error) => {
            {props.showAlert("Unable to get the details from backend server", "info")}
        })}

    useEffect(() =>{
        fetchData();
    },[]);

    return(
        <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h3 className="my-3">All Companies and their Latest Stock Prices</h3>
             <div className={`table-responsive-sm text-${props.mode==='light'?'dark':'light'}`}>
                    <table className="table table-striped table-{props.mode}  my-3 caption-top">
                      <caption className={`text-${props.mode==='light'?'dark':'light'}`}>Latest Stock Prices of all Companies</caption>
                      <thead>
                        <tr className={`text-${props.mode==='light'?'dark':'light'}`}>
                          <th scope="col">#</th>
                          <th scope="col">Company Code</th>
                          <th scope="col">Latest Stock Price</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {output && companyPrices.map(data => (
                                <tr key={data.idx}>
                                  <th className={`text-${props.mode==='light'?'dark':'light'}`} scope="row">{data.idx}</th>
                                  <td className={`text-${props.mode==='light'?'dark':'light'}`}>{data.C_Code}</td>
                                  <td className={`text-${props.mode==='light'?'dark':'light'}`}>{data.Stock_price}</td>
                                </tr>
                             ))}
                      </tbody>
                    </table>
             </div>
        </div>
    )
}