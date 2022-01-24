import json
import os
import pymongo
from urllib.request import urlopen
from dotenv import load_dotenv
from datetime import datetime
from bson.objectid import ObjectId
load_dotenv()

"""
This script is used to fetch new (historical) data from the API and store it in the database.
This action is scheduled for every 15 minutes, triggered by GitHub Actions.
Maybe MongoDB trigger is a better solution but due to time limitations I decided to use this.
"""

PASSWORD = os.environ.get('MONGODB_PASSWORD')
client = pymongo.MongoClient(
    f"mongodb+srv://fullstack:{PASSWORD}@cluster0.7t0bb.mongodb.net")

URL = "https://bad-api-assignment.reaktor.com"
endpoint = "/rps/history"
page_counter = 0

# Start a session with database
with client.start_session(causal_consistency=True) as session:
    db = client.reaktor
    results = db["results"]
    # users = db["users"]
    # users.create_index("name", unique=True)

    # Count number of documents before fetching
    initial_count: int = results.count_documents({}, session=session)

    while endpoint != None:
        # Fetch data from API
        response = urlopen(f"{URL}{endpoint}")
        data_json = json.loads(response.read())

        # Change data to desired formats
        for x in data_json['data']:
            # To make the gameID 24 characters long
            # Using timestamp is also fine but it's not unique
            x["_id"] = ObjectId(x.pop('gameId').zfill(24))
            # Here this actually should be fromtimestamp cuz with fromtimestamp it's in Finnish time
            # x["t"] = datetime.utcfromtimestamp(x["t"]/1000)
            x["t"] = datetime.fromtimestamp(x["t"]/1000)
            x.pop("type")

        page_counter += 1
        print(f"Load from {endpoint=}, page count: {page_counter}")

        # Update new cursor
        endpoint = data_json['cursor']

        # Insert data to database
        # If there exists a duplicate entry, an `BulkWriteError` will be raised;
        # If the program reaches the last page, a `TypeError` will be raised indicating that
        # the `data_json['data]` is empty
        try:
            results.insert_many(
                data_json['data'], ordered=False, session=session)

        except (pymongo.errors.BulkWriteError, TypeError):
            final_count: int = results.count_documents({}, session=session)
            print(
                f"Inserted {final_count - initial_count} new documents")
            break
