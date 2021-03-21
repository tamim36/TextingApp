using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Models.Entities;

namespace DataManager.Contracts
{
    public interface IChatManager
    {
        public Task<TextMessage> StoreInExistingGroup(TextMessage message);
        public Task DeleteMessage(MessageGroup message);
        public Task DeleteSingleMessage(TextMessage message, string deleteType);

        public Task<ICollection<MessageGroup>> GetOldMessages(int id);
        public Task<MessageGroup> GetMessageGroup(int senderId, int receiverId);

        public Task<MessageGroup> CreateNewGroup(MessageGroup messageGroup);

        public Task<bool> HasMessageGroup(int senderId, int receiverId);
    }
}
