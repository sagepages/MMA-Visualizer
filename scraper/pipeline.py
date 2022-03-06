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
                                SLpm decimal(5,2),
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
        return

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
    pipeline.cur.close()
    pipeline.conn.close()