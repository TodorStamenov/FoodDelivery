using FoodDelivery.Data.IdentityModels;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;

namespace FoodDelivery.Data.Models
{
    public class User : IdentityUser<Guid, UserLogin, UserRole, UserClaim>
    {
        public virtual List<Feedback> Feedbacks { get; set; } = new List<Feedback>();

        public virtual List<Order> Orders { get; set; } = new List<Order>();

        public virtual List<Order> ReceivedOrders { get; set; } = new List<Order>();

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<User, Guid> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }
    }
}