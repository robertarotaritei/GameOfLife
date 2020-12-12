using Microsoft.AspNetCore.SignalR.Client;
using System;

namespace GameRunner
{
    class Program
    {
        protected Program(){ }

        private static void Main()
        {
            string baseUrl = "https://activegamesapi.azurewebsites.net";
            var hubConnector = new HubConnector(baseUrl);

            hubConnector.OnClosed();
            hubConnector.Connection.On<GameState>("GameInitiated", (currentState) => { hubConnector.CalculateGameType(currentState); });
            try
            {
                hubConnector.Connection.StartAsync();
                Console.WriteLine("Attempting start-up");
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
