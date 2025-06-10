from flask import Flask
from endpoints import endpoint


app = Flask(__name__)
app.register_blueprint(endpoint)


if __name__ == '__main__':
    app.run(debug=True)