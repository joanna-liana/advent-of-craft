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
    const testsPassed: boolean = this.areTestsPassed(project);

    const deploySuccessful: boolean = this.isDeploySuccessful(
      project,
      testsPassed
    );

    this.sendEmail(testsPassed, deploySuccessful);
  }

  private sendEmail(testsPassed: boolean, deploySuccessful: boolean) {
    if (!this.config.sendEmailSummary()) {
      this.log.info('Email disabled');

      return;
    }

    this.log.info('Sending email');

    if (!testsPassed) {
      this.emailer.send('Tests failed');
    }

    if (deploySuccessful) {
      this.emailer.send('Deployment completed successfully');
    } else {
      this.emailer.send('Deployment failed');
    }
  }

  private isDeploySuccessful(project: Project, testsPassed: boolean) {
    if (!testsPassed) {
      return false;
    }

    if ('success' === project.deploy()) {
      this.log.info('Deployment successful');
      return true;
    } else {
      this.log.error('Deployment failed');
      return false;
    }

  }

  private areTestsPassed(project: Project): boolean {
    if (!project.hasTests()) {
      this.log.info('No tests');

      return true;
    }

    if ('success' === project.runTests()) {
      this.log.info('Tests passed');
      return true;
    } else {
      this.log.error('Tests failed');
      return false;
    }
  }
}
