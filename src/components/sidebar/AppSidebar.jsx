import { Link, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  ChevronsUpDown,
  LayoutDashboard,
  LayoutGrid,
  LogOut,
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

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 px-2 py-1">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <LayoutGrid className="size-4" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">ORG NAME</span>
            <span className="text-xs text-muted-foreground">NA Desk</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip="Dashboard"
                  isActive={pathname === "/dashboard"}
                  render={<Link to="/dashboard" />}
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuButton
                    size="lg"
                    tooltip="Account"
                    aria-label="Open account menu"
                    className="border border-primary/20 bg-primary/10 text-primary hover:bg-primary/15 data-open:bg-primary/15"
                  >
                    <Avatar className="size-8 rounded-lg">
                      <AvatarFallback className="rounded-lg bg-primary text-xs font-semibold text-primary-foreground">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid min-w-0 flex-1 text-left text-xs leading-tight group-data-[collapsible=icon]:hidden">
                      <span className="truncate font-semibold">{displayName}</span>
                      <span className="truncate text-primary/70">{email}</span>
                    </div>
                    <ChevronsUpDown className="ml-auto size-4 shrink-0 opacity-70 group-data-[collapsible=icon]:hidden" />
                  </SidebarMenuButton>
                }
              />
              <DropdownMenuContent
                side="right"
                align="start"
                sideOffset={8}
                className="min-w-56"
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
