using System;

namespace FoodDelivery.Services.Models.ViewModels
{
    public class BasePageViewModel
    {
        public int CurrentPage { get; set; }

        public int TotalEntries { get; set; }

        public int EntriesPerPage { get; set; }

        public int TotalPages
        {
            get
            {
                return (int)Math.Ceiling(this.TotalEntries / (double)this.EntriesPerPage);
            }
        }
    }
}