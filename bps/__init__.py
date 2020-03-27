from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Set app instance
app = Flask(__name__)

# Set app configurations
app.config['SECRET_KEY'] = 'acb5370fa0e0adf3e1162c4ec3e47'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://poot:Hooper33!@@127.0.0.1/pyvid'

# Db our app
db = SQLAlchemy(app)

# import blueprint
from bps.dash.dash_bp import dash_bp

# Register Blueprint
app.register_blueprint(dash_bp)

