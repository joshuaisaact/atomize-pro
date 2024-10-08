export interface Tab {
  id: number;
  name: string;
  icon_name: string;
  createdAt: string;
  updatedAt: string;
}

export const mockTabData: Tab[] = [
  {
    id: 1,
    name: "tab 1",
    icon_name: "rocket-icon.png",
    createdAt: "2024-09-30T16:00:56.414Z",
    updatedAt: "2024-09-30T16:00:56.414Z",
  },
];

export const createMockTab = (overrides: Partial<Tab> = {}): Tab => ({
  id: 2,
  name: "Default Tab",
  icon_name: "atomic-icon.png",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  ...overrides,
});

export const createMockTabs = (count: number): Tab[] => {
  return Array.from({ length: count }, (_, index) =>
    createMockTab({ id: index + 1, name: `Tab ${index + 1}` })
  );
};
