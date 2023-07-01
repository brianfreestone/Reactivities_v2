using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class Edit
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Profiles.Profile Profile { get; set; }
            //public string DisplayName { get; set; }    
            //public string Bio { get; set; } 
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Where(x=> x.UserName ==  _userAccessor.GetUsername()).FirstOrDefaultAsync();
                if (user == null) 
                {
                    return null;
                }
                user.DisplayName = request.Profile.DisplayName ?? user.DisplayName;
                user.Bio = request.Profile.Bio ?? user.Bio;

                _context.Entry(user).State = EntityState.Modified;  

                var success = await _context.SaveChangesAsync() >0; 

                if(!success)
                {
                    return Result<Unit>.Failure("Failed to update profile");
                }

                return Result<Unit>.Success(Unit.Value);

            }
        }
    }
}
