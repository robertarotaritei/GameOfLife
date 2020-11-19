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

        public HubConnector(string connection)
        {
            Connection = new HubConnectionBuilder()
                    .WithUrl(connection + "/Progress")
                    .Build();

            Calculator = new GameStateCalculator();
            Client = new Client(connection);
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
            var nextState = Calculator.CalculateNextState(currentState);
            Client.UpdateGame(nextState);

            return nextState;
        }
    }
}
