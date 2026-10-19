# ITELECT4 Backend

## GitHub repository
- Backend repo: https://github.com/ijlumbera088-cloud/itelect4-backend.git

## Live deployment
- Live backend: https://itelect4-backend.vercel.app
- Live frontend: https://itelect4-project.vercel.app

## Project overview
This backend provides authentication, user management, and submission APIs for the ITELECT4 full-stack project.

## Local setup
1. Copy `.env.example` to `.env`
2. Fill in your MongoDB URI and JWT secret
3. Run the app:

```bash
npm install
npm run dev
```

## Required environment variables
```env
PORT=4000
MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/itelect4
JWT_SECRET=replace-with-a-strong-secret
FRONTEND_URL=https://your-live-frontend-url.vercel.app
ALLOWED_ORIGINS=http://localhost:5173,https://your-live-frontend-url.vercel.app
```

## Notes
- The backend accepts requests from the local frontend on port 5173 and the deployed frontend URL.
- If using Vercel, set the same variables in the project environment settings.
