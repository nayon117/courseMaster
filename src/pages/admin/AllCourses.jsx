import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axiosPrivate from "../../api/axiosPrivate";
import { toast } from "react-hot-toast";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  // Custom toast confirmation
  const confirmToast = (message) => {
    return new Promise((resolve) => {
      const id = toast(
        () => (
          <div className="flex flex-col gap-2">
            <span>{message}</span>
            <div className="flex justify-end gap-2 mt-2">
              <button
                className="px-3 py-1 bg-gray-500 text-white rounded cursor-pointer"
                onClick={() => {
                  toast.dismiss(id);
                  resolve(false);
                }}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                onClick={() => {
                  toast.dismiss(id);
                  resolve(true);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        ),
        { duration: Infinity }
      );
    });
  };

  const handleDelete = async (courseId) => {
    const confirmed = await confirmToast("Are you sure you want to delete this course?");
    if (!confirmed) return;

    try {
      await axiosPrivate.delete(`/admin/courses/${courseId}`);
      setCourses(courses.filter((c) => c._id !== courseId));
      toast.success("Course deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete course");
    }
  };

  const handleEdit = (courseId) => {
    navigate(`/dashboard/admin/courses/edit/${courseId}`);
  };

  const openBatchViewer = (courseId) => {
    navigate(`/dashboard/admin/courses/${courseId}/batches`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosPrivate.get("/admin/courses");
        setCourses(res.data.courses || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch courses");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>

      {courses.length === 0 ? (
        <p>No courses found.</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white border rounded shadow p-4 md:flex md:items-center md:justify-between"
            >
              {/* Course Info */}
              <div className="mb-3 md:mb-0">
                <h2 className="font-semibold text-lg">{course.title}</h2>
                <p className="text-sm text-gray-600">Instructor: {course.instructor}</p>
                <p className="text-sm text-gray-600">Category: {course.category}</p>
                <p className="text-sm font-medium">Price: ${course.price || 0}</p>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleEdit(course._id)}
                  className="px-3 py-1 bg-black text-white rounded whitespace-nowrap cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course._id)}
                  className="px-3 py-1 bg-red-600 text-white rounded whitespace-nowrap cursor-pointer"
                >
                  Delete
                </button>
                <button
                  onClick={() => openBatchViewer(course._id)}
                  className="px-3 py-1 bg-green-800/90 text-white rounded whitespace-nowrap cursor-pointer"
                >
                  Batches
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
