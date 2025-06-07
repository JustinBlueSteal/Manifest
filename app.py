import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home():
    summary = {
        'Manifest Name': 'Example Manifest',
        'Total Items': 123,
        'Total Retail Value': 10000.0,
        'Profit Potential': 4250.50,
        'Max Bid Recommendation': 1550.0
    }
    return render_template("result.html", summary=summary)

@app.route("/analysis")
def analysis():
    return render_template("analysis.html")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
