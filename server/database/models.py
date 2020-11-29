from .db import db

class Student(db.Document):
    # id = db.IntField(unique=True)
    name = db.StringField(max_length=60, required=True)
    email = db.StringField(max_length=60, required=True)
    age = db.IntField(max_length=60, required=True)
    grade = db.StringField(max_length=60, required=True)
    number = db.StringField(max_length=60, required=True)
    address = db.StringField(max_length=60, required=True)