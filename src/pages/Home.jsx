import React, { useEffect } from 'react';
import { db } from '../firebase';
import {doc, updateDoc, increment, setDoc,getDoc} from 'firebase/firestore';


import Hero from '../pages/Hero';
import Awards from '../upload/Awards';

export default function Home() {

  useEffect(() => {
    const incrementVisit = async () => {
      const counterRef = doc(db, 'siteStates', 'visits');

      const snap = await getDoc(counterRef);
      if (!snap.exists()) {
        await setDoc(counterRef, {count: 1});
      } else {
        await updateDoc(counterRef, {count:increment(1)});
      }
    };
    incrementVisit();
  }, []);

  return (
    <main >
      <Hero />
      <div className='py-8 w-full'>
        <div className="px-4 py-10 m-2 w-full bg-black text-white rounded-lg shadow-md">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Welcome</h1>
          <p className="text-base md:text-lg leading-relaxed text-gray-300 mb-4">
           Welcome, I am Luis Sherab Jr., an aspiring software developer and Bachelor’s student currently based in Copenhagen, Denmark. As I embark on my professional journey, I am driven by a strong passion for technology and a commitment to continuous learning. My focus lies in developing clean, efficient, and responsive web applications that provide seamless user experiences across all devices. With a foundation in modern development tools such as React and Tailwind CSS, I strive to deliver high-quality digital solutions that meet real-world needs. I am dedicated to advancing my skills while contributing meaningfully to each project I undertake.   
          </p>
          <p className="text-base md:text-lg leading-relaxed text-gray-300">
            I specialize in creating responsive and user-centric websites, leveraging contemporary technologies to ensure optimal performance and accessibility. As a beginner developer, I bring a fresh perspective combined with a rigorous work ethic and attention to detail. My approach is centered on understanding client objectives thoroughly and translating them into effective, maintainable, and elegant solutions. I am committed to delivering projects that adhere to best practices in coding standards and design principles. Through continuous growth and collaboration, I aim to contribute valuable and reliable solutions to meet diverse development requirements.
          </p>
      </div>

        <Awards />
      </div>
    </main>
  );
}
