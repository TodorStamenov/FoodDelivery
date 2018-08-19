using System;

namespace FoodDelivery.Services.Models.ViewModels
{
    public class BasePageViewModel
    {
        public int CurrentPage { get; set; }

        public int TotalEntries { get; set; }

        public int EntriesPerPage { get; set; }

        public int NextPage
        {
            get
            {
                return this.CurrentPage + 1 >= this.TotalPages
                    ? this.TotalPages
                    : this.CurrentPage + 1;
            }
        }

        public int PrevPage
        {
            get
            {
                return this.CurrentPage <= 1
                    ? 1
                    : this.CurrentPage - 1;
            }
        }

        public int TotalPages
        {
            get
            {
                return (int)Math.Ceiling(this.TotalEntries / (double)this.EntriesPerPage);
            }
        }
    }
}