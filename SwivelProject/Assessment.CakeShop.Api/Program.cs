using Assessment.CakeShop.Core.Services.Common;
using Assessment.CakeShop.Core.Services.IService;
using Assessment.CakeShop.Services;
using Assessment.DataAccess.EfCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

IConfiguration configuration = builder.Configuration;

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DBContext>(options =>
        options.UseSqlServer(configuration.GetConnectionString("DBConnection")));

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddTransient<IToppingService, ToppingService>();
builder.Services.AddTransient<ICakeShapeService, CakeShapeService>();
builder.Services.AddTransient<IHashService, HashService>();
builder.Services.AddTransient<IAuthService, AuthService>();


builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
          .AddJwtBearer(x =>
          {
              x.TokenValidationParameters = new TokenValidationParameters
              {
                  ValidateIssuerSigningKey = true,
                  IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("KeyoftheexternalAPI")),
                  ValidateIssuer = false,
                  ValidateAudience = false,
                  // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                  ClockSkew = TimeSpan.Zero
              };
          });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseAuthentication();
app.UseAuthorization();
app.UseCors(policy => policy.AllowAnyHeader()
                            .AllowAnyMethod()
                            .SetIsOriginAllowed(origin => true)
                            .AllowCredentials());
app.MapControllers();

app.Run();
