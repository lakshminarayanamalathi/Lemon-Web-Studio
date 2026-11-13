
import os
import smtplib
from email.message import EmailMessage

from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)

app.config["MAX_CONTENT_LENGTH"] = 16 * 1024

# Website permissions
allowed_origins = os.environ.get(
    "ALLOWED_ORIGINS", "*"
).split(",")

CORS(
    app,
    resources={
        r"/api/*": {
            "origins": allowed_origins
        }
    }
)


@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "name": "LEMON WEB STUDIO"
    })


@app.route("/api/enquiry", methods=["POST"])
def enquiry():

    data = request.get_json(silent=True) or {}

    name = str(data.get("name", "")).strip()
    project = str(data.get("project", "")).strip()
    budget = str(data.get("budget", "")).strip()
    message = str(data.get("message", "")).strip()

    # Validate form
    if not name or not project or not message:
        return jsonify({
            "error": "Please complete all required fields."
        }), 400

    if (
        len(name) > 60
        or len(project) > 100
        or len(budget) > 100
        or len(message) > 1000
    ):
        return jsonify({
            "error": "Some fields are too long."
        }), 400

    # Private email settings
    recipient = os.environ.get("ENQUIRY_EMAIL")
    sender = os.environ.get("SMTP_EMAIL")
    password = os.environ.get("SMTP_APP_PASSWORD")

    if not recipient or not sender or not password:
        return jsonify({
            "error": "Email service is not configured."
        }), 503

    # Create email
    email = EmailMessage()

    email["Subject"] = "New LEMON WEB STUDIO Enquiry"
    email["From"] = sender
    email["To"] = recipient

    email.set_content(
        f"""
NEW LEMON WEB STUDIO ENQUIRY

Name: {name}

Website type: {project}

Package: {budget}

Message:

{message}
"""
    )

    # Send email
    try:
        with smtplib.SMTP_SSL(
            "smtp.gmail.com",
            465,
            timeout=20
        ) as smtp:

            smtp.login(sender, password)
            smtp.send_message(email)

        return jsonify({
            "message": "Your enquiry was sent successfully!"
        }), 200

    except (smtplib.SMTPException, OSError):
        app.logger.exception("Email delivery failed.")

        return jsonify({
            "error": "Email could not be sent. Please try again."
        }), 502


if __name__ == "__main__":

    port = int(os.environ.get("PORT", 8000))

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False
    )
