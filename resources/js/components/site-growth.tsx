import React from 'react';

const SiteGrowth = () => {
  return (
    <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <h2 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight max-w-lg">
          Drive Growth with Our <br /> Core Capabilities
        </h2>
      </div>

      {/* Grid Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        
        {/* Row 1 */}
        <div className="flex flex-col justify-center">
          <div className="text-blue-500 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
          </div>
          <h3 className="text-2xl font-medium text-slate-900 mb-3">Staff Augmentation</h3>
          <p className="text-slate-500 leading-relaxed text-sm">
            Instantly scale your team with vetted AI/cloud experts. Pay only for the talent you need, when you need it.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden h-64 bg-slate-100">
          <img src="https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=800" alt="Tech Team Collaborating" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-blue-500 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <h3 className="text-2xl font-medium text-slate-900 mb-3">Managed Services</h3>
          <p className="text-slate-500 leading-relaxed text-sm">
            End-to-end support for your applications, infrastructure, and digital platforms—so you can shift focus from maintenance to innovation.
          </p>
        </div>

        {/* Row 2 */}
        <div className="rounded-2xl overflow-hidden h-64 bg-slate-100">
          <img src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800" alt="Software Development" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-blue-500 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
          </div>
          <h3 className="text-2xl font-medium text-slate-900 mb-3">MVP Development</h3>
          <p className="text-slate-500 leading-relaxed text-sm">
            Launch market-ready MVPs in 8-12 weeks. AI-accelerated builds with 40% faster iteration cycles.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden h-64 bg-slate-100">
          <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&q=80&w=800" alt="Remote Work Presentation" className="w-full h-full object-cover" />
        </div>

        {/* Row 3 */}
        <div className="flex flex-col justify-center">
          <div className="text-blue-500 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>
          </div>
          <h3 className="text-2xl font-medium text-slate-900 mb-3">Technology Consulting</h3>
          <p className="text-slate-500 leading-relaxed text-sm">
            Cut tech waste by 30% with our strategic audits. Align tools with business goals for maximum ROI.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden h-64 bg-slate-100">
          <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800" alt="Consulting Meeting" className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-blue-500 mb-6">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </div>
          <h3 className="text-2xl font-medium text-slate-900 mb-3">Digital Transformation</h3>
          <p className="text-slate-500 leading-relaxed text-sm">
            Modernize legacy systems with AI-driven automation. Achieve 50% operational efficiency gains.
          </p>
        </div>

      </div>
    </section>
  );
};

export default SiteGrowth;