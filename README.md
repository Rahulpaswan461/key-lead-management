# Key Account Manager (KAM) Lead Management System

## Overview

The Key Account Manager (KAM) Lead Management System is designed for **Udaan**, a B2B e-commerce platform. This system helps Key Account Managers (KAMs) track 
and manage their interactions, leads, contacts, and account performance with large restaurant accounts. It includes functionalities for tracking leads, storing contact details, managing interactions, planning calls, 
and monitoring account performance.

## Features

### Lead Management
- **Add new restaurant leads**: Add details of new restaurant leads, including basic information like name, address, and assigned KAM.
- **Track lead status**: Keep track of the current status of each lead (New, In Progress, Closed).

### Contact Management
- **Multiple Points of Contact (POCs)**: Store multiple contacts for each restaurant, supporting various roles like Owner, Manager, etc.
- **Store contact details**: Save contact information including name, role, and phone number.

### Interaction Tracking
- **Track interactions**: Log details of interactions such as calls, orders, and meetings, with notes on the type and date of interaction.
- **Set call frequency**: Set the frequency of calls for each lead (e.g., daily, weekly).
- **Track order patterns**: Monitor ordering patterns to assess the performance of each account.

### Performance Tracking
- **Well-performing accounts**: Identify and track well-performing accounts.
- **Underperforming accounts**: Flag underperforming accounts based on criteria such as order frequency and interaction tracking.

## Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB (with Mongoose)
- **Authentication:** JWT-based authentication
- **API Design:** RESTful APIs
- **Environment Management:** dotenv
- **Data Validation:** Joi
- **Authentication Middleware:** JWT-based user validation


## Installation

### Prerequisites

- **Node.js** and **npm** must be installed on your system.
- **MongoDB** instance running (either locally or in the cloud).

### Steps

1. **Clone the repository:**

   git clone https://github.com/Rahulpaswan461/key-lead-management
   cd key-lead-manage

2. Install dependencies:
   - npm install

3. Set up environment variables: Create a .env file in the root directory of the project and add your environment variables:
- MONGO_URL=mongodb://localhost:27017/kam-leads
- JWT_SECRET=your_jwt_secret
- PORT=8000

4. Start the application:
   - npm start
   - The application will run on http://localhost:8000 by default.

## API Documentation
 ### User Authentication
 - POST /api/kam/signup: Signup for a new user.
 - POST /api/kam/login: Login with an existing user.
   
## Restaurant Management
 - POST /api/restaurants/create-restaurant: Add a new restaurant lead.
 - PATCH /api/restaurants/update-restaurants: Update an existing restaurant's details.
 - DELETE /api/restaurants/delete-restaurant: Delete a restaurant from the system.
 - POST /api/restaurants/add-contact-to-restaurant: Add a contact (POC) to a restaurant.
## Contact Management
 - POST /api/contacts/create-contact: Add a new contact for a restaurant.

## Interaction Tracking
 - POST /api/interactions/interaction-tracking: Record a new interaction (e.g., call, order).
 - GET /api/interactions/get-restaurant-interactions/:restaurantId: Get interactions for a specific restaurant.
 - PATCH /api/interactions/set-call-frequency: Set the call frequency for a restaurant.
 - GET /api/interactions/calls-due-today: Get the restaurants that need a call today.
 - PATCH /api/interactions/update-last-call/:restaurantId: Update the last call made for a restaurant.

## Performance Tracking 
- GET /api/interactions/well-performing-accounts: List well-performing accounts.
- GET /api/interactions/under-performing-accounts: List under-performing accounts.
- GET /api/interactions/order-pattern: Retrieve order patterns for all restaurants.
   
