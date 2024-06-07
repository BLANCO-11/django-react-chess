from django.db import models
from django.contrib.auth.models import User

class Player(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    wins = models.IntegerField(default=0)
    draws = models.IntegerField(default=0)
    losses = models.IntegerField(default=0)

    def __str__(self):
        return self.user.username

class GameHistory(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    game_result = models.CharField(max_length=50, default='No Result')
    color = models.CharField(max_length=10)
    game_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
