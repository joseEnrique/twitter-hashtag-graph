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
            insert['time_zone']=element['_id'] if not element else "None"
            insert['nodes']=[]
            zone = element['_id'] if not element else None
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
                    print tweet
                except:
                    pass
            conn.insertGeneric(collection="prueba_"+"processed",data=insert)




if __name__ == '__main__':
    dataFilter()