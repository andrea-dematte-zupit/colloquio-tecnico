using Microsoft.AspNetCore.Mvc;

namespace ZupitInterview.Api.Exercises.Level3;

/// <summary>
/// ESERCIZIO N3.3 — Middleware custom
/// Obiettivo: intercettare le eccezioni non gestite e restituire un ProblemDetails.
///
/// Requisiti per InvokeAsync:
///  1. Esegui il resto della pipeline dentro un try/catch (await _next(context)).
///  2. Se viene sollevata un'eccezione:
///       - imposta lo status code 500
///       - imposta il Content-Type "application/problem+json"
///       - scrivi in risposta un ProblemDetails (Title generico + Status 500).
///         Suggerimento: context.Response.WriteAsJsonAsync(problemDetails)
///
/// L'endpoint GET /api/level3/boom solleva volutamente un'eccezione per testare.
/// Il middleware è già registrato in Program.cs (app.UseMiddleware<...>()).
/// 
/// Domande: 
/// 
/// Perchè utilizzare un middleware?
/// 
/// Quando il server riceve una richiesta HTTP, spiega come e dove viene utilizzata questa classe.
/// 
/// Per cosa possiamo utilizzare questo pattern? 
/// </summary>
public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }

    public async Task InvokeAsync(HttpContext context)
    {
        try
        {
            await _next(context);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Eccezione non gestita");

            var problem = new ProblemDetails
            {
                Title = "Si è verificato un errore imprevisto.",
                Status = StatusCodes.Status500InternalServerError,
            };

            context.Response.StatusCode = StatusCodes.Status500InternalServerError;
            context.Response.ContentType = "application/problem+json";
            await context.Response.WriteAsJsonAsync(problem);
        }
    }
}

[ApiController]
[Route("api/level3/boom")]
public class BoomController : ControllerBase
{
    [HttpGet]
    public IActionResult Boom()
    {
        throw new InvalidOperationException("Errore simulato per testare il middleware.");
    }
}
