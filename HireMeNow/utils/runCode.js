export const runCode = (code) => {
  const logs = [];
  const originalLog = console.log;

  console.log = (...args) => {
    logs.push(args.join(" "));
  };

  try {
    eval(code);
  } catch (err) {
    logs.push("❌ Error: " + err.message);
  }

  console.log = originalLog;
  return logs.join("\n");
};
