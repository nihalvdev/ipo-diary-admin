# IPO Diary Admin Dashboard

IPO Diary Admin is a web-based administration dashboard for managing IPO information and monitoring users and feedback for the IPO Diary application.

## Features

- Admin login and protected dashboard routes
- View IPO records with pagination and issue-type filtering
- Add new IPO details
- Update existing IPO details
- Delete IPO records
- View users and application/device statistics
- View and search user feedback

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Material UI
- Tailwind CSS
- NextAuth.js
- Axios
- React Hot Toast

## Requirements

- Node.js
- npm
- Access to the IPO Diary backend API
- Admin login credentials

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/nihalvdev/ipo-diary-admin.git
   cd ipo-diary-admin
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file in the project root:

   ```env
   NEXT_PUBLIC_API_URL=your_backend_api_url
   ```

   Replace the value with the base URL of the IPO Diary backend API.

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Backend

The dashboard uses the IPO Diary backend API for authentication and data operations, including IPO management, user statistics, user listings, and feedback. The backend is maintained separately from this repository.

## Notes

You must have a valid admin account and a running backend API to use the dashboard features.
