const mongoose=require("mongoose");

const cities=require('./cities');
const {places, descriptors}=require('./seedHelpers');

const Campground=require("../models/campground");


mongoose.connect("mongodb://localhost:27017/yelp_camp");

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample=array=>array[Math.floor(Math.random()*array.length)];


const seedDB=async()=>{
    await Campground.deleteMany({});
    for(let i=0;i<450;i++){
        const random100=Math.floor(Math.random() *1000);
        const price=Math.floor(Math.random()* 20)+10;
        const camp=new Campground({
          // YOUR USER ID :
            author:'674642ab29d16759cb19cfae',
            location:`${cities[random100].city} , ${cities[random100].state}`,
            title:`${sample(descriptors)} ${sample(places)}`,
            description:'            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Itaque non voluptas qui eius exercitationem reprehenderit animi, sint commodi veniam recusandae laudantium tempore? Perferendis facilis illo accusantium voluptatem possimus unde dicta.',
            price,
            geometry: {
              type:'Point',
              coordinates: [
                cities[random100].longitude,
                cities[random100].latitude
              ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/do3zj2fls/image/upload/v1732987181/YelpCamp/kjlwh8ayxi3tfy3psq1h.jpg',
                  filename: 'YelpCamp/kjlwh8ayxi3tfy3psq1h',
                },
                {
                  url: 'https://res.cloudinary.com/do3zj2fls/image/upload/v1732987181/YelpCamp/rfwodezoxmzgfual0fhh.jpg',
                  filename: 'YelpCamp/rfwodezoxmzgfual0fhh',
                }
              ],
        })
        await camp.save();
    }
}

seedDB();