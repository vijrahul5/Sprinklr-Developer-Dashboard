const rootOverride = {
  Root: {
    style: () => ({
      borderRadius: "4px",
    }),
  },
};
const controlContainerOverride = {
  ControlContainer: {
    style: ({ $theme }) => ({
      borderRadius: "4px",
    }),
  },
};

export { rootOverride, controlContainerOverride };
