import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cpu, LayoutDashboard, Search, LogIn } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="border-b bg-card py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-1.5 rounded-md group-hover:rotate-12 transition-transform">
            <Cpu className="w-6 h-6 text-background" />
          </div>
          <span className="text-2xl font-headline font-bold tracking-tight">
            SOLVE<span className="text-primary">BRIDGE</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/problems" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <Search className="w-4 h-4" />
            Discover
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors flex items-center gap-1.5">
            <LayoutDashboard className="w-4 h-4" />
            Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" className="hidden sm:flex items-center gap-2">
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
          <Button className="bg-primary text-background hover:bg-primary/90 font-bold">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
}
