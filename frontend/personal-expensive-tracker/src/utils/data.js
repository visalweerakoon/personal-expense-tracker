import {
    LuLayoutDashboard,
    LuHandCoins,
    LuWalletMinimal,
    LuLogOut,
} from "react-icons/lu";

// Array of objects representing the sidebar menu items
export const SIDE_MENU_DATA = [
    {
        id: "01",             // Unique ID for this menu item
        label: "Dashboard",   // Text to display in the sidebar
        icon: LuLayoutDashboard, // React icon component for the menu item
        path: "/dashboard",   // Route path to navigate when clicked
    },
    {
        id: "02",
        label: "Income",
        icon: LuWalletMinimal,
        path: "/income",
    },
    {
        id: "03",
        label: "Expense",
        icon: LuHandCoins,
        path: "/expense",
    },
    {
        id: "06",
        label: "Logout",
        icon: LuLogOut,
        path: "logout",        // Special path to handle logout functionality
    },
];
