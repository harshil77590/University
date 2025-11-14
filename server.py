from flask import Flask, request, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/submit-lead', methods=['POST'])
def submit_lead():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Log the received data (in a real app, you'd save to database)
        print("Lead form submitted:", json.dumps(data, indent=2))

        # Return success response
        return jsonify({
            'success': True,
            'message': 'Lead submitted successfully'
        }), 200

    except Exception as e:
        print(f"Error processing lead: {e}")
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/submit-application', methods=['POST'])
def submit_application():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No data provided'}), 400

        # Log the received data (in a real app, you'd save to database)
        print("Application form submitted:", json.dumps(data, indent=2))

        # Return success response
        return jsonify({
            'success': True,
            'message': 'Application submitted successfully'
        }), 200

    except Exception as e:
        print(f"Error processing application: {e}")
        return jsonify({'error': 'Internal server error'}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
