import Link from "next/link";
import { BsIcon } from "./BsIcon";
import { events, exploreItems, leftSuggestedPeople } from "@/app/data/mock-data";
import { UserProfileImage } from "./user-profile-image";


// ─── Left Sidebar Component ───────────────────────────────────────────────
export async function LeftSidebar() {

  return (
    <aside className="hidden lg:flex flex-col gap-[16px] w-full">
      {/* ── Explore Card ── */}
      <div className="bg-white dark:bg-bs-dark1 rounded-[6px] px-[24px] pt-[24px] pb-[16px] border border-bs-border dark:border-bs-dark2 transition-colors bs-card-shadow">
        <h4 className="text-bs-dark dark:text-bs-text font-semibold text-[18px] mb-[24px] font-[Poppins]">Explore</h4>
        <ul className="space-y-[12px]">
          {exploreItems.map((item) => (
            <li key={item.label} className="mb-[24px]">
              <Link
                href='/'
                className="flex items-center text-bs-muted dark:text-bs-muted text-[16px] font-[Poppins] hover:text-bs-primary dark:hover:text-bs-primary leading-[1.4] font-medium transition-all group relative"
              >
                <div className="mr-[14px] flex items-center justify-center text-bs-muted group-hover:text-bs-primary transition-colors">
                  <BsIcon name={item.iconName} active={item.active} />
                </div>
                {item.label}
                {item.badge && (
                  <span className="absolute right-0 text-white text-[13px] font-normal border-2 border-white dark:border-bs-dark1 rounded-[8px] w-[36px] h-[24px] flex items-center justify-center bg-green-500">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Suggested People Card ── */}
      <div className="bg-white dark:bg-bs-dark1 rounded-[6px] px-[24px] pt-[24px] pb-[16px] border border-bs-border dark:border-bs-dark2 transition-colors bs-card-shadow">
        <div className="flex items-center justify-between mb-[24px]">
          <h4 className="text-bs-dark dark:text-bs-text font-semibold text-[18px] font-[Poppins]">Suggested People</h4>
          <Link href="#0" className="text-[12px] font-medium text-bs-primary leading-[18px] font-[Poppins]">See All</Link>
        </div>
        <div className="space-y-[24px]">
          {leftSuggestedPeople.map((person: any) => (
            <div key={person.name} className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <Link href={`#/profile/${person.id}`} className="mr-[16px]">
                  <UserProfileImage src={person.image} name={person.name} size={40} />
                </Link>
                <div className="flex-1">
                  <Link href={`#/profile/${person.id}`}>
                    <h4 className="text-[14px] font-medium text-bs-dark dark:text-bs-text font-[Poppins] leading-[1.1] hover:text-bs-primary transition-colors">{person.name}</h4>
                  </Link>
                  <p className="text-[11px] font-light text-bs-muted font-[Poppins] leading-[1.4] mt-[4px]">{person.position || person.role}</p>
                </div>
              </div>
              <a href="#0" className="_bs_suggested_btn_outline text-[12px] text-[#959EAE] dark:text-bs-muted font-medium font-[Poppins] border border-[#DCDFE4] dark:border-bs-dark3 bg-white dark:bg-bs-dark2 rounded-[2px] py-[7px] px-[7px] hover:text-white dark:hover:text-white hover:bg-bs-primary hover:border-bs-primary transition-all">
                Connect
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Events Card ── */}
      <div className="bg-white dark:bg-bs-dark1 rounded-[6px] mb-[16px] border border-bs-bg dark:border-bs-dark2 transition-colors">
        <div className="flex items-center justify-between px-[24px] pt-[24px] mb-[24px]">
          <h4 className="text-bs-dark dark:text-bs-text font-semibold text-[18px] font-[Poppins]">Events</h4>
          <Link href="#" className="text-[12px] font-medium text-bs-primary leading-[18px] font-[Poppins]">See all</Link>
        </div>
        <div className="px-[24px] pb-[24px]">
          {events.map((ev, i) => (
            <div key={i} className="mb-[16px] bg-white dark:bg-bs-dark2 rounded-[6px] cursor-pointer border border-bs-border dark:border-bs-dark3 overflow-hidden">
              <div className="w-full">
                <img src={ev.img} alt={ev.title} className="w-full rounded-t-[6px] object-cover" />
              </div>
              <div className="flex items-center p-[20px_16px_14px_16px]">
                <div className="bg-bs-green rounded-[2px] p-[8px] text-center w-fit">
                  <p className="text-[18px] font-bold text-white leading-[1.1] font-[Poppins]">{ev.day}</p>
                  <p className="text-[18px] font-normal text-white leading-[1.1] font-[Poppins]">{ev.month}</p>
                </div>
                <div className="pl-[8px] pt-[5px] flex-1">
                  <h4 className="text-[16px] font-medium text-black dark:text-bs-text leading-[1.4] font-[Poppins]">{ev.title}</h4>
                </div>
              </div>
              <div className="bg-bs-bg dark:bg-bs-dark3 h-px my-[4px] mb-[10px] w-full" />
              <div className="flex items-center justify-between p-[2px_16px_12px_16px]">
                <p className="text-[12px] font-medium text-[#8A8A8A] dark:text-bs-muted font-[Poppins] opacity-70 leading-[18px]">{ev.going}</p>
                <span className="text-[12px] font-medium text-bs-primary bg-[#F3F9FF] dark:bg-bs-dark1 border border-bs-primary rounded-[2px] p-[3px_14px] leading-[18px] hover:bg-bs-primary hover:text-white transition-all font-[Poppins]">Going</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}