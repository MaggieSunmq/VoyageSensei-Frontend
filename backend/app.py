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

@app.route('/api/process_message', methods=['POST'])
def process_message():
    data = request.json
    message = data.get('message')
    # Run your recommendation/planning algorithm with the message
    # For example, you could call a function like:
    #respose_data = run_recommender_algorithm(message)
    # Placeholder response for now
    response_data = message
    return jsonify({'summary':response_data })

@app.route('/api/itinerary', methods=['GET'])
def itinerary():
    # Define the starting point with coordinates
    starting_point = {
        # "name": "21 Carlton Street",
        # "description": "Starting and ending point of the itinerary.",
        # "location": "21 Carlton St, Toronto, ON M5B 1L3",
        # "coords": [43.6611027, -79.382106]  # Ensure valid latitude, longitude
        "name": "The Berwick",
        "description": " ",
        "location": "60 Berwick Avenue, Toronto, ON M5P 0A3",
        "coords": [43.7045, -79.3990]
    }
    pois = [
        {
        "name": "Evergreen Brick Works",
        "description": "An environmental community center in a reclaimed brick factory, featuring trails, gardens, markets, and events focused on sustainability.",
        "location": "550 Bayview Ave, Toronto, ON M4W 3X8",
        "coords": [43.6840, -79.3649]
        },
        {
        "name": "Distillery District",
        "description": "A historic district with Victorian industrial architecture, offering a vibrant mix of boutiques, galleries, artisanal shops, and eateries.",
        "location": "55 Mill St, Toronto, ON M5A 3C4",
        "coords": [43.6503, -79.3596]
        },
        {
        "name": "St. Lawrence Market",
        "description": "A bustling market offering fresh produce, specialty foods, and local delicacies, located in the heart of Toronto’s Old Town.",
        "location": "93 Front St E, Toronto, ON M5E 1C3",
        "coords": [43.6490, -79.3716]
        },
        {
            "name": "Jack Layton Ferry Terminal - Toronto island",
            "description": "The main departure point for ferries to the Toronto Islands, providing year-round service to Centre Island, Hanlan's Point, and Ward's Island.",
            "location": "9 Queens Quay W, Toronto, ON M5J 2H3",
            "coords": [43.6405, -79.3762]
        },
        {
        "name": "Kensington Market",
        "description": "A vibrant neighborhood known for its diverse range of shops, street art, and international food options, offering a unique bohemian atmosphere.",
        "location": "Kensington Market, Toronto, ON",
        "coords": [43.6546, -79.4023]
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

