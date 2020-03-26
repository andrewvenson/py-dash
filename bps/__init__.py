from flask import Flask
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__, instance_relative_config=True)
app.config['SECRET_KEY'] = 'acb5370fa0e0adf3e1162c4ec3e47'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://poot:Hooper33!@@127.0.0.1/pyvid'
db = SQLAlchemy(app)

from bps.dash.dash_bp import dash_bp


app.register_blueprint(dash_bp)

