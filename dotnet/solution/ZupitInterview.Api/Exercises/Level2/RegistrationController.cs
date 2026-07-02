using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;

namespace ZupitInterview.Api.Exercises.Level2;

/// <summary>
/// ESERCIZIO N2.3 — Validazione DTO — SOLUZIONE
/// Validazione via Data Annotations: con [ApiController], se il modello non è
/// valido l'API risponde automaticamente con 400 + ProblemDetails.
///
/// NOTA (spunto di discussione): in un progetto serio le Data Annotations spesso
/// non bastano — diventano scomode con regole condizionali, cross-field o che
/// dipendono da servizi/DB. Una libreria come FluentValidation è più completa
/// (validatori testabili, logica complessa, messaggi e localizzazione, DI).
/// Per questa casistica semplice le annotations vanno benissimo: citare
/// FluentValidation è un plus, non un requisito.
/// </summary>
public class RegisterDto
{
    [Required]
    [StringLength(20, MinimumLength = 3)]
    public string Username { get; set; } = "";

    [Required]
    [EmailAddress]
    public string Email { get; set; } = "";

    [Range(18, 120)]
    public int Age { get; set; }
}

[ApiController]
[Route("api/register")]
public class RegistrationController : ControllerBase
{
    [HttpPost]
    public IActionResult Register(RegisterDto dto)
    {
        // Se arriviamo qui il modello è valido (validazione automatica di [ApiController]).
        return Ok(new { message = $"Benvenuto {dto.Username}!" });
    }
}
