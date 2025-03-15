# Ureeka Refreshment - School Meal Program Management System

## Overview
Ureeka Refreshment is a comprehensive web application designed to manage Indonesia's school meal program. The platform connects food providers with the national school meal program, allowing them to manage menu offerings for different regions, while also providing transparency to the public about upcoming meal plans.

## Features

### Public Features
- **Meal Viewing**: Users can view the next day's menu for any region
- **Regional Selection**: Interactive interface for selecting different regions to view their specific menus
- **Nutritional Information**: Detailed nutritional information for each meal

### Authentication
- **Secure Login**: Provider authentication system with email and password
- **Registration**: New provider registration with regional assignment
- **Session Management**: Remember-me functionality for persistent login

### Provider Dashboard
- **Profile Management**: Providers can update their personal and business information
- **Menu Creation**: Ability to create new meal plans with main dish, snack, and nutritional details
- **Menu Assignment**: Assign existing menus to regions
- **Account Management**: Providers can manage their accounts, including deactivation

## Tech Stack

### Frontend
- **Framework**: React 19 with TypeScript
- **Routing**: React Router DOM v7
- **UI Components**: 
  - Custom components using Radix UI primitives
  - Material UI components
  - Custom styling with TailwindCSS

### Backend
- **Authentication & Database**: Firebase
  - Firebase Authentication for user management
  - Firestore for database services
  - Firebase Storage for asset management

### Development Tools
- **Build Tool**: Vite 6
- **Code Quality**: ESLint with TypeScript support
- **Package Management**: npm

## Implementation Details

### Directory Structure
```
/src
  /components        # Reusable UI components
    /ui              # Core UI components
  /context           # React context providers
  /lib               # Utility functions and Firebase setup
    /firebase        # Firebase initialization
  /pages             # Page components organized by route
    /auth            # Authentication pages (login, register)
    /main            # Home page
    /menu            # Public menu viewing
    /provider        # Provider dashboard
    /unauthorized    # Access denied page
```

### Authentication Flow
The application implements a complete authentication flow with Firebase:
- User registration with email validation
- Secure login with session persistence
- Role-based authorization (admin vs regular provider)
- Protected routes using custom `ProtectRoute` component

### Data Model
- **Users**: Provider information including name, contact details, and region
- **Regions**: Geographical areas with assigned menus
- **Menus**: Food offerings with nutritional information

### State Management
- Context API for authentication state and user information
- Local component state for UI interactions
- Firestore real-time updates for data synchronization

## Getting Started

### Installation
1. Clone the repository
2. Install dependencies: `npm install`
3. Create a Firebase project and configure environment variables in `.env` file
4. Start development server: `npm run dev`

### Environment Variables
Create a `.env` file with the following Firebase configuration:
```
VITE_APIKEY=your-api-key
VITE_AUTHDOMAIN=your-auth-domain
VITE_DATABASEURL=your-database-url
VITE_PROJECTID=your-project-id
VITE_STORAGEBUCKET=your-storage-bucket
VITE_MESSAGINGSENDERID=your-messaging-sender-id
VITE_APPID=your-app-id
VITE_MEASUREMENTID=your-measurement-id
```

## Deployment
The application can be built for production using:
```
npm run build
```

This creates optimized production files in the `dist` directory ready for deployment to any static hosting service.