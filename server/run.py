from flask import Flask, jsonify, request, Response, render_template
from flask_cors import CORS
from flask_bootstrap import Bootstrap
from database.db import initialize_db
from database.models import Student
import json

bootstrap = Bootstrap()

app = Flask(__name__)
CORS(app)
bootstrap.init_app(app)

app.config['MONGODB_SETTINGS'] = {
    'host': 'mongodb://localhost/students'
}
initialize_db(app)

@app.route('/')
@app.route('/students')
def get_students():
    students = json.loads(Student.objects().to_json())
    return render_template("datatable.html", data=students)

@app.route('/students/get')
def get_all_students():
    students = jsonify(json.loads(Student.objects().to_json()))
    students.headers.add('Access-Control-Allow-Origin', '*')
    return students, 200
    
@app.route('/students', methods=['POST'])
def add_student():
    body = request.get_json()
    student = Student(**body).save()
    id = student.id
    return {'id': str(id)}, 200
    
@app.route('/students/<id>', methods=['PUT'])
def update_student(id):
    body = request.get_json()
    Student.objects().get(id=id).update(**body)
    return "updated", 200
    
@app.route('/students/<id>', methods=['DELETE'])
def delete_student(id):
    Student.objects().get(id=id).delete()
    return "Deleted", 200

app.run()