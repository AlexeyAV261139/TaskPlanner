﻿using Microsoft.AspNetCore.Mvc;
using TaskPlanner.Server.Api.Requests.TaskRequests;
using TaskPlanner.Server.DataAccess.Reposutory;

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

    [HttpGet]
    public async Task<IResult> Get()
    {
        var tasks = await _taskRepository.GetAllTasks();
        return Results.Ok(tasks);
    }


    [HttpPost]
    public async Task<IResult> Create(CreateTaskRequest request)
    {
        await _taskRepository.Create(request);
        return Results.Ok();
    }

    [HttpDelete]
    public async Task<IResult> Delete(long id)
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
