using Microsoft.AspNetCore.SignalR.Client;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace GameRunner
{
    public class HubConnector
    {
        public HubConnection Connection { get; }

        public HubConnector()
        {
            Connection = new HubConnectionBuilder()
                    .WithUrl("http://localhost:3002/Progress")
                    .Build();
        }

        public void OnClosed()
        {
            Connection.Closed += async (error) =>
            {
                await Task.Delay(new Random().Next(0, 5) * 1000);
                await Connection.StartAsync();
            };
        }
    }
}
