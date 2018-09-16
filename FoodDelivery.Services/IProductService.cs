using FoodDelivery.Services.Models.BindingModels.Products;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IProductService : IService
    {
        void Create(string name, decimal price, int mass, Guid categoryId, IEnumerable<Guid> toppingIds);

        void Edit(Guid id, string name, decimal price, int mass, Guid categoryId, IEnumerable<Guid> toppingIds);

        void Delete(Guid id);

        int GetTotalEntries(Guid categoryId);

        ProductBindigModel GetProduct(Guid id);

        IEnumerable<ListProductsModeratorViewModel> All(int page, int pageSize);

        IEnumerable<ListExtendedProductsWithToppingsViewModel> All(IEnumerable<Guid> productIds);
    }
}