from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy 
from flask_marshmallow import Marshmallow 
import os
from flask_cors import CORS


# Init app
app = Flask(__name__)
CORS(app)
basedir = os.path.abspath(os.path.dirname(__file__))
# Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Init db
db = SQLAlchemy(app)
# Init ma
ma = Marshmallow(app)

# Product Class/Model
class Student(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  aid = db.Column(db.Integer())

  def __init__(self,name,aid):
    self.name = name
    self.aid = aid

class Log(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  date = db.Column(db.String(100))
  sid = db.Column(db.Integer)
  info = db.Column(db.String(500))

  def __init__(self,date,sid,info):
    self.date = date
    self.sid = sid
    self.info = info

class Course(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  sid = db.Column(db.Integer)
  Dept = db.Column(db.String(100))
  CourseNum = db.Column(db.Integer)
  Name = db.Column(db.String(100))
  Cat = db.Column(db.String(100))

  def __init__(self, sid,  Dept, CourseNum, Name, Cat):
    self.sid = sid
    self.Dept= Dept
    self.CourseNum = CourseNum
    self.Name = Name
    self.Cat = Cat

# Product Schema
class CourseSchema(ma.Schema):
  class Meta:
    fields = ('id','sid', 'Dept', 'CourseNum', 'Name', 'Cat')

class StudentSchema(ma.Schema):
  class Meta:
    fields = ('id','name','aid')

class LogSchema(ma.Schema):
  class Meta:
    fields = ('id','date','sid','info')


db.create_all()

# Init schema
course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

log_schema = LogSchema()
logs_schema = LogSchema(many=True)

# Create a Product
@app.route('/course', methods=['POST'])
def add_product():
  dept = request.json['Dept']
  CourseNum = request.json['CourseNum']
  Name = request.json['Name']
  Cat = request.json['Cat']
  sid = request.json['sid']

  new_Course = Course(sid,dept, CourseNum, Name, Cat)

  db.session.add(new_Course)
  db.session.commit()

  return course_schema.jsonify(new_Course)

#get all products
@app.route('/course', methods=['GET'])
def get_products():
  all_courses = Course.query.all()
  result = courses_schema.dump(all_courses)
  return jsonify(result)

#get certain student  courses
@app.route('/course/<sid>', methods=['GET'])
def get_product(sid):
  courses = Course.query.get(sid)
  return courses_schema.jsonify(courses)

# Update a Product
@app.route('/course/<id>', methods=['PUT'])
def update_product(id):
  course = Course.query.get(id)
  Dept = request.json['Dept']
  CourseNum = request.json['CourseNum']
  Name = request.json['Name']
  Cat = request.json['Cat']
  sid = request.json['sid']

  course.Dept = Dept
  course.Name = Name
  course.CourseNum = CourseNum
  course.Cat = Cat
  course.sid = sid

  db.session.commit()

  return course_schema.jsonify(course)


  ################################################
            #####  START STUDENTS ########
      ##### SCHEMA = ('id','name','aid')######

@app.route('/student', methods=['POST'])
def createStudent():
  name = request.json['Name']
  aid = request.json['aid']

  newStudent = Student(name,aid)

  db.session.add(newStudent)
  db.session.commit()

  return student_schema.jsonify(newStudent)

@app.route('/student', methods=['GET'])
def getstudents():
  allStudents = Student.query.all()
  result = students_schema.dump(allStudents)
  return jsonify(result)

  #get certain student  courses
@app.route('/student/<id>', methods=['GET'])
def getstudent(id):
  student = Student.query.get(id)
  return student_schema.jsonify(student)



if __name__ == '__main__':
    app.run(debug=True)
