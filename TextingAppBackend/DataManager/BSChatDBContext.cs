using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Models.Entities;

namespace DataManager
{
    public class BSChatDBContext:DbContext
    {
        public BSChatDBContext(DbContextOptions<BSChatDBContext> options):base(options) { }

        public DbSet<Person> Person { get; set; }
        public DbSet<MessageGroup> MessageGroup { get; set; }
        public DbSet<TextMessage> TextMessage { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
