using GameRunner;
using Microsoft.AspNetCore.SignalR.Client;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GameRunnerTests
{
    [TestClass]
    public class HubConnector_Test
    {
        [TestMethod]
        public void HubConnector_Connection()
        {
            //Arrange
            var url = "http://localhost:3000";
            var hubConnector = new HubConnector(url);

            //Assert
            Assert.AreEqual(hubConnector.Connection.State, HubConnectionState.Disconnected);
        }

        [TestMethod]
        public void HubConnector_Client()
        {
            //Arrange
            var url = "http://localhost:3000";
            var hubConnector = new HubConnector(url);
            var expected = new Client(url);

            //Assert
            Assert.AreEqual(hubConnector.Client.ToString(), expected.ToString());
        }

        [TestMethod]
        public void HubConnector_Calculator()
        {
            //Arrange
            var url = "http://localhost:3000";
            var hubConnector = new HubConnector(url);
            var expected = new GameStateCalculator();

            //Assert
            Assert.AreEqual(hubConnector.Calculator.ToString(), expected.ToString());
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
            Assert.AreEqual(hubConnector.Connection.State, HubConnectionState.Disconnected);
        }

        [TestMethod]
        public void HubConnector_CalculateNextState()
        {
            //Arrange
            var url = "http://localhost:3000";
            var hubConnector = new HubConnector(url);
            var initialState = new GameState();
            var expectedState = new GameState();

            initialState.Generation = new bool[3][];
            initialState.Generation[0] = new bool[] { true, true, false };
            initialState.Generation[1] = new bool[] { true, false, false };
            initialState.Generation[2] = new bool[] { false, false, false };

            expectedState.Generation = new bool[3][];
            expectedState.Generation[0] = new bool[] { true, true, false };
            expectedState.Generation[1] = new bool[] { true, true, false };
            expectedState.Generation[2] = new bool[] { false, false, false };

            //Act
            var result = hubConnector.CalculateNextState(initialState);

            //Assert
            Assert.AreEqual(result.ToString(), expectedState.ToString());
        }
    }
}
