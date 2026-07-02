namespace ZupitInterview.Api.Exercises.Level2;

public interface IGreetingService
{
    string Greet(string name);
}

/// <summary>
/// ESERCIZIO N2.2 — Dependency Injection
/// Implementa Greet (un saluto per il nome, gestendo il nome vuoto)
/// Endpoint: GET /api/greeting?name=Anna
/// </summary>
public class GreetingService : IGreetingService
{
    public string Greet(string name)
    {
        // TODO: implementa
        throw new NotImplementedException();
    }
}
