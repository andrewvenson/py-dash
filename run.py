# Entry Point into our app
from blueprints import app

# Allows you to run our app from this file with python directly
if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)

