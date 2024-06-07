**APIs Available:**

1. `/api/create_game_history/`: This API endpoint is used to create a new game history record. It receives a POST request with the player's username and color, and it creates a new game history entry with default game result 'No Result'.

2. `/api/update_game_history/{game_id}/`: This API endpoint is used to update an existing game history record. It receives a PUT request with the game ID and the new game result ('WIN', 'LOSS', or 'DRAW'). It updates the game history record with the specified ID and also updates the player's statistics based on the result.

3. `/api/recent_games/`: This API endpoint is used to fetch the list of recent games. It returns a list of game history records sorted by the game date in descending order, limited to the last 10 games.

**Game Objects Involved:**

1. `GameHistory`: This model represents a record of a game, including the player, color, game result, and game date. Each game history record is associated with a player and stores information about a single game.

2. `Player`: This model represents a player in the game. It stores the player's username and statistics such as wins, draws, and losses. Each player can have multiple game history records associated with them.

**Performance Numbers:**

- Response Time: The response time of each API endpoint can vary based on the server's load and the complexity of the operations. Generally, the response time should be within a few hundred milliseconds for a single request.
- Throughput: The throughput of the APIs can be measured in terms of the number of requests processed per second. This can vary based on the server's capacity and the number of concurrent users.
- Latency: The latency of the APIs can be measured as the time taken for a request to reach the server and receive a response. Lower latency indicates better performance.

Overall, the performance of the APIs can be optimized by using efficient database queries, caching, and proper error handling. Regular monitoring and tuning of the server can help maintain optimal performance levels.