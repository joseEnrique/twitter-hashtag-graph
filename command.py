import argparse
import sys
import os
from twitter import initStream
import pdb


def joinlist(list):
    return " ".join(list)
class Command(object):
    parser = argparse.ArgumentParser(description='Sysgraph')
    parser.add_argument('--stop',
        action='store_true',
        help='stop process' )
    parser.add_argument('--execute',
        nargs="+",
        help='init process with element LIST ["element","element"]',
            )
    args = parser.parse_args()

    if args.stop:
        print("Stopped!")
    elif args.execute:
        listarg = joinlist(sys.argv[2:])
        a = os.system("python twitter.py  "+listarg+ " & echo $!")
        pdb.set_trace()
        #print os.system("echo $!")



    else:
        print("Nothing")


if __name__ == '__main__':
    Command()