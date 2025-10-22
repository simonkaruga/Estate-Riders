import React from "react";
import { Zap, Users, MapPin, Smile } from "lucide-react";

const About = () => {
  const stats = [
    { icon: Users, value: "5,000+", label: "Active Users" },
    { icon: Zap, value: "50+", label: "Electric Vehicles" },
    { icon: MapPin, value: "25+", label: "Estate Locations" },
    { icon: Smile, value: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <div className="pt-16"> {/* padding top for fixed navbar */}
      {/* Hero Section */}
      <section id="hero" className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 text-center">
        <div className="inline-flex items-center justify-center bg-white/20 rounded-full px-6 py-2 mb-6 mx-auto">
          <Zap className="mr-2" size={20} />
          <span className="font-semibold">About Estate Riders</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6">
          Revolutionizing Estate Mobility
        </h1>
        <p className="text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto">
          Making electric transportation accessible, affordable, and enjoyable for every resident.
        </p>
      </section>

      {/* Stats Section */}
      <section id="stats" className="py-12 bg-white shadow-lg -mt-8 relative z-20 max-w-6xl mx-auto rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-8">
          {stats.map((stat, idx) => (
            <div key={idx} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full mb-4">
                <stat.icon className="text-white" size={28} />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Placeholder sections */}
      <section id="values" className="py-20 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
      </section>
      <section id="features" className="py-20 text-center bg-gradient-to-br from-emerald-600 to-teal-600">
        <h2 className="text-4xl font-bold text-white mb-4">Why Choose Estate Riders?</h2>
      </section>
      <section id="team" className="py-20 text-center bg-white">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
      </section>
      <section id="timeline" className="py-20 text-center max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
      </section>
    </div>
  );
};

export default About;
