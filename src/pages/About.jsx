// src/pages/About.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Hero from './Hero';

function About() {
  const [resumeText, setResumeText] = useState('');
  const [resumeLink, setResumeLink] = useState('');

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const docRef = doc(db, 'aboutPage', 'resume');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setResumeText(data.text || '');
          setResumeLink(data.link || '');
        }
      } catch (err) {
        console.error("Failed to fetch resume:", err);
      }
    };

    fetchResume();
  }, []);

  return (
    <>
      <Hero />
        <div className='flex flex-col items-center text-center w-full object-cover'>
          <div className='p-8 m-2 w-full bg-black text-white'>
            <h2 className='text-2xl font-bold mb-4 border-b-2 border-blue-500 inline-block'>What is this for?</h2>
            <p className='mb-6 text-lg leading-relaxed'>This personal portfolio serves as a professional showcase of my skills, projects, and growth as a software developer. It highlights my journey, capabilities, and passion for creating meaningful digital experiences.
</p>
          </div>

          <div className='flex flex-col md:flex-row gap-4 m-2 p-8 bg-black text-white items-center text-center w-full justify-center'>
            <div className=' p-4 text-center'>
              <h1 className='font-bold'>My Bio</h1>
              <p className='mb-6 text-lg leading-relaxed px-2'>I am Luis Sherab Jr., a motivated software developer and Bachelor student based in Copenhagen. Driven by curiosity and a commitment to continuous learning, I am building a solid foundation in web development while exploring innovative solutions.</p>
            </div>
            <div>
              <h2 className='text-2xl font-semibold mb-2'>Skills</h2>
             <ul className='list-disc ml-5 space-y-1   text-left'>
                <li>Front-end Development with React</li>
                <li>Responsive and Mobile-first Design</li>
                <li>JavaScript, HTML5, CSS3, and Tailwind CSS</li>
                <li>Basic Backend Development with Node.js</li>
                <li>Fundamentals of Graphic Design</li>
                <li>User Interface (UI) and User Experience (UX) Design Principles</li>
              </ul>
            </div>
            <div className='mb-4'>
              <h2 className='text-2xl font-semibold mb-2'>Hobbies</h2>
               <ul className='list-disc ml-5 space-y-1 text-left'>
                  <li>Playing football and staying active through sports</li>
                  <li>Writing creative stories and poetry</li>
                  <li>Editing videos and maintaining a personal blog</li>
                  <li>Traveling and discovering nature and wildlife</li>
                </ul>
            </div>
          </div>
        </div>

        {/* Dynamic Resume Section */}
        <div className='bg-black text-white items-center text-center object-cover m-2 p-8 w-full'>
          <div className='mt-8 p-6 border border-blue-500 rounded-md'>
            <h2 className='text-2xl font-bold mb-4'>My Resume</h2>
            <p className='mb-4'>{resumeText || 'Resume information not available at the moment.'}</p>
            {resumeLink && (
              <Link
                to={resumeLink}
                target="_blank"
                rel="noopener noreferrer"
                className='inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-800 transition'
              >
                View My Resume
              </Link>
            )}
          </div>
        </div>
    </>
  );
}

export default About;
