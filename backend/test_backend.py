from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow 
import os
from flask_cors import CORS
import unittest
from app import add_Course


class test_AddCourse(unittest.TestCase):
    def setUp(self):
        super(test_AddCourse, self).setUp()
        self.add_course = add_Course()
    def test_course_list(self):
        self.assertEqual(
            self.add_course.add_Course(),
            {
                'Dept' : 'dept1',
                'CourseNum' : 'course1',
                'Name' : 'name1'
            }
        )
       
       

if __name__ == '__main__':
    unittest.main()


