import { Outlet, useLocation } from "react-router";
import { AppSidebar } from "@/components/sidebar/AppSidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { ColorPicker } from "@/components/theme/ColorPicker";

const PAGE_TITLES = {
  "/na-desk/create": "New NA Entry",
};

const DashboardLayout = () => {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);
  const pageTitle =
    PAGE_TITLES[location.pathname] ??
    (segments[segments.length - 1] ?? "").replaceAll("-", " ");

  return (
    <SidebarProvider className="h-svh min-h-svh overflow-hidden bg-background p-0">
      <AppSidebar variant="inset" />

      <SidebarInset className="m-2 min-h-0 overflow-hidden rounded-xl border bg-background">
        <header className="flex h-12 shrink-0 items-center justify-between gap-2 border-b px-3">
          <div className="flex min-w-0 items-center gap-2">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-5 self-center!" />
            <p className="truncate text-sm font-semibold capitalize tracking-tight">
              {decodeURIComponent(pageTitle)}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <ColorPicker />
            <ModeToggle />
          </div>
        </header>

        <main className="thin-scrollbar min-h-0 flex-1 overflow-y-auto p-2">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
