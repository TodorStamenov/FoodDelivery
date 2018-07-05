using FoodDelivery.Data.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FoodDelivery.Data.IdentityModels
{
    public class UserStore : UserStore<User, Role, int, UserLogin, UserRole, UserClaim>
    {
        public UserStore(FoodDeliveryDbContext context)
            : base(context)
        {
        }
    }
}