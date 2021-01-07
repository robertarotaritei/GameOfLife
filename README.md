# Game of Life

## About

Game of Life is a project that simulates John Conway's game of life. The project is divided into 4 services: a React application and 3 .NET Core APIs (Active Games API, User API, Game History API). When the first generation is drawn/made, it is sent to the Active Games API which calculates the total number of generations for that game and returns the information using SignalR. At the same time, the React application calculates and displays the
generations for that game.

<br />
<p align="center">
  <img src="images/screenshot.png" alt="Screenshot" width="100%" height="100%">
</p>

The 3 APIs are on GitHub at [https://github.com/robertarotaritei/GameOfLifeAPIs](https://github.com/robertarotaritei/GameOfLifeAPIs).

This is the container view of the project:

<br />
<p align="center">
  <img src="images/containerView.png" alt="Screenshot" width="100%" height="100%">
</p>

## Local environment

Requirements:
- Docker Desktop

Run the command

### `docker-compose up -d`

in the root folder of the project and visit [localhost:80](localhost:80) to see the project.

## Live version (temporary)

Using a CI/CD pipeline, the 4 applications are tested, deployed to Docker, pulled to Microsoft Azure, and hosted on two websites. The React application, User API and Game History API are connected with Docker-compose at [https://gameoflifeapp.azurewebsites.net](https://gameoflifeapp.azurewebsites.net).


## Live version (simplified)

A simplified version of the project is live at [https://robertarotaritei.github.io/game-of-life](https://robertarotaritei.github.io/game-of-life).

It only features the React application, making it easy to access and change the Game of Life grid.