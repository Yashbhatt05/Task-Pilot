import * as React from "react"

import { VersionSwitcher } from "@/components/version-switcher"
import {
	Sidebar,
	SidebarContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar"
import { Link } from "react-router"

// This is sample data.
const data = {
	versions: ["1.0.1", "1.1.0-alpha", "2.0.0-beta1"],
	items: [
		{
			title: "Dashboard",
			url: "/",
			isActive: true,
		},
		{
			title: "Orders",
			url: "/orders",
		},
	],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar {...props}>
			<SidebarHeader>
				<VersionSwitcher
					versions={[]}
					defaultVersion={data.versions[0]}
				/>
				{/* <SearchForm /> */}
			</SidebarHeader>
			<SidebarContent>
				<SidebarMenu>
					{data.items.map((item) => (
						<SidebarMenuItem key={item.title}>
							<SidebarMenuButton asChild isActive={item.isActive}>
								{/* <a href={item.url}>{item.title}</a> */}
								<Link to={item.url}>{item.title}</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarContent>
			<SidebarRail />
		</Sidebar>
	)
}
