import { Config } from './dependencies/Config';
import { Emailer } from './dependencies/Emailer';
import { Logger } from './dependencies/Logger';
import { Project } from './dependencies/Project';

export class Pipeline {
  private readonly config: Config;
  private readonly emailer: Emailer;
  private readonly log: Logger;

  constructor(config: Config, emailer: Emailer, log: Logger) {
    this.config = config;
    this.emailer = emailer;
    this.log = log;
  }

  public run(project: Project): void {
    let testsPassed: boolean;
    let deploySuccessful: boolean;

    if (project.hasTests()) {
      if ('success' === project.runTests()) {
        this.log.info('Tests passed');
        testsPassed = true;
      } else {
        this.log.error('Tests failed');
        testsPassed = false;
      }
    } else {
      this.log.info('No tests');
      testsPassed = true;
    }

    if (testsPassed) {
      if ('success' === project.deploy()) {
        this.log.info('Deployment successful');
        deploySuccessful = true;
      } else {
        this.log.error('Deployment failed');
        deploySuccessful = false;
      }
    } else {
      deploySuccessful = false;
    }

    if (this.config.sendEmailSummary()) {
      this.log.info('Sending email');
      if (testsPassed) {
        if (deploySuccessful) {
          this.emailer.send('Deployment completed successfully');
        } else {
          this.emailer.send('Deployment failed');
        }
      } else {
        this.emailer.send('Tests failed');
      }
    } else {
      this.log.info('Email disabled');
    }
  }
}
