"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ContactPageSection() {
  const sectionRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Contact form submitted:", formData);

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-intro",
        {
          autoAlpha: 0,
          y: 35,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".contact-intro-wrapper",
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".contact-detail-item",
        {
          autoAlpha: 0,
          y: 30,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".contact-content-grid",
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        ".contact-form",
        {
          autoAlpha: 0,
          y: 45,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".contact-content-grid",
            start: "top 75%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={sectionRef}
      className="min-h-screen bg-secondary px-5 py-20 text-main md:px-10 lg:px-16"
    >
      <section className="mx-auto max-w-6xl">
        <div className="contact-intro-wrapper mb-16 max-w-3xl">
          <p className="contact-intro mb-4 text-sm uppercase tracking-[0.35em] text-contrast opacity-0">
            Sabal House
          </p>

          <h1 className="contact-intro font-serif text-5xl leading-tight text-main opacity-0 md:text-7xl">
            Contact Us
          </h1>

          <p className="contact-intro mt-6 max-w-2xl text-base leading-8 text-main/80 opacity-0 md:text-lg">
            Have a question about your stay, room availability, or special
            requests? Send us a note and our team will be happy to help.
          </p>
        </div>

        <div className="contact-content-grid grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="space-y-8">
            <div className="contact-detail-item border-t border-main/25 pt-6 opacity-0">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-contrast">
                Phone
              </p>
              <a
                href="tel:+15555551234"
                className="text-xl text-main transition-opacity hover:opacity-70"
              >
                (555) 555-1234
              </a>
            </div>

            <div className="contact-detail-item border-t border-main/25 pt-6 opacity-0">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-contrast">
                Address
              </p>
              <address className="not-italic text-xl leading-8 text-main">
                123 Sabal House Lane
                <br />
                Savannah, GA 31401
              </address>
            </div>

            <div className="contact-detail-item border-t border-main/25 pt-6 opacity-0">
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-contrast">
                Email
              </p>
              <a
                href="mailto:hello@sabalhouse.com"
                className="text-xl text-main transition-opacity hover:opacity-70"
              >
                hello@sabalhouse.com
              </a>
            </div>
          </aside>

          <form
            onSubmit={handleSubmit}
            className="contact-form border border-main/20 bg-secondary p-6 opacity-0 md:p-10"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-3 block text-xs uppercase tracking-[0.25em] text-contrast"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full border border-main/20 bg-transparent px-4 py-4 text-main outline-none transition-colors placeholder:text-main/40 focus:border-contrast"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-3 block text-xs uppercase tracking-[0.25em] text-contrast"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  className="w-full border border-main/20 bg-transparent px-4 py-4 text-main outline-none transition-colors placeholder:text-main/40 focus:border-contrast"
                />
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="message"
                className="mb-3 block text-xs uppercase tracking-[0.25em] text-contrast"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help?"
                rows={8}
                className="w-full resize-none border border-main/20 bg-transparent px-4 py-4 text-main outline-none transition-colors placeholder:text-main/40 focus:border-contrast"
              />
            </div>

            <button
              type="submit"
              className="mt-8 inline-flex min-h-14 items-center justify-center border border-main px-8 text-xs uppercase tracking-[0.25em] text-main transition-colors duration-300 hover:bg-main hover:text-secondary"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
