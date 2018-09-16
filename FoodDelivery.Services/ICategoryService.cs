using FoodDelivery.Services.Models.ViewModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface ICategoryService : IService
    {
        void Create(string name, byte[] image);

        void Edit(Guid id, string name, byte[] image);

        CategoryViewModel GetCategory(Guid id);

        IEnumerable<CategoryViewModel> Categories();

        IEnumerable<ListCategoriesViewModel> All();

        IEnumerable<ListProductsModeratorViewModel> Products(Guid categoryId, int page, int pageSize);

        IEnumerable<ListCategoriesWithProductsViewModel> AllWithProducts();
    }
}