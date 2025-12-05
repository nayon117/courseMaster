import { useEffect, useState } from "react";
import axiosPrivate from "../../api/axiosPrivate";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalAssignments: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axiosPrivate.get("/admin/stats");
        if (res.data.success) {
          setStats(res.data.stats);
        }
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Stats Cards */}
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
          <h2 className="text-lg font-semibold">Total Assignments</h2>
          <p className="text-2xl font-bold">{stats.totalAssignments}</p>
        </div>
      </div>

      {/* Placeholder Section */}
      <div className="bg-white p-6 rounded shadow text-center">
        <h2 className="text-xl font-semibold">Dashboard Overview</h2>
        <p className="mt-2 text-gray-600">We are working on dashboard features. Stay tuned!</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
