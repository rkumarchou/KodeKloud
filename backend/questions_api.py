import os
import json
from flask import (
                Blueprint,
                jsonify,
            )
base_dir = os.path.abspath(os.path.dirname(__file__))


questions_api = Blueprint('questions_api', __name__)


@questions_api.route("/questions")
def get_questions():
    text = []
    try:
        with open('test_files/test_set_1.json', encoding='utf-8-sig') as json_file:
            text = json_file.read()
        return jsonify(json.loads(text))
    except:
        return jsonify(text)