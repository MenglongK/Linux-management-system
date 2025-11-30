import { NavFoot } from "@/types/navFoot";
import { Bell, LayoutDashboard, Network, Server, Users, Wifi } from "lucide-react";

export const NavFootData: NavFoot[] = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard
    },
    {
        name: "Server Resource",
        href: "/resource",
        icon: Server
    },
    {
        name: "Users",
        href: "/users",
        icon: Users
    },
    {
        name: "Groups",
        href: "/groups",
        icon: Network
    },
    {
        name: "Remote Server",
        href: "/remote-server",
        icon: Wifi
    }
]