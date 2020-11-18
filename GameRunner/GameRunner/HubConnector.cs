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
                    .WithUrl(connection)
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

        public void OnConnected()
        {
            Connection.On<GameState>("GameInitiated", (currentState) =>
            {
                var generation = Calculator.CalculateNextState(currentState);

                var nextState = new GameState()
                {
                    Generation = generation,
                    ReactConnectionId = currentState.ReactConnectionId,
                    RunnerConnectionId = currentState.RunnerConnectionId,
                };

                Client.UpdateGame(nextState);
            });
        }
    }
}
