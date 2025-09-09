# Numerical Methods Backend

This project is a Flask-based backend for advanced number theory computations, including Kaprekar-like numbers, repunit primes, Mersenne primes, Brocard's conjecture, palindromic primes, perfect numbers, and Goldbach pairs.

## How to Run

1. **Clone or download the repository.**
2. **Navigate to the project directory:**
   ```sh
   cd backend
   ```
3. **Install all dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
4. **Start the Flask server:**
   ```sh
   python app.py
   ```
5. **Access API endpoints:**
   - Kaprekar-like numbers (SSE): `/api/q1/stream`
   - Repunit primes: `/api/q2`
   - Mersenne primes: `/api/q3`
   - Brocard's conjecture: `/api/q4`
   - Palindromic primes: `/api/q5`
   - Perfect numbers: `/api/q6`
   - Goldbach pairs: `/api/q7`

## Dependencies
All dependencies are listed in `requirements.txt`:
- Flask
- flask-cors
- gmpy2
- sympy
- blinker
- click
- itsdangerous
- Jinja2
- MarkupSafe
- Werkzeug

Install them with:
```sh
pip install -r requirements.txt
```

## File Structure
- `app.py` — Main Flask application and API endpoints
- `controllers/questionController.py` — Mathematical logic for all endpoints
- `requirements.txt` — Python dependencies

## Notes
- Make sure you have Python 3.8+ installed.
- For large number computations, the backend may take time to respond.
- The SSE endpoint (`/api/q1/stream`) streams results for Kaprekar-like numbers.

---
Feel free to reach out for any questions or improvements!
