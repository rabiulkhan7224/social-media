
import { PostCard } from "./PostCard";

export  async function Timeline({ postsPromise }: { postsPromise: Promise<any> }) {

    const result = await postsPromise;

  if (!result.success) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-900/20 dark:text-red-400">
        Error loading posts: {result.message}
      </div>
    );
  }

  if (!result.data || result.data.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center">
        <p className="text-gray-500 dark:text-gray-400">No posts yet</p>
        <a
          href="/dashboard/create"
          className="mt-2 inline-block text-blue-600 hover:underline"
        >
          Create the first post →
        </a>
      </div>
    );
  }
 

  

 

  return (
    <div className="space-y-4">

     {result.data.map((post:any) => (
        <PostCard key={post.id} post={post} />
      ))}
        
     
    </div>
  );
}