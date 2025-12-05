import useCourses from "../../hooks/useCourses";
import Hero from "./Hero";
import FeaturedCourses from "../../components/FeaturedCourses";
import WhyChoose from "./WhyChoose";
import Testimonial from "./Testimonial";
import CTASection from "./CTASection";

const Home = () => {
  const params = { search: "", category: "", sort: "", page: 1, limit: 6 };

  const { courses } = useCourses(params);

  return (
    <div className="max-w-6xl mx-auto p-6">
      
    {/* components */}
        <Hero />
        <FeaturedCourses courses={courses} />
         <WhyChoose />
         <Testimonial />
         <CTASection />
    </div>
  );
}

export default Home;
