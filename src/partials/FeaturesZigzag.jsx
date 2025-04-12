import React from 'react';

import FeatImage01 from '../images/features-03-image-01.png';
import FeatImage02 from '../images/features-03-image-02.png';
import FeatImage03 from '../images/features-03-image-03.png';

function FeaturesZigzag() {
  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20 border-t border-gray-800">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
          <div className="inline-flex text-base sm:text-lg font-semibold py-4 px-10 m-2 text-green-700 bg-green-200 rounded-full mb-15">IOT Platform</div>
          <h1 className="h2 mb-4 transform translate-y-10">Enter Goal Of Robot</h1>
          <div className="butt transform translate-y-10">
        <button className="text-base sm:text-lg text-center btn btn-danger rounded-full mb-15" id="but2" type="button" >Door</button>
        <button className="text-base sm:text-lg text-center btn btn-success rounded-full mb-15" id="but1" type="button" >Reception</button>
        <button className="text-base sm:text-lg text-center btn btn-danger rounded-full mb-15" id="but3" type="button" >Room</button>
        <button className="text-base sm:text-lg text-center btn btn-success rounded-full mb-15" id="but4" type="button">Corridor</button>
        </div>
            
            {/* <p className="text-xl text-gray-400">Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit laborum — semper quis lectus nulla.</p> */}
          </div>

          {/* Items */}
          <div className="grid gap-20">

            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 -mt-30" data-aos="fade-up">
              <img
                   className="max-w-full mx-auto md:max-w-none h-auto transform -translate-x-14"
                   src="./img.png"
                   width="800"
                   height="650"
                   alt="Features 01"/>
              </div>
              {/* Content */}
              <div className=" md:col-span-7 lg:col-span-6 -mt-79" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16 " >
                  <h3 className="h3 mb-3">Keep project work remotely</h3>
                  <p className="text-xl text-gray-400 mb-4">By leveraging IoT connectivity, real-time data from the cameras and sensors is sent to the cloud for advanced analytics, alerting, and remote supervision.</p>
                  <h1 id="sub" className="inline-flex text-base sm:text-lg font-semibold py-4 px-10 m-2 text-green-700 bg-green-200 rounded-full mb-15">Robot Position Now :</h1>
                </div>
              </div>
            </div>

           

            {/* 3rd item */}
            {/* <div className="md:grid md:grid-cols-12 md:gap-6 items-center"> */}
              {/* Image */}
              {/* <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <img className="max-w-full mx-auto md:max-w-none h-auto" src={FeatImage03} width="540" height="405" alt="Features 03" />
              </div> */}
              {/* Content */}
              {/* <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-xl text-purple-600 mb-2">More speed. Less spend</div>
                  <h3 className="h3 mb-3">Keep projects on schedule</h3>
                  <p className="text-xl text-gray-400 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <ul className="text-lg text-gray-400 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Duis aute irure dolor in reprehenderit</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Excepteur sint occaecat</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Amet consectetur adipiscing elit</span>
                    </li>
                  </ul>
                </div>
              </div> */}
            {/* </div> */}

          </div>

        </div>
      </div>
    </section>
  );
}

export default FeaturesZigzag;