from unidecode import unidecode
from decouple import config
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import Select
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options

class WikiCrawler:


    def __init__(self):
    
        self.fighter_arr = []
        self.division_arr = []

    def crawl(self):

        
        options = Options()
        options.add_argument("--headless")

        url = "https://en.wikipedia.org/wiki/UFC_Rankings"

        driver_service = Service(config("WEBDRIVER_ADDRESS"))

        scraper = webdriver.Chrome(service=driver_service, options=options)

        scraper.get(url)

        
        wikitables = scraper.find_elements(By.CLASS_NAME, "wikitable")

        division_rows = scraper.find_elements(By.CLASS_NAME, "mw-headline")
        for i in range(3, len(division_rows) - 3):
            self.division_arr.append(division_rows[i].text)

        for i in range(3, len(wikitables)):
            
            tr_rows = wikitables[i].find_elements(By.TAG_NAME, "tr")
            for j in range(2, len(tr_rows)):
                td_rows = tr_rows[j].find_elements(By.TAG_NAME, "td")
                try:
                    name = td_rows[1].find_element(By.TAG_NAME, "a").text
                except:
                    name = td_rows[1].text
                self.fighter_arr.append(name)
        
    def build_list(self):

        stop = 16
        start = 0
        built_list = []
        for i in range(len(self.division_arr)):
            for j in range(start, stop):
                fighter_json = dict()
                fighter_json["name"] = unidecode(self.fighter_arr[j])
                fighter_json["division"] = self.division_arr[i]
                built_list.append(fighter_json)  

            start += 16
            stop += 16
            
        print("FighterScraper.py file has completed scraping.")
        return built_list

if __name__ == "__main__":
    crawler = WikiCrawler()
    crawler.crawl()
    result = crawler.build_list()
    for i in range(len(result)):
        print(result[i])