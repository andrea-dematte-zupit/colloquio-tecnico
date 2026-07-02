namespace ZupitInterview.Api.Exercises.Level1;

/// <summary>
/// ESERCIZIO N1.1 — FizzBuzz
/// Obiettivo: generare la sequenza FizzBuzz da 1 a <paramref name="count"/>.
///
/// Requisiti:
///  - multipli di 3        -> "Fizz"
///  - multipli di 5        -> "Buzz"
///  - multipli di 3 e di 5 -> "FizzBuzz"
///  - altrimenti           -> il numero come stringa
///
/// Endpoint per provare: GET /api/level1/fizzbuzz?count=15
/// </summary>
public static class FizzBuzz
{
    public static IEnumerable<string> Generate(int count)
    {
        for (var i = 1; i <= count; i++)
        {
            yield return (i % 3, i % 5) switch
            {
                (0, 0) => "FizzBuzz",
                (0, _) => "Fizz",
                (_, 0) => "Buzz",
                _ => i.ToString(),
            };
        }
    }
}
