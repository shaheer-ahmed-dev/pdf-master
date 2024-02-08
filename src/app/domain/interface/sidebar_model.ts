export interface SidebarItem {
    label: string; // The text or label to display for the sidebar item.
    icon: string; // An optional icon class or URL for the item.
    route: string; // The route or URL to navigate to when the item is clicked.
    collapse?: boolean; // Whether the item should be collapsed or expanded.
    children?: SidebarItem[]; // Optional sub-items for nested menus.
  }