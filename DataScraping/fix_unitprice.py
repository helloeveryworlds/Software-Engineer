

import os
import json

store = 'wholefoods'
path = f'results/{store}/'
files = os.listdir(path)

for file in files[:]:
    with open(path+file, 'r') as f:
        content = f.read()
        if content:
            content = json.loads(content)
        else:
            continue
    for i in range(len(content)):
        if '/' in content[i]['unit-price']:
            num, measure = content[i]['unit-price'].split('/')
            measure = measure.strip(' ')
            num = num.strip('$')
            if measure == '100ct':
                unit_price = str(round(float(num)/100.0, 2))
                unit = 'ct'
            elif measure == 'Each':
                unit_price = str(round(float(num)/1.0, 2))
                unit = 'ct'
            elif measure == 'Gal.':
                unit_price = str(round(float(num)/3.79, 2))
                unit = 'kg'
            elif measure  in ['Lb', 'pound', 'Pound']:
                unit_price = str(round(float(num)/0.45, 2))
                unit = 'kg'
            elif measure == 'Quart':
                unit_price = str(round(float(num)/0.95, 2))
                unit = 'kg'
            elif measure in ['Pint', 'pint']:
                unit_price = str(round(float(num)/0.47, 2))
                unit = 'liter'
            content[i]['unit-price'] = unit_price
            content[i]['unit'] = unit
            print(f"Changes: {file} No.{i} new {unit_price} {unit}")
    with open(path+file, 'w') as f:
        content = json.dumps(content)
        f.write(content)
            
