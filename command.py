import argparse
import sys
import os

from Mongo.helper import HashtagMDB

import pdb

from backend.datafilter import dataFilter


def joinlist(list):
    return " ".join(list)

def readPID():
    with open("pid.tmp") as f:
        content = f.readlines()
        return content

class Command(object):
    parser = argparse.ArgumentParser(description='Sysgraph')
    parser.add_argument('--stop',
        action='store_true',
        help='stop process' )
    parser.add_argument('--name', nargs=1, required=True)
    parser.add_argument('--execute',
        nargs="+",
        help='init process with element LIST ["element","element"]',
            )
    args = parser.parse_args()
    name = parser.parse_args().name[0]
    conn=HashtagMDB()
    if args.stop:
        pid = conn.getPID(collection="pid",name=name)
        print pid['pid']
        os.system("kill -9 " + pid['pid'])
        print("Stopped!")
        conn.updatestatus(collection="graphs",name=name,status="processing")
        # Procesing
        dataFilter(name).run()
        conn.updatestatus(collection="graphs", name=name, status="done")


    elif args.execute:
        listarg = parser.parse_args().execute

        os.system("python twitter.py "+name+" "+joinlist(listarg)+ " & echo $! > pid.tmp")

        data = readPID()[0].rstrip('\n')
        dict = {"name":name,
                "pid":data}
        conn.insertGeneric(collection="pid",data=dict)

        conndict = {
            "name": name,
            "status" : "run"


        }
        conn.insertGeneric(collection="graphs", data=conndict)

        #print os.system("echo $!")



    else:
        print("Nothing")


if __name__ == '__main__':
    Command()