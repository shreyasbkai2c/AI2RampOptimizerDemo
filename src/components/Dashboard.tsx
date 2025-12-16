import { useState } from "react";
import { categoryData, greenData, type TimeSlot, type Benefit } from "@/data/categoryData";
import { AppHeader } from "./AppHeader";
import { StatsGrid } from "./StatsGrid";
import { Timeline } from "./Timeline";
import { ComparisonSection } from "./ComparisonSection";
import { BenefitsGrid } from "./BenefitsGrid";
import { GreenModuleStats } from "./GreenModuleStats";
import { CTASection } from "./CTASection";
import { Modal, StatModalContent, SlotModalContent, CTAModalContent } from "./Modal";

interface DashboardProps {
  category: string;
  onBack: () => void;
}

type ModalType = "stat" | "slot" | "cta" | null;

export function Dashboard({ category, onBack }: DashboardProps) {
  const [currentIndustry, setCurrentIndustry] = useState(() => {
    const data = categoryData[category];
    return Object.keys(data.industries)[0];
  });
  const [greenModuleEnabled, setGreenModuleEnabled] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalData, setModalData] = useState<string | TimeSlot | null>(null);

  const data = categoryData[category];
  const industryData = data.data[currentIndustry];

  // Get benefits - handle both array and record types
  let benefits: Benefit[];
  if (Array.isArray(data.benefits)) {
    benefits = data.benefits;
  } else if (currentIndustry && data.benefits[currentIndustry]) {
    benefits = data.benefits[currentIndustry];
  } else {
    benefits = Object.values(data.benefits)[0] || [];
  }

  const handleStatClick = (label: string) => {
    setModalData(label);
    setModalType("stat");
  };

  const handleSlotClick = (slot: TimeSlot) => {
    setModalData(slot);
    setModalType("slot");
  };

  const handleCTAClick = () => {
    setModalType("cta");
  };

  const handleCloseModal = () => {
    setModalType(null);
    setModalData(null);
  };

  const handleBookDemo = () => {
    window.open("https://tucalendi.com/ai2connect", "_blank");
  };

  const getModalTitle = () => {
    switch (modalType) {
      case "stat":
        return `📊 ${modalData as string}`;
      case "slot":
        const slot = modalData as TimeSlot;
        if (slot.status === "recommended") return "⭐ AI-Empfehlung";
        if (slot.status === "critical") return "🔴 Kritische Lieferung";
        return slot.status === "busy" ? "📦 Belegt" : "✅ Verfügbar";
      case "cta":
        return "🎯 Kostenlose Potenzialanalyse";
      default:
        return "";
    }
  };

  const getTimelineTitle = () => {
    return category === "carrier" ? "Verfügbare Zeitfenster" : "Rampenplanung heute";
  };

  return (
    <div className="min-h-screen bg-background">
      <AppHeader
        categoryName={data.name}
        categoryIcon={data.icon}
        industries={data.industries}
        currentIndustry={currentIndustry}
        onIndustryChange={setCurrentIndustry}
        greenModuleEnabled={greenModuleEnabled}
        onToggleGreenModule={() => setGreenModuleEnabled(!greenModuleEnabled)}
        onBack={onBack}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-10 py-10">
        <StatsGrid stats={industryData.stats} onStatClick={handleStatClick} />

        {greenModuleEnabled && <GreenModuleStats stats={greenData.stats} />}

        <Timeline
          slots={industryData.slots}
          title={getTimelineTitle()}
          onSlotClick={handleSlotClick}
        />

        <ComparisonSection comparison={industryData.comparison} />

        <BenefitsGrid
          benefits={benefits}
          greenBenefits={greenModuleEnabled ? greenData.benefits : undefined}
        />

        <CTASection onCTAClick={handleCTAClick} />
      </div>

      {/* Modals */}
      <Modal
        isOpen={modalType === "stat"}
        onClose={handleCloseModal}
        title={getModalTitle()}
        onBookDemo={handleBookDemo}
      >
        <StatModalContent label={modalData as string} />
      </Modal>

      <Modal
        isOpen={modalType === "slot"}
        onClose={handleCloseModal}
        title={getModalTitle()}
        onBookDemo={handleBookDemo}
      >
        {modalData && typeof modalData !== "string" && (
          <SlotModalContent slot={modalData as TimeSlot} />
        )}
      </Modal>

      <Modal
        isOpen={modalType === "cta"}
        onClose={handleCloseModal}
        title={getModalTitle()}
        onBookDemo={handleBookDemo}
      >
        <CTAModalContent />
      </Modal>
    </div>
  );
}
