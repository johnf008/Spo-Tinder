from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='client/.env')
dont_look = os.getenv("VITE_REALLY_DONT_LOOK")

service = Service(executable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)

driver.get("https://developer.spotify.com/")
driver.implicitly_wait(3)

login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Log in')]")

print("LOGIN BUTTON: " + str(login_button))
driver.implicitly_wait(3)

driver.execute_script("arguments[0].click();", login_button)
driver.implicitly_wait(8)

email_box = driver.find_element(By.ID, "login-username")


email_box.send_keys(dont_look)
time.sleep(4)

driver.quit()