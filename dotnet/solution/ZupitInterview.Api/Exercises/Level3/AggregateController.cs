using Microsoft.AspNetCore.Mvc;

namespace ZupitInterview.Api.Exercises.Level3;

/// <summary>
/// ESERCIZIO N3.2 — Async concorrente
/// Obiettivo: interrogare 3 "sorgenti" in parallelo e sommarne i risultati.
///
/// Requisiti per GetTotalAsync:
///  1. Avvia le 3 chiamate a FetchRegionAsync IN PARALLELO (non in sequenza).
///  2. Attendile tutte con Task.WhenAll.
///  3. Ritorna la somma dei tre valori.
///  4. Propaga il CancellationToken a ciascuna chiamata.
///
/// Nota: se le esegui in sequenza l'endpoint impiega ~900ms; in parallelo ~300ms.
/// Endpoint per provare: GET /api/level3/aggregate
/// 
/// 
/// Domande:
/// 
/// Perchè utilizzare un metodo asincrono invece di uno sincrono?
/// 
/// Se invece di 3 regioni ne avessi 1000, quale approccio utilizzeresti?
/// 
/// A cosa serve CancellationToken? Che impatto ha il suo utilizzo in un servizio di con molte richieste?
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

    public async Task<int> GetTotalAsync(CancellationToken ct)
    {
        var tasks = Regions.Select(r => FetchRegionAsync(r, ct));
        var results = await Task.WhenAll(tasks);
        return results.Sum();
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
