# 🧠 Quiz App

A responsive web-based quiz/test platform built using HTML, CSS, JavaScript, and Bootstrap 5.

---

## 🚀 Features

- User login (hardcoded credentials)
- Create custom tests using JSON input
- Timer-based test interface
- Score display after submission
- Detailed answer analysis
- Retest or create new tests
- Fully responsive (desktop & mobile)

---

## 📝 JSON Format for Questions & Answers

To create a test, paste the following JSONs into the **"Create Test"** form on the dashboard:

### ✅ Questions JSON Format

This should be an **array of question objects**, where each object includes:

- `id`: Unique identifier (number)
- `question`: The question text (string)
- `options`: An object with four keys (`a`, `b`, `c`, `d`) representing answer options

```json
[
  {
    "id": 1,
    "question": "What is the capital of France?",
    "options": {
      "a": "Berlin",
      "b": "Madrid",
      "c": "Paris",
      "d": "Rome"
    }
  },
  {
    "id": 2,
    "question": "Which planet is known as the Red Planet?",
    "options": {
      "a": "Earth",
      "b": "Venus",
      "c": "Mars",
      "d": "Jupiter"
    }
  }
]
```

---

### ✅ Answers JSON Format

This should be a **single object** mapping each question `id` to its **correct option key** (`a`, `b`, `c`, or `d`).

```json
{
  "1": "c",
  "2": "c"
}
```

---

## 📂 Project Structure

```
quiz-app/
│
├── index.html           # Login Page
├── dashboard.html       # Test Creation
├── test.html            # Test Interface
├── result.html          # Results & Analysis
│
├── css/
│   └── styles.css       # Custom styles
│
├── js/
│   ├── auth.js          # Login logic
│   ├── dashboard.js     # Test creation logic
│   ├── test.js          # Test-taking logic
│   └── result.js        # Result & analysis logic
```

---

## 🔐 Login Credentials

- **Username**: `admin`
- **Password**: `satya@1234`

> Credentials are hardcoded in `js/auth.js`

---

## 🛠 Setup Instructions

1. Clone or download this repo
2. Open `index.html` in a browser
3. Log in and start testing!
