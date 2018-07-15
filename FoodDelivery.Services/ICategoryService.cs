using FoodDelivery.Services.Models.BindingModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Categories;
using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface ICategoryService
    {
        void Create(CreateCategoryBindingModel model);

        void Edit(int id, EditCategoryBindingModel model);

        EditCategoryViewModel Category(int id);

        IEnumerable<ListProductsViewModel> Products(int categoryId);

        IEnumerable<ListCategoriesViewModel> Categories();
    }
}