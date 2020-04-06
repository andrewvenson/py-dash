# Flask imports
from flask import Blueprint, render_template, url_for, current_app
# Import db model from models file
# from .models import Data
# Import db instance of our app
from .. import db
import json
import requests
import urllib.request as request

# Dash Blueprint Creation
tab3_bp = Blueprint('tab3_bp', __name__,
    template_folder='templates',
    static_folder='static/tab3')


# Dash Blueprint Routes
@tab3_bp.route('/tab3')
def index():
    
    return render_template('tab3/tab3.html')