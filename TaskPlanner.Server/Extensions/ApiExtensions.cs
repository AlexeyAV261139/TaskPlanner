using Core.Services;
using DAL.Reposutory;
using DAL;
using TaskPlanner.Server.Services;

namespace TaskPlanner.Server.Extensions;

public static class ApiExtensions
{
    public static void RegisterService(
        this IServiceCollection services)
    {
        services.AddScoped<PasswordHasher>();
        services.AddScoped<JwtProvider>();
        services.AddScoped<ApplicationContext>();
        services.AddScoped<UserService>();
        services.AddScoped<UserRepository>();
        services.AddScoped<TaskRepository>();
        services.AddScoped<TagRepository>();
    }
}
