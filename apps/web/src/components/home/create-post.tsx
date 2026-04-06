"use client";
import { useState } from "react";
import { UserProfileImage } from "./user-profile-image";
import { BsIcon } from "./BsIcon";
const actions = [
  {
    label: "Photo",
    iconName: "photo-fill" as const,
  },
  {
    label: "Video",
    iconName: "video-fill" as const,
  },
  {
    label: "Event",
    iconName: "event-fill" as const,
  },
  {
    label: "Article",
    iconName: "article-fill" as const,
  },
];

// ─── Create Post Component ────────────────────────────────────────────────
export function CreatePost({ user }: { user?: any }) {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreatePost = () => {
    if (!text.trim() && !image) return;

    const formData = new FormData();
    formData.append("content", text);
    if (image) {
      formData.append("image", image);
    }

    // Call your API to create the post
  };

  const fileInputRef = (instance: HTMLInputElement | null) => {
    if (instance) {
      // logic to trigger from button
    }
  };

  return (
    <div className="bg-white dark:bg-bs-dark1 rounded-[6px] mb-6 border border-bs-border dark:border-bs-dark2 bs-card-shadow">
      <div className="p-6">
        {/* Textarea Area */}
        <div className="flex items-start">
          <div className="mr-3">
            <UserProfileImage
              src={user?.image}
              name={
                user?.name ||
                `${user?.firstName || ""} ${user?.lastName || ""}`.trim()
              }
              size={43}
            />
          </div>
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write something..."
              rows={2}
              className="w-full resize-none bg-transparent text-[14px] text-bs-dark dark:text-bs-text font-[Poppins] border-none placeholder-[#666] focus:outline-none focus:ring-0 pt-3 pb-3 min-h-11"
            />
          </div>
        </div>

        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-4 relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-75 w-full object-cover rounded-[6px] border border-bs-bg dark:border-bs-dark2"
            />
            <button
              onClick={() => {
                setImage(null);
                setImagePreview(null);
              }}
              className="absolute top-2 right-2 bg-bs-dark/50 text-white p-1 rounded-full hover:bg-bs-dark transition-all"
            >
              <BsIcon name="close" size={16} />
            </button>
          </div>
        )}
      </div>

      <hr className="border-t border-bs-bg dark:border-bs-dark2 mx-6" />

      {/* Bottom Bar */}
      <div className="px-6 py-4 flex flex-wrap items-center justify-between gap-y-4">
        {/* Action Buttons */}
        <div className="flex items-center gap-6">
          <input
            type="file"
            id="post-image-upload"
            className="hidden"
            accept="image/*"
            onChange={handleImageChange}
          />
          {actions.map((action) => (
            <button
              key={action.label}
              type="button"
              onClick={() => {
                if (action.label === "Photo") {
                  document.getElementById("post-image-upload")?.click();
                }
              }}
              className="flex items-center gap-2.5 text-[#767676] dark:text-bs-muted text-[14px] font-medium font-[Poppins] hover:text-bs-primary transition-all group"
            >
              <BsIcon
                name={action.iconName}
                size={20}
                className="text-[#888]"
              />
              <span className="hidden sm:inline">{action.label}</span>
            </button>
          ))}
        </div>

        {/* Post Button */}
        <button
          type="button"
          onClick={handleCreatePost}
          disabled={isPending || (!text.trim() && !image)}
          className="flex items-center gap-1.5 bg-bs-primary hover:bg-[#1580E0] disabled:opacity-50 text-white font-medium text-[14px] font-[Poppins] px-6 py-2.5 rounded-[6px] transition-all"
        >
          {isPending ? (
            <span className="pb-px">Posting...</span>
          ) : (
            <>
              <BsIcon
                name="send-fill"
                size={14}
                className="text-white"
                active
              />
              <span className="pb-px">Post</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
