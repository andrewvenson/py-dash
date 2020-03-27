from flask import Blueprint, render_template, url_for, current_app
from .models import Data
from .. import db
import json
import requests
import urllib.request as request

# Dash Blueprint Creation
dash_bp = Blueprint('dash_bp', __name__,
    template_folder='templates',
    static_folder='static/dash')

# Dash Routes
@dash_bp.route('/dash')
@dash_bp.route('/')
def index():
    getUrlAll = "https://api.covid19api.com/all"

    getUrlSum = "https://api.covid19api.com/summary"

    # response_all = requests.get(getUrlAll)
    response_sum = requests.get(getUrlSum)
    # print(getUrlAll)
    print(getUrlSum)

    # all_data = json.loads(response_all.text)
    sum_data = json.loads(response_sum.text)

    return render_template('dash/dash.html', data = sum_data)