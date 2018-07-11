using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Models.ViewModels.Users;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class AdminService : Service, IAdminService
    {
        private const int UsersInPage = 20;

        public AdminService(FoodDeliveryDbContext db)
            : base(db)
        {
        }

        public IEnumerable<ListUsersViewModel> AllUsers(string userQuery)
        {
            IOrderedQueryable<User> query = this.db
                .Users
                .OrderBy(u => u.UserName);

            if (string.IsNullOrEmpty(userQuery) ||
                string.IsNullOrWhiteSpace(userQuery))
            {
                return query
                    .Take(UsersInPage)
                    .Select(u => new ListUsersViewModel
                    {
                        Id = u.Id,
                        Username = u.UserName,
                        IsLocked = u.LockoutEnabled,
                        Roles = u.Roles.Select(r => r.Role.Name)
                    })
                    .ToList();
            }

            return query
                .Where(u => u.UserName.Contains(userQuery))
                .Take(UsersInPage)
                .Select(u => new ListUsersViewModel
                {
                    Id = u.Id,
                    Username = u.UserName,
                    IsLocked = u.LockoutEnabled,
                    Roles = u.Roles.Select(r => r.Role.Name)
                })
                .ToList();
        }
    }
}