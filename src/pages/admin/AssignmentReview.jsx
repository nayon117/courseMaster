import { useState, useEffect } from "react";
import axiosPrivate from "../../api/axiosPrivate";
import toast from "react-hot-toast";

const AssignmentReview = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatingId, setUpdatingId] = useState(null); 

  // Fetch all submissions
  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        const res = await axiosPrivate.get("/admin/assignments");
        setSubmissions(res.data.submissions);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Handle review (status + marks)
  const handleReview = async (id, status, marks) => {
    if (!status || marks === "") {
      toast.error("Please enter status and marks");
      return;
    }

    setUpdatingId(id);
    try {
      const res = await axiosPrivate.patch(`/admin/assignments/${id}/review`, { status, marks });
      setSubmissions((prev) =>
        prev.map((sub) => (sub._id === id ? res.data.result : sub))
      );
      toast.success("Assignment reviewed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update assignment");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Assignment Reviews</h1>

      {loading ? (
        <div className="text-center text-lg">Loading...</div>
      ) : submissions.length === 0 ? (
        <div className="text-center text-lg">No submissions found.</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-3 border-b">Student</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Course</th>
                <th className="p-3 border-b">Status</th>
                <th className="p-3 border-b">Marks</th>
                <th className="p-3 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub) => (
                <tr key={sub._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{sub.student?.name}</td>
                  <td className="p-3 border-b">{sub.student?.email}</td>
                  <td className="p-3 border-b">{sub.course?.title}</td>
                  <td className="p-3 border-b">
                    <select
                      value={sub.status}
                      onChange={(e) =>
                        setSubmissions((prev) =>
                          prev.map((s) =>
                            s._id === sub._id ? { ...s, status: e.target.value } : s
                          )
                        )
                      }
                      className="border p-2 rounded w-full"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="p-3 border-b">
                    <input
                      type="number"
                      value={sub.marks || ""}
                      onChange={(e) =>
                        setSubmissions((prev) =>
                          prev.map((s) =>
                            s._id === sub._id ? { ...s, marks: e.target.value } : s
                          )
                        )
                      }
                      className="border p-2 rounded w-full"
                    />
                  </td>
                  <td className="p-3 border-b">
                    <button
                      onClick={() => handleReview(sub._id, sub.status, sub.marks)}
                      className="px-3 py-1 bg-black text-white rounded"
                      disabled={updatingId === sub._id}
                    >
                      {updatingId === sub._id ? "Updating..." : "Review"}
                    </button>
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
