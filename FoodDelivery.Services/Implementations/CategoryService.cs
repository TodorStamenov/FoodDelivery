using FoodDelivery.Data;
using FoodDelivery.Services.Models.BindingModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class CategoryService : Service, ICategoryService
    {
        public CategoryService(FoodDeliveryDbContext db)
            : base(db)
        {
        }

        public void Create(CreateCategoryBindingModel model)
        {
            throw new System.NotImplementedException();
        }

        public void Edit(int id, EditCategoryBindingModel model)
        {
            throw new System.NotImplementedException();
        }

        public EditCategoryViewModel Category(int id)
        {
            return this.db
                .Categories
                .Where(c => c.Id == id)
                .Select(c => new EditCategoryViewModel
                {
                    Id = c.Id,
                    Name = c.Name
                })
                .FirstOrDefault();
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
            return this.db
                .Products
                .Where(p => p.CategoryId == categoryId)
                .Select(p => new ListProductsViewModel
                {
                })
                .ToList();
        }
    }
}