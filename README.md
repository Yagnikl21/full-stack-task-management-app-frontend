# Frontend Setup

This guide explains how to set up, configure, and run the frontend of the application.

## Prerequisites
- Node.js (v14 or higher)
- A terminal/command-line interface

---

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-frontend-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
---

## Running the Frontend

1. Start the development server:
   ```bash
   npm run dev
   ```

   This will start the development server and open the application in your default browser.

2. Or build for production:
   ```bash
   npm run build
   ```
   The production build will be available in the `dist` folder.

---

## User Credentials (Sample Data for Login)
Use the following sample credentials to test the application:

- **Regular User 1:**
  - UserName: `user`
  - Password: `password123`

- **Regular User 2:**
  - UserName: `testuser`
  - Password: `password123`

- **Regular User 3:**
  - UserName: `yagnik`
  - Password: `password123`

---

## Troubleshooting
- **Environment Variable Issues**:
  - Verify the `.env` file is set up correctly.
- **Dependency Errors**:
  - Delete the `node_modules` folder and run `npm install` again.

If further issues arise, check the console logs or open an issue in the repository.

