using System.ComponentModel.DataAnnotations;

namespace TaskPlanner.Server.Api.Requests.TaskRequests;

public record ChangeTaskRequset(
    [Required] long TaskId,
    string? Name,
    string? Description,
    long[]? ExecutorIds);
