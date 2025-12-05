import { useState } from "react";
import axiosPrivate from "../../api/axiosPrivate";

const ModuleTask = ({ courseId, module }) => {
  const [assignment, setAssignment] = useState("");
  const [quizAnswer, setQuizAnswer] = useState("");
  const [score, setScore] = useState(null);

  const submitAssignment = async () => {
    try {
      await axiosPrivate.post(`/student/courses/${courseId}/lesson/${module._id}/assignment`, { answer: assignment });
      alert("Assignment submitted!");
      setAssignment("");
    } catch (err) {
      console.error(err);
      alert("Failed to submit assignment");
    }
  };

  const submitQuiz = async () => {
    try {
      const { data } = await axiosPrivate.post(`/student/courses/${courseId}/lesson/${module._id}/quiz`, { score: quizAnswer });
      setScore(data.progress?.find(p => p.lessonId === module._id)?.quizScore || 0);
    } catch (err) {
      console.error(err);
      alert("Failed to submit quiz");
    }
  };

  return (
    <div className="p-4 border rounded mt-4">
      {module.assignment && (
        <div>
          <input
            type="text"
            placeholder="Submit assignment link or text"
            value={assignment}
            onChange={e => setAssignment(e.target.value)}
            className="border px-2 py-1 w-full rounded"
          />
          <button
            onClick={submitAssignment}
            className="bg-green-600 text-white px-3 py-1 mt-2 rounded cursor-pointer"
          >
            Submit Assignment
          </button>
        </div>
      )}

      {module.quiz && (
        <div className="mt-4">
          <select
            value={quizAnswer}
            onChange={e => setQuizAnswer(e.target.value)}
            className="border px-2 py-1 w-full rounded"
          >
            <option value="">Select Answer</option>
            {module.quiz.map((q, i) => (
              <option key={i} value={q.value}>{q.label}</option>
            ))}
          </select>
          <button
            onClick={submitQuiz}
            className="bg-green-600 text-white px-3 py-1 mt-2 rounded cursor-pointer"
          >
            Submit Quiz
          </button>
          {score !== null && <p className="mt-2 font-semibold">Score: {score}%</p>}
        </div>
      )}
    </div>
  );
};

export default ModuleTask;
