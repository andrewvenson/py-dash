# Python defines two types of packages, regular packages and namespace packages.
# Regular packages are traditional packages as they existed in Python 3.2 and earlier.
# A regular package is typically implemented as a directory containing an __init__.py file. 
# When a regular package is imported, this __init__.py file is implicitly executed, and the
# objects it defines are bound to names in the package’s namespace. The __init__.py file can 
# contain the same Python code that any other module can contain, and Python will add some
# additional attributes to the module when it is imported.
# The presented is the python documenation on regular packages in regards to this __init__.py file
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Set app instance
app = Flask(__name__)

# Set app configurations
app.config['SECRET_KEY'] = 'acb5370fa0e0adf3e1162c4ec3e47'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://poot:Hooper33!@@127.0.0.1/pyvid'

# Create Db instance of our app
db = SQLAlchemy(app)

# import blueprint
from blueprints.dash.dash_bp import dash_bp
from blueprints.tab2.tab2_bp import tab2_bp
from blueprints.tab3.tab3_bp import tab3_bp



# Register Blueprints
app.register_blueprint(dash_bp)
app.register_blueprint(tab2_bp)
app.register_blueprint(tab3_bp)



