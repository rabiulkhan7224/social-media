import { LeftSidebar } from "@/components/home/LeftSidebar";
import { PostSkeleton } from "@/components/home/PostSkeleton";
import { Timeline } from "@/components/home/timeline";
import { getPosts } from "@/lib/action/usePost";
import { Suspense } from "react";
interface FeedPageProps {
  searchParams?: Promise<{
    page?: string;
    limit?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }>;
}
export default async function FeedPage({ searchParams }: FeedPageProps) {
   const params = await searchParams;
  const page = params?.page ? parseInt(params.page) : 1;
  const limit = params?.limit ? parseInt(params.limit) : 10;
  const search = params?.search;
  const sortBy = (params?.sortBy as 'createdAt' | 'updatedAt' | 'title') || 'createdAt';
  const sortOrder = (params?.sortOrder as 'asc' | 'desc') || 'desc';
       const postsPromise = getPosts({
    page,
    limit,
    search,
    sortBy,
    sortOrder,
    includeComments: true,
    includeLikes: true,
  });

     
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
            <Suspense fallback={<PostSkeleton/>}>
            <Timeline postsPromise={postsPromise} />
            </Suspense>
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