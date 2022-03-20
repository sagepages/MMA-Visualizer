# MMA-Visualizer

### Application Link

[MMA-Visualizer](https://comparefighters.herokuapp.com)

### Description

This project was created to visualize the top 15 fighters from each divisions various statistical differences using a radar chart. 

### Technoloy and Methodology

To gather the information needed for the project, **Python** and **Selenium** were used to scrape from various sites and pipe the information over to a **PostgreSQL** database. The python script is run on a server that uses cron jobs to update the database twenty four hours after a UFC event. The API was developed with **Express.js** and the frontend with **React**.
