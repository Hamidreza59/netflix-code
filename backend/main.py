import config 
import movie
import user
from flask import Flask, request, jsonify, make_response

app = config.connex_app


@app.route('/movies')
def index():
    return {'data': movie.get_all()}

@app.route('/user', methods=['POST'])
def create_user():
    user.createUser()
    return jsonify({'message' : 'New user created!'})

@app.route('/users', methods=['GET'])
def get_all_users():    
    res = user.getUsers()
    if type(res) != list:
        return res
    else:
        return {"data": user.getUsers()}

@app.route('/user/<public_id>', methods=['DELETE'])
def delete_user(public_id):
    res = user.deleteUser(public_id)
    return res

@app.route('/login', methods=['POST'])
def login():
    res = user.login()
    return res

@app.route('/addreview', methods=['POST'])
def add_review():
    res = user.addReviews()
    return res

@app.route('/groupby', methods=['GET'])
def group_by():
    res = movie.groupBy()
    return res

if __name__ == "__main__":
    app.run(debug=True)