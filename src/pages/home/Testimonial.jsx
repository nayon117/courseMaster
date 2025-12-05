import { Star, Quote } from "lucide-react"
import test1 from "../../assets/test1.png"
import test2 from "../../assets/test2.png"
import test3 from "../../assets/test3.jpg"

const testimonials = [
  {
    id: 1,
    name: "Alex Thompson",
    role: "Software Developer",
    avatar: test1,
    content:
      "CourseMaster helped me transition into tech. The web development bootcamp was comprehensive and the instructors were incredibly supportive.",
    rating: 5,
  },
  {
    id: 2,
    name: "Maria Garcia",
    role: "Data Analyst",
    avatar: test2,
    content:
      "The data science course exceeded my expectations. I landed my dream job within 3 months of completing the program.",
    rating: 5,
  },
  {
    id: 3,
    name: "James Wilson",
    role: "UX Designer",
    avatar: test3,
    content:
      "The UI/UX course was exactly what I needed. The projects were practical and immediately usable.",
    rating: 5,
  },
]

const Testimonial = () => {
  return (
    <section className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What Our Students Say</h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Join thousands of learners who transformed their careers through our structured learning path
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <Quote className="h-8 w-8 text-green-700/20 mb-4" />

              <p className="text-gray-600 leading-relaxed mb-6">{t.content}</p>

              <div className="flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mt-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 text-green-700 fill-green-700"
                  />
                ))}
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial
