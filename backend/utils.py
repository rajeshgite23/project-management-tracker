import boto3
import logging
from boto3.dynamodb.conditions import Attr, Key

dynamodb = boto3.resource('dynamodb', region_name="eu-west-2")
company_table = dynamodb.Table('CompanyTable')
stock_table = dynamodb.Table('StockTable')


def insert_company_data(data):
    try:
        response = company_table.put_item(Item=data)
        if response['ResponseMetadata']['HTTPStatusCode'] == 200:
            return {"message": "Company has been registered/updated"}
        else:
            return {"message": "Company has NOT been registered/updated"}
    except Exception as e:
        logging.error(e)
        logging.error("Error while inserting data into the CompanyTable")


def insert_company_stock_data(data):
    try:
        c_code = data['C_CODE']
        if check_if_company_exists(c_code):
            response = stock_table.put_item(Item=data)
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                return {"message": "Stock Price has been inserted"}
            else:
                return {"message": "Stock Price did NOT inserted"}
        else:
            return {"message": "Company details not found"}
    except Exception as e:
        logging.error(e)
        logging.error("Error while inserting data into the StockTable")


def check_if_company_exists(c_code):
    try:
        c_code = c_code.upper()
        response = company_table.query(KeyConditionExpression=Key('C_CODE').eq(c_code))
        if response['Count'] == 1:
            return True
        else:
            return False
    except Exception as e:
        logging.error(e)
        logging.error("Error while retrieving the company details")


def delete_company_data(companycode):
    try:
        if check_if_company_exists(companycode):
            response = company_table.delete_item(Key={'C_CODE': companycode})
            if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                return delete_company_stock_data(companycode)
            else:
                return {"message": "Company Details did not deleted"}
        else:
            return {"message": "Company details does not exists"}
    except Exception as e:
        logging.error(e)
        logging.error("Error while deleting the data from the CompanyTable or StockTable")


def delete_company_stock_data(companycode):
    try:
        flag = False
        response = stock_table.query(KeyConditionExpression=Key('C_CODE').eq(companycode))
        if response['Count'] >= 1:
            for i in response['Items']:
                response = stock_table.delete_item(Key={'C_CODE': companycode, 'S_TIMESTAMP': i['S_TIMESTAMP']})
                if response['ResponseMetadata']['HTTPStatusCode'] == 200:
                    flag = True
                else:
                    flag = False
                    break
            if flag:
                return {"message": "Company Data along with Stock Prices has been deleted"}
            else:
                return {"message": "Company Data Deleted but there is some issue while deleting it's Stock Prices"}
        else:
            return {"message": "Company Data has been deleted, Stock Data even does not exists for this Company"}
    except Exception as e:
        logging.error(e)
        logging.error("Error while deleting the Stock prices")


def get_one_company_data(companycode):
    try:
        companycode = companycode.upper()
        response = company_table.query(KeyConditionExpression=Key('C_CODE').eq(companycode))
        if response['Count'] == 1:
            output = response['Items'][0]
            s_data = get_company_latest_stock_price(companycode)
            output['S_PRICE'] = s_data
            return {"details": output}
        else:
            return {"message": "Company Does not Exists"}
    except Exception as e:
        logging.error(e)
        logging.error("Error while getting the data from company or stock table")


def get_all_company_data():
    try:
        response = stock_table.scan()
        if response['Count'] > 0:
            output = {}
            for i in response['Items']:
                output[i["C_CODE"]] = i["S_PRICE"]
            final_output = []
            idx = 0
            for key, val in output.items():
                final_output.append({"idx": idx, "C_Code": key, "Stock_price": val})
                idx += 1
            return {"details": final_output}
        else:
            return {"message": "Stock Prices does not Exists for any Company"}
    except Exception as e:
        logging.error(e)
        logging.error("Error while getting all companies data")


def get_company_latest_stock_price(companycode):
    try:
        latest_stock_price = None
        response = stock_table.query(KeyConditionExpression=Key('C_CODE').eq(companycode))
        if response['Count'] > 0:
            latest_stock_price = response['Items'][-1]['S_PRICE']
        return latest_stock_price
    except Exception as e:
        logging.error(e)
        logging.error("Error while fetching the Stock Price Details")


def get_company_stock_price_list_of_timeframe(companycode, startdate, enddate):
    if check_if_company_exists(companycode):
        try:
            max_price, average_price, total, min_price = 0, 0, 0, 99999999999999999999999.99
            start_date = int(str(startdate) + '000000000000')
            end_date = int(str(enddate) + '235959000000')
            response = stock_table.scan(FilterExpression=Key('C_CODE').eq(companycode)
                                                         & Attr('S_TIMESTAMP').gt(start_date)
                                                         & Attr('S_TIMESTAMP').lt(end_date))
            if response['Count'] > 0:
                items = response['Items']
                response = {"max_price": max_price, "min_price": min_price, "average_price": average_price}
                prices = []
                for idx, i in enumerate(items):
                    date = int(str(i["S_TIMESTAMP"])[:8])
                    time = int(str(i["S_TIMESTAMP"])[8:14])
                    stock_price = float(i["S_PRICE"])
                    if max_price < stock_price:
                        max_price = stock_price
                    if min_price > stock_price:
                        min_price = stock_price
                    total = total + stock_price
                    prices.append({"idx": idx, "date": date, "time": time, "stock_price": i["S_PRICE"]})
                average_price = total / len(items)
                response["max_price"] = max_price
                response["min_price"] = min_price
                response["average_price"] = average_price
                response["prices"] = prices
                return response
            else:
                return {"message": "Stock Price does not exists for this company between provided timestamp"}
        except Exception as e:
            logging.error(e)
    else:
        return {"message": "Company details does  not exists"}
