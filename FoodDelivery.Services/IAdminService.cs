using FoodDelivery.Services.Models.ViewModels.Users;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IAdminService
    {
        IEnumerable<ListUsersViewModel> AllUsers(string userQuery);
    }
}