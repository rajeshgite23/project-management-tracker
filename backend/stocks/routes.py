from flask import Blueprint, request, jsonify
from flasgger.utils import swag_from
from datetime import datetime
from utils import insert_company_stock_data, get_company_stock_price_list_of_timeframe

stock_bp = Blueprint("stock", __name__, url_prefix="/api/v1.0/market/stock")


@swag_from("templates/add_stock.yml")
@stock_bp.route('/add/<companycode>', methods=['POST'])
def add_company_stock(companycode):
    companycode = companycode.upper()
    comp_data = request.get_json()
    now = datetime.now()
    timestamp = int(str(now).replace(":", "").replace(".", "").replace(" ", "").replace("-", ""))
    comp_data['S_TIMESTAMP'] = timestamp
    comp_data['C_CODE'] = companycode
    try:
        int(comp_data['S_PRICE'])
    except Exception as e:
        return {"message": "Data Type of Stock Price is Wrong. Only Integers and Floats are accepted"}
    if comp_data['S_PRICE'] < 0:
        return {"message" : "Stock Price can not be less than zero"}
    comp_data['S_PRICE'] = str(comp_data['S_PRICE'])
    return jsonify(insert_company_stock_data(comp_data))


@swag_from("templates/fetch_stock_price.yml")
@stock_bp.route('/get/<companycode>/<startdate>/<enddate>')
def fetch_company_stock_price_by_company_code(companycode, startdate, enddate):
    companycode = companycode.upper()
    return jsonify(get_company_stock_price_list_of_timeframe(companycode, startdate, enddate))
