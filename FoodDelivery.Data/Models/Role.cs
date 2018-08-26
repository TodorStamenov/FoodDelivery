using Microsoft.AspNet.Identity.EntityFramework;
using System;

namespace FoodDelivery.Data.Models
{
    public class Role : IdentityRole<Guid, UserRole>
    {
    }
}