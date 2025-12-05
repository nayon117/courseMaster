// components/FeaturedCourses.jsx
import { Link } from "react-router";

const FeaturedCourses = ({ courses }) => {
  return (
    <section className="mt-16 p-10 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Featured Courses</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular courses and start your learning journey today
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.slice(0, 6).map(c => (
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
    </section>
  );
}

export default FeaturedCourses;
