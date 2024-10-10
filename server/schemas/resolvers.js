const { User, Book } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id }).populate('workouts').populate('foodIntake');
            }
            throw AuthenticationError;
        },
        fitness: async (parent, { fitnessId }) => {
            return Fitness.findOne({ _id: fitnessId });
        },
        nutrition: async (parent, { nutritionId }) => {
            return Nutrition.findOne({ _id: nutritionId });
        },
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError;
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError;
            }

            const token = signToken(user);

            return { token, user };
        },
        saveBook: async (parent, { bookAuthor, description, title, bookID }) => {
            console.log(username);

            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: { bookAuthor, description, title, bookID } } },
            );

            return updatedUser;
        },
        // remove a book from `savedBooks`
        removeBook: async (parent, { user, bookID }, res) => {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $pull: { savedBooks: { bookID: params.bookId } } },
                { new: true }
            );
            if (!updatedUser) {
                return res.status(404).json({ message: "Couldn't find user with this id!" });
            }
            return updatedUser;
        },
    }
}

module.exports = resolvers