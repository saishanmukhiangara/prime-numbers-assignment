from flask import Flask, Response, jsonify
from flask_cors import CORS
from controllers.questionController import q1_stream, q2, q3, q4, q5, q6, q7

app = Flask(__name__)
CORS(app)  # Allow React frontend to fetch

# SSE endpoint for Q1
@app.route("/api/q1/stream")
def api_q1_stream():
    return Response(q1_stream(), mimetype="text/event-stream")

@app.route("/api/q2")
def api_q2(): 
    return jsonify(q2())

@app.route("/api/q3")
def api_q3(): 
    return jsonify(q3())

@app.route("/api/q4")
def api_q4(): return jsonify(q4())
@app.route("/api/q5")
def api_q5(): return jsonify(q5())
@app.route("/api/q6")
def api_q6(): return jsonify(q6())
@app.route("/api/q7")
def api_q7(): return jsonify(q7())

if __name__ == "__main__":
    app.run(debug=True)
