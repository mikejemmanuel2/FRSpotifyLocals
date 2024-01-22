from flask import Flask, render_template
from flask_cors import CORS, cross_origin
import DBXAPI

app = Flask(__name__)
CORS(app)

@app.route('/')
def index():
  return "Alive"
  
@app.route('/api/V-Dog')
def returnVDog():
  return render_template("Retrieval.html", songsList=DBXAPI.getVDog()) 

# Handler to set Access-Control-Allow-Origin header for all responses
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)