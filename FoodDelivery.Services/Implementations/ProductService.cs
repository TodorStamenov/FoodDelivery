using FoodDelivery.Common;
using FoodDelivery.Data;
using FoodDelivery.Data.Models;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Products;
using FoodDelivery.Services.Models.ViewModels.Products;
using System;
using System.Collections.Generic;
using System.Linq;

namespace FoodDelivery.Services.Implementations
{
    public class ProductService : Service<Product>, IProductService
    {
        public ProductService(FoodDeliveryDbContext database)
            : base(database)
        {
        }

        public void Create(string name, decimal price, int mass, Guid categoryId)
        {
            if (HasProduct(name))
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, nameof(Product)));
            }

            if (!Database.Categories.Any(c => c.Id == categoryId))
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Category)));
            }

            Database
               .Products
               .Add(new Product
               {
                   Name = name,
                   Price = price,
                   Mass = mass,
                   CategoryId = categoryId
               });

            Database.SaveChanges();
        }

        public void Edit(Guid id, string name, decimal price, int mass, Guid categoryId)
        {
            Product product = Database
                .Products
                .Find(id);

            if (product == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Product)));
            }

            if (HasProduct(name) && name != product.Name)
            {
                throw new DuplicateEntryException(string.Format(CommonConstants.DuplicateEntry, nameof(Product)));
            }

            if (!Database.Categories.Any(c => c.Id == categoryId))
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Category)));
            }

            product.Name = name;
            product.Price = price;
            product.Mass = mass;
            product.CategoryId = categoryId;

            Database.SaveChanges();
        }

        public void Delete(Guid id)
        {
            Product product = Database
                .Products
                .Find(id);

            if (product == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Product)));
            }

            Database.Products.Remove(product);
            Database.SaveChanges();
        }

        public ProductBindigModel GetProduct(Guid id)
        {
            ProductBindigModel model = Database
                .Products
                .Where(p => p.Id == id)
                .Select(p => new ProductBindigModel
                {
                    Name = p.Name,
                    Price = p.Price,
                    Mass = p.Mass,
                    CategoryId = p.CategoryId
                })
                .FirstOrDefault();

            if (model == null)
            {
                throw new NotExistingEntryException(string.Format(CommonConstants.NotExistingEntry, nameof(Product)));
            }

            return model;
        }

        public IEnumerable<ListProductsModeratorViewModel> All(int page, int pageSize)
        {
            return Database
                .Products
                .OrderBy(p => p.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ListProductsModeratorViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Mass = p.Mass,
                    Price = p.Price,
                    Category = p.Category.Name,
                    Rating = !p.Feedbacks.Any()
                        ? "Not Evaluated"
                        : (Math.Round(p.Feedbacks
                            .Select(f => f.Rate)
                            .Cast<int>()
                            .Average(), 1) + 1)
                            .ToString() + "/5"
                })
                .ToList();
        }

        public IEnumerable<ListProductsModeratorViewModel> All(Guid categoryId, int page, int pageSize)
        {
            return Database
                .Products
                .Where(p => p.CategoryId == categoryId)
                .OrderBy(p => p.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new ListProductsModeratorViewModel
                {
                    Id = p.Id,
                    Name = p.Name,
                    Mass = p.Mass,
                    Price = p.Price,
                    Category = p.Category.Name,
                    Rating = !p.Feedbacks.Any()
                        ? "Not Evaluated"
                        : (Math.Round(p.Feedbacks
                            .Select(f => f.Rate)
                            .Cast<int>()
                            .Average(), 1) + 1)
                            .ToString() + "/5"
                })
                .ToList();
        }

        private bool HasProduct(string name)
        {
            return Database.Products.Any(c => c.Name == name);
        }
    }
}