using FoodDelivery.Services.Models.ViewModels.Ingredients;
using System.Collections.Generic;

namespace FoodDelivery.Services
{
    public interface IIngredientService : IService
    {
        void Create(string name, string ingredientTypeString);

        void Edit(int id, string name, string ingredientTypeString);

        IngredientViewModel GetIngredient(int id);

        IEnumerable<string> GetTypes();

        IEnumerable<ListIngredientsViewModel> All(int page, int pageSize);
    }
}