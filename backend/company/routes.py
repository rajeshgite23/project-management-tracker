from flask import Blueprint, request, jsonify
from flasgger.utils import swag_from
from utils import insert_company_data, delete_company_data, get_one_company_data, get_all_company_data

company_bp = Blueprint("company", __name__, url_prefix="/api/v1.0/market/company")


@swag_from("templates/register_company.yml")
@company_bp.route('/register', methods=['POST'])
def register_company():
    company_data = request.get_json()
    mandatory_keys = {'C_CODE', 'C_NAME', 'C_CEO', 'C_TURNOVER', 'C_WEBSITE', 'C_EXCHANGE'}
    if len(set(company_data).symmetric_difference(mandatory_keys)) != 0:
        return {"message": f"Input Json accept only these keys and all are mandatory: {mandatory_keys}"}
    if company_data['C_TURNOVER'] < 100000000:
        return {"message": f"Minimum Turnover required to register a company is 10 Cr."}
    company_data['C_CODE'] = company_data['C_CODE'].upper()
    return jsonify(insert_company_data(company_data))


@swag_from("templates/get_one_company_details.yml")
@company_bp.route('/info/<companycode>')
def fetch_one_company_details(companycode):
    companycode = companycode.upper()
    return jsonify(get_one_company_data(companycode))


@swag_from("templates/get_all_company_details.yml")
@company_bp.route('/getall')
def fetch_all_company_details():
    return jsonify(get_all_company_data())


@swag_from("templates/delete_company.yml")
@company_bp.route('/delete/<companycode>', methods=['DELETE'])
def delete_company(companycode):
    companycode = companycode.upper()
    return jsonify(delete_company_data(companycode))
