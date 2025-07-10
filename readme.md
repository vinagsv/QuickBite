## Project: Food Delivery Web App (MERN Stack)

### Objective

Design and develop a full-stack web application enabling users to order food from local restaurants via a responsive, modern interface. The system must support restaurant browsing, cart management, order placement, secure payments, and order tracking.

### Scope

- Responsive and scalable web application using MongoDB, Express, React, and Node.js
- User account management with profile update support
- Full food ordering lifecycle: browse > select > checkout > track
- Secure payment gateway integration (Razorpay)
- Order history and real-time order status display
- Email service integration for order confirmation and updates

### Features

#### P1 – Phase 1

- User authentication (Sign up, Log in, Edit profile, Change password)
- Home page displaying searchable and filterable list of restaurants
- Restaurant-specific menu page with food images, descriptions, and pricing
- Cart functionality (add/remove items, quantity adjustments)
- Order confirmation screen (delivery address + order summary)
- Payment gateway integration (Razorpay)
- Order history with order status view
- Responsive frontend (mobile + desktop compatibility)
- Email service (e.g., NodeMailer or EmailJS) for sending confirmation and status emails
- Use DaisyUI (Tailwind CSS plugin) for consistent UI components and theme support

#### P2 – Phase 2 (Enhancements)

- Real-time order tracking via map interface
- Social login (Google, Facebook OAuth)
- Admin dashboard for restaurants to manage menu/orders
- Dynamic menu editor with full CRUD access for admin users
- Loyalty program with reward/discount system for repeat users

### User Stories / Use Cases

- **User Story 1**: "I want to be able to quickly order food from my favorite restaurant."
- **User Story 2**: "I want to see my previous orders so that I can reorder the same dish."

### Technical Requirements

- **Frontend**: ReactJS with TailwindCSS + DaisyUI
- **Backend**: Node.js with Express framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based session management
- **Payments**: Razorpay API integration
- **Email Service**: NodeMailer or EmailJS integration
- **RESTful APIs** for frontend-backend communication

### Design Requirements

- Functional, clean UI with minimal navigation layers
- Card/grid-based layouts for restaurants and menu items
- Fully responsive layout (mobile-first approach)
- DaisyUI themes for styling and UX consistency
- Branding to emphasize food ordering, speed, and user experience

### Success Metrics

- Working order flow end-to-end (login > order > payment > confirmation email)
- Average page load time: <3 seconds
- high accuracy in order history and status updates

User authentication (Sign up, Log in, Edit profile, Change password)

- Home page displaying searchable and filterable list of restaurants
- Restaurant-specific menu page with food images, descriptions, and pricing
- Cart functionality (add/remove items, quantity adjustments)
- Order confirmation screen (delivery address + order summary)
- Payment gateway integration (Razorpay)
- Order history with order status view
- Email service (e.g., NodeMailer ) for sending confirmation and status emails
- Use DaisyUI (Tailwind CSS plugin) for consistent UI components and theme support

/controllers
authController.js
orderController.js
restaurantController.js

/models
ordersModel.js
restaurantModel.js
userModel.js

/routes
orderRoutes.js
restaurantRoutes.js
userRoutes.js

/utils
APIFeatures.js
connectDB.js
imagekitIO.js
mail.js

index.js
