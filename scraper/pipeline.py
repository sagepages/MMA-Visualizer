import os
import psycopg2
import StatScraper
import FighterScraper
from decouple import config

class Pipeline:

    def __init__(self):
        self.conn = psycopg2.connect(
                host=config("HOST"),
                database=config("DATABASE"),
                user=config("USER"),
                password=config("PASSWORD"))

        self.cur = self.conn.cursor()
    
    
    def drop_existing_table(self):
        self.cur.execute("DROP TABLE fighters")
        self.conn.commit()
        print("Existing table has been dropped.")

    def create_new_table(self):
        self.cur.execute(""" create table Fighters (
                                fid serial UNIQUE Primary Key,
                                fname varchar(20),
                                lname varchar(20),
                                wins int,
                                loses int,
                                tieORdq int,
                                height varchar(5),
                                division varchar(30),
                                reach varchar(5),
                                stance varchar(15),
                                SLpM decimal(5,2),
                                StrAcc decimal(5,2),
                                StrDef decimal(5,2),
                                SApM decimal(5,2),
                                TDAvg decimal(5,2),
                                TDDef decimal(5,2),
                                TDAcc decimal(5,2),
                                SubAvg decimal(5,2)
                    ); """)
        self.conn.commit()
        print("New Fighters table has been created.")

    def insert_data(self, fighter_object):

        statement = """ 
        INSERT INTO fighters 
        Values(DEFAULT, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) 
        """

        self.cur.execute(statement, (fighter_object["fname"], fighter_object["lname"], fighter_object["wins"], 
        fighter_object["loses"], fighter_object["tieORdq"], fighter_object["height"], fighter_object["division"],
        fighter_object["reach"], fighter_object["stance"], fighter_object["SLpM"], fighter_object["StrAcc"], fighter_object["StrDef"], 
        fighter_object["SApM"], fighter_object["TDAvg"], fighter_object["TDDef"], fighter_object["TDAcc"], fighter_object["SubAvg"]))

        self.conn.commit()


    def execute_test(self):
        print("PostgreSQL database Version: ")
        self.cur.execute("SELECT version()")
        db_version = self.cur.fetchone()
        print(db_version)

if __name__ == "__main__":
    pipeline = Pipeline()
    # pipeline.drop_existing_table()
    # pipeline.create_new_table()
    # pipeline.execute_test()

    # test fighter object
    test = {

            "fid": 1,
            "fname": "Jorge",
            "lname" : "Masvidal",
            "wins": 35,
            "loses": 14,
            "tieORdq": 0,
            "height": "5' 11",
            "division": "Welterweight",
            "reach": "70",
            "stance": "Orthodox",
            "SLpM" : 4.22,
            "StrAcc": 4.22,
            "StrDef": 48.0,
            "SApM": 3.01,
            "TDAvg": 1.54,
            "TDDef": 59.0,
            "TDAcc": 75.0,
            "SubAvg": 0.3
    }
    pipeline.insert_data(test)
    pipeline.cur.close()
    pipeline.conn.close()