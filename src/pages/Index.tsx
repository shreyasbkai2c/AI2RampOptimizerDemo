import { useState } from "react";
import { LandingPage } from "@/components/LandingPage";
import { Dashboard } from "@/components/Dashboard";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  if (selectedCategory) {
    return (
      <Dashboard 
        category={selectedCategory} 
        onBack={() => setSelectedCategory(null)} 
      />
    );
  }

  return <LandingPage onSelectCategory={setSelectedCategory} />;
};

export default Index;
