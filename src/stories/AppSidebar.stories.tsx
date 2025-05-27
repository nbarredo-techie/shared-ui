import type { Meta, StoryObj } from "@storybook/react";
import { AppSidebar } from "../components/ui/app-sidebar";
import { SidebarProvider } from "../components/ui/sidebar";

const meta: Meta<typeof AppSidebar> = {
  title: "UI/AppSidebar",
  component: AppSidebar,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <SidebarProvider>
        <div style={{ display: "flex", height: "100vh" }}>
          <Story />
          <main
            style={{ flex: 1, padding: "24px", backgroundColor: "#f9fafb" }}
          >
            <h1 style={{ fontSize: "24px", fontWeight: "bold" }}>
              Main Content Area
            </h1>
            <p style={{ marginTop: "8px", color: "#6b7280" }}>
              This is the main content area. The sidebar will appear on the
              left.
            </p>
          </main>
        </div>
      </SidebarProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: 1, title: "Home", url: "/" },
      { id: 2, title: "About", url: "/about" },
      { id: 3, title: "Contact", url: "/contact" },
    ],
  },
};

export const WithManyItems: Story = {
  args: {
    items: [
      { id: 1, title: "Dashboard", url: "/dashboard" },
      { id: 2, title: "Analytics", url: "/analytics" },
      { id: 3, title: "Users", url: "/users" },
      { id: 4, title: "Settings", url: "/settings" },
      { id: 5, title: "Reports", url: "/reports" },
      { id: 6, title: "Billing", url: "/billing" },
      { id: 7, title: "Support", url: "/support" },
      { id: 8, title: "Documentation", url: "/docs" },
    ],
  },
};

export const Empty: Story = {
  args: {
    items: [],
  },
};

export const SingleItem: Story = {
  args: {
    items: [{ id: 1, title: "Dashboard", url: "/dashboard" }],
  },
};

export const LongTitles: Story = {
  args: {
    items: [
      { id: 1, title: "Very Long Navigation Item Name", url: "/long-name" },
      {
        id: 2,
        title: "Another Extremely Long Menu Item",
        url: "/another-long",
      },
      { id: 3, title: "Short", url: "/short" },
      {
        id: 4,
        title: "This is a very long menu item that might wrap",
        url: "/wrap",
      },
    ],
  },
};
