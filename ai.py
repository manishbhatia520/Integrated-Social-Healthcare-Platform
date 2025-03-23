from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Replace with your actual OpenAI API key
openai.api_key = 'YOUR_OPENAI_API_KEY'


hospital_data = {
    "400001": ["GT Hospital, Mumbai", "JJ Hospital, Mumbai"],
    "411001": ["Sassoon General Hospital, Pune", "King Edward Memorial Hospital, Pune"],
    "415521": ["Gore Memorial Hospital", "Sai Clinic", "Primary Health Center, Malkapur"]
}

@app.route('/ai', methods=['POST'])
def get_ai_response():
    data = request.get_json()
    message = data['message']

    try:
        completion = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful AI health assistant."},
                {"role": "user", "content": message}
            ]
        )
        response = completion.choices[0].message['content']
        return jsonify({'response': response})
    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return jsonify({'response': "I'm sorry, I encountered an error. Please try again later."})


@app.route('/hospitals', methods=['POST'])
def get_hospitals():
    data = request.get_json()
    pincode = data['pincode']

    if pincode in hospital_data:
        hospitals = hospital_data[pincode]
        return jsonify({'hospitals': hospitals})
    else:
        return jsonify({'hospitals': []})


if __name__ == '__main__':
    app.run(debug=True)
