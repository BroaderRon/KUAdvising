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
class Course(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  sid = db.Column(db.Integer)
  Dept = db.Column(db.String(100)
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

# Init schema
course_schema = CourseSchema()
courses_schema = CourseSchema(many=True)

# Create a Product
@app.route('/course', methods=['POST'])
def add_product():
  dept = request.json['name']
  CourseNum = request.json['description']
  Name = request.json['price']
  Cat = request.json['qty']
  sid = request.json['sid']

  new_Course = Course(sid,Dept, CourseNum, Name, Cat)

  db.session.add(new_Course)
  db.session.commit()

  return course_schema.jsonify(new_Course)

#get all products
@app.route('/course', methods=['GET'])
def get_products():
  all_courses = Course.query.all()
  result = products_schema.dump(all_courses)
  return jsonify(result)

#get single products
@app.route('/course/<id>', methods=['GET'])
def get_product(id):
  courses = Course.query.get(id)
  return course_schema.jsonify(courses)

# Update a Product
@app.route('/course/<id>', methods=['PUT'])
def update_product(id):
  course = Course.query.get(id)
  name = request.json['name']
  description = request.json['description']
  price = request.json['price']
  qty = request.json['qty']

  product.name = name
  product.description = description
  product.price = price
  product.qty = qty

  db.session.commit()

  return product_schema.jsonify(product)

#delete products
@app.route('/course/<id>', methods=['DELETE'])
def delete_product(id):
  course = Course.query.get(id)
  db.session.delete(course)
  db.session.commit()
  return product_schema.jsonify(product)


if __name__ == '__main__':
    app.run(debug=True)
