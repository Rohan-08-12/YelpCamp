const Campground=require("../models/campground");
const Review=require("../models/review");

module.exports.createReview=async(req,res)=>{
    const campground=await Campground.findById(req.params.id);
    const review=new Review(req.body.review);
    review.author=req.user._id;
    campground.reviews.push(review);
    await review.save();
    await campground.save();
    req.flash('success','Created a new review');
    res.redirect(`/campgrounds/${campground._id}`);
};


module.exports.deleteReview=async(req,res)=>{
    // Method 1
    // const campground=await Campground.findById(req.params.id);
    // await Review.findByIdAndDelete(req.params.reviewId);
    // campground.reviews.remove(req.params.reviewId);
    // await campground.save();
    // res.redirect(`/campgrounds/${campground._id}`);

    // Method 2
    const {id,reviewId}=req.params;
    await Campground.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Successfully deleted the review');
    res.redirect(`/campgrounds/${id}`);
};