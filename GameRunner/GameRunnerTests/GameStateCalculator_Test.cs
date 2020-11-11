using GameRunner;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Linq;

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
            var result = calculator.CalculateNextState(initialState);

            //Assert
            Assert.AreEqual(expectedState.Generation.ToString(), result.ToString());
        }

        [TestMethod]
        public void GameStateCalculator_VerifyInvalidData()
        {
            //Arrange
            var calculator = new GameStateCalculator();
            GameState initialState = null;

            //Act
            var result = calculator.CalculateNextState(initialState);

            //Assert
            Assert.AreEqual(null, result);
        }
    }
}
