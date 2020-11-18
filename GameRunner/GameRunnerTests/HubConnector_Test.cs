using GameRunner;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GameRunnerTests
{
    [TestClass]
    public class HubConnector_Test
    {
        [TestMethod]
        public void HubConnector_Constructor()
        {
            //Arrange
            var url = "http://localhost:3000";
            var hubConnector = new HubConnector(url);

            //Assert
            Assert.AreEqual(hubConnector.Connection.State, Microsoft.AspNetCore.SignalR.Client.HubConnectionState.Disconnected);
        }

        [TestMethod]
        public void HubConnector_OnClosed()
        {
            //Arrange
            var url = "http://localhost:3000";
            var hubConnector = new HubConnector(url);

            //Act
            hubConnector.OnClosed();

            //Assert
            Assert.AreEqual(hubConnector.Connection.State, Microsoft.AspNetCore.SignalR.Client.HubConnectionState.Disconnected);
        }

        [TestMethod]
        public void HubConnector_OnConnected()
        {
            //Arrange
            var url = "http://localhost:3000";
            var hubConnector = new HubConnector(url);

            //Act
            hubConnector.OnConnected();

            //Assert
            Assert.AreEqual(hubConnector.Connection.State, Microsoft.AspNetCore.SignalR.Client.HubConnectionState.Disconnected);
        }
    }
}
