import time
from decouple import config
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

class StatScraper:

    def __init__(self):
        self.temp = 0
    
    def combine_nc_and_tiedq(self, input):
        temp = input.split("(")
        final = int(temp[0]) + int(temp[1][0])
        return str(final)


    def Scrape_stats(self, fighter_object):

        # comment out lines 22, 23, 29 and uncomment line 30 for browser mode.
        options = Options()
        options.add_argument("--headless")
        
        url = "http://ufcstats.com/statistics/fighters"

        driver_service = Service(config("WEBDRIVER_ADDRESS"))

        scraper = webdriver.Chrome(service=driver_service, options=options)
        # scraper = webdriver.Chrome(service=driver_service)

        scraper.get(url)

        time.sleep(1)

        input_field = scraper.find_element(By.TAG_NAME, "input")

        lname_arr = fighter_object["name"].split()
        lname = lname_arr[1]
        input_field.send_keys(lname)

        button = scraper.find_element(By.CLASS_NAME, "b-statistics__search-btn")
        button.click()

        time.sleep(1)    

        tbody = scraper.find_element(By.TAG_NAME, "tbody")
        tr_rows = tbody.find_elements(By.TAG_NAME, "tr")
        print(fighter_object)
        try:
            for i in range(1, len(tr_rows)):
                name_link = tr_rows[i].find_element(By.TAG_NAME, "a")
                name = name_link.text
                if lname_arr[0] in name:
                    a_tag = name_link
                    break
            a_tag.click()

        except UnboundLocalError:

            try:
            #   if lastname search didn't work, use first name.
                input_field = scraper.find_element(By.TAG_NAME, "input")

                lname_arr = fighter_object["name"].split()
                fname = lname_arr[0]
                input_field.clear()
                input_field.send_keys(fname)
                
                button = scraper.find_element(By.CLASS_NAME, "b-statistics__search-btn")
                button.click()

                time.sleep(1)    

                tbody = scraper.find_element(By.TAG_NAME, "tbody")
                tr_rows = tbody.find_elements(By.TAG_NAME, "tr")
                td_rows = tr_rows[1].find_elements(By.TAG_NAME, "td")
                a_tag = td_rows[1].find_element(By.TAG_NAME, "a")
                a_tag.click()

            except:
                input_field = scraper.find_element(By.TAG_NAME, "input")

                lname_arr = fighter_object["name"].split()
                lname = lname_arr[1]
                input_field.clear()
                input_field.send_keys(lname)

                button = scraper.find_element(By.CLASS_NAME, "b-statistics__search-btn")
                button.click()

                time.sleep(1)

                tbody = scraper.find_element(By.TAG_NAME, "tbody")
                tr_rows = tbody.find_elements(By.TAG_NAME, "tr")
                td_rows = tr_rows[1].find_elements(By.TAG_NAME, "td")
                a_tag = td_rows[1].find_element(By.TAG_NAME, "a")
                a_tag.click()
        

        time.sleep(1)

        li_list = scraper.find_elements(By.TAG_NAME, "li")

        new_fighter = dict()

        new_fighter["fname"] = lname_arr[0]
        new_fighter["lname"] = lname_arr[1]
        new_fighter["division"] = fighter_object["division"]

        record_holder = scraper.find_element(By.CLASS_NAME, "b-content__title-record").text
        record_string = record_holder.split(":")

        # holds wins[0], loses[1], tieORdq[2]
        record_arr = record_string[1].split("-")

        #wins
        new_fighter["wins"] = record_arr[0].strip()
        #loses
        new_fighter["loses"] = record_arr[1]
        #tieORdq
        if(len(record_arr[2]) > 2):
            tieordq_holder = self.combine_nc_and_tiedq(record_arr[2])
        else:
            tieordq_holder = record_arr[2]
        new_fighter["tieORdq"] = tieordq_holder
        # height
        height_holder = li_list[3].text
        new_fighter["height"] = height_holder[8:len(height_holder) - 1] 
        # weight
        weight_holder = li_list[4].text
        new_fighter["weight"] = weight_holder[8:-4]
        # reach
        reach_holder = li_list[5].text
        new_fighter["reach"] = reach_holder[7:] 
        # stance
        stance_holder = li_list[6].text
        new_fighter["stance"] = stance_holder[8:] 
        # SLpM
        slpm_holder = li_list[8].text
        new_fighter["SLpM"] = slpm_holder[6:]
        # StrAcc
        stracc_holder = li_list[9].text
        new_fighter["StrAcc"] = stracc_holder[11:-1]
        # SApM
        sapm_holder = li_list[10].text
        new_fighter["SApM"] = sapm_holder[6:]
        # StrDef
        strdef_holder = li_list[11].text
        new_fighter["StrDef"] = strdef_holder[10:-1]
        # TDAvg
        tdavg_holder = li_list[13].text
        new_fighter["TDAvg"] = tdavg_holder[9:]
        # TDAcc
        tdacc_holder = li_list[14].text
        new_fighter["TDAcc"] = tdacc_holder[9:-1]
        # TDDef
        tddef_holder = li_list[15].text
        new_fighter["TDDef"] = tddef_holder[9:-1]
        # SubAvg
        subavg_holder = li_list[16].text
        new_fighter["SubAvg"] = subavg_holder[11:]

        return new_fighter

if __name__ == "__main__":
    ss = StatScraper()
    test1 = {'name': 'T.J. Dillashaw', 'division': 'Bantamweight'}
    test2 = {'name': 'Brianna Fortino', 'division': "Women's Strawweight"}
    test3 = {'name': 'Charles Oliveira', 'division': 'Lightweight'}
    print(ss.Scrape_stats(test1))
    print(ss.Scrape_stats(test2))
    print(ss.Scrape_stats(test3))



