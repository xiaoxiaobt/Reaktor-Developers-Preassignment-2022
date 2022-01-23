import json
import os
import pymongo
from urllib.request import urlopen
from dotenv import load_dotenv
from datetime import datetime
load_dotenv()

PASSWORD = os.environ.get('MONGODB_PASSWORD')
client = pymongo.MongoClient(
    f"mongodb+srv://fullstack:{PASSWORD}@cluster0.7t0bb.mongodb.net")

URL = "https://bad-api-assignment.reaktor.com"
endpoint = "/rps/history"
page_counter = 0

with client.start_session(causal_consistency=True) as session:
    db = client.reaktor
    results = db["results"]
    # users = db["users"]
    # users.create_index("name", unique=True)
    initial_count: int = results.count_documents({}, session=session)

    while endpoint != None:
        response = urlopen(f"{URL}{endpoint}")
        data_json = json.loads(response.read())

        for x in data_json['data']:
            x["_id"] = x.pop('gameId')
            # here this actually should be fromtimestamp cuz with fromtimestamp it's in Finnish time
            # x["t"] = datetime.utcfromtimestamp(x["t"]/1000)
            x["t"] = datetime.fromtimestamp(x["t"]/1000)
            x.pop("type")

        page_counter += 1
        print(f"Load from {endpoint=}, page count: {page_counter}")
        endpoint = data_json['cursor']
        try:
            results.insert_many(
                data_json['data'], ordered=False, session=session)

        except pymongo.errors.BulkWriteError or TypeError:
            final_count: int = results.count_documents({}, session=session)
            print(
                f"Inserted {final_count - initial_count} new documents")
            break
