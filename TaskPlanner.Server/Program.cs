using DAL;
using TaskPlanner.Server.Extensions;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;

services.AddControllers();
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();
services.RegisterService();
services.AddCors(); 


var app = builder.Build();

using var scoupe = app.Services.CreateScope();
using var dbContext = scoupe.ServiceProvider.GetRequiredService<ApplicationContext>();
await dbContext.Database.EnsureCreatedAsync();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => 
    builder.WithOrigins(
        "https://localhost:5174",
        "https://localhost:5500")
    .AllowAnyHeader()
    .AllowAnyMethod());

app.MapControllers();
app.Run();
