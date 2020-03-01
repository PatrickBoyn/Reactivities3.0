using System.Runtime.Loader;
using System.Diagnostics.Contracts;
using System.ComponentModel.Design.Serialization;
using System.Threading;
using System.Net;
using System;
using System.Threading.Tasks;
using Application.Errors;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using System.Text.Json;

namespace API.Middleware
{
    public class ErrorHandlingMiddleWare
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ErrorHandlingMiddleWare> _logger;

        public ErrorHandlingMiddleWare(RequestDelegate next, ILogger<ErrorHandlingMiddleWare> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception e)
            {
                await HandleExceptionAsync(context, e, _logger);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception e, ILogger<ErrorHandlingMiddleWare> logger)
        {
            object errors = null;

            switch (e)
            {
                case RestException re:
                    logger.LogError(e, "REST ERROR");
                    errors = re.Errors;
                    context.Response.StatusCode = (int)re.Code;
                    break;
                case Exception ex:
                    logger.LogError(e, "SERVER ERROR.");
                    errors = String.IsNullOrWhiteSpace(ex.Message) ? "Error" : ex.Message;
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    break;
            }

            context.Response.ContentType = "application/json";
            if (errors != null)
            {
                string result = JsonSerializer.Serialize(new
                {
                    errors
                });

                await context.Response.WriteAsync(result);
            }
        }
    }
}