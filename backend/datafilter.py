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
        dataset = conn.getAgregatefrompipeline(collection="big", pipeline=pipeline)
        for element in dataset:
            insert = dict()
            zone = element['_id'] if element is not None else "Null"
            try:
                zone = zone.replace("/","_").replace(" ","").replace(".","").lower()
            except:
                pdb.set_trace()
            insert['time_zone']=zone
            insert['nodes']=[]

            print zone

            cur = conn.gettweets("big",zone)
            for tweet in cur:
                try:
                    idt = tweet['user']['id_str']
                    photo = tweet['user']['profile_image_url_https']
                    newdict = {
                        "id": idt,
                        "image": photo
                    }
                    insert['nodes'].append(newdict)
                    #print tweet
                except:
                    pass
            conn.insertGeneric(collection="big_"+"processed",data=insert)




if __name__ == '__main__':
    dataFilter()