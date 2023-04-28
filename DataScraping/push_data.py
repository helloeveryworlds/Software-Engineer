


import os
import requests

store = 'star'
path = f'results/{store}/'
files = os.listdir(path)

file = files[0]

def push_one_piece(filename):
    fn = filename.split('.')[0]
    zipcode, name = fn.split('_')
    with open(path+filename, 'r') as f:
        content = f.read()
    #return content
    url = 'http://localhost:8800/insertStoreData'
    data = f'[{{"storeName":"{store}", "zipCode":"{zipcode}", "priceData":{{"{name}":{content}}}}}]'
    #response = requests.post(url, data=data)
    #print(response)
    print(data)

push_one_piece(file)

'''[
    {"storeName":"{store}", 
      "zipCode":"{zipcode}", 
      "priceData":{}}]'''