func @_GameRunner.Client.UpdateGame$GameRunner.GameState$(none) -> () loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :29 :8) {
^entry (%_gameState : none):
%0 = cbde.alloca none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :29 :31)
cbde.store %_gameState, %0 : memref<none> loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :29 :31)
br ^0

^0: // SimpleBlock
%1 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :31 :25) // "games/activegames/update" (StringLiteralExpression)
// Entity from another assembly: JsonSerializer
%3 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :32 :69) // Not a variable of known type: gameState
%4 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :32 :44) // JsonSerializer.Serialize(gameState) (InvocationExpression)
// Entity from another assembly: Encoding
%5 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :32 :81) // Encoding.UTF8 (SimpleMemberAccessExpression)
%6 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :32 :96) // "application/json" (StringLiteralExpression)
%7 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :32 :26) // new StringContent(JsonSerializer.Serialize(gameState), Encoding.UTF8, "application/json") (ObjectCreationExpression)
%9 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :33 :12) // Not a variable of known type: HttpClient
%10 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :33 :33) // Not a variable of known type: action
%11 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :33 :41) // Not a variable of known type: content
%12 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :33 :12) // HttpClient.PostAsync(action, content) (InvocationExpression)
br ^1

^1: // ExitBlock
return

}
func @_GameRunner.Client.SendConnectionId$string$(none) -> () loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :36 :8) {
^entry (%_connectionId : none):
%0 = cbde.alloca none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :36 :37)
cbde.store %_connectionId, %0 : memref<none> loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :36 :37)
br ^0

^0: // SimpleBlock
%1 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :38 :25) // "games/activegames/runnerConnection" (StringLiteralExpression)
// Entity from another assembly: JsonSerializer
%3 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :39 :69) // Not a variable of known type: connectionId
%4 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :39 :44) // JsonSerializer.Serialize(connectionId) (InvocationExpression)
%5 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :39 :26) // new StringContent(JsonSerializer.Serialize(connectionId)) (ObjectCreationExpression)
%7 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :40 :12) // Not a variable of known type: HttpClient
%8 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :40 :33) // Not a variable of known type: action
%9 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :40 :41) // Not a variable of known type: content
%10 = cbde.unknown : none loc("D:\\School\\GameOfLifePresentation\\GameRunner\\GameRunner\\Client.cs" :40 :12) // HttpClient.PostAsync(action, content) (InvocationExpression)
br ^1

^1: // ExitBlock
return

}
