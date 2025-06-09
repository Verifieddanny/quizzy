from flask import Flask
from utils.response import Response

app = Flask(__name__)


@app.route('/')
def home():
    return Response.success(msg='Quizzy API v1')


if __name__ == '__main__':
    app.run(debug=True)