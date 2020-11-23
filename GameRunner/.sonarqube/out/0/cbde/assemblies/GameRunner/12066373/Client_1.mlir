func @_GameRunner.Client.UpdateGame$GameRunner.GameState$(none) -> none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :29 :8) {
^entry (%_gameState : none):
%0 = cbde.alloca none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :29 :52)
cbde.store %_gameState, %0 : memref<none> loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :29 :52)
br ^0

^0: // JumpBlock
%1 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :31 :25) // "games/activegames/update" (StringLiteralExpression)
// Entity from another assembly: JsonSerializer
%3 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :32 :69) // Not a variable of known type: gameState
%4 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :32 :44) // JsonSerializer.Serialize(gameState) (InvocationExpression)
// Entity from another assembly: Encoding
%5 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :32 :81) // Encoding.UTF8 (SimpleMemberAccessExpression)
%6 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :32 :96) // "application/json" (StringLiteralExpression)
%7 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :32 :26) // new StringContent(JsonSerializer.Serialize(gameState), Encoding.UTF8, "application/json") (ObjectCreationExpression)
%9 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :33 :19) // Not a variable of known type: HttpClient
%10 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :33 :40) // Not a variable of known type: action
%11 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :33 :48) // Not a variable of known type: content
%12 = cbde.unknown : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :33 :19) // HttpClient.PostAsync(action, content) (InvocationExpression)
return %12 : none loc("D:\\School\\GameOfLife\\GameRunner\\GameRunner\\Client.cs" :33 :12)

^1: // ExitBlock
cbde.unreachable

}
