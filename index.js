const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const routes = require('./app/routes');
const ErrorHandlerMiddleware = require('./app/utils/ErrorHandlerMiddleware');
const { PREFIX } = require('./app/configs/AppConfig');

const app = express();
const { PORT = 3010 } = process.env;

const logger = log4js.getLogger('offer-ms');
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
  logger.error(reason.stack);
});

app.use(PREFIX, routes);
app.use(ErrorHandlerMiddleware.MainHandler);


app.listen(PORT, () => {
  console.log('listening on port:', PORT);
});

module.exports = app;
