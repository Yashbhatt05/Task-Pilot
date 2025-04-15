import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Home from "./home";
import Page1 from "./page1";
import OrdersPage from "./orders";
import { Route, Routes } from "react-router";

const Pages = () => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="-ml-1" />
            <div className="flex-1 overflow-auto  p-2">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/page1" element={<Page1 />} />
                    <Route path="/orders" element={<OrdersPage />} />
                </Routes>
            </div>
        </SidebarProvider>
    );
};

export default Pages;
