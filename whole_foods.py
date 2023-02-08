


from bs4 import BeautifulSoup
import requests

url = 'https://www.wholefoodsmarket.com/search?text=milk'
html_text = requests.get(url)
#print(html_text)

soup = BeautifulSoup(html_text.text, 'lxml') #'html.parser'
#print(soup)

tags = soup.find_all('div', class_="w-pie--product-tile")
#print(tags)

for tag in tags:
    print(f'pics, name1, name2, price')
    print(tag.div.picture.img.get('data-src'))
    print(tag.find_all('div')[1].span.text)
    print(tag.find_all('div')[1].h2.text)
    print(tag.find_all('div')[1])
    print()
#pics
# tag[0].div.picture.img.get('data-src')

#name
# tag[0].find_all('div')[1].span.text
# tag[0].find_all('div')[1].h2.text




'''
find
find_all (tag, attr_constrains)   return list

.div  .a  .h1  .h2  .span   return first matched element
.find_all  return all matches elements
.get(attr) return value of attr

'''
