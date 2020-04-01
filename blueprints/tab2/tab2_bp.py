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
tab2_bp = Blueprint('tab2_bp', __name__,
    template_folder='templates',
    static_folder='static/tab2')


# Dash Blueprint Routes
@tab2_bp.route('/')
def index():
    
    return render_template('tab2/tab2.html')