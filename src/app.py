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
    if request.method == "POST":
        text = request.form["question"]
        values = extract_values(text)
        return render_template("visualize.html", **values)
    return '''
        <form method="post">
            <textarea name="question" rows="4" cols="50" placeholder="問題文を入力してください"></textarea><br>
            <button type="submit">送信</button>
        </form>
    '''

if __name__ == '__main__':
    app.run(debug=True)
