using GameRunner;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;

namespace GameRunnerTests
{
    [TestClass]
    public class Client_Test
    {
        [TestMethod]
        public void Client_Constructor()
        {
            //Arrange
            var url = "http://localhost:3000";
            var client = new Client(url);
            var expected = new Uri(url);

            //Assert
            Assert.AreEqual(client.HttpClient.BaseAddress, expected);
        }

        [TestMethod]
        public void Client_UpdateGame()
        {
            //Arrange
            var url = "http://localhost:3000";
            var client = new Client(url);
            var gameState = new GameState();

            //Act
            var result = client.UpdateGame(gameState);

            //Assert
            Assert.AreEqual(result.Status, System.Threading.Tasks.TaskStatus.WaitingForActivation);
        }
    }
}
