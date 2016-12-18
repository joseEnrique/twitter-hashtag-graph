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
    def __init__(self, db):
        self.db = db

    def on_data(self, data):

        jsondata = json_loads_byteified(data)
        DB = HashtagMDB()
        DB.insertHashtag(collection=self.db, data=jsondata)
        def on_error(self, status):
            print(status)
            return True



class initStream(object):
    def __init__(self, name,lista):
        self.name=name
        self.listterms=lista

    def run(self):
        twitter_stream = Stream(auth, Listener(self.name))
        twitter_stream.filter(track=self.listterms)

if __name__ == '__main__':
    name = sys.argv[1]
    listarg = sys.argv[2:]
    print name
    initStream(name,listarg).run()