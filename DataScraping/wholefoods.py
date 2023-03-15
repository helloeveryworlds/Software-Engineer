from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.select import Select
from selenium.webdriver.common.keys import Keys
from bs4 import BeautifulSoup
from selenium import webdriver
from time import sleep
import requests
import json
import os




def click(web, method, val, s_t = 1):
    button = web.find_element(method, val)
    button.click()
    sleep(s_t)



def scraping(zipcode, product, store, printinfo = False):
    
    url = f'https://www.wholefoodsmarket.com/stores'
    
    driver = webdriver.Chrome()
    driver.get(url)
    driver.maximize_window()
    
    zip_bar = driver.find_element(By.ID, 'store-finder-search-bar')
    zip_bar.send_keys(zipcode)
    zip_bar.send_keys(Keys.RETURN)
    click(driver, By.XPATH, '//*[@id="w-store-finder__store-list"]/wfm-store-list/ul/li[1]/wfm-store-details/div/div[5]')
    search_bar = driver.find_element(By.XPATH, '//*[@id="header"]/div[3]/div[1]/div/div/form/input')
    search_bar.send_keys(product)
    search_bar.send_keys(Keys.RETURN)
    sort_menu = driver.find_element(By.ID, 'sort-dropdown-select')
    select = Select(sort_menu)
    select.select_by_value('priceasc')
    
    soup = BeautifulSoup(driver.find_element(By.CLASS_NAME, 'w-pie--products-grid').get_attribute('outerHTML'), 'html.parser')
    tags = soup.find_all('div', class_='w-pie--product-tile')
    
    items = []
    
    for i, tag in enumerate(tags[:]):
        
        try:
            pic = tag.a.div.picture.img['src']
            
            name= tag.find('div', class_='w-pie--product-tile__content').h2.text
            
            price = tag.find('div', class_='w-pie--prices').span.b.text
            
            unit_price = 'None'
            
            rating = 'None'
            
            item = {"pic-url": pic, "price": price, "name": name, "unit-price":unit_price , "rating": rating}
            items.append(item)
            
            if printinfo:
                print(i)
                print(' pics, price, name, unit-price')
                print(pic, price, name, sep='\n')
                print()
        
        except Exception as e:
            #print("ERROR : ", e)
            continue
    
    out_path = f'results/{store}/'
    
    with open(out_path+f'{zipcode}_{product}.json', 'w') as f:
        f.write('[')
        for item in items[:-1]:
            f.write(json.dumps(item))
            f.write(',\n')
        f.write(json.dumps(items[-1]))
        f.write(']')
        print(f'{store}  {zipcode}  {product} finished  total:', len(items))

store = 'wholefoods'
zipcodes = ['02134', '02148']
products = ['milk', 'egg']

for zipcode in zipcodes:
    for product in products:
        scraping(zipcode, product, store)

