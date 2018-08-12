using FoodDelivery.Common;
using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Categories;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class CategoryService : Service, ICategoryService
    {
        private const string Category = "Category";

        public CategoryService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public void Create(string name, byte[] image)
        {
            if (HasCategory(name))
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, name));
            }

            Database
                .Categories
                .Add(new Category
                {
                    Name = name,
                    Image = image
                });

            Database.SaveChanges();
        }

        public void Edit(int id, string name, byte[] image)
        {
            Category category = Database
                .Categories
                .Find(id);

            if (category == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, id));
            }

            if (HasCategory(name) && name != category.Name)
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, name));
            }

            category.Name = name;
            category.Image = image ?? category.Image;

            Database.SaveChanges();
        }

        public CategoryViewModel GetCategory(int id)
        {
            CategoryViewModel model = Database
                .Categories
                .Where(c => c.Id == id)
                .Select(c => new CategoryViewModel
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .FirstOrDefault();

            if (model == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, Category));
            }

            return model;
        }

        public IEnumerable<ListCategoriesViewModel> Categories()
        {
            return Database
                .Categories
                .Select(c => new ListCategoriesViewModel
                {
                    Id = c.Id,
                    Name = c.Name,
                    Products = c.Products.Count
                })
                .ToList();
        }

        private bool HasCategory(string name)
        {
            return Database.Categories.Any(c => c.Name == name);
        }
    }
}