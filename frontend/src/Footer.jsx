import React from 'react';

function Footer() {
  return (
    <div className="bg-custombutton h-auto md:h-52 flex flex-col md:flex-row justify-between p-8 text-white">
      {/* Title */}
      <h1 className="text-3xl mb-6 md:mb-0 md:pl-10 text-center md:text-left">Soil Sense</h1>

      {/* Pages and Contact Us Sections */}
      <div className="flex flex-col md:flex-row justify-between w-full md:w-auto">
        {/* Pages Section */}
        <div className="mb-6 md:mb-0 md:pr-40 text-center md:text-left">
          <h1 className="text-xl pb-4 md:pb-6">Pages</h1>
          <h1 className="pb-2">Our Mission</h1>
          <h1 className="pb-2">Team</h1>
          <h1 className="pb-2">Services</h1>
        </div>

        {/* Contact Us Section */}
        <div className="md:pr-32 text-center md:text-left">
          <h1 className="text-xl pb-4 md:pb-6">Contact Us</h1>
          <h1 className="pb-2">Email: 123admin@gmail.com</h1>
          <h1 className="pb-2">Mobile: +123-100-156-98</h1>
        </div>
      </div>
    </div>
  );
}

export default Footer;
