from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import time

service = Service(executable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)

driver.get("https://developer.spotify.com/")
driver.implicitly_wait(3)

login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Log in')]")

print("LOGIN BUTTON: " + str(login_button))
driver.implicitly_wait(3)

driver.execute_script("arguments[0].click();", login_button)
driver.implicitly_wait(3)

driver.quit()