using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Categories
{
    public class List
    {

        public class Query : IRequest<Result<List<Category>>>
        { 
            public List<Category> Categories { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<Category>>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }
            public async Task<Result<List<Category>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<Category>>.Success(await _context.Categories.ToListAsync());
            }
        }

    }
}
