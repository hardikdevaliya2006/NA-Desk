import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronsUpDown,
  ExternalLink,
  FileChartColumn,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
  NotebookTabs,
  UserRound,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import authActions from "@/store/features/auth/actions/auth.actions";

export function AppSidebar(props) {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, name, role } = useSelector(
    (state) => state.authentication ?? {},
  );

  // Prefer the name saved in the roles table, then the auth provider metadata,
  // and only fall back to the email prefix as a last resort.
  const email = user?.email || "admin@example.com";
  const displayName =
    name ||
    user?.user_metadata?.full_name ||
    user?.user_metadata?.name ||
    user?.name ||
    email.split("@")[0];
  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const roleLabel = role
    ? role.charAt(0).toUpperCase() + role.slice(1)
    : null;

  const handleSignOut = () => {
    dispatch(authActions.logoutUser());
    navigate("/");
  };

  const handleOpenPdWork = () => {
    window.open("https://jbchauhanwork.vercel.app", "_blank", "noopener,noreferrer");
  };

  const navItemClass =
    "h-9 gap-2.5 rounded-lg px-2.5 text-[13px] font-medium";

  return (
    <Sidebar {...props}>
      <SidebarHeader className="gap-0 px-3 py-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutGrid className="size-[18px]" />
          </div>
          <div className="grid min-w-0 flex-1 leading-tight">
            <span className="truncate text-sm font-semibold tracking-tight">
              ORG NAME
            </span>
            <span className="truncate text-xs text-muted-foreground">
              NA Desk
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-3 py-4">
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  isActive={pathname === "/dashboard"}
                  render={<Link to="/dashboard" />}
                  className={navItemClass}
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="NA Desk"
                  isActive={pathname === "/na-desk" || pathname.startsWith("/na-desk/")}
                  render={<Link to="/na-desk" />}
                  className={navItemClass}
                >
                  <NotebookTabs />
                  <span>NA Desk</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Customer"
                  isActive={pathname === "/customer"}
                  render={<Link to="/customer" />}
                  className={navItemClass}
                >
                  <UserRound />
                  <span>Customer</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Reports"
                  isActive={pathname === "/report"}
                  render={<Link to="/report" />}
                  className={navItemClass}
                >
                  <FileChartColumn />
                  <span>Reports</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Employee"
                  isActive={pathname === "/employe"}
                  render={<Link to="/employe" />}
                  className={navItemClass}
                >
                  <Users />
                  <span>Employee</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 py-3">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    tooltip="Account"
                    aria-label="Open account menu"
                    className="h-14 gap-2.5 rounded-lg border border-sidebar-border bg-background px-2.5 text-foreground"
                  >
                    <Avatar className="size-8 shrink-0 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-semibold">{displayName}</span>
                      <span className="truncate text-foreground/70">{email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-70 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                }
              />
              <DropdownMenuContent
                side="right"
                align="start"
                sideOffset={8}
                className="min-w-56 max-w-[calc(100vw-2rem)] border border-sidebar-border"
              >
                <DropdownMenuGroup>
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-2 py-1.5 text-left">
                      <Avatar className="size-8 rounded-lg">
                        <AvatarFallback className="rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid min-w-0 flex-1 text-left text-xs leading-tight">
                        <span className="truncate font-semibold">{displayName}</span>
                        {roleLabel && (
                          <span className="mt-0.5 w-fit rounded bg-primary/10 px-1.5 py-px text-[10px] font-medium text-primary">
                            {roleLabel}
                          </span>
                        )}
                      </div>
                    </div>
                  </DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleOpenPdWork}>
                  <ExternalLink />
                  PD Work
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
