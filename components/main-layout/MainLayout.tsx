'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { NavFootData } from '@/data/navFootData';

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  return (
    <div className="flex h-screen bg-background text-foreground">
      <div
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-sidebar text-sidebar-foreground transition-all duration-300 overflow-hidden flex flex-col border-r border-sidebar-border md:static md:translate-x-0`}
      >
        <div className="p-6 border-b border-sidebar-border">
          <h1 className="text-xl font-bold text-sidebar-primary text-center">System Management</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {NavFootData.map((item) => {
            const Icon = item.icon as React.ComponentType<{ size?: number }>;
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={isActive ? 'default' : 'ghost'}
                  className={`w-full justify-start gap-3 ${
                    isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                  }`}
                >
                  <Icon size={20} />
                  <span>{item.name}</span>
                </Button>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-sidebar-border text-sm text-muted-foreground">
          <p>v1.0.0</p>
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
          <h2 className="text-2xl font-bold flex-1 ml-4 md:ml-0">System Management</h2>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Settings
            </Button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>

        <footer className="bg-card border-t border-border px-6 py-4 text-sm text-muted-foreground">
          <div className="flex items-center justify-between">
            <p>&copy; 2025 System Management. All rights reserved.</p>
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </footer>
      </div>
    </div>
  );
}
