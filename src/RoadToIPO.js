import React, { useState } from 'react';
import { User, FileText, Megaphone, MapPin } from 'lucide-react';

const phases = [
  {
    title: "Phase 1: Hiring the managers",
    icon: User,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    steps: [
      "Obtain board approval; set up a team responsible for the IPO; set up a qualified board of directors; reshuffle management team for public company; start acting like a public company (1–2 years before IPO)",
      "Choose an investment banker, a legal counsel, a Certified Public Accountant and a depositary bank for an ADR — American Depositary Receipt, a negotiable certificate issued by a US bank representing a specific number of shares (six months before IPO)",
    ]
  },
  {
    title: "Phase 2: Due diligence and drafting",
    icon: FileText,
    color: "text-green-600",
    bgColor: "bg-green-100",
    steps: [
      "Clean up and restate financial statements, prepare audited statements",
      "Draft the preliminary prospectus",
      "Respond to due diligence",
    ]
  },
  {
    title: "Phase 3: Marketing",
    icon: Megaphone,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    steps: [
      "Launch the 'road show' (several months before IPO); start soliciting expressions of interest (book-building)",
      "Assemble the syndicate (several months before IPO)",
      "File preliminary prospectus, circulate it in the public (1–3 months before)",
      "Revise prospectus based on comments by authorities and book-building; obtain authorities' letter of intent to declare the registration statement effective upon request",
      "Price the offering and determine offering size; sign the underwriting agreement; finalise registration (one day before IPO)",
      "IPO date: circulate final prospectus and start selling",
      "If there is a market stabilisation agreement, the underwriter will stand ready to buy at a set price, usually for 30 days",
    ]
  }
];

const RoadToIPO = () => {
  const [activePhase, setActivePhase] = useState(null);

  const getStartingStepNumber = (phaseIndex) => {
    return phases.slice(0, phaseIndex).reduce((sum, phase) => sum + phase.steps.length, 0) + 1;
  };

  return (
    <div className="w-full max-w-none mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">The Road to the IPO</h1>
      <div className="relative mb-4">
        {/* Road - now with aria-hidden */}
        <div className="absolute top-8 left-0 right-0 h-4 bg-gray-300 rounded-full" aria-hidden="true">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 transform -translate-y-1/2"
               style={{backgroundImage: 'linear-gradient(to right, white 50%, transparent 50%)', backgroundSize: '20px 100%', backgroundRepeat: 'repeat-x'}}></div>
        </div>
        
        {/* Milestones */}
        <div role="tablist" aria-label="IPO Phases" className="flex justify-between items-start relative z-10">
          {phases.map((phase, index) => (
            <button
              key={index}
              role="tab"
              aria-selected={activePhase === index}
              aria-controls={`phase-${index}-content`}
              id={`phase-${index}-tab`}
              className={`flex flex-col items-center w-1/3 pt-2 pb-4 px-2 rounded-lg transition-all duration-300 ${
                activePhase === index ? `${phase.bgColor} shadow-md` : 'bg-transparent'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${phase.color.split('-')[1]}-400`}
              onClick={() => setActivePhase(activePhase === index ? null : index)}
            >
              <div className={`w-16 h-16 rounded-full ${phase.bgColor} ${phase.color} flex items-center justify-center shadow-lg mb-2`} aria-hidden="true">
                <phase.icon size={32} />
              </div>
              <MapPin className={`${phase.color} mb-2`} size={24} aria-hidden="true" />
              <p className={`font-semibold ${phase.color} text-center`}>{phase.title}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Phase Details */}
      {phases.map((phase, index) => (
        <div
          key={index}
          role="tabpanel"
          id={`phase-${index}-content`}
          aria-labelledby={`phase-${index}-tab`}
          hidden={activePhase !== index}
          className={`mt-2 p-6 rounded-lg shadow-md ${phase.bgColor}`}
        >
          <h2 className={`text-xl font-semibold mb-4 ${phase.color}`}>
            {phase.title}
          </h2>
          <ol start={getStartingStepNumber(index)} className="list-decimal list-outside ml-6">
            {phase.steps.map((step, stepIndex) => (
              <li key={stepIndex} className="mb-2 text-gray-700 pl-2">
                {step}
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default RoadToIPO;

