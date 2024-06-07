# frontend/urls.py

from django.urls import path
from .views import index, create_game_history, recent_games, update_game_history

urlpatterns = [
    path('', index, name='index'),
    path('api/create_game_history/', create_game_history, name='create_game_history'),
    path('api/recent_games/', recent_games, name='recent_games'),
    path('api/update_game_history/<int:game_id>/', update_game_history, name='update_game_history'),
]
