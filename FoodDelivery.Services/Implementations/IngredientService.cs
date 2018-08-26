using FoodDelivery.Common;
using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Ingredients;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class IngredientService : Service<Ingredient>, IIngredientService
    {
        public IngredientService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public void Create(string name, string ingredientTypeString)
        {
            if (HasIngredient(name))
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, name));
            }

            bool hasIngredientType = Enum.TryParse(ingredientTypeString, out IngredientType ingredientType);

            if (!hasIngredientType)
            {
                throw new InvalidEnumException();
            }

            Database
               .Ingredients
               .Add(new Ingredient
               {
                   Name = name,
                   IngredientType = ingredientType
               });

            Database.SaveChanges();
        }

        public void Edit(Guid id, string name, string ingredientTypeString)
        {
            Ingredient ingredient = Database
                .Ingredients
                .Find(id);

            if (ingredient == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, id));
            }

            if (HasIngredient(name) && name != ingredient.Name)
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, name));
            }

            bool hasIngredientType = Enum.TryParse(ingredientTypeString, out IngredientType ingredientType);

            if (!hasIngredientType)
            {
                throw new InvalidEnumException();
            }

            ingredient.Name = name;
            ingredient.IngredientType = ingredientType;

            Database.SaveChanges();
        }

        public IngredientViewModel GetIngredient(Guid id)
        {
            IngredientViewModel model = Database
                .Ingredients
                .Where(i => i.Id == id)
                .Select(i => new IngredientViewModel
                {
                    Id = i.Id,
                    Name = i.Name
                })
                .FirstOrDefault();

            if (model == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Ingredient)));
            }

            return model;
        }

        public IEnumerable<string> GetTypes()
        {
            return Enum
                .GetValues(typeof(IngredientType))
                .Cast<IngredientType>()
                .Select(it => it.ToString());
        }

        public IEnumerable<ListIngredientsViewModel> All(int page, int pageSize)
        {
            return Database
                .Ingredients
                .OrderBy(i => i.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(i => new ListIngredientsViewModel
                {
                    Id = i.Id,
                    Name = i.Name,
                    IngredientType = i.IngredientType.ToString()
                })
                .ToList();
        }

        private bool HasIngredient(string name)
        {
            return Database.Ingredients.Any(c => c.Name == name);
        }
    }
}