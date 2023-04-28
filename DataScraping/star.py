

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
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
    
    url = f'https://www.starmarket.com/shop/search-results.html?q={product}'
    
    driver = webdriver.Chrome()
    driver.get(url)
    driver.maximize_window()
    try:
        click(driver, By.ID, 'onetrust-accept-btn-handler')
        click(driver, By.ID, 'onboardingCloseButton')
        driver.execute_script("window.scrollTo(0, 0);")
        click(driver, By.ID, 'openFulfillmentModalButton')
        bar = driver.find_element(By.XPATH, '//*[@id="storeFulfillmentModal"]/div/div/div[2]/store-fulfillment-tabs/div/div[1]/input')
        bar.send_keys(zipcode)
        sleep(2)
        click(driver, By.XPATH, '//*[@id="storeFulfillmentModal"]/div/div/div[2]/store-fulfillment-tabs/div/div[1]/span')
        click(driver, By.XPATH, '//*[@id="fulfilmentInStore"]/div/div/div[1]/store-card/div[2]/div/a')
        driver.execute_script("window.scrollBy(0, 100);")
        click(driver, By.ID, 'sortDropdown')
        click(driver, By.ID, 'sortRule-1', 1.5)
    except:
        return 
    # cookies # close # change zip # enter zip code # search # select first store # sort option # sort by price
    
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    
    tags = soup.find_all('product-item-v2')
    items= []
    
    for i, tag in enumerate(tags[:]):
        try:
            
            pic_tag = tag.find_all('div', class_='product-card-container__image-container mt-3')
            if len(pic_tag)==0:
                pic_tag = tag.find_all('div', class_='product-card-container__image-container mt-3 has-tooltip')
            pic = pic_tag[0].img['data-src']
            
            price_tag = tag.find_all('div', class_='product-card-container__details mt-3')
            #price_start = str(price_tag[0].div.span).find('</span>')
            #price_end   = str(price_tag[0].div.span).find('<!')
            price = price_tag[0].div.span.span.text
            price = price.strip('$')
            
            name_tag = tag.find_all('div', class_='product-title__text has-tooltip')
            if len(name_tag)==0:
                name_tag = tag.find_all('div', class_='product-title__text')
                name = name_tag[0].a.text
            else:
                name = tag.find_all('div', class_='product-item-title-tooltip__inner')[0].text
            
            unit_price = tag.find_all('div', class_='product-title__details')[0].div.text[1:-1]
            num, measure = unit_price.split(f' / ')
            num = num[1:]
            
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
            
            
            item = {"pic-url": pic, "price": price, "name": name, "unit-price": unit_price, "unit": unit}
            items.append(item)
            
            if printinfo:
                print(i)
                print(' pics, price, name, unit-price')
                print(pic, price, name, unit_price, sep='\n')
                print()
        except Exception as e:
            print(f"ERROR : {e}")  # zipcode name
            continue
    driver.close()
    
    out_path = f'results/{store}/'
    with open(out_path+f'{zipcode}_{product}.json', 'w') as f:
        f.write('[')
        for item in items[:-1]:
            f.write(json.dumps(item))
            f.write(',\n')
        if len(items):
            f.write(json.dumps(items[-1]))
        f.write(']')
        print(f'{store}  {zipcode}  {product} finished  total:', len(items))


store = 'star'
with open('zipcodes.txt', 'r') as f:
    zipcodes = f.read()
zipcodes = zipcodes.split(', ')
with open('products.txt' ,'r') as f:
    products = f.read()
products = products.split(', ')

for zipcode in zipcodes[:]:
    for product in products[:]:
        scraping(zipcode, product, store)





