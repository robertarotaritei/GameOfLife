using Microsoft.AspNetCore.SignalR.Client;
using System;

namespace GameRunner
{
    public class Program
    {
        protected Program()
        {

        }

        static void Main()
        {
            var client = new Client();
            var hubConnector = new HubConnector();
            var calculator = new GameStateCalculator();
            hubConnector.OnClosed();
            hubConnector.Connection.On<GameState>("GameInitiated", (currentState) =>
            {

                var generation = calculator.CalculateNextState(currentState);

                var nextState = new GameState()
                {
                    Generation = generation,
                    ReactConnectionId = currentState.ReactConnectionId,
                    RunnerConnectionId = currentState.RunnerConnectionId,
                };

                client.UpdateGame(nextState);
            });

            try
            {
                hubConnector.Connection.StartAsync();
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
            }

            Console.Read();
            hubConnector.Connection.StopAsync();
        }
    }
}
