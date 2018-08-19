using FoodDelivery.Services.Models.ViewModels.Users;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IUserService
    {
        void AddRole(string username, string roleName);

        void RemoveRole(string username, string roleName);

        IEnumerable<ListUsersViewModel> All(string userQuery);
    }
}