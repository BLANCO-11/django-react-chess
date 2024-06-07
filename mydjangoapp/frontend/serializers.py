from rest_framework import serializers
from .models import Player, GameHistory

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ['id', 'user', 'wins', 'draws', 'losses']
        read_only_fields = ['user']


class DateOnlyField(serializers.ReadOnlyField):
    def to_representation(self, value):
        return value.date()

class GameHistorySerializer(serializers.ModelSerializer):
    player_username = serializers.SerializerMethodField()
    game_id = serializers.IntegerField(source='id')
    result = serializers.CharField(source='game_result')
    game_date = DateOnlyField()
    
    class Meta:
        model = GameHistory
        fields = ['game_id', 'player_username', 'color', 'result', 'game_date']

    def get_player_username(self, obj):
        return obj.player.user.username