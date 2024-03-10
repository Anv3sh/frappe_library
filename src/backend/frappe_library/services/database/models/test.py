import json

resp = """
{
    "message": [
        {
            "bookID": "34963",
            "title": "Star Wars. Episode I - Die dunkle Bedrohung",
            "authors": "Terry Brooks/George Lucas/Regina Winter",
            "average_rating": "3.57",
            "isbn": "3442352436",
            "isbn13": "9783442352432",
            "language_code": "ger",
            "  num_pages": "320",
            "ratings_count": "67",
            "text_reviews_count": "4",
            "publication_date": "8/1/1999",
            "publisher": "Blanvalet Taschenbuch Verlag"
        },
        {
            "bookID": "35400",
            "title": "Star Wars: The Complete Visual Dictionary",
            "authors": "James Luceno/David West Reynolds/Ryder Windham",
            "average_rating": "4.33",
            "isbn": "0756622387",
            "isbn13": "9780756622381",
            "language_code": "eng",
            "  num_pages": "272",
            "ratings_count": "1094",
            "text_reviews_count": "40",
            "publication_date": "9/25/2006",
            "publisher": "DK Children"
        },
        {
            "bookID": "31641",
            "title": "Star Wars Omnibus: X-Wing Rogue Squadron  Vol. 2",
            "authors": "Michael A. Stackpole/Jan Strnad/Ryder Windham/Jordi Ensign/John Nadeau/Gary Erskine",
            "average_rating": "3.88",
            "isbn": "1593076193",
            "isbn13": "9781593076191",
            "language_code": "eng",
            "  num_pages": "288",
            "ratings_count": "325",
            "text_reviews_count": "12",
            "publication_date": "10/24/2006",
            "publisher": "Dark Horse Comics"
        }
    ]
}
"""


resp_data = json.loads(resp)

book_objects = resp_data.get("message")
for book in book_objects:  
    # If the key with extra spaces exists  
    if "  num_pages" in book:
        # Create a new entry with the correct key and the value of the old key  
        book['num_pages'] = book.pop("  num_pages")

