# Live Link: https://nynt-ass.vercel.app/

# Car Rental Web

Car Rental Web is a web application designed to manage car rental reservations. The application allows users to select pickup and return dates, calculate the duration of the rental, and apply discounts.

## Table of Contents

- [Live Link: https://nynt-ass.vercel.app/](#live-link-httpsnynt-assvercelapp)
- [Car Rental Web](#car-rental-web)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Features](#features)
  - [Dependencies](#dependencies)
    - [Dev Dependencies](#dev-dependencies)
  - [Scripts](#scripts)
  - [Development](#development)

## Installation

To get started with the Car Rental Web application, clone the repository and install the necessary dependencies.

```bash
git clone https://github.com/Imran-A-K/prac-assign.git
cd car-rental-web
npm install
```

## Usage

To run the application in development mode, use the following command:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:3000` to view the application.

To build the application for production, use:

```bash
npm run build
```

To start the production server, use:

```bash
npm start
```

## Features

- **Reservation Management**: Create and manage car rental reservations.
- **Date and Time Picker**: Select pickup and return dates and times using a user-friendly date picker.
- **Duration Calculation**: Automatically calculate the duration of the rental.
- **Discount Application**: Apply discounts to reservations.
- **Form Validation**: Validate form inputs using Formik and Yup.

## Dependencies

- **@radix-ui/react-checkbox**: UI component for checkboxes.
- **@radix-ui/react-label**: UI component for labels.
- **@radix-ui/react-slot**: UI component for slot elements.
- **class-variance-authority**: Utility for managing class names.
- **clsx**: Utility for constructing `className` strings conditionally.
- **date-fns**: JavaScript date utility library.
- **formik**: Form management library.
- **lucide-react**: Icon library.
- **next**: React framework for server-side rendering and static site generation.
- **react**: JavaScript library for building user interfaces.
- **react-datepicker**: Date picker component for React.
- **react-dom**: Entry point to the DOM and server renderers for React.
- **react-select**: Select component for React.
- **react-to-print**: Library to print React components.
- **sonner**: Library for notifications.
- **tailwind-merge**: Utility to merge Tailwind CSS classes.
- **tailwindcss-animate**: Tailwind CSS plugin for animations.
- **yup**: JavaScript schema builder for value parsing and validation.

### Dev Dependencies

- **autoprefixer**: PostCSS plugin to parse CSS and add vendor prefixes.
- **eslint**: Tool for identifying and fixing linting issues.
- **eslint-config-next**: ESLint configuration for Next.js projects.
- **postcss**: Tool for transforming CSS with JavaScript plugins.
- **tailwindcss**: Utility-first CSS framework.

## Scripts

- **dev**: Runs the application in development mode.
- **build**: Builds the application for production.
- **start**: Starts the production server.
- **lint**: Runs ESLint to check for linting issues.

## Development

1. Clone the repository.
2. Install dependencies using `npm install`.
3. Run the application in development mode using `npm run dev`.
4. Make your changes and test them locally.
5. Submit a pull request with a detailed description of your changes.

Feel free to reach out if you have any questions or need further assistance!
