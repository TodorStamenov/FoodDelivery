using FoodDelivery.Common;
using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Toppings;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class ToppingService : Service<Topping>, IToppingService
    {
        public ToppingService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public void Create(string name)
        {
            if (HasTopping(name))
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, name));
            }

            Database
               .Toppings
               .Add(new Topping
               {
                   Name = name
               });

            Database.SaveChanges();
        }

        public void Edit(Guid id, string name)
        {
            Topping topping = Database
                .Toppings
                .Find(id);

            if (topping == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, id));
            }

            if (HasTopping(name) && name != topping.Name)
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, name));
            }

            topping.Name = name;

            Database.SaveChanges();
        }

        public void Delete(Guid id)
        {
            Topping topping = Database
                .Toppings
                .Find(id);

            if (topping == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, id));
            }

            Database.Toppings.Remove(topping);
            Database.SaveChanges();
        }

        public ToppingViewModel GetTopping(Guid id)
        {
            ToppingViewModel model = Database
                .Toppings
                .Where(i => i.Id == id)
                .Select(i => new ToppingViewModel
                {
                    Id = i.Id,
                    Name = i.Name
                })
                .FirstOrDefault();

            if (model == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Topping)));
            }

            return model;
        }

        public IEnumerable<ListToppingsViewModel> All(int page, int pageSize)
        {
            return Database
                .Toppings
                .OrderBy(i => i.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(i => new ListToppingsViewModel
                {
                    Id = i.Id,
                    Name = i.Name
                })
                .ToList();
        }

        private bool HasTopping(string name)
        {
            return Database.Toppings.Any(c => c.Name == name);
        }
    }
}