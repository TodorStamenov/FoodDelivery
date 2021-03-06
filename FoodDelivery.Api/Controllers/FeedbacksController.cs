﻿using FoodDelivery.Common;
using FoodDelivery.Data.Models;
using FoodDelivery.Services;
using FoodDelivery.Services.Exceptions;
using FoodDelivery.Services.Models.BindingModels.Feedbacks;
using FoodDelivery.Services.Models.ViewModels.Feedbacks;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace FoodDelivery.Api.Controllers
{
    [RoutePrefix("api/Feedbacks")]
    [Authorize(Roles = CommonConstants.ModeratorRole)]
    public class FeedbacksController : ApiController
    {
        private const int PageSize = 10;

        private readonly IFeedbackService feedback;

        public FeedbacksController(IFeedbackService feedback)
        {
            this.feedback = feedback;
        }

        [Route("{page?}")]
        public IHttpActionResult Get(int page = 1)
        {
            if (page <= 0)
            {
                page = 1;
            }

            return Ok(new FeedbacksViewModel
            {
                CurrentPage = page,
                EntriesPerPage = PageSize,
                TotalEntries = this.feedback.GetTotalEntries(),
                Feedbacks = this.feedback.All(page, PageSize)
            });
        }

        [HttpGet]
        [Route("rates")]
        [OverrideAuthorization]
        [Authorize]
        public IEnumerable<string> Rates()
        {
            return this.feedback.Rates();
        }

        [HttpPost]
        [Route("{productId}")]
        [OverrideAuthorization]
        [Authorize]
        public IHttpActionResult Post(Guid? productId, [FromBody]FeedbackBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                this.feedback.Create(productId.GetValueOrDefault(), User.Identity.GetUserId(), model.Content, model.Rate);
                return Ok(string.Format(CommonConstants.SuccessfullEntityOperation, nameof(Feedback), CommonConstants.Created));
            }
            catch (BadRequestException bre)
            {
                ModelState.AddModelError(CommonConstants.ErrorKey, bre.Message);
                return BadRequest(ModelState);
            }
        }
    }
}