'use client';

import { useIsMounted } from '@core/hooks/use-is-mounted';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import { useLayout } from '@/layouts/use-layout';
import { SelectedOptionProvider } from '@/hooks/use-selected-option'; // Import the provider

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <SelectedOptionProvider><HydrogenLayout>{children}</HydrogenLayout></SelectedOptionProvider>; // Wrap with SelectedOptionProvider
}
