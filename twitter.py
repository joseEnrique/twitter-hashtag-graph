import tweepy
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy.streaming import StreamListener
import pdb
import goslate

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


        #print (data)
        jsondata=json_loads_byteified(data)
        self.get_tweet(jsondata)
        DB = HashtagMDB()
        DB.insertHashtag(jsondata)

        #print (jsondata)
        #print "*****************************************"

        def on_error(self, status):
            print(status)
            return True



GEOBOX_GERMANY =  [-180,-90,180,90]
twitter_stream = Stream(auth, MyListener())
twitter_stream.filter(track=["#BIGBellTest","#TheBIGBelltest","BIGBellTest","TheBIGBelltest"])