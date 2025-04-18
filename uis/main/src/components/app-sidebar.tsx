import * as React from "react";

import { VersionSwitcher } from "@/components/version-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "react-router";
import { useEffect } from "react";
import {
  Calendar,
  Settings,
  Home,
  Folder,
  ClipboardCheck,
  BriefcaseBusiness
} from "lucide-react"; 


// Updated sample data with icons
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  items: [
    {
      title: "Dashboard",
      url: "/",
      icon: Home, // Icon for Dashboard
    },
    {
      title: "Orders",
      url: "/orders",
      icon: Folder, // Icon for Orders
    },
    {
      title: "Tasks",
      url: "/Task",
      icon: ClipboardCheck, // Icon for Tasks
    },
    {
      title: "Calendar",
      url: "/Calendar",
      icon: Calendar, // Icon for Calendar
    },
    {
      title: "Masters",
      url: "/Master",
      icon: BriefcaseBusiness, // Icon for Masters
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeUrl, setActiveUrl] = React.useState<string>("");

  React.useEffect(() => {
    setActiveUrl(window.location.pathname);
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher versions={data.versions} defaultVersion={data.versions[0]} />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu className="p-2 gap-[10px]">
          {data.items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                onClick={() => setActiveUrl(item.url)}
                className={`text-[#4A4D51] border p-[20px] font-bold ${
                  activeUrl === item.url ? "text-white bg-[#8466D8]" : "bg-transparent"
                }`}
              >
                <Link className="flex items-center gap-3" to={item.url}>
                  <item.icon
                    className={`w-5 h-5  ${
                      activeUrl === item.url ? "text-white": "text-[#4A4D51]"
                    }`}
                  />
                  <span>{item.title}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill={activeUrl === item.url ? "#FFFFFF" : "#EBE5FF"}
                      d="M8 5.14v14l11-7z"
                      strokeWidth="0.5"
                      stroke="#EBE5FF"
                    />
                  </svg>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}