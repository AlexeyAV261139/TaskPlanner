using Core.Services;
using Microsoft.AspNetCore.Mvc;
using TaskPlanner.Server.Api.Requests.UserRequsts;

namespace TaskPlanner.Server.Apis.Controllers;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;

    public UserController(UserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public IResult Register([FromBody] RegisterUserRequest request)
    {
        _userService.Register(request.Login, request.Password, request.Role, request.Name);
        return Results.Ok();
    }

    [HttpPost("login")]
    public IResult Login([FromBody] LoginUserRequest request)
    {
        var token = _userService.Login(request.Login, request.Password);

        foreach (var cookie in Request.Cookies.Keys)
            Response.Cookies.Delete(cookie);

        Response.Cookies.Append("Token", token);

        return Results.Ok();
    }

    [HttpGet]
    public async Task<IResult> GetUsers()
    {
        var users =  await _userService.GetUsers();
        return Results.Ok(users);
    }
}
