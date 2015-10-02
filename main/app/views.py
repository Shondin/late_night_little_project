from app import app
from flask import render_template,json, jsonify
import os
BASE_DIR = os.path.dirname(os.path.dirname(__file__))


@app.route('/')
@app.route('/index')
def index():
    return render_template('index.html')

@app.route('/cards')
def get_cards():
    json_url = os.path.join(BASE_DIR, 'app/static', "json", "cards.json")
    return get_json_from_file(json_url)

@app.route('/main_schedule')
def get_main_schedule():
    json_url = os.path.join(BASE_DIR, 'app/static', "json", "main-schedule.json")
    return get_json_from_file(json_url)


def get_json_from_file(json_url):
    data={}
    data['data'] = json.load(open(json_url))
    return jsonify(data)
