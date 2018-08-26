using Microsoft.AspNet.Identity.EntityFramework;
using System;

namespace FoodDelivery.Data.Models
{
    public class UserRole : IdentityUserRole<Guid>
    {
        public virtual User User { get; set; }

        public virtual Role Role { get; set; }
    }
}