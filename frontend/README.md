# Numerical Methods Assignment Frontend

This is a simple Angular app for demonstrating numerical methods questions and solutions, with a LeetCode-style UI.

## Features
- 7 hardcoded questions, each with a solution and endpoint
- Side-by-side question/result layout
- Modern, responsive design
- Streaming and standard API support

## Prerequisites
- Node.js **version 22** (latest recommended)
- npm (comes with Node.js)
- Angular CLI **version 20**

## Getting Started (Step-by-Step for Beginners)

### 1. Install Node.js
- Download and install Node.js v22 from the official website: https://nodejs.org/
- After installation, open a terminal and check your version:
  ```sh
  node -v
  # Should show v22.x.x
  npm -v
  ```

### 2. Install Angular CLI (version 20)
- In your terminal, run:
  ```sh
  npm install -g @angular/cli@20
  ```
- Check Angular CLI version:
  ```sh
  ng version
  # Should show Angular CLI: 20.x.x
  ```

### 3. Download the Project
- Clone or download this repository to your computer.

### 4. Open the Project Folder
- In your terminal, navigate to the project folder:
  ```sh
  cd path/to/Numerical_methods/frontend
  ```
  (Replace `path/to/Numerical_methods/frontend` with your actual folder path)

### 5. Install Project Dependencies
- Run:
  ```sh
  npm install
  ```
  This will install all required packages for the project.

### 6. Run the App
- Start the Angular development server:
  ```sh
  npm start
  ```
- Open your browser and go to [http://localhost:4200](http://localhost:4200)

## API Endpoints
- The app expects backend endpoints for each question (see `src/app/app.ts`).
- You can use mock endpoints or connect to your own backend.

## Customization
- Edit `src/app/app.ts` to change questions, solutions, or endpoints.
- Edit `src/app/app.html` and `src/app/app.css` for UI changes.

## Troubleshooting
- If you see errors, make sure your backend endpoints are running and CORS is enabled.
- For streaming endpoints, ensure your backend supports chunked responses.

## License
MIT

---

# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.2.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.
