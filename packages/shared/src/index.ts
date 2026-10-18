// Shared package entry — add constants, schemas, and pure helpers here.
type TestExportData = {
  name: string;
  age: number;
  email: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

const testExportData: TestExportData = {
  name: 'John Doe',
  age: 30,
  email: 'john.doe@example.com',
  isAdmin: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};

export { testExportData, TestExportData };
