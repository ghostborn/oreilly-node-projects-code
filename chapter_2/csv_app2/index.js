import prompt from "prompt";
import { createObjectCsvWriter } from "csv-writer";

const csvWriter = createObjectCsvWriter({
  path: "./contacts.csv",
  append: true,
  header: [
    { id: "name", title: "NAME" },
    { id: "number", title: "NUMBER" },
    { id: "email", title: "EMAIL" },
  ],
});

prompt.start();
prompt.message = "";

const saveContactToCSV = async ({ name, number, email }) => {
  try {
    await csvWriter.writeRecords([{ name, number, email }]);
    console.log(`${name}.Saved!`);
  } catch (err) {
    console.log(err);
  }
};

const startApp = async () => {
  const questions = [
    { name: "name", description: "Contact Name" },
    { name: "number", description: "Contact Number" },
    { name: "email", description: "Contact Email" },
  ];
  const responses = await prompt.get(questions);
  await saveContactToCSV({
    name: responses.name,
    number: responses.number,
    email: responses.email,
  });

  const { again } = await prompt.get([
    { name: "again", description: "Continue?[y to continue]" },
  ]);

  if (again.toLowerCase() === "y") {
    await startApp();
  }
};

startApp();
