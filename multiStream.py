# -*- coding: utf-8 -*-
from multiprocessing import Process

import time
import pdb

from multiprocessing import Pool
from tweepy import Stream
from tweepy.auth import OAuthHandler
import os

from twitter import MyListener
consumer_key =''
consumer_secret = ''
access_token = ''
access_secret = ''
auth = OAuthHandler(consumer_key, consumer_secret)
auth.set_access_token(access_token, access_secret)





def Streamtwit(stream):

    """
    A doubling function that can be used by a process
    """
    word = "#Chapecoense"

    twitter_stream.filter(track=[word])


if __name__ == '__main__':
    twitter_stream = Stream(auth, MyListener())
    twitter_stream1 = Stream(auth, MyListener())
    numbers = [twitter_stream,twitter_stream,twitter_stream]
    procs = []
    pool = Pool()
    y_parallel = pool.map(Streamtwit, numbers)
