"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Github,
  Moon,
  Sun,
  Menu,
  X,
  Globe,
  BookOpen,
  MessageCircle,
  FileText,
} from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "light" : "dark"
    );
  };

  const navigation = [
    { name: "Docs", href: "/docs", icon: BookOpen },
    // { name: "Playground", href: "/playground", icon: Play },
    { name: "Examples", href: "/examples", icon: FileText },
    { name: "Blog", href: "/blog", icon: MessageCircle },
    // { name: "Changelog", href: "/changelog", icon: FileText },
  ];

  return (
    <header className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-50 backdrop-blur-sm bg-opacity-90">
      <div className="navbar-start">
        <Link href="/" className="btn btn-ghost text-xl font-bold">
          <span className="text-primary">Tree</span>
          <span className="text-secondary">Charts</span>
          <span className="text-xs text-base-content/60 ml-2 font-normal">
            v1.0.0
          </span>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link href={item.href} className="btn btn-ghost btn-sm">
                  <Icon size={16} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="navbar-end gap-2">
        {/* GitHub Link */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://github.com/SujoyGhosh-scott/treecharts-monorepo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ghost btn-sm"
          >
            <Github size={16} />
          </a>
        </div>

        {/* Language Selector */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-sm">
            <Globe size={16} />
            <span className="hidden sm:inline">EN</span>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-32"
          >
            <li>
              <a>English</a>
            </li>
            <li>
              <a className="text-base-content/50">Spanish (Soon)</a>
            </li>
            <li>
              <a className="text-base-content/50">French (Soon)</a>
            </li>
          </ul>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-sm"
          aria-label="Toggle theme"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <button
            className="btn btn-ghost btn-sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-base-100 border-b border-base-300 shadow-lg">
          <div className="p-4">
            <ul className="menu gap-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="btn btn-ghost justify-start"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Icon size={16} />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
