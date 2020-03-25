from flask import Flask
from dash.dash_bp import dash_bp

app = Flask(__name__)

app.register_blueprint(dash_bp, url_prefix="")


