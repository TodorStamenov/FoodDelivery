using System;
using System.Collections.Generic;

namespace FoodDelivery.Services.Models.ViewModels.Users
{
    public class ListUsersViewModel
    {
        public Guid Id { get; set; }

        public string Username { get; set; }

        public bool IsLocked { get; set; }

        public IEnumerable<string> Roles { get; set; }
    }
}