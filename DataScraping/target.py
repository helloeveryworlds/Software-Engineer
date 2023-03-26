

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
   
    url = f'https://www.target.com/s?searchTerm={product}'
    
    driver = webdriver.Chrome()
    driver.get(url)
    
    sleep(2)
    click(driver, By.ID, 'web-store-id-msg-btn', 2)
    bar = driver.find_element(By.ID, 'zip-or-city-state')
    bar.send_keys(zipcode)
    sleep(2)
    try:
        click(driver, By.XPATH, '/html/body/div[23]/div/div/div[2]/div/div[1]/div/div[3]/div[2]/button') 
        click(driver, By.XPATH, '/html/body/div[23]/div/div/div[2]/div/div[3]/div[2]/div[1]/button')
    except:
        click(driver, By.XPATH, '/html/body/div[22]/div/div/div[2]/div/div[1]/div/div[3]/div[2]/button') 
        click(driver, By.XPATH, '/html/body/div[22]/div/div/div[2]/div/div[3]/div[2]/div[1]/button')
    click(driver, By.ID, 'search')
    # change zip # enter zip code # search # select store # click
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    
    tags = soup.find_all('div', class_='styles__StyledCol-sc-fw90uk-0 fPNzT')
    items= []
    
    for i, tag in enumerate(tags[:]):
        try:
            
            driver_tmp = webdriver.Chrome()
            driver_tmp.get('https://www.target.com'+ tag.div.div.div.h3.a['href'])
            sleep(4)
            
            soup_tmp = BeautifulSoup(driver_tmp.find_element(By.ID, 'pageBodyContainer').get_attribute('outerHTML'), 'html.parser')
            main_content = soup_tmp.div
            
            name = main_content.div.h1.text
            
            main_content = main_content.find('div', class_='styles__GalleryAndAddToCartWrapper-sc-2vujr8-3 edRGzK')
            pic = main_content.div.div.section.div.button.div.div.div.picture.img['src']
            
            price = main_content.find('div', class_='styles__StyledSecondColumn-sc-y0ahq4-2 fgJgHt h-padding-h-default').div.div.div.span.span.text
            
            unit_price = 'None'
            
            rating = 'None'
            
            driver_tmp.close()
            
            item = {"pic-url": pic, "price": price, "name": name, "unit-price":unit_price , "rating": rating}
            items.append(item)
            
            if printinfo:
                print(i)
                print(' pics, price, name, unit-price')
                print(pic, price, name, sep='\n')
                print()
        except Exception as e:
            print("ERROR : ", e)
            continue
    driver.close()
    
    out_path = f'results/{store}/'
    with open(out_path+f'{zipcode}_{product}.json', 'w') as f:
        f.write('[')
        for item in items[:-1]:
            f.write(json.dumps(item))
            f.write(',\n')
        f.write(json.dumps(items[-1]))
        f.write(']')
        print(f'{store}  {zipcode}  {product} finished  total:', len(items))


store = 'target'
zipcodes = ['02134', '02148']
products = ['milk', 'egg']

for zipcode in zipcodes[:2]:
    for product in products[:1]:
        scraping(zipcode, product, store)








