
import React from 'react';
import { Header } from './Header';
import { SpeechToText } from './SpeechToText';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <Header />
      <main className="flex-1 w-full mx-auto">{children}</main>
      <SpeechToText />
    </div>
  );
};
