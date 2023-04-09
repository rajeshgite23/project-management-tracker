import {useState} from 'react';

export function CompanyPricesByDate(props){
    const [ccode, setCCode] = useState("");
    const [sdate, setStartDate] = useState(0);
    const [edate, setEndDate] = useState(0);
    const [prices, setPrices] = useState([]);
    const [minprice, setminPrice] = useState();
    const [maxprice, setmaxPrice] = useState();
    const [avgprice, setavgPrice] = useState();

    const handleCompanyCode = (event)=>{
        setCCode(event.target.value)
    }

    const handleStartDate = (event)=>{
        setStartDate(event.target.value)
    }

    const handleEndDate = (event)=>{
        setEndDate(event.target.value)
    }

    const getCompanyStockPricesByDate = async () =>{
        if (sdate !== 0 && edate !==0 && ccode !== "" )
        {
            let converted_sdate = sdate.replaceAll('-','');
            let converted_edate = edate.replaceAll('-','');
            let url = props.url+"/api/v1.0/market/stock/get/"+ccode+"/"+converted_sdate+"/"+converted_edate;
            const response = await fetch(url)
            let data = await response.json()
            if (data.prices)
            {
                setPrices(data.prices)
                setminPrice(data.min_price)
                setmaxPrice(data.max_price)
                setavgPrice(data.average_price)
            }
            else
            {
                {props.showAlert(data.message, "info")};
            }
        }
        else
        {
            {props.showAlert("All fields are mandatory", "info")}
        }
    }

    return(
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h3 className="my-3">Get Company Stock Prices By Date</h3>
            <div className="row g-3 my-3">
              <div className="col-md-3">
                <label htmlFor="inputCompanyCode" className="form-label">Company Code</label>
                <input type="text" value={ccode} onChange={handleCompanyCode} className="form-control" id="inputCompanyCode" placeholder="IIHT"/>
              </div>
              <div className="col-md-3">
                <label htmlFor="inputStartDate" className="form-label">Start Date</label>
                <input type="date" value={sdate} onChange={handleStartDate} className="form-control" id="inputStartDate"/>
              </div>
              <div className="col-md-3">
                <label htmlFor="inputEndDate" className="form-label">End Date</label>
                <input type="date" value={edate} onChange={handleEndDate} className="form-control" id="inputEndDate"/>
              </div>
              <div className="col-md-3">
                <button className="btn btn-primary my-4" onClick={getCompanyStockPricesByDate}>Submit</button>
              </div>
            </div>
             <div className="table-responsive-sm">
                    <table className="table table-striped table-{props.mode}  my-3 caption-top">
                    <caption className={`text-${props.mode==='light'?'dark':'light'}`}>{ccode} -Stock Prices by Date</caption>
                      <thead>
                        <tr className={`text-${props.mode==='light'?'dark':'light'}`}>
                          <th scope="col">#</th>
                          <th scope="col">Date</th>
                          <th scope="col">Time</th>
                          <th scope="col">Price</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {prices.map(price => (
                                    <tr key={price.idx} >
                                      <th className={`text-${props.mode==='light'?'dark':'light'}`}scope="row">{price.idx}</th>
                                      <td className={`text-${props.mode==='light'?'dark':'light'}`}>{price.date}</td>
                                      <td className={`text-${props.mode==='light'?'dark':'light'}`}>{price.time}</td>
                                      <td className={`text-${props.mode==='light'?'dark':'light'}`}>{price.stock_price}</td>
                                    </tr>
                                 ))}
                      </tbody>
                    </table>
             </div>
             <div className="table-responsive-sm">
                    <table className="table table-striped table-{props.mode}  my-3">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Amount</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                            <tr className="table-primary">
                              <th>Max Price</th>
                              <td>{maxprice}</td>
                            </tr>
                            <tr className="table-success">
                              <th>Min Price</th>
                              <td>{minprice}</td>
                            </tr>
                            <tr className="table-secondary">
                              <th>Average Price</th>
                              <td>{avgprice}</td>
                            </tr>
                      </tbody>
                    </table>
             </div>
        </div>
    )
}