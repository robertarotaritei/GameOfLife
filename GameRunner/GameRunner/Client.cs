using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace GameRunner
{
    public class Client
    {
        public HttpClient HttpClient { get; }

        public Client(string connection)
        {
            HttpClient = new HttpClient
            {
                BaseAddress =
                new Uri(connection)
            };

            var val = "application/json";
            var media =
                new MediaTypeWithQualityHeaderValue(val);

            HttpClient.DefaultRequestHeaders.Accept.Clear();
            HttpClient.DefaultRequestHeaders.Accept.Add(media);
        }

        public Task<HttpResponseMessage> UpdateGame(GameState gameState)
        {
            var action = "games/activegames/update";
            var content = new StringContent(JsonSerializer.Serialize(gameState), Encoding.UTF8, "application/json");
            return HttpClient.PostAsync(action, content);
        }
    }
}