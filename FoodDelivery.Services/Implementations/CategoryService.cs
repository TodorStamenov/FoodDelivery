using FoodDelivery.Common;
using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.ViewModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class CategoryService : Service, ICategoryService
    {
        private const string Category = "Category";

        public CategoryService(FoodDeliveryDbContext db)
            : base(db)
        {
        }

        public void Create(string name, byte[] image)
        {
            this.db
                .Categories
                .Add(new Category
                {
                    Name = name,
                    Image = image
                });

            this.db.SaveChanges();
        }

        public void Edit(int id, string name, byte[] image)
        {
            throw new System.NotImplementedException();
        }

        public CategoryViewModel GetCategory(int id)
        {
            CategoryViewModel model = this.db
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
            return this.db
                .Categories
                .Select(c => new ListCategoriesViewModel
                {
                    Id = c.Id,
                    Name = c.Name,
                    Products = c.Products.Count
                })
                .ToList();
        }

        public IEnumerable<ListProductsViewModel> Products(int categoryId)
        {
            IEnumerable<ListProductsViewModel> model = this.db
                .Products
                .Where(p => p.CategoryId == categoryId)
                .Select(p => new ListProductsViewModel
                {
                })
                .ToList();

            if (!model.Any())
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, Category));
            }

            return model;
        }
    }
}