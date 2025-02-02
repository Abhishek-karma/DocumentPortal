Below is the final `README.md` file for your DocPortal project:

---

# DocPortal

DocPortal is a comprehensive document management and sharing application built using Node.js, Express, and MongoDB. The platform enables secure document uploads, updates, deletions, and sharing. It also features robust user authentication (including email verification and password resets), cloud-based storage using Cloudinary, and email notifications powered by Nodemailer and Gmail.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Document Management**  
  - Upload documents (with file size limits and Cloudinary storage)  
  - Retrieve documents (all documents for a user or by document ID)  
  - Update documents (with support for file replacement or metadata updates)  
  - Delete documents (with Cloudinary file removal)

- **Document Sharing**  
  - Share documents with other users with designated permissions (view or edit)  
  - Generate shareable links with tokens and expiration  
  - Revoke shared access

- **User Authentication & Authorization**  
  - Signup with email verification (using a generated verification token)  
  - Login and logout with JWT-based session management (stored in cookies)  
  - Forgot password and reset password functionality  
  - Protected routes secured via token verification middleware

- **Email Notifications**  
  - Verification emails upon signup  
  - Welcome emails after successful email verification  
  - Password reset request emails and confirmation emails

## Technologies Used

- **Backend Framework:** Node.js, Express  
- **Database:** MongoDB, Mongoose  
- **File Storage:** Cloudinary  
- **Authentication:** JWT, bcryptjs  
- **File Uploads:** Multer (in-memory storage)  
- **Email Service:** Nodemailer (using Gmail)  
- **Utilities:** dotenv, cookie-parser, cors  
- **Development Tools:** nodemon

## File Structure

A high-level overview of the project’s file structure:

```
docportal/
├── backend/
│   ├── controllers/
│   │   ├── auth.controller.js        // Authentication endpoints: signup, login, logout, etc.
│   │   ├── document.controller.js    // Document upload, update, delete, and retrieval endpoints
│   │   ├── share.controller.js       // Document sharing and revoking endpoints
│   │   └── users.controller.js       // User-related endpoints (e.g., get all users)
│   ├── middleware/
│   │   ├── multer.js                 // Multer configuration for file uploads (memory storage with a 10MB limit)
│   │   └── verifyToken.js            // JWT token verification middleware
│   ├── mail/
│   │   ├── email.js                  // Nodemailer configuration and email sending functions
│   │   └── emailTemplates.js         // Email template generators for verification, welcome, and password reset emails
│   ├── models/
│   │   ├── document.model.js         // Mongoose schema for documents
│   │   ├── share.model.js            // Mongoose schema for document sharing
│   │   └── user.model.js             // Mongoose schema for users
│   ├── routes/
│   │   ├── auth.routes.js            // Routes for authentication (signup, login, etc.)
│   │   ├── document.routes.js        // Routes for document management
│   │   ├── share.routes.js           // Routes for sharing documents
│   │   └── users.routes.js           // Routes for user management
│   ├── utils/
│   │   ├── cloudinary.js             // Cloudinary configuration for file uploads
│   │   └── generateTokenAndSetCookie.js  // Utility to generate JWTs and set authentication cookies
│   └── server.js                     // Main server entry point
├── package.json                      // Project metadata and dependencies
└── README.md                         // This documentation file
```
## Frontend

The frontend of **DocPortal** is built using the following technologies:

- **React**: For building interactive user interfaces.
- **Tailwind CSS**: For utility-first styling.
- **Vite**: As the build tool for fast development.
- **React Router**: For handling routing and navigation.
- **Axios**: For making API requests to the backend.

### Features:
- **User Dashboard**: View and manage documents.
- **Document Upload**: Upload documents and store them securely.
- **Sharing**: Share documents with other users with configurable permissions.
- **Responsive Design**: The interface is designed to be responsive across devices.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/docportal.git
   cd docportal
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

## Environment Variables

Create a `.env` file in the root directory and add the following variables (adjust values as needed):

```env
# Server & Database
PORT=5000
MONGODB_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# JWT & Cookies
JWT_SECRET=your_jwt_secret

# Email (Gmail)
GMAIL_USER=your_gmail_address
GMAIL_PASS=your_gmail_password

# Frontend URLs (used in email links)
FRONTEND_URL=http://localhost:3000
CLIENT_URL=http://localhost:3000
```

## Usage

1. **User Registration & Verification:**  
   - Users sign up by providing their name, email, and password.  
   - A verification token is generated and emailed to the user.  
   - Upon verification, a welcome email is sent.

2. **Authentication:**  
   - Users log in with their credentials to receive a JWT stored in a cookie.  
   - Protected routes require valid tokens verified by the `verifyToken` middleware.

3. **Document Operations:**  
   - Authenticated users can upload documents (files are stored on Cloudinary).  
   - Users can retrieve all their documents or a specific document by its ID.  
   - Documents can be updated (with a new file upload or metadata changes) and deleted.

4. **Document Sharing:**  
   - Documents can be shared with other users by specifying the receiver and permissions (view/edit).  
   - Shareable links with tokens and expiration can be generated.  
   - Shared access can be revoked as needed.

5. **Password Management:**  
   - The forgot password flow sends a reset token via email.  
   - Users can reset their password using the provided token, after which a confirmation email is sent.

## API Endpoints

Below is an overview of key API endpoints:

### Authentication

- **POST** `/api/auth/signup`  
  Registers a new user and sends a verification email.

- **POST** `/api/auth/verify-email`  
  Verifies a user's email using a verification token.

- **POST** `/api/auth/login`  
  Logs in a user, generating a JWT that is stored in a cookie.

- **POST** `/api/auth/logout`  
  Logs out a user by clearing the authentication cookie.

- **POST** `/api/auth/forgot-password`  
  Initiates the password reset process by sending a reset link via email.

- **POST** `/api/auth/reset-password/:token`  
  Resets the user's password using a valid reset token.

- **GET** `/api/auth/check-auth`  
  Checks the user's authentication status (requires a valid token).

### Document Management

- **POST** `/api/documents/upload`  
  Upload a new document. (Requires authentication and file upload via Multer.)

- **GET** `/api/documents`  
  Retrieve all documents for the authenticated user.

- **GET** `/api/documents/:id`  
  Retrieve a specific document by its ID.

- **PUT** `/api/documents/:id`  
  Update document details or replace the file. (File upload is optional.)

- **DELETE** `/api/documents/:id`  
  Delete a document and remove it from Cloudinary.

### Document Sharing

- **POST** `/api/share/share-document`  
  Share a document with another user (specify sender, receiver, and permissions).

- **DELETE** `/api/share/revoke/:docId/:receiverId`  
  Revoke shared access for a document.

- **GET** `/api/share/shared-documents`  
  Retrieve documents shared with the authenticated user.

- **GET** `/api/share/view-shared-document/:receiverId`  
  View details of documents shared with a specific user.

### User Management

- **GET** `/api/users/all-users`  
  Retrieve a list of all users (useful for selecting document sharing recipients).

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [Cloudinary](https://cloudinary.com/)
- [Nodemailer](https://nodemailer.com/)
- [dotenv](https://github.com/motdotla/dotenv)
- And all other open-source projects and contributors who made this project possible.

---

This `README.md` should provide a clear overview and guide to setting up and using your DocPortal project. If you need further modifications or additional sections, feel free to ask!
