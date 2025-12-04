import { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosPrivate from "../../api/axiosPrivate";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const { data } = await axiosPrivate.get("/student/courses");
        setCourses(data?.data || []); // backend sends { success, data: [...] }
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!courses || courses.length === 0) return <p className="p-6">You have no enrolled courses.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(studentCourse => {
          const course = studentCourse.courseId; // populated course
          const totalLessons = studentCourse.progress.length;
          const completedLessons = studentCourse.progress.filter(l => l.completed).length;
          const progressPercentage = totalLessons ? Math.round((completedLessons / totalLessons) * 100) : 0;

          return (
            <Link
              key={course._id}
              to={`/student/course/${course._id}`}
              className="border rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-3">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.instructor}</p>
              <div className="w-full bg-gray-200 h-3 rounded mt-2">
                <div
                  className="bg-blue-600 h-3 rounded"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <p className="text-sm mt-1">{progressPercentage}% Completed</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
