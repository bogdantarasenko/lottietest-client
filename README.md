# Lottie Files Management Application Client

A client application for managing Lottie animation files, built with Next.js, NextAuth, Chakra UI, Apollo GraphQL, React Hook Form, and localForage.

## Table of Contents

- [Project Overview](#project-overview)
- [Design Decisions](#design-decisions)
  - [Frontend Framework: Next.js](#frontend-framework-nextjs)
  - [Authentication: NextAuth](#authentication-nextauth)
  - [UI Component Library: Chakra UI](#ui-component-library-chakra-ui)
  - [Form Handling: React Hook Form](#form-handling-react-hook-form)
  - [Client-Side Storage: localForage](#client-side-storage-localforage)
- [Features and Functionalities](#features-and-functionalities)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)

## Project Overview

This application is designed for the seamless management of Lottie animation files. By harnessing the power of Next.js, NextAuth, Chakra UI, Apollo GraphQL, React Hook Form, and localForage, it delivers a high-performance, scalable, and accessible platform.

## Design Decisions

### Frontend Framework: Next.js

Next.js offers a comprehensive solution for React-based applications, supporting server-side rendering and static site generation, which enhances SEO and improves load times.

### Authentication: NextAuth

For secure authentication, NextAuth provides a straightforward and flexible solution, integrating easily with Next.js for social login, email, and more.

### UI Component Library: Chakra UI

Chakra UI is chosen for its simple, modular, and accessible component library, which accelerates the development process and ensures a responsive and attractive design.

### Form Handling: React Hook Form

React Hook Form is utilized for efficient, flexible form management, offering easy integration with Chakra UI components while improving performance and user experience.

### Client-Side Storage: localForage

To enhance offline capabilities and store data efficiently on the client side, localForage is used for its asynchronous storage API, which is more powerful and flexible than localStorage.

## Features and Functionalities

- **Search/Browse Files**: Users can easily search for and browse Lottie animations, leveraging advanced filtering and sorting capabilities.
- **File Upload**: Secure and simple file upload functionality, with drag-and-drop support.
- **File Management**: Users can download, delete, and manage their animations with intuitive interfaces.
- **Responsive Design**: Fully responsive design ensures a seamless experience across all devices.

## Getting Started

### Prerequisites

- Node.js (LTS version)
- A modern browser

### Installation

To set up the project locally, follow these steps:

```bash
git clone https://github.com/bogdantarasenko/lottietest-client
cd lottietest-client
npm install
npm run dev
