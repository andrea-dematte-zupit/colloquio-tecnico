namespace ZupitInterview.Api.Exercises.Level1;

public record Person(string Name, string City, int Age);

public record CityStat(string City, int Count, double AverageAge);

/// <summary>
/// ESERCIZIO N1.3 — LINQ
/// Obiettivo: aggregare le persone per città.
///
/// Requisiti: per ogni città restituisci un <see cref="CityStat"/> con:
///  - Count       = numero di persone in quella città
///  - AverageAge  = età media (double) in quella città
/// Il risultato dev'essere ordinato per nome città (ascendente).
///
/// Endpoint per provare: GET /api/level1/stats
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
        return people
            .GroupBy(p => p.City)
            .Select(g => new CityStat(g.Key, g.Count(), g.Average(p => p.Age)))
            .OrderBy(s => s.City);
    }
}
