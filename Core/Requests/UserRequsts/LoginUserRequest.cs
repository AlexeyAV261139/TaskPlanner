using System.ComponentModel.DataAnnotations;

namespace TaskPlanner.Server.Api.Requests.UserRequsts;

public record LoginUserRequest(
    [Required] string Login,
    [Required] string Password);
