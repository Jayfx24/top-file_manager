# File Uploader

A file storage application built with **Express, Prisma, Passport.js, and cloud storage**.

## Features

* Session-based authentication with Passport.js
* Persistent sessions using Prisma Session Store
* Create, update, and delete folders and files
* Upload files into folders
* File validation (type and size)
* View file details and download files
* Cloud storage with Cloudinary 
* Store uploaded file URLs in the database
* Optional expiring folder share links

## Tech Stack

* Express.js
* TypeScript
* Prisma + PostgreSQL
* Passport.js
* Multer
* Cloudinary 

## Setup

```bash
npm install
npx prisma migrate dev
npm run dev
```

Create a `.env` file with your database, session, and cloud storage credentials.
DATABASE_URL= "
CLOUDINARY_URL= ""
SECRET = ""

## Goal

Build a secure personal file manager where authenticated users can organize files into folders, upload them to cloud storage, and optionally share folders through expiring public links.
