# Course Master - Frontend

**Project Name:** Course Master  
**Live Link:** [https://course-master-nine.vercel.app/](https://course-master-nine.vercel.app/)  

## Description
Course Master is an admin/student management frontend built with React.  
It allows admins to view all students, filter students by course, and review submitted assignments.

## Installation / Run Instructions

1. Clone the repository:
```bash
git clone <https://github.com/nayon117/courseMaster>
cd frontend
npm install
npm run dev
```

# API Documentation
Students

## Get all students
GET /admin/students
Returns a list of all students.

## Get students by course
GET /admin/courses/:courseId/students
Returns a list of students enrolled in the selected course.

Courses

## Get all courses
GET /admin/courses
Returns a list of all available courses.

Assignments

## Get all assignments
GET /admin/assignments
Returns all submitted assignments with student and course info.

## For any issue email: hasibul.nayon1@gmail.com
