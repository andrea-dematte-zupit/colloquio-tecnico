using Microsoft.AspNetCore.Mvc;

namespace ZupitInterview.Api.Exercises.Level3;

/// <summary>
/// ESERCIZIO N3.2 — Async concorrente
/// Implementa GetTotalAsync: interroga le 3 sorgenti (FetchRegionAsync) in parallelo
/// e somma i risultati, propagando il CancellationToken.
/// Endpoint: GET /api/level3/aggregate
/// </summary>
public class SalesAggregator
{
    private static readonly string[] Regions = { "Nord", "Centro", "Sud" };

    /// <summary>Simula una chiamata di rete: ritorna un totale dopo 300ms.</summary>
    private static async Task<int> FetchRegionAsync(string region, CancellationToken ct)
    {
        await Task.Delay(300, ct);
        return region.Length * 100; // valore fittizio deterministico
    }

    public Task<int> GetTotalAsync(CancellationToken ct)
    {
        // TODO: implementa
        throw new NotImplementedException();
    }
}

[ApiController]
[Route("api/level3/aggregate")]
public class AggregateController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<int>> Get(CancellationToken ct)
    {
        var total = await new SalesAggregator().GetTotalAsync(ct);
        return Ok(total);
    }
}
