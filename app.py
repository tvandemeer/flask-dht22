from flask import Flask, render_template, make_response
from flask_restful import Resource, Api
import adafruit_dht
import board
from random import random
import json
from time import time, localtime
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.debug = True
api = Api(app)

dht22 = adafruit_dht.DHT22(board.D18, use_pulseio=False)


@app.route('/')
def index():
    return render_template('index.html')


class Live(Resource):
    def get(self):
        try:
            now = localtime()
            created = "%s:%s:%s" % (now.tm_hour, now.tm_min, now.tm_sec)
            # created = time() * 1000
            temp = dht22.temperature
            hum = dht22.humidity
            values = [created, round(temp, 1), round(hum, 1)]
        except:
            print('Exception occurred')
            values = []
        response = make_response(json.dumps(values))
        response.content_type = 'application/json'
        return response

api.add_resource(Live, '/live')


if __name__ == '__main__':
    app.run()

