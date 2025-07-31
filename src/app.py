from flask import Flask, request, send_file, jsonify
from image_generator import generate_image

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()
        problem_type = data.get("problem_type")
        variables = data.get("variables", {})
        question = data.get("question", "")

        buf = generate_image(problem_type, variables, question)

        return send_file(buf, mimetype='image/png')

    except Exception as e:
        print("❌ Error:", e)  # ← エラー表示しておく
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
