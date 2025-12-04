import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ModuleTask from "./ModuleTask";
import axiosPrivate from "../../api/axiosPrivate";

const CourseView = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const { data } = await axiosPrivate.get(`/student/courses/${id}`);
        // Combine syllabus with progress info
        const syllabusWithProgress = data.course.syllabus.map(lesson => {
          const progress = data.progress.find(p => p.lessonId === lesson._id) || {};
          return { ...lesson, completed: progress.completed || false, assignment: progress.assignment, quizScore: progress.quizScore };
        });
        setCourse({ ...data.course, syllabus: syllabusWithProgress });
      } catch (err) {
        console.error(err);
      }
    };
    fetchCourse();
  }, [id]);

  const markCompleted = async (lessonId) => {
    try {
      await axiosPrivate.patch(`/student/courses/${id}/lesson/${lessonId}`);
      setCourse(prev => ({
        ...prev,
        syllabus: prev.syllabus.map(lesson =>
          lesson._id === lessonId ? { ...lesson, completed: true } : lesson
        )
      }));
    } catch (err) {
      console.error(err);
    }
  };

  if (!course) return <p className="p-6">Loading course...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">{course.title}</h1>
      {course.syllabus.map(lesson => (
        <div key={lesson._id} className="mb-6">
          <h2 className="font-semibold">{lesson.title}</h2>
          <iframe
            src={lesson.videoUrl}
            title={lesson.title}
            className="w-full h-64 mt-2 rounded"
            allowFullScreen
          />
          <button
            disabled={lesson.completed}
            onClick={() => markCompleted(lesson._id)}
            className={`mt-2 px-3 py-1 rounded cursor-pointer ${
              lesson.completed ? "bg-green-600 text-white" : "bg-blue-600 text-white"
            }`}
          >
            {lesson.completed ? "Completed" : "Mark as Completed"}
          </button>

          {/* Assignment & Quiz for this lesson */}
          {(lesson.assignment !== undefined || lesson.quizScore !== undefined) && (
            <ModuleTask courseId={id} module={lesson} />
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseView;
