using Microsoft.EntityFrameworkCore;
using TaskPlanner.Server.Models;

namespace TaskPlanner.Server.DataAccess;

public class ApplicationContext : DbContext
{
    private readonly IConfiguration _configuration;

    public ApplicationContext(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public DbSet<UserEntity> Users { get; set; } = null!;
    public DbSet<TaskEntity> Tasks { get; set; } = null!;
    public DbSet<TagEntity> Tags { get; set; } = null!;


    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseNpgsql(_configuration.GetConnectionString("Database"));
    }
}