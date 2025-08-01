from flask import Flask, request, render_template
import re

app = Flask(__name__)

def extract_values(text):
    speed = re.search(r'時速(\d+(?:\.\d+)?)', text)
    time = re.search(r'(\d+(?:\.\d+)?)時間', text)
    distance = re.search(r'(\d+(?:\.\d+)?)km', text)

    if '何km' in text or '何キロ' in text:
        distance_value = None
    else:
        distance_value = float(distance.group(1)) if distance else None

    return {
        "speed": float(speed.group(1)) if speed else None,
        "time": float(time.group(1)) if time else None,
        "distance": distance_value
    }

@app.route("/", methods=["GET", "POST"])
def index():
    values = {"speed": None, "time": None, "distance": None}
    question = ""
    if request.method == "POST":
        question = request.form["question"]
        values = extract_values(question)
    return render_template("visualize.html", question=question, **values)

if __name__ == "__main__":
    app.run(debug=True)
