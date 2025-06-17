   ---Task 1
   use plpBookstore

    db.createCollection("books")

    ---Task 2 CRUD  operations
    // ---inserting books documents into the `books` collection
     db.books.insertMany([]);

     // ----Finding  all books in a specific genre

     db.books.find({ genre: "Fiction" });

     //---Finding books published after a certain year

     db.books.find({ published_year: { $gt: 1900 } });

     // ---Finding  books by a specific author

     db.books.find({ author: "George Orwell" });

     // --- Updating  the price of a specific book

     db.books.updateOne(
  { title: "Animal Farm" },        
  { $set: { price: 10.99 } }           
);

// ---Deleting a book by its title

db.books.deleteOne({ title: " Moby Dick" });

---Task  3 Advanced Queries

    //---books that are both in stock and published after 2010

  db.books.find({
  published_year: { $gt: 2010 },
  in_stock: true
});

   //---return only the title, author, and price fields in your queries
   db.books.find({}, { title: 1, author: 1, price: 1 });

   //---sorting to display books by price (both ascending and descending)
       // ---ascending
   db.books.find().sort({ price: 1 });

         // ---descending
   db.books.find().sort({ price: -1 });

 //---Using  the `limit` and `skip` methods to implement pagination (5 books per page)
   db.books.find()
  .sort({ price: 1 })     
  .skip((1 - 1) * 5)
  .limit(5);

   Task 4  Aggregation
   // ---calculating the average price of books by genre
   db.books.aggregate([
    {
        $group: {
            _id: "$genre",                     
            averagePrice: { $avg: "$price" }
        }
    }
]);
 // ---  finding  the author with the most books in the collection
db.books.aggregate([
    {
        $group: {
            _id: "$author",              
            bookCount: { $sum: 1 }      
        }
    },
    {
        $sort: {
            bookCount: -1                
        }
    },
    {
        $limit: 1                       
    },
    {
        $project: {
            _id: 0,                     
            author: "$_id",             
            bookCount: 1               
        }
    }
]);
//--- pipeline that groups books by publication decade and counts them
db.books.aggregate([
    {
        $group: {
            _id: { 
                $subtract: [
                    { $divide: ["$publicationYear", 10] }, 
                    1                                  
                ]
            },
            bookCount: { $sum: 1 }
        }
    },
    {
        $project: {
            decade: { $multiply: ["$_id", 10] }, 
            bookCount: 1                         
        }
    },
    {
        $sort: {
            decade: 1 
        }
    }
]);
 Task 5 Indexing
 //--- Creating an index on the `title` field for faster searches
db.books.createIndex({ title: 1 });

//--- Creating a compound index on `author` and `published_year`
db.books.createIndex({ author: 1, published_year: -1 });

// ---Using  the `explain()` method to demonstrate the performance improvement with your indexes
db.books.find({ title: "1984" }).explain("executionStats");




