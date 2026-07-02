using Microsoft.EntityFrameworkCore;
using ZupitInterview.Api.Exercises.Level2;
using ZupitInterview.Api.Exercises.Level3;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddOpenApi();

// --- N2.1: EF Core InMemory per i prodotti (fornito) ---
builder.Services.AddDbContext<ProductsDbContext>(options => options.UseInMemoryDatabase("ZupitProducts"));

// --- N3.1: EF Core InMemory + repository (fornito) ---
builder.Services.AddDbContext<LibraryDbContext>(options => options.UseInMemoryDatabase("ZupitBooks"));
builder.Services.AddScoped<IBookRepository, BookRepository>();

// =====================================================================
// ESERCIZIO N2.2 — Dependency Injection
// TODO: registra qui il service nel container.
// =====================================================================

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// --- N3.3: middleware custom per la gestione delle eccezioni (fornito) ---
app.UseMiddleware<ExceptionHandlingMiddleware>();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

// --- seed dei database in memoria (prodotti N2.1 + libri N3.1) ---
using (var scope = app.Services.CreateScope())
{
    var products = scope.ServiceProvider.GetRequiredService<ProductsDbContext>();
    if (!products.Products.Any())
    {
        products.Products.AddRange(
            new Product { Name = "Tastiera", Price = 29.90m },
            new Product { Name = "Mouse", Price = 19.90m });
        products.SaveChanges();
    }

    var db = scope.ServiceProvider.GetRequiredService<LibraryDbContext>();
    if (!db.Books.Any())
    {
        db.Books.AddRange(
            new Book { Title = "Clean Code", Author = "Robert C. Martin" },
            new Book { Title = "The Pragmatic Programmer", Author = "Andrew Hunt" },
            new Book { Title = "Refactoring", Author = "Martin Fowler" },
            new Book { Title = "Domain-Driven Design", Author = "Eric Evans" },
            new Book { Title = "Patterns of Enterprise Application Architecture", Author = "Martin Fowler" },
            new Book { Title = "Working Effectively with Legacy Code", Author = "Michael Feathers" });
        db.SaveChanges();
    }
}

app.Run();
