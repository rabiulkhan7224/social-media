import { LeftSidebar } from "@/components/home/LeftSidebar";

export default function FeedPage() {
    return (
          <div className="w-full container md:px-16 px-4 mx-auto h-full">
      <div className="flex flex-col lg:flex-row gap-5 justify-center items-start h-full">
        {/* ── Left Sidebar ── */}
        <div className="hidden lg:block w-full lg:w-[280px] xl:w-[320px] shrink-0 h-full overflow-y-auto scrollbar-hide">
          <div className="">
        <LeftSidebar/>

          </div>
        </div>

        {/* ── Main Feed (Middle) ── */}
        <div className="flex-1 w-full max-w-[680px] h-full overflow-y-auto scrollbar-hide">
           <div className="">
            

            {/* Post Timeline */}
          </div>
        </div>

        {/* ── Right Sidebar ── */}
        <div className="hidden lg:block w-full lg:w-[280px] xl:w-[320px] shrink-0 h-full overflow-y-auto scrollbar-hide">
          <div className="">
          </div>
        </div>
      </div>
    </div>
    );
}