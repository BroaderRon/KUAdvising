'''
Author: KUAdvising Team
Filename: app.py
Purpose: provide a backend for our program all of the routes for our api will be stored here
'''
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

#TABLES
class Student(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100))
  aid = db.Column(db.Integer())

  def __init__(self,name,aid):
    self.name = name
    self.aid = aid

class Advisor(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  Name = db.Column(db.String(100))

  def __init__(self,Name):
    self.name = Name

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
  Dept = db.Column(db.String(100), primary_key=True)
  CourseNum = db.Column(db.Integer,primary_key=True)
  Name = db.Column(db.String(100))
  Cat = db.Column(db.String(100))

  def __init__(self,  Dept, CourseNum, Name):
    self.Dept= Dept
    self.CourseNum = CourseNum
    self.Name = Name

class Enroll(db.Model):
  sid = db.Column(db.Integer,primary_key=True)
  Dept = db.Column(db.String(100), primary_key=True)
  CourseNum = db.Column(db.Integer, primary_key=True)
  Semester = db.Column(db.String(100))
  Grade = db.Column(db.String(3))
  Cat = db.Column(db.String(10))

  def __init__(self, sid, Dept, CourseNum, Semester, Grade, Cat):
    self.sid = sid
    self.Dept= Dept
    self.CourseNum = CourseNum
    self.Semester = Semester
    self.Grade = Grade
    self.Cat = Cat

#SCHEMAS
class CourseSchema(ma.Schema):
  class Meta:
    fields = ('Dept', 'CourseNum', 'Name')

class AdvisorSchema(ma.Schema):
  class Meta:
    fields = ('id','Name')

class StudentSchema(ma.Schema):
  class Meta:
    fields = ('id','name','aid')

class LogSchema(ma.Schema):
  class Meta:
    fields = ('id','date','sid','info')

class EnrollSchema(ma.Schema):
  class Meta:
    fields = ( 'sid', 'Dept', 'CourseNum', 'Semester', 'Grade', 'Cat')

#INITALIZING DB
db.create_all()

# Init schema
course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

student_schema = StudentSchema()
students_schema = StudentSchema(many=True)

log_schema = LogSchema()
logs_schema = LogSchema(many=True)

enroll_schema = EnrollSchema()
enrolled_schema = EnrollSchema(many=True)

advisor_schema = AdvisorSchema()
advisors_schema = AdvisorSchema(many=True)

  ################################################
            #####  START Course ########
      ##### SCHEMA = (Dept, CourseNum, Name)######

# Create a course
@app.route('/course', methods=['POST'])
def add_Course():
  dept = request.json['Dept']
  CourseNum = request.json['CourseNum']
  Name = request.json['Name']

  new_Course = Course(dept, CourseNum, Name)

  db.session.add(new_Course)
  db.session.commit()

  return course_schema.jsonify(new_Course)

#get all courses
@app.route('/course', methods=['GET'])
def get_Courses():
  all_courses = Course.query.all()
  result = courses_schema.dump(all_courses)
  return jsonify(result)

#get certain courses
@app.route('/course/<Dept>/<CourseNum>', methods=['GET'])
def get_course(Dept,CourseNum):
  courses = Course.query.get((Dept,CourseNum))
  return course_schema.jsonify(courses)

# Update a course
@app.route('/course/<KDept>/<KCourseNum>', methods=['PUT'])
def update_Course(KDept,KCourseNum):
  course = Course.query.get((KDept,KCourseNum))
  Dept = request.json['Dept']
  CourseNum = request.json['CourseNum']
  Name = request.json['Name']

  course.Dept = Dept
  course.Name = Name
  course.CourseNum = CourseNum

  db.session.commit()

  return course_schema.jsonify(course)


  ################################################
            #####  START STUDENTS ########
      ##### SCHEMA = ('id','name','aid')######

#create a new student
@app.route('/student', methods=['POST'])
def createStudent():
  name = request.json['Name']
  aid = request.json['aid']

  newStudent = Student(name,aid)

  db.session.add(newStudent)
  db.session.commit()

  return student_schema.jsonify(newStudent)

#get all students
@app.route('/student', methods=['GET'])
def getstudents():
  allStudents = Student.query.all()
  result = students_schema.dump(allStudents)
  return jsonify(result)

#get a certain student
@app.route('/student/<id>', methods=['GET'])
def getstudent(id):
  student = Student.query.get(id)
  return student_schema.jsonify(student)

##update a student
@app.route('/student/<id>', methods=['PUT'])
def update_Student(id):
  stu = Student.query.get(id)
  name = request.json['Name']
  aid = request.json['aid']

  stu.name = name
  stu.aid = aid

  db.session.commit()
  return student_schema.jsonify(stu)

  ################################################
            #####  START LOG ########
      ##### SCHEMA = ('id','date','sid','info')######
#create log      
@app.route('/log',methods=['POST'])
def make_log():
  date = request.json['date']
  sid = request.json['sid']
  info = request.json['info']
  newLog = Log(date,sid,info)

  db.session.add(newLog)
  db.session.commit()

  return log_schema.jsonify(newLog)

#get all logs
@app.route('/log', methods=['GET'])
def get_log():
  all_logs = Log.query.all()
  result = logs_schema.dump(all_logs)
  return jsonify(result)
#get all of a students log
@app.route('/log/<sid>', methods=['GET'])
def get_logs(sid):
  courses = Log.query.filter(Log.sid == sid)
  return logs_schema.jsonify(courses)


                      ################################################
                                    #####  START Enroll ########
      ##### SCHEMA = ( 'sid', 'Dept', 'CourseNum', 'Semester', 'Grade', 'Cat')###

# Create a new enroll entry
@app.route('/enroll', methods=['POST'])
def add_enroll():
  exists = db.session.query(db.exists().where((Course.CourseNum ==request.json['CourseNum'])and(Course.Dept == request.json['Dept']))).scalar()
  if exists:
    sid = request.json['sid']
    Dept = request.json['Dept']
    CourseNum = request.json['CourseNum']
    Semester = request.json['Semester']
    Grade = request.json['Grade']
    Cat = request.json['Cat']

    Enrolling = Enroll(sid,Dept,CourseNum,Semester,Grade,Cat)

    db.session.add(Enrolling)
    db.session.commit()
    retT = {"RESULT": "TRUE"}
    return jsonify(retT)
  retF= {"RESULT":"FALSE"}
  return jsonify(retF)

#get all enroll entrys
@app.route('/enroll', methods =['GET'])
def get_enrolled():
  enrolled = Enroll.query.all()
  result = enrolled_schema.dump(enrolled)
  return jsonify(result)

#get a specific entry
@app.route('/enroll/<sid>/<Dept>/<CourseNum>', methods=['GET'])
def get_Cenrolled(sid,Dept,CourseNum):
  courses = Enroll.query.get((sid,Dept,CourseNum))
  return enroll_schema.jsonify(courses)
  
#get all enroll entry for a student
@app.route('/enroll/<sid>', methods=['GET'])
def get_Senrolled(sid):
  courses = Enroll.query.filter(Enroll.sid == sid)
  return enrolled_schema.jsonify(courses)
 
 #update a enroll entry
@app.route('/enroll/<sid>/<KDept>/<KCourseNum>', methods=['PUT'])
def update_Enroll(sid,KDept,KCourseNum):
  exists = db.session.query(db.exists().where((Course.CourseNum ==request.json['CourseNum'])and(Course.Dept == request.json['Dept']))).scalar()
  if exists:
    enrollUP = Enroll.query.get((sid,KDept,KCourseNum))
    sid = request.json['sid']
    Dept = request.json['Dept']
    CourseNum = request.json['CourseNum']
    Semester = request.json['Semester']
    Grade = request.json['Grade']
    Cat = request.json['Cat']

    enrollUP.sid = sid
    enrollUP.Dept = Dept
    enrollUP.CourseNum = CourseNum
    enrollUP.Semester = Semester
    enrollUP.Grade = Grade
    enrollUP.Cat = Cat
    db.session.commit()
    retT = {"RESULT": "TRUE"}
    return jsonify(retT)
  retF= {"RESULT":"FALSE"}
  return jsonify(retF)
  
if __name__ == '__main__':
    app.run(debug=True)
