using System.ComponentModel.DataAnnotations;

namespace TaskPlanner.Server.Api.Requests.UserRequsts;

public record RegisterUserRequest(
    [Required] string Login,
    [Required] string Password,
    [Required] string Role,
    [Required] string Name);
