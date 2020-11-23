// Skipping function OnClosed(), it contains poisonous unsupported syntaxes

func @_GameRunner.HubConnector.CalculateNextState$GameRunner.GameState$(none) -> none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :31 :8) {
^entry (%_currentState : none):
%0 = cbde.alloca none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :31 :44)
cbde.store %_currentState, %0 : memref<none> loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :31 :44)
br ^0

^0: // JumpBlock
%1 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :33 :28) // Not a variable of known type: Calculator
%2 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :33 :58) // Not a variable of known type: currentState
%3 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :33 :28) // Calculator.CalculateNextState(currentState) (InvocationExpression)
%5 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :34 :12) // Not a variable of known type: Client
%6 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :34 :30) // Not a variable of known type: nextState
%7 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :34 :12) // Client.UpdateGame(nextState) (InvocationExpression)
%8 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :36 :19) // Not a variable of known type: nextState
return %8 : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\HubConnector.cs" :36 :12)

^1: // ExitBlock
cbde.unreachable

}
