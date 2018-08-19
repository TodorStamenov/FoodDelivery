using FoodDelivery.Services.Models.ViewModels.Products;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IProductService
    {
        IEnumerable<ListProductsViewModel> All(int categoryId);
    }
}