using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace GameRunner
{
    public class Client
    {
        public HttpClient HttpClient { get; }

        public Client()
        {
            HttpClient = new HttpClient
            {
                BaseAddress =
                new Uri("http://localhost:3002")
            };

            var val = "application/json";
            var media =
                new MediaTypeWithQualityHeaderValue(val);

            HttpClient.DefaultRequestHeaders.Accept.Clear();
            HttpClient.DefaultRequestHeaders.Accept.Add(media);
        }

        public void UpdateGame(GameState gameState)
        {
            var action = "games/activegames/update";
            var content = new StringContent(JsonSerializer.Serialize(gameState), Encoding.UTF8, "application/json");
            HttpClient.PostAsync(action, content);
        }

        public void SendConnectionId(string connectionId)
        {
            var action = "games/activegames/runnerConnection";
            var content = new StringContent(JsonSerializer.Serialize(connectionId));
            HttpClient.PostAsync(action, content);
        }
    }
}
