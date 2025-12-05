import { useState, useEffect } from "react";
import axiosPrivate from "../../api/axiosPrivate";
import toast from "react-hot-toast";
import Loader from "../../components/Loader";

const AssignmentReview = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get("/admin/assignments");
        const submissionsData = res.data.submissions || [];

        // Only keep relevant fields
        const allSubs = submissionsData.map((sub) => ({
          _id: sub._id,
          studentName: sub.student?.name || "N/A",
          courseTitle: sub.course?.title || "N/A",
          assignment: sub.assignment,
        }));

        setSubmissions(allSubs);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Assignment Submissions</h1>

      {loading ? (
       <Loader />
      ) : submissions.length === 0 ? (
        <div className="text-center text-lg">No assignments submitted yet.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Student</th>
                <th className="p-3 border-b">Course</th>
                <th className="p-3 border-b">Submitted Assignment</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub._id.toString()} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{sub.studentName}</td>
                  <td className="p-3 border-b">{sub.courseTitle}</td>
                  <td className="p-3 border-b">
                    {sub.assignment.length > 50
                      ? sub.assignment.slice(0, 50) + "..."
                      : sub.assignment}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AssignmentReview;
