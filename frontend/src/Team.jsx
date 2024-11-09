import React from 'react';

const teamMembers = [
  {
    name: 'Aryan Jha',
    role: 'Roll Number : 29',
    image: 'profile.webp',
  },
  {
    name: 'Ashish Kumar',
    role: 'Roll Number : 30',
    image: 'profile.webp',
  },
  {
    name: 'Prasad Bandewar',
    role: 'Roll Number: 50',
    image: 'profile.webp',
  },

  {
    name: 'Sejal Band',
    role: 'Roll Number : 49',
    image: 'profile.webp',
  },
  {
    name: 'Venugopal Baheti',
    role: 'Roll Number : 47',
    image: 'profile.webp',
  }
];

function Team() {
  return (
    <div>
      <div className="bg-custombg py-24 sm:py-32">
        <div className="mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 gap-16 px-6 lg:px-8">
          {/* Left Column: Intro */}
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl bgclr pb-10">Our Team</h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
            We are a group of second-year students from the Computer Science A division of Vishwakarma Institute of Technology, Pune. Our team is passionate about using IoT technologies to solve real-world challenges. For our current project, we are focused on developing a Smart Irrigation System with Rain and Soil Moisture Monitoring, aimed at optimizing water usage in agriculture. By leveraging real-time data from sensors, our system helps farmers make informed decisions, ensuring efficient water management and contributing to sustainable farming practices.
            </p>
          </div>

          {/* Right Column: Team Members */}
          <div className="pl-52 mt-9"> {/* Added more padding to the left */}
            <ul role="list" className="space-y-12">
              {teamMembers.map((member, index) => (
                <li key={index}>
                  <div className="flex items-center gap-x-7">
                    <img className="h-16 w-16 rounded-full" src={member.image} alt={`${member.name} profile`} />
                    <div>
                      <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{member.name}</h3>
                      <p className="text-sm font-semibold leading-6 text-indigo-600">{member.role}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
