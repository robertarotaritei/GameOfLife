using Microsoft.AspNetCore.SignalR.Client;
using System;

namespace GameRunner
{
    class Program
    {
        protected Program(){ }

        private static void Main()
        {
            string apiUrl = "http://active-games-api:3003";
            string hubUrl = "https://gameoflifeapp.azurewebsites.net";
            var hubConnector = new HubConnector(hubUrl, apiUrl);

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
