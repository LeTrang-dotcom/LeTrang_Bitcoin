"use client";

import Link from "next/link";
import { useState } from "react";

export default function FooterComponent() {
  const [successMessage, setSuccessMessage] = useState("");
  const [email, setEmail] = useState("");

  function subscribe() {
    if (email) {
      setSuccessMessage("Thank you for subscribing!");
      setEmail("");
    }
  }

  return (
    <footer className="bg-[var(--footer-bg)] text-[var(--text)] py-10 shadow-2xl">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-4">Your Company</h2>
          <p className="text-sm">
            We provide the best products and services for your needs. Quality
            and customer satisfaction are our top priorities.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Quick Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:underline">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">Contact</h2>
          <ul className="space-y-2">
            <li>
              <i className="fas fa-map-marker-alt mr-2"></i>
              123 Main Street, City, Country
            </li>
            <li>
              <i className="fas fa-phone-alt mr-2"></i>
              +1 234 567 890
            </li>
            <li>
              <i className="fas fa-envelope mr-2"></i>
              info@yourcompany.com
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-4">
            Subscribe to Our Newsletter
          </h2>
          <form onSubmit={subscribe}>
            <input
              type="email"
              v-model="email"
              placeholder="Enter your email"
              className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 py-2 rounded text-white hover:bg-blue-500"
            >
              Subscribe
            </button>
          </form>
          {successMessage && (
            <div className="text-green-400 mt-3">{successMessage}</div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-700 mt-8 pt-4">
        <div className="container mx-auto flex justify-between items-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-blue-500">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-blue-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-pink-500">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-blue-600">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
