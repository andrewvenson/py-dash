from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
db = SQLAlchemy(app)

from bps.dash.dash_bp import dash_bp


app.register_blueprint(dash_bp)

