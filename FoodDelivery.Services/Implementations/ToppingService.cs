using FoodDelivery.Common;
using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Toppings;
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
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, nameof(Topping)));
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
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Topping)));
            }

            if (HasTopping(name) && name != topping.Name)
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, nameof(Topping)));
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
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Topping)));
            }

            Database.Toppings.Remove(topping);
            Database.SaveChanges();
        }

        public ToppingBindingModel GetTopping(Guid id)
        {
            ToppingBindingModel model = Database
                .Toppings
                .Where(t => t.Id == id)
                .Select(t => new ToppingBindingModel { Name = t.Name })
                .FirstOrDefault();

            if (model == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Topping)));
            }

            return model;
        }

        public IEnumerable<ListToppingsViewModel> All()
        {
            return Database
                .Toppings
                .OrderBy(t => t.Name)
                .Select(t => new ListToppingsViewModel
                {
                    Id = t.Id,
                    Name = t.Name
                })
                .ToList();
        }

        private bool HasTopping(string name)
        {
            return Database.Toppings.Any(c => c.Name == name);
        }
    }
}