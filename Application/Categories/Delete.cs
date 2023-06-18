using Application.Core;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Categories
{
    public  class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; } 
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;

            public Handler(DataContext dataContext)
            {
                _context = dataContext;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var category = await _context.Categories.FindAsync(request.Id);
                if (category == null) 
                {
                    return null;
                }

                _context.Remove(category);

                var result = await _context.SaveChangesAsync() > 0;
                if(!result) 
                {
                    return Result<Unit>.Failure("Failed to delete the category");
                }
                return Result<Unit>.Success(Unit.Value);
            }

        }
    }
}
