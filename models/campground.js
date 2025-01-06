const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Import the Review model
const Review = require("./review"); // Adjust the path as necessary


const ImageSchema = new Schema(
    {
    url: String,
    filename: String
    }
);

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/uploads', '/upload/w_200');
})

const opts={toJSON:{virtuals:true}};

const campgroundSchema = new Schema({
    title: String,
    images:[ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },    
    price: Number,
    description: String,
    location: String,
    author:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
},opts);


campgroundSchema.virtual('properties.popUpMarkup').get(function () {
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0,20)}...</p>`;
});

// Middleware to delete reviews when a campground is deleted
campgroundSchema.post("findOneAndDelete", async function (doc) {
    if (doc) {
        // Delete associated reviews
        await Review.deleteMany({ _id: { $in: doc.reviews } });
    }
});

module.exports = mongoose.model("Campground", campgroundSchema);