using System.ComponentModel.DataAnnotations;

namespace TaskPlanner.Server.Api.Requests.TaskRequests;

public record CreateTaskRequest(
    [Required] string Name,
    [Required] string Description,
    [Required] long[] ExecutorIds);