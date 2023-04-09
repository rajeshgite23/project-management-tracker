export function About(props){
    let myStyle = {
        color: props.mode==='dark'?'white':'#042743',
        backgroundColor: props.mode ==='dark'?'rgb(36, 74, 104)':'white'
    }
    return(
     <div className="container my-3" style={{color: props.mode==='dark'?'white':'#042743'}}>
        <h2>About EStock Market</h2>
        <p>E-StockMarket Application is a Restful Microservice application,
        where it allows users to manage the stocks like create, view stock price details and company details</p>
        <div className="accordion" id="accordionExample">
          <div className="accordion-item" style={myStyle}>
            <h2 className="accordion-header" id="headingOne">
              <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                Get End Points
              </button>
            </h2>
            <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div className="accordion-body" style={myStyle}>
                <strong> GET </strong> "/api/v1.0/market/stock/get/companycode/startdate/enddate"
                <br/>
                <strong> GET </strong> "/api/v1.0/market/company/getall"
              </div>
            </div>
          </div>
          <div className="accordion-item" style={myStyle}>
            <h2 className="accordion-header" id="headingTwo">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                Post End Points
              </button>
            </h2>
            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong>POST</strong> "/api/v1.0/market/company/register"
                <br/>
                <strong>POST</strong>  "/api/v1.0/market/stock/add/companycode"
              </div>
            </div>
          </div>
          <div className="accordion-item" style={myStyle}>
            <h2 className="accordion-header" id="headingThree">
              <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                Delete End Points
              </button>
            </h2>
            <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
              <div className="accordion-body">
                <strong> DELETE </strong > "/api/v1.0/market/company/delete/companycode"
              </div>
            </div>
          </div>
        </div>
    </div>
    )
}