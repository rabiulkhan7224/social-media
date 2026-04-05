import React from "react";

export interface Comment {
  id: number;
  author: string;
  authorImg: string;
  content: string;
  time: string;
  replies?: Comment[];
}

export interface Post {
  id: number;
  author: string;
  authorImg: string;
  time: string;
  content?: string;
  title?: string;
  postImg?: string;
  likes: string;
  comments: Comment[];
  shares: string;
}

export interface Friend {
  name: string;
  role: string;
  img: string;
  lastSeen?: string;
  active: boolean;
}

export interface SuggestedPerson {
  name: string;
  role: string;
  img: string;
  href: string;
}

export interface ExploreItem {
  label: string;
  badge?: string;
  iconName: any; // Using BsIcon name type
  href?: string;
  active?: boolean;
}

export interface EventItem {
  img: string;
  day: string;
  month: string;
  title: string;
  going: string;
}

// ─── Left Sidebar Navigation ──────────────────────────────────────────────
export const exploreItems: ExploreItem[] = [
  { label: "Learning", badge: "New", iconName: "explore" },
  { label: "Insights", iconName: "insights" },
  { label: "Find Friends", href: "/find-friends", iconName: "friends" },
  { label: "Bookmarks", iconName: "bookmarks" },
  { label: "Group", href: "/group", iconName: "friends" },
  { label: "Gaming", badge: "New", iconName: "gaming" },
  { label: "Settings", iconName: "settings" },
  { label: "Save post", iconName: "save" },
];

// ─── Left Sidebar Suggestions ──────────────────────────────────────────────
export const leftSuggestedPeople: SuggestedPerson[] = [
  { name: "Steve Jobs", role: "CEO of Apple", img: "/assets/images/people1.png", href: "/profile" },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", img: "/assets/images/people2.png", href: "/profile" },
  { name: "Dylan Field", role: "CEO of Figma", img: "/assets/images/people3.png", href: "/profile" },
];

// ─── Right Sidebar Suggestions (You Might Like) ───────────────────────────
export const rightSuggestedPeople: SuggestedPerson[] = [
  { name: "Radovan SkillArena", role: "Founder & CEO at Trophy", img: "/assets/images/Avatar.png", href: "/profile" }
];

// ─── Right Sidebar Friend List (8 Items from Design) ─────────────────────
export const friends: Friend[] = [
  { name: "Steve Jobs", role: "CEO of Apple", img: "/assets/images/people1.png", lastSeen: "5 minute ago", active: false },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", img: "/assets/images/people2.png", active: true },
  { name: "Dylan Field", role: "CEO of Figma", img: "/assets/images/people3.png", active: true },
  { name: "Steve Jobs", role: "CEO of Apple", img: "/assets/images/people1.png", lastSeen: "5 minute ago", active: false },
  { name: "Ryan Roslansky", role: "CEO of Linkedin", img: "/assets/images/people2.png", active: true },
  { name: "Dylan Field", role: "CEO of Figma", img: "/assets/images/people3.png", active: true },
  { name: "Dylan Field", role: "CEO of Figma", img: "/assets/images/people3.png", active: true },
  { name: "Steve Jobs", role: "CEO of Apple", img: "/assets/images/people1.png", lastSeen: "5 minute ago", active: false },
];

// ─── Events List ─────────────────────────────────────────────────────────
export const events: EventItem[] = [
  { img: "/assets/images/feed_event1.png", day: "10", month: "Jul", title: "No more terrorism no more cry", going: "17 People Going" },
  { img: "/assets/images/feed_event1.png", day: "14", month: "Aug", title: "Global Tech Summit 2025", going: "42 People Going" },
];

// ─── Main Feed Posts ─────────────────────────────────────────────────────
export const feedData: Post[] = [
  {
    id: 1,
    author: "Karim Saif",
    authorImg: "/assets/images/post_img.png",
    time: "5 minute ago",
    title: "-Healthy Tracking App",
    postImg: "/assets/images/timeline_img.png",
    likes: "9+",
    shares: "122",
    comments: [
      {
        id: 101,
        author: "Radovan SkillArena",
        authorImg: "/assets/images/txt_img.png",
        content: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
        time: "21m",
        replies: []
      }
    ]
  },
  {
    id: 2,
    author: "Radovan SkillArena",
    authorImg: "/assets/images/people2.png",
    time: "15 minute ago",
    content: "Just launched my new project! Super excited to share it with the community. #webdev #design",
    postImg: "/assets/images/feed_event1.png",
    likes: "45",
    shares: "12",
    comments: []
  },
  {
    id: 3,
    author: "Steve Jobs",
    authorImg: "/assets/images/people1.png",
    time: "1 hour ago",
    content: "Design is not just what it looks like and feels like. Design is how it works.",
    likes: "1.2k",
    shares: "450",
    comments: [
      {
        id: 301,
        author: "Dylan Field",
        authorImg: "/assets/images/people3.png",
        content: "Absolutely agree! Simplicity is the ultimate sophistication.",
        time: "45m",
        replies: [
          {
            id: 302,
            author: "Steve Jobs",
            authorImg: "/assets/images/people1.png",
            content: "Stay hungry, stay foolish.",
            time: "10m"
          }
        ]
      }
    ]
  },
  {
    id: 4,
    author: "Karim Saif",
    authorImg: "/assets/images/post_img.png",
    time: "2 hours ago",
    content: "Working on some new illustrations for the BuddyScript platform. Stay tuned!",
    postImg: "/assets/images/timeline_img.png",
    likes: "88",
    shares: "5",
    comments: []
  }
];