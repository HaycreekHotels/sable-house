"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const MOTION_DURATION = 0.32;

function FAQAnswer({ blocks }) {
  return (
    <div className="space-y-4 pb-7 pt-1 font-central-regular text-[14px] leading-[1.8] text-foreground sm:text-[15px]">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "paragraph":
            return (
              <p key={key} className="font-central-regular">
                {block.text}
              </p>
            );

          case "labeledParagraph":
            return (
              <p key={key} className="font-central-regular">
                <strong className="font-semibold">{block.label}</strong>{" "}
                {block.text}
              </p>
            );

          case "list":
            return (
              <ul key={key} className="list-disc space-y-1 pl-5">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );

          case "note":
            return (
              <p
                key={key}
                className="font-central-regular text-[13px] italic text-contrast"
              >
                {block.text}
              </p>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}

export default function FAQItem({ faq }) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);
  const answerRef = useRef(null);
  const answerId = `faq-answer-${faq.id}`;
  const questionId = `faq-question-${faq.id}`;

  useGSAP(
    () => {
      const panel = answerRef.current;
      if (!panel) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      gsap.killTweensOf(panel);

      if (reduceMotion) {
        gsap.set(panel, {
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
          visibility: isOpen ? "visible" : "hidden",
        });
        return;
      }

      if (!isOpen && panel.style.visibility === "hidden") return;

      gsap.to(panel, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: MOTION_DURATION,
        ease: "power2.inOut",
        overwrite: "auto",
        onStart: () => {
          if (isOpen) panel.style.visibility = "visible";
        },
        onComplete: () => {
          if (!isOpen) panel.style.visibility = "hidden";
        },
      });
    },
    { scope: wrapperRef, dependencies: [isOpen] },
  );

  return (
    <div ref={wrapperRef} className="border-b border-[#98948c]">
      <h3>
        <button
          id={questionId}
          type="button"
          aria-expanded={isOpen}
          aria-controls={answerId}
          onClick={() => setIsOpen((current) => !current)}
          className="group relative flex min-h-[75px] w-full items-center justify-center px-9 py-5 text-center font-central-regular text-[15px] leading-[1.5] text-foreground transition-colors duration-200 hover:text-main focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-main sm:text-[16px] motion-reduce:transition-none"
        >
          <span>{faq.question}</span>
          <svg
            className={`pointer-events-none absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 transition-transform duration-300 motion-reduce:transition-none ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m3.5 8.5 8.5 8 8.5-8" />
          </svg>
        </button>
      </h3>

      {/* Answer is always in server-rendered HTML, including when collapsed. */}
      <div
        id={answerId}
        ref={answerRef}
        aria-labelledby={questionId}
        aria-hidden={!isOpen}
        style={{
          height: 0,
          opacity: 0,
          visibility: "hidden",
          overflow: "hidden",
        }}
      >
        <FAQAnswer blocks={faq.answer} />
      </div>
    </div>
  );
}
