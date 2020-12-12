using System;

namespace GameRunner
{
    public class GameStateCalculator
    {
        int MaxRows;
        int MaxColumns;
        string GameType { get; set; }

        public GameStateCalculator()
        {
            MaxRows = 40;
            MaxColumns = 80;
        }

        public string CalculateGameType(bool[][] currentState)
        {
            if (currentState != null)
            {
                MaxRows = currentState.Length;
                MaxColumns = currentState[0].Length;
                int genNumber = 0;
                bool gameEnded;
                bool[][] nextGeneration = new bool[MaxRows][];
                bool[][] firstGeneration = new bool[MaxRows][];

                CopyGeneration(currentState, nextGeneration);
                CopyGeneration(currentState, firstGeneration);

                do
                {
                    for (int currentRow = 0; currentRow < MaxRows; currentRow++)
                    {
                        for (int currentColumn = 0; currentColumn < MaxColumns; currentColumn++)
                        {
                            int lifeCount = CalculateLifeCount(currentState, currentRow, currentColumn);

                            nextGeneration[currentRow][currentColumn] = lifeCount == 3 || nextGeneration[currentRow][currentColumn];
                            nextGeneration[currentRow][currentColumn] = lifeCount >= 2 && lifeCount <= 3 && nextGeneration[currentRow][currentColumn];
                        }
                    }

                    gameEnded = GameEnded(currentState, nextGeneration, firstGeneration, genNumber);
                    CopyGeneration(nextGeneration, currentState);
                    genNumber++;

                } while (!gameEnded);

                return GameType;
            }

            return "";
        }

        private void CopyGeneration(bool[][] generation, bool[][] target)
        {
            for (int currentRow = 0; currentRow < MaxRows; currentRow++)
            {
                target[currentRow] = new bool[MaxColumns];
                generation[currentRow].CopyTo(target[currentRow], 0);
            }
        }

        private bool GameEnded(bool[][] currentState, bool[][] nextGeneration, bool[][] firstGeneration, int genNumber)
        {
            if (CheckEqual(nextGeneration, firstGeneration))
            { 
                GameType = "Game loops after " + genNumber + " generations.";
                return true;
            }

            if (!LiveCells(currentState))
            {
                GameType = "Game ended after " + genNumber + " generations.";
                return true;
            }

            if(CheckEqual(currentState, nextGeneration))
            {
                GameType = "Game ended after " + genNumber + " generations.";
                return true;
            }

            if(genNumber > 100)
            {
                GameType = "Game is longer than " + genNumber + " generations.";
                return true;
            }

            return false;
        }

        private bool LiveCells(bool[][] currentState)
        {
            for (int currentRow = 0; currentRow < MaxRows; currentRow++)
            {
                for (int currentColumn = 0; currentColumn < MaxColumns; currentColumn++)
                {
                    if (currentState[currentRow][currentColumn])
                    {
                        return true;
                    }
                }
            }

            return false;
        }

        private bool CheckEqual(bool[][] a, bool[][] b)
        {
            for (int currentRow = 0; currentRow < MaxRows; currentRow++)
            {
                for (int currentColumn = 0; currentColumn < MaxColumns; currentColumn++)
                {
                    if (a[currentRow][currentColumn] != b[currentRow][currentColumn])
                    {
                        return false;
                    }
                }
            }

            return true;
        }

        private int CalculateLifeCount(bool[][] gameState, int currentRow, int currentColumn)
        {
            int lifeCount = 0;

            if (currentRow > 0)
            {
                lifeCount += Convert.ToInt32(gameState[currentRow - 1][currentColumn]);
                lifeCount += currentColumn > 0 ? Convert.ToInt32(gameState[currentRow - 1][currentColumn - 1]) : 0;
                lifeCount += currentColumn < MaxColumns - 1 ? Convert.ToInt32(gameState[currentRow - 1][currentColumn+ 1]) : 0;
            }

            if (currentRow < MaxRows - 1)
            {
                lifeCount += Convert.ToInt32(gameState[currentRow + 1][currentColumn]);
                lifeCount += currentColumn > 0 ? Convert.ToInt32(gameState[currentRow + 1][currentColumn- 1]) : 0;
                lifeCount += currentColumn < MaxColumns - 1 ? Convert.ToInt32(gameState[currentRow + 1][currentColumn+ 1]) : 0;
            }
            
            lifeCount += currentColumn > 0 ? Convert.ToInt32(gameState[currentRow][currentColumn- 1]) : 0;
            lifeCount += currentColumn < MaxColumns - 1 ? Convert.ToInt32(gameState[currentRow][currentColumn+ 1]) : 0;

            return lifeCount;
        }
    }
}
