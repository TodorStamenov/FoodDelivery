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
    [RoutePrefix("api/Users")]
    [Authorize(Roles = CommonConstants.AdminRole)]
    public class UsersController : BaseApiController
    {
        private const string UsernameNotNull = "Username cannot be null";
        private const string UserAndRolesNotNull = "User and Role names cannot be null!";
        private const string UserLockedState = "User {0} is currently {1}";

        private readonly IUserService user;

        public UsersController(IUserService user)
        {
            this.user = user;
        }

        [HttpGet]
        [Route("All")]
        public IEnumerable<ListUsersViewModel> All([FromUri]string username)
        {
            return this.user.All(username);
        }

        [HttpGet]
        [Route("Lock")]
        public async Task<IHttpActionResult> Lock([FromUri]string username)
        {
            if (username == null)
            {
                return BadRequest(UsernameNotNull);
            }

            User user = await UserManager.FindByNameAsync(username);

            if (user == null)
            {
                ModelState.AddModelError(CommonConstants.ErrorKey, string.Format(CommonConstants.NotExistingEntry, username));
                return BadRequest(ModelState);
            }

            if (user.LockoutEnabled)
            {
                ModelState.AddModelError(CommonConstants.ErrorKey, string.Format(UserLockedState, username, CommonConstants.Locked));
                return BadRequest(ModelState);
            }

            await UserManager.SetLockoutEnabledAsync(user.Id, true);
            await UserManager.SetLockoutEndDateAsync(user.Id, DateTime.UtcNow.AddYears(10));

            return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, username, CommonConstants.Locked));
        }

        [HttpGet]
        [Route("Unlock")]
        public async Task<IHttpActionResult> Unlock([FromUri]string username)
        {
            if (username == null)
            {
                return BadRequest(UsernameNotNull);
            }

            User user = await UserManager.FindByNameAsync(username);

            if (user == null)
            {
                ModelState.AddModelError(CommonConstants.ErrorKey, string.Format(CommonConstants.NotExistingEntry, username));
                return BadRequest(ModelState);
            }

            if (!user.LockoutEnabled)
            {
                ModelState.AddModelError(CommonConstants.ErrorKey, string.Format(UserLockedState, username, CommonConstants.Unlocked));
                return BadRequest(ModelState);
            }

            await UserManager.SetLockoutEnabledAsync(user.Id, false);

            return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, username, CommonConstants.Unlocked));
        }

        [HttpGet]
        [Route("AddRole")]
        public IHttpActionResult AddRole([FromUri]string username, [FromUri]string roleName)
        {
            if (username == null || roleName == null)
            {
                return BadRequest(UserAndRolesNotNull);
            }

            try
            {
                this.user.AddRole(username, roleName);
                return Ok($"User {username} successfully added to {roleName} role.");
            }
            catch (BadRequestException bre)
            {
                return BadRequest(bre.Message);
            }
        }

        [HttpGet]
        [Route("RemoveRole")]
        public IHttpActionResult RemoveRole([FromUri]string username, [FromUri]string roleName)
        {
            if (username == null || roleName == null)
            {
                return BadRequest(UserAndRolesNotNull);
            }

            try
            {
                this.user.RemoveRole(username, roleName);
                return Ok($"User {username} successfully removed from {roleName} role.");
            }
            catch (BadRequestException bre)
            {
                return BadRequest(bre.Message);
            }
        }
    }
}