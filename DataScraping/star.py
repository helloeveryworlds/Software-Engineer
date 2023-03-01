

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
    
    click(driver, By.ID, 'onetrust-accept-btn-handler')
    click(driver, By.ID, 'onboardingCloseButton')
    click(driver, By.ID, 'openFulfillmentModalButton')
    bar = driver.find_element(By.XPATH, '//*[@id="storeFulfillmentModal"]/div/div/div[2]/store-fulfillment-tabs/div/div[1]/input')
    bar.send_keys(zipcode)
    click(driver, By.XPATH, '//*[@id="storeFulfillmentModal"]/div/div/div[2]/store-fulfillment-tabs/div/div[1]/span')
    click(driver, By.XPATH, '//*[@id="fulfilmentInStore"]/div/div/div[1]/store-card/div[2]/div/a')
    click(driver, By.ID, 'sortDropdown')
    click(driver, By.ID, 'sortRule-1', 3)
    # cookies # close # change zip # enter zip code # search # select first store # sort option # sort by price
    
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    
    tags = soup.find_all('product-item-v2')
    items= []
    
    for i, tag in enumerate(tags[:]):
        try:
            if printinfo:
                print(i)
                print(' pics, price, name, unit-price')
            
            pic_tag = tag.find_all('div', class_='product-card-container__image-container mt-3')
            if len(pic_tag)==0:
                pic_tag = tag.find_all('div', class_='product-card-container__image-container mt-3 has-tooltip')
            pic = pic_tag[0].img['data-src']
            #print(pic)
            
            price_tag = tag.find_all('div', class_='product-card-container__details mt-3')
            price_start = str(price_tag[0].div.span).find('</span>')
            price_end   = str(price_tag[0].div.span).find('<!')
            price = str(price_tag[0].div.span)[price_start+8: price_end-1]
            #print(price)
            
            name_tag = tag.find_all('div', class_='product-title__text has-tooltip')
            if len(name_tag)==0:
                name_tag = tag.find_all('div', class_='product-title__text')
                name = name_tag[0].a.text
            else:
                name = tag.find_all('div', class_='product-item-title-tooltip__inner')[0].text
            #print(name)
            
            unit_price = tag.find_all('div', class_='product-title__details')[0].div.text[1:-1]
            #print(unit_price)
            
            item = {"pic-url": pic, "price": price, "name": name, "unit-price": unit_price}
            items.append(item)
            
            if printinfo:
                print(pic, price, name, unit_price, sep='\n')
                print()
        except :
            print("ERROR")
            continue
    driver.close()
    
    out_path = f'results/{store}/'
    with open(out_path+f'{zipcode}_{product}.json', 'w') as f:
        f.write('[')
        for item in items[:-1]:
            f.write(json.dumps(item))
            f.write(',')
        f.write(json.dumps(items[-1]))
        f.write(']')
        print(f'{store}  {zipcode}  {product} finished  total:', len(items))


store = 'star'
zipcodes = ['02134', '02138']
products = ['milk', 'egg']

for zipcode in zipcodes:
    for product in products:
        scraping(zipcode, product, store)







