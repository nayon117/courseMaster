import { useState, useEffect } from "react";
import axiosPrivate from "../../api/axiosPrivate";
import toast from "react-hot-toast";

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all courses for select box
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axiosPrivate.get("/admin/courses");
        // Ensure we always have an array
        setCourses(Array.isArray(res.data) ? res.data : res.data.courses || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch courses");
      }
    };
    fetchCourses();
  }, []);

  // Fetch students (all or by course)
  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      try {
        let res;
        if (selectedCourse) {
          // Fetch students for selected course
          res = await axiosPrivate.get(`/admin/courses/${selectedCourse}/students`);
        } else {
          // Fetch all students
          res = await axiosPrivate.get("/admin/students");
        }

        // Ensure we always have an array
        const studentsData = Array.isArray(res.data) ? res.data : res.data.students || [];
        setStudents(studentsData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch students");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [selectedCourse]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Students</h1>

      <div className="mb-4">
        <label className="block mb-2 font-semibold">Select Course:</label>
        <select
          className="border p-2 rounded w-full md:w-1/2"
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
        >
          <option value="">-- All Students --</option>
          {Array.isArray(courses) &&
            courses.map((course) => (
              <option key={course._id} value={course._id}>
                {course.title}
              </option>
            ))}
        </select>
      </div>

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : students.length === 0 ? (
        <div className="text-center text-lg">No students found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Name</th>
                <th className="p-3 border-b">Email</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{student.name}</td>
                  <td className="p-3 border-b">{student.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AllStudents;
