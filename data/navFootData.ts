import { NavFoot } from "@/types/navFoot";
import { Bell, LayoutDashboard, Network, Users, Wifi } from "lucide-react";

export const NavFootData: NavFoot[] = [
    {
        name: "Server Resource",
        href: "/resource",
        icon: LayoutDashboard
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
        name: "Notification",
        href: "/notification",
        icon: Bell
    },
    {
        name: "Remote Server",
        href: "/remote-server",
        icon: Wifi
    }
]