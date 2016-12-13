import sys
import pdb
sys.path.append("../")
from tweepy import OAuthHandler
from tweepy import Stream
from tweepy.streaming import StreamListener
from Mongo.helper import HashtagMDB
from jsonTransform import *

consumer_key =''
consumer_secret = ''
access_token = ''
access_secret = ''
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)


class Listener(StreamListener):
    def on_data(self, data):

        #print (data)
        jsondata = json_loads_byteified(data)
        DB = HashtagMDB()
        DB.insertHashtag(jsondata)
        #print (jsondata)
        #print "*****************************************"

        def on_error(self, status):
            print(status)
            return True



class initStream(object):
    def __init__(self, lista):
        self.listterms=lista

    def run(self):
        twitter_stream = Stream(auth, Listener())
        twitter_stream.filter(track=self.listterms)

if __name__ == '__main__':
    listarg = sys.argv[1:]
    initStream(listarg).run()