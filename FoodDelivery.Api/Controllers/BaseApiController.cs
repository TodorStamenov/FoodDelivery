using Microsoft.AspNet.Identity.Owin;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    public class BaseApiController : ApiController
    {
        private ApplicationUserManager userManager;

        public ApplicationUserManager UserManager
        {
            get
            {
                return this.userManager ?? (this.userManager = Request.GetOwinContext().GetUserManager<ApplicationUserManager>());
            }

            protected set
            {
                this.userManager = value;
            }
        }
    }
}