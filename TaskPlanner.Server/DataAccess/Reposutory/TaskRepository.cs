using Microsoft.EntityFrameworkCore;
using TaskPlanner.Server.Api.Requests.TaskRequests;

namespace TaskPlanner.Server.DataAccess.Reposutory;

public class TaskRepository
{
    private readonly ApplicationContext _context;

    public TaskRepository(ApplicationContext context)
    {
        _context = context;
    }

    private async Task<List<UserEntity>> GetUsersById(IEnumerable<long> ids) =>
        await _context.Users
            .Where(x => ids.Contains(x.Id))
            .ToListAsync();

    public async Task<List<TaskEntity>> GetAllTasks()
    {
        var tasks = await _context.Tasks.ToListAsync();
        return tasks;
    }

    public async Task Create(CreateTaskRequest request)
    {
        var executors = await GetUsersById(request.ExecutorIds);

        var task = new TaskEntity
        {
            CreationDate = DateTime.UtcNow,
            Description = request.Description,
            Executors = executors,
            Name = request.Name,
        };

        await _context.Tasks.AddAsync(task);
        await _context.SaveChangesAsync();
    }

    public async Task Delete(long id)
    {
        var task = await _context.Tasks.FindAsync(id);
        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();
    }

    public async Task Change(ChangeTaskRequset requset)
    {
        var task = await _context.Tasks.FindAsync(requset.TaskId)
            ?? throw new Exception();

        if (requset.Name != null)
            task.Name = requset.Name;
        if (requset.Description != null)
            task.Description = requset.Description;
        if (requset.ExecutorIds != null)
        {
            var executors = await GetUsersById(requset.ExecutorIds);
            task.Executors = executors;
        }
        await _context.SaveChangesAsync();
    }
}
