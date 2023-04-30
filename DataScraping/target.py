

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
    click(driver, By.XPATH, '/html/body/div[5]/div/div/div[2]/div[1]/div/div[2]/div[2]/button')
    click(driver, By.XPATH, '/html/body/div[5]/div/div/div[3]/button')
    # change zip # enter zip code # search # select store # click
    soup = BeautifulSoup(driver.page_source, 'html.parser')
    
    tags = soup.find_all('div', class_='styles__StyledCol-sc-fw90uk-0 fPNzT')
    items= []
    
    for i, tag in enumerate(tags[:]):
        try:
            
            div1 = tag.div.div.div.find('div', class_='ProductCardImageWrapper-sc-164r5os-0 styles__StyledProductCardImageWrapper-sc-9lksuw-1 bVqrgz byfgtU')
            driver_tmp = webdriver.Chrome()
            driver_tmp.get('https://www.target.com'+div1.h3.div.div.a['href'])
            main_content = BeautifulSoup(driver_tmp.page_source, 'html.parser')
            
            pic = main_content.find('div', class_='styles__ImageGalleryThumbnailWrapper-sc-mk2xp9-1 XmisB').button.div.div.div.picture.img['src']
            
            price = driver_tmp.find_element(By.XPATH, '//*[@id="pageBodyContainer"]/div[1]/div[2]/div[2]/div[1]/div').text.find('\n')[0]
            price = price.strip('$')
            
            name = main_content.find('div', class_='h-padding-h-default').h1.text
            
            driver_tmp.execute_script("window.scrollBy(0, 500);")
            click(driver_tmp, By.XPATH, '//*[@id="tabContent-tab-Details"]/div/button')
            infos = main_content.find('div', 'styles__StyledCol-sc-fw90uk-0 dFHUpo h-padding-h-tight').find_all('div')
            unit_price = ""
            unit = ""
            for info in infos:
                if 'Net weight' in info.text:
                    unit_price = info.text.split(': ')[1]
                    amount, unit_price = unit_price.split(' ')
                    if unit_price == 'Pound':
                        unit_price = float(price)/0.45/float(amount)
                        unit = "kg"
                    break
            
            driver_tmp.close()
            
            item = {"pic-url": pic, "price": price, "name": name, "unit-price":unit_price , "unit": unit}
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

for zipcode in zipcodes[:]:
    for product in products[:]:
        scraping(zipcode, product, store)


