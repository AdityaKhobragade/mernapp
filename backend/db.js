const mongoose = require( 'mongoose' );
const mongoURI = 'mongodb+srv://GoBhookad:mern1239@cluster0.la4jejc.mongodb.net/MERNGoBhookad?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect( mongoURI );
        console.log( 'Connected to MongoDB' );

        // Fetch data from 'food_items' collection
        const foodItemsCollection = mongoose.connection.db.collection( 'food_items' );
        const foodItemsData = await foodItemsCollection.find( {} ).toArray();

        // Fetch data from 'foodCategory' collection
        const foodCategoryCollection = mongoose.connection.db.collection( 'foodCategory' );
        const foodCategoryData = await foodCategoryCollection.find( {} ).toArray();

        // Assign data to global variables
        global.food_items = foodItemsData;
        global.foodCategory = foodCategoryData;

        console.log( 'Fetched data from MongoDB' );
    } catch ( error ) {
        console.error( 'Error connecting to MongoDB:', error.message );
    }
};

module.exports = mongoDB;
