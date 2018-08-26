using FoodDelivery.Data.Models;
using Microsoft.AspNet.Identity.EntityFramework;
using System;

namespace FoodDelivery.Data.IdentityModels
{
    public class RoleStore : RoleStore<Role, Guid, UserRole>
    {
        public RoleStore(FoodDeliveryDbContext context)
            : base(context)
        {
        }
    }
}