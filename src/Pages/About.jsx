import React from "react";

const About = () => {
  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section
        className="relative bg-cover bg-center h-[400px]"
        style={{ backgroundImage: "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaRn1b2xeUeu_ERoysfRDkYNzHmE8K6lF7rg&s)" }}
      >
        <div className="absolute inset-0 bg-blue-600 bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Welcome to CARELINK Hospital
          </h1>
        </div>
      </section>

      {/* About Us */}
      <section className="py-12 px-6 md:px-20 bg-gray-50">
        <h2 className="text-3xl font-semibold text-center mb-6">About CARELINK</h2>
        <p className="text-lg text-gray-700 leading-relaxed max-w-4xl mx-auto text-center">
          CARELINK Hospital is dedicated to providing compassionate, world-class healthcare.
          Established with a vision to bridge the gap between advanced medical technology and
          personalized patient care, we have become a trusted name in the community. Our team of
          highly skilled doctors, nurses, and specialists work tirelessly to ensure every patient
          receives the best possible treatment in a safe and welcoming environment.
        </p>
      </section>

      {/* Services */}
      <section className="py-12 px-6 md:px-20">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Emergency Care",
              desc: "24/7 emergency services with rapid response teams ready to handle critical cases.",
            },
            {
              title: "Specialist Clinics",
              desc: "Cardiology, Pediatrics, Orthopedics, Oncology, and more—delivered by expert consultants.",
            },
            {
              title: "Diagnostic & Imaging",
              desc: "State-of-the-art labs and imaging facilities for accurate diagnosis and treatment planning.",
            },
            {
              title: "Maternity & Child Care",
              desc: "Comprehensive maternal health services and pediatric care for your family’s wellbeing.",
            },
            {
              title: "Surgical Excellence",
              desc: "Modern operating theaters equipped for general and specialized surgeries.",
            },
            {
              title: "Pharmacy & Rehabilitation",
              desc: "On-site pharmacy and rehabilitation programs to support recovery and wellness.",
            },
          ].map((service, index) => (
            <div key={index} className="p-6 bg-white shadow rounded">
              <h3 className="text-xl font-bold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 px-6 md:px-20 bg-blue-50">
        <h2 className="text-3xl font-semibold text-center mb-6">Our Mission & Vision</h2>
        <div className="max-w-4xl mx-auto text-center text-gray-700">
          <p className="mb-4">
            <strong>Mission:</strong> To deliver accessible, affordable, and advanced healthcare with
            compassion and integrity.
          </p>
          <p>
            <strong>Vision:</strong> To be the leading hospital in the region, known for innovation,
            patient-centered care, and excellence in medical practice.
          </p>
        </div>
      </section>

      
    </div>
  );
};

export default About;