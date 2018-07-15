using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
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

        public void AddRole(string username, string roleName)
        {
            var userRoleInfo = this.db
                .UserRoles
                .Where(ur => ur.Role.Name == roleName)
                .Where(ur => ur.User.UserName == username)
                .Select(ur => new
                {
                    ur.RoleId,
                    ur.UserId
                })
                .FirstOrDefault();

            if (userRoleInfo != null)
            {
                throw new DuplicateEntryException($"User {username} is already in {roleName} role");
            }

            int? userId = this.db
                .Users
                .Where(u => u.UserName == username)
                .Select(u => new { u.Id })
                .FirstOrDefault()?
                .Id;

            int? roleId = this.db
                .Roles
                .Where(r => r.Name == roleName)
                .Select(r => new { r.Id })?
                .FirstOrDefault()?
                .Id;

            if (userId == null || roleId == null)
            {
                throw new NotExistingEntryExeption($"{username} username or ${roleName} role not existing in database");
            }

            UserRole userRole = new UserRole
            {
                RoleId = roleId.Value,
                UserId = userId.Value
            };

            this.db.UserRoles.Add(userRole);
            this.db.SaveChanges();
        }

        public void RemoveRole(string username, string roleName)
        {
            UserRole userRole = this.db
                .UserRoles
                .Where(ur => ur.Role.Name == roleName)
                .Where(ur => ur.User.UserName == username)
                .FirstOrDefault();

            if (userRole == null)
            {
                throw new DuplicateEntryException($"User {username} is not in {roleName} role");
            }

            this.db.UserRoles.Remove(userRole);
            this.db.SaveChanges();
        }

        public IEnumerable<ListUsersViewModel> Users(string userQuery)
        {
            IQueryable<User> query = this.db.Users;

            if (!string.IsNullOrEmpty(userQuery) &&
               !string.IsNullOrWhiteSpace(userQuery))
            {
                query = query
                    .Where(u => u.UserName.ToLower().Contains(userQuery.ToLower()));
            }

            return query
                .OrderBy(u => u.UserName)
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