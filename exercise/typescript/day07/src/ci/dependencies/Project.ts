import { TestStatus } from './TestStatus';

export class Project {
  private buildsSuccessfully: boolean;
  private testStatus: TestStatus;

  private constructor(buildsSuccessfully: boolean, testStatus: TestStatus) {
    this.buildsSuccessfully = buildsSuccessfully;
    this.testStatus = testStatus;
  }

  public static builder() {
    return new Project.ProjectBuilder();
  }

  public hasTests(): boolean {
    return this.testStatus !== TestStatus.NO_TESTS;
  }

  public runTests(): string {
    return this.testStatus === TestStatus.PASSING_TESTS ? 'success' : 'failure';
  }

  public deploy(): string {
    return this.buildsSuccessfully ? 'success' : 'failure';
  }

  public static ProjectBuilder = class ProjectBuilder {
    private buildsSuccessfully!: boolean;
    private testStatus!: TestStatus;

    public setTestStatus(testStatus: TestStatus): ProjectBuilder {
      this.testStatus = testStatus;
      return this;
    }

    public setDeploysSuccessfully(buildsSuccessfully: boolean): ProjectBuilder {
      this.buildsSuccessfully = buildsSuccessfully;
      return this;
    }

    public build(): Project {
      return new Project(this.buildsSuccessfully, this.testStatus);
    }
  };
}
