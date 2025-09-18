export interface CommunityPost {
  id: string
  type: "project" | "discussion" | "achievement" | "question"
  title: string
  content: string
  author: {
    id: string
    name: string
    avatar: string
    role: "admin" | "mentor" | "member"
    level: number
  }
  createdAt: Date
  updatedAt: Date
  likes: number
  comments: number
  shares: number
  tags: string[]
  image?: string
  projectUrl?: string
  isLiked?: boolean
  isBookmarked?: boolean
}

export interface Comment {
  id: string
  postId: string
  author: {
    id: string
    name: string
    avatar: string
    role: "admin" | "mentor" | "member"
  }
  content: string
  createdAt: Date
  likes: number
  isLiked?: boolean
}

export const communityPosts: CommunityPost[] = [
  {
    id: "1",
    type: "project",
    title: "AI-Powered Task Manager Built with React & Node.js",
    content:
      "Just finished building a full-stack task management application with AI suggestions! It uses React for the frontend, Node.js/Express for the backend, and integrates with OpenAI's API for intelligent task prioritization. The app features real-time collaboration, drag-and-drop functionality, and smart notifications.",
    author: {
      id: "1",
      name: "Emma Wilson",
      avatar: "/female-developer-avatar.png",
      role: "member",
      level: 8,
    },
    createdAt: new Date("2024-01-20T10:30:00Z"),
    updatedAt: new Date("2024-01-20T10:30:00Z"),
    likes: 234,
    comments: 45,
    shares: 12,
    tags: ["React", "Node.js", "AI", "Full-Stack"],
    image: "/task-manager-app-interface-with-modern-design.jpg",
    projectUrl: "https://github.com/emma/ai-task-manager",
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: "2",
    type: "achievement",
    title: "Completed Python Mastery Path!",
    content:
      "After 3 months of consistent learning, I've finally completed the entire Python curriculum! Built 5 real-world projects including a data analysis dashboard, web scraper, and machine learning model. The journey was challenging but incredibly rewarding. Special thanks to Dr. Alex Chen for the amazing course content!",
    author: {
      id: "2",
      name: "David Kim",
      avatar: "/male-developer-avatar-with-glasses.jpg",
      role: "member",
      level: 12,
    },
    createdAt: new Date("2024-01-19T15:45:00Z"),
    updatedAt: new Date("2024-01-19T15:45:00Z"),
    likes: 189,
    comments: 28,
    shares: 8,
    tags: ["Python", "Data Science", "Achievement", "Machine Learning"],
    image: "/python-code-and-data-visualization-charts.jpg",
    isLiked: true,
    isBookmarked: false,
  },
  {
    id: "3",
    type: "discussion",
    title: "Best Practices for Responsive Web Design in 2024",
    content:
      "I've been working on improving my responsive design skills and wanted to share some techniques I've learned. Here's my approach to creating mobile-first layouts that work seamlessly across all devices. Would love to hear your thoughts and any additional tips!",
    author: {
      id: "3",
      name: "Lisa Chen",
      avatar: "/female-designer-avatar.png",
      role: "mentor",
      level: 15,
    },
    createdAt: new Date("2024-01-18T09:20:00Z"),
    updatedAt: new Date("2024-01-18T09:20:00Z"),
    likes: 156,
    comments: 32,
    shares: 15,
    tags: ["CSS", "Responsive Design", "Frontend", "Best Practices"],
    image: "/responsive-web-design-layouts-on-different-devices.jpg",
    isLiked: false,
    isBookmarked: true,
  },
  {
    id: "4",
    type: "question",
    title: "How to handle state management in large React applications?",
    content:
      "I'm working on a complex React application with multiple components that need to share state. I've been using useState and useContext, but it's getting messy. Should I switch to Redux or are there other alternatives? Looking for advice from experienced developers.",
    author: {
      id: "4",
      name: "Alex Rodriguez",
      avatar: "/generic-placeholder-graphic.png",
      role: "member",
      level: 5,
    },
    createdAt: new Date("2024-01-17T14:10:00Z"),
    updatedAt: new Date("2024-01-17T14:10:00Z"),
    likes: 67,
    comments: 23,
    shares: 5,
    tags: ["React", "State Management", "Redux", "Help"],
    isLiked: false,
    isBookmarked: false,
  },
]

export const studyGroups = [
  {
    id: "1",
    name: "JavaScript Fundamentals",
    description: "Weekly study sessions covering JavaScript basics and advanced concepts",
    members: 45,
    nextSession: new Date("2024-01-25T18:00:00Z"),
    level: "Beginner",
    tags: ["JavaScript", "Fundamentals"],
  },
  {
    id: "2",
    name: "React Developers Circle",
    description: "Share React projects, discuss best practices, and solve challenges together",
    members: 78,
    nextSession: new Date("2024-01-26T19:30:00Z"),
    level: "Intermediate",
    tags: ["React", "Frontend"],
  },
  {
    id: "3",
    name: "Data Science Study Group",
    description: "Explore data analysis, machine learning, and Python libraries",
    members: 32,
    nextSession: new Date("2024-01-27T17:00:00Z"),
    level: "Advanced",
    tags: ["Python", "Data Science", "ML"],
  },
]
