import { ArrowUpRight, FileText, LayoutGrid, Receipt, Ruler } from "lucide-react";

import WaveBackground from "@/components/naDesk/WaveBackground";

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
      <div className="grid min-h-0 w-full flex-1 gap-3 min-[500px]:grid-cols-2 min-[500px]:grid-rows-2 sm:gap-4">
        {PHASES.map((phase) => {
          const Icon = phase.icon;

          return (
            <button
              key={phase.number}
              type="button"
              aria-label={`Open ${phase.title}`}
              style={{ backgroundColor: phase.bodyBg }}
              className="group relative flex h-full min-h-32 flex-col justify-between overflow-hidden rounded-2xl border border-black/15 p-4 text-left focus-visible:ring-3 focus-visible:ring-teal-400/60 focus-visible:outline-none sm:min-h-44 sm:p-5"
            >
              <WaveBackground variant={phase.wave} className="h-[30%] opacity-95" />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 top-0 h-[30%] bg-gradient-to-t from-black/20 to-transparent"
              />

              <div className="relative flex items-center gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white/25 text-white ring-1 ring-white/40 backdrop-blur-sm">
                  <Icon className="size-5" />
                </span>
                <h2 className="text-lg leading-snug font-bold text-white drop-shadow-md">
                  {phase.title}
                </h2>
              </div>

              <div className="relative mt-6 flex items-end justify-between gap-3">
                <span className="rounded-full bg-white/80 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200/80">
                  {phase.number}
                </span>
                <span className="flex size-9 items-center justify-center rounded-full bg-teal-700 text-white transition-colors duration-200 group-hover:bg-teal-600">
                  <ArrowUpRight className="size-4" />
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default NADeskCreate;
