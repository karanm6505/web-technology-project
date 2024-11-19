import { Mail, Phone, MapPin, Clock, Send, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct email body
    const emailBody = `
Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}

Message:
${formData.message}
    `;

    // Create mailto link
    const mailtoLink = `mailto:karanm6505@gmail.com?subject=New Contact Form Submission&body=${encodeURIComponent(emailBody)}`;
    
    // Open default email client
    window.location.href = mailtoLink;

    // Reset form
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)]" />
      
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="relative z-10 max-w-xl mx-auto text-center mb-20">
            <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-4">
              Contact Us
            </p>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Let's Build Something Together
            </h1>
            <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left Column - Contact Info */}
            <div className="space-y-12">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
                <div className="relative bg-zinc-900 rounded-lg p-8">
                  <h2 className="text-2xl font-bold text-white mb-8">Get in Touch</h2>
                  <div className="space-y-8">
                    {/* Email */}
                    <div className="flex items-center space-x-6 group">
                      <div className="flex-shrink-0">
                        <div className="p-4 bg-blue-500/10 rounded-lg group-hover:bg-blue-500/20 transition duration-300">
                          <Mail className="h-6 w-6 text-blue-500" />
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Email</p>
                        <a href="mailto:karanm6505@gmail.com" 
                           className="text-white hover:text-blue-400 transition-colors flex items-center group">
                          karanm6505@gmail.com
                          <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      </div>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center space-x-6 group">
                      <div className="flex-shrink-0">
                        <div className="p-4 bg-purple-500/10 rounded-lg group-hover:bg-purple-500/20 transition duration-300">
                          <Phone className="h-6 w-6 text-purple-500" />
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Phone</p>
                        <a href="tel:+916360384503" 
                           className="text-white hover:text-purple-400 transition-colors flex items-center group">
                          +91-6360384503
                          <ArrowRight className="h-4 w-4 ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                        </a>
                      </div>
                    </div>

                    {/* Location */}
                    <div className="flex items-center space-x-6 group">
                      <div className="flex-shrink-0">
                        <div className="p-4 bg-green-500/10 rounded-lg group-hover:bg-green-500/20 transition duration-300">
                          <MapPin className="h-6 w-6 text-green-500" />
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Location</p>
                        <p className="text-white">
                          PES University<br />
                          100 Feet Ring Road, BSK III Stage<br />
                          Bangalore - 560085
                        </p>
                      </div>
                    </div>

                    {/* Hours */}
                    <div className="flex items-center space-x-6 group">
                      <div className="flex-shrink-0">
                        <div className="p-4 bg-orange-500/10 rounded-lg group-hover:bg-orange-500/20 transition duration-300">
                          <Clock className="h-6 w-6 text-orange-500" />
                        </div>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Hours</p>
                        <p className="text-white">
                          Monday - Friday<br />
                          9:00 AM - 6:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Contact Form */}
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative bg-zinc-900 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-white mb-8">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                                 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                 transition-colors text-white"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                                 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                                 transition-colors text-white"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                               focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                               transition-colors text-white"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="6"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3
                               focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500
                               transition-colors text-white"
                      placeholder="Your message..."
                    ></textarea>
                  </div>

                  <Button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 
                             text-white rounded-lg py-6 flex items-center justify-center space-x-2 group"
                  >
                    <span>Send Message</span>
                    <Send className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;