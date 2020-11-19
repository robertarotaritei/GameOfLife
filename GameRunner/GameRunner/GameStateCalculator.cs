using System;

namespace GameRunner
{
    public class GameStateCalculator
    {
        int MaxRows;
        int MaxColumns;

        public GameStateCalculator()
        {
            MaxRows = 40;
            MaxColumns = 80;
        }

        public GameState CalculateNextState(GameState currentState)
        {
            if (currentState != null)
            {
                MaxRows = currentState.Generation.Length;
                MaxColumns = currentState.Generation[0].Length;

                bool[][] nextGeneration = new bool[MaxRows][];
                for (int currentRow = 0; currentRow < MaxRows; currentRow++)
                {
                    nextGeneration[currentRow] = new bool[MaxColumns];
                    currentState.Generation[currentRow].CopyTo(nextGeneration[currentRow], 0);
                }

                for (int currentRow = 0; currentRow < MaxRows; currentRow++)
                {
                    for (int currentColumn = 0; currentColumn < MaxColumns; currentColumn++)
                    {
                        int lifeCount = CalculateLifeCount(currentState, currentRow, currentColumn);

                        nextGeneration[currentRow][currentColumn] = lifeCount == 3 || nextGeneration[currentRow][currentColumn];
                        nextGeneration[currentRow][currentColumn] = lifeCount >= 2 && lifeCount <= 3 && nextGeneration[currentRow][currentColumn];
                    }
                }

                currentState.Generation = nextGeneration;
                
                return currentState;
            }

            return new GameState();
        }

        private int CalculateLifeCount(GameState gameState, int currentRow, int currentColumn)
        {
            int lifeCount = 0;

            if (currentRow > 0)
            {
                lifeCount += Convert.ToInt32(gameState.Generation[currentRow - 1][currentColumn]);
                lifeCount += currentColumn > 0 ? Convert.ToInt32(gameState.Generation[currentRow - 1][currentColumn - 1]) : 0;
                lifeCount += currentColumn < MaxColumns - 1 ? Convert.ToInt32(gameState.Generation[currentRow - 1][currentColumn+ 1]) : 0;
            }

            if (currentRow < MaxRows - 1)
            {
                lifeCount += Convert.ToInt32(gameState.Generation[currentRow + 1][currentColumn]);
                lifeCount += currentColumn > 0 ? Convert.ToInt32(gameState.Generation[currentRow + 1][currentColumn- 1]) : 0;
                lifeCount += currentColumn < MaxColumns - 1 ? Convert.ToInt32(gameState.Generation[currentRow + 1][currentColumn+ 1]) : 0;
            }
            
            lifeCount += currentColumn > 0 ? Convert.ToInt32(gameState.Generation[currentRow][currentColumn- 1]) : 0;
            lifeCount += currentColumn < MaxColumns - 1 ? Convert.ToInt32(gameState.Generation[currentRow][currentColumn+ 1]) : 0;

            return lifeCount;
        }
    }
}
