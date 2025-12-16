interface CTASectionProps {
  onCTAClick: () => void;
}

export function CTASection({ onCTAClick }: CTASectionProps) {
  return (
    <div className="gradient-primary text-white p-10 md:p-14 rounded-2xl text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-4">Überzeugt?</h2>
      <p className="text-lg md:text-xl mb-8 opacity-95">
        Testen Sie AI2RampOptimizer mit Ihren echten Daten in einer kostenlosen Potenzialanalyse.
      </p>
      <button 
        onClick={onCTAClick}
        className="bg-white text-primary px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 hover:shadow-lg transition-all duration-300"
      >
        Kostenlose Potenzialanalyse anfordern →
      </button>
    </div>
  );
}
