import { ArrowRight, Play } from "lucide-react"
import heroimg from "../../assets/hero.jpg"

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-8 lg:py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div className="space-y-8">
            {/* Small Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-200/20 rounded-full">
              <span className="w-2 h-2 bg-green-700 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-green-700">New courses available</span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Master new skills with{" "}
              <span className="text-green-700">expert-led</span> courses
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
              Join thousands of learners and advance your career with our comprehensive e-learning platform. Learn at
              your own pace, anytime, anywhere.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="flex items-center justify-center gap-2 bg-green-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-800 transition"
              >
                Browse Courses
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition"
              >
                <Play className="h-4 w-4" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-3xl font-bold text-gray-900">50K+</p>
                <p className="text-sm text-gray-600">Active Students</p>
              </div>

              <div className="w-px h-12 bg-gray-300"></div>

              <div>
                <p className="text-3xl font-bold text-gray-900">200+</p>
                <p className="text-sm text-gray-600">Expert Instructors</p>
              </div>

              <div className="w-px h-12 bg-gray-300"></div>

              <div>
                <p className="text-3xl font-bold text-gray-900">500+</p>
                <p className="text-sm text-gray-600">Courses</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10 rounded-2xl shadow-2xl overflow-hidden">
              <img src={heroimg} alt="Students learning online" className="w-full h-auto" />
            </div>

            {/* Soft glowing blobs */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-green-300/20 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-4 -left-4 w-72 h-72 bg-green-500/20 rounded-full blur-3xl"></div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Hero
