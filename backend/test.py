from main import app
import json
import unittest


class FlaskTest(unittest.TestCase):

    def setUp(self):
        self.tester = app.app.test_client()

    # test response
    def test_index(self):
        response = self.tester.get('/users')
        status = response.status_code
        self.assertEqual(status, 200)

    # check if content return application/json
    def test_index_content(self):
        response = self.tester.get('/users')
        self.assertEqual(response.content_type, 'application/json')

    #test user register
    def test_successful_signup(self):
        payload = json.dumps({
            "email": "unittest@gmail.com",
            "password": "testpassword",
            "name": "testUser"
        })

        response = self.tester.post('/user', headers={"Content-Type": "application/json"}, data=payload)

        self.assertEqual(200, response.status_code)  

    # Test login 
    def test_login(self):
        payload1 = json.dumps({
            "email": "unittest@gmail.com",
            "password": "testpassword"
        })
        payload2 = json.dumps({
            "email": "unittest@gmail.com",
            "password": "wrongpassword"
        })      
        response1 = self.tester.post('/login', headers={"Content-Type": "application/json"}, data = payload1)   
        response2 = self.tester.post('/login', headers={"Content-Type": "application/json"}, data = payload2) 
        self.assertEqual(200, response1.status_code)  
        self.assertEqual(401, response2.status_code)  

    def test_groupby(self):
        response = self.tester.get('/groupby')
        self.assertEqual(response.content_type, 'application/json')
        self.assertEqual(response.status_code, 200)




if __name__ == "__main__":
    unittest.main()
