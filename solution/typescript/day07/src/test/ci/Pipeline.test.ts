import { mock } from 'jest-mock-extended';

import { Config } from '../../ci/dependencies/Config';
import { Emailer } from '../../ci/dependencies/Emailer';
import { Project } from '../../ci/dependencies/Project';
import { TestStatus } from '../../ci/dependencies/TestStatus';
import { Pipeline } from '../../ci/Pipeline';
import { CapturingLogger } from './CapturingLogger';

describe('Pipeline', () => {
  let config: jest.Mocked<Config>;
  let emailer: jest.Mocked<Emailer>;
  let log: CapturingLogger;
  let pipeline: Pipeline;

  beforeEach(() => {
    config = mock<Config>();
    emailer = mock<Emailer>();
    log = new CapturingLogger();
    pipeline = new Pipeline(config, emailer, log);
  });

  test(
    'project with tests that deploys successfully with email notification',
    () => {
      config.sendEmailSummary.mockReturnValue(true);

      const project = Project.builder()
        .setTestStatus(TestStatus.PASSING_TESTS)
        .setDeploysSuccessfully(true)
        .build();

      pipeline.run(project);

      expect(log.getLoggedLines()).toEqual([
        'INFO: Tests passed',
        'INFO: Deployment successful',
        'INFO: Sending email'
      ]);

      expect(emailer.send)
        .toHaveBeenCalledWith('Deployment completed successfully');
    }
  );

  test(
    'project with tests that deploys successfully without email notification',
    () => {
      config.sendEmailSummary.mockReturnValue(false);

      const project = Project.builder()
        .setTestStatus(TestStatus.PASSING_TESTS)
        .setDeploysSuccessfully(true)
        .build();

      pipeline.run(project);

      expect(log.getLoggedLines()).toEqual([
        'INFO: Tests passed',
        'INFO: Deployment successful',
        'INFO: Email disabled'
      ]);

      expect(emailer.send).not.toHaveBeenCalled();
    }
  );


  test(
    'project without tests that deploys successfully with email notification',
    () => {
      config.sendEmailSummary.mockReturnValue(true);

      const project = Project.builder()
        .setTestStatus(TestStatus.NO_TESTS)
        .setDeploysSuccessfully(true)
        .build();

      pipeline.run(project);

      expect(log.getLoggedLines()).toEqual([
        'INFO: No tests',
        'INFO: Deployment successful',
        'INFO: Sending email'
      ]);

      expect(emailer.send)
        .toHaveBeenCalledWith('Deployment completed successfully');
    }
  );

  test(
    // eslint-disable-next-line max-len
    'project without tests that deploys successfully without email notification',
    () => {
      config.sendEmailSummary.mockReturnValue(false);

      const project = Project.builder()
        .setTestStatus(TestStatus.NO_TESTS)
        .setDeploysSuccessfully(true)
        .build();

      pipeline.run(project);

      expect(log.getLoggedLines()).toEqual([
        'INFO: No tests',
        'INFO: Deployment successful',
        'INFO: Email disabled'
      ]);

      expect(emailer.send).not.toHaveBeenCalled();
    }
  );

  test('project with tests that fail with email notification', () => {
    config.sendEmailSummary.mockReturnValue(true);

    const project = Project.builder()
      .setTestStatus(TestStatus.FAILING_TESTS)
      .build();

    pipeline.run(project);

    expect(log.getLoggedLines()).toEqual([
      'ERROR: Tests failed',
      'INFO: Sending email'
    ]);

    expect(emailer.send).toHaveBeenCalledWith('Tests failed');
  });

  test('project with tests that fail without email notification', () => {
    config.sendEmailSummary.mockReturnValue(false);

    const project = Project.builder()
      .setTestStatus(TestStatus.FAILING_TESTS)
      .build();

    pipeline.run(project);

    expect(log.getLoggedLines()).toEqual([
      'ERROR: Tests failed',
      'INFO: Email disabled'
    ]);

    expect(emailer.send).not.toHaveBeenCalled();
  });

  test('project with tests and failing build with email notification', () => {
    config.sendEmailSummary.mockReturnValue(true);

    const project = Project.builder()
      .setTestStatus(TestStatus.PASSING_TESTS)
      .setDeploysSuccessfully(false)
      .build();

    pipeline.run(project);

    expect(log.getLoggedLines()).toEqual([
      'INFO: Tests passed',
      'ERROR: Deployment failed',
      'INFO: Sending email'
    ]);

    expect(emailer.send).toHaveBeenCalledWith('Deployment failed');
  });

  test(
    'project with tests and failing build without email notification',
    () => {
      config.sendEmailSummary.mockReturnValue(false);

      const project = Project.builder()
        .setTestStatus(TestStatus.PASSING_TESTS)
        .setDeploysSuccessfully(false)
        .build();

      pipeline.run(project);

      expect(log.getLoggedLines()).toEqual([
        'INFO: Tests passed',
        'ERROR: Deployment failed',
        'INFO: Email disabled'
      ]);

      expect(emailer.send).not.toHaveBeenCalled();
    }
  );

  test(
    'project without tests and failing build with email notification',
    () => {
      config.sendEmailSummary.mockReturnValue(true);

      const project = Project.builder()
        .setTestStatus(TestStatus.NO_TESTS)
        .setDeploysSuccessfully(false)
        .build();

      pipeline.run(project);

      expect(log.getLoggedLines()).toEqual([
        'INFO: No tests',
        'ERROR: Deployment failed',
        'INFO: Sending email'
      ]);

      expect(emailer.send).toHaveBeenCalledWith('Deployment failed');
    }
  );

  test(
    'project without tests and failing build without email notification',
    () => {
      config.sendEmailSummary.mockReturnValue(false);

      const project = Project.builder()
        .setTestStatus(TestStatus.NO_TESTS)
        .setDeploysSuccessfully(false)
        .build();

      pipeline.run(project);

      expect(log.getLoggedLines()).toEqual([
        'INFO: No tests',
        'ERROR: Deployment failed',
        'INFO: Email disabled'
      ]);

      expect(emailer.send).not.toHaveBeenCalled();
    }
  );
});
