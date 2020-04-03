using System.Threading;
using System.Threading.Tasks;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Identity;

namespace Application.User
{
    public class CurrentUser
    {
        public class Query : IRequest<User> { }

        public class Handler : IRequestHandler<Query, User>
        {
            private readonly UserManager<AppUser> _manager;
            private readonly IJwtGenerator _jwtGenerator;
            private readonly IUserAccessor _accessor;

            public Handler(UserManager<AppUser> manager,
                IJwtGenerator jwtGenerator,
                IUserAccessor accessor)
            {
                _jwtGenerator = jwtGenerator;
                _accessor = accessor;
                _manager = manager;
            }

            public async Task<User> Handle(Query request, CancellationToken cancellationToken)
            {
                AppUser user = await _manager.FindByNameAsync(_accessor.GetCurrentUser());

                return new User
                {
                    DisplayName = user.DisplayName,
                    UserName = user.UserName,
                    Token = _jwtGenerator.CreateToken(user),
                    Image = null
                };
            }
        }
    }
}