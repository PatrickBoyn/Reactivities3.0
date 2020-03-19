using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<AppUser>
        {
            public string Email { get; set; }
            public string Password { get; set; }
        }

        public class QueryValidator : AbstractValidator<Query>
        {
            public QueryValidator()
            {
                RuleFor(e => e.Email).NotEmpty();
                RuleFor(p => p.Password).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Query, AppUser>
        {
            private readonly UserManager<AppUser> _userManager;
            private readonly SignInManager<AppUser> _signIn;

            public Handler(UserManager<AppUser> userManager, SignInManager<AppUser> signIn)
            {
                _signIn = signIn;
                _userManager = userManager;
            }

            public async Task<AppUser> Handle(Query request, CancellationToken cancellationToken)
            {
                AppUser user = await _userManager.FindByEmailAsync(request.Email);

                if (user == null)
                {
                    throw new RestException(HttpStatusCode.Unauthorized);
                }

                SignInResult result = await _signIn.CheckPasswordSignInAsync(user, request.Password, false);

                if (result.Succeeded)
                {
                    // TODO generate token.
                    return user;
                }

                throw new RestException(HttpStatusCode.Unauthorized);

            }
        }
    }
}