import { FileText, LayoutGrid, Receipt, Ruler } from "lucide-react";

import WaveBackground from "@/components/naDesk/WaveBackground";
import { cn } from "@/lib/utils";

const PHASES = [
  {
    number: "01",
    title: "Initial phase",
    icon: FileText,
    wave: "deepBlue",
    bodyClass: "bg-[#dfe7f2] dark:bg-[#1b2838]",
  },
  {
    number: "02",
    title: "Mapani",
    icon: Ruler,
    wave: "teal",
    bodyClass: "bg-[#dceee6] dark:bg-[#14332d]",
  },
  {
    number: "03",
    title: "Layout",
    icon: LayoutGrid,
    wave: "blue",
    bodyClass: "bg-[#dde9fb] dark:bg-[#1b2c4d]",
  },
  {
    number: "04",
    title: "Invoice",
    icon: Receipt,
    wave: "brown",
    bodyClass: "bg-[#f0e3d9] dark:bg-[#322620]",
  },
];

const NADeskCreate = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="grid min-h-0 w-full flex-1 grid-cols-1 grid-rows-4 gap-2 sm:gap-3 md:grid-cols-2 md:grid-rows-2 md:gap-4">
        {PHASES.map((phase) => {
          const Icon = phase.icon;

          return (
            <button
              key={phase.number}
              type="button"
              aria-label={`Open ${phase.title}`}
              className={cn(
                "relative flex h-full min-h-24 flex-col overflow-hidden rounded-xl border border-black/15 p-3 text-left shadow-[0_1px_2px_rgba(0,0,0,0.05),0_10px_24px_-14px_rgba(0,0,0,0.25)] focus-visible:ring-3 focus-visible:ring-teal-400/60 focus-visible:outline-none sm:min-h-44 sm:rounded-2xl sm:p-5",
                "dark:border-white/10 dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.7)]",
                phase.bodyClass,
              )}
            >
              <WaveBackground variant={phase.wave} className="h-[38%] opacity-95 sm:h-[22%]" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[38%] bg-gradient-to-t from-black/20 to-transparent sm:h-[22%]"
              />

              <div className="relative -translate-x-1 -translate-y-2 flex items-center gap-2">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-white/25 text-white ring-1 ring-white/40 backdrop-blur-sm sm:size-8 sm:rounded-lg">
                  <Icon className="size-3.5 sm:size-4" />
                </span>
                <h2 className="text-sm leading-tight font-bold text-white drop-shadow-md sm:text-lg sm:leading-snug">
                  {phase.title}
                </h2>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NADeskCreate;
