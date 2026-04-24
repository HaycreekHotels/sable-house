import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroImage from "../components/layout/Heros/HeroImage";

export const metadata = {
  title: "Privacy Policy | Sable House",
  description: "Privacy Policy at the Sable House",
};

gsap.registerPlugin(ScrollTrigger);

const privacySections = [
  {
    title: "Information We Collect",
    body: "We may collect personal information you choose to provide, such as your name, email address, phone number, reservation details, and any information submitted through forms on our website.",
  },
  {
    title: "How We Use Information",
    body: "Information may be used to respond to inquiries, process reservations, improve the guest experience, send relevant updates, and support the operation, security, and performance of our website.",
  },
  {
    title: "Cookies & Analytics",
    body: "Our website may use cookies and analytics tools to better understand how visitors use the site, improve usability, and help us maintain a smooth and personalized browsing experience.",
  },
  {
    title: "Third-Party Services",
    body: "Some parts of the website may rely on trusted third-party platforms for booking functionality, analytics, embedded content, or other services. Those providers may process information in accordance with their own privacy practices.",
  },
  {
    title: "Data Protection",
    body: "We take reasonable steps to protect personal information and maintain safeguards designed to help prevent unauthorized access, misuse, alteration, or disclosure.",
  },
  {
    title: "Your Choices",
    body: "You may contact us if you would like to request updates, corrections, or further information about personal data submitted through our website, subject to applicable law.",
  },
];

export default function PrivacyPage() {
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-reveal]", {
        y: 28,
        opacity: 0,
      });

      gsap.to("[data-hero-copy]", {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.utils.toArray("[data-reveal]").forEach((element, index) => {
        gsap.to(element, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index % 3 === 0 ? 0 : 0.05,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 84%",
            once: true,
          },
        });
      });

      gsap.utils.toArray("[data-card]").forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 18,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              once: true,
            },
          },
        );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="bg-[#f5f3ee] text-[#1e1e1a]">
      <section className="relative">
        <HeroImage
          image="https://images.unsplash.com/photo-1595798623727-e7c56310f69a?q=80&w=1824&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="The grand park in Savannah, Georgia with a central fountain"
        />

        <div className="absolute inset-0 bg-black/30" />

        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-6xl px-5 pb-12 md:px-8 md:pb-16 lg:pb-20">
            <div data-hero-copy className="max-w-2xl translate-y-6 opacity-0">
              <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-white/80 md:text-xs">
                The Sable House
              </p>
              <h1 className="text-4xl font-medium leading-tight text-white md:text-6xl">
                Privacy,
                <span className="block text-white/85">clearly stated.</span>
              </h1>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 md:text-base">
                A simple overview of how information is collected, used, and
                protected across our website experience in Savannah, Georgia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div data-reveal>
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#6c6a63] md:text-xs">
              Privacy policy
            </p>
            <h2 className="mt-3 max-w-2xl text-3xl font-medium leading-tight md:text-5xl">
              Respecting personal information is part of a thoughtful guest
              experience.
            </h2>
          </div>

          <div
            data-reveal
            className="space-y-5 text-sm leading-7 text-[#4f4d46] md:text-base"
          >
            <p>
              The Sable House values your privacy and is committed to handling
              personal information with care, transparency, and respect.
            </p>
            <p>
              This page outlines the general ways information may be collected,
              used, and protected when you visit our website, submit forms, or
              engage with online services connected to our property.
            </p>
            <p>
              We may update this policy from time to time to reflect
              operational, legal, or technology changes, and encourage guests to
              review it periodically.
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white/70">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div data-reveal className="max-w-2xl">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#6c6a63] md:text-xs">
              Overview
            </p>
            <h2 className="mt-3 text-3xl font-medium md:text-4xl">
              How we handle information
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#4f4d46] md:text-base">
              Below is a general summary of the main privacy topics most guests
              want to understand when browsing, contacting, or booking online.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {privacySections.map((item) => (
              <article
                key={item.title}
                data-card
                className="rounded-3xl border border-black/8 bg-[#faf8f4] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]"
              >
                <h3 className="text-lg font-medium text-[#1e1e1a]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-[#4f4d46]">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <article
            data-reveal
            className="rounded-32px border border-black/8 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-10"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#6c6a63] md:text-xs">
              Communications
            </p>
            <h2 className="mt-3 text-2xl font-medium md:text-3xl">
              Marketing & Contact Preferences
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#4f4d46] md:text-base">
              If you choose to contact us or subscribe to updates, we may use
              your information to respond or share relevant property news,
              offers, or service updates. You may opt out of non-essential
              communications where applicable.
            </p>
          </article>

          <article
            data-reveal
            className="rounded-32px border border-black/8 bg-[#1f1f1b] p-8 text-white shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:p-10"
          >
            <p className="text-[11px] uppercase tracking-[0.28em] text-white/60 md:text-xs">
              Retention
            </p>
            <h2 className="mt-3 text-2xl font-medium md:text-3xl">
              Data Retention & Legal Requests
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/75 md:text-base">
              We may retain information for as long as reasonably necessary to
              operate our services, comply with legal obligations, resolve
              disputes, or maintain business records consistent with applicable
              requirements.
            </p>
          </article>
        </div>
      </section>

      <section className="bg-[#ece8df]">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.8fr] lg:gap-16">
            <div data-reveal>
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#6c6a63] md:text-xs">
                Questions
              </p>
              <h2 className="mt-3 text-3xl font-medium leading-tight md:text-5xl">
                Need more information about our privacy practices?
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-[#4f4d46] md:text-base">
                If you have questions about this policy or how personal
                information is handled through our website, we welcome you to
                contact our team for assistance.
              </p>
            </div>

            <div
              data-reveal
              className="rounded-32px border border-black/8 bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:p-10"
            >
              <h2 className="text-2xl font-medium md:text-3xl">Contact Us</h2>
              <p className="mt-4 text-sm leading-7 text-[#4f4d46] md:text-base">
                For privacy-related questions, requests, or concerns, please use
                the contact information below.
              </p>

              <div className="mt-8 border-t border-black/10 pt-6">
                <p className="text-sm uppercase tracking-[0.22em] text-[#6c6a63]">
                  Privacy contact
                </p>
                <address className="mt-4 not-italic space-y-3 text-base text-[#1e1e1a]">
                  <p className="font-medium">The Sable House</p>
                  <p>
                    <a
                      href="tel:1234567890"
                      className="transition-opacity hover:opacity-60"
                    >
                      123.456.8790
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:info@sabalhouse.com"
                      className="break-all transition-opacity hover:opacity-60"
                    >
                      info@sabalhouse.com
                    </a>
                  </p>
                </address>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
