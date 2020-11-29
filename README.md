"A simple React datatable with all CRUD operations using Flask as server side script and API." 

#React + Flask

A simple app that includes Flask and React, with MongoDB. Read Setup section to get to start the servers and run the app.

TLDR; for the quick and dirty setup, install your dependencies:

```
pip install -r requirements.txt
pip install virtualenv
virtualenv venv; source venv/bin/activate
npm install -g webpack; npm install
```

Then open one console tabs, change current path to the server folder `cd server` run `python app.py` to start the API server.
Open another terminal tab for react server. run `npm start` to run the local development server.
These steps are explained in more detail later. check Prerequisites and Setup sections below.
You should have MongoDB Shell installed on your local machine to be able to run the db. Navigate to `C:\Program Files\MongoDB\Server\<version>\bin\mongos.exe` and write `use students` to start a new database.

## Prerequisites

You'll need some package managers.

- `npm`
- `pip`
- `venv` or any package/service manager like `conda`/`anaconda`

## Setup

For the backend:

```
virtualenv venv
source venv/bin/activate
pip install -r requirements.txt
```

For the frontend:

If you don't have webpack, install it:

```
npm install -g webpack
```

Then, use `npm` to install the remaining JavaScript dependencies.

```
npm install
```

## Development

The entry point for the app is in `src/index.js`. Editing this file is a good place to start the structure.

The "backend" here is a simple Flask API for major CRUD operations on our frontend components.

added `CORS(app)` snippet to my flask app for handling Cross Origin Resource Sharing (CORS), making cross-origin AJAX possible.

To run the application, follow the steps in the next section.

## Running the app

If you're using a virtualenv, activate it.

```
source venv/bin/activate
```

Then run the Flask app:

```
python app.py
```

## How it works

visit `http://127.0.0.1:3000` or `http://localhost:3000` and you should be able to see the table component created in React.
To add a new student to the list, hist the Add button down to the right of the screen. A form component loads with student model form to fill all necessary student data.

After pressing the 'Send' button, the student should be added to your list. Try refreshing the page and you should see the newly added record now in the table.

Delete student by clicking the red 'D' button in the most right cell of each record.

Update student by clicking the yellow 'E' button next to 'D' button. That should open a new form with the targeted student data preloaded in the form fields. Change desired fields and press 'Send' to save the new student data.

You can sort the table by any field you desire. Students with the same field values (i.e. name, email, ...) will be sorted according to their grades in an ascending order. If the sorting field is the grade itself, students with same grades will be sorted according to their names in an ascending order.
