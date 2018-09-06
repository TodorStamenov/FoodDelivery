using FoodDelivery.Common;
using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class CategoryService : Service<Category>, ICategoryService
    {
        public CategoryService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public void Create(string name, byte[] image)
        {
            if (HasCategory(name))
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, nameof(Category)));
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

        public void Edit(Guid id, string name, byte[] image)
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
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, nameof(Category)));
            }

            category.Name = name;
            category.Image = image ?? category.Image;

            Database.SaveChanges();
        }

        public CategoryViewModel GetCategory(Guid id)
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
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Category)));
            }

            return model;
        }

        public IEnumerable<CategoryViewModel> Categories()
        {
            return Database
                .Categories
                .Select(c => new CategoryViewModel
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .ToList();
        }

        public IEnumerable<ListCategoriesViewModel> All()
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

        public IEnumerable<ListCategoriesWithProductsViewModel> AllWithProducts()
        {
            return Database
                .Categories
                .OrderBy(c => c.Name)
                .Where(c => c.Products.Any())
                .ToList()
                .Select(c => new ListCategoriesWithProductsViewModel
                {
                    Id = c.Id,
                    Name = c.Name,
                    Image = "data:image/jpeg;base64, " + Convert.ToBase64String(c.Image),
                    Products = c.Products
                        .Select(p => new ListProductsViewModel
                        {
                            Id = p.Id,
                            Name = p.Name,
                            Mass = p.Mass,
                            Price = p.Price
                        })
                });
        }
    }
}