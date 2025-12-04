import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axiosPublic from "../api/axiosPublic";
import { AuthContext } from "../context/AuthContext";


const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);

  useEffect(() => {
    axiosPublic.get(`/courses/${id}`).then(res => {
      setCourse(res.data.data);
    });
  }, [id]);

  if (!course) return <div className="p-10">Loading...</div>;

  const handleEnroll = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    navigate(`/enroll/${id}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={course.thumbnail} className="w-full h-64 object-cover rounded" />

      <h1 className="text-3xl font-bold mt-4">{course.title}</h1>
      <p className="text-gray-700 text-lg mt-2">{course.description}</p>

      <p className="text-gray-500 mt-2">
        <strong>Instructor:</strong> {course.instructor}
      </p>

      <p className="text-xl font-semibold mt-4">Price: ${course.price}</p>

      <button
        onClick={handleEnroll}
        className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
      >
        Enroll Now
      </button>

      <h2 className="text-2xl font-semibold mt-8">Syllabus</h2>

      <ul className="mt-3 border rounded-lg divide-y">
        {course.syllabus.map((lesson, index) => (
          <li key={index} className="p-3">
            <strong>{index + 1}. {lesson.title}</strong>
            <p className="text-gray-600">{lesson.duration} min</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;
