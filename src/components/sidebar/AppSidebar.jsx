import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  BookOpen,
  ChartNoAxesCombined,
  ChevronRight,
  ChevronsUpDown,
  CircleHelp,
  Ellipsis,
  LayoutGrid,
  LogOut,
  Palette,
  Plane,
  Play,
  Send,
  Settings2,
  Bot,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { logout } from "@/store/features/auth/reducers/authSlice.reducer";

const playgroundPages = ["History", "Starred", "Settings"];

const platformItems = [
  { title: "Models", icon: Bot, chevron: true },
  { title: "Documentation", icon: BookOpen, chevron: true },
  { title: "Settings", icon: Settings2, chevron: true },
];

const projectItems = [
  { title: "Design Engineering", icon: Palette },
  { title: "Sales & Marketing", icon: ChartNoAxesCombined },
  { title: "Travel", icon: Plane },
  { title: "More", icon: Ellipsis },
];

const footerItems = [
  { title: "Support", icon: CircleHelp },
  { title: "Feedback", icon: Send },
];

function SimpleNavGroup({ label, items }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>{label}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} render={<Link to="/dashboard" />}>
                <item.icon />
                <span>{item.title}</span>
                {item.chevron && (
                  <ChevronRight className="ml-auto text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden" />
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}

export function AppSidebar(props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.authentication?.user);

  const [playgroundOpen, setPlaygroundOpen] = useState(true);

  const email = user?.email || "admin@example.com";
  const displayName =
    user?.user_metadata?.full_name || user?.name || email.split("@")[0];
  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const handleSignOut = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LayoutGrid className="size-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">NA Desk</span>
            <span className="text-xs text-muted-foreground">Enterprise</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarGroupContent>
            <Collapsible open={playgroundOpen} onOpenChange={setPlaygroundOpen}>
              <SidebarMenu>
                <SidebarMenuItem>
                  <CollapsibleTrigger
                    render={
                      <SidebarMenuButton
                        tooltip="Playground"
                        isActive={pathname === "/dashboard"}
                      >
                        <Play />
                        <span>Playground</span>
                        <ChevronRight
                          className={`ml-auto transition-transform duration-200 group-data-[collapsible=icon]:hidden ${
                            playgroundOpen ? "rotate-90" : ""
                          }`}
                        />
                      </SidebarMenuButton>
                    }
                  />
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {playgroundPages.map((page) => (
                        <SidebarMenuSubItem key={page}>
                          <SidebarMenuSubButton render={<Link to="/dashboard" />}>
                            <span>{page}</span>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </SidebarMenu>
            </Collapsible>

            <SidebarMenu className="mt-1">
              {platformItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton tooltip={item.title} render={<Link to="/dashboard" />}>
                    <item.icon />
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SimpleNavGroup label="Projects" items={projectItems} />
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton tooltip={item.title} render={<Link to="/dashboard" />}>
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}

          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    tooltip="Account"
                    className="data-open:bg-sidebar-accent data-open:text-sidebar-accent-foreground"
                  >
                    <Avatar className="size-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-primary/15 text-xs text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-semibold">{displayName}</span>
                      <span className="truncate text-muted-foreground">{email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-60 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                }
              />
              <DropdownMenuContent side="top" align="start" className="min-w-56">
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center gap-2 px-2 py-1.5 text-left">
                    <Avatar className="size-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-primary/15 text-xs text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid min-w-0 flex-1 text-left text-xs leading-tight">
                      <span className="truncate font-semibold">{displayName}</span>
                      <span className="truncate text-muted-foreground">{email}</span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
