import os
from config import db
from model import Movie
from datetime import datetime
import csv
  
  
filename ="netflix_titles.csv"


# Delete database file if it exists currently
if os.path.exists('movies.db'):
    os.remove('movies.db')

# Create the database
db.create_all()

# Iterate over the PEOPLE structure and populate the database
with open(filename, 'r') as data: 
    for movie in csv.DictReader(data): 
        movie = Movie(show_id=int(movie['show_id'][1:]), 
        content_type=movie['type'],
        title=movie["title"][1:], 
        director=movie['director'], 
        cast=movie['cast'],
        country=movie['country'], 
        date_added=datetime.strptime(movie['date_added'].strip(),'%B %d, %Y') if movie['date_added'] else None,
        release_year=int(movie['release_year']), 
        rating=movie['rating'],
        duration=movie['duration'], 
        listed_in=movie['listed_in'],
        description=movie['description'])
        
        db.session.add(movie)

db.session.commit()