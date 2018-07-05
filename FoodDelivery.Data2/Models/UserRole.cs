using Microsoft.AspNet.Identity.EntityFramework;

namespace FoodDelivery.Data.Models
{
    public class UserRole : IdentityUserRole<int>
    {
        public virtual User User { get; set; }

        public virtual Role Role { get; set; }
    }
}