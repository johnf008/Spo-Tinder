from flask import Flask, jsonify, request
from flask_cors import CORS

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import time
import os
from dotenv import load_dotenv

app = Flask(__name__)
cors = CORS(app, origins='*')
#commenting this function bc im gonna get lost if i don't look at it in after a few days
def selenium_task():

    path = os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env')
    load_dotenv(dotenv_path=path)

    dont_look = os.getenv("VITE_REALLY_DONT_LOOK")
    stop_snoopin = os.getenv("VITE_STOP_SNOOPING")

    service = Service(executable_path="chromedriver.exe")
    driver = webdriver.Chrome(service=service)

    #Go to the dev page
    driver.get("https://developer.spotify.com/")
    driver.implicitly_wait(3)

    #find login button
    login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Log in')]")
    driver.implicitly_wait(3)

    #click login button
    driver.execute_script("arguments[0].click();", login_button)
    driver.implicitly_wait(8)

    #find email entry
    email_box = driver.find_element(By.ID, "login-username")

    #enter email into email entry
    email_box.send_keys(dont_look + Keys.ENTER)
    driver.implicitly_wait(8)

    #find redirect to pass
    login_pass = driver.find_element(By.XPATH, "//button[contains(text(), 'Log in with a password')]")
    driver.execute_script("arguments[0].click();", login_pass)

    #find pass entry
    login_pass_enter = driver.find_element(By.ID, "login-password")

    #enter
    login_pass_enter.send_keys(stop_snoopin + Keys.ENTER)
    time.sleep(6)

    #immideately redirect to spo-tinder user management
    driver.get("https://developer.spotify.com/dashboard/664b034e2d7048968f214e27966b777c/users")

    #enter details forname
    full_name_box = driver.find_element(By.ID, "name")
    full_name_box.send_keys("Jessie Cantu")
    driver.implicitly_wait(4)

    #enter detais for email & send
    full_email_box = driver.find_element(By.ID, "email")
    full_email_box.send_keys("john.flores.h987@gmail.com" + Keys.ENTER)

    #verify & end
    time.sleep(10)
    driver.quit()

@app.route("/api/data", methods=['POST'])
def data():
    data = request.get_json()
    if data:
        print(f"We got the data: {data}")
        return jsonify(
            {
                "Message" : "Data Recieved",
                "Data" : data
            }
        )
    return jsonify({"Message" : "No data"}), 400

if __name__ == "__main__":
    app.run(debug=True, port=8080)