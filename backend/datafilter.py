import sys
sys.path.append("../")
from Mongo.helper import HashtagMDB
import pdb

class dataFilter(object):

    def __init__(self):
        self.run()

    def run(self):
        conn = HashtagMDB()
        pipeline = [{ '$group': { '_id': '$user.time_zone' } } ]
        dataset = conn.getAgregatefrompipeline(collection="small", pipeline=pipeline)
        for element in dataset:
            insert = dict()
            insert['time_zone']=element['_id']
            insert['']
            zone = element['_id'] if not element else None
            pdb.set_trace()
            cur = conn.gettweets("small",zone)
            for tweet in cur:
                id =tweet['user']['id_str']
                pdb.set_trace()



if __name__ == '__main__':
    dataFilter()