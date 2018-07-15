using FoodDelivery.Common;
using FoodDelivery.Data.Models;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Users;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [Authorize(Roles = CommonConstants.AdminRole)]
    [RoutePrefix("api/Admin")]
    public class AdminController : BaseApiController
    {
        private readonly IAdminService users;

        public AdminController(IAdminService users)
        {
            this.users = users;
        }

        [HttpGet]
        [Route("Users")]
        public IEnumerable<ListUsersViewModel> Users([FromUri]string username)
        {
            return this.users.Users(username);
        }

        [HttpGet]
        [Route("Lock")]
        public async Task<IHttpActionResult> Lock([FromUri]string username)
        {
            if (username == null)
            {
                return BadRequest("Username cannot be null!");
            }

            User user = await UserManager.FindByNameAsync(username);

            if (user == null)
            {
                return BadRequest($"User with {username} is not existing in database");
            }

            if (user.LockoutEnabled)
            {
                return BadRequest($"User {username} is already locked");
            }

            await UserManager.SetLockoutEnabledAsync(user.Id, true);
            await UserManager.SetLockoutEndDateAsync(user.Id, DateTime.UtcNow.AddYears(10));

            return Ok($"User {username} successfully locked");
        }

        [HttpGet]
        [Route("Unlock")]
        public async Task<IHttpActionResult> Unlock([FromUri]string username)
        {
            if (username == null)
            {
                return BadRequest("Username cannot be null!");
            }

            User user = await UserManager.FindByNameAsync(username);

            if (user == null)
            {
                return BadRequest($"User with {username} is not existing in database");
            }

            if (!user.LockoutEnabled)
            {
                return BadRequest($"User {username} is unlocked");
            }

            await UserManager.SetLockoutEnabledAsync(user.Id, false);

            return Ok($"User {username} successfully unlocked");
        }

        [HttpGet]
        [Route("AddRole")]
        public IHttpActionResult AddRole([FromUri]string username, [FromUri]string roleName)
        {
            if (username == null || roleName == null)
            {
                return BadRequest("User and Role names cannot be null!");
            }

            try
            {
                this.users.AddRole(username, roleName);
            }
            catch (BadRequestException bre)
            {
                return BadRequest(bre.Message);
            }

            return Ok($"User {username} successfully added to {roleName} role.");
        }

        [HttpGet]
        [Route("RemoveRole")]
        public IHttpActionResult RemoveRole([FromUri]string username, [FromUri]string roleName)
        {
            if (username == null || roleName == null)
            {
                return BadRequest("User and Role names cannot be null!");
            }

            try
            {
                this.users.RemoveRole(username, roleName);
            }
            catch (BadRequestException bre)
            {
                return BadRequest(bre.Message);
            }

            return Ok($"User {username} successfully removed from {roleName} role.");
        }
    }
}