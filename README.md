🏕️ YelpCamp

YelpCamp is a full-stack web application where users can create, review, and explore campgrounds. Built as part of the Colt Steele Web Development Bootcamp, this project demonstrates authentication, CRUD operations, and RESTful APIs in action.

🚀 Features

🔐 Authentication & Authorization – Secure login and registration with Passport.js

📝 CRUD Functionality – Create, read, update, and delete campgrounds and reviews

🌍 Interactive Maps – Campgrounds displayed with geolocation (Mapbox API integration)

📸 Image Uploads – Store campground images using Cloudinary

⭐ Reviews & Ratings – Users can leave feedback and ratings for campgrounds

🎨 Responsive Design – Built with Bootstrap for mobile-friendly layouts

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript, Bootstrap, EJS

Backend: Node.js, Express.js

Database: MongoDB, Mongoose

Authentication: Passport.js, bcrypt

Other Services: Cloudinary (image storage), Mapbox (maps integration)

📦 Installation

Clone the repo:

git clone https://github.com/Rohan-08-12/YelpCamp.git
cd YelpCamp


Install dependencies:

npm install


Create a .env file with your environment variables:

DATABASE_URL=<your-mongodb-uri>
CLOUDINARY_CLOUD_NAME=<your-cloud-name>
CLOUDINARY_KEY=<your-cloud-key>
CLOUDINARY_SECRET=<your-cloud-secret>
MAPBOX_TOKEN=<your-mapbox-token>
SESSION_SECRET=<your-secret>


Run the app:

npm start


🌟 Future Improvements

Add a search and filter system for campgrounds

Enable “favorites” so users can bookmark campgrounds

Implement notifications for user activity

🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you’d like to change.
