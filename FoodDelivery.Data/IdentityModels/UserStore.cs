using FoodDelivery.Data.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;

namespace FoodDelivery.Data.IdentityModels
{
    public class UserStore : UserStore<User, Role, Guid, UserLogin, UserRole, UserClaim>
    {
        public UserStore(FoodDeliveryDbContext context)
            : base(context)
        {
        }
    }
}