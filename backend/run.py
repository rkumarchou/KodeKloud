from flask import Flask
from flask_cors import CORS

from questions_api import questions_api


if __name__ == '__main__':
    """ Its a starting point of app """

    app = Flask(__name__)
    CORS(app)
    app.register_blueprint(questions_api)
    app.run()