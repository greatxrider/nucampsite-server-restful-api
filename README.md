# NuCampSite Server

## Overview
NuCampSite Server is a RESTful API built using Node.js, Express, and MongoDB with the Mongoose ODM library. The project demonstrates fundamental backend development skills, including setting up an Express server, defining Mongoose Schemas and Models, implementing secure user authentication, and creating CRUD endpoints for managing campsite and user data.

This server application allows users to interact with a list of campsites, manage their favorite campsites, and perform operations like adding, removing, and listing their favorites.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Additional Notes](#additional-notes)
- [License](#license)
- [Contact](#contact)

## Features
- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Campsite Management**: CRUD operations for managing a list of campsites.
- **Favorites Management**: Users can add, remove, and list their favorite campsites.
- **Mongoose Population**: Uses Mongoose's `populate()` method to handle references between user and campsite data.
- **CORS Support**: Cross-Origin Resource Sharing is implemented for secure cross-domain communication.

## Installation

1. **Clone the Repository:**
   ```bash
    git clone https://github.com/greatxrider/nucampsiteServer.git
    cd nucampsiteServer
    ```
2. **Install Dependencies:**
   ```bash
    npm install
    ```
3. **Set Up Environment Variables:** Create a .env file in the project root with the following environment variables:
   ```env
    PORT=3443
    MONGO_URI=mongodb://localhost:27017/nucampsite
    JWT_SECRET=your_jwt_secret_key
    ```
4. **Run MongoDB:** Ensure you have MongoDB installed and running locally. You can start it with:
   ```bash
    mongod
    ```
5. **Start the Server:**
   ```bash
    npm start
    ```

## Usage

To interact with the API, you can use tools like [Postman](https://www.postman.com/) or [cURL](https://curl.se/). Follow these steps:

1. **Obtain JWT Token:**
   - Log in using the appropriate endpoint to obtain a JSON Web Token (JWT). This token is required for accessing authenticated routes.

2. **Test Endpoints:**
   - Use Postman or cURL to make HTTP requests to the endpoints. 
   - For authenticated routes, include the JWT token in the Authorization header of your requests. The header format should be:
     ```
     Authorization: Bearer YOUR_JWT_TOKEN
     ```

## Technologies Used

- **Node.js**: A JavaScript runtime environment used to build the server.
- **Express**: A web framework for creating the REST API, handling routing, and middleware.
- **MongoDB**: A NoSQL database used for storing campsite and user data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB, used to define Schemas and Models.
- **JSON Web Tokens (JWT)**: Used for secure user authentication, allowing for the implementation of login and protected routes.
- **CORS**: Cross-Origin Resource Sharing for enabling secure cross-domain communication between the client and server.

## Project Structure

nucampsiteServer/
│
├── models/
│   ├── campsite.js           # Mongoose Schema and Model for campsites
│   ├── partner.js            # Mongoose Schema and Model for partners
│   ├── promotion.js          # Mongoose Schema and Model for promotions
│   └── favorite.js           # Mongoose Schema and Model for user favorites
│
├── routes/
│   ├── campsiteRouter.js     # Router for campsite endpoints
│   ├── partnerRouter.js      # Router for partner endpoints
│   ├── promotionRouter.js    # Router for promotion endpoints
│   └── favoriteRouter.js     # Router for favorite endpoints
│
├── app.js                    # Main application file
├── server.js                 # Server entry point
├── package.json              # Project metadata and dependencies
└── .env                      # Environment variables (not included in the repository)

## API Endpoints

### Campsite Endpoints

- **GET /campsites**: Retrieve all campsites.
- **POST /campsites**: Add a new campsite (Admin only).
- **GET /campsites/:campsiteId**: Retrieve a specific campsite.
- **PUT /campsites/:campsiteId**: Update a campsite (Admin only).
- **DELETE /campsites/:campsiteId**: Delete a campsite (Admin only).

### Favorite Endpoints

- **GET /favorites**: Retrieve the user's list of favorite campsites.
- **POST /favorites**: Add a list of campsites to the user's favorites.
- **DELETE /favorites**: Remove all favorite campsites for the user.
- **POST /favorites/:campsiteId**: Add a specific campsite to the user's favorites.
- **DELETE /favorites/:campsiteId**: Remove a specific campsite from the user's favorites.

### Partner and Promotion Endpoints

- Similar CRUD operations for partners and promotions as done for campsites.

## Testing

### Add Campsites

Use the Mongo shell to add campsites for testing:

```bash
    mongosh
    use nucampsite
    db.campsites.insertMany([
        {
            "name": "React Lake Campground",
            "image": "images/react-lake.jpg",
            "elevation": 1233,
            "featured": false,
            "cost": 65,
            "description": "Nestled in the foothills of the Chrome Mountains, this campground on the shores of the pristine React Lake is a favorite for fly fishers."
        },
        {
            "name": "Chrome River Campground",
            "image": "images/chrome-river.jpg",
            "elevation": 877,
            "featured": false,
            "cost": 77,
            "description": "Spend a few sunny days and starry nights beneath a canopy of old-growth firs at this enchanting spot by the Chrome River."
        },
        {
            "name": "Breadcrumb Trail Campground",
            "image": "images/breadcrumb-trail.jpg",
            "elevation": 2901,
            "featured": false,
            "cost": 24,
            "description": "Let NuCamp be your guide to this off-the-beaten-path, hike-in-only campground."
        }
    ])
```

Verify the added campsites using:

```bash
    db.campsites.find().pretty()
```

## Testing Endpoints with Postman

1. Obtain a JWT by logging in and copying the token.
2. Test all the CRUD operations for campsites, favorites, partners, and promotions.
3. Ensure to test both valid and invalid requests to cover all edge cases.

## Additional Notes

- **Error Handling**: Proper error handling is implemented to ensure robust API functionality.
- **Environment Configuration**: Sensitive information is stored in environment variables.
- **Data Population**: Mongoose's `populate()` method is used to handle references between different data models.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For further information or inquiries, please contact:

**Jeph Mari Daligdig**  
Email: daligdig.jephmari@gmail.com
[GitHub](https://github.com/greatxrider)
