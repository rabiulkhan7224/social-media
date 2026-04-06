"use client";


import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { UserProfileImage } from "./user-profile-image";
import { BsIcon } from "./BsIcon";
import { BsInput } from "./BsInput";

const reactions = [
  { label: "Haha", icon: "haha" },
  { label: "Comment", icon: "chat" },
  { label: "Share", icon: "share" },
];


// ─── Single Post Card ─────────────────────────────────────────────────────
export function PostCard({ post , currentUser }: { post?: any; currentUser?: any }) {
  const [dropOpen, setDropOpen] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [allCommentsVisible, setAllCommentsVisible] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [showLikeList, setShowLikeList] = useState(false);
/**
 * {
    "id": "a1be869a-c9e1-4706-9a10-30d0233c38e1",
    "content": "This is the content of my first post.",
    "image": null,
    "authorId": "V0HQXmnLbQDecOoHA4UI9BBXsXskRkny",
    "createdAt": "2026-04-03T17:23:09.838Z",
    "updatedAt": "2026-04-03T17:23:09.838Z",
    "author": {
        "id": "V0HQXmnLbQDecOoHA4UI9BBXsXskRkny",
        "name": "Md Rabiul Hasan ",
        "image": null
    },
    "Comment": [
        {
            "id": "7d5fadfa-71d4-4d69-92e4-bfb70626bd00",
            "content": "This is the this is a comment.",
            "postId": "a1be869a-c9e1-4706-9a10-30d0233c38e1",
            "authorId": "V0HQXmnLbQDecOoHA4UI9BBXsXskRkny",
            "parentId": null,
            "createdAt": "2026-04-04T03:12:21.226Z",
            "updatedAt": "2026-04-04T03:12:21.226Z",
            "author": {
                "id": "V0HQXmnLbQDecOoHA4UI9BBXsXskRkny",
                "name": "Md Rabiul Hasan ",
                "image": null
            }
        }
    ],
    "Like": [
        {
            "id": "8c44934f-241b-4195-987e-70364ee7951b",
            "postId": "a1be869a-c9e1-4706-9a10-30d0233c38e1",
            "userId": "V0HQXmnLbQDecOoHA4UI9BBXsXskRkny",
            "createdAt": "2026-04-04T05:13:10.138Z",
            "updatedAt": "2026-04-04T05:13:10.138Z"
        }
    ],
    "_count": {
        "comments": 1,
        "likes": 1
    }
}
 */

console.log(post.Comment)
  // Mock handlers (replace with real mutations later)
  const handleLike = () => {
    toast.success("Post liked!");
  };

  const handleCommentSubmit = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e && e.key !== "Enter") return;
    if (!commentText.trim()) return;

    toast.success("Comment posted!");
    setCommentText("");
  };

  const handleReplySubmit = (commentId: string) => {
    if (!replyText.trim()) return;
    toast.success("Reply posted!");
    setReplyText("");
    setReplyingTo(null);
  };

  const handleDeletePost = () => {
    if (!confirm("Are you sure you want to delete this post?")) return;
    toast.success("Post deleted successfully");
    setDropOpen(false);
  };

  const authorName = post.author?.name || "Unknown User";
  const isPostLikedByMe = post.likes?.some((like: any) => like.userId === currentUser?.id);
  
  return (
    <div className="bg-white dark:bg-bs-dark1 rounded-[6px] mb-6 border border-bs-border dark:border-bs-dark2 transition-colors overflow-hidden bs-card-shadow">
      {/* Post Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-4">
        <div className="flex items-center gap-3">
          <UserProfileImage src={post.author?.image} name={authorName} size={42} />
          <div>
            <Link href={`#/profile/${post.author?.id}`} className="text-[15px] font-medium text-bs-dark dark:text-bs-text hover:text-bs-primary transition-colors">
              {authorName}
            </Link>
            <div className="flex items-center gap-1 text-xs text-bs-muted">
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
              <span className="w-1 h-1 rounded-full bg-bs-muted mx-1" />
                <BsIcon name={(post.visibility === "PRIVATE" ? "lock" : "explore") as any} size={10} />
            </div>
          </div>
        </div>

        {/* 3-dot Menu */}
        <div className="relative">
          <button
            onClick={() => setDropOpen((v) => !v)}
            className="w-6 h-6 flex items-center justify-center text-bs-muted hover:text-bs-primary transition-colors"
          >
            <BsIcon name="more-vertical" size={18} />
          </button>

          {dropOpen && (
            <div className="absolute right-0 top-10 w-52 bg-white dark:bg-bs-dark1 rounded-[6px] shadow-[7px_20px_60px_rgba(108,126,147,0.15)] border border-bs-border dark:border-bs-dark2 z-50 py-1 text-sm">
              <button className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-bs-bg dark:hover:bg-bs-dark2 text-bs-muted hover:text-bs-primary transition-all">
                <BsIcon name="bookmarks" size={16} /> Save Post
              </button>
              <button className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-bs-bg dark:hover:bg-bs-dark2 text-bs-muted hover:text-bs-primary transition-all">
                <BsIcon name="bell" size={16} /> Turn on notifications
              </button>
              {/* {isPostAuthor && (
                <>
                  <button className="w-full flex items-center gap-3 px-5 py-2.5 hover:bg-bs-bg dark:hover:bg-bs-dark2 text-bs-muted hover:text-bs-primary transition-all">
                    <BsIcon name="edit" size={16} /> Edit Post
                  </button>
                  <button
                    onClick={handleDeletePost}
                    className="w-full flex items-center gap-3 px-5 py-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <BsIcon name="trash" size={16} /> Delete Post
                  </button>
                </>
              )} */}
            </div>
          )}
        </div>
      </div>

      {/* Post Content */}
   
        <div className="px-6 pb-4">
          <p className="text-[15px] leading-relaxed  whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      

      {/* Post Image */}
      {post.image && (
        <div className="px-6 pb-4">
          <Image
            src={post.image}
            alt="Post image"
            width={800}
            height={500}
            className="w-full rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}

      {/* Reaction Summary */}
      <div className="flex items-center justify-between px-6 py-4 border-t border-bs-border dark:border-bs-dark2 text-sm">
        <button
          onClick={() => setShowLikeList(!showLikeList)}
          className="flex items-center gap-2 text-bs-muted hover:text-bs-primary transition-colors"
        >
          <div className="flex -space-x-2">
            {post.like?.slice(0, 3).map((like: any, i: number) => (
              <UserProfileImage key={i} src={like.user?.image} name={like.user?.name} size={22} className="border-2 border-white dark:border-bs-dark1" />
            ))}
          </div>
          <span>{post._count?.likes || 0} Likes</span>
        </button>

        <div className="flex items-center gap-6 text-bs-muted">
          <span>{post._count?.comments || 0} Comments</span>
          <span>0 Shares</span>
        </div>
      </div>

      {/* Reaction Buttons */}
      <div className="flex items-center justify-between px-[16px] py-[8px] border-b border-bs-bg dark:border-bs-dark2">
        {reactions.map((r, i) => {
           const active = r.label === "Haha" && isPostLikedByMe;
           
           return (
            <button
              key={i}
              onClick={() => {
                if (r.label === "Comment") setShowComment((v) => !v);
                if (r.label === "Haha") handleLike();
              }}
              className={`flex items-center gap-[8px] px-[20px] py-[10px] rounded-[6px] text-[15px] font-[Poppins] transition-all hover:bg-bs-bg dark:hover:bg-bs-dark2 ${
                active ? "text-bs-primary" : "text-bs-muted"
              } flex-1 justify-center group`}
            >
              <BsIcon name={r.icon as any} size={20} active={active} className="group-hover:text-bs-primary transition-colors" />
              <span className="hidden sm:inline font-medium">{r.label}</span>
            </button>
          );
        })}
      </div>

      {/* Comment Section */}
      {showComment && (
        <div className="px-6 pt-6 pb-8 border-t border-bs-border dark:border-bs-dark2">
          {/* Comment Input */}
          <div className="flex gap-3 mb-6">
            <UserProfileImage src={currentUser?.image} name={currentUser?.name} size={36} />
            <div className="flex-1 relative">
              <BsInput
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={handleCommentSubmit}
                placeholder="Write a comment..."
                className="pr-12"
              />
              <button
                onClick={() => handleCommentSubmit()}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-bs-primary"
              >
                <BsIcon name="send" size={18} />
              </button>
            </div>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {post.Comment?.map((com: any) => (
              <div key={com.id} className="flex gap-3">
                <UserProfileImage src={com.author?.image} name={com.author?.name} size={36} />

                <div className="flex-1">
                  <div className="bs-comment-bubble p-4 rounded-2xl">
                    <Link href="#" className="font-semibold text-bs-text hover:text-bs-primary">
                      {com.author?.name}
                    </Link>
                    <p className="text-sm text-bs-muted mt-1">{com.content}</p>
                  </div>

                  <div className="flex gap-4 mt-2 text-xs text-bs-muted pl-1">
                    <button className="hover:text-bs-primary">Like</button>
                    <button onClick={() => setReplyingTo(com.id)} className="hover:text-bs-primary">Reply</button>
                    <span>{new Date(com.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}