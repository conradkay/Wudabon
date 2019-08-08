"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const bodyParser = tslib_1.__importStar(require("body-parser"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const graphql_1 = require("./graphql/graphql");
const morgan = require('morgan');
const path_1 = tslib_1.__importDefault(require("path"));
const express_jwt_1 = tslib_1.__importDefault(require("express-jwt"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const routes_1 = tslib_1.__importDefault(require("./routes/routes"));
require('dotenv').config();
const app = express_1.default();
app.use(cors_1.default({ credentials: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, '../../client/build')));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '../../client/build/index.html'));
});
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname + '../../client/public/index.html'));
});
morgan.token('graphql-query', (req) => {
    const { variables } = req.body;
    return `GRAPHQL ${Object.keys(variables || {}).length
        ? `Variables: ${JSON.stringify(variables)}`
        : ''}`;
});
app.use(morgan(':method :status :response-time ms :graphql-query'));
app.use(bodyParser.json());
app.use(cookie_parser_1.default());
app.use(bodyParser.urlencoded({ extended: false }));
mongoose_1.default.connect(process.env.DB_CONNECT || '', { useNewUrlParser: true });
mongoose_1.default.set('useFindAndModify', false);
mongoose_1.default.set('useCreateIndex', true);
mongoose_1.default.connection.on('connected', () => {
    console.log('Mongo Connected');
});
if (!process.env.PRIVATE) {
    throw new Error('Private env key not set');
}
const auth = express_jwt_1.default({
    secret: process.env.PRIVATE,
    credentialsRequired: false
});
app.use(auth);
app.use(routes_1.default);
graphql_1.gqlServer.applyMiddleware({
    app,
    path: '/graphql',
    cors: false
});
exports.default = app;
//# sourceMappingURL=server.js.map