FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY *.sln ./
COPY ["GameRunner/GameRunner.csproj", "GameRunner/"]
RUN dotnet restore "GameRunner/GameRunner.csproj"
COPY . .
WORKDIR "/src/GameRunner"
RUN dotnet build "GameRunner.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GameRunner.csproj" -c Release -o /app/publish

FROM base AS final
ENV ASPNETCORE_ENVIRONMENT=Development
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GameRunner.dll"]