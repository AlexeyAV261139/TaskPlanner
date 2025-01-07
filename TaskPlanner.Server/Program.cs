using Core.Services;
using TaskPlanner.Server.DataAccess;
using TaskPlanner.Server.DataAccess.Reposutory;
using TaskPlanner.Server.Services;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<PasswordHasher>();
builder.Services.AddScoped<JwtProvider>();
builder.Services.AddScoped<ApplicationContext>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<UserRepository>();
builder.Services.AddScoped<TaskRepository>();

builder.Services.AddCors(); // добавляем сервисы CORS


var app = builder.Build();

using var scoupe = app.Services.CreateScope();
using var dbContext = scoupe.ServiceProvider.GetRequiredService<ApplicationContext>();
await dbContext.Database.EnsureCreatedAsync();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder => builder.WithOrigins("https://localhost:5174",
                                           "https://localhost:5500")
                            .AllowAnyHeader()
                            .AllowAnyMethod());

app.MapControllers();


app.Run();
