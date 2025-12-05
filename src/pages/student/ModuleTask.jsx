import { useState, useEffect } from "react";
import axiosPrivate from "../../api/axiosPrivate";
import toast from "react-hot-toast";

const ModuleTask = ({ courseId, module }) => {
  const [assignmentInput, setAssignmentInput] = useState("");
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [score, setScore] = useState(null);

  // ---------------------------
  // CHECK IF STUDENT SUBMITTED
  // ---------------------------
  useEffect(() => {
    if (module?.studentAssignmentSubmission) {
      setAlreadySubmitted(true);
      setAssignmentInput(module.studentAssignmentSubmission.answer || "");
    }
  }, [module]);

  // ----------------------------
  // SUBMIT ASSIGNMENT
  // ----------------------------
  const submitAssignment = async () => {
    try {
      await axiosPrivate.post(
        `/student/courses/${courseId}/lesson/${module?._id}/assignment`,
        { answer: assignmentInput }
      );

      toast.success("Assignment submitted!");
      setAlreadySubmitted(true);
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit assignment");
    }
  };

  // ----------------------------
  // QUIZ EVALUATION
  // ----------------------------
  const evaluateQuiz = () => {
    if (!module?.quizzes || module.quizzes.length === 0) return;

    let correct = 0;

    module.quizzes.forEach((q, index) => {
      if (quizAnswers[index] === q.answer) correct++;
    });

    const calculatedScore = Math.round((correct / module.quizzes.length) * 100);
    setScore(calculatedScore);
  };

  return (
    <div className="p-4 border rounded mt-4">

      {/* ASSIGNMENT SECTION */}
      {module?.assignments?.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Assignment</h3>

          {module.assignments.map((a, idx) => (
            <p key={idx} className="text-blue-600 underline">
              {a.type === "link" ? (
                <a href={a.answer} target="_blank">{a.answer}</a>
              ) : (
                a.answer
              )}
            </p>
          ))}

          <input
            type="text"
            placeholder="Submit your assignment link or text"
            value={assignmentInput}
            onChange={(e) => setAssignmentInput(e.target.value)}
            className="border px-2 py-1 w-full rounded mt-2"
            disabled={alreadySubmitted}
          />

          <button
            onClick={submitAssignment}
            disabled={alreadySubmitted}
            className={`px-3 py-1 mt-2 rounded cursor-pointer text-white 
                ${alreadySubmitted ? "bg-gray-400 cursor-not-allowed" : "bg-green-600"}`}
          >
            {alreadySubmitted ? "Already Submitted" : "Submit Assignment"}
          </button>
        </div>
      )}

      {/* QUIZ SECTION */}
      {module?.quizzes?.length > 0 && (
        <div>
          <h3 className="font-semibold mb-3">Quiz</h3>

          {module.quizzes.map((q, qi) => (
            <div key={qi} className="mb-4">
              <p className="font-medium mb-1">{q.question}</p>

              <select
                value={quizAnswers[qi] || ""}
                onChange={(e) =>
                  setQuizAnswers((prev) => ({
                    ...prev,
                    [qi]: e.target.value,
                  }))
                }
                className="border px-2 py-1 w-full rounded"
              >
                <option value="">Select Answer</option>
                {q.options.map((opt, oi) => (
                  <option key={oi} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

          <button
            onClick={evaluateQuiz}
            className="bg-green-600 text-white px-3 py-1 rounded cursor-pointer"
          >
            Submit Quiz
          </button>

          {score !== null && (
            <p className="mt-3 text-lg font-semibold">Score: {score}%</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ModuleTask;
