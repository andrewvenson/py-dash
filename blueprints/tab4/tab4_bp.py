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
tab4_bp = Blueprint('tab4_bp', __name__,
    template_folder='templates',
    static_folder='static/tab4')


# Dash Blueprint Routes
@tab4_bp.route('/')
def index():
    
    return render_template('tab4/tab4.html')