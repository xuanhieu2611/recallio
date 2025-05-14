"use client"

import React from "react"
import { motion } from "framer-motion"
import {
  BookOpen,
  ArrowRight,
  BarChart2,
  BrainCircuit,
  Clock,
} from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <nav className="bg-white px-6 py-4 shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.svg" alt="Recallio Logo" className="mr-2 h-8 w-8" />
            <span className="text-xl font-semibold text-green-500">
              Recallio
            </span>
          </div>

          <div className="hidden items-center space-x-6 md:flex">
            <a href="#features" className="text-gray-600 hover:text-gray-900">
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-600 hover:text-gray-900"
            >
              How It Works
            </a>
            <a
              href="#testimonials"
              className="text-gray-600 hover:text-gray-900"
            >
              Testimonials
            </a>
          </div>

          <Link href="/dashboard" className="btn-primary">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-500 to-green-700 py-16 text-white md:py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center md:flex-row">
            <div className="mb-10 md:mb-0 md:w-1/2">
              <motion.h1
                className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Master New Words with Smarter Repetition
              </motion.h1>
              <motion.p
                className="mb-8 text-lg text-blue-100 md:text-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Recallio uses spaced repetition science to help you learn and
                remember vocabulary effectively. Learn new words and never
                forget them.
              </motion.p>
              <motion.div
                className="flex flex-col gap-4 sm:flex-row"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Link
                  href="/dashboard"
                  className="rounded-lg bg-white px-6 py-3 font-medium text-green-600 shadow-lg transition-colors hover:bg-gray-100"
                >
                  Start Learning Now
                </Link>
                <Link
                  href="/learn"
                  className="rounded-lg border-2 border-white bg-transparent px-6 py-3 font-medium transition-colors hover:bg-white/10"
                >
                  Explore Words
                </Link>
              </motion.div>
            </div>

            <div className="flex justify-center md:w-1/2">
              <motion.div
                className="w-full max-w-md"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                <div className="rotate-2 transform overflow-hidden rounded-xl bg-white shadow-xl">
                  <div className="p-6">
                    <div className="mb-6 flex items-center justify-between">
                      <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-600">
                        Advanced
                      </span>
                      <span className="text-sm text-gray-400">
                        Word of the Day
                      </span>
                    </div>
                    <h2 className="mb-2 text-3xl font-bold text-gray-800">
                      serendipity
                    </h2>
                    <p className="mb-4 text-gray-500 italic">
                      [ser-uhn-dip-i-tee]
                    </p>
                    <p className="mb-4 text-gray-700">
                      The occurrence of events by chance in a happy or
                      beneficial way.
                    </p>
                    <p className="text-gray-600 italic">
                      "Finding that rare book was pure serendipity."
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              Learn Better with Science
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our app uses proven spaced repetition techniques to help you learn
              and retain vocabulary more effectively than traditional methods.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <motion.div
              className="rounded-xl bg-white p-6 shadow-md"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <BrainCircuit className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Spaced Repetition</h3>
              <p className="text-gray-600">
                Our algorithm schedules reviews at optimal intervals to maximize
                retention while minimizing time spent reviewing.
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl bg-white p-6 shadow-md"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="bg-secondary-100 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <BookOpen className="text-secondary-600 h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Smart Learning</h3>
              <p className="text-gray-600">
                Swipe interface makes it easy to select new words you want to
                learn. Focus only on what matters to you.
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl bg-white p-6 shadow-md"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="bg-accent-100 mb-4 flex h-12 w-12 items-center justify-center rounded-lg">
                <BarChart2 className="text-accent-600 h-6 w-6" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Progress Tracking</h3>
              <p className="text-gray-600">
                Visual charts and statistics show your learning progress and
                help you stay motivated on your vocabulary journey.
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl bg-white p-6 shadow-md"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Time Efficient</h3>
              <p className="text-gray-600">
                Learn more words in less time with our optimized system. Just a
                few minutes a day keeps forgetting away.
              </p>
            </motion.div>

            <motion.div
              className="rounded-xl bg-white p-6 shadow-md md:col-span-2 lg:col-span-2"
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <div className="flex items-start">
                <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="mb-2 text-xl font-semibold">
                    Curated Word Lists
                  </h3>
                  <p className="mb-4 text-gray-600">
                    Access thoughtfully curated word lists across different
                    difficulty levels and topics. From SAT prep to professional
                    jargon.
                  </p>
                  <Link
                    href="/dashboard"
                    className="flex items-center font-medium text-green-500 hover:text-green-600"
                  >
                    Explore Lists <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              How Recallio Works
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-600">
              Our simple three-step process makes vocabulary acquisition both
              effective and enjoyable.
            </p>
          </div>

          <div className="grid gap-8 text-center md:grid-cols-3">
            <div>
              <div className="relative mx-auto mb-6">
                <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <span className="text-3xl font-bold text-green-600">1</span>
                </div>
                <div className="absolute top-10 left-full -z-10 hidden h-1 w-full -translate-x-10 transform bg-green-100 md:block"></div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Discover Words</h3>
              <p className="text-gray-600">
                Browse and select new words that interest you using our
                intuitive swipe interface.
              </p>
            </div>

            <div>
              <div className="relative mx-auto mb-6">
                <div className="relative z-10 mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <span className="text-3xl font-bold text-green-600">2</span>
                </div>
                <div className="absolute top-10 left-full -z-10 hidden h-1 w-full -translate-x-10 transform bg-green-100 md:block"></div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Practice & Review</h3>
              <p className="text-gray-600">
                Review words with our spaced repetition system optimized for
                your learning pace.
              </p>
            </div>

            <div>
              <div className="mx-auto mb-6">
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                  <span className="text-3xl font-bold text-green-600">3</span>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-semibold">Track Mastery</h3>
              <p className="text-gray-600">
                Monitor your progress with detailed analytics and watch your
                vocabulary grow.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/dashboard"
              className="btn-primary inline-flex items-center px-6 py-3"
            >
              Start Your Learning Journey{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-500 py-16 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">
            Ready to Expand Your Vocabulary?
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl text-blue-100">
            Join thousands of learners who are already building their vocabulary
            the smart way. It only takes a few minutes a day!
          </p>
          <Link
            href="/dashboard"
            className="inline-block rounded-lg bg-white px-8 py-4 text-lg font-medium text-green-600 shadow-lg transition-colors hover:bg-gray-100"
          >
            Start Learning for Free
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center">
                <img
                  src="/logo.svg"
                  alt="Recallio Logo"
                  className="mr-2 h-8 w-8"
                />
                <span className="text-xl font-semibold">Recallio</span>
              </div>
              <p className="mt-2 text-gray-400">
                Boost your vocabulary with science.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <div>
                <h4 className="mb-3 font-semibold">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Word Lists
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Premium
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 font-semibold">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Guides
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Support
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="mb-3 font-semibold">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-gray-400 hover:text-white">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-gray-700 pt-8 text-center md:text-left">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Recallio. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
