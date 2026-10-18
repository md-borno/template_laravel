import React from 'react';

const SiteProcess = () => {
  const steps = [
    {
      id: '01',
      title: 'AI-Powered Discovery Audit',
      subtitle: 'Zero-risk assessment, tailored roadmap',
      items: [
        'Free 60-min strategy session to analyze your tech stack',
        'AI-driven scoping tool estimates time/cost savings',
        'Receive a GDPR/ISO 2701-compliant project blueprint'
      ]
    },
    {
      id: '02',
      title: 'Hybrid Team Onboarding',
      subtitle: 'Right talent + AI tools from day one',
      items: [
        'Match with vetted engineers (800+ experts)',
        'AI-augmented sprint planning for 30% faster kickoff',
        'Dedicated PM + automated progress dashboards'
      ]
    },
    {
      id: '03',
      title: 'Build with AI Guardrails',
      subtitle: 'Code, test, deploy—smarter',
      items: [
        'AI pair-programming assistants (70% faster dev)',
        'Self-healing test suites (99.9% reliability)',
        'Real-time compliance checks (ISO 27001 baked in)'
      ]
    },
    {
      id: '04',
      title: 'Scale with Confidence',
      subtitle: 'Your growth, automated',
      items: [
        'AI-optimized cloud deployment',
        'Continuous performance monitoring + predictive scaling',
        '90-day post-launch support with AI-driven analytics'
      ]
    }
  ];

  return (
    <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto font-sans bg-slate-50">
      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">
          Our Process: <br />
          <span className="text-blue-600">AI-Optimized, Transparent, Scalable</span>
        </h2>
        <p className="text-lg text-slate-600 mb-8">
          We blend human expertise with AI precision—delivering faster outcomes without compromising security.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg shadow-blue-600/20">
          Schedule a Call
        </button>
      </div>

      {/* Vertical Timeline */}
      <div className="max-w-4xl mx-auto relative">
        {/* Vertical Connecting Line */}
        <div 
          className="absolute left-8 top-8 bottom-8 w-0.5 bg-slate-200 z-0 hidden md:block" 
          aria-hidden="true"
        ></div>

        <div className="flex flex-col gap-8 md:gap-12 relative z-10">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
              
              {/* Number/Icon */}
              <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-white border-2 border-blue-600 text-blue-600 flex items-center justify-center font-bold text-xl shadow-sm relative z-10">
                {step.id}
              </div>

              {/* Content Card */}
              <div className="flex-1 bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow duration-200 w-full">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <p className="text-sm font-semibold text-blue-600 mb-1 uppercase tracking-wide">Step {parseInt(step.id)}</p>
                    <h3 className="text-2xl font-bold text-slate-900">{step.title}</h3>
                  </div>
                  <span className="inline-block bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-full whitespace-nowrap self-start md:self-auto">
                    {step.subtitle}
                  </span>
                </div>
                
                <div className="w-full h-px bg-slate-100 mb-6"></div>
                
                <ul className="space-y-4">
                  {step.items.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-base text-slate-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SiteProcess;