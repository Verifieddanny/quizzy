from flask import Flask
from endpoints import endpoint
from config import Config
from flask_jwt_extended import JWTManager

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY
jwt = JWTManager(app)
app.register_blueprint(endpoint)



if __name__ == '__main__':
    app.run(debug=True)