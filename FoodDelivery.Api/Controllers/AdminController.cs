using FoodDelivery.Services;
using FoodDelivery.Services.Models.ViewModels.Users;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [Authorize(Roles = "Admin")]
    [RoutePrefix("api/Admin")]
    public class AdminController : ApiController
    {
        private readonly IAdminService users;

        public AdminController(IAdminService users)
        {
            this.users = users;
        }

        [Route("Users")]
        public IEnumerable<ListUsersViewModel> Get([FromBody]string username)
        {
            return this.users.AllUsers(username);
        }
    }
}