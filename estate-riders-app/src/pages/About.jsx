import React from "react";
import {Zap, Target, Users, Leaf, Award, Heart, TrendingUp, Shield, MapPin, Clock, Smile } from 'lucide-react';
const About = () => {
  const stats = [
    { icon: Users, value: '5,000+', label: 'Active Users' },
    { icon: Zap, value: '50+', label: 'Electric Vehicles' },
    { icon: MapPin, value: '25+', label: 'Estate Locations' },
    { icon: Smile, value: '98%', label: 'Satisfaction Rate' }
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'Promoting eco-friendly transportation solutions that reduce carbon footprint and protect our environment for future generations.'
    },
    {
      icon: Heart,
      title: 'Community First',
      description: 'Building stronger, healthier communities by making active lifestyle choices accessible and affordable for all residents.'
    },
    {
      icon: Shield,
      title: 'Safety & Quality',
      description: 'Maintaining the highest standards of vehicle safety, regular maintenance, and rider protection in every journey.'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'Continuously evolving our platform with cutting-edge technology to deliver the best user experience possible.'
    }
  ];

  const features = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Access our vehicles anytime, day or night, with our convenient booking system.'
    },
    {
      icon: () => <span className="text-white text-3xl font-bold">KSh</span>,
      title: 'Affordable Pricing',
      description: 'Competitive hourly rates with no hidden fees. Pay only for what you use.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'All vehicles are regularly maintained and meet strict safety standards.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Dedicated customer service team ready to assist you with any questions.'
    }
  ];

  const team = [
    {
      name: 'SIMON KARUGA',
      role: 'Founder & CEO',
      image: <img src='/images/simon.jpeg' alt='simon' className="w-24 h-24 rounded-full object-cover" />,
      bio: '10+ years in sustainable mobility'
    },
    {
      name: 'KELVIN JOHNSON',
      role: 'CTO',
      image: <img src='/images/kev.jpg' alt='Kelvin' className="w-24 h-24 rounded-full object-cover" />,
      bio: 'Tech innovator and cycling enthusiast'
    },
    {
      name: 'PRINCE KIBALI',
      role: 'Head of Operations',
      image: <img src='/images/prince.jpg' alt='Prince' className="w-24 h-24 rounded-full object-cover" />,
      bio: 'Expert in fleet management'
    },
    {
      name: 'CHRIS KABUE',
      role: 'Customer Success Lead',
      image: <img src='/images/chris.jpg' alt='Chris' className="w-24 h-24 rounded-full object-cover" />,
      bio: 'Passionate about customer experience'
    }
  ];

  const milestones = [
    { year: '2021', event: 'Estate Riders founded with 3 e-bikes' },
    { year: '2022', event: 'Expanded to 3 estates, 10 vehicles' },
    { year: '2023', event: 'Reached 2,00 active users milestone' },
    { year: '2024', event: 'Introduced scooters and skates' },
    { year: '2025', event: 'Serving 25+ estates, 5,000+ users' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Hero Section  */}
      <section className="relative bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
        </div>
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center justify-center bg-white/20 rounded-full px-6 py-2 mb-6">
              <Zap className="mr-2" size={20} />
              <span className="font-semibold">About Estate Riders</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Revolutionizing Estate Mobility
            </h1>
            <p className="text-xl md:text-2xl text-emerald-50 max-w-3xl mx-auto">
              Making electric transportation accessible, affordable, and enjoyable for every resident in your community.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white shadow-lg -mt-8 relative z-20 max-w-6xl mx-auto rounded-2xl">
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

      {/* Mission & Vision */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
                <Target className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              To transform residential estates into vibrant, eco-friendly communities by providing accessible, sustainable, and enjoyable electric mobility solutions that promote health, reduce environmental impact, and enhance the quality of life for all residents.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-br from-teal-500 to-cyan-500 p-3 rounded-xl">
                <Award className="text-white" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
            </div>
            <p className="text-gray-600 leading-relaxed text-lg">
              To become the leading electric mobility platform across residential communities nationwide, creating a future where every estate resident has convenient access to sustainable transportation options that inspire active lifestyles and environmental stewardship.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Story</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From a small idea to a growing movement transforming estate communities
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 md:p-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Estate Riders was born from a simple observation: residents in our own estate wanted to exercise more, reduce their carbon footprint, and explore their community, but lacked easy access to the right equipment.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                In 2021, we started with just five electric bikes and a vision to make sustainable mobility accessible to everyone. What began as a small pilot program quickly grew as residents embraced the convenience, affordability, and joy of electric transportation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Today, we're proud to serve thousands of residents across multiple estates, offering a diverse fleet of electric bikes, scooters, and skates. But our mission remains the same: making every journey within your community more enjoyable, sustainable, and accessible.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Core Values</h2>
          <p className="text-xl text-gray-600">The principles that guide everything we do</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, idx) => (
            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 w-16 h-16 rounded-xl flex items-center justify-center mb-4">
                <value.icon className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-600">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Estate Riders?</h2>
            <p className="text-xl text-emerald-50">The benefits that set us apart</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition">
                <feature.icon className="text-white mb-4" size={40} />
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-emerald-50 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Journey</h2>
          <p className="text-xl text-gray-600">Milestones that shaped our growth</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {milestones.map((milestone, idx) => (
              <div key={idx} className="flex gap-6 items-start">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {milestone.year}
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl p-6 shadow-lg">
                  <p className="text-lg text-gray-700">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">The passionate people behind Estate Riders</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, idx) => (
              <div key={idx} className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 text-center hover:shadow-xl transition">
                <div className="text-7xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-emerald-600 font-semibold mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
