import React from 'react';
import Logo from '../assets/logos/logo1.svg'
import {FaFacebook, FaInstagram, FaLinkedin, FaYoutube,FaWhatsapp, FaGithub} from 'react-icons/fa';
import {SiTiktok} from 'react-icons/si';
import { FaMapMarkedAlt } from 'react-icons/fa';

const socialLinks =[
  {
    name:'Facebook',
    icon:<FaFacebook/>,
    url:'https://facebook.com/sherab.luis.jr11',
  },

  {
    name:'Instagram',
    icon:<FaInstagram/>,
    url:'https://instagram.com/luis_sherabjr11',
  },

  {
    name:'TikTok',
    icon:<SiTiktok/>,
    url:'https://tiktok.com/@luis_sherabjr11',
  },

  {
    name:'LinkedIn',
    icon:<FaLinkedin/>,
    url:'https://linkedin.com/in/sherabluis11',
  },

  {
    name:'YouTube',
    icon:<FaYoutube/>,
    url:'https://youtube.com/@luissherabjr.11',
  },

  {
    name:'whatsapp',
    icon:<FaWhatsapp/>,
    url:'https://whatsapp.com/luissherabjr',
  },
  {
    name:'Github',
    icon:<FaGithub/>,
    url:'https://Github.com/luissherabjr',
  },
]

function Footer() {
  return (
    <footer className='bg-black  w-full'>
      <div className='flex flex-col items-center justify-between md:flex-col md:justify-between gap-2'>
        <h1 className='text-xl font-bold mb-4 text-center text-white mt-4'>Social Media</h1> 
        <div className='flex flex-row items-center   justify-between gap-14'>
          <div className='w-20 h-20'>
            <img src={Logo} alt="Logo" className='w-full h-full object-contain' />
          </div>
          <div className='flex flex-row items-center space-x-6 mb-4 text-4xl text-blue-300'>
          {socialLinks.map((social) => (
            <a 
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className='hover:text-blue-500'
            >
              {social.icon}
            </a>
          ))}
          </div>
        </div>
         
        <div className='flex flex-row items-center justify-between gap-16 border-t border-gray-700 my-4'>
         <p className='text-white text-sm'>&copy;2025 Luis Sherab Jr. All Rights are Reserved by <span className='font-bold text-red-700 items-center flex flex-col'>Luis Sherab Jr.</span></p>

         <div className='flex flex-col text-white  text-sm items-center space-y-2'>
            <a href="https://www.google.com/maps/place/Copenhagen, +Denmark" target="_blank" rel="noopener noreferrer" className='flex flex-col text-white text-sm items-center space-y-2 ' aria-label='view location on Google Maps'>
              <FaMapMarkedAlt className='text-blue-300 text-3xl hover:text-blue-600 trasition'/>
             <span>Copenhagen, Denmark</span>
            </a>
         </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer;