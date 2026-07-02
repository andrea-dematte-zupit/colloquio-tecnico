using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ZupitInterview.Api.Exercises.Level2;

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public decimal Price { get; set; }
}

public class ProductsDbContext : DbContext
{
    public ProductsDbContext(DbContextOptions<ProductsDbContext> options) : base(options) { }

    public DbSet<Product> Products => Set<Product>();
}

/// <summary>
/// ESERCIZIO N2.1 — CRUD con EF Core (InMemory) — SOLUZIONE
///
/// CRUD async col DbContext usato direttamente nel controller. È il livello
/// "base" di EF (N3.1 aggiunge repository pattern e paginazione).
/// 
/// Domande:
/// 
/// Quali sono i vantaggi nell'utilizzare EF? Ci sono alternative? 
/// 
/// Come posso caricare entità relazionate? (Include oppure Select esplicita)
/// 
/// Nel caso di inserimenti multipli, come posso assicurare l'atomicità delle varie operazioni? (Transazione)
/// 
/// </summary>
[ApiController]
[Route("api/products")]
public class ProductsController : ControllerBase
{
    private readonly ProductsDbContext _db;

    public ProductsController(ProductsDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Product>>> GetAll()
        => Ok(await _db.Products.ToListAsync());

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Product>> GetById(int id)
    {
        var product = await _db.Products.FindAsync(id);
        return product is null ? NotFound() : Ok(product);
    }

    [HttpPost]
    public async Task<ActionResult<Product>> Create(Product input)
    {
        _db.Products.Add(input);
        await _db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = input.Id }, input);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, Product input)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null) return NotFound();

        product.Name = input.Name;
        product.Price = input.Price;
        await _db.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null) return NotFound();

        _db.Products.Remove(product);
        await _db.SaveChangesAsync();
        return NoContent();
    }
}
