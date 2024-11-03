from flask import Flask, jsonify,request
from flask_cors import CORS  # Import CORS


app = Flask(__name__)
CORS(app) 
# Define your routes as usual

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_message = data.get('message')
    bot_reply = f"Echo: {user_message}"  # Replace with actual chatbot logic
    return jsonify({'reply': bot_reply})

@app.route('/api/itinerary', methods=['GET'])
def itinerary():
    # Define the starting point with coordinates
    starting_point = {
        "name": "21 Carlton Street",
        "description": "Starting and ending point of the itinerary.",
        "location": "21 Carlton St, Toronto, ON M5B 1L3",
        "coords": [43.6611027, -79.382106]  # Ensure valid latitude, longitude
    }

    # Define points of interest with their respective coordinates
    pois = [
        {
            "name": "Casa Loma",
            "description": "A Gothic Revival style mansion and garden in midtown Toronto.",
            "location": "1 Austin Terrace, Toronto, ON M5R 1X8",
            "coords": [43.6780, -79.4094]  # Valid latitude, longitude
        },
        {
            "name": "Terroni on Queen St",
            "description": "An Italian restaurant offering traditional dishes in a cozy atmosphere.",
            "location": "720 Queen St W, Toronto, ON M6J 1E8",
            "coords": [43.6476, -79.4058]  # Valid latitude, longitude
        },
        {
            "name": "CN Tower",
            "description": "A 553.3 m-high concrete communications and observation tower.",
            "location": "290 Bremner Blvd, Toronto, ON M5V 3L9",
            "coords": [43.6426, -79.3871]  # Valid latitude, longitude
        }
    ]

    # Combine starting point and POIs into a single response structure
    itinerary = {
        "starting_point": starting_point,
        "pois": pois
    }
    return jsonify(itinerary)
if __name__ == '__main__':
    app.run(port=5000, debug=True)

