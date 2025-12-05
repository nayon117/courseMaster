import { GraduationCap, Video, Award, Clock, Users, Shield } from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Expert Instructors",
    description: "Learn from industry professionals with years of real-world experience",
  },
  {
    icon: Video,
    title: "HD Video Lessons",
    description: "High-quality video content with clear explanations and demonstrations",
  },
  {
    icon: Award,
    title: "Certificates",
    description: "Earn verified certificates upon course completion to showcase your skills",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    description: "Study at your own pace with lifetime access to course materials",
  },
  {
    icon: Users,
    title: "Community Support",
    description: "Join a vibrant community of learners and get help when you need it",
  },
  {
    icon: Shield,
    title: "Money-Back Guarantee",
    description: "30-day money-back guarantee if you are not satisfied with the course",
  },
]

const WhyChoose = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose CourseMaster?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide a premium learning experience designed to elevate your skillset.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-gray-100 rounded-xl border border-gray-200 hover:border-green-700/40 
              hover:shadow-lg transition-all group"
            >
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mb-4 
              group-hover:bg-green-700/10 transition-colors">
                <feature.icon className="h-6 w-6 text-green-700" />
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default WhyChoose
