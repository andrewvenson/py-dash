from flask import Blueprint, render_template, url_for, current_app
from .models import Data
from .. import db

dash_bp = Blueprint('dash_bp', __name__,
    template_folder='templates',
    static_folder='static/dash')

@dash_bp.route('/dash')
@dash_bp.route('/')
def index():
    print(url_for('dash_bp.static', filename='dash.css'))
    return render_template('dash/dash.html')