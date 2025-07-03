from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path='client/.env')

dont_look = os.getenv("VITE_REALLY_DONT_LOOK")
stop_snoopin = os.getenv("VITE_STOP_SNOOPING")

service = Service(executable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)

driver.get("https://developer.spotify.com/")
driver.implicitly_wait(3)

login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Log in')]")
driver.implicitly_wait(3)

driver.execute_script("arguments[0].click();", login_button)
driver.implicitly_wait(8)

email_box = driver.find_element(By.ID, "login-username")


email_box.send_keys(dont_look + Keys.ENTER)
driver.implicitly_wait(8)

login_pass = driver.find_element(By.XPATH, "//button[contains(text(), 'Log in with a password')]")
driver.execute_script("arguments[0].click();", login_pass)

login_pass_enter = driver.find_element(By.ID, "login-password")
login_pass_enter.send_keys(stop_snoopin + Keys.ENTER)
time.sleep(6)
driver.get("https://developer.spotify.com/dashboard/664b034e2d7048968f214e27966b777c/users")

full_name_box = driver.find_element(By.ID, "name")
full_name_box.send_keys("Jessie Cantu")

time.sleep(6)

driver.quit()