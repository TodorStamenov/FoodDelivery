using FoodDelivery.Services.Models.ViewModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface ICategoryService
    {
        void Create(string name, byte[] image);

        void Edit(int id, string name, byte[] image);

        CategoryViewModel GetCategory(int id);

        IEnumerable<ListProductsViewModel> Products(int categoryId);

        IEnumerable<ListCategoriesViewModel> Categories();
    }
}