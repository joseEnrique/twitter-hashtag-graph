import tweepy
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy.streaming import StreamListener
import pdb

from Mongo.helper import HashtagMDB
from jsonTransform import *

consumer_key =''
consumer_secret = ''
access_token = ''
access_secret = ''
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)

class MyListener(StreamListener):
    def on_data(self, data):
        jsondata=json_loads_byteified(data)

        DB = HashtagMDB()
        DB.insertHashtag(jsondata)
        print (jsondata)

        def on_error(self, status):
            print(status)
            return True

twitter_stream = Stream(auth, MyListener())
twitter_stream.filter(track=['Rosberg'])