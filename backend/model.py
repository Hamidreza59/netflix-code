from config import db, ma


class Movie(db.Model):
    __tablename__ = 'Movies'
    show_id = db.Column(db.Integer, primary_key=True)
    content_type = db.Column(db.String)
    title = db.Column(db.String)
    director = db.Column(db.String)
    cast = db.Column(db.String)
    country = db.Column(db.String)
    date_added = db.Column(db.DateTime)
    release_year = db.Column(db.Integer)
    rating = db.Column(db.String)
    duration = db.Column(db.String)
    listed_in = db.Column(db.String)
    description = db.Column(db.String)

    def __repr__(self):
        return '<Movie %r>' % self.title

class MovieSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Movie
        sqla_session = db.session 

class User(db.Model):
    __tablename__ = 'Users'
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(80))
    password = db.Column(db.String(80))
    reviews = db.Column(db.String(80))

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        sqla_session = db.session 

    
