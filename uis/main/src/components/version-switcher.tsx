import * as React from "react"
import { Check, ChevronsUpDown, GalleryVerticalEnd } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import logo from "@/assets/logo.svg"

export function VersionSwitcher({
  versions,
  defaultVersion,
}: {
  versions: string[]
  defaultVersion: string
}) {
  const [selectedVersion, setSelectedVersion] = React.useState(defaultVersion)
  const [sideBar,setSideBar] = React.useState(false);


  return (
    <SidebarMenu >
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div>
                <img src={logo} alt="" />
              </div>
              {/* <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-medium">Supply Chain</span>
                <span className="">v{selectedVersion}</span>
              </div> */}
              {/* <ChevronsUpDown className="ml-auto" /> */}
               <div className="flex p-2 rounded-full border-[#8466D8] border-2 absolute right-[-20px] bg-white" >
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 12 24"><path fill="#8466D8" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z" stroke-width="2" stroke="#8466D8"/></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="10" viewBox="0 0 12 24"><path fill="#8466D8" fill-rule="evenodd" d="m3.343 12l7.071 7.071L9 20.485l-7.778-7.778a1 1 0 0 1 0-1.414L9 3.515l1.414 1.414z" stroke-width="2" stroke="#8466D8"/></svg>
              </div>
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width)"
            align="start"
          >
            {versions.map((version) => (
              <DropdownMenuItem
                key={version}
                onSelect={() => setSelectedVersion(version)}
              >
                v{version}{" "}
                {version === selectedVersion && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
