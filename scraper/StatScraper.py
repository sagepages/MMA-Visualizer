import json
import time
from decouple import config
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

class StatScraper:
    def Scrape_stats(fighter_object):

        options = Options()
        options.add_argument("--headless")
        
        url = "http://ufcstats.com/statistics/fighters"

        driver_service = Service(config("WEBDRIVER_ADDRESS"))

        scraper = webdriver.Chrome(service=driver_service, options=options)
        scraper.get(url)

        time.sleep(1)

        input_field = scraper.find_element(By.TAG_NAME, "input")

        lname_arr = fighter_object["Name"].split()
        lname = lname_arr[1]
        input_field.send_keys(lname)

        button = scraper.find_element(By.CLASS_NAME, "b-statistics__search-btn")
        button.click()

        time.sleep(1)    

        tbody = scraper.find_element(By.TAG_NAME, "tbody")
        tr_rows = tbody.find_elements(By.TAG_NAME, "tr")
        a_tag = tr_rows[1].find_element(By.TAG_NAME, "a")
        a_tag.click()

        time.sleep(1)

        li_list = scraper.find_elements(By.TAG_NAME, "li")
        # height
        height_holder = li_list[3].text
        print(height_holder[8:len(height_holder) - 1]) 
        # weight
        weight_holder = li_list[4].text
        print(weight_holder[8:len(weight_holder) - 4]) 
        # reach
        reach_holder = li_list[5].text
        print(reach_holder[7:]) 
        # stance
        stance_holder = li_list[6].text
        print(stance_holder[8:]) 
        # SLpm
        slpm_holder = li_list[8].text
        print(slpm_holder[6:])
        # StrAcc
        stracc_holder = li_list[9].text
        print(stracc_holder[11:13])
        # SApM
        sapm_holder = li_list[10].text
        print(sapm_holder[6:])
        # StrDef
        strdef_holder = li_list[11].text
        print(strdef_holder[10:12])
        # TDAvg
        tdavg_holder = li_list[13].text
        print(tdavg_holder[9:])
        # TDAcc
        tdacc_holder = li_list[14].text
        print(tdacc_holder[9:11])
        # TDDef
        tddef_holder = li_list[15].text
        print(tddef_holder[9:11])
        # SubAvg
        subavg_holder = li_list[16].text
        print(subavg_holder[11:])

if __name__ == "__main__":
    ss = StatScraper()
    ss.Scrape_stats({"Name": "Jorge Masvidal", "Division": "Welterweight"})


