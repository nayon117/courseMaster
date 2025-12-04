import { useEffect, useState } from "react";
import {  useParams } from "react-router";
import axiosPrivate from "../../api/axiosPrivate";
import toast from "react-hot-toast";

const CourseBatches = () => {
  const { courseId } = useParams();
  const [batches, setBatches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editBatch, setEditBatch] = useState(null);
  const [batchForm, setBatchForm] = useState({
    name: "",
    startDate: "",
    endDate: "",
    maxStudents: 0,
  });


  useEffect(() => {
  let isMounted = true; // prevent state update if component unmounted

  const fetchBatches = async () => {
    try {
      const res = await axiosPrivate.get(`/admin/courses/${courseId}/batches`);
      if (isMounted) setBatches(res.data.batches || []);
    } catch (err) {
      console.error(err);
    }
  };

  fetchBatches();

  return () => {
    isMounted = false; // cleanup to avoid memory leaks
  };
}, [courseId]);


  const handleDelete = async (batchId) => {
    if (!window.confirm("Are you sure you want to delete this batch?")) return;
    try {
      await axiosPrivate.delete(`/admin/batches/${batchId}`);
      setBatches(batches.filter((b) => b._id !== batchId));
      toast.success("Batch deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete batch");
    }
  };

  const handleEdit = (batch) => {
    setEditBatch(batch);
    setBatchForm({
      name: batch.name,
      startDate: batch.startDate.split("T")[0],
      endDate: batch.endDate.split("T")[0],
      maxStudents: batch.maxStudents || 0,
    });
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditBatch(null);
    setBatchForm({ name: "", startDate: "", endDate: "", maxStudents: 0 });
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setBatchForm({ ...batchForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editBatch) {
        await axiosPrivate.put(`/admin/batches/${editBatch._id}`, batchForm);
        toast.success("Batch updated successfully");
      } else {
        await axiosPrivate.post(`/admin/courses/${courseId}/batches`, batchForm);
        toast.success("Batch created successfully");
      }
      setShowForm(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to save batch");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Batches</h1>

      <button
        onClick={handleAdd}
        className="px-4 py-2 bg-black text-white rounded mb-4"
      >
        Add Batch
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50 space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Batch Name"
            value={batchForm.name}
            onChange={handleFormChange}
            className="border p-2 rounded w-full"
            required
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="date"
              name="startDate"
              value={batchForm.startDate}
              onChange={handleFormChange}
              className="border p-2 rounded w-full"
              required
            />
            <input
              type="date"
              name="endDate"
              value={batchForm.endDate}
              onChange={handleFormChange}
              className="border p-2 rounded w-full"
              required
            />
          </div>
          <input
            type="number"
            name="maxStudents"
            value={batchForm.maxStudents}
            onChange={handleFormChange}
            placeholder="Max Students"
            className="border p-2 rounded w-full"
          />
          <div className="flex space-x-2">
            <button type="submit" className="px-4 py-2 bg-black text-white rounded">
              {editBatch ? "Update Batch" : "Create Batch"}
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {batches.length === 0 ? (
        <p>No batches found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded shadow">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 border">Batch Name</th>
                <th className="p-3 border">Start Date</th>
                <th className="p-3 border">End Date</th>
                <th className="p-3 border">Max Students</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((batch) => (
                <tr key={batch._id} className="hover:bg-gray-50">
                  <td className="p-3 border">{batch.name}</td>
                  <td className="p-3 border">{batch.startDate.split("T")[0]}</td>
                  <td className="p-3 border">{batch.endDate.split("T")[0]}</td>
                  <td className="p-3 border">{batch.maxStudents || "Unlimited"}</td>
                  <td className="p-3 border space-x-2 flex flex-wrap">
                    <button
                      onClick={() => handleEdit(batch)}
                      className="px-3 py-1 bg-black text-white rounded cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(batch._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded cursor-pointer"
                    >
                      Delete
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

export default CourseBatches;
