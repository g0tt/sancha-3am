#!/usr/bin/env python
# -*- coding:utf-8 -*-

import tweepy
import json
import pymongo

client = pymongo.MongoClient('localhost', 27017)

db = client['sancha-3am']

f = open("../config.json")
config = json.load(f)

CONSUMER_KEY = config["twitter"]["consumer_key"]
CONSUMER_SECRET = config["twitter"]["consumer_secret"]
auth = tweepy.OAuthHandler(CONSUMER_KEY, CONSUMER_SECRET)

for data in db.users.find():
    ACCESS_TOKEN = data['access_token']
    ACCESS_SECRET = data['access_token_secret']
    auth.set_access_token(ACCESS_TOKEN, ACCESS_SECRET)

    print data['screen_name']

    api = tweepy.API(auth)

    api.update_status(config["text"])

print('Done!')
