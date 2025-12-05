import { Link } from "react-router";
import { Target, Eye, Heart, Award, Users, BookOpen } from "lucide-react";
import team from "../assets/team.png";
import mem1 from "../assets/mem1.png";
import mem2 from "../assets/mem2.png";
import mem3 from "../assets/mem3.png";
import mem4 from "../assets/mem4.png";

const teamMembers = [
  {
    name: "David Anderson",
    role: "Founder & CEO",
    image: mem1,
    bio: "Former educator with 15+ years of experience in e-learning",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Curriculum",
    image: mem2,
    bio: "PhD in Education Technology from Stanford University",
  },
  {
    name: "Michael Park",
    role: "CTO",
    image: mem3,
    bio: "Built scalable platforms at Google and Amazon",
  },
  {
    name: "Lisa Chen",
    role: "Head of Student Success",
    image: mem4,
    bio: "Passionate about helping students achieve their goals",
  },
];

const stats = [
  { value: "50K+", label: "Students Enrolled", icon: Users },
  { value: "500+", label: "Courses Available", icon: BookOpen },
  { value: "200+", label: "Expert Instructors", icon: Award },
  { value: "95%", label: "Completion Rate", icon: Target },
];

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* HERO */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About CourseMaster
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              We are on a mission to democratize education and make quality
              learning accessible to everyone, everywhere. Since 2020,
              CourseMaster has grown to become one of the world’s leading
              e-learning platforms.
            </p>
          </div>
        </section>

        {/* MISSION / VISION / VALUES */}
        <section className="py-20">
          <div className="container mx-auto px-4 grid gap-8 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "Empowering individuals worldwide with the skills they need through accessible, high-quality education.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To become the world’s leading learning platform where anyone can learn anything from industry experts.",
              },
              {
                icon: Heart,
                title: "Our Values",
                desc: "Excellence, innovation, inclusivity, accessibility, and a community focused on learner success.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="w-16 h-16 bg-green-700/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <item.icon className="h-8 w-8 text-green-700" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-center">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-center leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 bg-green-800/90">
          <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-10 text-center text-white">
            {stats.map((s, i) => (
              <div key={i}>
                <s.icon className="h-8 w-8 mx-auto mb-3" />
                <p className="text-3xl md:text-4xl font-bold">{s.value}</p>
                <p className="text-sm opacity-80">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* OUR STORY */}
        <section className="py-20">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
            <img
              src={team}
              alt="Our team"
              className="rounded-2xl shadow-lg w-full"
            />

            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">Our Story</h2>

              <p className="text-gray-700 leading-relaxed">
                CourseMaster began with a belief: education should be
                accessible, high-quality, and life-changing. What started as a
                collection of coding tutorials is now a global platform serving
                over 50,000 learners.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Our instructors are industry leaders, and every course undergoes
                a rigorous quality review before publication.
              </p>

              <Link
                to="/courses"
                className="inline-block bg-green-800/90 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-800 transition"
              >
                Explore Our Courses
              </Link>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Meet Our Leadership Team
              </h2>
              <p className="text-gray-600">
                A passionate team of educators and technologists shaping the
                future of online learning.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((m, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition"
                >
                  <img
                    src={m.image}
                    alt={m.name}
                    className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="p-5 text-center">
                    <h3 className="font-semibold text-lg">{m.name}</h3>
                    <p className="text-green-700 text-sm font-medium mb-2">
                      {m.role}
                    </p>
                    <p className="text-gray-600 text-sm">{m.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
