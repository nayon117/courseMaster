import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
} from "lucide-react";
import office from "../assets/office.jpg"
import toast from "react-hot-toast";

const contactInfo = [
  {
    icon: Mail,
    title: "Email Us",
    details: "support@coursemaster.com",
    subtext: "We reply within 24 hours",
  },
  {
    icon: Phone,
    title: "Call Us",
    details: "+1 (555) 123-4567",
    subtext: "Mon-Fri 9am-6pm GMT",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    details: "123 Learning Street",
    subtext: "Education City, EC 12345",
  },
  {
    icon: Clock,
    title: "Business Hours",
    details: "Monday - Friday",
    subtext: "9:00 AM - 6:00 PM GMT",
  },
];

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply browse our course catalog, select the course you are interested in, and click the Enroll button. You will be guided through the registration and payment process.",
  },
  {
    question: "Can I get a refund?",
    answer:
      "Yes! We offer a 30-day money-back guarantee. If you are not satisfied with your course, contact our support team for a full refund.",
  },
  {
    question: "Do I get a certificate?",
    answer:
      "Yes, upon completing a course, you will receive a verified certificate that you can share on LinkedIn or add to your resume.",
  },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-gray-700 text-lg leading-relaxed">
              Have questions or need help? Reach out to our friendly support
              team and we will get back to you promptly.
            </p>
          </div>
        </section>

        {/* Contact Info */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-xl shadow hover:shadow-lg transition"
              >
                <div className="w-12 h-12 bg-green-700/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-6 w-6 text-green-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  {item.title}
                </h3>
                <p className="font-medium text-gray-700">{item.details}</p>
                <p className="text-sm text-gray-500">{item.subtext}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Form & Map */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="h-6 w-6 text-green-700" />
                <h2 className="text-2xl font-bold">Send us a Message</h2>
              </div>

              <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-xl shadow space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                  />
                </div>

                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                />

                <textarea
                  name="message"
                  placeholder="Your message..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-700"
                ></textarea>

                <button
                  type="submit"
                  className="w-full bg-green-700 text-white py-3 rounded-lg font-semibold hover:bg-green-800 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="h-4 w-4" /> Send Message
                </button>
              </form>
            </div>

            {/* Map / Image */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-6 w-6 text-green-700" />
                <h2 className="text-2xl font-bold">Our Location</h2>
              </div>

              <div className="rounded-xl overflow-hidden shadow-lg h-[400px]">
                <img
                  src= {office}
                  alt="Our office"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-4 text-gray-600 text-center">
                123 Learning Street, Education City, EC 12345
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-20 bg-gray-100">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <HelpCircle className="h-8 w-8 text-green-700" />
                <h2 className="text-3xl md:text-4xl font-bold">
                  Frequently Asked Questions
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find quick answers to common questions
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
                >
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4">Still have questions?</p>
              <button className="px-6 py-3 border border-green-700 text-green-700 rounded-lg font-semibold hover:bg-green-700 hover:text-white transition cursor-pointer">
                View All FAQs
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Contact;
