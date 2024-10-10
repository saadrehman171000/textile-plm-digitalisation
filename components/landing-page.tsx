'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, MessageCircle, Users, Zap, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function LandingPageComponent() {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Navbar */}
        <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <div className="flex items-center">
                <Link href="/" className="flex-shrink-0 flex items-center">
                  <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="ml-2 text-2xl font-bold">FiberFlow</span>
                </Link>
              </div>
              <div className="hidden sm:flex sm:space-x-8">
                {['About', 'Features', 'Testimonials', 'Contact'].map((item) => (
                  <Link key={item} href={`#${item.toLowerCase()}`} className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-300">
                    {item}
                  </Link>
                ))}
              </div>
              <div className="flex items-center space-x-4">
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleDarkMode}
                  className="bg-gray-200 dark:bg-gray-700"
                />
                {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <Button variant="outline" className="hidden sm:inline-flex" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button className="hidden sm:inline-flex" asChild>
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <motion.div
                className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl tracking-tight font-extrabold sm:text-5xl md:text-6xl">
                  <span className="block">Digitalizing the</span>
                  <span className="block text-blue-600 dark:text-blue-400">Textile Industry</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-xl">
                  Enhancing Product Lifecycle Management with real-time transparency, innovation, and automation.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                  <Button size="lg" className="w-full sm:w-auto" asChild>
                    <Link href="/signup">
                      Get started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
              <motion.div
                className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <img
                    className="w-full rounded-lg"
                    src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
                    alt="Textile factory"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {[
                { name: 'Real-time Updates', description: 'Get instant notifications and updates on your textile production process.', icon: CheckCircle },
                { name: 'Fabric Defect Detection', description: 'Advanced AI algorithms to detect and report fabric defects in real-time.', icon: Users },
                { name: 'Innovative Marketplace', description: 'Connect buyers and sellers efficiently in our digital textile marketplace.', icon: MessageCircle },
                { name: 'Sustainability Tracking', description: 'Monitor and improve the environmental impact of your textile production.', icon: Zap },
              ].map((feature, index) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-transform duration-300 hover:scale-105">
                    <CardContent className="p-6 flex flex-col h-full">
                      <feature.icon className="h-10 w-10 text-blue-600 dark:text-blue-400 mb-4" />
                      <h3 className="text-lg font-medium mb-2">{feature.name}</h3>
                      <p className="text-base text-gray-500 dark:text-gray-400 flex-grow">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white dark:bg-gray-800 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-center mb-12">
              What Our Clients Say
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {[
                { quote: "FiberFlow has revolutionized our textile operations. The real-time updates and defect detection have significantly improved our production efficiency.", author: "Textile Corp" },
                { quote: "The PLM digitalization from FiberFlow helped us streamline communication with suppliers and reduce lead times by 30%.", author: "Global Textiles" },
                { quote: "An excellent platform with a user-friendly interface and exceptional support from the FiberFlow team.", author: "FashionTech" },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full transition-transform duration-300 hover:scale-105">
                    <CardContent className="p-6 flex flex-col h-full">
                      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{testimonial.quote}</p>
                      <p className="font-semibold">{testimonial.author}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto">
              <h2 className="text-3xl font-extrabold text-center mb-8">
                Contact Us
              </h2>
              <motion.form
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">
                    Your Name
                  </label>
                  <Input id="name" name="name" type="text" required />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Your Email
                  </label>
                  <Input id="email" name="email" type="email" required />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Your Message
                  </label>
                  <Textarea id="message" name="message" rows={4} required />
                </div>
                <div>
                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </div>
              </motion.form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-800 dark:bg-gray-900 text-white transition-colors duration-300">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2 md:col-span-1">
                <svg className="h-8 w-8 text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="mt-4 text-base text-gray-300">
                  Digitalizing the textile industry with innovative PLM solutions.
                </p>
                <div className="flex space-x-6 mt-4">
                  {['facebook', 'twitter', 'linkedin'].map((item) => (
                    <a key={item} href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                      <span className="sr-only">{item}</span>
                      <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
              {['Solutions', 'Support', 'Company'].map((category) => (
                <div key={category}>
                  <h3 className="text-sm font-semibold uppercase tracking-wider">{category}</h3>
                  <ul className="mt-4 space-y-4">
                    {['PLM', 'Fabric Detection', 'Marketplace', 'Analytics'].map((item) => (
                      <li key={item}>
                        <a href="#" className="text-base text-gray-300 hover:text-white transition-colors duration-300">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-gray-700 pt-8">
              <p className="text-base text-gray-400 text-center">
                &copy; 2024 FiberFlow. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}