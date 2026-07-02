namespace ZupitInterview.Api.Exercises.Level2;

public interface IGreetingService
{
    string Greet(string name);
}

/// <summary>
/// ESERCIZIO N2.2 — Dependency Injection
/// Obiettivo: implementare un service e renderlo iniettabile.
///
/// Requisiti:
///  1. Implementa Greet: deve ritornare "Ciao, {name}!".
///     Se name è vuoto/null, ritorna "Ciao, sconosciuto!".
///  2. Registra il service nel container DI (vedi Program.cs, sezione N2.2).
///
/// Il GreetingController lo riceve già via costruttore (injection).
/// Endpoint per provare: GET /api/greeting?name=Anna
/// 
/// 
/// Domande:
/// 
/// Come funziona Dep. Injection? Quali sono i building-blocks per utilizzarla in .Net? (ServiceCollection -> ServiceProvider)
/// 
/// Perchè è diventato lo standard?
/// 
/// Posso definire lifetime diversi per ogni registrazione? Quali? E in quali casi ha senso che venga utilizzato uno al posto dell'altro?
/// </summary>
public class GreetingService : IGreetingService
{
    public string Greet(string name)
    {
        var who = string.IsNullOrWhiteSpace(name) ? "sconosciuto" : name;
        return $"Ciao, {who}!";
    }
}
