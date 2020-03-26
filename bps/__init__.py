from flask import Flask

app = Flask(__name__)

from bps.dash.dash_bp import dash_bp


app.register_blueprint(dash_bp)

