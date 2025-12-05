import React, { useState, useEffect } from 'react';
import HeroBg from '../assets/project_files/copenhagen.png';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

function Contact() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
    phone_number: '',
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const MAX_MESSAGE_LENGTH = 200;

  const [contactInfo, setContactInfo] = useState({
    mailingAddress: '',
    phoneNumber: '',
  });

 // ✅ Fetch dynamic contact info
  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const docRef = doc(db, 'contactInfo', 'main');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          console.log('Fetched contact info:', docSnap.data());
          setContactInfo(docSnap.data());
        } else {
          console.warn('No contactInfo document found!');
        }
      } catch (err) {
        console.error('Error fetching contact info:', err);
      }
    };

    fetchContactInfo();
  }, []);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First Name is required.';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last Name is required.';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Email is invalid.';
    }
    if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone Number is required.';
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required.';
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message cannot exceed ${MAX_MESSAGE_LENGTH} characters.`;
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) return;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validateErrors = validate();
    if (Object.keys(validateErrors).length > 0) {
      setErrors(validateErrors);
      setSuccess(false);
    } else {
      setErrors({});
      setSuccess(true);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone_number: '',
        message: '',
      });
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <main
      className="min-h-screen bg-cover bg-center flex items-center justify-start p-1"
      style={{ backgroundImage: `url(${HeroBg})` }}
    >
      <div className="rounded-lg shadow-md p-8 w-full max-w-md bg-blue-20 bg-opacity-50 backdrop-blur-sm">
        <h2 className="text-2xl text-black font-bold mb-4 text-center">
          Just write me away for Further Infos:
        </h2>

        <form
          className="flex flex-col gap-4"
          noValidate
          onSubmit={handleSubmit}
          action="https://formsubmit.co/sherabnamgyal71@gmail.com"
          method="POST"
        >
          {/* FormSubmit settings */}
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value="https://yourdomain.com/thank-you" />
          <input type="hidden" name="_template" value="box" />
          <input type="hidden" name="_subject" value="New Contact Form Submission" />

          {/* First Name */}
          <label htmlFor="first_name" className="block mb-1 font-medium">First Name:</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.first_name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
            required
            placeholder="First name"
          />
          {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}

          {/* Last Name */}
          <label htmlFor="last_name" className="block mt-4 mb-1 font-medium">Last Name:</label>
          <input
            id="last_name"
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.last_name ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
            required
            placeholder="Last name"
          />
          {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}

          {/* Email */}
          <label htmlFor="email" className="block mt-4 mb-1 font-medium">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.email ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
            required
            placeholder="Your email"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}

          {/* Phone Number */}
          <label htmlFor="phone_number" className="block mt-4 mb-1 font-medium">Phone No.:</label>
          <input
            id="phone_number"
            type="tel"
            name="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.phone_number ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
            required
            placeholder="Phone number"
          />
          {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}

          {/* Message */}
          <label htmlFor="message" className="block mt-4 mb-1 font-medium">
            Message (max {MAX_MESSAGE_LENGTH})
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="8"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 ${
              errors.message ? 'border-red-500 focus:ring-red-400' : 'border-gray-300 focus:ring-blue-400'
            }`}
            required
            placeholder="Your queries..."
          />
          <p className="text-sm text-gray-900 mt-1">
            {formData.message.length} / {MAX_MESSAGE_LENGTH} characters
          </p>
          {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-orange-600 text-white font-sans font-bold rounded px-4 py-2 hover:bg-orange-700 transition disabled:opacity-50"
            disabled={
              !formData.first_name ||
              !formData.last_name ||
              !formData.email ||
              !formData.phone_number ||
              !formData.message
            }
          >
            Send Message
          </button>

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
              Message sent successfully!
            </div>
          )}
        </form>

        {/* Dynamic Contact Info */}
        <div className="mt-8 text-black text-sm bg-white bg-opacity-70 p-4 rounded">
          <h3 className="text-lg font-semibold mb-2">Contact Info</h3>
          <p><strong>Phone:</strong> {contactInfo.phone || 'Loading....'}</p>
          <p><strong>Mailing Address:</strong> {contactInfo.address || 'Loading...'}</p>
        </div>
      </div>
    </main>
  );
}

export default Contact;
