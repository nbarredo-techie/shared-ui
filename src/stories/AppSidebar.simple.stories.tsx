import type { Meta, StoryObj } from '@storybook/react';
import { AppSidebar } from '../components/ui/app-sidebar';

const meta: Meta<typeof AppSidebar> = {
  title: 'UI/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      { id: 1, title: 'Home', url: '/' },
      { id: 2, title: 'About', url: '/about' },
      { id: 3, title: 'Contact', url: '/contact' },
    ],
  },
};
