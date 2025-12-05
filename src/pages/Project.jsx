import React from 'react';
import Hero from './Hero';
import ProjectFiles from '../upload/ProjectFiles';

function Project() {
  return (
    <>
    <Hero/>
    <main className='py-4 w-full'>
      <div className='bg-black text-white p-8 my-4'>
          <h2 className='font-bold'>Projects</h2>
          <p>
            Throughout my journey as a budding software developer, I have worked on a variety of projects that demonstrate my skills and commitment to quality. Each project represents an opportunity to solve real-world problems by applying modern technologies and best practices in software development.
          </p><br/>

          <p>
            My portfolio includes responsive web applications built with React, intuitive user interfaces, and foundational backend services using Node.js. These projects highlight my continuous learning process and my dedication to delivering practical and effective digital solutions.
          </p>
        </div>

      <ProjectFiles isAdminPage={false} />
    </main>

    </>
  );
}

export default Project;