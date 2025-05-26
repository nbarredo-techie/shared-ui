import { Meta, StoryObj } from '@storybook/react';
import { AppSidebar } from '../components/ui/app-sidebar';

const meta = {
  title: 'UI/AppSidebar',
  component: AppSidebar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

export const Default = {
  args: {
    items: [
      { id: 1, title: 'Home', url: '/' },
      { id: 2, title: 'About', url: '/about' },
      { id: 3, title: 'Contact', url: '/contact' },
    ],
  },
};

export const WithManyItems = {
  args: {
    items: [
      { id: 1, title: 'Dashboard', url: '/dashboard' },
      { id: 2, title: 'Analytics', url: '/analytics' },
      { id: 3, title: 'Users', url: '/users' },
      { id: 4, title: 'Settings', url: '/settings' },
      { id: 5, title: 'Reports', url: '/reports' },
      { id: 6, title: 'Billing', url: '/billing' },
    ],
  },
};

export const Empty = {
  args: {
    items: [],
  },
};

export const SingleItem = {
  args: {
    items: [
      { id: 1, title: 'Dashboard', url: '/dashboard' },
    ],
  },
};
