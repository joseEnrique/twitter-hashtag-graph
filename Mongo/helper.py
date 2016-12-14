# -*- coding: utf-8 -*-
import re

from conn import MongoDBconn
import pdb

class HashtagMDB(object):
    _conn = None
    def __init__(self):
        self._conn = MongoDBconn()

    def _getCollection(self,collection):
        return self._conn.getDB()[collection]

    def searchAll(self,collection=None):
        return [ element for element in self._getCollection(collection).find()]

    def insertHashtag(self,data):
        self._getCollection(collection="hashtag").insert(dict(data))

    def insertCity(self, data):
        self._getCollection(collection="city").insert(dict(data))

    def insertGeneric(self,collection,data):
        self._getCollection(collection=collection).insert(dict(data))

    def getPID(self,collection,name):
        return self._getCollection(collection=collection).find_one_and_delete({"name":name})

    def getAgregatefrompipeline(self,collection,pipeline):
        """
        :param collection: For match
        :param pipeline: any pipeline
        :return: List
        """
        return list(self._getCollection(collection).aggregate(pipeline=pipeline))

    def gettweets(self, collection=None, zone = None):
        search = self._getCollection(collection).find(
            {
                'user.time_zone': zone,
            }
        )
        return search





