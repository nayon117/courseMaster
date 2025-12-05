import { useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams, useNavigate } from "react-router";
import toast from "react-hot-toast";
import axiosPrivate from "../../api/axiosPrivate";

const EditCourse = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const { register, control, handleSubmit, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      category: "",
      tags: [],
      price: 0,
      thumbnail: "",
      syllabus: [],
    },
  });

  const { fields: lessons, append: appendLesson, remove: removeLesson } = useFieldArray({
    control,
    name: "syllabus",
  });

  // Convert regular YouTube URL to embed URL
  const convertYoutubeUrl = (url) => {
    if (!url) return "";
    try {
      const videoId = new URL(url).searchParams.get("v");
      if (videoId) return `https://www.youtube.com/embed/${videoId}`;
      if (url.includes("youtube.com/embed")) return url;
      return url;
    } catch {
      return url;
    }
  };

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axiosPrivate.get(`/admin/courses/${courseId}`);
        const course = res.data.course;

        // Convert tags array to comma-separated string
        if (course.tags) course.tags = course.tags.join(",");

        reset(course);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load course");
      }
    };

    fetchCourse();
  }, [courseId, reset]);

  const onSubmit = async (data) => {
    try {
      const syllabus = data.syllabus.map((lesson) => ({
        ...lesson,
        videoUrl: lesson.videoUrl,
      }));

      const tagsArray = data.tags ? data.tags.split(",").map((t) => t.trim()) : [];

      await axiosPrivate.put(`/admin/courses/${courseId}`, { ...data, syllabus, tags: tagsArray });
      toast.success("Course updated successfully!");
      navigate("/dashboard/admin/all-courses");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update course");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Course</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input {...register("title", { required: true })} placeholder="Course Title" className="border p-2 rounded w-full" />
          <input {...register("instructor")} placeholder="Instructor" className="border p-2 rounded w-full" />
          <input {...register("category")} placeholder="Category" className="border p-2 rounded w-full" />
          <input {...register("price")} type="number" placeholder="Price" className="border p-2 rounded w-full" />
          <input {...register("tags")} placeholder="Tags (comma separated)" className="border p-2 rounded w-full" />
          <input {...register("thumbnail")} placeholder="Thumbnail URL" className="border p-2 rounded w-full" />
        </div>
        <textarea {...register("description")} placeholder="Course Description" className="border p-2 rounded w-full" rows={4} />

        {/* Lessons */}
        {lessons.map((lesson, idx) => (
          <div key={lesson.id} className="p-4 border rounded space-y-4 bg-gray-50">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Lesson {idx + 1}</h3>
              <button type="button" onClick={() => removeLesson(idx)} className="text-red-600 cursor-pointer">Remove</button>
            </div>

            <input {...register(`syllabus.${idx}.title`)} placeholder="Lesson Title" className="border p-2 rounded w-full" />
            <input
              {...register(`syllabus.${idx}.videoUrl`)}
              placeholder="Video URL"
              className="border p-2 rounded w-full"
              onBlur={(e) => setValue(`syllabus.${idx}.videoUrl`, convertYoutubeUrl(e.target.value))}
            />
            <input {...register(`syllabus.${idx}.duration`)} type="number" placeholder="Duration (minutes)" className="border p-2 rounded w-full" />
            <label className="flex items-center space-x-2">
              <input type="checkbox" {...register(`syllabus.${idx}.isFree`)} />
              <span>Free Lesson</span>
            </label>

            {/* Assignments */}
            <Controller
              control={control}
              name={`syllabus.${idx}.assignments`}
              render={({ field }) => (
                <div className="space-y-2">
                  <h4 className="font-semibold">Assignments</h4>
                  {field.value.map((assignment, aIdx) => (
                    <div key={aIdx} className="space-y-2">
                      <select {...register(`syllabus.${idx}.assignments.${aIdx}.type`)} className="border p-2 rounded w-full">
                        <option value="text">Text</option>
                        <option value="link">Google Drive Link</option>
                      </select>
                      <input {...register(`syllabus.${idx}.assignments.${aIdx}.answer`)} placeholder="Answer / Link" className="border p-2 rounded w-full" />
                    </div>
                  ))}
                </div>
              )}
            />

            {/* Quizzes */}
            <Controller
              control={control}
              name={`syllabus.${idx}.quizzes`}
              render={({ field }) => (
                <div className="space-y-2">
                  <h4 className="font-semibold">Quizzes</h4>
                  {field.value.map((quiz, qIdx) => (
                    <div key={qIdx} className="space-y-2 border p-2 rounded bg-white">
                      <input {...register(`syllabus.${idx}.quizzes.${qIdx}.question`)} placeholder="Question" className="border p-2 rounded w-full" />
                      {quiz.options.map((_, oIdx) => (
                        <input key={oIdx} {...register(`syllabus.${idx}.quizzes.${qIdx}.options.${oIdx}`)} placeholder={`Option ${oIdx + 1}`} className="border p-2 rounded w-full" />
                      ))}
                      <input {...register(`syllabus.${idx}.quizzes.${qIdx}.answer`)} placeholder="Correct Answer" className="border p-2 rounded w-full" />
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            appendLesson({
              title: "",
              videoUrl: "",
              duration: 0,
              isFree: false,
              assignments: [{ type: "text", answer: "", status: "pending" }],
              quizzes: [{ question: "", options: ["", "", "", ""], answer: "" }],
            })
          }
          className="px-4 py-2 bg-green-800/90 text-white rounded mt-2 cursor-pointer"
        >
          Add Lesson
        </button>

        <button type="submit" className="w-full bg-green-800/90 text-white py-3 rounded font-bold mt-4 cursor-pointer ">
          Update Course
        </button>
      </form>
    </div>
  );
};

export default EditCourse;
