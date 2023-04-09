import {useState} from 'react';
import axios from 'axios';

export function AddStockPrice(props){

    const [ccode, setCompanyCode] = useState("");
    const [sprice, setStockPrice] = useState(0);

    const handleCompanyCode = (event)=>{
        setCompanyCode(event.target.value)
    }
    const handleStockPrice = (event)=>{
        setStockPrice(event.target.value)
    }

    const addStockPrice = () => {
        let data = {
            "S_PRICE": parseInt(sprice)
        }
        if (ccode !== "")
        {
            let api_url = props.url+"/api/v1.0/market/stock/add/"+ccode
            axios.post(api_url, data)
            .then(response => {
                {props.showAlert(response.data.message, "info")};
             })
            .catch((error) => {
                console.log(error)
                })
        }
        else
        {
            {props.showAlert("All Fields are Mandatory", "info")};
        }
    }

    return(
        <div className="container" style={{color: props.mode==='dark'?'white':'#042743'}}>
            <h3 className="my-3">Add a Stock Price</h3>
            <div className="row g-3 my-3">
              <div className="col-md-3">
                <label htmlFor="inputCompanyCode" className="form-label">Company Code</label>
                <input type="text" value={ccode} onChange={handleCompanyCode} className="form-control" id="inputCompanyCode" placeholder="IIHT"/>
              </div>
              <div className="col-md-3">
                <label htmlFor="inputStockPrice" className="form-label">Stock Price</label>
                <input type="number" value={sprice} onChange={handleStockPrice} className="form-control" id="inputStockPrice" placeholder="CEO Name"/>
              </div>
            </div>
            <div className="row g-3 my-3">
                <div className="col-md-3">
                    <button className="btn btn-primary my-4" onClick={addStockPrice}>Add Stock Price</button>
                </div>
             </div>
        </div>
    )
}