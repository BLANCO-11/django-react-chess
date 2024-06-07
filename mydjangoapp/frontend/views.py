from django.shortcuts import render
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import JSONRenderer
from .models import Player, GameHistory
from .serializers import GameHistorySerializer
from django.contrib.auth.models import User

@api_view(['POST'])
def create_game_history(request):
    # Get the username from the request data
    username = request.data.get('player_name')

    # Get or create the User instance with the given username
    user, created = User.objects.get_or_create(username=username)

    # Get or create the Player instance associated with the User
    player, _ = Player.objects.get_or_create(user=user)

    # Create a new GameHistory object
    game_history = GameHistory(player=player, color=request.data.get('color'))
    game_history.save()

    # Return the game_id in the response
    return Response({'game_id': game_history.id}, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
def update_game_history(request, game_id):
    try:
        game_history = GameHistory.objects.get(id=game_id)
    except GameHistory.DoesNotExist:
        return Response({'error': 'Game history not found'}, status=status.HTTP_404_NOT_FOUND)

    serializer = GameHistorySerializer(instance=game_history, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()

        # Update player data
        player = game_history.player
        game_result = request.data.get('result')
        if game_result == 'WIN':
            player.wins += 1
        elif game_result == 'DRAW':
            player.draws += 1
        else:
            player.losses += 1
        player.save()

        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@renderer_classes([JSONRenderer])
def recent_games(request):
    recent_games = GameHistory.objects.order_by('-game_date')[:10]
    serializer = GameHistorySerializer(recent_games, many=True)
    return Response(serializer.data)


def index(request):
    return render(request, 'index.html')
