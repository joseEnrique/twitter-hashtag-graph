import json
from pprint import pprint
import pdb

from Mongo.helper import HashtagMDB

with open('/home/quique/git/twitter-graph/countriesToCities.json') as data_file:
    data = json.load(data_file)
conn=HashtagMDB()
errors=[]
for country, listtoen in data.iteritems():
    for city in listtoen:
        try:
            insert = {"city":city, "country":country}
            conn.insertCity(insert)
        except:
            errors.append([country,city])

pprint(data)
print errors