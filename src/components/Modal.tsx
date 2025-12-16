import { useEffect } from "react";
import { cn } from "@/lib/utils";
import type { TimeSlot } from "@/data/categoryData";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onBookDemo?: () => void;
}

export function Modal({ isOpen, onClose, title, children, onBookDemo }: ModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 z-[1000] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className={cn(
          "bg-card p-8 md:p-10 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto",
          "shadow-lg animate-slide-up"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-2xl font-bold mb-5 text-foreground">{title}</div>
        <div className="text-foreground/80 leading-relaxed mb-8">{children}</div>
        <div className="flex gap-4 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 rounded-lg font-semibold bg-muted text-foreground hover:-translate-y-0.5 transition-all"
          >
            Schließen
          </button>
          {onBookDemo && (
            <button
              onClick={onBookDemo}
              className="px-6 py-3 rounded-lg font-semibold gradient-primary text-white hover:-translate-y-0.5 transition-all"
            >
              Demo-Termin buchen
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

interface StatModalContentProps {
  label: string;
}

export function StatModalContent({ label }: StatModalContentProps) {
  return (
    <>
      <p><strong>Wie wird das gemessen?</strong></p>
      <p className="mt-2">Diese Metrik basiert auf echten Daten aus Ihrem System:</p>
      <ul className="my-4 ml-5 list-disc space-y-2">
        <li>Automatische Erfassung aller Zeitstempel</li>
        <li>Vergleich: Geplant vs. Tatsächlich</li>
        <li>Kontinuierliche Optimierung durch KI</li>
        <li>Transparentes Dashboard für Sie</li>
      </ul>
      <p><strong>Möchten Sie Ihre genauen Zahlen sehen?</strong></p>
      <p className="mt-2">In einer kostenlosen Potenzialanalyse berechnen wir mit Ihren echten Daten, wie viel Sie sparen können.</p>
    </>
  );
}

interface SlotModalContentProps {
  slot: TimeSlot;
}

export function SlotModalContent({ slot }: SlotModalContentProps) {
  if (slot.status === "recommended") {
    return (
      <>
        <p><strong>{slot.time} - {slot.truck}</strong></p>
        <br />
        <p><strong>Warum ist dieses Zeitfenster optimal?</strong></p>
        <ul className="my-4 ml-5 list-disc space-y-2">
          <li>{slot.details}</li>
          <li>Minimale Wartezeit für den LKW</li>
          <li>Optimale Ressourcen-Auslastung</li>
          <li>Vermeidet Peak-Zeiten</li>
        </ul>
        <p className="bg-success/10 p-4 rounded-lg mt-4">
          <strong>💰 Geschätzte Einsparung:</strong> {slot.info.match(/\d+/)?.[0] || '20'} Minuten
        </p>
      </>
    );
  }
  
  if (slot.status === "critical") {
    return (
      <>
        <p><strong>{slot.time} - {slot.truck}</strong></p>
        <br />
        <p><strong>Warum ist diese Lieferung kritisch?</strong></p>
        <ul className="my-4 ml-5 list-disc space-y-2">
          <li>{slot.details}</li>
          <li>Automatische Priorisierung durch KI</li>
          <li>Reserviertes Zeitfenster</li>
          <li>SMS-Alerts bei Verzögerungen</li>
        </ul>
        <p className="bg-destructive/10 border-l-4 border-destructive p-4 rounded-r-lg mt-4">
          <strong>⚡ Notfall-Handling:</strong> Dieses Zeitfenster ist geschützt und wird automatisch freigehalten.
        </p>
      </>
    );
  }

  return (
    <>
      <p><strong>{slot.time}{slot.location ? ` - ${slot.location}` : ''}</strong></p>
      <br />
      <p>{slot.truck}</p>
      <p>{slot.info}</p>
      <p className="mt-4">{slot.details}</p>
    </>
  );
}

export function CTAModalContent() {
  return (
    <>
      <p><strong>Nächste Schritte:</strong></p>
      <br />
      <ol className="my-4 ml-5 list-decimal space-y-4">
        <li>
          <strong>Potenzialanalyse (1-2 Wochen, kostenlos):</strong><br />
          Wir analysieren Ihre Daten und zeigen exakt, wie viel Sie sparen können.
        </li>
        <li>
          <strong>Pilotphase (3 Monate):</strong><br />
          Sie zahlen nur 30% der nachgewiesenen Einsparung – kein Risiko!
        </li>
        <li>
          <strong>Commercial Contract (12+ Monate):</strong><br />
          Nach erfolgreichem Pilot: Langfristiger Vertrag mit garantierter ROI.
        </li>
      </ol>
      <br />
      <p className="bg-success/10 border-l-4 border-success p-4 rounded-r-lg">
        <strong>💡 Unverbindlich & Kostenlos:</strong><br />
        Die Potenzialanalyse ist komplett kostenlos und unverbindlich.
      </p>
      <br />
      <p><strong>Kontakt:</strong></p>
      <p>📧 Email: <strong>info@ai2connect-do.com</strong><br />
      📱 Telefon: <strong>+49 231 58097539</strong></p>
    </>
  );
}
