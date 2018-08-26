using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Users;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class UserService : Service<User>, IUserService
    {
        private const int UsersInPage = 20;

        public UserService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public void AddRole(string username, string roleName)
        {
            var userRoleInfo = Database
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

            Guid? userId = Database
                .Users
                .Where(u => u.UserName == username)
                .Select(u => new { u.Id })
                .FirstOrDefault()?
                .Id;

            Guid? roleId = Database
                .Roles
                .Where(r => r.Name == roleName)
                .Select(r => new { r.Id })?
                .FirstOrDefault()?
                .Id;

            if (userId == null || roleId == null)
            {
                throw new NotExistingEntryException($"{username} username or ${roleName} role not existing in database");
            }

            UserRole userRole = new UserRole
            {
                RoleId = roleId.Value,
                UserId = userId.Value
            };

            Database.UserRoles.Add(userRole);
            Database.SaveChanges();
        }

        public void RemoveRole(string username, string roleName)
        {
            UserRole userRole = Database
                .UserRoles
                .Where(ur => ur.Role.Name == roleName)
                .Where(ur => ur.User.UserName == username)
                .FirstOrDefault();

            if (userRole == null)
            {
                throw new DuplicateEntryException($"User {username} is not in {roleName} role");
            }

            Database.UserRoles.Remove(userRole);
            Database.SaveChanges();
        }

        public IEnumerable<ListUsersViewModel> All(string userQuery)
        {
            IQueryable<User> query = Database.Users;

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