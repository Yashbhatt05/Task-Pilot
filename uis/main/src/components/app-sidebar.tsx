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

// This is sample data.
const data = {
  versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
  items: [
    {
      title: "Dashboard",
      url: "/",
    },
    {
      title: "Orders",
      url: "/orders",
	 
    },
    {
      title: "Tasks",
      url: "/Task",
	 
    },
    {
      title: "Calendar",
      url: "Calendar",
	 
    },
    {
      title: "Masters",
      url: "/Master",
	 
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const [activeUrl, setActiveUrl] = React.useState<string>("");
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <VersionSwitcher versions={[]} defaultVersion={data.versions[0]} />
        {/* <SearchForm /> */}
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu className="p-2  gap-[10px]">
          {data.items.map((item) => (
            <SidebarMenuItem key={item.title} >
                <SidebarMenuButton
                asChild
                onClick={() => setActiveUrl(item.url)}
				className={`text-[#4A4D51] border  p-[20px] font-bold ${
					activeUrl === item.url ? "text-white bg-[#8466D8]" : "bg-transparent" 
				  }`}>	
                <Link className="flex justify-between" to={item.url}>{item.title} <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24"><path fill={`${
					activeUrl === item.url ? "#FFFFFF" : "#EBE5FF" }`} d="M8 5.14v14l11-7z" stroke-width="0.5" stroke="#EBE5FF"/></svg></Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
