using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Threading.Tasks;

namespace GameRunner
{
    public class HubConnector
    {
        public HubConnection Connection { get; }
        public GameStateCalculator Calculator { get; }
        public Client Client { get;  }

        public HubConnector(string baseUrl)
        {
            Connection = new HubConnectionBuilder()
                    .WithUrl(baseUrl + "/Progress")
                    .Build();

            Calculator = new GameStateCalculator();
            Client = new Client(baseUrl);
        }

        public void OnClosed()
        {
            Connection.Closed += async (error) =>
            {
                Console.WriteLine("Connection lost");
                await Task.Delay(new Random().Next(0, 5) * 1000);
                await Connection.StartAsync();
            };
        }

        public GameInfo CalculateGameType(GameState currentState)
        {
            Console.WriteLine("GameState Received");
            var gameInfo = new GameInfo();
            gameInfo.Info = Calculator.CalculateGameType(currentState.Generation);
            gameInfo.ReactConnectionId = currentState.ReactConnectionId;
            Client.UpdateGame(gameInfo);
            Console.WriteLine("GameState Sent");
            return gameInfo;
        }
    }
}
