📘 API Modules Documentation
Each module in the Library Management System API performs CRUD operations related to a core entity in the system. Below is the breakdown of all modules and their available endpoints.

📚 Book Module
Handles all operations related to books.

Method	Endpoint	Description
GET	/api/books	Fetch all books
GET	/api/books/:id	Fetch a book by ID
POST	/api/books	Create a new book
PUT	/api/books/:id	Update a book by ID
DELETE	/api/books/:id	Delete a book by ID

✍️ Author Module
Manages author details.

Method	Endpoint	Description
GET	/api/author	Fetch all authors
GET	/api/author/:id	Fetch a specific author by ID
POST	/api/author	Create a new author
PUT	/api/author/:id	Update author by ID
DELETE	/api/author/:id	Delete author by ID

👤 User Module
Handles user account operations.

Method	Endpoint	Description
POST	/api/users/register	Register a new user
POST	/api/users/login	Log in a user
GET	/api/users/	Fetch all users
GET	/api/users/:id	Get user details by ID
POST	/api/users/:id/upload-profile-picture	Upload user profile picture

📦 Loan Module
Manages book borrowing and returning.

Method	Endpoint	Description
GET	/api/loans	Retrieve all loan records
POST	/api/loans	Create a new loan
GET	/api/loans/:id	Retrieve loan by user/book ID
PUT	/api/loans/:id	Mark a loan as returned

📝 Review Module
Manages book reviews.

Method	Endpoint	Description
GET	/api/books/:id/reviews	Fetch all reviews for a book
POST	/api/books/:id/reviews	Add a new review to a book
PUT	/api/books/:id/reviews/:reviewId	Edit a review
DELETE	/api/books/:id/reviews/:reviewId	Delete a review

🖼️ Multer (Book Cover Upload)
Handles file upload using Multer (book cover image).

Method	Endpoint	Description
POST	/api/book/:id/upload-cover	Upload a book cover by Book ID

ℹ️ Each endpoint includes standard response formats (200 OK, 404 Not Found, 500 SERVER ERROR, etc.). For full request/response bodies and example payloads, refer to the Postman collection (to be added)