# Expense Tracker Backend

## Overview
This backend serves the Expense Tracker mobile application and admin dashboard. It provides APIs for user authentication, expense management, and admin controls.

## Features
1. User authentication (JWT-based).
2. Expense management.
3. Admin user approvals.

## Deployment
The backend is deployed on Heroku.

## Environment Variables
- `MONGO_URI`: MongoDB connection string.
- `JWT_SECRET`: Secret key for JWT.

## API Endpoints
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login as a user.
- `POST /api/expenses`: Add a new expense.
- `GET /api/expenses`: Fetch all expenses for a user.
- `GET /api/admin/pending-users`: Fetch pending user accounts (admin only).
- `PUT /api/admin/approve/:id`: Approve a user account (admin only).
- `PUT /api/admin/reject/:id`: Reject a user account (admin only).

## How to Run Locally
1. Clone the repo.
2. Install dependencies:
   ```
   npm install
   ```
3. Start the server:
   ```
   npm start
   ```