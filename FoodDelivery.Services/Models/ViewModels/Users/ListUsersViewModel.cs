using AutoMapper;
using FoodDelivery.Common.Mapping;
using FoodDelivery.Data.Models;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Models.ViewModels.Users
{
    public class ListUsersViewModel : IMapFrom<User>, ICustomMapping
    {
        public int Id { get; set; }

        public string UserName { get; set; }

        public bool IsLocked { get; set; }

        public IEnumerable<string> Roles { get; set; }

        public void ConfigureMapping(Profile mapper)
        {
            mapper.CreateMap<User, ListUsersViewModel>()
                .ForMember(u => u.Roles, cfg => cfg.MapFrom(u => u.Roles.Select(r => r.Role.Name)));
        }
    }
}