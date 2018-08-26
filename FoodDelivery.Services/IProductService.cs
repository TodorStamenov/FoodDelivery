using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IProductService : IService
    {
        IEnumerable<ListProductsViewModel> All(Guid categoryId);
    }
}