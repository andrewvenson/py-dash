##Make sure python is installed
##Clone project to directory of choice

1. cd into our project directory

2. Run the following command to install virtualenv
	pip install virtualenv
	or
	pip3 install virtualenv

3. Then run the following command to create our virtual environement
	virtualenv env
	
4. Run the following command to activate our virtual environment
	For Windows:
		env\Scripts\activate
	For macOS/Linux:
		source env/bin/activate
		
5. Run the following command to install all of our dependencies from our requirments.txt file 
	pip install -r requirements.txt 
	or
	pip3 install -r requirements.txt

6. Set up our Flask ENV and APP variables
	For Windows:
		set FLASK_APP=run.py
		set FLASK_ENV=development

	For Mac os/linux
		export FLASK_APP=run.py
		export FLASK_ENV=development

7. Run the following command to run our application on localhost
	flask run

8. Navigate to browser of choice and enter the following
	localhost:5000
	or
	127.0.0.1:5000

## This is a basic flask blueprint project structure. 
## The application is modularized so we can work on different components of the frontend and backend as a team at the same time.
