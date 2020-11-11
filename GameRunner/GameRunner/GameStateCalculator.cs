using System;
using System.Collections.Generic;
using System.Text;

namespace GameRunner
{
    public class GameStateCalculator
    {
        public bool[][] CalculateNextState(GameState currentState)
        {
            if (currentState != null)
            {
                var rows = currentState.Generation.Length;
                var columns = currentState.Generation[0].Length;

                bool[][] nextGeneration = new bool[rows][];
                for (int i = 0; i < rows; i++)
                {
                    nextGeneration[i] = new bool[columns];
                    currentState.Generation[i].CopyTo(nextGeneration[i], 0);
                }

                for (int i = 0; i < rows; i++)
                {
                    for (int j = 0; j < columns; j++)
                    {
                        int lifeCount = 0;
                        if (i > 0)
                        {
                            lifeCount += currentState.Generation[i - 1][j] ? 1 : 0;

                            if (j > 0)
                                lifeCount += currentState.Generation[i - 1][j - 1] ? 1 : 0;

                            if (j < columns - 1)
                                lifeCount += currentState.Generation[i - 1][j + 1] ? 1 : 0;
                        }

                        if (i < rows - 1)
                        {
                            lifeCount += currentState.Generation[i + 1][j] ? 1 : 0;

                            if (j > 0)
                                lifeCount += currentState.Generation[i + 1][j - 1] ? 1 : 0;

                            if (j < columns - 1)
                                lifeCount += currentState.Generation[i + 1][j + 1] ? 1 : 0;
                        }

                        if (j > 0)
                            lifeCount += currentState.Generation[i][j - 1] ? 1 : 0;

                        if (j < columns - 1)
                            lifeCount += currentState.Generation[i][j + 1] ? 1 : 0;

                        if (lifeCount == 3)
                            nextGeneration[i][j] = true;

                        nextGeneration[i][j] = lifeCount >= 2 && lifeCount <= 3 && nextGeneration[i][j];
                    }
                }

                return nextGeneration;
            }

            return null;
        }
    }
}
