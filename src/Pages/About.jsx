import React from 'react'

function About() {
  return (
    <div>
<section className="py-12 px-6 bg-white">
  <h3 className="text-2xl font-bold text-center text-blue-700 mb-8">Our Services</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
    {["Appointments", "Consultation", "Lab Results", "Emergency"].map(service => (
      <div key={service} className="bg-blue-50 p-6 rounded-lg shadow hover:shadow-md text-center">
        <h4 className="text-lg font-semibold text-blue-600">{service}</h4>
        <p className="text-sm text-gray-600 mt-2">Quick access to {service.toLowerCase()} services.</p>
      </div>
    ))}
  </div>
</section>

    </div>
  )
}

export default About