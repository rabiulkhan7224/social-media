import { Navbar } from "@/components/home/navbar";
import { ThemeToggle } from "@/components/home/theme-toggle";
export default function HomeLayout({children}: {children: React.ReactNode}) {
    return (
       <div className="h-screen   overflow-hidden flex flex-col transition-colors duration-300">
        {/* Theme Toggle Button */}
        <ThemeToggle />

        {/* Top Navbar */}
        <Navbar  />

        {/* Main Content Area */}
        <main className="flex-1 pt-28 overflow-hidden">
          {children}
        </main>

        {/* Mobile Bottom Navigation */}
        {/* <FeedMobileNav /> */}
      </div>
    );
}