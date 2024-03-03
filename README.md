# Supabase Learning Project

Welcome to the Supabase Learning project! This project is designed to help you learn and understand various aspects of building web applications using Supabase, a powerful open-source Firebase alternative.

## Project Structure

```
supabase-learning/
│
├── src/
│   ├── components/
│   │   ├── AuthGuard.tsx
│   │   └── Header.tsx
│   │
│   ├── pages/
│   │   ├── Authentication.tsx
│   │   └── Todo.tsx
│   │
│   ├── store/
│   │   ├── auth-store.ts
│   │   └── todo-store.ts
│   │
│   ├── supabase-config.ts
│   └── App.tsx
│
├── public/
├── README.md
└── package.json
```

## How to Run

1. Clone the repository:

    ```bash
    git clone https://github.com/kgmanojranga/supabase-todo-app
    ```

2. Navigate to the project directory:

    ```bash
    cd supabase-todo-app
    ```

3. Install dependencies:

    ```bash
    yarn install
    ```

4. Start the development server:

    ```bash
    yarn dev
    ```

## Available Scripts

In the project directory, you can run:

- `yarn dev`: Starts the development server.
- `yarn build`: Builds the app for production.
- `yarn lint`: Runs linting checks.
- `yarn preview`: Previews the production build.

## Project Description

This project includes:

- Authentication feature: Allows users to sign up and log in using Supabase authentication.
- Todo management feature: Users can add, edit, delete, and view their todos. Todos are stored in a Supabase database.
- Protected routes: Utilizes an AuthGuard component to protect routes that require authentication.

## Technologies Used

- React.js
- Supabase
- React Router
- TypeScript
- Tailwind CSS

## License

This project is licensed under the [MIT License](LICENSE).