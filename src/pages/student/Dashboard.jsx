import { useEffect, useState } from "react";
import { Link } from "react-router";
import axiosPrivate from "../../api/axiosPrivate";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../components/Loader";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const { data } = await axiosPrivate.get("/student/courses");
        setCourses(data?.data || []);
      } catch (err) {
        console.error(err);
        setError(err?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (user?.role === "student") {
      fetchEnrolledCourses();
    } else {
      setCourses([]); // clear courses if not a student
      setLoading(false);
    }
  }, [user]);

  if (loading) return <Loader />;
  if (error) return <p className="p-6 text-red-600">{error}</p>;
  if (!courses?.length) return <p className="p-6">You have no enrolled courses.</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Courses</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses?.map((studentCourse) => {
          const course = studentCourse?.courseId;
          if (!course) return null; // skip if course is null

          const totalLessons = studentCourse?.progress?.length || 0;
          const completedLessons =
            studentCourse?.progress?.filter((l) => l?.completed).length || 0;
          const progressPercentage = totalLessons
            ? Math.round((completedLessons / totalLessons) * 100)
            : 0;

          return (
            <Link
              key={course?._id || Math.random()} // fallback key
              to={`/dashboard/student/course/${course?._id || ""}`}
              className="border rounded-lg shadow p-4 hover:shadow-lg transition"
            >
              <img
                src={course?.thumbnail || "/fallback-thumbnail.jpg"}
                alt={course?.title || "Course"}
                className="h-40 w-full object-cover rounded"
              />
              <h2 className="text-lg font-semibold mt-3">{course?.title || "Untitled Course"}</h2>
              <p className="text-sm text-gray-600">{course?.instructor || "Unknown Instructor"}</p>
              <div className="w-full bg-gray-200 h-3 rounded mt-2">
                <div
                  className="bg-green-800/90 h-3 rounded"
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
