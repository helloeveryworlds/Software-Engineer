


import os
import requests

store = 'star'
#store = 'target'
#store = 'wholefoods'
path = f'results/{store}/'
files = os.listdir(path)

with open('zipcodes.txt', 'r') as f:
    zipcodes = f.read()
zipcodes = zipcodes.split(', ')

def push_one_piece(zipcode, st):
    
    file_zipcode = [f for f in files if zipcode in f]
    contents = ""
    headers = {'Content-Type': 'application/json'}
    
    for file in file_zipcode:
        zipcode, name = file.split('.')[0].split('_')
        with open(path+file, 'r') as f:
            content = f.read()
        contents = contents + f'"{name}":{content},'
    contents = contents[:-1]
    url = 'http://localhost:8800/insertStoreData'
    data = f'[{{"storeName":"{st}", "zipCode":"{zipcode}", "priceData":{{{contents}}}}}]'
    #return data
    with open(f'request_{st}.txt', 'w') as f:
        f.write(data)
    response = requests.post(url, headers=headers, data=data)
    print(response)
    
    if not contents:
        url = 'http://localhost:8800/removeStoreFromZip'
        data = f'[{{"zipCode": "{zipcode}", "storeList":["{store}"]}}]'
        response = requests.put(url, headers=headers, data=data)
        print("Store Delete: ", response)
    
    #print(contents)

for zipcode in ['02115']:
    push_one_piece(zipcode, store)


