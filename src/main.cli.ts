#!/usr/bin/env node
import { CLIApplication, HelpCommand, VersionCommand, ImportCommand } from './cli/index.js';
import {GenerateCommand} from "./cli/commands/generate.command";

function bootstrap() {
  const cliApp = new CLIApplication();

  cliApp.registerCommands([
    new HelpCommand(),
    new VersionCommand(),
    new ImportCommand(),
    new GenerateCommand(),
  ]);

  cliApp.processCommand(process.argv);
}

bootstrap();
