from flask import Flask
from datetime import timedelta
from flask_jwt_extended import JWTManager
from endpoints import endpoint
from config import Config


app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=5)
app.register_blueprint(endpoint)
jwt = JWTManager(app)



if __name__ == '__main__':
    app.run(debug=True)