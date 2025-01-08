using DAL.Reposutory;
using Microsoft.AspNetCore.Mvc;
using TaskPlanner.Server.Api.Requests.TaskRequests;

namespace TaskPlanner.Server.Apis.Controllers;

[ApiController]
[Route("[controller]")]
public class TaskController : ControllerBase
{
    private readonly TaskRepository _taskRepository;

    public TaskController(TaskRepository taskRepository)
    {
        _taskRepository = taskRepository;
    }

    [HttpGet("GetAll")]
    public async Task<IResult> Get()
    {
        var tasks = await _taskRepository
            .GetAllTasks();
        return Results.Ok(tasks);
    }

    [HttpGet]
    public async Task<IResult> GetById([FromQuery] long id)
    {
        var task = await _taskRepository.GetById(id);
        return Results.Ok(task);
    }

    [HttpPost]
    public async Task<IResult> Create(CreateTaskRequest request)
    {
        await _taskRepository.Create(request);
        return Results.Ok();
    }

    [HttpDelete]
    public async Task<IResult> Delete([FromQuery] long id)
    {
        await _taskRepository.Delete(id);
        return Results.Ok();
    }

    [HttpPut]
    public async Task<IResult> Change(ChangeTaskRequset requset)
    {
            await _taskRepository.Change(requset);
        return Results.Ok();
    }
}
