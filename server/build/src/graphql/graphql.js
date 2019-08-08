"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const apollo_server_express_1 = require("apollo-server-express");
const fs_1 = tslib_1.__importDefault(require("fs"));
const path_1 = tslib_1.__importDefault(require("path"));
const queries_1 = require("./queries/queries");
const mutations_1 = require("./mutations/mutations");
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
// Create a logger
const resolvers = {
    Query: queries_1.queries,
    Mutation: mutations_1.mutations
};
const typeDefs = [
    fs_1.default.readFileSync(path_1.default.join(__dirname, 'schema.graphql'), 'utf8')
];
exports.gqlServer = new apollo_server_express_1.ApolloServer({
    typeDefs,
    resolvers,
    engine: {
        apiKey: 'service:mantella:Ylb-gXcuSHCbWhBHn_Oa_A'
    },
    tracing: true,
    context: async ({ req, res }) => {
        try {
            const token = jsonwebtoken_1.default.decode(req.cookies['auth-token']);
            return { req, res, userId: token };
        }
        catch (err) {
            if (res) {
                res.clearCookie('auth-token');
            }
            return { req, res, user: null };
        }
    }
});
//# sourceMappingURL=graphql.js.map