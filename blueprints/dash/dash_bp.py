# Flask imports
from flask import Blueprint, render_template, url_for, current_app
# Import db model from models file
from .models import Data
# Import db instance of our app
from .. import db
import json
import requests
import urllib.request as request

# Dash Blueprint Creation
dash_bp = Blueprint('dash_bp', __name__,
    template_folder='templates',
    static_folder='static/dash')

# Dash Blueprint Routes
@dash_bp.route('/dash')
@dash_bp.route('/')
def index():
    # Covid all/summary Urls
    getUrlAll = "https://api.covid19api.com/all"
    getUrlSum = "https://api.covid19api.com/summary"

    # response_all = requests.get(getUrlAll)
    response_sum = requests.get(getUrlSum)
   
    # all_data = json.loads(response_all.text)
    sum_data = json.loads(response_sum.text)

    # return html template to browser with covid summary data
    return render_template('dash/dash.html', data = sum_data)