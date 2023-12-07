import { WinstonModuleOptions } from 'nest-winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston/dist/winston.utilities';
import * as winston from 'winston';
import { ConsoleTransportOptions } from 'winston/lib/winston/transports';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as winstonDaily from 'winston-daily-rotate-file';

const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  nestWinstonModuleUtilities.format.nestLike('algo-with-me-api', {
    prettyPrint: true,
  }),
);

const fileFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'HH:mm:ss',
  }),
  winston.format.printf((info) => `${info.timestamp}\t${info.level}\t${info.message}`),
);

const consoleConfig: ConsoleTransportOptions = {
  level: 'debug',
  format: consoleFormat,
};

const fileConfig: DailyRotateFile.DailyRotateFileTransportOptions = {
  level: 'debug',
  format: fileFormat,
  datePattern: 'YYYY-MM-DD-HH',
  frequency: '6h',
  dirname: 'log',
  filename: `%DATE%.log`,
  zippedArchive: true, // 로그가 쌓였을 때 압축
  handleExceptions: true,
  json: false,
};

const errorFileConfig: DailyRotateFile.DailyRotateFileTransportOptions = {
  level: 'warn',
  format: fileFormat,
  datePattern: 'YYYY-MM-DD-HH',
  frequency: '6h',
  dirname: 'log',
  filename: `%DATE%.error.log`,
  zippedArchive: true, // 로그가 쌓였을 때 압축
  handleExceptions: true,
  json: false,
};

const productionWinstonConfig = {
  transports: [
    new winston.transports.Console(consoleConfig),
    new winstonDaily(fileConfig),
    new winstonDaily(errorFileConfig),
  ],
};

const devWinstonConfig = {
  transports: [new winston.transports.Console(consoleConfig)],
};

const winstonConfig: WinstonModuleOptions =
  process.env.NODE_ENV === 'production' ? productionWinstonConfig : devWinstonConfig;

export default winstonConfig;
