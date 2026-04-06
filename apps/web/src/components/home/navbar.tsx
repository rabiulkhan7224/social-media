"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsIcon } from "./BsIcon";
import Image from "next/image";
import { Input } from "@social-media/ui/components/input";
import { useAuth } from "@/app/hooks/useAuth";

// ─── Notification Dropdown ────────────────────────────────────────────────
function NotificationDropdown({ open }: { open: boolean }) {
  if (!open) return null;
  const items = [
    {
      img: "/assets/images/friend-req.png",
      name: "Steve Jobs",
      text: "posted a link in your timeline.",
      time: "42 minutes ago",
    },
    {
      img: "/assets/images/profile-1.png",
      name: "An admin",
      text: "changed the name of the group Freelancer usa to Freelancer usa",
      time: "42 minutes ago",
    },
    {
      img: "/assets/images/friend-req.png",
      name: "Steve Jobs",
      text: "posted a link in your timeline.",
      time: "42 minutes ago",
    },
  ];
  return (
    <div className="absolute right-0 top-[110%] w-[330px] bg-bg-card dark:bg-bs-dark1 rounded-[6px] shadow-[7px_20px_60px_rgba(108,126,147,0.15)] z-50 border border-bs-bg dark:border-bs-dark2 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="p-[20px] flex items-center justify-between border-b border-bs-bg dark:border-bs-dark2">
        <h4 className="text-[17px] font-semibold text-bs-dark dark:text-bs-text font-[Poppins]">
          Notifications
        </h4>
        <button className="p-1 hover:bg-bs-bg dark:hover:bg-bs-dark2 rounded-full transition-colors group">
          <BsIcon
            name="more-vertical"
            size={17}
            className="text-[#C4C4C4] group-hover:text-bs-primary transition-colors"
          />
        </button>
      </div>

      <div className="px-[20px] py-[15px] flex gap-[8px] border-b border-bs-bg dark:border-bs-dark2 bg-[#FAFAFA] dark:bg-bs-dark2">
        <button className="px-[16px] py-[6px] bg-bs-primary text-white text-[13px] font-medium rounded-[4px] font-[Poppins]">
          All
        </button>
        <button className="px-[16px] py-[6px] bg-bg-card dark:bg-bs-dark1 border border-bs-bg dark:border-bs-dark3 text-[#767676] dark:text-bs-muted text-[13px] font-medium rounded-[4px] font-[Poppins] hover:border-bs-primary hover:text-bs-primary transition-all">
          Unread
        </button>
      </div>

      <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
        {items.map((n, i) => (
          <div
            key={i}
            className="flex gap-[12px] px-[20px] py-[15px] hover:bg-bs-bg dark:hover:bg-bs-dark2 cursor-pointer transition-colors border-b border-bs-bg dark:border-bs-dark2 last:border-0"
          >
            <img
              src={n.img}
              alt=""
              className="w-[45px] h-[45px] rounded-full object-cover shrink-0 border border-bs-bg dark:border-bs-dark2"
            />
            <div className="flex-1">
              <p className="text-[14px] text-bs-dark dark:text-bs-text leading-[1.4] font-[Poppins]">
                <span className="font-semibold hover:text-bs-primary transition-colors cursor-pointer">
                  {n.name}
                </span>{" "}
                {n.text}
              </p>
              <div className="text-[12px] text-bs-muted mt-[4px] font-[Poppins]">
                {n.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Profile Dropdown ─────────────────────────────────────────────────────
function ProfileDropdown({
  open,
  user,
  signOut,
  setDropOpen,
}: {
  open: boolean;
  user: any;
  signOut: () => void;
  setDropOpen: (open: boolean) => void;
}) {
  if (!open) return null;

  const handleLogout = async () => {
    setDropOpen(false);
    signOut();
  };
  // user.name
  const userName = user?.name || "Guest";
  const userImage = user?.image || "/assets/images/profile.png";

  return (
    <div className="absolute right-0 top-[110%] w-[240px] bg-bg-card dark:bg-bs-dark1 rounded-[6px] shadow-[7px_20px_60px_rgba(108,126,147,0.15)] z-50 border border-bs-bg dark:border-bs-dark2 py-[10px] animate-in fade-in slide-in-from-top-2 duration-200">
      {/* User Info */}
      <div className="flex gap-[12px] px-[20px] py-[15px] items-center border-b border-bs-bg dark:border-bs-dark2 mb-[10px]">
        {/* <UserProfileImage src={user?.image} name={userName} size={45} /> */}
        <Image
          src={userImage}
          alt={userName}
          width={45}
          height={45}
          className="w-[45px] h-[45px] rounded-full object-cover shrink-0 border border-bs-bg dark:border-bs-dark2"
        />
        q
        <div>
          <h4 className="text-[15px] font-bold text-bs-dark dark:text-bs-text font-[Poppins]">
            {userName}
          </h4>
          <Link
            href="#profile"
            className="text-[12px] text-bs-primary hover:underline font-medium font-[Poppins]"
          >
            View Profile
          </Link>
        </div>
      </div>

      {/* Menu List */}
      <div className="px-[10px]">
        <ul className="flex flex-col gap-[2px]">
          <li>
            <a
              href="#0"
              className="flex items-center justify-between px-[15px] py-[10px] rounded-[4px] hover:bg-bs-bg dark:hover:bg-bs-dark2 transition-all group"
            >
              <div className="flex items-center gap-[12px]">
                <span className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#EBF2FF] dark:bg-bs-dark2">
                  <BsIcon name="settings" size={18} />
                </span>
                <span className="text-[14px] font-medium text-bs-dark dark:text-bs-text font-[Poppins]">
                  Settings
                </span>
              </div>
              <BsIcon
                name="close"
                size={10}
                className="opacity-40 group-hover:opacity-100 transition-opacity text-bs-dark dark:text-bs-text"
              />
            </a>
          </li>
          <li>
            <a
              href="#0"
              className="flex items-center justify-between px-[15px] py-[10px] rounded-[4px] hover:bg-bs-bg dark:hover:bg-bs-dark2 transition-all group"
            >
              <div className="flex items-center gap-[12px]">
                <span className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#EBF2FF] dark:bg-bs-dark2">
                  <BsIcon name="help" size={20} />
                </span>
                <span className="text-[14px] font-medium text-bs-dark dark:text-bs-text font-[Poppins]">
                  Help & Support
                </span>
              </div>
              <BsIcon
                name="close"
                size={10}
                className="opacity-40 group-hover:opacity-100 transition-opacity text-bs-dark dark:text-bs-text"
              />
            </a>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between px-[15px] py-[10px] rounded-[4px] hover:bg-bs-bg dark:hover:bg-bs-dark2 transition-all group mt-[5px] border-t border-bs-bg dark:border-bs-dark2 pt-[15px]"
            >
              <div className="flex items-center gap-[12px]">
                <span className="w-[32px] h-[32px] flex items-center justify-center rounded-full bg-[#FFEBEB] dark:bg-bs-dark2">
                  <BsIcon name="logout" size={18} />
                </span>
                <span className="text-[14px] font-medium text-[#FF3737] font-[Poppins]">
                  Logout
                </span>
              </div>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

// ─── Main Navbar ──────────────────────────────────────────────────────────
export function Navbar() {
  const [notifyOpen, setNotifyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifyRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const { user, signOut } = useAuth();
  console.log(user);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (notifyRef.current && !notifyRef.current.contains(e.target as Node))
        setNotifyOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node))
        setProfileOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <nav className="w-full bg-bg-card dark:bg-bs-dark1 border-b border-bs-bg dark:border-bs-dark2 fixed top-0 left-0 z-50 transition-colors">
      <div className="max-w-[1440px] md:px-16 px-4 mx-auto">
        {/* Navigation Wrapper matching _header_inner_wrap padding 27px 0 29px */}
        <div className="flex items-center justify-between py-5 relative px-4 sm:px-0">
          <div className="flex items-center flex-1 max-w-[50%]">
            {/* Logo */}
            <Link href="/" className="shrink-0 mr-[32px]">
              <img
                src="/assets/images/logo.svg"
                alt="Buddy Script"
                className="w-[165px] object-contain"
              />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-[424px] hidden sm:block">
              <div className={`relative `}>
                <BsIcon
                  name="search"
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-bs-muted"
                />

                <Input
                  type="text"
                  placeholder="Search"
                  className="w-full pl-10 pr-4 py-2 rounded-[12px] bg-bg-card dark:bg-bs-dark1 border border-bs-bg dark:border-bs-dark2 focus:border-bs-primary focus:ring-1 focus:ring-bs-primary transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Nav Icons */}
          <div className="flex items-center lg:gap-[20px] gap-[8px] justify-end">
            {/* Home */}
            <Link
              href="/"
              className="flex items-center justify-center p-[6px] hover:bg-bs-bg dark:hover:bg-bs-dark2 rounded-full transition-colors relative h-[40px] w-[40px]"
            >
              <BsIcon name="home" size={20} active />
            </Link>

            {/* Friends */}
            <Link
              href="#"
              className="flex items-center justify-center p-[6px] hover:bg-bs-bg dark:hover:bg-bs-dark2 rounded-full transition-colors relative h-[40px] w-[40px]"
            >
              <BsIcon name="friends" size={24} />
            </Link>

            {/* Notifications */}
            <div
              ref={notifyRef}
              className="relative flex items-center justify-center h-[40px] w-[40px]"
            >
              <button
                onClick={() => {
                  setNotifyOpen((v) => !v);
                  setProfileOpen(false);
                }}
                className="flex items-center justify-center hover:bg-bs-bg dark:hover:bg-bs-dark2 rounded-full transition-colors relative w-full h-full"
              >
                <BsIcon name="bell" size={22} />
                <span className="absolute -top-[2px] -right-[2px] min-w-[17px] h-[17px] px-[3px] bg-bs-primary border border-white dark:border-bs-dark1 text-white text-[11px] font-[Poppins] rounded-[9px] flex items-center justify-center leading-[1.4]">
                  6
                </span>
              </button>
              <NotificationDropdown open={notifyOpen} />
            </div>

            {/* Chat */}
            <Link
              href="#"
              className="flex items-center justify-center hover:bg-bs-bg dark:hover:bg-bs-dark2 rounded-full transition-colors relative w-[40px] h-[40px]"
            >
              <BsIcon name="chat" size={22} />
              <span className="absolute -top-[2px] -right-[2px] min-w-[17px] h-[17px] px-[3px] bg-bs-primary border border-white dark:border-bs-dark1 text-white text-[11px] font-[Poppins] rounded-[9px] flex items-center justify-center leading-[1.4]">
                2
              </span>
            </Link>

            {/* Profile */}
            <div
              ref={profileRef}
              className="relative flex items-center gap-[8px] ml-[8px] sm:ml-[12px] cursor-pointer"
              onClick={() => {
                setProfileOpen((v) => !v);
                setNotifyOpen(false);
              }}
            >
              <div className="hidden md:flex items-center">
                <span className="text-[16px] font-normal text-bs-muted font-[Poppins]">
                  {user?.name}
                </span>
                <div className="ml-[8px] mt-[-3px]">
                  <BsIcon name="chevron-down" size={10} />
                </div>
              </div>
              <ProfileDropdown
                open={profileOpen}
                user={user}
                signOut={signOut}
                setDropOpen={setProfileOpen}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
