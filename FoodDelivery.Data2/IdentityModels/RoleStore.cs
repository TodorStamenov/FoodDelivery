using FoodDelivery.Data.Models;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FoodDelivery.Data.IdentityModels
{
    public class RoleStore : RoleStore<Role, int, UserRole>
    {
        public RoleStore(FoodDeliveryDbContext context)
            : base(context)
        {
        }
    }
}