"""
This is the movie module and supports all the REST actions for the
movie data
"""


from config import db
from model import Movie, MovieSchema
from user import token_required
from flask import Flask, request, jsonify, make_response
from sqlalchemy import func

@token_required
def get_all(current_user):
    """
    This function responds to a request for /movie
    with the complete list of movies
    return:        json string of list of all shows
    """
    # Create the list of movie from our data
    movie = Movie.query.order_by(Movie.title).all()

    # Serialize the data for the response
    movie_schema = MovieSchema(many=True)
    data = movie_schema.dump(movie)
    return data

def groupBy():
    """
    This function return groupby movie content, 
    rating, and year of movie cast
    return:  dictionary with three keys and each key has a list of values
    """
    content = db.session.query(Movie.content_type, func.count(Movie.title)).group_by(Movie.content_type)
    rating = db.session.query(Movie.rating, func.count(Movie.title)).group_by(Movie.rating)
    year = db.session.query(Movie.release_year, func.count(Movie.title)).group_by(Movie.release_year)
    res = {}
    res['content'] = putTodict(content)
    res['rating'] = putTodict(rating)
    res['year'] = putTodict(year)

    return jsonify(res)

def putTodict(group):
    res = []
    for item in group:
        temp ={}
        temp['type'] = item[0]
        temp['count'] = item[1]
        res.append(temp)
    return res   
     

