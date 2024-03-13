# Frappe Library
This web application is designed to streamline the management processes of a local library. Librarians can efficiently track books and their quantities, manage members, handle transactions, and enforce book fees. This README provides an overview of the functionalities and endpoints available in this application.

## Functionalities
1. Base Library System
Librarians can perform the following operations:

2. Books Management: CRUD operations on books, including adding, updating, and deleting book records. Each book entry includes details such as title, author(s), ISBN, publisher, and page count.

3. Members Management: Create, update, and delete member records. Each member is associated with their relevant information.

4. Transactions: Record book issuances, returns, and manage associated fees.

## Use Cases
- Issue a Book: Librarians can issue books to members. Upon issuance, the book's availability status is updated, and relevant transaction details are recorded.

- Return a Book: Members can return books to the library. Upon return, the book's availability status is restored, and applicable fees are calculated and charged.

- Search for Books: Users can search for books by title, author, or both. The search functionality provides a convenient way to find specific books in the library's collection.

- Charge Fees: The system automatically calculates and charges fees for overdue books. Members cannot accumulate outstanding debts exceeding Rs. 500.

## Integration for Data Import
- Librarians can import books into the system using the Frappe API. The API facilitates the retrieval of book data in batches of 20 records at a time. Key functionalities of the API include:

- Data Retrieval: Retrieve book data based on specified parameters such as title, author, ISBN, publisher, and page count.

- Import Books: Import retrieved book data into the application, creating corresponding book records.

## Endpoints
The following endpoints are available in the backend application:

- Import Books: `POST /import-books/`

- Register Member: `POST /register-member/`

- Issue Book to Member: `POST /issue-book/`

- Get Issued Books: `GET /issued-books/`

- Get Available Books: `GET /available-books/`

- Return Book: `PATCH /return-book/`

- Search Book: `GET /search-book/`

- Each endpoint serves specific functionalities, facilitating seamless interaction with the library management system.

## How to Use
To utilize the application effectively, follow these steps:

- Import Books: Utilize the import-books endpoint to import books into the application from the Frappe API. Ensure correct handling of pagination for retrieving large datasets.

- Manage Members: Register members using the register-member endpoint, providing necessary member details.

- Issue and Return Books: Use the issue-book and return-book endpoints to handle book issuances and returns, respectively. Ensure adherence to fee policies for overdue books.

- Search for Books: Utilize the search-book endpoint to search for specific books based on title, author, or both.

- Retrieve Book Lists: Utilize the issued-books and available-books endpoints to retrieve lists of issued and available books, respectively. Paginate through the results for better navigation.

## Local Setup

### Backend:

1. Go to `src/backend` and create a virtual environment.
```
py -m venv .venv
```
2. activate the vitual environment
```
source .venv/bin/activate
```
3. Setup the db credentials in the `.env` following the example in `.env.example`.
4. Run `make backend` to run the backend server.

### Frontend:
1. Go to `src/frontend/frappe_library` and run.
```
yarn dev
```
2. You can now access the frontend on `localhost:3000`.

## Screenshots:

1. Available books listing section.
2. Pagination.
3. Issue Book section.
4. Member registration section.
5. Issued books listing section.
6. Book return section.
7. Navbar dropdowns.
