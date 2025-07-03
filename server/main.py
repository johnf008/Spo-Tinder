from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')
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