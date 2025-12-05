// pages/Courses.jsx
import { useState } from "react";
import { Link } from "react-router";
import useCourses from "../../hooks/useCourses";

const Courses = () => {
  const [params, setParams] = useState({
    search: "",
    category: "",
    sort: "",
    page: 1,
    limit: 9,
  });

  const { courses, pages } = useCourses(params);

  const update = (key, value) => {
    setParams(p => ({ ...p, [key]: value, page: 1 }));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 my-12">

      <h1 className="text-3xl font-bold mb-6">All Courses</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search..."
          value={params.search}
          onChange={e => update("search", e.target.value)}
          className="border px-3 py-2 rounded w-60"
        />

        <select
          value={params.category}
          onChange={e => update("category", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Web Development">Web Dev</option>
          <option value="Programming">Programming</option>
          <option value="Design">Design</option>
        </select>

        <select
          value={params.sort}
          onChange={e => update("sort", e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="">Sort</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
        </select>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map(c => (
          <Link
            to={`/course/${c._id}`}
            key={c._id}
            className="border rounded-lg shadow hover:shadow-lg transition p-4"
          >
            <img
              src={c.thumbnail}
              alt=""
              className="h-40 w-full object-cover rounded"
            />
            <h2 className="text-lg font-semibold mt-3">{c.title}</h2>
            <p className="text-sm text-gray-600">{c.instructor}</p>
            <p className="font-bold mt-2">${c.price}</p>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center gap-2 mt-6">
        {Array.from({ length: pages }, (_, i) => (
          <button
            key={i}
            onClick={() => setParams(p => ({ ...p, page: i + 1 }))}
            className={`px-3 py-1 border rounded ${
              params.page === i + 1 ? "bg-black text-white cursor-pointer" : "cursor-pointer"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Courses;
