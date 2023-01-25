const { User, Message, Reaction } = require("../../models");
const {
  UserInputError,
  AuthenticationError,
  withFilter,
} = require("apollo-server");
const { Op } = require("sequelize");

module.exports = {
  Query: {
    getMessages: async (parant, { from }, { user }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated");

        const otherUser = await User.findOne({ where: { email: from } });
        if (!otherUser)
          throw new UserInputError(
            "We clould not find user you trying to reach."
          );

        const senderReciever = [user.email, otherUser.email];

        const allMessages = await Message.findAll({
          where: {
            from: { [Op.in]: senderReciever },
            to: { [Op.in]: senderReciever },
          },
          order: [["createdAt", "DESC"]],
          include: [{ model: Reaction, as: "reactions" }],
        });

        return allMessages;
      } catch (error) {
        throw error;
      }
    },
  },

  Mutation: {
    sendMessage: async (parant, { to, content }, { user, pubsub }) => {
      try {
        if (!user) throw new AuthenticationError("Unauthenticated User!");

        const recipient = await User.findOne({ where: { email: to } });

        if (!recipient) throw new UserInputError("Recipient not found");

        if (recipient.email === user.email)
          throw new UserInputError("You cant message you!");

        if (content.trim() === "")
          throw new UserInputError("Message should not be empty!");

        const newMessage = await Message.create({
          from: user.email,
          to,
          content,
        });

        pubsub.publish("ADD_MESSAGE", { newMessage: newMessage });

        return newMessage;
      } catch (error) {
        throw error;
      }
    },
    reactOnMessage: async (parant, { uuid, content }, { user, pubsub }) => {
      const reactions = ["❤️", "😆", "😯", "😢", "😡", "👍", "👎"];
      try {
        if (!reactions.includes(content)) {
          throw new UserInputError("Invalid Error");
        }
        const userEmail = user ? user.email : "";

        user = await User.findOne({ where: { email: userEmail } });
        if (!user) throw new AuthenticationError("Unauthenticated");
        const message = await Message.findOne({ where: { uuid: uuid } });
        if (!message) throw new UserInputError("Message not found");

        if (message.from !== user.email && message.to !== user.email) {
          throw new ForbiddenError("Not allowed to send.");
        }

        let reaction = await Reaction.findOne({
          where: { messageId: message.id, userId: user.id },
        });

        if (reaction) {
          reaction.content = content;
          await reaction.save();
        } else {
          reaction = await Reaction.create({
            messageId: message.id,
            userId: user.id,
            content: content,
          });
        }
        pubsub.publish("ADD_REACTION", { newReaction: reaction });

        return reaction;
      } catch (error) {
        console.error("😡", error);
        throw error;
      }
    },
  },
  Subscription: {
    newMessage: {
      subscribe: withFilter(
        (parant, args, { user, pubsub }) => {
          if (!user) throw new AuthenticationError("Unauthenticated User!");
          return pubsub.asyncIterator(["ADD_MESSAGE"]);
        },
        ({ newMessage }, args, { user }) => {
          if (newMessage.from === user.email || newMessage.to === user.email) {
            return true;
          }
          return false;
        }
      ),
    },
    newReaction: {
      subscribe: withFilter(
        (parant, args, { user, pubsub }) => {
          if (!user) throw new AuthenticationError("Unauthenticated User!");
          return pubsub.asyncIterator(["ADD_REACTION"]);
        },
        async ({ newReaction }, args, { user }) => {
          const message = await newReaction.getMessage();
          if (message.from === user.email || message.to === user.email) {
            return true;
          }
          return false;
        }
      ),
    },
  },
};
