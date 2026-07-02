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
/// ESERCIZIO N2.1 — CRUD con EF Core (InMemory)
/// Implementa le 5 azioni CRUD (async) sui prodotti usando il DbContext, con gli
/// status code REST appropriati (404 dove serve). `_db` è già iniettato e seedato.
/// Endpoint: /api/products
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
    public Task<ActionResult<IEnumerable<Product>>> GetAll()
        => throw new NotImplementedException();

    [HttpGet("{id:int}")]
    public Task<ActionResult<Product>> GetById(int id)
        => throw new NotImplementedException();

    [HttpPost]
    public Task<ActionResult<Product>> Create(Product input)
        => throw new NotImplementedException();

    [HttpPut("{id:int}")]
    public Task<IActionResult> Update(int id, Product input)
        => throw new NotImplementedException();

    [HttpDelete("{id:int}")]
    public Task<IActionResult> Delete(int id)
        => throw new NotImplementedException();
}
