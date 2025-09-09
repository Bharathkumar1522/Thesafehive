# 🐝 The SafeHive Blog Web App

Welcome to the SafeHive Blog repository!  
This guide will walk you through setting up and running the project locally.


## 🔗 Table of Contents
- [Folder Structure](#folder-structure)
- [Guide to run this locally](#guide-to-run-this-locally)
- [Contributing / Active Issues](#contributing--active-issues)



## Folder Structure
```
project/
│
├── node_modules/
│
├── src/
│   ├── components/
│   │   ├── blog/
│   │   │   └── BlogCard.tsx
│   │   └── layout/
│   │       ├── Footer.tsx
│   │       └── Navbar.tsx
│   │
│   ├── pages/
│   │   ├── About.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Contact.tsx
│   │   ├── Home.tsx
│   │   ├── learn.tsx
│   │   └── Login.tsx
│   │
│   ├── services/
│   │   └── contentfulService.ts        ✅ API logic to fetch posts from Contentful
│   │
│   ├── types/
│   │   └── blog.ts                     ✅ Blog-related TypeScript interfaces
│   │
│   ├── utils/
│   │   ├── renderRichText.tsx         ✅ Rich text rendering for Contentful blog body
│   │   ├── ScrollToTop.tsx
│   │   └── env.ts                     ✅ Optional helper to validate env variables
│   │
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
│
├── .env                               ✅ Create this with your Contentful credentials
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

```

## 🚀 Guide to run this locally


### 1 Install Dependencies

Make sure you have **Node.js** installed. Then, install the project dependencies:

```bash
npm install
```

### 2 Setup Environment Variables

Create a `.env` file in the root of the project with the following format:

```env
VITE_SPACE_ID=your_contentful_space_id  
VITE_ACCESS_TOKEN=your_contentful_delivery_access_token  
VITE_CONTENT_TYPE=your_content_type_id
```

> 🔐 **Note:** Do not enclose the values in quotes.


### 3 Run the Development Server

```bash
npm run dev
```

Once it starts, open your browser and visit:  
**http://localhost:5173**

You should now see the blog homepage!


## 🛠️ Issues & Collaboration

We’re actively working on improving the blog features, structure, and styling.


If you're on the team:
- Check the issues assigned or available.
- Feel free to **leave comments or suggestions** on any issue.
- If you’re taking up an issue, please leave a note so we can avoid duplicate efforts.



## 🙌 Thank You
