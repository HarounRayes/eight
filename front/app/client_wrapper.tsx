'use client';

import { Provider } from 'react-redux';
import appStore from '@/store/Store';

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <Provider store={appStore}>{children}</Provider>;
}