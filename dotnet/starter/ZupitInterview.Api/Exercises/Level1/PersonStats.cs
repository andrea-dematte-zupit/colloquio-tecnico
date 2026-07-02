namespace ZupitInterview.Api.Exercises.Level1;

public record Person(string Name, string City, int Age);

public record CityStat(string City, int Count, double AverageAge);

/// <summary>
/// ESERCIZIO N1.3 — LINQ
/// Aggrega le persone per città (conteggio ed età media), ordinato per città.
/// Endpoint: GET /api/level1/stats
/// </summary>
public static class PersonStats
{
    /// <summary>Dataset di esempio (fornito).</summary>
    public static readonly IReadOnlyList<Person> Sample = new List<Person>
    {
        new("Anna", "Trento", 30),
        new("Marco", "Verona", 41),
        new("Giulia", "Trento", 24),
        new("Luca", "Milano", 38),
        new("Sara", "Verona", 29),
        new("Paolo", "Trento", 52),
    };

    public static IEnumerable<CityStat> ByCity(IEnumerable<Person> people)
    {
        // TODO: implementa
        throw new NotImplementedException();
    }
}
