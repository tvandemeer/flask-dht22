from flask import Flask, render_template, make_response
import adafruit_dht
import board
from random import random
import json
from time import time, localtime


app = Flask(__name__)

dht22 = adafruit_dht.DHT22(board.D18, use_pulseio=False)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/live')
def live():
    try:
        now = localtime()
        created = "%s:%s:%s" % (now.tm_hour, now.tm_min, now.tm_sec)
        # created = time() * 1000
        temp = dht22.temperature
        hum = dht22.humidity
        values = [created, round(temp, 1), round(hum)]
    except:
        print('Exception occurred')
        values = []
    response = make_response(json.dumps(values))
    response.content_type = 'application/json'
    return response


@app.route('/random')
def random():
    response = str(round(random() * 100, 1))
    return response
