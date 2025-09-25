🗄️ Project Structure

Most of the code lives in the src folder and looks something like this:

src
|
+-- app               # application layer containing:
|   |                 # this folder might differ based on the meta framework used
|   +-- routes        # application routes / can also be pages
|   +-- app.tsx       # main application component
|   +-- provider.tsx  # application provider that wraps the entire application with different global providers - this might also differ based on meta framework used
|   +-- router.tsx    # application router configuration
+-- assets            # assets folder can contain all the static files such as images, fonts, etc.
|
+-- components        # shared components used across the entire application
|
+-- config            # global configurations, exported env variables etc.
|
+-- features          # feature based modules
|
+-- hooks             # shared hooks used across the entire application
|
+-- lib               # reusable libraries preconfigured for the application
|
+-- stores            # global state stores
|
+-- testing           # test utilities and mocks
|
+-- types             # shared types used across the application
|
+-- utils             # shared utility functions

For easy scalability and maintenance, organize most of the code within the features folder. Each feature folder should contain code specific to that feature, keeping things neatly separated. This approach helps prevent mixing feature-related code with shared components, making it simpler to manage and maintain the codebase compared to having many files in a flat folder structure. By adopting this method, you can enhance collaboration, readability, and scalability in the application's architecture.

A feature could have the following structure:

src/features/awesome-feature
|
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types used within the feature
|
+-- utils       # utility functions for a specific feature

NOTE: You don't need all of these folders for every feature. Only include the ones that are necessary for the feature.

In some cases it might be more practical to keep all API calls outside of the features folders in a dedicated api folder where all API calls are defined. This can be useful if you have a lot of shared API calls between features.

In the past, it was recommended to use barrel files to export all the files from a feature. However, it can cause issues for Vite to do tree shaking and can lead to performance issues. Therefore, it is recommended to import the files directly.

It might not be a good idea to import across the features. Instead, compose different features at the application level. This way, you can ensure that each feature is independent which makes the codebase less convoluted.

To forbid cross-feature imports, you can use ESLint:

'import/no-restricted-paths': [
    'error',
    {
        zones: [
            // disables cross-feature imports:
            // eg. src/features/discussions should not import from src/features/comments, etc.
            {
                target: './src/features/auth',
                from: './src/features',
                except: ['./auth'],
            },
            {
                target: './src/features/comments',
                from: './src/features',
                except: ['./comments'],
            },
            {
                target: './src/features/discussions',
                from: './src/features',
                except: ['./discussions'],
            },
            {
                target: './src/features/teams',
                from: './src/features',
                except: ['./teams'],
            },
            {
                target: './src/features/users',
                from: './src/features',
                except: ['./users'],
            },

            // More restrictions...
        ],
    },
],

You might also want to enforce unidirectional codebase architecture. This means that the code should flow in one direction, from shared parts of the code to the application (shared -> features -> app). This is a good practice to follow as it makes the codebase more predictable and easier to understand.

Unidirectional Codebase

As you can see, the shared parts can be used by any part of the codebase, but the features can only import from shared parts and the app can import from features and shared parts.

To enforce this, you can use ESLint:

'import/no-restricted-paths': [
    'error',
    {
    zones: [
        // Previous restrictions...

        // enforce unidirectional codebase:
        // e.g. src/app can import from src/features but not the other way around
        {
            target: './src/features',
            from: './src/app',
        },

        // e.g src/features and src/app can import from these shared modules but not the other way around
        {
            target: [
                './src/components',
                './src/hooks',
                './src/lib',
                './src/types',
                './src/utils',
            ],
            from: ['./src/features', './src/app'],
        },
    ],
    },
],

By following these practices, you can ensure that your codebase is well-organized, scalable, and maintainable. This will help you and your team to work more efficiently and effectively on the project. This approach can also make it easier to apply similar architecture to apps built with Next.js, Remix or React Native.

🗃️ State Management

Managing state effectively is crucial for optimizing your application's performance. Instead of storing all state information in a single centralized repository, consider dividing it into various categories based on their usage. By categorizing your state, you can streamline your state management process and enhance your application's overall efficiency.
Component State

Component state is specific to individual components and should not be shared globally. It can be passed down to child components as props when necessary. Typically, you should begin by defining state within the component itself and consider elevating it to a higher level if it's required elsewhere in the application. When managing component state, you can use the following React hooks:

    useState - for simpler states that are independent
    useReducer - for more complex states where on a single action you want to update several pieces of state

Component State Example Code
Application State

Application state manages global parts of an application, such as controlling global modals, notifications, and toggling color modes. To ensure optimal performance and ease of maintenance, it is advisable to localize the state as closely as possible to the components that require it. Avoid unnecessarily globalizing all state variables from the outset to maintain a structured and efficient state management architecture.

Good Application State Solutions:

    context + hooks
    redux + redux toolkit
    mobx
    zustand
    jotai
    xstate

Global State Example Code
Server Cache State

The Server Cache State refers to the data retrieved from the server that is stored locally on the client-side for future use. While it is feasible to cache remote data within a state management store like Redux, there exist more optimal solutions to this practice. It is essential to consider more efficient caching mechanisms to enhance performance and optimize data retrieval processes.

Good Server Cache Libraries:

    react-query - REST + GraphQL
    swr - REST + GraphQL
    apollo client - GraphQL
    urql - GraphQl
    RTK

Server Cache State Example Code
Form State

Forms are a crucial part of any application, and managing form state effectively is essential for a seamless user experience. When handling form state, consider using libraries like Formik, React Hook Form, or Final Form to streamline the process. These libraries provide built-in validation, error handling, and form submission functionalities, making it easier to manage form state within your application.

Forms in React can be controlled and uncontrolled.

Depending on the application needs, they might be pretty complex with many different fields that require validation.

Although it is possible to build any form using only React primitives, there are some good solutions out there that help with handling forms such as:

    React Hook Form
    React Final Form

Create abstracted Form component and all the input field components that wrap the library functionality and are adapted to the application needs.

Form Example Code

Input Field Example Code

You can also integrate validation libraries with the mentioned solutions to validate inputs on the client. Some good options are:

    zod
    yup

Validation Example Code
URL State

URL state refers to the data stored and manipulated within the address bar of the browser. This state is commonly managed through URL parameters (e.g., /app/${dynamicParam}) or query parameters (e.g., /app?dynamicParam=1). By incorporating routing solutions like react-router-dom, you can effectively access and control the URL state, enabling dynamic manipulation of application parameters directly from the browser's address bar.

URL State Example Code
