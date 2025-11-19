'use client';
import React, { useState } from 'react';

const faqs = [
  {
    q: 'What is the purpose of these assessments?',
    a:
      'Our assessments are designed to evaluate the psychological, social, and environmental conduct of children to calculate their Holistic Development Index (HDI). The goal is to identify strengths and areas for improvement, helping children grow emotionally, socially, and environmentally aware.'
  },
  { q: 'Who can take these assessments?', a: 'Students enrolled in participating schools and programs.' },
  { q: 'How long does each assessment take?', a: 'Typically 20–45 minutes depending on the assessment type.' },
  { q: 'Are the assessments mandatory?', a: 'Participation depends on school policy and parental consent.' },
  { q: 'How will these assessments benefit my child?', a: 'They highlight growth areas and help teachers plan targeted support.' },
  { q: 'Will I receive feedback after the assessment?', a: 'Yes — schools usually share a summary report with parents.' },
  { q: "Can I monitor my child's progress over time?", a: 'Yes — repeated assessments track progress across periods.' },
  { q: 'Do I need to be present during the assessment?', a: 'Not usually; teachers administer them as required.' },
  { q: 'How can schools integrate these assessments into their curriculum?', a: 'Schools can use HDI scores to plan interventions and tailor learning.' },
  { q: 'Can teachers view the results of their students?', a: 'Yes — with proper permissions teachers can access student reports.' },
  { q: 'Are the assessments standardized?', a: 'They follow validated frameworks but may adapt locally.' },
  { q: 'How can schools use the HDI scores?', a: 'For planning, resource allocation, and tracking holistic growth.' },
  { q: 'Will the assessments feel like a test?', a: 'They are designed to be child-friendly and non-threatening.' },
  { q: "What happens if I don't perform well?", a: 'Results are used to support, not penalize — they inform help and interventions.' },
  { q: 'Will my answers be private?', a: 'Yes — data privacy policies govern access to individual responses.' },
  { q: 'Do I need any special equipment to take the assessment?', a: 'No — most assessments require just basic digital access.' },
  { q: 'Can I pause the assessment and resume later?', a: 'Many assessments support pausing and resuming; depends on admin settings.' },
  { q: 'What if I face technical issues during the assessment?', a: 'Contact the proctor or support team immediately for assistance.' }
];

export default function FAQAccordion() {
  // ✅ Set first FAQ open by default (index 0)
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  };

  return (
    <section className="w-full min-h-screen bg-white text-black py-10 xl:mx-3 2xl:mx-auto">
      <div className="max-w-7xl mx-auto px-4  ">
        
        {/* ✅ Centered and styled heading */}
        <h2 className="text-2xl md:text-[1.8rem] lg:text-4xl font-semibold mb-12  text-gray-900 text-center xl:text-left">
          FAQ - Frequently Asked Questions
        </h2>

        <div className="divide-y divide-gray-200 xl:ml-60 ml-3">
          {faqs.map((item, i) => {
            const isOpen = i === openIndex;
            return (
              <div key={i} className="py-4 flex items-start gap-4">
                <button
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                  className={`flex-none w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 ${
                    isOpen ? 'bg-gray-800' : 'bg-black'
                  }`}
                  aria-label={`${isOpen ? 'Collapse' : 'Expand'} question ${i + 1}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    {isOpen ? (
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
                    ) : (
                      <g>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12h12" />
                      </g>
                    )}
                  </svg>
                </button>

                <div className="flex-1">
                  <h3 className="text-xl font-bold sm:text-xl text-gray-800">
                    {item.q}
                  </h3>

                  <div
                    className={`mt-3 text-xl sm:text-xl text-gray-600 leading-relaxed overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                      isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
