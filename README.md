
# Django Chess Game

## Description
This is a web application that allows users to play chess against an AI opponent. The app is built using Django for the backend and React for the frontend.

## Setup Instructions

### Prerequisites
- Python (3.6+)
- Node.js and npm
- Django
- React

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/BLANCO-11/django-react-chess.git
   ```

2. Navigate to the project directory:
   ```bash
   cd mydjangoapp
   ```

3. Create and activate a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate   # On Windows, use venv\Scripts\activate.bat
   ```

4. Install Django and other dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### FOR REACT FILES
5. Navigate to the frontend directory `react-chess-game` and install dependencies:
   ```bash   
   npm install
   ```

6. Start the Django development server and start playing on 8000 port:
   ```bash
   python manage.py runserver
   ```

### FOR REACT DEBUG(OPTIONAL)
7. In a separate terminal, start the React development server:
   ```bash
   cd frontend
   npm start
   ```

8. Open your browser and navigate to `http://localhost:8000` to view the app.

### Configuration
- The Django backend uses SQLite by default. You can configure the database settings in `settings.py` for other databases like PostgreSQL or MySQL.
- CORS (Cross-Origin Resource Sharing) settings are configured in `settings.py` to allow requests from the React frontend. Adjust these settings based on your environment.

## Usage
- Register or log in to start a new game.
- Play chess against the AI opponent.
- View your game history and results.

