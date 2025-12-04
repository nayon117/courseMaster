import { useEffect, useState } from "react";
import axiosPrivate from "../../api/axiosPrivate";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    pendingAssignments: 0,
  });
  const [pending, setPending] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats
        const statsRes = await axiosPrivate.get("/admin/stats");
        if (statsRes.data.success) {
          setStats(statsRes.data.stats);
        }

        // Fetch pending assignments
        const pendingRes = await axiosPrivate.get("/admin/assignments/pending");
        setPending(pendingRes.data || []);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold">Total Courses</h2>
          <p className="text-2xl font-bold">{stats.totalCourses}</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold">Total Students</h2>
          <p className="text-2xl font-bold">{stats.totalStudents}</p>
        </div>

        <div className="p-4 bg-white rounded shadow">
          <h2 className="text-lg font-semibold">Pending Assignments</h2>
          <p className="text-2xl font-bold">{stats.pendingAssignments}</p>
        </div>
      </div>

      {/* Pending Assignments Table */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Pending Assignments</h2>

        {pending.length === 0 ? (
          <p>No pending assignments.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Student</th>
                  <th className="p-2 border">Course</th>
                  <th className="p-2 border">Module</th>
                  <th className="p-2 border">View</th>
                </tr>
              </thead>
              <tbody>
                {pending.map((item, i) => (
                  <tr key={i}>
                    <td className="p-2 border">{item.student?.name || "N/A"}</td>
                    <td className="p-2 border">{item.course?.title || "N/A"}</td>
                    <td className="p-2 border">{item.moduleTitle || "N/A"}</td>
                    <td className="p-2 border">
                      <button className="px-3 py-1 bg-blue-600 text-white rounded">
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
