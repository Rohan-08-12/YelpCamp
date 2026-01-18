🏕️ YelpCamp

YelpCamp is a full-stack web application that allows users to discover, create, review, and manage campgrounds. The project demonstrates real-world web development concepts including authentication, authorization, CRUD operations, RESTful APIs, and cloud deployment.

Originally built as part of Colt Steele’s Web Development Bootcamp, this version has been extended, configured, and deployed to production, showcasing end-to-end application ownership.

🌐 Live Demo:
👉 https://yelpcamp-3-5b0e.onrender.com/

🚀 Features

🔐 Authentication & Authorization
Secure user registration and login using Passport.js with protected routes.

📝 CRUD Functionality
Create, read, update, and delete campgrounds and reviews.

⭐ Reviews & Ratings
Authenticated users can leave ratings and feedback on campgrounds.

🌍 Interactive Maps
Campgrounds are displayed using geolocation powered by the Mapbox API.

📸 Image Uploads
Campground images are uploaded and stored securely using Cloudinary.

🎨 Responsive Design
Mobile-friendly UI built with Bootstrap.

🛠️ Tech Stack
Frontend

HTML

CSS

JavaScript

Bootstrap

EJS (Server-side templating)

Backend

Node.js

Express.js

Database

MongoDB

Mongoose

Authentication & Security

Passport.js

express-session

bcrypt

Helmet

MongoDB-backed session store

Cloud & APIs

MongoDB Atlas

Cloudinary (image storage)

Mapbox (maps & geolocation)

Render (deployment)

📦 Local Setup
1️⃣ Clone the repository
git clone https://github.com/Rohan-08-12/YelpCamp.git
cd YelpCamp

2️⃣ Install dependencies
npm install

3️⃣ Environment variables

Create a .env file in the project root:

DATABASE_URL=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_key
CLOUDINARY_SECRET=your_cloudinary_secret
MAPBOX_TOKEN=your_mapbox_token


⚠️ Important: Never commit .env files to GitHub.

4️⃣ Run the application
npm start


Then open:

http://localhost:3000

🌟 Future Enhancements

Search and filtering for campgrounds

Favorites / bookmarking feature

User activity notifications

Pagination and advanced sorting

Performance and accessibility improvements

🤝 Contributing

Contributions are welcome!

Fork the repository

Create a feature branch

Submit a pull request with a clear description

For major changes, please open an issue first to discuss your proposal.

📄 Acknowledgements

Colt Steele – Original project concept from The Web Developer Bootcamp

MongoDB, Cloudinary, Mapbox, and Render for their developer-friendly platforms
