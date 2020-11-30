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

        public HubConnector(string hubUrl, string apiUrl)
        {
            Connection = new HubConnectionBuilder()
                    .WithUrl(hubUrl + "/Progress")
                    .Build();

            Calculator = new GameStateCalculator();
            Client = new Client(apiUrl);
        }

        public void OnClosed()
        {
            Connection.Closed += async (error) =>
            {
                await Task.Delay(new Random().Next(0, 5) * 1000);
                await Connection.StartAsync();
            };
        }

        public GameState CalculateNextState(GameState currentState)
        {
            Console.WriteLine("GameState Received");
            var nextState = Calculator.CalculateNextState(currentState);
            Client.UpdateGame(nextState);
            Console.WriteLine("GameState Sent");
            return nextState;
        }
    }
}
