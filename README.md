# HSN STORE replica with React(Vite) +  ExpressJS + MongoDB

## Description

This is a class project, most of what has been used in this project has followed the topics of what we have seen in class, but built on my own and adding things. I've played a little bit with the structure for react projects suggested in [Bulletproof React](https://github.com/alan2207/bulletproof-react/tree/master) and in [FSD](https://feature-sliced.design/docs/get-started/overview), while also expanding validations, adding more complexity to the database structure managing not only personal accounts registration but also businesses, and adding more services aside from mailjet, like gmail via nodemailer, etc.

I try to keep english consistent across the project but  I've kept files named in spanish because when sending stuff to my teacher I wanted it to be consistent with his project, specially in the React part. Will try to refractor in the future so it's just pure english and less chaotic.

## TODO's (mistakes/improvements)

- At first I found the idea of centralizing the form inputs into an useState a brilliant one, but I haven't found a way to modularize the components (inputs of 'Empresa' and 'Particular') without having duplicate properties in the useState object. So many duplicated lines of code...

- The second password input validates if that text matches the first password input, but all validations depend on the input having the onChange, so if the 1st password input changes and ends up matching both, the error message is still showing even if the validations are ok. I have to look up a better way to manage this.

- Next project I want to use TypeScript and  Zod + React Hook Form to manage the validations on the login/registration.

- Implement Paypal / Stripe services, I have all the notes to do implement it but for lack of time I didn't get to it

## AI use

I've used it mainly in these places:
- Bootstrap styling of scrapped components of the original site, the focus of this project wasn't replicating the styles, it was learning React + ExpressJS so Bootstrap and CSS took a backseat and I didn't do any of that.
- I knew what I wanted to do in normalizeUseStateData() in the registration component, but I didn't know **how** to do it. I explicitely asked the AI to give me hints about how to achieve that normalization so that I don't send a nested monster of an object into the backend with data I don't need, and I arrived at that strategy used.

## Technologies Used

### React (vite)

- **Routing:** `react-router-dom` for client-side routing.
- **State Management:** Zustand for  global state management.
- **Styling:** Bootstrap and Bootstrap Icons for UI components and styling, along with plain CSS.

### Node.js (expressjs)

- **Framework:** Express.js to build the REST API.
- **Database:** MongoDB with Mongoose as the Object Data Modeling (ODM) library but without creating schemas.
- **Authentication:** `jsonwebtoken` (JWT) for creating access tokens and `bcrypt` for password hashing.
- **Email:** `nodemailer` for sending emails, such as account activation links.
- **Middleware:** `cors` to handle cross-origin requests and `cookie-parser` for parsing cookies.
- **Environment Variables:** `dotenv` to manage environment variables.
