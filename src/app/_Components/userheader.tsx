"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button, Drawer, Divider, Badge } from "antd";
import { MenuOutlined, LogoutOutlined, BellOutlined } from "@ant-design/icons";
import { motion, AnimatePresence } from "framer-motion";
import App from "./Drawer"; // Restoring your custom Sidebar component

export default function PlanoraHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const { data: session } = useSession();
  const user = session?.user;

  const navLinks = [
    { name: "Dashboard", href: "/Dashboard" },
    { name: "Find Professional", href: "/findProfessional" },
    { name: "About Us", href: "#" },
    { name: "Become a Professional", href: "/FormPage" },
    { name: "Contact Us", href: "#" },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

return (
  <header
    className={`fixed w-full top-0 left-0 z-[100] transition-all duration-500 ${
      scrolled
        ? "bg-[#050A18]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl"
        : "bg-transparent py-6"
    }`}
  >
    <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
      {/* Logo Section */}
      <Link href="/" className="flex items-center gap-3 group">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg group-hover:rotate-6 transition-all">
          <span className="text-white font-black text-xl">P</span>
        </div>
        <span className="text-2xl font-black text-white tracking-tighter">
          Planora
        </span>
      </Link>

        {/* Desktop Navigation & Tools */}
        <nav className="hidden lg:flex items-center space-x-7">
          <div className="flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[12px] font-bold text-white/60 hover:text-cyan-400 transition-all tracking-widest uppercase"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="h-5 w-[1px] bg-white/10 mx-2" />

          {/* Icons & Actions Section */}
          <div className="flex items-center gap-4">
            {/* Notification Icon - Integrated with Glassmorphism */}
            <button className="relative p-2 text-white/70 hover:text-white transition-colors">
              <Badge dot status="processing" offset={[-2, 2]}>
                <BellOutlined style={{ fontSize: "20px", color: "inherit" }} />
              </Badge>
            </button>

            {!user ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/login"
                  className="text-sm font-bold text-white/80 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/Signup"
                  className="px-6 py-2 bg-cyan-500 text-black rounded-full font-black text-xs hover:bg-white hover:scale-105 transition-all"
                >
                  REGISTER
                </Link>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setUserDropdown(!userDropdown)}
                  className="flex items-center gap-2 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-[10px] font-black text-white uppercase tracking-tighter">
                    Account
                  </span>
                </button>

                <AnimatePresence>
                  {userDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-60 bg-[#0a0f2c] border border-white/10 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-2xl"
                    >
                      <div className="p-5 border-b border-white/5 bg-white/5">
                        <p className="font-bold text-white tracking-tight">
                          {user.name}
                        </p>
                        <p className="text-white/40 text-[10px] truncate uppercase tracking-widest">
                          {user.email}
                        </p>
                      </div>
                      <button
                        onClick={() => signOut()}
                        className="w-full flex items-center gap-3 px-5 py-4 text-red-400 hover:bg-red-500/10 transition-colors font-bold text-sm"
                      >
                        <LogoutOutlined /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* The Sidebar Trigger Component (App) */}
            <App />
          </div>
        </nav>

        {/* Mobile View */}
        <div className="lg:hidden flex items-center gap-4">
          <button className="text-white/70">
            <Badge dot color="cyan">
              <BellOutlined style={{ fontSize: "20px", color: "inherit" }} />
            </Badge>
          </button>
          <Button
            type="text"
            className="flex items-center justify-center bg-white/5 border border-white/10"
            icon={<MenuOutlined style={{ color: "#fff", fontSize: "18px" }} />}
            onClick={() => setOpen(true)}
          />
        </div>

        {/* Mobile Drawer */}
        <Drawer
          title={
            <span className="text-white font-black tracking-widest italic">
              PLANORA
            </span>
          }
          placement="right"
          onClose={() => setOpen(false)}
          open={open}
          className="nav-drawer"
          headerStyle={{
            background: "#050A18",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
          bodyStyle={{ background: "#050A18", padding: "0" }}
        >
          <div className="flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-lg font-bold text-white/70 hover:text-cyan-400 p-6 border-b border-white/5 transition-colors"
              >
                {link.name}
              </Link>
            ))}
            <div className="p-6 mt-4 flex flex-col gap-4">
              {!user ? (
                <>
                  <Link
                    href="/Signup"
                    className="w-full py-4 bg-cyan-500 text-center text-black font-black rounded-xl"
                  >
                    Register
                  </Link>
                  <Link
                    href="/login"
                    className="w-full py-4 border border-white/20 text-center text-white font-bold rounded-xl"
                  >
                    Login
                  </Link>
                </>
              ) : (
                <Button
                  danger
                  block
                  size="large"
                  onClick={() => signOut()}
                  className="h-14 font-black rounded-xl border-red-500/30"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
        </Drawer>
      </div>

      <style jsx global>{`
        .nav-drawer .ant-drawer-close {
          color: white !important;
        }
        .nav-drawer .ant-drawer-content {
          background: #050a18 !important;
        }
        .ant-badge-dot {
          box-shadow: 0 0 0 1px #050a18 !important;
        }
      `}</style>
    </header>
  );
}
