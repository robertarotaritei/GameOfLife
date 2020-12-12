using GameRunner;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace GameRunnerTests
{
    [TestClass]
    public class GameStateCalculator_Test
    {
        [TestMethod]
        public void GameStateCalculator_VerifyMethod()
        {
            //Arrange
            var calculator = new GameStateCalculator();
            var initialState = new GameState();

            initialState.Generation = new bool[3][];
            initialState.Generation[0] = new bool[] { true, true, false };
            initialState.Generation[1] = new bool[] { true, false, false };
            initialState.Generation[2] = new bool[] { false, false, false };

            //Act
            var result = calculator.CalculateGameType(initialState.Generation);

            //Assert
            Assert.AreEqual("Game ended after 1 generations.", result);
        }

        [TestMethod]
        public void GameStateCalculator_VerifyInvalidData()
        {
            //Arrange
            var calculator = new GameStateCalculator();
            bool[][] initialState = null;

            //Act
            var result = calculator.CalculateGameType(initialState);

            //Assert
            Assert.AreEqual("", result);
        }
    }
}
