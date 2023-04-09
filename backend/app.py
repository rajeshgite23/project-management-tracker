from flask import Flask
from flasgger import Swagger
from company.routes import company_bp
from stocks.routes import stock_bp
from flask_cors import CORS

application = Flask(__name__)
CORS(application)

application.config['SWAGGER'] = {
    'title': 'E-Stock-Market API Documentation',
}
swagger = Swagger(application)

# For Development ; uncomment below line and comment production lines
# application.config.from_object("config.DevelopmentConfig")

# For Production.
application.config.from_object("config.ProductionConfig")

application.register_blueprint(company_bp)
application.register_blueprint(stock_bp)
