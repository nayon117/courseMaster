import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 bg-green-800">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Join over 50,000 students already sharpening their skills on
          CourseMaster. Your journey begins the moment you choose to step
          forward.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-8 py-3 rounded-lg bg-white text-green-700 font-semibold  flex items-center justify-center gap-2 shadow-sm hover:bg-gray-100 transition cursor-pointer"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" />
          </button>

          <button
            className="px-8 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white hover:text-green-700 transition cursor-pointer"
          >
            View Pricing
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
