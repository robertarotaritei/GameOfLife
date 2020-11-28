using Microsoft.AspNetCore.SignalR.Client;
using System;

namespace GameRunner
{
    class Program
    {
        protected Program(){ }

        private static void Main()
        {
            string baseUrl = "http://activegamesapi.azurewebsites.net";
            var hubConnector = new HubConnector(baseUrl);

            hubConnector.OnClosed();
            hubConnector.Connection.On<GameState>("GameInitiated", (currentState) => { hubConnector.CalculateNextState(currentState); });
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
