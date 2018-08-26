using FoodDelivery.Services.Models.ViewModels.Ingredients;
using System;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IIngredientService : IService
    {
        void Create(string name, string ingredientTypeString);

        void Edit(Guid id, string name, string ingredientTypeString);

        IngredientViewModel GetIngredient(Guid id);

        IEnumerable<string> GetTypes();

        IEnumerable<ListIngredientsViewModel> All(int page, int pageSize);
    }
}